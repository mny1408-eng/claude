"""Edit decision list → cut 9:16 video, plus time mapping, face-aware layout and subtitle export."""
from __future__ import annotations

import json
import subprocess
from pathlib import Path


def probe(src: Path) -> dict:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:stream_side_data=rotation:format=duration",
         "-of", "json", str(src)], capture_output=True, text=True, check=True).stdout
    j = json.loads(out)
    st = j["streams"][0]
    w, h = st["width"], st["height"]
    rot = 0
    for sd in st.get("side_data_list", []) or []:
        rot = int(sd.get("rotation", 0) or 0)
    if abs(rot) in (90, 270):
        w, h = h, w
    return {"w": w, "h": h, "duration": float(j["format"]["duration"])}


def build_segments(words: list[dict], sents: list[dict], ed: dict) -> list[dict]:
    """Keep whole kept sentences minus fillers; long pauses inside them are shortened to `max_gap`."""
    kept_idx = []
    for s in sents:
        if s["keep"]:
            kept_idx += [i for i in s["idx"] if not words[i].get("filler")]
    kept_idx.sort()
    segs: list[list[int]] = []
    for i in kept_idx:
        if segs and i == segs[-1][-1] + 1 and words[i]["s"] - words[segs[-1][-1]]["e"] <= ed["max_gap"]:
            segs[-1].append(i)
        else:
            segs.append([i])
    out = []
    for g in segs:
        a, b = g[0], g[-1]
        prev_end = words[a - 1]["e"] if a > 0 else 0.0
        next_start = words[b + 1]["s"] if b + 1 < len(words) else words[b]["e"] + 1.0
        # pad into silence only, never into a neighbouring (removed) word
        start = max(prev_end + 0.02, words[a]["s"] - ed["lead"]) if a > 0 else max(0.0, words[a]["s"] - ed["lead"])
        end = min(next_start - 0.02, words[b]["e"] + ed["tail"])
        out.append({"src_s": round(start, 3), "src_e": round(max(end, words[b]["e"]), 3), "words": g})
    # merge segments that nearly touch
    merged = []
    for s in out:
        if merged and s["src_s"] - merged[-1]["src_e"] < 0.06:
            merged[-1]["src_e"] = s["src_e"]
            merged[-1]["words"] += s["words"]
        else:
            merged.append(s)
    t = 0.0
    for s in merged:
        s["out_s"] = round(t, 3)
        t += s["src_e"] - s["src_s"]
        s["out_e"] = round(t, 3)
    return merged


def map_time(segs: list[dict], t: float) -> float | None:
    for s in segs:
        if s["src_s"] - 1e-3 <= t <= s["src_e"] + 1e-3:
            return round(s["out_s"] + (min(max(t, s["src_s"]), s["src_e"]) - s["src_s"]), 3)
    return None


def render_cut(src: Path, segs: list[dict], dst: Path, layout: dict, crop_x: float | None = None) -> None:
    """Trim + concat in one filter graph, scaled to cover 1080×1920 (centre crop, or around the face for landscape input)."""
    W, H, fps = layout["width"], layout["height"], layout["fps"]
    cx = "(iw-ow)/2" if crop_x is None else f"max(0,min(iw-ow,{crop_x:.4f}*iw-ow/2))"
    parts, labels = [], []
    for k, s in enumerate(segs):
        d = s["src_e"] - s["src_s"]
        parts.append(
            f"[0:v]trim={s['src_s']}:{s['src_e']},setpts=PTS-STARTPTS,scale={W}:{H}:force_original_aspect_ratio=increase,"
            f"crop={W}:{H}:{cx}:(ih-oh)/2,fps={fps},format=yuv420p,setsar=1[v{k}];"
            f"[0:a]atrim={s['src_s']}:{s['src_e']},asetpts=PTS-STARTPTS,aresample=48000,"
            f"afade=t=in:d=0.02,afade=t=out:st={max(0, d - 0.04):.3f}:d=0.04[a{k}];")
        labels.append(f"[v{k}][a{k}]")
    graph = "".join(parts) + "".join(labels) + f"concat=n={len(segs)}:v=1:a=1[v][ax];[ax]loudnorm=I=-16:TP=-1.5:LRA=11[a]"
    gf = dst.with_suffix(".filter.txt")
    gf.write_text(graph)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(src), "-filter_complex_script", str(gf), "-map", "[v]", "-map", "[a]",
                    "-c:v", "libx264", "-crf", "18", "-preset", "fast", "-c:a", "aac", "-b:a", "192k", "-ar", "48000", str(dst)], check=True)


