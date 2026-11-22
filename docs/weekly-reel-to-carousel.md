# Weekly routine: this week's Reels → carousels on the no-Reel days → Metricool

Runs every Sunday morning (Malaysia time) as a scheduled task. It covers the week that starts the next day (Mon–Sun).
Follow the steps in order. If a step can't be done, stop and report why. Never guess.

## 0. Setup
```bash
git fetch origin claude/nhms-realiti-carousel && git checkout claude/nhms-realiti-carousel
npm install
```
All work and commits go on `claude/nhms-realiti-carousel`. Never commit personal photos (`public/img/` is gitignored).

## 1. Read the sources (Notion), in this order
1. Notion Memory: fetch `memory`, then read **Content production workflow (carousels & posters)** and
   **Brand handles & CTA keywords**. These rules win over everything below.
2. **🎨 BACKEND — Visual & Production** (Coach Nas OS). Format = **3:4, 1080 × 1440**. Palette and fonts come from here.
3. The **active week plan** for the target week. Search Notion for "WEEK PLAN" plus the dates, e.g. "26 OCT" or "26 OCT–1 NOV".
   Ignore pages marked ARCHIVED. If there is no plan for that week, stop and report "no week plan found". Do not invent topics.

## 2. Pick the carousel days: days with NO Reel
- From the week plan, list every Reel with its day, role (Connection / Broad Value / Niche Value / Transform), script, caption, CTA and truth notes.
- The carousel days are the days of the target week that have **no Reel planned**. Nasri's instruction: "pilih hari yang tak ada reel".
  The Reel days stay free for the Reels themselves.
- Metricool brand `6970082` (timezone `Asia/Singapore`). Run `getScheduledPosts` for Mon 00:00 to Sun 23:59.
  Skip any carousel day that already has a post (one feed post per day). Never touch existing posts.
- Give each carousel day one Reel to repurpose, preferably one that airs **before** it in the same week.
  Pair them in order: first free day ← first Reel, and so on.
- Skip a Reel whose status is "Awaiting Coach Nas Facts" or that depends on unconfirmed consent or photos.
  Leave its carousel day empty and report it.
- Networks follow the Reel's role:
  - Connection / Broad Value: facebook, instagram, tiktok, threads.
  - Niche Value / Transform: facebook, instagram, threads. No TikTok, because the plan says TikTok never gets RESET/STRUCTURE/niche.
- First run (25 Oct 2026): Tue 27 ← Mon Connection, Thu 29 ← Wed Broad Value, Sat 31 ← Fri Niche Value. Sun Transform was skipped (awaiting facts).

> **From the run on Sun 29 Nov 2026 (week 30 Nov–6 Dec) onward, carousels are built in Canva — use section 3C/4C/5C below
> instead of 3–5.** Sections 3–5 (Remotion) stay only as a fallback if the Canva connector is down; say so in the report if used.
> Also from that week: follow the week plan's own carousel toggle when it has one (it has so far said: Tue + Thu at
> 12:30 PM, repurposing Mon Connection + Wed Broad Value; providers FB + IG, + TikTok for Connection/Broad Value only;
> **no Threads**; JPG slides). The plan's toggle wins over the "days with no Reel" rule in step 2.

## 3C. Build the carousel in Canva (brand template)
- Brand template: **"Coach Nas — Carousel Master Template 3:4 (1080x1440)"**, id `EAHbo450rRQ` (source design `DAHbj0ICSfM`).
  If that id is not found, find it with `search-brand-templates` (query "Carousel Master Template 3:4").
  Do **not** use the old 4:5 template `EAHWvL9wKMY`.
- Template pages:
  1. **Cover** — header, photo circle, big title (grey / green highlight / grey), 3 short paragraphs, shield note box, bottom bar.
  2. **Step / Point** — kicker ("01 · LANGKAH"), title, body, TAKEAWAY box.
  3. **CTA** — kicker ("NAK MULA?"), title, body, green button ("Komen “NAK”"), save line, handle in the bottom bar.
- Create the design with `create-design-from-brand-template` (omit `page_numbers`, or pass distinct pages only).
  Tested 22 Nov 2026: **repeated page numbers (e.g. `[1,2,2,3]`) are refused** — Canva wrongly reports
  "brand template not found". `merge-designs` needs Nasri's explicit approval on every call, so the unattended
  routine must not use it.
  - If the template has only 3 pages: make a 3-slide carousel (cover → one step page holding the key points → CTA)
    and say in the report that more step pages need Nasri to add duplicate step pages to the template.
  - If the template has been given more step pages, pick the ones needed by number (e.g. `[1,2,3,4,6]`), never repeating one.
- Open a transaction (`read-design` with `open_transaction: true`) and fill each page with `find_and_replace_text`
  (keeps the formatting) — replace the whole placeholder string in each element.
  - Cover title: keep the 3-region style — first line grey, key phrase green, rest grey. Use explicit "\n" so no word is hyphen-split.
  - Cover paragraphs: max 3 short lines; the shield box holds the caveat/claim-check line from the plan (or a safety note).
  - Keep body text short enough that nothing overlaps the next element; move elements with `position_element` if needed.
  - Remove any placeholder you don't use (`delete_element`). No "[ … ]" text may remain.
