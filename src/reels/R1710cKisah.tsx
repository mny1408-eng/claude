// Story reel (17/10) "10 tahun diet tak jadi" — Coach Nas's own fat-loss story, 11 Teleprompter takes (17/10 18:34–18:36)
// joined (each trimmed to its first/last word), with pop-up word captions and his real photos as plain cutaways
// (Gambar-Kisah.zip) shown as plain cards over the playing video; no cutaways, no sound effects.
// Captions: per-take Whisper (BM+EN style prompt), cross-checked against EN/MS runs. Words that could not be made out are
// left uncaptioned; best guesses are listed in the chat review (lose it, Isnin, extreme, dalam cycle, The only change,
// makan, parent, Malaysian). The before/after card is his own graphic and keeps its "hasil tidak tipikal" note.
import React from "react";
import { AbsoluteFill, Img, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS } from "../theme";
import { Card } from "../kit";
import { SceneDef } from "../Reel";
import { CtaPill } from "./formats/common";

const CLIP = "clips/R1710c-kisah-full.mp4";
const TALK = 80.9;
const CLIP_LEN = Math.round(TALK * FPS);
const END = 66;

type Wd = [number, number, string, number];
const WORDS: Wd[] = [
  [0.0, 0.78, "I", 0], [0.78, 1.12, "spent", 0], [1.12, 1.38, "10", 1], [1.38, 1.74, "years", 1], [1.74, 2.06, "trying", 0], [2.06, 2.3, "to", 0],
  [2.3, 2.54, "lose", 1], [2.54, 3.0, "it", 0], [3.0, 3.5, "wrongly.", 0], [3.77, 4.55, "Setiap", 0], [4.55, 4.71, "tahun", 0], [4.71, 4.97, "target", 0],
  [4.97, 5.29, "sama.", 1], [5.47, 5.65, "Nak", 0], [5.65, 5.97, "turun", 0], [5.97, 6.17, "berat,", 0], [6.29, 6.39, "nak", 0], [6.31, 6.57, "turun", 0],
  [6.57, 7.57, "berat,", 0], [7.81, 7.97, "turun", 0], [7.97, 8.31, "sikit", 0], [8.31, 8.63, "lepas", 0], [8.63, 8.75, "tu", 0], [8.75, 9.01, "naik", 0],
  [9.01, 9.15, "balik.", 1], [9.57, 10.19, "Masa", 0], [10.19, 10.55, "sambung", 0], [10.55, 11.05, "masters,", 0], [13.09, 13.39, "Ada", 0], [13.39, 13.87, "classes,", 0],
  [14.25, 14.35, "deadlines,", 0], [14.97, 15.55, "stress,", 0], [15.73, 15.97, "rasa", 0], [15.97, 16.23, "macam", 0], [16.23, 16.37, "tak", 0], [16.37, 16.470000000000002, "ada", 0],
  [16.47, 16.77, "masa", 0], [16.77, 17.09, "langsung.", 0], [19.29, 19.53, "Malam-malam", 0], [19.69, 19.93, "saya", 0], [19.93, 20.23, "stress", 1], [20.23, 20.97, "eating,", 1],
  [22.87, 23.13, "Then", 0], [23.13, 23.33, "saya", 0], [23.33, 23.63, "cakap,", 0], [24.79, 25.05, "“Hari", 0], [25.05, 25.29, "Isnin", 1], [25.29, 25.41, "lah", 0],
  [25.41, 25.61, "aku", 0], [25.61, 25.75, "start", 0], [25.75, 26.13, "balik.”", 1], [26.43, 27.21, "Tapi", 0], [27.21, 27.47, "bila", 0], [27.47, 27.67, "hari", 0],
  [27.67, 27.83, "Isnin", 1], [27.83, 28.33, "sampai,", 0], [28.49, 28.71, "pattern", 0], [28.71, 28.91, "yang", 0], [28.91, 29.13, "sama", 0], [29.13, 29.37, "juga", 0],
  [29.37, 30.15, "jadi,", 0], [30.35, 30.75, "kena", 0], [30.75, 30.87, "eat", 0], [30.87, 31.21, "less,", 0], [31.41, 31.55, "go", 0], [31.55, 32.03, "extreme,", 1],
  [32.35, 32.53, "avoid", 0], [32.53, 33.45, "makanan", 0], [33.45, 34.19, "spesifik.", 0], [34.59, 34.73, "Lepas", 0], [34.73, 34.85, "tu,", 0], [34.97, 35.29, "paksa", 0],
  [35.29, 35.59, "diri…", 0], [37.09, 37.73, "Apa", 0], [37.73, 37.85, "yang", 0], [37.85, 38.01, "paling", 0], [38.01, 38.29, "sakit", 1], [38.29, 38.61, "hati,", 1],
  [38.87, 38.97, "I", 0], [38.87, 39.21, "actually", 0], [39.21, 39.53, "know", 0], [39.53, 39.73, "what", 0], [39.73, 39.91, "I", 0], [39.91, 40.05, "need", 0],
  [40.05, 40.19, "to", 0], [40.19, 40.33, "do", 0], [40.33, 41.03, "tapi", 0], [41.03, 41.35, "saya", 0], [41.35, 41.59, "still", 0], [41.59, 41.75, "not", 0],
  [41.75, 41.93, "able", 0], [41.93, 42.09, "to", 0], [42.09, 42.43, "consistent", 1], [42.43, 42.57, "with", 0], [42.57, 42.67, "it.", 0], [42.89, 43.63, "Lepas", 0],
  [43.63, 43.89, "habis", 0], [43.89, 44.27, "master,", 0], [44.55, 44.65, "saya", 0], [44.59, 44.85, "kena", 0], [44.85, 45.17, "posting", 0], [45.17, 45.57, "jauh", 0],
  [45.57, 45.75, "daripada", 0], [45.75, 46.09, "family.", 1], [46.67, 46.87, "Masa", 0], [46.87, 46.97, "tu", 0], [46.93, 47.17, "baru", 0], [47.17, 47.81, "tersedar,", 0],
  [48.03, 48.15, "saya", 0], [48.15, 48.33, "dah", 0], [48.33, 48.59, "dalam", 0], [48.77, 49.19, "cycle", 0], [49.19, 49.75, "ni", 0], [49.75, 50.09, "for", 0],
  [50.09, 50.21, "more", 0], [50.21, 50.45, "than", 0], [50.45, 50.63, "10", 1], [50.63, 50.93, "years", 1], [50.93, 51.11, "dah.", 0], [51.36, 52.08, "Fat", 0],
  [52.08, 52.3, "loss", 0], [52.3, 52.74, "mula", 0], [52.74, 53.16, "berubah", 0], [53.16, 53.4, "bila", 0], [53.4, 53.66, "I", 0], [53.66, 53.92, "stop", 0],
  [53.92, 54.56, "every", 0], [54.56, 55.16, "weekend,", 0], [55.72, 55.92, "every", 0], [55.92, 56.22, "family", 0], [56.22, 56.48, "dinner,", 0], [56.56, 56.94, "every", 0],
  [56.94, 57.18, "event", 0], [57.18, 57.74, "essentially.", 0], [58.04, 58.72, "The", 0], [58.72, 59.02, "only", 0], [59.02, 59.7, "change", 0], [60.08, 60.28, "is", 0],
  [60.28, 60.38, "the", 0], [60.38, 60.52, "one", 0], [60.52, 60.68, "that", 0], [60.68, 60.88, "you", 0], [60.88, 60.980000000000004, "can", 0], [60.9, 61.4, "repeat", 1],
  [61.4, 61.74, "when", 0], [61.74, 62.0, "life", 0], [62.0, 62.28, "gets", 0], [62.28, 62.58, "busy.", 1], [62.88, 63.58, "So", 0], [63.58, 64.18, "alhamdulillah,", 0],
  [64.38, 64.48, "now", 0], [64.48, 64.74, "I'm", 0], [64.74, 65.48, "20kg", 1], [65.48, 65.82, "down", 0], [65.82, 66.08, "from", 0], [66.08, 66.24, "my", 0],
  [66.24, 66.54, "baseline", 0], [66.54, 67.64, "and", 0], [67.64, 67.9, "I", 0], [67.9, 68.26, "maintain", 0], [68.26, 68.58, "for", 0], [68.58, 68.88, "4", 1],
  [68.88, 69.16, "years", 1], [69.16, 69.5, "and", 0], [69.5, 69.68, "still", 0], [69.68, 69.96, "can", 0], [69.96, 70.16, "enjoy", 0], [70.16, 70.52, "makan", 0],
  [70.52, 70.9, "with", 0], [70.9, 71.22, "my", 0], [71.22, 71.5, "family.", 1], [71.78, 72.7, "If", 0], [72.7, 72.86, "you", 0], [72.86, 73.02, "are", 0],
  [73.02, 73.22, "a", 0], [73.22, 73.46, "busy", 0], [73.46, 73.8, "parent,", 0], [76.14, 76.32, "follow", 0], [76.32, 76.6, "me", 0], [76.6, 76.9, "for", 0],
  [76.9, 77.08, "a", 0], [77.08, 77.3, "realistic", 0], [77.3, 77.72, "fat", 0], [77.72, 78.18, "loss", 0], [78.72, 79.2, "that", 0], [79.2, 79.44, "fits", 0],
  [79.44, 79.88, "Malaysian", 0], [79.88, 80.28, "family", 0], [80.28, 80.6, "life.", 0],
];

