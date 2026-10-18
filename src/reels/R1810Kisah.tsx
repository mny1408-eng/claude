// Story reel (18/10) "10 years stuck" — redo of the 17/10 story from Coach Nas's re-recorded script, 12 Teleprompter takes
// (18/10 17:50–17:54) joined, each trimmed to its first/last word. Video plays throughout; his real photos float over it as
// plain cards; pop-up word captions; the script's on-screen texts appear as small labels; no sound effects.
// Captions: per-take Whisper (BM+EN), checked against his script. Where the audio differs from the script, the audio wins
// ("lepas tu naik lagi"); unclear bits that follow the script are listed in the chat review (memang busy, “Isnin start balik.”).
import React from "react";
import { AbsoluteFill, Img, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS } from "../theme";
import { Card } from "../kit";
import { SceneDef } from "../Reel";
import { CtaPill } from "./formats/common";

const CLIP = "clips/R1810-kisah-full.mp4";
const TALK = 91.9;
const CLIP_LEN = Math.round(TALK * FPS);
const END = 66;

type Wd = [number, number, string, number];
const WORDS: Wd[] = [
  [0.0, 0.53, "I", 0], [0.53, 0.85, "spent", 0], [0.85, 1.15, "10", 1], [1.15, 1.41, "years", 1], [1.41, 1.81, "trying", 0], [1.81, 2.05, "to", 0],
  [2.05, 2.29, "lose", 0], [2.29, 2.59, "weight", 0], [3.07, 3.17, "the", 0], [3.11, 3.27, "wrong", 1], [3.27, 3.63, "way.", 0], [3.94, 4.46, "Setiap", 0],
  [4.46, 4.66, "tahun", 0], [4.66, 4.92, "target", 0], [4.92, 5.4, "sama.", 1], [5.6, 5.92, "Nak", 0], [5.92, 6.06, "turun", 0], [6.06, 6.74, "berat,", 0],
  [7.1, 7.3, "turun", 0], [7.3, 7.74, "sikit,", 0], [7.92, 8.04, "lepas", 0], [8.04, 8.2, "tu", 0], [8.2, 8.48, "naik", 0], [8.48, 8.66, "lagi.", 0],
  [8.96, 9.49, "Masa", 0], [9.49, 9.85, "sambung", 0], [9.85, 11.35, "master's,", 0], [11.35, 11.59, "life", 0], [11.59, 11.89, "memang", 0], [11.89, 12.25, "busy.", 1],
  [13.37, 13.97, "Classes,", 0], [13.97, 14.33, "deadlines,", 0], [15.41, 16.27, "stress.", 0], [16.39, 16.67, "Rasa", 0], [16.67, 16.97, "macam", 0], [16.97, 17.15, "tak", 0],
  [17.15, 17.27, "ada", 0], [17.27, 17.57, "masa", 0], [17.57, 17.87, "untuk diri", 0], [17.87, 18.11, "sendiri.", 0], [18.41, 19.18, "Malam-malam", 0],
  [19.18, 19.5, "saya", 0], [19.5, 20.04, "stress eat,", 0], [20.04, 20.46, "and", 0], [20.46, 20.74, "then", 0], [20.74, 20.98, "rasa", 0], [20.98, 21.6, "guilty.", 1],
  [22.26, 22.42, "Lepas", 0], [22.42, 22.56, "tu", 0], [22.56, 22.86, "cakap", 0], [22.86, 23.18, "kepada", 0], [23.18, 23.5, "diri", 0], [23.5, 24.12, "sendiri,", 0],
  [25.04, 25.42, "“Isnin", 1], [25.42, 25.56, "start", 0], [25.56, 25.98, "balik.”", 0], [26.28, 26.81, "Tapi", 0], [26.81, 27.09, "bila", 0], [27.09, 27.39, "sampai", 0],
  [27.39, 27.63, "hari", 0], [27.63, 28.43, "Isnin,", 0], [28.85, 29.09, "sama", 0], [29.09, 29.51, "juga.", 0], [29.83, 30.25, "Eat", 0], [30.25, 30.59, "less,", 0],
  [31.07, 31.17, "go", 0], [31.09, 31.71, "extreme,", 1], [32.35, 32.45, "avoid", 0], [32.43, 32.83, "makanan", 0], [32.83, 33.69, "tertentu,", 0], [33.93, 34.03, "and", 0],
  [34.03, 34.31, "paksa", 0], [34.31, 34.67, "diri", 0], [34.67, 34.83, "untuk", 0], [34.83, 35.33, "discipline.", 0], [35.63, 36.16, "Yang", 0], [36.16, 36.36, "paling", 0],
  [36.36, 36.64, "sakit?", 1], [37.24, 37.68, "I", 0], [37.68, 38.18, "actually", 0], [38.18, 38.36, "knew", 0], [38.36, 38.58, "what", 0], [38.58, 38.8, "I", 0],
  [38.8, 38.96, "needed", 0], [38.96, 39.16, "to", 0], [39.16, 39.72, "do.", 0], [39.94, 40.04, "But", 0], [40.04, 40.2, "I", 0], [40.2, 40.42, "still", 0],
  [40.42, 40.58, "tak", 0], [40.58, 40.96, "mampu", 0], [40.96, 41.48, "konsisten.", 1], [41.79, 42.31, "Lepas", 0], [42.31, 42.55, "habis", 0], [42.55, 43.25, "master's,", 0],
  [43.35, 43.45, "saya", 0], [43.45, 43.67, "kena", 0], [43.67, 43.93, "posting", 0], [43.93, 44.25, "jauh", 0], [44.25, 44.39, "dari", 0], [44.39, 44.93, "family.", 1],
  [45.75, 45.89, "Masa", 0], [45.89, 46.03, "tu", 0], [46.03, 46.37, "baru", 0], [46.37, 46.63, "la", 0], [46.63, 47.23, "tersedar,", 0], [47.49, 47.63, "I", 0],
  [47.63, 47.83, "dah", 0], [47.83, 48.53, "stuck", 1], [48.53, 48.89, "dalam", 0], [48.89, 49.25, "cycle", 0], [49.25, 49.53, "ni", 0], [49.53, 49.79, "more", 0],
  [49.79, 50.03, "than", 0], [50.03, 50.17, "10", 1], [50.17, 50.39, "years.", 1], [50.69, 51.22, "And", 0], [51.22, 51.92, "that's", 0], [51.92, 52.3, "when", 0],
  [52.3, 52.64, "everything", 0], [52.64, 53.3, "changed.", 0], [53.98, 54.28, "Because", 0], [54.28, 54.44, "I", 0], [54.44, 55.04, "realized", 0], [55.04, 55.46, "eating", 0],
  [55.46, 56.2, "less", 0], [56.2, 56.6, "doesn't", 0], [56.6, 57.24, "automatically", 0], [57.24, 57.56, "mean", 0], [57.56, 57.92, "healthy", 0], [57.92, 58.14, "fat", 0],
  [58.14, 58.48, "loss.", 0], [59.18, 59.34, "And", 0], [59.34, 59.58, "enjoy", 0], [59.58, 60.0, "makan", 0], [60.0, 60.68, "doesn't", 0], [60.68, 60.94, "mean", 0],
  [60.94, 61.22, "I", 0], [61.22, 61.5, "failed.", 1], [61.8, 62.33, "Fat", 0], [62.33, 62.51, "loss", 0], [62.51, 63.03, "mula", 0], [63.03, 63.75, "berubah", 0],
  [63.75, 64.21, "bila", 0], [64.21, 64.41, "I", 0], [64.41, 64.65, "stop", 0], [64.65, 65.11, "anggap", 0], [65.11, 65.43, "every", 0], [65.43, 65.89, "weekend,", 0],
  [66.55, 66.95, "family", 0], [66.95, 67.15, "meal,", 0], [67.63, 67.73, "and", 0], [67.69, 68.15, "event", 0], [68.15, 68.59, "as", 0], [68.59, 68.85, "a", 0],
  [68.85, 69.07, "cheat.", 1], [69.45, 69.85, "So", 0], [69.85, 70.05, "what", 0], [70.05, 70.23, "I", 0], [70.23, 70.33, "learned", 0], [70.31, 70.63, "is", 0],
  [70.63, 70.79, "the", 0], [70.79, 70.97, "routine", 0], [70.97, 71.33, "that", 0], [71.33, 71.59, "changes", 0], [71.59, 71.77, "you", 0], [71.77, 72.05, "is", 0],
  [72.05, 72.19, "the", 0], [72.19, 72.29, "one", 0], [72.27, 72.45, "that", 0], [72.45, 72.59, "you", 0], [72.59, 72.79, "can", 0], [72.79, 73.25, "repeat", 1],
  [73.25, 73.61, "when", 0], [73.61, 73.79, "life", 0], [73.79, 74.13, "gets", 0], [74.13, 74.45, "busy.", 1], [74.75, 75.28, "So", 0], [75.28, 76.1, "Alhamdulillah,", 0],
  [76.36, 76.5, "now", 0], [76.5, 76.78, "I'm", 0], [76.78, 76.98, "over", 0], [76.98, 77.56, "20kg", 1], [77.56, 77.92, "down", 0], [77.92, 78.12, "from", 0],
  [78.12, 78.24, "my", 0], [78.24, 78.6, "baseline.", 0], [79.22, 79.32, "And", 0], [79.3, 79.68, "maintaining", 0], [79.68, 79.96, "it", 0], [79.96, 80.22, "for", 0],
  [80.22, 80.52, "4", 1], [80.52, 80.88, "years.", 1], [81.1, 81.4, "Still", 0], [81.4, 81.62, "can", 0], [81.62, 81.9, "enjoy", 0], [81.9, 82.2, "makan", 0],
  [82.2, 82.42, "dengan", 0], [82.42, 82.84, "family.", 1], [83.14, 83.67, "If", 0], [83.67, 83.83, "you", 0], [83.83, 83.97, "are", 0], [83.97, 84.11, "a", 0],
  [84.11, 84.33, "busy", 0], [84.33, 84.87, "parent", 0], [84.87, 85.33, "yang", 0], [85.77, 85.99, "still", 0], [85.99, 86.33, "restart", 0], [86.33, 86.65, "every", 0],
  [86.65, 87.13, "Monday,", 1], [87.47, 87.83, "follow", 0], [87.83, 88.05, "me", 0], [88.05, 88.31, "for", 0], [88.31, 88.87, "realistic", 0], [88.87, 89.13, "fat", 0],
  [89.13, 89.35, "loss", 0], [89.35, 89.59, "habits", 0], [89.59, 89.91, "that", 0], [89.91, 90.35, "fits", 0], [90.35, 90.87, "Malaysian", 0], [90.87, 91.21, "family", 0],
  [91.21, 91.55, "life.", 0],
];

