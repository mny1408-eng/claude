// Carousel generator — renders a content/carousels/<id>.json file to PNGs, a PDF and a preview page.
//
//   npm run carousel -- nak-lose-fat            → output/carousels/nak-lose-fat/
//   npm run carousel -- path/to/file.json
//   npm run carousel -- nak-lose-fat --strict   → exit 1 on any claim warning too
//
// Env: CAROUSEL_BROWSER=/path/to/chrome  (optional; otherwise Remotion uses its own headless Chromium)
// No extra dependencies: Remotion renders the React slides; the PDF is written by hand (JPEG pages).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const strict = args.includes("--strict");
const target = args.find((a) => !a.startsWith("--"));
if (!target) {
  console.error("Usage: npm run carousel -- <id | path/to/carousel.json> [--strict]");
  process.exit(2);
}

const carouselPath = target.endsWith(".json") ? path.resolve(target) : path.join(ROOT, "content/carousels", `${target}.json`);
const carousel = JSON.parse(fs.readFileSync(carouselPath, "utf8"));
const brand = JSON.parse(fs.readFileSync(path.join(ROOT, "content/carousels/brand.json"), "utf8"));
const outDir = path.join(ROOT, "output/carousels", carousel.id);
const pad = (n) => String(n).padStart(2, "0");

// ── 1. Content checks (before rendering) ─────────────────────────────
const errors = [];
const warnings = [];
const TYPES = { cover: ["title"], problem: ["title", "body"], step: ["number", "title", "body"], diagram: ["title", "body", "flow"], cta: ["title", "body"] };
const VISUALS = ["rice-bowl", "calorie-meter", "balanced-plate", "lifestyle", "save", "calcium-foods", "walk-stairs", "strength-balance", "moon", "pause", "snack-options", "tea", "notepad", "dessert"];
// Box each photo fills (see src/generator/slides.tsx). Upscaling beyond ~1.15× looks soft; beyond 1.5× it looks blurry.
const PHOTO_BOX = { cover: [1080, 1440], step: [888, 500] };
const imageSize = (file) => {
  const b = fs.readFileSync(file);
  if (b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)];
  for (let i = 2; i < b.length; ) {
    const marker = b[i + 1];
    if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + b.readUInt16BE(i + 2);
  }
  return null;
};
const photoNotes = [];
// Phrases that tend to become unsupported health / fat-loss promises. Warnings, not hard errors.
const CLAIMS = [
  [/\b\d+(\.\d+)?\s?(kg|kilo)\b/i, "specific weight-loss number"],
  [/\b\d+\s?%/, "percentage / statistic (needs a source)"],
  [/guarantee|dijamin|confirm (turun|kurus)|pasti (turun|kurus)/i, "guarantee"],
  [/\bdetox\b|buang toksin|cure|sembuh|ubat(i)? (diabetes|darah tinggi)/i, "medical / detox claim"],
  [/dalam \d+ (hari|minggu)|in \d+ (days|weeks)/i, "time-bound result promise"],
  [/before.?after|sebelum.?selepas/i, "before/after claim"],
];
if (!carousel.id || !/^[a-z0-9-]+$/.test(carousel.id)) errors.push(`id must be lowercase-with-dashes, got "${carousel.id}"`);
if (!Array.isArray(carousel.slides) || carousel.slides.length === 0) errors.push("slides[] is empty");
carousel.slides.forEach((s, i) => {
  const req = TYPES[s.type];
  if (!req) return errors.push(`slide ${i + 1}: unknown type "${s.type}" (use ${Object.keys(TYPES).join(", ")})`);
  req.forEach((k) => (s[k] === undefined || (Array.isArray(s[k]) && !s[k].length)) && errors.push(`slide ${i + 1} (${s.type}): missing "${k}"`));
  if (s.visual && !VISUALS.includes(s.visual)) errors.push(`slide ${i + 1}: unknown visual "${s.visual}" (use ${VISUALS.join(", ")})`);
  const { photo, photoPos, ...copy } = s;
  const text = JSON.stringify(copy);
  CLAIMS.forEach(([re, why]) => re.test(text) && warnings.push(`slide ${i + 1}: possible ${why} → "${text.match(re)[0]}"`));
  if ((text.match(/\*\*/g) || []).length % 2) errors.push(`slide ${i + 1}: unbalanced ** highlight markers`);
  if (s.photo) {
    const file = path.join(ROOT, "public", s.photo);
    if (!PHOTO_BOX[s.type]) return errors.push(`slide ${i + 1}: photos are supported on cover and step slides only`);
    if (!fs.existsSync(file)) return errors.push(`slide ${i + 1}: photo not found: public/${s.photo}`);
    const size = imageSize(file);
    if (!size) return warnings.push(`slide ${i + 1}: couldn't read the size of ${s.photo}`);
    const [bw, bh] = PHOTO_BOX[s.type];
    const scale = Math.max(bw / size[0], bh / size[1]);
    const note = `slide ${i + 1}: ${s.photo} is ${size[0]}×${size[1]}, shown at ${bw}×${bh} (${scale.toFixed(2)}× upscale)`;
    if (scale > 1.5) warnings.push(`${note}: TOO LOW, will look blurry. Upload a larger photo.`);
    else if (scale > 1.15) warnings.push(`${note}: borderline, slightly soft.`);
    else photoNotes.push(`${note}: OK`);
  }
});
photoNotes.forEach((n) => console.log("📷 " + n));
warnings.forEach((w) => console.warn("⚠️  " + w));
if (errors.length || (strict && warnings.length)) {
  errors.forEach((e) => console.error("✖ " + e));
  process.exit(1);
}

