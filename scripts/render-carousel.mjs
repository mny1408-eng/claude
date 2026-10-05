// Render carousel slides with one bundle:
//   node scripts/render-carousel.mjs <outRoot> <scale> <id[=folder]>...
// scale 1   → final slides, slide-N.jpg (JPEG 1080×1440: TikTok's API rejects PNG and caps images at 1080p)
// scale < 1 → QA previews, sN.png
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";

const [outRoot, scale, ...ids] = process.argv.slice(2);
const final = Number(scale) === 1;
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
for (const spec of ids) {
  const [id, folder = id] = spec.split("=");
  const composition = await selectComposition({ serveUrl, id: `Carousel-${id}` });
  for (let f = 0; f < composition.durationInFrames; f++) {
    const output = path.join(outRoot, folder, final ? `slide-${f + 1}.jpg` : `s${f + 1}.png`);
    await renderStill({ composition, serveUrl, output, frame: f, scale: Number(scale), imageFormat: final ? "jpeg" : "png", jpegQuality: 95 });
  }
  console.log("done", id);
}
