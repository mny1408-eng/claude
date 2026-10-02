# T3 — "Kopi Is Part of the Solution" (International Coffee Day, 1 Oct 2026)

**Format:** 9:16, silent visual + music, ~38 s
**Composition:** `T3-CoffeeDay` (`src/reels/T3CoffeeDay.tsx`)
**Style (docs/video-style-rotation.md):** kinetic type hook (wildcard for reactive topics) → Resit harian (`RESIT #01`) → end card

## Render

```
npx remotion render src/index.ts T3-CoffeeDay "..\OneDrive\WeDo x KFOC\landing page\renders\T3-CoffeeDay.mp4"
```

Needs `public/audio/music.mp3` (see main README). Music starts at 100 s into the track.

### Version with your coffee clip (`T3-CoffeeDay-Clip`)

Opens on real footage of Coach Nas making the coffee (5 s, "1 OKTOBER · Hari Kopi Sedunia" stamped over it), then continues from the ICO theme scene.

1. Record: vertical 9:16, about 5–6 s, no music. Scoop → shake → pour over ice; keep the top third of the frame fairly plain (the text sits there).
2. Save it as `public/clips/coffee-bancuh.mp4` (not in git). On iPhone set Camera → Formats → Most Compatible.
3. Render:

```
npx remotion render src/index.ts T3-CoffeeDay-Clip "..\OneDrive\WeDo x KFOC\landing page\renders\T3-CoffeeDay-Clip.mp4"
```

Only the first 5 s of the clip are used.

### Animated version (`T3-CoffeeDay-Anim`)

No footage needed: opens on a drawn scoop → shake → pour over ice with "1 OKTOBER · Hari Kopi Sedunia".

```
npx remotion render src/index.ts T3-CoffeeDay-Anim "..\OneDrive\WeDo x KFOC\landing page\renders\T3-CoffeeDay-Anim.mp4"
```

### Coach Nas voice version (`T3-CoffeeDay-CoachNasVoice`, ~51 s)

Animated hook + the reel without the ICO scene, cut to Coach Nas's own recording of the talking-head script (TeleCue, 02/10). Scene changes sit on the sentence starts (Whisper transcription + pause detection, see `src/reels/T3Voice.tsx`). Music sits low under the voice.

1. Save the voice as `public/voice/T3-real/source.mp3` (loudness-normalised copy of the TeleCue take; not in git).
2. Also needs `public/img/hppc-pack.png` and `public/audio/music.mp3`.
3. Render:

```
npx remotion render src/index.ts T3-CoffeeDay-CoachNasVoice "..\OneDrive\WeDo x KFOC\landing page\renders\T3-CoffeeDay-CoachNasVoice.mp4"
```

If you re-record, the sentence times in `SRC` (T3Voice.tsx) need updating.

### HPPC pack shot (both `-Clip` and `-Anim`)

The swap scene shows the HPPC Café Latte pack under the receipt. Save the cut-out PNG as `public/img/hppc-pack.png` (not in git). The current file was cut from a low-resolution reference poster, so it is slightly soft; a phone photo of your own pack against a plain background (or Herbalife's official pack shot, if distributor rules allow) will look sharper.

### Stock footage instead of your own clip

Free licence clips (Pexels / Pixabay) of iced coffee being poured work as the opening for `T3-CoffeeDay-Clip`: save as `public/clips/coffee-bancuh.mp4`. They show generic coffee, not HPPC, so keep them as mood B-roll.

## Scenes

1. **1 OKTOBER** → Hari Kopi Sedunia · *tahun ni, pertama kali diiktiraf PBB*
2. Tema 2026: **"Coffee is Part of the Solution"** (ICO) · Kopi = rezeki untuk ~12.5 juta keluarga petani
3. Untuk berat badan pula… **Kopi bukan masalah.** → stamp: GULA DALAM KOPI TU MASALAH
4. **Resit kopi harian:** teh tarik ~4.5 + kopi ais ~4 = **~8.5 sudu gula** (anggaran)
5. **Versi swap:** kopi O kosong ~0 · protein coffee < ¼ sudu (*HPPC: 15g protein · 80 kcal / serving) · *sokongan nutrisi, bukan ubat · ada kafein*
6. **3 tips:** turun level gula · elak kopi lewat petang · kopi + protein, bukan kopi + kuih
7. Kopi pun boleh jadi **part of the solution** untuk berat badan awak → **Komen "KOPI"**

## Caption

> ☕ Happy International Coffee Day!
>
> Tahun 2026 ni pertama kali PBB iktiraf 1 Oktober sebagai Hari Kopi Sedunia 🌍
> Tema tahun ni dari International Coffee Organization: **"Coffee is Part of the Solution."**
> Kopi jadi sumber rezeki untuk lebih kurang 12.5 juta keluarga petani di seluruh dunia. Respect 🙏
>
> Untuk kita yang tengah jaga berat badan pula, kopi pun boleh jadi *part of the solution*. Masalahnya bukan kopi. Masalahnya gula + susu pekat dalam setiap gelas.
>
> ✅ Turun level: manis → kurang manis → kosong
> ✅ Elak kopi lewat petang, jaga tidur
> ✅ Kopi + protein, bukan kopi + kuih
>
> Saya Coach Nas, clinical pharmacist + wellness coach. Saya bantu orang sibuk turunkan berat dengan cara yang lebih tersusun.
>
> Komen **KOPI** atau DM **NAK**, saya guide step by step 🙌
>
> *HPPC ialah sokongan nutrisi, bukan ubat. Ada kafein 80mg/serving. Kalau mengandung, menyusu atau sensitif kafein, tanya doktor dulu.*
>
> #wedotransformations #kurusfitonlinecoaching #misifightobesiti #coachnas #tipskurus #internationalcoffeeday #coffeeispartofthesolution

## Sources and pre-post checks

- ICO 2026 campaign and the 12.5 million figure: ico.org/international-coffee-day, Daily Coffee News (26 Feb 2026)
- UN day: UNGA Resolution A/RES/80/248 (10 Mar 2026), FAO newsroom
- Drink sugar: Homage Malaysia (secondary source, **not MyFCD**). The style plan says Resit numbers must come from MyFCD or a checked label, so the receipt marks every line "anggaran". Replace with MyFCD values if available.
- HPPC (High Protein Premix Coffee, Malaysia): 15 g protein, 80 kcal, 80 mg caffeine, < ¼ tsp sugar per serving, from the Aug 2022 Malaysia launch coverage. **Check against the current tub label before posting.**
- No ICO logo or official campaign artwork is used.