// ── 2. Render ────────────────────────────────────────────────────────
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });
const tmp = fs.mkdtempSync(path.join(outDir, ".pdf-"));
const browserExecutable = process.env.CAROUSEL_BROWSER || undefined;
const inputProps = { brand, carousel };

console.log(`Bundling… (${carousel.slides.length} slides → ${path.relative(ROOT, outDir)})`);
const serveUrl = await bundle({ entryPoint: path.join(ROOT, "src/index.ts") });
const composition = await selectComposition({ serveUrl, id: "CarouselGen", inputProps, browserExecutable, logLevel: "error" });

const checks = [];
const done = new Set();
const onBrowserLog = (log) => {
  if (log.text.startsWith("CAROUSEL_CHECK")) checks.push(log.text.replace("CAROUSEL_CHECK ", ""));
  if (log.text.startsWith("CAROUSEL_DONE")) done.add(log.text);
};
const pngs = [];
for (let f = 0; f < composition.durationInFrames; f++) {
  const png = path.join(outDir, `slide-${pad(f + 1)}.png`);
  await renderStill({ composition, serveUrl, inputProps, frame: f, output: png, imageFormat: "png", browserExecutable, onBrowserLog, logLevel: "error" });
  await renderStill({ composition, serveUrl, inputProps, frame: f, output: path.join(tmp, `${pad(f + 1)}.jpg`), imageFormat: "jpeg", jpegQuality: 95, browserExecutable, logLevel: "error" });
  pngs.push(png);
  console.log(`  ✓ slide-${pad(f + 1)}.png`);
}

// ── 3. Output checks ─────────────────────────────────────────────────
const pngSize = (file) => {
  const b = fs.readFileSync(file);
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
};
pngs.forEach((p, i) => {
  const [w, h] = pngSize(p);
  if (w !== 1080 || h !== 1440) checks.push(`slide ${i + 1}: rendered ${w}×${h}, expected 1080×1440`);
});
if (pngs.length !== carousel.slides.length) checks.push(`rendered ${pngs.length} slides, config has ${carousel.slides.length}`);
if (done.size !== carousel.slides.length) checks.push(`layout check ran on ${done.size}/${carousel.slides.length} slides`);

