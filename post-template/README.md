# Coach Nas post template

Instagram poster template using the CN monogram. Default size is 3:4 (1080×1440), the Notion production lock in `.claude/instagram/voice.md`.
Set `"size": "4x5"` only if a post needs 1080×1350.

## Make a post

1. Copy `sample.json` and change the text.
2. Run `node render.js my-post.json` (needs Node + Playwright).
3. The PNGs are saved in `out/` next to your JSON file.

## Layouts

| `layout` | Use for (9 Diamond) | Fields |
|---|---|---|
| `hook` | Fear / Problem, Motivation, cover slide | `headline`, `sub`, `photo` (optional) |
| `mythfact` | Info / Education | `title`, `myth`, `fact` |
| `tips` | Tips Makanan, Solution | `title`, `items` (max 4: `["main", "small line"]`) |
| `quote` | Testimoni | `quote`, `who`, `note` |
| `cta` | Promote Program, Engagement | `headline`, `sub`, `word` (e.g. `NAK`) |

Every slide also takes `theme` (`light` or `dark`) and `label` (the pill at the top right).

- Wrap a word in `*stars*` to make it gold.
- Use `\n` for a line break.
- `photo`: path to a REAL photo of Coach Nas (no AI faces). Use `""` to show an empty placeholder box.
- Testimoni: only use real client words, with their permission. Keep the "Keputusan setiap individu berbeza." note.

Footer is always `@coachnas.pharmacist` + `#misifightobesiti`. Page dots appear automatically when there is more than 1 slide.
