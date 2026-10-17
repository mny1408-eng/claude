#!/usr/bin/env python3
"""AutoReel — raw talking-head recording in, polished 9:16 reel out.

  python3 autoreel/autoreel.py run                      # process every new video in autoreel/input/
  python3 autoreel/autoreel.py run my-video.mov --topic fat-loss-4-steps
  python3 autoreel/autoreel.py rerender autoreel/projects/<name>   # after editing project.json
  python3 autoreel/autoreel.py list

Per reel you get, in autoreel/output/<name>/:
  reel.mp4  reel.srt  caption.txt  review.md
and an editable project in autoreel/projects/<name>/ (project.json, props.json, source copy, transcript cache).
Optional: put your script next to the video as <video-name>.txt; it is used only to help spell rojak words.
"""
from __future__ import annotations

import argparse
import datetime as dt
import hashlib
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parent
sys.path.insert(0, str(ROOT))

from lib import analyze, edit, transcribe  # noqa: E402

INPUT, OUTPUT, PROJECTS = ROOT / "input", ROOT / "output", ROOT / "projects"
PUBLIC = REPO / "public" / "autoreel"
VIDEO_EXT = {".mp4", ".mov", ".m4v"}
CHROME = "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell"


def log(msg: str) -> None:
    print(f"[autoreel] {msg}", flush=True)


def load_json(p: Path) -> dict:
    return json.loads(p.read_text(encoding="utf-8"))


