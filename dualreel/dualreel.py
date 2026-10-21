#!/usr/bin/env python3
"""DualReel — one set of Teleprompter takes in, two reels out: an Instagram version (Layout A, ivory end card) and a TikTok
version ("suara dalam kepala": chat-bubble hook, native captions, tighter pauses, no end card).

  python3 dualreel/dualreel.py make <project-dir>         # transcribe, edit, render both versions
  python3 dualreel/dualreel.py rerender <project-dir>     # after editing <project-dir>/edit.json by hand
  … add  --only ig  or  --only tt  to render one version

A project dir holds:
  clips/       the takes, in recording order (Teleprompter file names sort by time)
  meta.json    {"type": "connection" | "value" | ..., "series": "MINDSET", "slug": "2010-beza", "hook": "…", "hook_key": "…",
                "cta_ig": "…", "cta_tt": "…", "emphasis": [words], "corrections": [{"from": "perak badan", "to": "berat badan"}],
                "cards": [{"text": "1. Main meal dulu", "at": "the spoken line it belongs to"}]}
               (all optional)
  script.txt   optional — the script Coach read; used to spell captions and to place [ON-SCREEN TEXT: …] cards
  photos/      optional — not placed automatically (say which photo goes with which line in edit.json "photos")

Only "connection" and "value" content gets both versions; anything else gets the IG version only.
Nothing is posted or scheduled. Every guess (retake dropped, word taken from the script, unclear word) goes to review.md.
"""
from __future__ import annotations

import difflib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent
BRAND = json.loads((ROOT / "brand.json").read_text())
VIDEO_EXT = {".mp4", ".mov", ".m4v"}
DUAL_TYPES = {"connection", "value"}
BROWSER = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell"


# ---------- helpers ----------
def run(cmd: list[str]) -> str:
    return subprocess.run(cmd, check=True, capture_output=True, text=True).stdout


def duration(p: Path) -> float:
    return float(run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)]))


def norm(t: str) -> str:
    return re.sub(r"[^\w-]", "", t.lower())


# ---------- 1. transcription ----------
def transcribe_all(clips: list[Path], work: Path, style: str) -> dict[str, dict]:
    """Per take: a style-prompted run (keeps BM+EN as spoken) and an unprompted run as a cross-check. Cached."""
    cache = work / "transcripts.json"
    out = json.loads(cache.read_text()) if cache.exists() else {}
    todo = [c for c in clips if c.name not in out]
    if todo:
        from faster_whisper import WhisperModel

        model = WhisperModel(BRAND["transcription"]["model"], device="cpu", compute_type="int8")
        for c in todo:
            wav = work / (c.stem + ".wav")
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(c), "-ac", "1", "-ar", "16000", str(wav)], check=True)
            runs = {}
            for tag, prompt in (("styled", style), ("plain", None)):
                segs, _ = model.transcribe(str(wav), language="ms", word_timestamps=True, initial_prompt=prompt, condition_on_previous_text=False)
                runs[tag] = [[w.word.strip(), round(w.start, 2), round(w.end, 2), round(w.probability, 2)] for s in segs for w in (s.words or []) if w.word.strip()]
            out[c.name] = {"duration": duration(c), **runs}
            print(f"  transcribed {c.name}: {' '.join(w[0] for w in runs['styled'])}", flush=True)
            cache.write_text(json.dumps(out, ensure_ascii=False, indent=1))
    return out


def merge_hyphens(ws: list[list]) -> list[list]:
    m: list[list] = []
    for w in ws:
        if w[0].startswith("-") and m:
            m[-1] = [m[-1][0] + w[0], m[-1][1], w[2], min(m[-1][3], w[3])]
        else:
            m.append(list(w))
    return m


# ---------- 2. retakes ----------
def take_score(ws: list[list], script_toks: list[str]) -> float:
    """How good a take is: closeness to the script when there is one, else mean word confidence."""
    toks = [norm(w[0]) for w in ws]
    conf = sum(w[3] for w in ws) / max(1, len(ws))
    if not script_toks or not toks:
        return conf
    sm = difflib.SequenceMatcher(None, toks, script_toks, autojunk=False)
    matched = sum(b.size for b in sm.get_matching_blocks())
    return matched / len(toks) + 0.2 * conf


