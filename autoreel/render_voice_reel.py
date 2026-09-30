"""Render a Reel with Coach Nas's recorded voice and captions synced to it.

No speech-recognition model is needed: the script is already known (teleprompter
lines), so we detect pauses in the recording, align each script line to a run of
speech segments (dynamic programming against the speaking rate), then place
caption chunks inside each line by syllable count.

Usage: python3 render_voice_reel.py spec.json out.mp4
"""
import json
import os
import re
import subprocess
import sys
import tempfile

import imageio_ffmpeg
from PIL import Image, ImageDraw

from music import make_bed
from render_reel import (
    BAR, FPS, GOLD, GOLD_TEXT, GREEN, H, HEAD, ITALIC, MINT, SAFE_BOTTOM, SAFE_LEFT, SAFE_RIGHT,
    SAFE_TOP, SANS_BOLD, W, apply_wipe, base_frame, ease, font, plain_lines, render_scene, wrap,
)

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


# ---------- audio analysis ----------

def speech_segments(path, noise_db=-35, min_silence=0.35, min_speech=0.15):
    out = subprocess.run(
        [FFMPEG, "-hide_banner", "-i", path, "-af", f"silencedetect=noise={noise_db}dB:d={min_silence}", "-f", "null", "-"],
        capture_output=True, text=True,
    ).stderr
    hh, mm, ss = re.search(r"Duration: (\d+):(\d+):([\d.]+)", out).groups()
    duration = int(hh) * 3600 + int(mm) * 60 + float(ss)
    starts = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", out)]
    ends = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", out)]
    segs, cursor = [], 0.0
    for s, e in zip(starts, ends + [duration] * (len(starts) - len(ends))):
        if s - cursor >= min_speech:
            segs.append([cursor, s])
        cursor = e
    if duration - cursor >= min_speech:
        segs.append([cursor, duration])
    return segs, duration


def syllables(word):
    return max(1, len(re.findall(r"[aeiou]+", word.lower())))