// [start, end, image, side] in reel seconds — a photo card floats over the playing video (the video never cuts away).
// Only the photos that match a line are used; cards sit high and to the side so the face stays visible. family-day-makan.jpg: 10/10 family day (the banner photo with the hospital
// name is deliberately not used).
const PHOTOS: [number, number, string, "left" | "right" | "center"][] = [
  [4.0, 8.7, "st-before.jpg", "right"], // "Setiap tahun target sama… naik lagi"
  [9.4, 15.4, "st-laptop.jpg", "left"], // "Masa sambung master's… classes, deadlines"
  [18.5, 22.0, "st-soup.jpg", "right"], // "Malam-malam saya stress eat"
  [29.8, 35.3, "st-side-before.jpg", "left"], // "Eat less, go extreme…"
  [42.4, 47.0, "st-family.jpg", "right"], // "posting jauh dari family"
  [64.6, 69.2, "family-day-makan.jpg", "left"], // "weekend, family meal, and event as a cheat"
  [75.3, 80.9, "st-ba.jpg", "center"], // "over 20kg down… maintaining it for 4 years" (his card, with its disclaimer)
];

const chunks = (() => {
  const out: Wd[][] = [];
  let cur: Wd[] = [];
  WORDS.forEach((w, i) => {
    cur.push(w);
    const n = WORDS[i + 1];
    if (!n || cur.length >= 3 || /[.,?!”…]$/.test(w[2]) || n[0] - w[1] > 0.4) {
      out.push(cur);
      cur = [];
    }
  });
  return out;
})();

