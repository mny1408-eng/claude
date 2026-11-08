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