def drop_retakes(order: list[str], tr: dict, review: list[str], script_toks: list[str]) -> list[str]:
    """Takes that say the same thing (same opening, or ≥55% alike) are retakes of each other; keep the better one."""
    toks = {n: [norm(w[0]) for w in tr[n]["styled"]] for n in order}
    dropped: set[str] = set()
    for i, n in enumerate(order):
        if n in dropped:
            continue
        for m in order[i + 1 : i + 3]:
            a, b = toks[n], toks[m]
            if not a or not b or m in dropped:
                continue
            sim = difflib.SequenceMatcher(None, a, b).ratio()
            if a[:4] == b[:4] or sim >= 0.55:
                sa, sb = take_score(tr[n]["styled"], script_toks), take_score(tr[m]["styled"], script_toks)
                # Coach re-records when a take went wrong, so the later take wins unless the earlier one is clearly better
                worse, better = (m, n) if sa > sb + 0.1 else (n, m)
                dropped.add(worse)
                review.append(f"- Retake: dropped **{worse}** (\"{' '.join(w[0] for w in tr[worse]['styled'])[:80]}…\"), kept **{better}** (similar {sim:.2f}; score {max(sa, sb):.2f} vs {min(sa, sb):.2f}).")
                break
    return [n for n in order if n not in dropped]


# ---------- 3. script spelling + on-screen texts ----------
def parse_script(text: str) -> tuple[list[str], list[tuple[str, str]]]:
    """Returns the script's spoken words and [(on-screen text, the spoken line just before it)]."""
    words, onscreen, last_line = [], [], ""
    for raw in text.splitlines():
        line = raw.strip()
        if not line or line.lower() in {"(cut)", "cut"} or re.match(r"^hook\b", line, re.I):
            continue
        m = re.match(r"^\[(?:on-?screen text)\s*:\s*(.+?)\]$", line, re.I)
        if m:
            onscreen.append((m.group(1).strip(), last_line))
            continue
        if line.startswith("[") or line.startswith("("):
            continue
        last_line = line
        words += line.replace("“", "").replace("”", "").split()
    return words, onscreen


def spell_from_script(words: list[dict], script_words: list[str], review: list[str]) -> None:
    """Where a spoken word lines up with the script and only the spelling differs (perak/berat, potion/portion), take the
    script's spelling. Different words are kept as spoken — the audio wins over the script."""
    if not script_words:
        return
    a = [norm(w["w"]) for w in words]
    b = [norm(t) for t in script_words]
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    for op, i1, i2, j1, j2 in sm.get_opcodes():
        if op != "replace":
            continue
        for k in range(i1, i2):
            w = words[k]
            spoken = norm(w["w"])
            if len(spoken) < 4:
                continue
            cands = [(difflib.SequenceMatcher(None, spoken, norm(t)).ratio(), t) for t in script_words[j1:j2]]
            if not cands:
                continue
            r, s = max(cands)
            # "turunkan" vs "turun" is a different word form, not a spelling slip — keep what was said
            if spoken.startswith(norm(s)) or norm(s).startswith(spoken):
                continue
            if 0.75 <= r < 1.0:
                tail = re.findall(r"[.,?!…]+$", w["w"])
                new = re.sub(r"[.,?!…]+$", "", s) + (tail[0] if tail else "")
                review.append(f"- Spelling from script: \"{w['w']}\" → \"{new}\"")
                w["w"], w["p"] = new, 1.0


def place_onscreen(onscreen: list[tuple[str, str]], words: list[dict]) -> list[dict]:
    """Each [ON-SCREEN TEXT] appears when the line before it in the script is said (best fuzzy match in the transcript)."""
    out = []
    toks = [norm(w["w"]) for w in words]
    for text, line in onscreen:
        lt = [norm(t) for t in line.split()]
        best, at = 0.0, None
        for i in range(len(toks)):
            r = difflib.SequenceMatcher(None, toks[i : i + len(lt)], lt).ratio()
            if r > best:
                best, at = r, i
        if at is not None and best >= 0.45:
            end_i = min(len(words) - 1, at + len(lt) - 1)
            out.append({"text": text, "from": round(words[at]["s"], 2), "to": round(max(words[end_i]["e"] + 1.2, words[at]["s"] + 2.6), 2)})
    return out


# ---------- 4. joining ----------
def trims(ws: list[list], dur: float) -> tuple[float, float]:
    a = max(0.0, max(ws[0][1], ws[0][2] - 0.45) - 0.08)
    b = min(dur, ws[-1][2] + 0.3)
    return a, b


