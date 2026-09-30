// Generates one voice clip per script line and a manifest the reel reads for timing.
// Usage: node scripts/gen-voice.mjs content/T1.voice.json
//   VOICE_PROVIDER=elevenlabs  (needs ELEVENLABS_API_KEY + ELEVENLABS_VOICE_ID) — Coach Nas clone
//   VOICE_PROVIDER=gemini      (needs GEMINI_API_KEY) — placeholder narrator, drafts only
// Clips are cached by provider+voice+text, so unchanged lines are never re-billed.
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const [scriptPath] = process.argv.slice(2);
if (!scriptPath) throw new Error("Usage: node scripts/gen-voice.mjs content/<reel>.voice.json");
const script = JSON.parse(await readFile(scriptPath, "utf8"));

const provider = process.env.VOICE_PROVIDER || (process.env.ELEVENLABS_VOICE_ID ? "elevenlabs" : "gemini");
const voice =
  provider === "elevenlabs"
    ? process.env.ELEVENLABS_VOICE_ID
    : process.env.GEMINI_TTS_VOICE || "Charon";
const outDir = `public/voice/${script.reel}`;
await mkdir(outDir, { recursive: true });

const wavDuration = (buf) => {
  const sr = buf.readUInt32LE(24), ch = buf.readUInt16LE(22), bits = buf.readUInt16LE(34);
  const data = buf.indexOf("data") + 8;
  return (buf.length - data) / (sr * ch * (bits / 8));
};

const pcmToWav = (pcm, sr = 24000) => {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(sr, 24);
  h.writeUInt32LE(sr * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function gemini(text) {
  const model = process.env.GEMINI_TTS_MODEL || "gemini-3.8-flash-tts";
  let res, json;
  // Free tier allows ~3 requests/minute: wait out 429s instead of failing.
  for (let attempt = 0; attempt < 6; attempt++) {
    res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": process.env.GEMINI_API_KEY },
      // Text only: this model reads any style instructions aloud.
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }],
        generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } } },
      }),
    });
    json = await res.json();
    if (res.status !== 429) break;
    const wait = Number(/retry in ([\d.]+)s/.exec(json.error?.message ?? "")?.[1] ?? 30) + 2;
    console.log(`  rate limited, waiting ${Math.round(wait)}s…`);
    await sleep(wait * 1000);
  }
  if (!res.ok) throw new Error(`Gemini TTS ${res.status}: ${json.error?.message}`);
  const part = json.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!part) throw new Error("Gemini TTS returned no audio");
  const raw = Buffer.from(part.inlineData.data, "base64");
  const wav = raw.toString("ascii", 0, 4) === "RIFF" ? raw : pcmToWav(raw);
  return { ext: "wav", data: wav, duration: wavDuration(wav) };
}

async function elevenlabs(text) {
  const model = process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2";
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}/with-timestamps?output_format=mp3_44100_128`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "xi-api-key": process.env.ELEVENLABS_API_KEY },
    body: JSON.stringify({
      text,
      model_id: model,
      voice_settings: { stability: 0.45, similarity_boost: 0.85, style: 0.2, use_speaker_boost: true },
    }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(`ElevenLabs ${res.status}: ${JSON.stringify(json.detail ?? json).slice(0, 200)}`);
  const ends = json.alignment?.character_end_times_seconds ?? [];
  return { ext: "mp3", data: Buffer.from(json.audio_base64, "base64"), duration: (ends[ends.length - 1] ?? 0) + 0.15, alignment: json.alignment };
}

const manifestPath = `${outDir}/manifest.json`;
const old = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, "utf8")) : { lines: [] };
const lines = [];

for (const line of script.lines) {
  const model = provider === "elevenlabs" ? process.env.ELEVENLABS_MODEL || "eleven_multilingual_v2" : process.env.GEMINI_TTS_MODEL || "gemini-3.8-flash-tts";
  const key = createHash("sha1").update(`${provider}|${model}|${voice}|${line.text}`).digest("hex").slice(0, 10);
  const cached = old.lines.find((l) => l.id === line.id && l.key === key && existsSync(`public/${l.file}`));
  if (cached) {
    lines.push(cached);
    console.log(`${line.id}: cached (${cached.duration.toFixed(2)}s)`);
    continue;
  }
  const out = provider === "elevenlabs" ? await elevenlabs(line.text) : await gemini(line.text);
  const file = `voice/${script.reel}/${line.id}-${key}.${out.ext}`;
  await writeFile(`public/${file}`, out.data);
  lines.push({ id: line.id, scene: line.scene, text: line.text, key, file, duration: out.duration, alignment: out.alignment });
  console.log(`${line.id}: ${out.duration.toFixed(2)}s -> public/${file}`);
  // Save progress so a failure mid-way keeps the clips already paid for.
  await writeFile(manifestPath, JSON.stringify({ ...old, lines: [...lines, ...old.lines.filter((l) => !lines.some((n) => n.id === l.id))] }, null, 2));
}

const manifest = { reel: script.reel, provider, voice, placeholder: provider !== "elevenlabs", lines };
await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
// Copy into src so the composition can import timings at bundle time.
await mkdir("src/reels/voice", { recursive: true });
await writeFile(`src/reels/voice/${script.reel}.manifest.json`, JSON.stringify(manifest, null, 2));
console.log(`\n${provider}${manifest.placeholder ? " (PLACEHOLDER — drafts only)" : ""}: ${lines.length} lines, ${lines.reduce((a, l) => a + l.duration, 0).toFixed(1)}s of voice`);
