// Synthesises Vox-style sound effects as 16-bit mono WAVs in public/sfx/.
// Everything is generated from noise + sine, so there is nothing to license.
import { mkdir, writeFile } from "node:fs/promises";

const SR = 44100;
let seed = 7;
const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;

const buf = (sec) => new Float32Array(Math.round(sec * SR));

// RBJ biquad band-pass with per-sample centre frequency.
function bandpass(x, fc, q = 1.2) {
  const y = new Float32Array(x.length);
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  for (let n = 0; n < x.length; n++) {
    const f = typeof fc === "function" ? fc(n / SR) : fc;
    const w = (2 * Math.PI * f) / SR, a = Math.sin(w) / (2 * q), cos = Math.cos(w);
    const b0 = a, b2 = -a, a0 = 1 + a, a1 = -2 * cos, a2 = 1 - a;
    const v = (b0 * x[n] + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x[n]; y2 = y1; y1 = v; y[n] = v;
  }
  return y;
}

const noise = (sec) => buf(sec).map(() => rand());
const env = (x, fn) => x.map((v, n) => v * fn(n / SR, x.length / SR));
const normalize = (x, peak = 0.9) => {
  const m = x.reduce((a, v) => Math.max(a, Math.abs(v)), 0) || 1;
  return x.map((v) => (v / m) * peak);
};

function wav(x) {
  const b = Buffer.alloc(44 + x.length * 2);
  b.write("RIFF", 0); b.writeUInt32LE(36 + x.length * 2, 4); b.write("WAVE", 8);
  b.write("fmt ", 12); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(1, 22);
  b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
  b.write("data", 36); b.writeUInt32LE(x.length * 2, 40);
  x.forEach((v, i) => b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, v)) * 32767), 44 + i * 2));
  return b;
}

const SFX = {
  // Paper/air swoosh for things sliding in.
  whoosh: () => {
    const d = 0.38;
    const x = bandpass(noise(d), (t) => 400 + 2600 * Math.sin((Math.PI * t) / d), 0.9);
    return normalize(env(x, (t) => Math.sin((Math.PI * t) / d) ** 2), 0.7);
  },
  // Rubber-stamp thud: pitched-down sine body + papery click.
  stamp: () => {
    const d = 0.45;
    let ph = 0;
    const body = buf(d).map((_, n) => {
      const t = n / SR;
      ph += (2 * Math.PI * (40 + 90 * Math.exp(-t * 25))) / SR;
      return Math.sin(ph) * Math.exp(-t * 9);
    });
    const click = env(bandpass(noise(d), 2500, 0.8), (t) => Math.exp(-t * 60));
    return normalize(body.map((v, n) => v + click[n] * 0.5), 0.95);
  },
  // Felt-tip marker scribble for circles / strikes / arrows.
  scribble: () => {
    const d = 0.5;
    const x = bandpass(noise(d), (t) => 3000 + 1500 * Math.sin(t * 60), 1.5);
    return normalize(env(x, (t) => (0.55 + 0.45 * Math.sin(t * 2 * Math.PI * 14 + Math.sin(t * 40))) * Math.min(1, t * 30, (d - t) * 12)), 0.6);
  },
  // Quick highlighter swipe.
  swipe: () => {
    const d = 0.26;
    const x = bandpass(noise(d), (t) => 1800 + 3000 * (t / d), 1.1);
    return normalize(env(x, (t) => Math.min(1, t * 40) * Math.exp(-((t - d * 0.4) ** 2) * 60)), 0.55);
  },
  // Soft UI pop for cards and labels.
  pop: () => {
    const d = 0.14;
    let ph = 0;
    return normalize(buf(d).map((_, n) => {
      const t = n / SR;
      ph += (2 * Math.PI * (520 + 900 * (t / d))) / SR;
      return Math.sin(ph) * Math.exp(-t * 30) * Math.min(1, t * 400);
    }), 0.55);
  },
  // Pencil tick for checkmarks / crosses.
  tick: () => {
    const d = 0.07;
    return normalize(env(bandpass(noise(d), 3800, 2), (t) => Math.exp(-t * 90)), 0.5);
  },
  // Gentle two-note chime for the CTA.
  chime: () => {
    const d = 1.2;
    return normalize(buf(d).map((_, n) => {
      const t = n / SR;
      const a = Math.sin(2 * Math.PI * 880 * t) + 0.5 * Math.sin(2 * Math.PI * 1760 * t);
      const b = t > 0.12 ? Math.sin(2 * Math.PI * 1318.5 * (t - 0.12)) * Math.exp(-(t - 0.12) * 4) : 0;
      return (a * Math.exp(-t * 5) + b) * Math.min(1, t * 300);
    }), 0.45);
  },
};

await mkdir("public/sfx", { recursive: true });
for (const [name, make] of Object.entries(SFX)) {
  await writeFile(`public/sfx/${name}.wav`, wav(make()));
  console.log(`public/sfx/${name}.wav`);
}
