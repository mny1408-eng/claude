"""Cut a talking-head reel from teleprompter takes.

edit.json: {"takes": [{"file": "x.mp4", "words": "work/rt_x.json", "upto": 5.4 (optional cut-off), "from": 0 (optional)}],
            "grade": {"brightness": 0.0, "contrast": 1.0, "saturation": 1.0} (optional),
            "blur": [x, y, w, h] (optional, hides e.g. a shirt logo), "fixes": {"wrong word": "right word"}}
            a take may carry "nocut": [[from, to]] (source seconds) where quiet speech must not be cut as silence
Edges come from real speech (silencedetect), silences inside a take of 0.35 s or more are cut to 0.1 s pads.
Writes <proj>/work/talk.mp4 and <proj>/work/words.json ([start, end, text] on the cut timeline).
"""
import json, re, subprocess, sys
from pathlib import Path

GAP, PAD = 0.35, 0.1


def silences(wav: Path, dur: float, db: int = -32) -> list[tuple[float, float]]:
    err = subprocess.run(["ffmpeg", "-i", str(wav), "-af", f"silencedetect=noise={db}dB:d=0.25", "-f", "null", "-"], capture_output=True, text=True).stderr
    st = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    en = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    en += [dur] * (len(st) - len(en))
    return list(zip(st, en))


def onset(wav: Path, a: float, db: float = -26) -> float:
    err = subprocess.run(["ffmpeg", "-ss", str(a), "-i", str(wav), "-af", "asetnsamples=1600,astats=metadata=1:reset=1,ametadata=print:key=lavfi.astats.Overall.RMS_level",
                          "-f", "null", "-"], capture_output=True, text=True).stderr
    for k, v in enumerate(re.findall(r"RMS_level=(-?[\d.]+|-inf)", err)):
        if v != "-inf" and float(v) > db:
            return a + k * 0.1
    return a


def speech_spans(a: float, b: float, sil: list[tuple[float, float]], keep=()) -> list[tuple[float, float]]:
    """Speech inside [a, b] with long silences removed; edges trimmed to speech."""
    spans, cur = [], a
    for s, e in sil:
        if e <= a or s >= b or any(s < k1 and e > k0 for k0, k1 in keep):
            continue
        s, e = max(s, a), min(e, b)
        if s <= a + 0.5:  # leading silence: start at speech
            cur = e - 0.06
            continue
        if e >= b - 0.3:  # trailing silence: end at speech
            b = s + 0.08
            break
        if e - s >= GAP:
            spans.append((cur, s + PAD))
            cur = e - PAD
    spans.append((cur, b))
    return [(round(x, 3), round(y, 3)) for x, y in spans if y - x > 0.05]


def main(proj: Path) -> None:
    ed = json.loads((proj / "edit.json").read_text())
    fixes = ed.get("fixes", {})
    pieces, words, t = [], [], 0.0
    for k, tk in enumerate(ed["takes"]):
        clip = proj / "clips" / tk["file"]
        wav = proj / "work" / (Path(tk["file"]).stem + ".wav")
        ws = json.loads((proj / tk["words"]).read_text())
        dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(clip)], capture_output=True, text=True).stdout)
        a = tk.get("from", 0.0)
        last = k == len(ed["takes"]) - 1
        b = min(dur, tk.get("upto", ws[-1][2] + (0.6 if last else 0.25)))
        # real start: first 100 ms window louder than -26 dB (car/room noise sits around -30 to -35 dB)
        a = max(a, onset(wav, a, tk.get("onset_db", -26)) - 0.1)  # onset_db: lower it (e.g. -36) for a soft-spoken start
        spans = speech_spans(a, b, silences(wav, dur), tk.get("nocut", ()))
        if last:  # let the last word ring out
            spans[-1] = (spans[-1][0], min(dur, spans[-1][1] + 0.3))
        offs, tt = [], t
        for s, e in spans:
            pieces.append((clip, s, e))
            offs.append((s, e, tt))
            tt += e - s
        for w in ws:
            if w[1] >= b or w[2] <= tk.get("from", 0.0) + 0.05:
                continue
            txt = w[0]
            for f, r in fixes.items():
                txt = txt.replace(f, r)
            mid = (w[1] + w[2]) / 2
            # the span holding the word's middle, else the nearest one (whisper timings drift over pauses)
            s, e, o = min(offs, key=lambda q: 0 if q[0] <= mid < q[1] else min(abs(mid - q[0]), abs(mid - q[1])))
            st = min(max(w[1], s), e - 0.12)
            en = max(min(w[2], e), st + 0.12)
            words.append([round(o + st - s, 2), round(o + en - s, 2), txt])
        t = tt
    # merge hyphen tails whisper splits off ("pandai", "-pandai")
    merged = []
    for w in words:
        if w[2].startswith("-") and merged:
            merged[-1] = [merged[-1][0], w[1], merged[-1][2] + w[2]]
        else:
            merged.append(w)
    g = ed.get("grade")
    eq = f",eq=brightness={g.get('brightness', 0)}:contrast={g.get('contrast', 1)}:saturation={g.get('saturation', 1)}" if g else ""
    if ed.get("grade_filter"):  # full ffmpeg filter chain, e.g. curves for harsh sun
        eq = "," + ed["grade_filter"]
    fc, cat = "", ""
    for i, (_, s, e) in enumerate(pieces):
        fc += (f"[{i}:v]trim={s}:{e},setpts=PTS-STARTPTS,scale=1080:1920,fps=30,format=yuv420p,setsar=1{eq}[v{i}];"
               f"[{i}:a]atrim={s}:{e},asetpts=PTS-STARTPTS,aresample=48000,afade=t=in:d=0.02,afade=t=out:st={max(0, e - s - 0.04):.3f}:d=0.04[a{i}];")
        cat += f"[v{i}][a{i}]"
    fc += cat + f"concat=n={len(pieces)}:v=1:a=1[vc][ax];[ax]loudnorm=I=-16:TP=-1.5:LRA=11[a]"
    # blur regions (e.g. a shirt logo naming the workplace), feathered so they don't read as boxes
    regions = ed.get("blur", [])
    if regions and not isinstance(regions[0], list):
        regions = [regions]
    last = "vc"
    for i, (x, y, w, h) in enumerate(regions):
        fc += (f";[{last}]split[base{i}][bl{i}];[bl{i}]crop={w}:{h}:{x}:{y},gblur=sigma=34,format=yuva420p,"
               f"geq=lum='lum(X,Y)':cb='cb(X,Y)':cr='cr(X,Y)':a='255*min(1,min(min({'X' if x > 0 else '999'},{'W-X' if x + w < 1080 else '999'}),min({'Y' if y > 0 else '999'},{'H-Y' if y + h < 1920 else '999'}))/45)'[bb{i}];"
               f"[base{i}][bb{i}]overlay={x}:{y}[o{i}]")
        last = f"o{i}"
    fc += f";[{last}]null[v]"
    args = ["ffmpeg", "-y", "-loglevel", "error"]
    for p, *_ in pieces:
        args += ["-i", str(p)]
    args += ["-filter_complex", fc, "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "15", "-preset", "slow", "-g", "30",
             "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(proj / "work" / "talk.mp4")]
    subprocess.run(args, check=True)
    (proj / "work" / "words.json").write_text(json.dumps(merged, ensure_ascii=False))
    print(f"{len(pieces)} pieces, {t:.2f}s")
    print(" ".join(f"{w[2]}@{w[0]}" for w in merged))


if __name__ == "__main__":
    main(Path(sys.argv[1]))
