# Reel / story workflow (Coach Nas)

Standing rules for every video made with reelkit:

1. **Screenshots first, render after approval.** Before any `hyperframes render`, send:
   - snapshot frames of the overlay (`hyperframes snapshot ... --at ...`), and
   - for montages, a full-frame sheet of the cut (`ffmpeg -vf "fps=4,scale=120:-2,tile=13x4"`), so every moment is visible.
   Render only after Coach Nas says OK. This applies to re-renders after changes too.
2. **Workout clips: no idle moments.** Cut out setup, holding a dumbbell still, standing between sets and getting up. Check the full sheet for any still stretch, and measure motion per 0.5 s on the montage (frame-difference); swap any low window for a more active one. Once screenshots are approved, Coach Nas allows going straight to render as long as every part moves.
   Also leave out positions that look awkward on camera (bent-over rows, getting down to or up from the floor, piked positions).
3. **Eyes on camera** where the move allows it (standing moves); floor moves pick the most active window.
4. Workout story/reel: 10–15 s, 1.5–2 s per move, WDT logo + DAY n, no audio (Coach Nas adds music in IG).
5. Herbalife branding does not need blurring on TikTok; recruitment/"DM BUILD" wording stays off TikTok.
6. Coach Nas's own family (wall photo at home, his children's photos) does not need blurring. Blur only other people who have not agreed.
7. **No repetition except the hook.** Before building any reel, read the whole cut transcript and run `python3 reelkit/repeat_check.py <proj>`; cut every repeated line, false start or restart (e.g. "ramai orang… ramai ayah" keeps only "ramai ayah"). Only the hook may repeat on purpose.
8. **Short Reel 9 Diamond (10 s, no voice):** `broll_story.py` with `"style": "bold_ig"` for IG (brand palette forest/gold/ivory, end line at y 1150 clear of IG caption + icons) and `"style": "bold"` for TikTok (black/yellow/pink). Hooks come from the Notion Hook Bank; mark them used there. One static clip: vary framing with per-segment `"crop"` so cuts don't look repeated. Move the hook down (`"top"`) when the face sits at the top of the frame.
