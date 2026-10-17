# AutoReel — raw talking-head video → finished 9:16 reel

Built for Coach Nas's value-content reels (BM + English rojak, fat-loss education). Everything runs locally:
**faster-whisper** (transcription), **FFmpeg** (cutting), **OpenCV** (face position), **Remotion** (animated captions and graphics).

## Quick start

```bash
npm install                 # once (Remotion)
npm run autoreel:setup      # once (Python: faster-whisper, OpenCV 4)

# A) folder workflow
cp ~/Videos/my-take.mov autoreel/input/
npm run autoreel            # processes every new video in autoreel/input/

# B) browser workflow
npm run autoreel:ui         # open http://127.0.0.1:8787, upload, wait, download
```

Pick a topic preset with `--topic` (files in `autoreel/topics/`): `python3 autoreel/autoreel.py run my-take.mov --topic fat-loss-4-steps`.
Optional: put your script next to the video as `my-take.txt`. Only its opening lines are used, as style context for transcription.

## What you get

`autoreel/output/<date-name>/`
| file | |
|---|---|
| `reel.mp4` | 1080×1920, 30 fps, H.264 + AAC, ready for IG/FB |
| `reel.srt` | subtitles with the same timing as the burned-in captions |
| `caption.txt` | draft post caption built **only from what you said** + one Save CTA + your hashtags |
| `review.md` | everything the system was unsure about, and every cut it made |

`autoreel/projects/<date-name>/` is the editable project: `project.json` (transcript, decisions), `props.json` (what Remotion
draws), the transcript cache, and a hard-linked copy of your original video. Your original file is never modified.

## How it edits

1. **Transcribe**: audio is cut at natural pauses into ≤12 s chunks. Each chunk is transcribed with `language=ms` and a short
   rojak example prompt (`config/brand.json → transcription.style_prompt`), which keeps English words in English.
   On long BM+EN audio, Whisper otherwise *translates* the English (e.g. "Consistency is the key" → "Konsistensi adalah kunci").
   Chunks that still read like formal translated Malay are flagged.
2. **Clean up**: filler words (eh, um, erm…) are cut. Pauses longer than 0.35 s are shortened. A sentence you immediately
   re-say (same opening, or near-duplicate) is treated as a false start, and only the retake is kept.
3. **Structure**:
   - The **hook** is your opening line.
   - **Steps** are found by spoken markers near the start of a sentence ("First", "Nombor dua", "Yang ketiga", "Last sekali"…).
     If a step has no marker, the preset's keywords are used instead and the step is flagged.
   - The **key message** card appears at the line that triggers it (e.g. "consistency").
4. **Length**: if the reel runs over 60 s, the least important *whole* sentences are dropped, and each drop is listed in
   `review.md`. The hook, step openers, key message and closing line are never dropped, and nothing is ever cut mid-sentence.
5. **Design**:
   - Captions: 3-word animated chunks, the active word in gold, topic keywords tinted.
   - Hook card, then step badges with icons, then the key-message card, then an end card with the step recap and one CTA ("Save reel ni").
   - A gentle zoom alternates on every cut to hide jump cuts, with a small punch-in when a step starts.
   - Captions sit under your detected chin. Titles sit at the top, above your head and clear of the IG/FB UI.

Nothing is generated or paraphrased: on-screen titles come from the topic preset and only appear where your footage covers that step.

## Revising a reel

Edit `autoreel/projects/<name>/project.json`, then:

```bash
python3 autoreel/autoreel.py rerender autoreel/projects/<name>
```

- Misheard words: `"corrections": [{"from": "raih datang", "to": "Raya datang"}]`. Timing is kept.
- Bring back or remove a sentence: set `"keep": true/false` on it in `sentences`.
- Shorter hook card: `"hook_override": "LOSE FAT TANPA STOP MAKAN NASI?"`.
- Rename a step title: `"step_titles": {"2": "PROTEIN + FIBRE"}`.
- `--retranscribe` throws the edits away and starts again.

## New content types

Copy `topics/fat-loss-4-steps.json`, then change the step titles, markers, keywords, icons (`flame`, `plate`, `calendar`,
`shield`, `dot`) and the key message. Brand colours, handle, hashtags, CTA and timing live in `config/brand.json`.

## Limits

- Transcription accuracy depends on audio. Always skim the "Low-confidence" and "maybe-translated" sections of `review.md`.
- Editing decisions are rules, not an AI judge of content. It will not reorder your points or pick a "better" take beyond
  removing an immediate retake.
- Face detection is a frontal-face model. Strong side angles fall back to default caption placement (flagged).
- CPU only: about 6–8 minutes for one minute of footage (transcription about 2, cut about 1, render about 3).