def count_nuclei(path, segs):
    """Rough syllable count per speech segment from loudness peaks (no ASR needed)."""
    import numpy as np

    raw = subprocess.run([FFMPEG, "-loglevel", "error", "-i", path, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"],
                         capture_output=True).stdout
    x = np.frombuffer(raw, np.int16).astype(float) / 32768
    rms = np.sqrt(np.convolve(x ** 2, np.ones(400) / 400, "same"))[::160]
    win = np.hanning(7)
    env = np.convolve(rms, win / win.sum(), "same")
    counts = []
    for s, e in segs:
        seg = env[int(s * 100):int(e * 100)]
        n, last = 0, -99
        thr = 0.3 * seg.max() if len(seg) else 0
        for i in range(1, len(seg) - 1):
            if seg[i] > seg[i - 1] and seg[i] >= seg[i + 1] and seg[i] > thr and i - last >= 10:
                n, last = n + 1, i
        counts.append(max(1, n))
    return counts


def align_lines(lines, nuclei, skip_penalty=0.6):
    """Assign each script line a contiguous run of speech segments by syllable count.

    Segments may be skipped (ad-libs, false starts not in the script) at a cost
    per syllable, so extra speech doesn't drag every later caption out of sync.
    Returns [(first_seg, end_seg)] per line.
    """
    syl = [sum(syllables(w) for w in ln.split()) for ln in lines]
    scale = sum(nuclei) / sum(syl)  # calibrate peak counting against the script
    n, m = len(lines), len(nuclei)
    pre = [0]
    for c in nuclei:
        pre.append(pre[-1] + c)
    INF = float("inf")
    # cost[j][i]: best cost with j lines placed and first i segments consumed.
    cost = [[INF] * (m + 1) for _ in range(n + 1)]
    back = [[None] * (m + 1) for _ in range(n + 1)]
    cost[0][0] = 0.0
    for j in range(n + 1):
        for i in range(m + 1):
            c0 = cost[j][i]
            if c0 == INF:
                continue
            if i < m:  # skip segment i
                c = c0 + skip_penalty * nuclei[i]
                if c < cost[j][i + 1]:
                    cost[j][i + 1], back[j][i + 1] = c, ("skip", i)
            if j < n:
                exp = syl[j] * scale
                for k in range(i + 1, m + 1):
                    got = pre[k] - pre[i]
                    if got > exp * 2.2:
                        break
                    c = c0 + syl[j] * ((got - exp) / exp) ** 2
                    if c < cost[j + 1][k]:
                        cost[j + 1][k], back[j + 1][k] = c, ("line", i)
    spans, skipped, j, i = [], [], n, m
    while j > 0 or i > 0:
        kind, prev = back[j][i]
        if kind == "skip":
            skipped.append(prev)
            i = prev
        else:
            spans.append((prev, i))
            j, i = j - 1, prev
    return list(reversed(spans)), sorted(skipped)


def time_at(segs_run, frac):
    """Map a 0..1 fraction of speaking time onto real time across a run of segments."""
    total = sum(e - s for s, e in segs_run)
    target = frac * total
    for s, e in segs_run:
        if target <= e - s:
            return s + target
        target -= e - s
    return segs_run[-1][1]


def chunk_line(text, max_words=4, max_chars=24):
    words, chunks, cur = text.split(), [], []
    for w in words:
        if cur and (len(cur) >= max_words or len(" ".join(cur + [w])) > max_chars):
            chunks.append(cur)
            cur = []
        cur.append(w)
        if re.search(r"[,.:;!?…]$", w) and len(cur) >= 2:
            chunks.append(cur)
            cur = []
    if cur:
        chunks.append(cur)
    return [" ".join(c) for c in chunks]


def build_timeline(spec, segs, nuclei, offset):
    lines = [ln["text"] for ln in spec["lines"]]
    if len(segs) < len(lines):
        sys.exit("Fewer speech segments than script lines; cannot align.")
    spans, skipped = align_lines(lines, nuclei)
    timeline = []
    for li, (ln, (a, b)) in enumerate(zip(spec["lines"], spans)):
        run = segs[a:b]
        chunks = chunk_line(ln["text"])
        syl = [sum(syllables(w) for w in c.split()) for c in chunks]
        total, acc = sum(syl), 0
        for c, s in zip(chunks, syl):
            timeline.append({"line": li, "text": c, "start": time_at(run, acc / total) - offset})
            acc += s
        timeline[-1]["line_end"] = run[-1][1] - offset
    for i, item in enumerate(timeline):
        nxt = timeline[i + 1]["start"] if i + 1 < len(timeline) else item["start"] + 1.5
        item["end"] = nxt
    return timeline, spans, skipped


# ---------- drawing ----------

def draw_caption(img, spec, item, t):
    line = spec["lines"][item["line"]]
    hl = {w.strip(".,!?:;“”‘’…").lower() for w in line.get("highlight", [])}
    d = ImageDraw.Draw(img)
    cf = font(HEAD, 92)
    max_w = SAFE_RIGHT - SAFE_LEFT
    lines = wrap(d, item["text"], cf, max_w)
    lh = cf.size * 1.18
    y0 = 860 - len(lines) * lh / 2
    p = ease((t - item["start"]) / 0.14)
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    a = int(255 * p)
    space = ld.textlength(" ", font=cf)
    for i, ln in enumerate(lines):
        x = SAFE_LEFT
        y = y0 + i * lh + (1 - p) * 26
        for word in ln.split():
            wl = ld.textlength(word, font=cf)
            is_hl = word.strip(".,!?:;“”‘’…").lower() in hl
            ld.text((x, y), word, font=cf, fill=(GOLD if is_hl else GREEN) + (a,))
            x += wl + space
    img.alpha_composite(layer)


def draw_chip(img, text, t_in):
    a = ease(t_in / 0.3)
    if a <= 0:
        return
    f = font(SANS_BOLD, 38)
    d = ImageDraw.Draw(img)
    tw = d.textlength(text.upper(), font=f)
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    y = 1180 + (1 - a) * 20
    al = int(255 * a)
    ld.rounded_rectangle([SAFE_LEFT, y, SAFE_LEFT + tw + 60, y + 76], radius=38, fill=MINT + (al,))
    ld.rectangle([SAFE_LEFT, y + 14, SAFE_LEFT + 6, y + 62], fill=BAR + (al,))
    ld.text((SAFE_LEFT + 30, y + 17), text.upper(), font=f, fill=GREEN + (al,))
    img.alpha_composite(layer)


def frame_at(spec, timeline, line_start, t, speech_end):
    img = base_frame(spec)
    if spec.get("kicker"):
        plain_lines(img, [spec["kicker"].upper()], font(SANS_BOLD, 34), GOLD_TEXT, SAFE_TOP, 1, 0)
        ImageDraw.Draw(img).rectangle([SAFE_LEFT, SAFE_TOP + 60, SAFE_LEFT + 90, SAFE_TOP + 64], fill=GOLD)
    active = None
    for item in timeline:
        if item["start"] <= t < item["end"]:
            active = item
    if active and t <= speech_end + 0.3:
        draw_caption(img, spec, active, t)
        chip = spec["lines"][active["line"]].get("overlay")
        if chip:
            draw_chip(img, chip, t - line_start[active["line"]])
    return img


def main(spec_path, out_path):
    with open(spec_path, encoding="utf-8") as fh:
        spec = json.load(fh)
    base = os.path.dirname(os.path.abspath(spec_path))
    audio = os.path.join(base, spec["audio"])

    segs, _ = speech_segments(audio)
    # Drop false starts / retakes before "audio_start" (seconds into the raw recording).
    segs = [sg for sg in segs if sg[0] >= spec.get("audio_start", 0.0)]
    offset = max(0.0, segs[0][0] - spec.get("lead_in", 0.25))  # trim dead air before the first word
    nuclei = count_nuclei(audio, segs)
    timeline, spans, skipped = build_timeline(spec, segs, nuclei, offset)
    speech_end = segs[-1][1] - offset
    line_start = {}
    for item in timeline:
        line_start.setdefault(item["line"], item["start"])

    end_card = spec.get("end_card")
    end_dur = end_card["duration"] if end_card else 0
    total = speech_end + 0.4 + end_dur

    with open(os.path.splitext(out_path)[0] + ".timing.json", "w", encoding="utf-8") as fh:
        json.dump({"trim_start": round(offset, 2), "chunks": [
            {k: (round(v, 2) if isinstance(v, float) else v) for k, v in it.items()} for it in timeline
        ]}, fh, ensure_ascii=False, indent=1)

    bed = tempfile.NamedTemporaryFile(suffix=".wav", delete=False).name
    make_bed(total, bed, seed=sum(map(ord, spec.get("date", ""))))
    music_gain = spec.get("music_gain", 0.45)
    fade_st = max(0.0, total - 1.5)
    filt = (
        f"[1:a]atrim=start={offset:.3f},asetpts=PTS-STARTPTS,highpass=f=80,"
        f"loudnorm=I=-16:TP=-1.5:LRA=11,aresample=44100,aformat=channel_layouts=stereo[v];"
        f"[2:a]volume={music_gain}[m];"
        f"[v][m]amix=inputs=2:duration=longest:normalize=0,"
        f"afade=t=out:st={fade_st:.2f}:d=1.5[aout]"
    )
    cmd = [
        FFMPEG, "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
        "-i", audio, "-i", bed,
        "-filter_complex", filt, "-map", "0:v", "-map", "[aout]", "-t", f"{total:.2f}",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
        "-c:a", "aac", "-b:a", "160k", "-movflags", "+faststart", out_path,
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    end_start = speech_end + 0.4
    for f in range(int(total * FPS)):
        t = f / FPS
        if end_card and t >= end_start:
            img = apply_wipe(render_scene(spec, dict(end_card, type="cta"), t - end_start), t - end_start)
        else:
            img = frame_at(spec, timeline, line_start, t, speech_end)
        proc.stdin.write(img.convert("RGB").tobytes())
    proc.stdin.close()
    code = proc.wait()
    os.unlink(bed)
    if code != 0:
        sys.exit("ffmpeg failed")
    for (a, b), ln in zip(spans, spec["lines"]):
        print(f"{segs[a][0] - offset:6.2f}-{segs[b - 1][1] - offset:6.2f}  {ln['text']}")
    for i in skipped:
        print(f"{segs[i][0] - offset:6.2f}-{segs[i][1] - offset:6.2f}  [not in script: no caption]")


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
