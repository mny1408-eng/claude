"""Re-run whisper on one clip with a script prompt; prints words with timings. Usage: retranscribe.py <wav> "<prompt>" """
import json, sys
from faster_whisper import WhisperModel
m = WhisperModel("medium", device="cpu", compute_type="int8")
segs, _ = m.transcribe(sys.argv[1], language="ms", word_timestamps=True, initial_prompt=sys.argv[2], condition_on_previous_text=False)
ws = [[w.word.strip(), round(w.start, 2), round(w.end, 2), round(w.probability, 2)] for s in segs for w in (s.words or []) if w.word.strip()]
print(json.dumps(ws, ensure_ascii=False))
