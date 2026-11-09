"""Flag likely repetitions / false starts in a cut (work/words.json), so they get cut before the reel is built.

Usage: python3 repeat_check.py <proj>
Flags: the same 2-word phrase said twice within 8 s, and the same content word said twice within 3 s
(e.g. "ramai orang… ramai ayah"). The hook (first sentence) may repeat on purpose: review flags there by ear.
"""
import json, re, sys
from pathlib import Path

STOP = {"saya", "yang", "dan", "itu", "ini", "tu", "ni", "nak", "tak", "dia", "kita", "awak", "dah", "pun", "so", "je", "lah", "kan", "ada", "untuk", "dengan", "macam", "the", "and"}


def norm(t):
    return re.sub(r"[^\w-]", "", t.lower())


def main(proj):
    w = json.loads((Path(proj) / "work" / "words.json").read_text())
    t = [norm(x[2]) for x in w]
    seen = set()
    for i in range(len(t)):
        for j in range(i + 1, len(t)):
            dt = w[j][0] - w[i][0]
            if dt > 8:
                break
            if j + 1 < len(t) and t[i] and t[i] == t[j] and t[i + 1] == t[j + 1] and t[i] not in STOP and (i, "b") not in seen:
                seen.add((i, "b"))
                print(f"REPEAT  {w[i][0]:6.2f}s '{w[i][2]} {w[i+1][2]}'  again at {w[j][0]:.2f}s")
            elif dt <= 3 and t[i] == t[j] and len(t[i]) > 3 and t[i] not in STOP and (i, "w") not in seen:
                seen.add((i, "w"))
                ctx_a = " ".join(x[2] for x in w[max(0, i - 2):i + 3])
                ctx_b = " ".join(x[2] for x in w[max(0, j - 2):j + 3])
                print(f"RESTART {w[i][0]:6.2f}s '{ctx_a}'  ->  {w[j][0]:.2f}s '{ctx_b}'")


def gaps(proj):
    """A long pause in the middle of a sentence often hides a restart that whisper heard only once."""
    w = json.loads((Path(proj) / "work" / "words.json").read_text())
    for i in range(len(w) - 1):
        g = w[i + 1][0] - w[i][0]  # start to start: whisper often stretches a word over the pause
        if g > 1.3 and not w[i][2].rstrip().endswith((".", "?", "!", ",")):
            ctx = " ".join(x[2] for x in w[max(0, i - 3):i + 4])
            print(f"PAUSE   {w[i][1]:6.2f}s ({g:.1f}s gap mid-sentence) '{ctx}'  -> listen: restart?")


if __name__ == "__main__":
    gaps(sys.argv[1])
    main(sys.argv[1])