// [start, end, image, side] in reel seconds — a photo card floats over the playing video (the video never cuts away).
// Only the photos that match a line are used. family-day-makan.jpg: 10/10 family day (the banner photo with the hospital
// name is deliberately not used).
const PHOTOS: [number, number, string, "left" | "right" | "center"][] = [
  [4.0, 7.0, "st-before.jpg", "right"], // "Setiap tahun target sama…"
  [11.0, 14.2, "st-laptop.jpg", "left"], // "Ada classes, deadlines…"
  [19.3, 22.4, "st-soup.jpg", "right"], // "Malam-malam saya stress eating"
  [30.2, 33.9, "st-side-before.jpg", "left"], // "eat less, go extreme, avoid makanan spesifik"
  [44.6, 48.4, "st-family.jpg", "right"], // "posting jauh daripada family"
  [64.4, 68.4, "st-ba.jpg", "center"], // "20kg down from my baseline" (his card, with its disclaimer)
  [68.8, 71.9, "family-day-makan.jpg", "left"], // "still can enjoy makan with my family"
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
  const box = side === "center" ? { left: 210, width: 660, maxH: 760 } : side === "left" ? { left: 50, width: 470, maxH: 640 } : { left: 560, width: 470, maxH: 640 };
  return (
    <div style={{ position: "absolute", top: 190, left: box.left, width: box.width, display: "flex", justifyContent: "center", opacity: Math.min(p * 1.5, 1) * out, transform: `translateY(${(1 - p) * 40}px)` }}>
      <Img src={staticFile(`img/kisah/${src}`)} style={{ maxWidth: "100%", maxHeight: box.maxH, objectFit: "contain", border: "8px solid #fff", borderRadius: 10, boxShadow: "0 14px 34px rgba(0,0,0,0.4)" }} />
    </div>
  );
};

const HookCard: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (f > 3.7 * fps) return null;
  const p = spring({ frame: f - 3, fps, config: { damping: 13, stiffness: 170 } });
  return (
    <div style={{ position: "absolute", top: 230, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Card style={{ transform: `scale(${0.7 + 0.3 * p})`, opacity: Math.min(1, p * 2), padding: "26px 40px", fontSize: 60, fontWeight: 800, textAlign: "center", lineHeight: 1.15, color: C.ink }}>
        10 TAHUN <span style={{ color: C.marker }}>DIET TAK JADI</span>
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
    <HookCard />
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

export const R1710C_KISAH_SCENES: SceneDef[] = [
  { id: "talk", dur: CLIP_LEN, el: <Talk /> },
  { id: "end", dur: END, el: <End /> },
];
