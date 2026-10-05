// Render carousel slides with one bundle: node scripts/render-carousel.mjs <outRoot> <scale> <id[=folder]>...
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";

const [outRoot, scale, ...ids] = process.argv.slice(2);
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
for (const spec of ids) {
  const [id, folder = id] = spec.split("=");
  const composition = await selectComposition({ serveUrl, id: `Carousel-${id}` });
  for (let f = 0; f < composition.durationInFrames; f++) {
    const output = path.join(outRoot, folder, Number(scale) === 1 ? `slide-${f + 1}.png` : `s${f + 1}.png`);
    await renderStill({ composition, serveUrl, output, frame: f, scale: Number(scale) });
  }
  console.log("done", id);
}
