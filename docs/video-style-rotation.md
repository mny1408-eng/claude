# Video Style Rotation Plan

Short-form video formats for Coach Nas. All of them can be built in code (Remotion, or HTML + GSAP rendered to MP4) using the ivory / forest green / gold palette.

**Core principle:** keep the brand frame the same in every video and rotate the format. If everything repeats, the audience tunes out and ads wear out. If everything rotates, the videos stop being recognisably yours.

---

## 1. Style verdicts

### Original 10

| # | Style | Verdict | Notes |
|---|---|---|---|
| 1 | Kinetic typography | ✅ Yes | Cheapest to make, strongest hook. For ads, avoid lines that assert things about the viewer ("awak malas"), which Meta's personal attributes policy rejects. Use "Masalahnya bukan malas." instead. |
| 2 | Checklist / scorecard tick | ✅ Yes, build early | Leads straight into the scorecard. Framed around habits, not the body. |
| 3 | Mitos vs Fakta | ✅ Yes | Shows pharmacist expertise. Only claim things you can source. |
| 4 | Yo-yo line graph | ✅ Yes | Label it "ilustrasi" and leave the axis without numbers. |
| 5 | Search bar typing | ✅ Yes | No fake WhatsApp "client" chats: that's a fabricated testimonial. |
| 6 | Plate builder | 🟡 Value posts only | Useful but common. Weak as a hook. |
| 7 | Resit harian | ✅ Yes, if numbers are verified | Calorie figures must come from MyFCD or a checked label. |
| 8 | 24-hour clock | 🟡 Okay | Slow start. Use it mid-video, not as the hook. |
| 9 | Quiz countdown | ✅ Engagement only | Gets comments. Doesn't convert, so not for ads. |
| 10 | Portrait + captions | ✅ Yes | Use as the closing shot or call to action, not every video. |

### Added styles

| Style | Verdict | Notes |
|---|---|---|
| Progress bar reset ("78%…" → 0%) | ✅ Strong | Best fit for "progress on-off". About the pattern, not the body, so safe for ads. |
| Rx / prescription label | ✅ Strong, unique | Only a pharmacist can own this look. Make clear it's a metaphor, not a real medicine or prescription. |
| Calendar flip (Isnin: mula diet → Jumaat: "minggu depan la") | ✅ Strong | Relatable, about the pattern, safe for ads. |
| Notes app typing | ✅ Good | Rotate it with the search bar. |
| Nutrition-label parody ("Fakta Hidup") | ✅ Good | Steers toward lifestyle, not calories. |
| Big-stat card (e.g. NHMS) | 🟡 Cite only | Check the exact figure and year, and put the source on screen. |
| Animated carousel | ✅ Repurposing | Filler for posting slots with no new design needed. |
| Whiteboard doodle | 🟡 Meh | Dated and slow to hook. |
| Vox-style collage | 🟡 Occasional deep-dive only | Slow and heavy to produce. At most once every 2 weeks, with the brand frame on it. Not a hook. |
| Meme / green-screen text | ❌ Skip | Off-brand for a premium pharmacist look. |
| Glitch / 3D particles | ❌ Skip | Style with nothing to say, and costly to render. |
| AI avatar of you | ❌ Avoid | Trust risk, and Meta requires AI labels. |
| Before/after, body close-ups | ❌ Never for ads | Prohibited by Meta, and against the brand angle. |

---

## 2. Brand frame (never changes)

| Element | Rule |
|---|---|
| Palette | Ivory background, forest green text and shapes. Gold only for the one key word or the tick. |
| Fonts | One heavy display font for hooks and one clean font for body text. |
| Signature move | Gold underline draws under the key word, in every video. |
| Transition | The same forest-green wipe between scenes. |
| Sound | The same 1-second audio sting on the end card. |
| Handle / logo | Same corner, same size, whole video. |
| End card | Always "Semak skor anda →" plus the scorecard link, in the same layout. |
| Series tag | Top-left label, e.g. `MITOS #04`, `RESIT #02`, `CHECKLIST`. |

**Consistency check:** with the handle covered, would a viewer still know it's yours in the first 2 seconds?

---

## 3. Formats by role

| Role | Formats |
|---|---|
| Hook / reach | Progress bar reset, calendar flip, kinetic type |
| Lead-gen (scorecard) | Checklist, search bar / Notes app |
| Trust / education | Mitos vs Fakta, Rx label, resit harian, portrait + captions, Vox deep-dive (occasional) |
| Engagement | Quiz countdown |

**Build order:** progress bar → checklist → Mitos/Fakta → calendar flip.

**Built so far:** progress bar reset (`src/templates/ProgressReset.tsx`), Mitos vs Fakta (`src/templates/MitosFakta.tsx`). Next: checklist, calendar flip, hybrid talking-head (needs clips).

---

## 4. Two-week organic rotation (5 posts/week)

| | Mon | Tue | Wed | Thu | Fri |
|---|---|---|---|---|---|
| Week A | Progress bar reset | Mitos vs Fakta | Checklist → scorecard | Resit harian | Quiz |
| Week B | Calendar flip | Mitos vs Fakta | Notes app → scorecard | Rx label | Portrait + captions |

Rules:
- No format repeats within 7 days, except Mitos/Fakta, which is the fixed weekly series.
- Never two hook-style posts back to back.
- A lead-gen post goes out every week.
- Kinetic type is the wildcard for reactive or trending topics.

---

## 5. Paid ads rotation

- 3–4 creatives live per ad set, each in a different hook format.
- Refresh when frequency passes about 3, or CTR drops about 25% from its first week. Change the first 3 seconds and keep the middle and end card.
- Move organic winners into ads.
- Ad creative stays about the pattern ("progress on-off"), never the body.
- Before running paid ads, check Meta's current weight-loss ad policy and whether Malaysia's Medicine Advertisements Board (KKLIU) approval applies.
