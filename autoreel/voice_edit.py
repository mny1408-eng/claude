"""Edit a teleprompter recording: remove cut ranges (false starts, retakes) and
shorten long pauses. Returns the edited audio plus where each kept speech segment
landed in the new timeline, so captions/boards can be timed against it.
"""
import subprocess
import wave

import imageio_ffmpeg
import numpy as np

from render_voice_reel import count_nuclei, speech_segments

SR = 48000
PAD = 0.08  # keep a little air around each word so edits don't clip consonants


def _load(path):
    raw = subprocess.run(
        [imageio_ffmpeg.get_ffmpeg_exe(), "-loglevel", "error", "-i", path, "-ac", "1", "-ar", str(SR), "-f", "s16le", "-"],
        capture_output=True,
    ).stdout
    return np.frombuffer(raw, np.int16).astype(np.float32) / 32768


def edit_voice(path, cuts, max_pause, lead_in, out_wav):
    segs, _ = speech_segments(path)
    nuclei = count_nuclei(path, segs)
    kept = [(s, e, n) for (s, e), n in zip(segs, nuclei)
            if not any(cs <= (s + e) / 2 <= ce for cs, ce in cuts)]
    x = _load(path)
    pieces, new_segs, new_nuclei, cursor = [np.zeros(int(lead_in * SR), np.float32)], [], [], lead_in
    mapping = []  # (raw_start, raw_end, new_start) per kept segment
    prev_end = None
    for s, e, n in kept:
        if prev_end is not None:
            gap = min(max_pause, max(0.0, s - prev_end))
            pieces.append(np.zeros(int(gap * SR), np.float32))
            cursor += gap
        a, b = int(max(0, s - PAD) * SR), int(min(len(x) / SR, e + PAD) * SR)
        clip = x[a:b].copy()
        ramp = min(len(clip) // 2, int(0.01 * SR))
        if ramp:
            clip[:ramp] *= np.linspace(0, 1, ramp)
            clip[-ramp:] *= np.linspace(1, 0, ramp)
        pieces.append(clip)
        seg_start = cursor + (s - a / SR)
        new_segs.append([seg_start, seg_start + (e - s)])
        new_nuclei.append(n)
        mapping.append((s, e, seg_start))
        cursor += len(clip) / SR
        prev_end = e
    y = np.concatenate(pieces)
    with wave.open(out_wav, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes((np.clip(y, -1, 1) * 32767).astype(np.int16).tobytes())
    return new_segs, new_nuclei, len(y) / SR, mapping


def raw_to_edited(t, mapping):
    """Where a moment in the raw recording ends up after editing."""
    for s, e, ns in mapping:
        if t <= e:
            return ns + max(0.0, t - s)
    s, e, ns = mapping[-1]
    return ns + (e - s)