def face_box(video: Path, samples: int = 12) -> dict | None:
    """Median face box (in output pixels) from evenly spaced frames; None if no face is found."""
    import cv2

    cap = cv2.VideoCapture(str(video))
    n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)) or 1
    det = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    boxes = []
    for k in range(samples):
        cap.set(cv2.CAP_PROP_POS_FRAMES, int((k + 0.5) * n / samples))
        ok, frame = cap.read()
        if not ok:
            continue
        g = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        small = cv2.resize(g, (g.shape[1] // 2, g.shape[0] // 2))
        faces = det.detectMultiScale(small, 1.1, 6, minSize=(80, 80))
        if len(faces):
            x, y, w, h = max(faces, key=lambda f: f[2] * f[3])
            boxes.append((int(2 * x), int(2 * y), int(2 * w), int(2 * h)))
    cap.release()
    if len(boxes) < max(2, samples // 4):
        return None
    med = lambda i: sorted(b[i] for b in boxes)[len(boxes) // 2]
    x, y, w, h = med(0), med(1), med(2), med(3)
    return {"x": x, "y": y, "w": w, "h": h, "cx": x + w / 2.0, "cy": y + h / 2.0, "bottom": y + h, "frames": len(boxes)}


def layout_for(face: dict | None, lay: dict, review: list[dict]) -> dict:
    """Captions sit just under the chin, titles above the head, both inside the platform-safe area."""
    title_top = lay["title_top"]
    if face is None:
        review.append({"type": "no-face", "detail": "Face not detected; captions placed at the default height (y=1100). Check they don't cover your face."})
        return {"title_top": title_top, "caption_top": 1100, "zoom_origin": [0.5, 0.35], "face": None}
    chin = face["bottom"] + 0.22 * face["h"]  # Haar boxes stop around the upper lip / chin
    cap_top = int(min(max(chin, 980), lay["safe_bottom"] - 260))
    if face["y"] < title_top + 170:
        review.append({"type": "tight-top", "detail": "Your head is high in frame; the title card may touch your hair."})
    return {
        "title_top": title_top,
        "caption_top": cap_top,
        "zoom_origin": [round(face["cx"] / lay["width"], 3), round(face["cy"] / lay["height"], 3)],
        "face": face,
    }


def srt(chunks: list[dict], path: Path) -> None:
    def ts(t: float) -> str:
        ms = int(round(t * 1000))
        h, ms = divmod(ms, 3600000)
        m, ms = divmod(ms, 60000)
        s, ms = divmod(ms, 1000)
        return f"{h:02}:{m:02}:{s:02},{ms:03}"

    lines = []
    for k, c in enumerate(chunks, 1):
        lines += [str(k), f"{ts(c['s'])} --> {ts(c['e'])}", " ".join(w["w"] for w in c["words"]), ""]
    path.write_text("\n".join(lines), encoding="utf-8")


def chunk_words(ws: list[dict], max_words: int = 3, gap: float = 0.35) -> list[dict]:
    chunks, cur = [], []
    for i, w in enumerate(ws):
        cur.append(w)
        nxt = ws[i + 1] if i + 1 < len(ws) else None
        if nxt is None or len(cur) >= max_words or w["w"][-1:] in ".,?!" or nxt["s"] - w["e"] > gap:
            chunks.append({"s": cur[0]["s"], "e": min(cur[-1]["e"] + 0.25, nxt["s"] if nxt else cur[-1]["e"] + 0.6), "words": cur})
            cur = []
    return chunks