def sha1(p: Path) -> str:
    h = hashlib.sha1()
    with p.open("rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def slugify(stem: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "-", stem).strip("-").lower()[:40] or "reel"
    return f"{dt.date.today():%Y%m%d}-{s}"


# ---------------------------------------------------------------- build props for the Remotion template


def build_props(name: str, words: list[dict], sents: list[dict], struct: dict, segs: list[dict], lay: dict, cfg: dict, topic: dict, review: list[dict]) -> dict:
    fps = cfg["layout"]["fps"]
    hl = set(cfg["highlight_words"])
    out_words = []
    for s in segs:
        for i in s["words"]:
            w = words[i]
            if not w["w"]:
                continue
            a, b = edit.map_time(segs, w["s"]), edit.map_time(segs, w["e"])
            if a is None or b is None:
                continue
            out_words.append({"w": w["w"], "s": a, "e": max(b, a + 0.08), "hl": analyze.norm(w["w"]) in hl, "src": i})
    chunks = edit.chunk_words(out_words)
    talk = segs[-1]["out_e"] if segs else 0

    def out_t(sid: int) -> float:
        s = sents[sid]
        first = next(i for i in s["idx"] if not words[i].get("filler"))
        return edit.map_time(segs, words[first]["s"]) or 0.0

    hook = None
    if struct["hook_ids"]:
        text = topic.get("hook_override") or " ".join(sents[i]["text"] for i in struct["hook_ids"])
        last = sents[struct["hook_ids"][-1]]
        hook = {"text": text.upper(), "end": round((edit.map_time(segs, last["e"]) or 3.0) + 0.4, 2)}

    steps = []
    starts = sorted((out_t(sid), k) for k, sid in struct["step_start"].items())
    key_t = out_t(struct["key_id"]) if struct["key_id"] is not None else None
    for j, (t0, k) in enumerate(starts):
        t1 = starts[j + 1][0] if j + 1 < len(starts) else (key_t if key_t and key_t > t0 else talk)
        st = topic["steps"][k]
        steps.append({"n": k + 1, "title": st["title"], "icon": st.get("icon", "dot"), "start": round(t0 - 0.15, 2), "end": round(t1 - 0.15, 2)})

    key = {"text": topic["key_message"]["text"], "start": round(key_t - 0.1, 2)} if key_t is not None and topic.get("key_message") else None
    end_s = 2.6
    props = {
        "video": f"autoreel/{name}/cut.mp4",
        "fps": fps,
        "talkSeconds": round(talk, 3),
        "durationInFrames": int(round((talk + end_s) * fps)),
        "handle": cfg["handle"],
        "colors": cfg["colors"],
        "layout": {"titleTop": lay["title_top"], "captionTop": lay["caption_top"], "zoomOrigin": lay["zoom_origin"], "sideInset": cfg["layout"]["side_inset"]},
        "hook": hook,
        "steps": steps,
        "keyMessage": key,
        "captions": chunks,
        "cuts": [s["out_s"] for s in segs],
        "end": {"seconds": end_s, "recap": [s["title"] for s in steps], "cta": cfg["cta"]},
    }
    if hook and len(hook["text"]) > 70:
        review.append({"type": "hook-long", "detail": f'Hook card text is long ({len(hook["text"])} chars). Set "hook_override" in project.json to shorten it.'})
    return props


# ---------------------------------------------------------------- caption + review


def strip_marker(text: str, markers: list[str]) -> str:
    t = text
    for m in sorted(markers, key=len, reverse=True):
        t = re.sub(rf"^\s*(yang\s+)?{re.escape(m)}\b[,:]?\s*", "", t, flags=re.I)
    return t[:1].upper() + t[1:] if t else t


def caption_text(sents: list[dict], struct: dict, topic: dict, cfg: dict) -> str:
    lines = []
    hook = " ".join(sents[i]["text"] for i in struct["hook_ids"]) if struct["hook_ids"] else ""
    lines.append(topic.get("caption_hook") or hook)
    if topic.get("caption_hook") and hook:
        lines.append(f"\n“{hook}”")
    lines.append("")
    for k, sid in sorted(struct["step_start"].items()):
        st = topic["steps"][k]
        # the most on-topic sentence the creator said inside this step (by the step's keywords), else its first sentence
        sec = [s for s in sents if s["keep"] and struct["sections"].get(s["id"]) == f"step{k + 1}"]
        kws = st.get("keywords", []) + st["title"].lower().replace("+", " ").split()
        best = max(sec, key=lambda s: (sum(analyze._has_phrase(s["toks"], kw) for kw in kws), len(s["toks"])), default=sents[sid])
        said = strip_marker(best["text"], st["markers"])
        lines.append(f"✅ Step {k + 1}: {st['title'].title()}\n   {said}")
    if struct["key_id"] is not None and topic.get("key_message"):
        lines += ["", f"💡 {topic['key_message']['text'].title()}"]
    lines += ["", f"📌 {cfg['cta']['text']} untuk rujukan nanti.", "", cfg["signoff"], "", " ".join(cfg["hashtags"])]
    return "\n".join(lines).strip() + "\n"


def review_md(name: str, props: dict, review: list[dict], sents: list[dict], verify: dict) -> str:
    out = [f"# Review — {name}", "", f"Reel length: {verify.get('duration', 0):.1f}s · {verify.get('width')}×{verify.get('height')} · audio: {verify.get('audio')}", ""]
    groups = {
        "repeat-removed": "Repeated takes removed",
        "trimmed": "Sentences cut for length",
        "step-guessed": "Step titles placed without a spoken marker",
        "step-missing": "Steps not found",
        "low-confidence": "Low-confidence words (check subtitle spelling)",
    }
    for key, title in groups.items():
        items = [r for r in review if r["type"] == key]
        if items:
            out.append(f"## {title}")
            out += [f"- {('[%.1fs] ' % r['at']) if 'at' in r else ''}{r['detail']}" for r in items]
            out.append("")
    other = [r for r in review if r["type"] not in groups]
    if other:
        out.append("## Other notes")
        out += [f"- {r['detail']}" for r in other]
        out.append("")
    out.append("## Final transcript (what the reel says)")
    out += [f"- [{s['section']}] {s['text']}" for s in sents if s["keep"]]
    out += ["", "To change anything, edit `project.json`, then rerender:",
            '- fix misheard words: add to `corrections`, e.g. `{"from": "raih datang", "to": "Raya datang"}`',
            "- drop or restore a sentence: set its `keep` to false/true",
            '- shorter hook card: set `hook_override`; rename a step: `step_titles` → `{"2": "PROTEIN + FIBRE"}`',
            f"`python3 autoreel/autoreel.py rerender autoreel/projects/{name}`", ""]
    return "\n".join(out)


# ---------------------------------------------------------------- render + verify


def render(name: str, props_path: Path, dst: Path) -> None:
    cmd = ["npx", "remotion", "render", "src/index.ts", "AutoReel", str(dst), f"--props={props_path}", "--concurrency=4", "--crf=23", "--log=error"]
    if Path(CHROME).exists():
        cmd.append(f"--browser-executable={CHROME}")
    subprocess.run(cmd, cwd=REPO, check=True)


def verify(mp4: Path) -> dict:
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=codec_type,width,height:format=duration", "-of", "json", str(mp4)],
                         capture_output=True, text=True, check=True).stdout
    j = json.loads(out)
    v = next((s for s in j["streams"] if s["codec_type"] == "video"), {})
    return {"duration": float(j["format"]["duration"]), "width": v.get("width"), "height": v.get("height"),
            "audio": any(s["codec_type"] == "audio" for s in j["streams"])}