- Content rules are the same as section 3 below: **only what the plan's script says**, brand rules, income disclaimer for business CTAs.
- Check every page thumbnail. Thumbnails sometimes show faint "ghost" text from old positions — if unsure, re-read the page.
  Fix overlaps, then `finalize: commit`. (Agreed 22 Nov 2026 when the routine moved to Canva: the routine commits its own
  new carousel designs; Coach Nas reviews them as Metricool drafts. Never edit any other existing Canva design.)
- Known limit: text added through the API (not from the template) uses Canva's default font; the template's own
  elements keep the brand fonts, so always fill existing elements rather than adding new text.

## 4C. Export
- `get-export-formats` for the design, then `export-design` as `jpg`, quality 90, all pages.
- Download each page into `output/carousels/<YYYY-MM-DD>-<slug>/slide-NN.jpg` (curl the export URLs; they expire).
- Make a contact sheet and look at it before scheduling:
  `ffmpeg -i output/carousels/<id>/slide-%02d.jpg -vf "scale=360:-1,tile=3x2" -frames:v 1 /tmp/sheet.png`
- Record the Canva design id + edit link in `content/carousels/<id>.canva.json`
  (`{"design_id": …, "edit_url": …, "source_reel": …, "slides": [text per slide]}`).

## 5C. Commit, push, schedule
- Same as section 5, except: media are the committed **JPG** URLs
  `https://raw.githubusercontent.com/mny1408-eng/claude/<commit-sha>/output/carousels/<id>/slide-NN.jpg`,
  time and providers come from the week plan's toggle, and **no Threads**.
- Always `getScheduledPosts` for that date before creating; after a worker restart a create call may not have run.

## 3. Turn each Reel into a carousel (content/carousels/<YYYY-MM-DD>-<slug>.json)
- Keep 6–8 slides: `cover` (the Reel hook), `step`/`problem`/`diagram` slides for the script's points, and a `cta` slide with the plan's CTA keyword (NAK, MALAM, STRUCTURE…).
- **Only use what the plan's script says.** Rephrase for slides, but add no new facts, numbers, studies, results or personal stories.
  - Keep the plan's own claim-check/evidence caveats, e.g. WHO wording "re-check before posting".
  - If a Reel depends on filming something real (labels held on camera, a pasar malam visit) or on a client story, write the carousel around the decision steps only. Say what was left out.
- Brand rules:
  - Header role is "Clinical Pharmacist · Wellness Coach" (from `brand.json`).
  - Handle @coachnas.pharmacist.
  - No hype, no guarantees, no disease-treatment claims.
  - Herbalife is nutrition support, not medicine.
  - Any business CTA needs "*Pendapatan bergantung pada usaha & tidak dijamin."
- Use a plain illustrated design. Personal photos are not available in a fresh session.
- Override `brand.colors` with the week plan / BACKEND palette. Default: ink `#1C4A3E`, cream `#F9F6F0`, green `#E3C770`, orange `#C9A84C`, muted `#5C6B64`, line `#E6E0D2`.

## 4. Render and check
```bash
CAROUSEL_BROWSER=$PWD/scripts/chrome-proxy.sh npm run carousel -- <id>
```
- It must finish with "passed layout checks". Fix layout issues and re-run.
- Read every content warning and remove anything that isn't in the plan.
- Look at the PNGs (contact sheet with ffmpeg) before scheduling.

## 5. Commit, push, schedule
1. `git add content/carousels/<id>.json output/carousels/<id>/ && git commit && git push -u origin claude/nhms-realiti-carousel`.
2. Media URLs: `https://raw.githubusercontent.com/mny1408-eng/claude/<commit-sha>/output/carousels/<id>/slide-NN.png`. Use the commit SHA, not the branch name.
3. Pick the time with `getBestTimeToPostByNetwork` (instagram) for that day. Choose the best evening hour, unless the topic suits a specific time (e.g. late-night snacking → 9 PM).
4. `createScheduledPost` with:
   - providers: as listed in step 2 for the Reel's role.
   - `draft: true`, so Coach Nas approves in Metricool.
   - `instagramData {type: POST}`, `facebookData {type: POST}`, `threadsData {type: POST}`.
   - `tiktokData.title`: required, ≤ 90 characters, taken from the hook.
   - caption: the Reel's IG caption from the plan, adjusted for a carousel (no "video ni"), plus the five hashtags:
     `#wedotransformations #kurusfitonlinecoaching #misifightobesiti #coachnas #tipskurus`.

## 6. Record and report
- In the week plan page's production-status section, add one line per carousel: date, title, "Metricool DRAFT", time, planner link.
  Also list the Reel days that were skipped and why.
- Final message, short and in Malay-rojak:
  - what was scheduled (date, time, link);
  - what was skipped;
  - claims that need checking before approval;
  - reminder that the drafts need approval in Metricool.