def join(pieces: list[tuple[Path, float, float]], out: Path) -> None:
    fc, cat = "", ""
    for k, (_, a, b) in enumerate(pieces):
        d = round(b - a - 0.05, 3)
        fc += (f"[{k}:v]trim={a}:{b},setpts=PTS-STARTPTS,scale=1080:1920,fps=30,format=yuv420p,setsar=1[v{k}];"
               f"[{k}:a]atrim={a}:{b},asetpts=PTS-STARTPTS,aresample=48000,afade=t=in:d=0.03,afade=t=out:st={max(0, d)}:d=0.05[a{k}];")
        cat += f"[v{k}][a{k}]"
    args = ["ffmpeg", "-y", "-loglevel", "error"]
    for p, _, _ in pieces:
        args += ["-i", str(p)]
    args += ["-filter_complex", fc + cat + f"concat=n={len(pieces)}:v=1:a=1[v][ax];[ax]loudnorm=I=-16:TP=-1.5:LRA=11[a]",
             "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", str(out)]
    out.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(args, check=True)


def build_timeline(edit: dict, clipdir: Path, tight: bool) -> tuple[list[tuple[Path, float, float]], list[list]]:
    """Cut list + caption words on the joined timeline. tight=True (TikTok) also cuts pauses longer than 0.45 s inside a take."""
    pieces, words, off = [], [], 0.0
    for take in edit["takes"]:
        a, b = take["in"], take["out"]
        spans = [(a, b)]
        if tight:
            spans, cur = [], a
            ws = [w for w in take["words"] if w["e"] > a and w["s"] < b]
            for x, y in zip(ws, ws[1:]):
                if y["s"] - x["e"] > 0.45:
                    spans.append((cur, x["e"] + 0.15))
                    cur = y["s"] - 0.12
            spans.append((cur, b))
        for sa, sb in spans:
            pieces.append((clipdir / take["file"], round(sa, 3), round(sb, 3)))
            for w in take["words"]:
                if not w["w"] or w["e"] <= sa + 0.02 or w["s"] >= sb - 0.02:
                    continue
                s = max(w["s"], sa, w["e"] - 0.6)
                words.append([round(off + s - sa, 2), round(off + min(max(w["e"], s + 0.1), sb) - sa, 2), w["w"], 1 if w.get("emph") else 0])
            off += sb - sa
    return pieces, words


def remap(t: float, edit: dict, tight_pieces: list[tuple[Path, float, float]]) -> float:
    """IG-timeline second → TikTok-timeline second (for on-screen cards)."""
    # IG offsets per take
    ig_off, src = 0.0, None
    for take in edit["takes"]:
        if t < ig_off + (take["out"] - take["in"]) + 1e-6:
            src = (take["file"], take["in"] + (t - ig_off))
            break
        ig_off += take["out"] - take["in"]
    if src is None:
        return sum(b - a for _, a, b in tight_pieces)
    off = 0.0
    for p, a, b in tight_pieces:
        if p.name == src[0] and a - 0.01 <= src[1] <= b + 0.01:
            return round(off + (src[1] - a), 2)
        if p.name == src[0] and src[1] < a:
            return round(off, 2)
        off += b - a
    return round(off, 2)


