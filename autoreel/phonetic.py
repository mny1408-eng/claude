"""Rough "listening" without an online ASR model.

Decodes each speech segment into phones with pocketsphinx's bundled English
acoustic model (allphone mode), and converts script text to the same phone set
(simple Malay grapheme-to-phoneme rules, CMU dictionary for English loanwords).
Comparing the two tells us which part of the script each segment is, so false
starts and retakes can be found and cut.
"""
import os
import re
import subprocess

from pocketsphinx import Decoder, get_model_path

import imageio_ffmpeg

MODEL = get_model_path()
ENGLISH = {
    "real", "food", "portion", "frequency", "energy", "density", "pattern", "so", "plan", "amount", "extreme", "diet",
}

# Collapse phones that the English model confuses freely, so comparisons are fair.
FOLD = {
    "AA": "A", "AH": "A", "AE": "A", "AO": "O", "OW": "O", "UH": "U", "UW": "U", "IH": "I", "IY": "I",
    "EH": "E", "EY": "E", "ER": "A R", "AW": "A U", "AY": "A I", "OY": "O I", "DH": "D", "TH": "T", "ZH": "SH",
    "Z": "S", "V": "F", "HH": "H",
}

_cmu = None


def cmudict():
    global _cmu
    if _cmu is None:
        _cmu = {}
        with open(os.path.join(MODEL, "en-us", "cmudict-en-us.dict"), encoding="utf-8") as fh:
            for line in fh:
                w, *ph = line.split()
                if "(" not in w:
                    _cmu[w] = ph
    return _cmu


MALAY = [
    ("ng", "NG"), ("ny", "N Y"), ("sy", "SH"), ("kh", "K"), ("gh", "G"), ("ai", "A I"), ("au", "A U"),
    ("a", "A"), ("e", "A"), ("i", "I"), ("o", "O"), ("u", "U"), ("c", "CH"), ("j", "JH"), ("y", "Y"),
    ("b", "B"), ("d", "D"), ("f", "F"), ("g", "G"), ("h", "H"), ("k", "K"), ("l", "L"), ("m", "M"),
    ("n", "N"), ("p", "P"), ("q", "K"), ("r", "R"), ("s", "S"), ("t", "T"), ("v", "F"), ("w", "W"),
    ("x", "K S"), ("z", "S"),
]


def fold(phones):
    out = []
    for p in phones:
        p = re.sub(r"\d", "", p)
        out.extend(FOLD.get(p, p).split())
    return out


def word_phones(word):
    w = re.sub(r"[^a-z]", "", word.lower())
    if not w:
        return []
    if w in ENGLISH and w in cmudict():
        return fold(cmudict()[w])
    out, i = [], 0
    while i < len(w):
        for g, p in MALAY:
            if w.startswith(g, i):
                out.extend(p.split())
                i += len(g)
                break
        else:
            i += 1
    return out


def text_phones(text):
    return [p for w in text.split() for p in word_phones(w)]


def decode_segments(path, segs):
    raw = subprocess.run(
        [imageio_ffmpeg.get_ffmpeg_exe(), "-loglevel", "error", "-i", path, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"],
        capture_output=True,
    ).stdout
    dec = Decoder(
        hmm=os.path.join(MODEL, "en-us", "en-us"),
        allphone=os.path.join(MODEL, "en-us", "en-us-phone.lm.bin"),
        lm=None, lw=2.0, beam=1e-20, pbeam=1e-20, loglevel="FATAL",
    )
    out = []
    for s, e in segs:
        chunk = raw[int(max(0, s - 0.05) * 16000) * 2:int((e + 0.05) * 16000) * 2]
        dec.start_utt()
        dec.process_raw(chunk, full_utt=True)
        dec.end_utt()
        phones = [seg.word for seg in dec.seg() if seg.word not in ("SIL", "+NSN+", "+SPN+", "+BREATH+")]
        out.append(fold(phones))
    return out


def local_match(query, ref):
    """Smith-Waterman: best-matching region of ref for query. Returns (score, ref_start, ref_end)."""
    n, m = len(query), len(ref)
    best, bi, bj = 0, 0, 0
    prev = [0] * (m + 1)
    start_prev = list(range(m + 1))
    for i in range(1, n + 1):
        cur = [0] * (m + 1)
        start_cur = list(range(m + 1))
        for j in range(1, m + 1):
            opts = [
                (0, j),
                (prev[j - 1] + (2 if query[i - 1] == ref[j - 1] else -1), start_prev[j - 1]),
                (prev[j] - 1, start_prev[j]),
                (cur[j - 1] - 1, start_cur[j - 1]),
            ]
            cur[j], start_cur[j] = max(opts, key=lambda o: o[0])
            if cur[j] > best:
                best, bi, bj = cur[j], start_cur[j], j
        prev, start_prev = cur, start_cur
    return best, bi, bj