# ---------------------------------------------------------------- pipeline


def build(project: Path, cfg: dict, topic: dict, retranscribe: bool = False) -> Path:
    pj = project / "project.json"
    meta = load_json(pj)
    name = meta["name"]
    src = project / meta["source"]
    hint = (project / "script.txt").read_text(encoding="utf-8") if (project / "script.txt").exists() else None

    log(f"{name}: transcribing (Whisper {cfg['transcription']['model']}, BM+EN)…")
    words, tflags = transcribe.load_or_transcribe(src, project, cfg, hint, force=retranscribe)

    if "sentences" in meta and not retranscribe:  # rerender: respect the user's edits
        words = meta["words"]
        sents = meta["sentences"]
        fixed = analyze.apply_corrections(words, meta.get("corrections", []))
        analyze.refresh_text(sents, words)
        if fixed:
            log(f"{name}: applied {len(fixed)} correction(s)")
        review = [r for r in meta.get("review", []) if r["type"] == "maybe-translated"]
        kept = [s["id"] for s in sents if s["keep"]]
        review += analyze.confidence_review(sents, words, kept, cfg["transcription"]["low_confidence"])
        struct = analyze.detect_structure(sents, kept, topic, review)
        for s in sents:
            s["section"] = struct["sections"].get(s["id"])
        log(f"{name}: using edited project ({len(kept)}/{len(sents)} sentences kept)")
    else:
        log(f"{name}: planning edit ({len(words)} words)…")
        res = analyze.plan(words, cfg, topic)
        sents, struct, review = res["sentences"], res["structure"], tflags + res["review"]
    if meta.get("hook_override"):
        topic = {**topic, "hook_override": meta["hook_override"]}
    for k, t in (meta.get("step_titles") or {}).items():
        topic["steps"][int(k) - 1]["title"] = t

    segs = edit.build_segments(words, sents, cfg["editing"])
    if not segs:
        raise SystemExit("Nothing to keep — check the transcript.")
    pub = PUBLIC / name
    pub.mkdir(parents=True, exist_ok=True)
    cut = pub / "cut.mp4"
    info = edit.probe(src)
    log(f"{name}: cutting {len(segs)} segments from {info['duration']:.0f}s of footage → {segs[-1]['out_e']:.1f}s…")
    edit.render_cut(src, segs, cut, cfg["layout"])
    face = edit.face_box(cut)
    lay = edit.layout_for(face, cfg["layout"], review)

    props = build_props(name, words, sents, struct, segs, lay, cfg, topic, review)
    (project / "props.json").write_text(json.dumps(props, ensure_ascii=False, indent=1))
    meta.update(words=words, sentences=sents, segments=segs, review=review, layout=lay, topic=topic["id"])
    meta.setdefault("hook_override", None)
    meta.setdefault("corrections", [])
    meta.setdefault("step_titles", {})
    pj.write_text(json.dumps(meta, ensure_ascii=False, indent=1))

    out = OUTPUT / name
    out.mkdir(parents=True, exist_ok=True)
    log(f"{name}: rendering with Remotion…")
    render(name, project / "props.json", out / "reel.mp4")
    v = verify(out / "reel.mp4")
    if not (v["width"] == 1080 and v["height"] == 1920 and v["audio"] and v["duration"] > 5):
        review.append({"type": "export", "detail": f"Export check failed: {v}"})
    edit.srt(props["captions"], out / "reel.srt")
    (out / "caption.txt").write_text(caption_text(sents, struct, topic, cfg), encoding="utf-8")
    (out / "review.md").write_text(review_md(name, props, review, sents, v), encoding="utf-8")
    log(f"{name}: done → {out}/reel.mp4 ({v['duration']:.1f}s, {v['width']}x{v['height']}); {len(review)} item(s) to review")
    return out