# ---------- 5. edit plan ----------
def make_edit(proj: Path, review: list[str]) -> dict:
    meta = json.loads((proj / "meta.json").read_text()) if (proj / "meta.json").exists() else {}
    script = (proj / "script.txt").read_text() if (proj / "script.txt").exists() else ""
    script_words, onscreen = parse_script(script)
    # cards without a script: meta "cards": [{"text": "1. Main meal dulu", "at": "tentukan dulu apa yang nak jadi main meal"}]
    onscreen += [(c["text"], c["at"]) for c in meta.get("cards", [])]
    clips = sorted(p for p in (proj / "clips").iterdir() if p.suffix.lower() in VIDEO_EXT)
    work = proj / "work"
    work.mkdir(exist_ok=True)
    style = BRAND["transcription"]["style_prompt"] + (" " + " ".join(script_words[:30]) if script_words else "")
    tr = transcribe_all(clips, work, style[:600])
    order = drop_retakes([c.name for c in clips], tr, review, [norm(t) for t in script_words])

    # a take whose last sentence is re-said at the start of the next take: cut that sentence (keep the cleaner retake)
    tails: dict[str, float] = {}
    for n, m in zip(order, order[1:]):
        ws, nxt = merge_hyphens(tr[n]["styled"]), [norm(w[0]) for w in tr[m]["styled"]]
        starts = [i for i in range(1, len(ws)) if re.search(r"[.?!]$", ws[i - 1][0])]
        if starts and len(nxt) >= 3:
            i = starts[-1]
            tail = [norm(w[0]) for w in ws[i:]]
            head = nxt[: len(tail)]
            if len(tail) >= 4 and difflib.SequenceMatcher(None, tail, head).ratio() >= 0.75:
                tails[n] = ws[i - 1][2] + 0.25
                review.append(f"- Partial retake: cut the end of **{n}** (\"{' '.join(w[0] for w in ws[i:])}\"), **{m}** says it again.")

    takes, all_words = [], []
    emph = {norm(w) for w in BRAND["highlight_words"]} | {norm(w) for w in meta.get("emphasis", [])}
    for n in order:
        ws = merge_hyphens(tr[n]["styled"])
        if not ws:
            review.append(f"- **{n}**: no speech found, skipped.")
            continue
        plain = " ".join(w[0] for w in tr[n]["plain"])
        a, b = trims(ws, tr[n]["duration"])
        b = min(b, tails.get(n, b))
        words = [{"w": w, "s": s, "e": e, "p": p} for w, s, e, p in ws]
        takes.append({"file": n, "in": round(a, 2), "out": round(b, 2), "words": words, "plain": plain})
        all_words += words
    spell_from_script(all_words, script_words, review)
    if meta.get("corrections"):
        sys.path.insert(0, str(REPO / "autoreel"))
        from lib.analyze import apply_corrections  # phrase-level fixes, timing kept

        done = apply_corrections(all_words, meta["corrections"])
        review += [f"- Correction from meta.json applied: \"{c}\"" for c in done]
        review += [f"- Correction NOT found in the takes: \"{c['from']}\"" for c in meta["corrections"] if c["from"] not in done]
    for t in takes:
        for w in t["words"]:
            w["emph"] = norm(w["w"]) in emph
            if w["p"] < BRAND["transcription"]["low_confidence"] and norm(w["w"]) not in {norm(x) for x in t["plain"].split()}:
                review.append(f"- Unsure word in **{t['file']}** at {w['s']:.1f}s: \"{w['w']}\" (cross-check run heard: \"{t['plain'][:80]}…\")")

    # on-screen texts are placed on the IG timeline, then remapped for TikTok
    ig_words, off = [], 0.0
    for t in takes:
        for w in t["words"]:
            if w["e"] > t["in"] and w["s"] < t["out"]:
                ig_words.append({"w": w["w"], "s": off + max(w["s"], t["in"]) - t["in"], "e": off + min(w["e"], t["out"]) - t["in"]})
        off += t["out"] - t["in"]
    cards = place_onscreen(onscreen, ig_words)
    for text, _ in onscreen:
        if text not in [c["text"] for c in cards]:
            review.append(f"- On-screen text \"{text}\" could not be placed (its script line was not found in the takes).")

    first = " ".join(w["w"] for w in takes[0]["words"]) if takes else ""
    hook = meta.get("hook") or (cards[0]["text"] if cards else first.split(",")[0])
    last = takes[-1] if takes else None
    return {
        "slug": meta.get("slug") or proj.name,
        "type": meta.get("type", "value"),
        "series": meta.get("series", "MINDSET"),
        "hook": hook,
        "hook_tt": meta.get("hook_tt") or (f"“{hook}”" if script else hook),
        "hook_key": meta.get("hook_key", ""),
        "first_line": first,
        "cta_ig": meta.get("cta_ig", BRAND["cta"]["text"]),
        "cta_ig_icon": meta.get("cta_ig_icon", BRAND["cta"]["icon"]),
        "cta_tt": meta.get("cta_tt", "Tag kawan yang perlu dengar ni 👇"),
        "last_line": " ".join(w["w"] for w in last["words"]) if last else "",
        "cards": [c for c in cards if c["text"] != hook],
        "photos": meta.get("photos", []),
        "takes": takes,
    }


