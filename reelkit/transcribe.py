"""Transcribe each clip in <proj>/clips with word timings (styled + plain runs), cached in <proj>/work/transcripts.json."""
import json, subprocess, sys
from pathlib import Path

STYLE = "Coach Nas, pharmacist. Cakap Melayu campur English: so, actually, okay, protein, intake, routine, weight loss, gym, lunch."

def duration(p):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)], capture_output=True, text=True).stdout)

def main(proj):
    proj = Path(proj); work = proj / "work"; work.mkdir(exist_ok=True)
    cache = work / "transcripts.json"
    out = json.loads(cache.read_text()) if cache.exists() else {}
    clips = sorted((proj / "clips").glob("*.mp4"))
    todo = [c for c in clips if c.name not in out]
    if todo:
        from faster_whisper import WhisperModel
        model = WhisperModel("medium", device="cpu", compute_type="int8")
        for c in todo:
            wav = work / (c.stem + ".wav")
            subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(c), "-ac", "1", "-ar", "16000", str(wav)], check=True)
            runs = {}
            for tag, prompt in (("styled", STYLE), ("plain", None)):
                segs, _ = model.transcribe(str(wav), language="ms", word_timestamps=True, initial_prompt=prompt, condition_on_previous_text=False)
                runs[tag] = [[w.word.strip(), round(w.start, 2), round(w.end, 2), round(w.probability, 2)] for s in segs for w in (s.words or []) if w.word.strip()]
            out[c.name] = {"duration": duration(c), **runs}
            print(f"{c.name}: {' '.join(w[0] for w in runs['styled'])}", flush=True)
            cache.write_text(json.dumps(out, ensure_ascii=False, indent=1))

if __name__ == "__main__":
    main(sys.argv[1])
