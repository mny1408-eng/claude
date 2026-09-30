// Generates Vox-style collage cut-outs with Gemini image model.
// Usage: node scripts/gen-images.mjs [name ...]   (reads GEMINI_API_KEY from env)
import { writeFile } from "node:fs/promises";

const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-3.1-flash-image";
const KEY = process.env.GEMINI_API_KEY;
if (!KEY) throw new Error("GEMINI_API_KEY not set");

const STYLE =
  "Vintage halftone newspaper photo cut-out, black and white with subtle grain, " +
  "cut out with slightly rough scissor edges, centered, isolated on a pure flat white background, " +
  "no text, no letters, no logos, no shadows on background, editorial collage style like a Vox explainer video.";

const IMAGES = {
  "alarm-clock": "A classic twin-bell alarm clock showing late night.",
  "phone-notifications": "A hand holding a smartphone, screen glowing, overwhelmed feeling.",
  "office-desk": "A cluttered office desk with a laptop, stacked papers and a coffee cup, seen from above at an angle.",
  "nasi-lemak": "A plate of Malaysian nasi lemak with sambal, egg, peanuts and anchovies, seen from above.",
  "sneakers": "A pair of running sneakers, slightly worn, side view.",
  "bubble-tea": "A plastic cup of brown sugar bubble tea with a straw.",
};

const names = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(IMAGES);

for (const name of names) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": KEY },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `${IMAGES[name]} ${STYLE}` }] }],
        generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "1:1" } },
      }),
    }
  );
  const json = await res.json();
  if (!res.ok) {
    console.error(`${name}: HTTP ${res.status} ${json.error?.message}`);
    continue;
  }
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) {
    console.error(`${name}: no image returned (${json.candidates?.[0]?.finishReason})`);
    continue;
  }
  const ext = part.inlineData.mimeType.includes("jpeg") ? "jpg" : "png";
  await writeFile(`public/img/${name}.${ext}`, Buffer.from(part.inlineData.data, "base64"));
  console.log(`${name}: saved public/img/${name}.${ext}`);
}
