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

**Coach rotation**
- **Opening** (Briefing 1–3 + Day 1): the 4 main coaches (`"main": true`), one slot each. The order shifts by one every month, so each main coach takes each opening slot in turn.
- **Everything else** (13 topics + 3 wrap-up): round-robin over all coaches, continuing from last month. If a coach comes up twice in a row, the next coach goes first.
- Result: main coaches 3–4 slots a month, support coaches 2–3. No coach is ever on two content days in a row.
- `rotationAnchor` = where the rotation started (Oct 2026: opening starts with Husna; the rest continues after Arif, who closed September, so it starts with Mimi).

## Changing things
Edit `config.json` only:
- **Topics**: `briefing`, `knowledge`, `wrapUp` (order = calendar order). `imageLabels` = shorter text for the image only.
- **Coaches / colours**: `coaches` (`"main": true` = main coach). Adding or removing a coach changes the rotation from the anchor month on; when you do, set `rotationAnchor` to the current month and who should start.
- **Dates**: `briefingStartDay`, `day1`, `runDays`.

## Run locally
```
node scripts/kalendar.mjs 2026-12            # schedule.json + whatsapp.txt + whatsapp-coachee.txt
node scripts/kalendar.mjs 2026-12 --render   # + kalendar.png (coaches) + kalendar-coachee.png (no names), 1080 × 1350
```
Output: `group-coaching/<YYYY-MM>/`. Preview/tweak the design live: `npx remotion studio src/kalendar/index.tsx`.

Poppins is bundled in `public/fonts/` (SIL Open Font License) so rendering doesn't depend on Google Fonts.
