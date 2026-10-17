"""Turn a word list into an edit plan: sentences, fillers, repeated takes, structure (hook / steps / key message / close),
and which sentences to keep for a 30–60s reel.

Everything here is rule-based and explainable, so each decision can be listed in the review file. Nothing is rewritten:
the reel only ever contains words the creator actually said, in the order they said them.
"""
from __future__ import annotations

import re

PUNCT_END = re.compile(r"[.?!]$")


def norm(t: str) -> str:
    return re.sub(r"[^\w\s-]", "", t.lower()).strip()


def apply_corrections(words: list[dict], corrections: list[dict]) -> list[str]:
    """Phrase-level fixes from project.json, e.g. {"from": "raih datang", "to": "Raya datang"}.
    Timing is kept: the replacement is spread over the original words' time span (word count may change)."""
    applied = []
    for c in corrections or []:
        frm = [norm(t) for t in c["from"].split()]
        to = c["to"].split()
        n = len(frm)
        for i in range(len(words) - n + 1):
            if [norm(w["w"]) for w in words[i : i + n]] == frm:
                span = words[i : i + n]
                # keep trailing punctuation of the last original word unless the fix brings its own
                tail = re.findall(r"[.,?!]+$", span[-1]["w"])
                if tail and not re.search(r"[.,?!]$", to[-1]):
                    to = to[:-1] + [to[-1] + tail[0]]
                groups = [[] for _ in span]
                for k, t in enumerate(to):
                    groups[min(len(span) - 1, k * len(span) // len(to))].append(t)
                for w, g in zip(span, groups):
                    w["w"] = " ".join(g)
                    w["p"] = 1.0
                applied.append(c["from"])
                break
    return applied


def refresh_text(sents: list[dict], words: list[dict]) -> None:
    for s in sents:
        ws = [words[i] for i in s["idx"] if words[i]["w"]]
        s["text"] = " ".join(w["w"] for w in ws)
        s["toks"] = [norm(t) for w in ws for t in w["w"].split()]


def sentences(words: list[dict], gap: float) -> list[dict]:
    out, cur = [], []
    for i, w in enumerate(words):
        cur.append(i)
        nxt = words[i + 1] if i + 1 < len(words) else None
        if nxt is None or PUNCT_END.search(w["w"]) or nxt["s"] - w["e"] > gap:
            out.append({"idx": cur})
            cur = []
    for k, s in enumerate(out):
        ws = [words[i] for i in s["idx"]]
        s.update(id=k, s=ws[0]["s"], e=ws[-1]["e"], text=" ".join(w["w"] for w in ws), toks=[norm(w["w"]) for w in ws])
    return out


def mark_fillers(words: list[dict], fillers: set[str]) -> None:
    for w in words:
        w["filler"] = norm(w["w"]) in fillers


def _jaccard(a: list[str], b: list[str]) -> float:
    A, B = set(a), set(b)
    return len(A & B) / max(1, len(A | B))


def find_repeats(sents: list[dict], window: float) -> list[tuple[int, int, str]]:
    """(dropped_id, kept_id, reason) for earlier takes that the speaker re-says right after."""
    found = []
    for i, a in enumerate(sents):
        for b in sents[i + 1 : i + 4]:
            if b["s"] - a["e"] > window:
                break
            ta, tb = [t for t in a["toks"] if t], [t for t in b["toks"] if t]
            if not ta or not tb:
                continue
            same2 = len(ta) >= 2 and len(tb) >= 2 and ta[:2] == tb[:2]
            same1_short = ta[0] == tb[0] and len(ta) <= 6 and len(ta) < len(tb)
            similar = _jaccard(ta, tb) >= 0.5 and len(ta) <= len(tb) * 1.3
            if same2 or similar or same1_short:
                reason = "same opening as the next sentence" if (same2 or same1_short) else "near-duplicate of the next sentence"
                found.append((a["id"], b["id"], reason))
                break
    return found


def _has_phrase(toks: list[str], phrase: str, first_n: int | None = None) -> bool:
    p = phrase.split()
    hay = toks[:first_n] if first_n else toks
    hay = [t.replace("-", " ") for t in hay]
    joined = " " + " ".join(hay) + " "
    return (" " + " ".join(p) + " ") in joined


def detect_structure(sents: list[dict], kept: list[int], topic: dict, review: list[dict]) -> dict:
    """Assign each kept sentence a section: hook, intro, step k, key, close. Steps must appear in order."""
    order = [s for s in sents if s["id"] in kept]
    steps_cfg = topic.get("steps") or []
    step_start: dict[int, int] = {}
    cursor = 0
    for k, st in enumerate(steps_cfg):
        hit = None
        # 1) a spoken marker near the start of a sentence ("Number 2", "Yang ketiga", "First,")
        for j in range(cursor, len(order)):
            # markers only count near the start of a sentence, so "…tapi step 4 is what helps…" in the intro is not step 4
            if any(_has_phrase(order[j]["toks"], m, first_n=4) for m in st["markers"]):
                hit = (j, "marker")
                break
        # 2) otherwise the first later sentence that talks about the step's keywords
        if hit is None:
            for j in range(cursor, len(order)):
                if any(_has_phrase(order[j]["toks"], kw) for kw in st.get("keywords", [])):
                    hit = (j, "keyword")
                    break
        if hit is None:
            review.append({"type": "step-missing", "detail": f'Step {k + 1} "{st["title"]}" not found in the footage; no title shown for it.'})
            continue
        j, how = hit
        step_start[k] = order[j]["id"]
        cursor = j + 1
        if how == "keyword":
            review.append({"type": "step-guessed", "at": order[j]["s"], "detail": f'Step {k + 1} "{st["title"]}" placed by topic keywords (no spoken marker): "{order[j]["text"]}"'})

    key_id = None
    km = topic.get("key_message")
    if km:
        for s in order:
            if any(_has_phrase(s["toks"], t) for t in km["triggers"]):
                key_id = s["id"]
                break

    first_step_id = min(step_start.values()) if step_start else None
    sections: dict[int, str] = {}
    current = "intro"
    step_by_start = {sid: k for k, sid in step_start.items()}
    hook_ids = _hook_ids(order)
    for s in order:
        if s["id"] in hook_ids:
            sections[s["id"]] = "hook"
            continue
        if s["id"] in step_by_start:
            current = f"step{step_by_start[s['id']] + 1}"
        if key_id is not None and s["id"] >= key_id:
            current = "key"
        sections[s["id"]] = current if (first_step_id is not None and s["id"] >= first_step_id) or current == "key" else "intro"
    return {"sections": sections, "step_start": step_start, "key_id": key_id, "hook_ids": hook_ids}


def _hook_ids(order: list[dict]) -> list[int]:
    if not order:
        return []
    ids = [order[0]["id"]]
    # the hook is the opening line; short follow-on fragments ("Makan nasi pun.") belong to it
    for s in order[1:3]:
        if s["e"] - s["s"] <= 1.6 and len(s["toks"]) <= 4 and s["s"] - order[0]["e"] < 1.0:
            ids.append(s["id"])
        else:
            break
    return ids


def confidence_review(sents: list[dict], words: list[dict], kept: list[int], low: float) -> list[dict]:
    out = []
    for s in sents:
        if s["id"] in kept:
            weak = [words[i]["w"] for i in s["idx"] if words[i]["w"] and words[i]["p"] < low and not words[i].get("filler")]
            if weak:
                out.append({"type": "low-confidence", "at": s["s"], "detail": f'"{s["text"]}" — unsure about: {", ".join(weak)}'})
    return out


def spoken_len(sents: list[dict], ids: list[int], words: list[dict], max_gap: float) -> float:
    total = 0.0
    for s in sents:
        if s["id"] not in ids:
            continue
        ws = [words[i] for i in s["idx"] if not words[i].get("filler")]
        if not ws:
            continue
        total += ws[-1]["e"] - ws[0]["s"] + 0.2
        for a, b in zip(ws, ws[1:]):
            g = b["s"] - a["e"]
            if g > max_gap:
                total -= g - max_gap
    return total


def plan(words: list[dict], cfg: dict, topic: dict) -> dict:
    ed = cfg["editing"]
    review: list[dict] = []
    mark_fillers(words, set(cfg["fillers"]))
    sents = sentences(words, ed["sentence_gap"])
    dropped: dict[int, str] = {}
    for a, b, why in find_repeats(sents, ed["false_start_window"]):
        dropped[a] = f"repeated take ({why})"
        sa, sb = sents[a], sents[b]
        review.append({"type": "repeat-removed", "at": sa["s"], "detail": f'Removed "{sa["text"]}" — kept the retake "{sb["text"]}"'})
    kept = [s["id"] for s in sents if s["id"] not in dropped]

    struct = detect_structure(sents, kept, topic, review)

    # length control: drop the least important whole sentences until under the max (never part of a sentence)
    tmax, tmin = cfg["target_seconds"]["max"], cfg["target_seconds"]["min"]

    def score(s: dict) -> float:
        sec = struct["sections"].get(s["id"], "intro")
        base = {"hook": 100, "key": 95}.get(sec, 40)
        if s["id"] in struct["step_start"].values():
            base = 90
        if s["id"] == kept[-1]:
            base = max(base, 85)
        hits = sum(1 for t in s["toks"] if t in set(cfg["highlight_words"]))
        return base + 4 * hits - 0.5 * (s["e"] - s["s"])

    length = spoken_len(sents, kept, words, ed["max_gap"])
    while length > tmax:
        cands = [s for s in sents if s["id"] in kept and score(s) < 85]
        if not cands:
            review.append({"type": "too-long", "detail": f"Reel is {length:.0f}s; nothing else could be cut without losing the hook, a step title or the close."})
            break
        victim = min(cands, key=score)
        kept.remove(victim["id"])
        dropped[victim["id"]] = "trimmed for length"
        review.append({"type": "trimmed", "at": victim["s"], "detail": f'Cut for length: "{victim["text"]}" — put it back in project.json if it matters'})
        length = spoken_len(sents, kept, words, ed["max_gap"])
        struct = detect_structure(sents, kept, topic, [])
    if length < tmin:
        review.append({"type": "too-short", "detail": f"Reel is only {length:.0f}s (target {tmin}–{tmax}s)."})

    review += confidence_review(sents, words, kept, cfg["transcription"]["low_confidence"])
    for s in sents:
        s["keep"] = s["id"] in kept
        s["why_dropped"] = dropped.get(s["id"])
        s["section"] = struct["sections"].get(s["id"])
    return {"sentences": sents, "structure": struct, "review": review}