def new_project(video: Path, topic_id: str) -> Path:
    index_p = PROJECTS / "index.json"
    index = load_json(index_p) if index_p.exists() else {}
    digest = sha1(video)
    if digest in index:
        log(f"{video.name}: already processed as {index[digest]} (use rerender to redo)")
        return PROJECTS / index[digest]
    name = slugify(video.stem)
    project = PROJECTS / name
    project.mkdir(parents=True, exist_ok=True)
    dst = project / f"source{video.suffix.lower()}"
    if not dst.exists():
        try:
            dst.hardlink_to(video)  # original stays untouched in input/; no extra disk used
        except OSError:
            shutil.copy2(video, dst)
    script = video.with_suffix(".txt")
    if script.exists():
        shutil.copy2(script, project / "script.txt")
    (project / "project.json").write_text(json.dumps({"name": name, "source": dst.name, "original": str(video), "sha1": digest, "topic": topic_id}, indent=1))
    index[digest] = name
    index_p.write_text(json.dumps(index, indent=1))
    return project


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("run", help="process new videos from autoreel/input (or the given files)")
    r.add_argument("files", nargs="*")
    r.add_argument("--topic", default="fat-loss-4-steps", help="preset in autoreel/topics/ (default: fat-loss-4-steps)")
    rr = sub.add_parser("rerender", help="rebuild a project after editing its project.json")
    rr.add_argument("project")
    rr.add_argument("--retranscribe", action="store_true", help="discard edits and transcribe again")
    sub.add_parser("list", help="list projects")
    a = ap.parse_args()

    cfg = load_json(ROOT / "config" / "brand.json")
    cfg["layout"].setdefault("width", 1080)

    if a.cmd == "list":
        for p in sorted(PROJECTS.glob("*/project.json")):
            m = load_json(p)
            print(f"{m['name']}\t{m.get('topic')}\t{m['original']}")
        return
    if a.cmd == "rerender":
        project = Path(a.project).resolve()
        meta = load_json(project / "project.json")
        topic = load_json(ROOT / "topics" / f"{meta.get('topic', 'default')}.json")
        build(project, cfg, topic, retranscribe=a.retranscribe)
        return

    topic = load_json(ROOT / "topics" / f"{a.topic}.json")
    files = [Path(f).resolve() for f in a.files] or sorted(p for p in INPUT.iterdir() if p.suffix.lower() in VIDEO_EXT)
    if not files:
        log("No videos in autoreel/input/ — drop an .mp4 or .mov there and run again.")
        return
    for f in files:
        project = new_project(f, a.topic)
        if (OUTPUT / project.name / "reel.mp4").exists() and not a.files:
            continue
        build(project, cfg, topic)


if __name__ == "__main__":
    main()