const PopCaptions: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const idx = chunks.findIndex((c, k) => t >= c[0][0] - 0.05 && t < Math.min(chunks[k + 1]?.[0][0] ?? 1e9, c[c.length - 1][1] + 0.9));
  if (idx < 0) return null;
  const c = chunks[idx];
  return (
    <div style={{ position: "absolute", top: 1250, left: 90, right: 90, display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "10px 16px" }}>
      {c.map(([s, , text, emph], i) => {
        const st = Math.round((s - 0.05) * fps);
        if (f < st) return <span key={i} style={{ visibility: "hidden", fontSize: emph ? 84 : 62, fontWeight: 800 }}>{text}</span>;
        const p = spring({ frame: f - st, fps, config: { damping: 11, stiffness: 220 } });
        const scale = interpolate(p, [0, 1], [0.35, 1]);
        const y = interpolate(p, [0, 1], [26, 0]);
        return emph ? (
          <span key={i} style={{ display: "inline-block", transform: `translateY(${y}px) scale(${scale}) rotate(${i % 2 ? 3 : -3}deg)`, fontSize: 84, fontWeight: 800, lineHeight: 1.05, color: C.ink, background: C.gold, borderRadius: 14, padding: "4px 16px", boxShadow: "0 6px 18px rgba(0,0,0,0.3)" }}>
            {text}
          </span>
        ) : (
          <span key={i} style={{ display: "inline-block", transform: `translateY(${y}px) scale(${scale})`, fontSize: 62, fontWeight: 800, lineHeight: 1.1, color: "#fff", textShadow: "0 4px 0 rgba(0,0,0,0.55), 0 0 16px rgba(0,0,0,0.55)" }}>
            {text}
          </span>
        );
      })}
    </div>
  );
};

