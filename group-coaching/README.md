# Kalendar Topik: Group Coaching (Misi Fight Obesiti)

Monthly topic calendar for the team group coaching, with coaches rotated automatically.

## Every month (automatic)
On the **20th**, the GitHub Action `Kalendar Topik (monthly)` builds next month and opens a **draft PR**.
The PR shows any warnings and the WhatsApp text. Check the image in `group-coaching/<YYYY-MM>/kalendar.png`, then merge.

Run it any time: Actions → *Kalendar Topik (monthly)* → *Run workflow* (optional month, e.g. `2026-12`).

One-time repo setting: Settings → Actions → General → tick **"Allow GitHub Actions to create and approve pull requests"**.

## Rules (from `config.json`)
| When | What |
|---|---|
| 3rd – 5th | Briefing ×3 (fixed order) |
| 6th → 26th | Day 1 → Day 21 |
| Mon – Fri in the run | 14 knowledge topics in order; Fridays also get 🔔 Reminder Timbang |
| Last Friday of the run | 🔔 Reminder Timbang Akhir only (no topic) |
| Saturdays | ⚖️ Timbang; last Saturday = **Timbang Akhir** |
| Sundays | ⛔ Tiada Topik |
| 27th – 29th | Wrap-up ×3 |
| 1st of next month | Close Group, Semua Coach (moves to the next free day if the wrap-up uses the 1st, e.g. February) |

Every 21-day run has exactly 15 weekdays, so 14 topic slots after the reminder-only Friday: always enough for the 14 topics.

**Coach rotation:** round-robin in the order of `coaches`, 20 slots a month (3 briefing + 14 + 3 wrap-up).
It continues from last month (anchor: `rotationAnchor`), so 6 coaches get 3 slots, 1 gets 2, and who gets 2 changes each month.
No coach is ever on two content days in a row.

## Changing things
Edit `config.json` only:
- **Topics**: `briefing`, `knowledge`, `wrapUp` (order = calendar order). `imageLabels` = shorter text for the image only.
- **Coaches / colours**: `coaches`. Adding or removing a coach changes the rotation from the anchor month on; set `rotationAnchor` to the current month when you do.
- **Dates**: `briefingStartDay`, `day1`, `runDays`.

## Run locally
```
node scripts/kalendar.mjs 2026-12            # schedule.json + whatsapp.txt
node scripts/kalendar.mjs 2026-12 --render   # + kalendar.png (1080 × 1350, 4:5)
```
Output: `group-coaching/<YYYY-MM>/`. Preview/tweak the design live: `npx remotion studio src/kalendar/index.tsx`.

Poppins is bundled in `public/fonts/` (SIL Open Font License) so rendering doesn't depend on Google Fonts.
