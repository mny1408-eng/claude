# Coach Nas – Vox-style ad

Remotion project for the Progress Check ads (1080×1920, 30fps, 32s).
Renders go to `OneDrive\WeDo x KFOC\landing page\renders\`.

## Preview & edit
```
npm run studio
```
Opens a live editor in the browser. Pick `VoxAd-A`, `-B` or `-C` (the three hooks).

## Render
```
npx remotion render src/index.ts VoxAd-A "..\OneDrive\WeDo x KFOC\landing page\renders\hookA.mp4"
```

## Add your own clip (replaces the Coach Nas photo in scene 4)
1. Put the video in `public/clips/`, e.g. `public/clips/01.mp4`
2. Render with: `--props='{"hook":"A","coachClip":"01.mp4"}'`

## Voiceover reels
1. Script per scene: `content/<reel>.voice.json` (approved Notion wording only)
2. Generate voice clips (cached; only changed lines are re-generated):
   - Coach Nas clone: set `ELEVENLABS_API_KEY` + `ELEVENLABS_VOICE_ID`, then `node scripts/gen-voice.mjs content/T1.voice.json`
   - Placeholder (drafts only, watermarked): `VOICE_PROVIDER=gemini` (free tier: ~10 lines/day per model)
3. Render: `npx remotion render src/index.ts T1-NasiCampur-Voice out.mp4`
   Scene lengths and plate steps follow the voice automatically.
4. When posting a cloned-voice reel, turn on IG/TikTok "AI info" label.

## Local assets (not in git)
This repo is public, so these stay on the production PC only and must be added before rendering:
- `public/audio/music.mp3`: "Curious Minds" by Turning_Pages (Pixabay), download from Pixabay
- `public/img/`: `coach-nas.jpeg` (from the landing page), `site-hero.jpg`, `site-q1.jpg` (scorecard screenshots)
- `public/voice/`: Coach Nas recordings (`T1-real/source.mp3`) and generated voice clips
- `public/clips/`: optional user video clips

Regenerate the sound effects with `node scripts/gen-sfx.mjs` if `public/sfx/` is missing.

## Where things live
- `src/scenes.tsx` – all on-screen text and the 6 scenes (edit copy here)
- `src/Video.tsx` – scene order and lengths
- `src/kit.tsx` – Vox building blocks (highlighter, hand circle, stamp, tape)
- `src/theme.ts` – brand colours / fonts
- `scripts/gen-images.mjs` – Gemini collage images (needs billing enabled on the Gemini key)
