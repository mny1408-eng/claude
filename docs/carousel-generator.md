# Carousel generator

Turns one JSON file into an Instagram/Facebook carousel: 1080×1350 PNGs, a combined PDF and a preview page.
Slides are React components rendered by Remotion's headless Chromium (already used by this repo), so no extra
dependencies are needed.

## Install & run

```bash
npm install                       # once
npm run carousel -- nak-lose-fat  # renders content/carousels/nak-lose-fat.json
```

Output goes to `output/carousels/<id>/`:

| File | What |
|---|---|
| `slide-01.png` … `slide-NN.png` | 1080×1350 PNG, one per slide |
| `<id>.pdf` | all slides in order, one page each |
| `index.html` | preview grid (open in a browser) |

Options:
- `npm run carousel -- path/to/any.json` renders a file outside `content/carousels/`.
- `--strict` also fails on content warnings (see checks below).
- `CAROUSEL_BROWSER=/path/to/chrome npm run carousel -- …` uses a specific Chrome/Chromium.

To tweak designs live: `npm run studio`, open the **CarouselGen** composition and edit its props.

## Make a new carousel

1. Copy `content/carousels/nak-lose-fat.json` to `content/carousels/<new-id>.json`.
2. Change `id` (lowercase-with-dashes), `title` and `slides`.
3. `npm run carousel -- <new-id>`

You don't need to change any code. Slide numbering, the progress dots and the page count are automatic.

### Slide types

| `type` | Fields |
|---|---|
| `cover` | `title` (array of lines), `sub`, `small`, `kicker`, `visual` |
| `problem` | `kicker`, `title`, `body` (array), `chips` (crossed-out pills), `after`, `takeaway` |
| `step` | `number` ("01"), `title`, `body` (array), `visual`. Layout alternates visual-bottom / visual-top |
| `diagram` | `number`, `title`, `body`, `flow` (array of `{label, note, tone: green/orange/ink}`), `takeaway` |
| `cta` | `title` (array of lines), `body`, `save` |

`visual` options: `rice-bowl`, `calorie-meter`, `balanced-plate`, `lifestyle`, `save`.
Add new illustrations in `src/generator/visuals.tsx` and list them in `VISUALS` in the script.

Highlight words with `**double asterisks**`. On dark slides they turn green; on light slides they get an
orange marker behind dark text, which keeps contrast readable.

## Brand

`content/carousels/brand.json` holds the name, role, handle, colours (`ink`, `cream`, `green`, `orange`,
`muted`, `line`) and fonts. Fonts can be `Poppins`, `Inter`, `Montserrat`, `DMSans` or `Manrope`. Each
loads with latin + latin-ext, so Bahasa Melayu text renders correctly.

A carousel can override any of these with its own `"brand": { … }` block.

## Automatic checks

**Before rendering**, the script checks:
- Each slide has the required fields for its type, uses a known `type` and `visual`, and has balanced `**` markers.
- The text doesn't contain risky claim patterns (shown as warnings):
  - a specific kg amount
  - a percentage
  - "guarantee" or "dijamin"
  - detox, cure or treatment wording
  - "dalam 7 hari" or "in 4 weeks" style promises
  - before/after

**During rendering**, each slide waits for its fonts and for the layout to settle, then checks every content block:
- it stays inside the 64 px safe area;
- no text is wider than its box;
- clipped boxes don't cut text off;
- blocks don't overlap;
- the brand fonts actually loaded.

**After rendering**, it checks that every PNG is exactly 1080×1350, that the slide count matches the config, and that the PDF follows config order.

Any layout problem prints the slide number and the text involved, and the script exits with code 1.

## Files

```
content/carousels/brand.json         brand defaults
content/carousels/<id>.json          one file per carousel
src/generator/types.ts               schema
src/generator/slides.tsx             Cover, Problem, Step, Diagram, Cta + shared Frame
src/generator/visuals.tsx            SVG illustrations
src/generator/fonts.ts               font registry
src/generator/Generator.tsx          composition + layout checks
scripts/generate-carousel.mjs        lint → render → PDF → preview → report
```