# ---------- 6. render ----------
def render(edit: dict, proj: Path, review: list[str], only: str | None = None) -> list[Path]:
    slug = edit["slug"]
    pub = REPO / "public" / "dualreel" / slug
    out_dir = proj / "output"
    out_dir.mkdir(exist_ok=True)
    clipdir = proj / "clips"
    outs = []
    versions = ["ig", "tt"] if edit["type"] in DUAL_TYPES else ["ig"]
    if "tt" not in versions:
        review.append(f"- Type \"{edit['type']}\" is not connection/value, so only the IG version was made.")
    for v in [x for x in versions if not only or x == only]:
        pieces, words = build_timeline(edit, clipdir, tight=(v == "tt"))
        join(pieces, pub / f"{v}.mp4")
        talk = sum(b - a for _, a, b in pieces)
        cards = edit["cards"] if v == "ig" else [{**c, "from": remap(c["from"], edit, pieces), "to": remap(c["to"], edit, pieces)} for c in edit["cards"]]
        props = {
            "clip": f"dualreel/{slug}/{v}.mp4", "talk": round(talk, 2), "words": words, "series": edit["series"],
            "hook": edit["hook"] if v == "ig" else edit.get("hook_tt", edit["hook"]), "hookKey": edit["hook_key"], "cards": cards, "photos": edit["photos"] if v == "ig" else [],
            "cta": edit["cta_ig"] if v == "ig" else edit["cta_tt"], "ctaIcon": edit["cta_ig_icon"], "handle": BRAND["handle"],
        }
        pf = proj / "work" / f"props-{v}.json"
        pf.write_text(json.dumps(props, ensure_ascii=False))
        comp = "DualIG" if v == "ig" else "DualTT"
        mp4 = out_dir / f"{slug}-{v}.mp4"
        print(f"  rendering {comp} ({talk:.1f}s talk)…", flush=True)
        subprocess.run(["npx", "remotion", "render", "src/index.ts", comp, str(mp4), f"--props={pf}", f"--browser-executable={BROWSER}", "--concurrency=4", "--crf=25", "--log=error"], check=True, cwd=REPO)
        subprocess.run(["npx", "remotion", "still", "src/index.ts", comp, str(out_dir / f"{slug}-{v}-cover.png"), f"--props={pf}", "--frame=45", f"--browser-executable={BROWSER}", "--log=error"], check=True, cwd=REPO)
        outs.append(mp4)
    return outs


# ---------- 7. captions + review ----------
def captions(edit: dict, proj: Path) -> None:
    tags = " ".join(BRAND["hashtags"])
    lines = []
    for t in edit["takes"]:
        s = " ".join(w["w"] for w in t["words"] if w["e"] > t["in"] and w["s"] < t["out"])
        if s:
            lines.append(s)
    body = "\n\n".join(lines[1:-1])
    ig = f"{lines[0] if lines else edit['hook']}\n\n{body}\n\n{edit['last_line']}\n\n{tags}\n"
    tt = f"{edit['hook']} {lines[0] if lines else ''}\n\n{edit['cta_tt']}\n\n#coachnas #tipskurus #misifightobesiti #fyp\n"
    (proj / "output" / "caption-ig.txt").write_text(ig)
    (proj / "output" / "caption-tt.txt").write_text(tt)


def main() -> None:
    if len(sys.argv) < 3 or sys.argv[1] not in {"make", "rerender"}:
        print(__doc__)
        sys.exit(1)
    proj = Path(sys.argv[2]).resolve()
    review: list[str] = []
    ef = proj / "edit.json"
    if sys.argv[1] == "make" or not ef.exists():
        edit = make_edit(proj, review)
        ef.write_text(json.dumps(edit, ensure_ascii=False, indent=1))
    else:
        edit = json.loads(ef.read_text())
        review.append("- Rerendered from edit.json (hand edits kept).")
    only = sys.argv[sys.argv.index("--only") + 1] if "--only" in sys.argv else None
    outs = render(edit, proj, review, only)
    captions(edit, proj)
    (proj / "output" / "review.md").write_text(
        f"# {edit['slug']} — review\n\nTakes used: {', '.join(t['file'] for t in edit['takes'])}\n\n"
        "Fix anything below in edit.json (words, in/out points, cards, hook), then run `rerender`.\n\n" + ("\n".join(review) or "- Nothing flagged.") + "\n")
    print("done:", *[str(o) for o in outs], sep="\n  ")


if __name__ == "__main__":
    main()