// Plain photo card (thin white edge + shadow) over the talking video; fades and drifts up slightly. No sound.
const Photo: React.FC<{ src: string; dur: number; side: "left" | "right" | "center" }> = ({ src, dur, side }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f, fps, config: { damping: 16, stiffness: 140 } });
  const out = interpolate(f, [dur - 6, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const box = side === "center" ? { left: 240, width: 600, maxH: 700 } : side === "left" ? { left: 30, width: 400, maxH: 560 } : { left: 650, width: 400, maxH: 560 };
  return (
    <div style={{ position: "absolute", top: 230, left: box.left, width: box.width, display: "flex", justifyContent: "center", opacity: Math.min(p * 1.5, 1) * out, transform: `translateY(${(1 - p) * 40}px)` }}>
      <Img src={staticFile(`img/kisah/${src}`)} style={{ maxWidth: "100%", maxHeight: box.maxH, objectFit: "contain", border: "8px solid #fff", borderRadius: 10, boxShadow: "0 14px 34px rgba(0,0,0,0.4)" }} />
    </div>
  );
};

// The script's on-screen texts, [start, end, text] in reel seconds, shown as a small card at the top (never under a photo).
const LABELS: [number, number, string][] = [
  [0.1, 3.7, "10 years stuck"],
  [59.2, 62.2, "Makan bukan gagal"],
  [72.4, 75.0, "Repeat when busy"],
  [83.2, 88.0, "Fat loss, real life"],
];

const Label: React.FC<{ text: string; dur: number }> = ({ text, dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - 2, fps, config: { damping: 13, stiffness: 170 } });
  const out = interpolate(f, [dur - 6, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 235, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: out }}>
      <Card style={{ transform: `scale(${0.7 + 0.3 * p})`, opacity: Math.min(1, p * 2), padding: "22px 40px", fontSize: 64, fontWeight: 800, textAlign: "center", color: C.ink }}>
        {text}
      </Card>
    </div>
  );
};

const Talk: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(CLIP)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    {PHOTOS.map(([a, b, src, side]) => (
      <Sequence key={src} from={Math.round(a * FPS)} durationInFrames={Math.round((b - a) * FPS)} layout="none">
        <Photo src={src} dur={Math.round((b - a) * FPS)} side={side} />
      </Sequence>
    ))}
    {LABELS.map(([a, b, text]) => (
      <Sequence key={text} from={Math.round(a * FPS)} durationInFrames={Math.round((b - a) * FPS)} layout="none">
        <Label text={text} dur={Math.round((b - a) * FPS)} />
      </Sequence>
    ))}
    <PopCaptions />
  </AbsoluteFill>
);

const End: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(CLIP)} muted startFrom={CLIP_LEN - 6} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "rgba(23,60,48,0.5)" }} />
    <div style={{ position: "absolute", top: 1000, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: "scale(0.85)" }}>
        <CtaPill icon="follow" delay={3}>
          Follow @coachnas.pharmacist
        </CtaPill>
      </div>
    </div>
  </AbsoluteFill>
);

export const R1810_KISAH_SCENES: SceneDef[] = [
  { id: "talk", dur: CLIP_LEN, el: <Talk /> },
  { id: "end", dur: END, el: <End /> },
];
