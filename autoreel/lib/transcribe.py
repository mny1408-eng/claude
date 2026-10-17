"""Speech-to-text with word timestamps (faster-whisper, runs locally on CPU).

Malaysian rojak needs care. Whisper decides one language per 30s window, and on a long BM+EN recording with
language="ms" it starts *translating* the English parts ("Consistency is the key" → "Konsistensi adalah kunci").
What works (tested on Coach Nas's footage, 17/10/2026):
  * cut the audio at natural pauses into ≤12s chunks and transcribe each chunk on its own;
  * language="ms" plus a short *code-switching example* prompt, so Whisper keeps English words in English.
The prompt only shows the style and spells domain words; it is never copied into the transcript. As a guard, chunks that
still read like formal translated Malay are flagged for review.
"""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

# formal Malay words a casual rojak speaker rarely uses; several in one chunk usually means Whisper translated English
TRANSLATION_TELLS = {"anda", "adalah", "ialah", "apabila", "selamatkan", "konsistensi", "kebiasaan", "tetapi", "mempunyai", "sangatlah"}


def extract_audio(src: Path, wav: Path) -> None:
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(src), "-vn", "-ac", "1", "-ar", "16000", str(wav)], check=True)


def pause_chunks(wav: Path, dur: float, min_len: float = 4.0, target: float = 8.0, max_len: float = 14.0) -> list[tuple[float, float]]:
    err = subprocess.run(["ffmpeg", "-i", str(wav), "-af", "silencedetect=n=-35dB:d=0.3", "-f", "null", "-"], capture_output=True, text=True).stderr
    s = [float(x) for x in re.findall(r"silence_start: ([\d.]+)", err)]
    e = [float(x) for x in re.findall(r"silence_end: ([\d.]+)", err)]
    mids = [(a + b) / 2 for a, b in zip(s, e)]
    chunks, a = [], 0.0
    for m in mids:
        if m - a >= min_len and m - a >= target:
            chunks.append((a, m))
            a = m
        elif m - a > max_len:  # no pause long enough: cut at the last pause we saw
            chunks.append((a, m))
            a = m
    if dur - a > 0.3:
        if chunks and dur - a < min_len:
            chunks[-1] = (chunks[-1][0], dur)
        else:
            chunks.append((a, dur))
    # very long stretches without any pause still get split so a window never exceeds ~25s
    out = []
    for a, b in chunks:
        while b - a > 25:
            out.append((a, a + 20))
            a += 20
        out.append((a, b))
    return out


def transcribe(wav: Path, cfg: dict, extra_vocab: str = "") -> tuple[list[dict], list[dict]]:
    from faster_whisper import WhisperModel, decode_audio

    t = cfg["transcription"]
    # style example only: a comma-separated word list in the prompt makes Whisper put commas after every word
    prompt = (t["style_prompt"] + (" " + extra_vocab if extra_vocab else "")).strip()[:800]
    model = WhisperModel(t["model"], device="cpu", compute_type="int8")
    audio = decode_audio(str(wav), sampling_rate=16000)
    dur = len(audio) / 16000
    words: list[dict] = []
    flags: list[dict] = []
    for a, b in pause_chunks(wav, dur):
        segs, _ = model.transcribe(audio[int(a * 16000): int(b * 16000)], language=t["language"], word_timestamps=True,
                                   initial_prompt=prompt, condition_on_previous_text=False)
        chunk = []
        for seg in segs:
            for w in seg.words or []:
                text = w.word.strip()
                if text:
                    chunk.append({"w": text, "s": round(a + w.start, 3), "e": round(a + w.end, 3), "p": round(w.probability, 3)})
        tells = [w["w"] for w in chunk if re.sub(r"\W", "", w["w"].lower()) in TRANSLATION_TELLS]
        if len(tells) >= 2:
            flags.append({"type": "maybe-translated", "at": a, "detail": f"Words {', '.join(tells)} look like Whisper translated English into formal Malay between {a:.1f}s and {b:.1f}s. Listen and correct the words in project.json."})
        words += chunk
    return words, flags


def load_or_transcribe(src: Path, work: Path, cfg: dict, script_hint: str | None, force: bool = False) -> tuple[list[dict], list[dict]]:
    cache = work / "words.json"
    if cache.exists() and not force:
        j = json.loads(cache.read_text())
        if isinstance(j, dict):
            return j["words"], j["flags"]
    wav = work / "audio.wav"
    extract_audio(src, wav)
    # a script, if supplied, adds its opening lines as style context only
    vocab = ""
    if script_hint:
        # first two sentences of the creator's own script, as extra style/spelling context (not inserted into output)
        vocab = " ".join(re.split(r"(?<=[.?!])\s+", script_hint.strip())[:2])
    words, flags = transcribe(wav, cfg, vocab)
    cache.write_text(json.dumps({"words": words, "flags": flags}, ensure_ascii=False, indent=1))
    return words, flags