// ── 4. PDF (slide order = config order) ──────────────────────────────
const jpgSize = (b) => {
  for (let i = 2; i < b.length; ) {
    const marker = b[i + 1];
    const len = b.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)];
    i += 2 + len;
  }
  throw new Error("JPEG size not found");
};
const writePdf = (jpgs, file) => {
  const objs = [];
  const add = (body) => objs.push(body) && objs.length;
  const pagesId = 2;
  const kids = [];
  objs.push("<< /Type /Catalog /Pages 2 0 R >>", "");
  jpgs.forEach((buf) => {
    const [w, h] = jpgSize(buf);
    const img = add([`<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${buf.length} >>\nstream\n`, buf, "\nendstream"]);
    const draw = `q ${w} 0 0 ${h} 0 0 cm /Im Do Q`;
    const content = add(`<< /Length ${draw.length} >>\nstream\n${draw}\nendstream`);
    kids.push(add(`<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${w} ${h}] /Resources << /XObject << /Im ${img} 0 R >> >> /Contents ${content} 0 R >>`));
  });
  objs[pagesId - 1] = `<< /Type /Pages /Kids [${kids.map((k) => `${k} 0 R`).join(" ")}] /Count ${kids.length} >>`;
  const chunks = [Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "binary")];
  let offset = chunks[0].length;
  const xref = [];
  objs.forEach((body, i) => {
    xref.push(offset);
    const parts = [Buffer.from(`${i + 1} 0 obj\n`), ...(Array.isArray(body) ? body : [body]).map((p) => (Buffer.isBuffer(p) ? p : Buffer.from(p, "binary"))), Buffer.from("\nendobj\n")];
    parts.forEach((p) => (offset += p.length));
    chunks.push(...parts);
  });
  const xrefStr = `xref\n0 ${objs.length + 1}\n0000000000 65535 f \n${xref.map((o) => `${String(o).padStart(10, "0")} 00000 n \n`).join("")}trailer\n<< /Size ${objs.length + 1} /Root 1 0 R >>\nstartxref\n${offset}\n%%EOF\n`;
  chunks.push(Buffer.from(xrefStr));
  fs.writeFileSync(file, Buffer.concat(chunks));
};
const pdfFile = path.join(outDir, `${carousel.id}.pdf`);
writePdf(
  carousel.slides.map((_, i) => fs.readFileSync(path.join(tmp, `${pad(i + 1)}.jpg`))),
  pdfFile,
);
fs.rmSync(tmp, { recursive: true, force: true });

// ── 5. Preview page ──────────────────────────────────────────────────
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
fs.writeFileSync(
  path.join(outDir, "index.html"),
  `<!doctype html><html lang="ms"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(carousel.title)}</title>
<style>body{margin:0;padding:24px 16px;background:${brand.colors.ink};color:${brand.colors.cream};font-family:system-ui,sans-serif}h1{font-size:22px;margin:0 0 4px}p{opacity:.7;margin:0 0 20px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}figure{margin:0}img{width:100%;border-radius:12px;display:block}figcaption{font-size:13px;opacity:.7;margin-top:6px}a{color:${brand.colors.green}}</style></head>
<body><h1>${esc(carousel.title)}</h1><p>${carousel.slides.length} slides · 1080×1440 · <a href="${carousel.id}.pdf">PDF</a></p><div class="grid">
${pngs.map((p, i) => `<figure><img src="${path.basename(p)}" alt="Slide ${i + 1}"><figcaption>${path.basename(p)} · ${carousel.slides[i].type}</figcaption></figure>`).join("\n")}
</div></body></html>`,
);

// ── 6. Report ────────────────────────────────────────────────────────
console.log(`\nPDF: ${path.relative(ROOT, pdfFile)} (${carousel.slides.length} pages)`);
console.log(`Preview: ${path.relative(ROOT, path.join(outDir, "index.html"))}`);
if (checks.length) {
  console.error(`\n✖ ${checks.length} layout issue(s):`);
  checks.forEach((c) => console.error("  - " + c));
  process.exit(1);
}
console.log(`\n✓ All ${carousel.slides.length} slides passed layout checks${warnings.length ? ` (${warnings.length} content warning(s) above)` : ""}.`);
