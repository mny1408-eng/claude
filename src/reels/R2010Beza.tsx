// 20/10 "Tak ada beza pun?" — MINDSET series, Layout A plus a checklist overlay ("Orang tak nampak semua") that ticks in
// time with each "Dia tak nampak…" line, and a second one for the "progress kadang mula bila…" signs. 10 Teleprompter takes
// (20/10 18:18–18:20): the cleaner take of each retake is used (c01 over c02, c09 over the end of c08, c11 over c10).
// Take c12 (18:19:28) starts at "Mula bila nafas…"; the script's lead-in ("progress bukan selalu mula dengan gambar
// before-after") is not in any take, so the checklist title carries it.
// Captions: Whisper (BM+EN) checked against Coach's script; "nak tinggalkan air manis" is a best reading (Whisper heard
// "tengahkan"), listed in the chat review. Checklist items are the script's own wording. No SFX.
import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS } from "../theme";
import { Card } from "../kit";
import { SceneDef } from "../Reel";
import { chunkWords, EndCardStd, HookTitle, Overlay, PopWords, SeriesTag, Wd } from "./formats/LayoutA";

const CLIP = "clips/R2010-beza-full.mp4";
const TALK = 76.06;
const CLIP_LEN = Math.round(TALK * FPS);
const END = 90;

const WORDS: Wd[] = [
  [0.0, 0.53, "Pernah", 0], [0.53, 0.71, "tak", 0], [0.71, 0.97, "awak", 0], [0.97, 1.11, "dah", 0], [1.11, 1.57, "usaha", 0], [1.57, 1.93, "turun", 0],
  [1.99, 2.59, "berat,", 0], [2.93, 3.09, "tapi", 0], [3.09, 3.31, "orang", 0], [3.45, 4.05, "cakap,", 0], [4.15, 4.61, "eh", 0], [4.61, 4.91, "macam", 0],
  [4.91, 5.11, "tak", 0], [5.11, 5.25, "ada", 0], [5.25, 5.75, "beza", 1], [5.75, 5.95, "pun.", 0], [6.33, 6.77, "Ayat", 0], [6.77, 6.89, "tu", 0],
  [6.89, 7.27, "nampak", 0], [7.27, 7.39, "je", 0], [7.39, 7.69, "kecil", 1], [7.69, 8.27, "kan,", 0], [8.65, 8.77, "tapi", 0], [8.77, 8.99, "kalau", 0],
  [8.99, 9.43, "tengah", 0], [9.43, 9.65, "fight", 0], [9.65, 9.87, "dengan", 0], [9.87, 10.01, "berat", 0], [10.01, 10.23, "badan", 0], [10.23, 10.71, "sendiri,", 0],
  [11.71, 11.87, "sakit", 1], [11.87, 11.97, "dia", 0], [11.95, 12.05, "tu", 0], [12.05, 12.15, "lain", 0], [12.15, 12.49, "macam.", 0], [12.79, 13.32, "Sebab", 0],
  [13.32, 13.52, "orang", 0], [13.52, 13.74, "lain,", 0], [13.9, 14.0, "dia", 0], [13.9, 14.04, "cuma", 0], [14.04, 14.32, "nampak", 0], [14.32, 14.64, "luar", 1],
  [14.64, 15.02, "je.", 0], [15.52, 15.62, "Dia", 0], [15.58, 15.68, "tak", 0], [15.68, 16.04, "nampak", 0], [16.04, 16.28, "awak", 0], [16.28, 16.54, "nak", 0],
  [16.54, 16.88, "tinggalkan", 0], [16.88, 17.0, "air", 0], [17.0, 17.2, "manis.", 1], [18.4, 18.5, "Dia", 0], [18.46, 18.56, "tak", 0], [18.56, 18.86, "nampak", 0],
  [18.86, 19.06, "awak", 0], [19.06, 19.3, "tengah", 0], [19.3, 19.62, "cuba", 0], [19.62, 19.76, "nak", 0], [19.76, 20.26, "kurangkan", 0], [20.26, 20.78, "portion.", 1],
  [21.46, 21.56, "Dia", 0], [21.5, 21.64, "tak", 0], [21.68, 22.28, "nampak", 0], [22.28, 22.56, "awak", 0], [22.56, 22.86, "jalan", 0], [22.92, 23.52, "sikit,", 0],
  [23.78, 24.08, "walaupun", 0], [24.08, 24.58, "badan", 0], [24.58, 24.86, "rasa", 0], [24.86, 25.34, "malas", 1], [25.34, 25.54, "sangat.", 0], [25.71, 26.24, "Dia", 0],
  [26.24, 26.4, "tak", 0], [26.4, 26.82, "nampak", 0], [26.82, 27.0, "pun", 0], [27.0, 27.42, "awak,", 0], [27.84, 28.16, "cuba", 0], [28.16, 28.32, "nak", 0],
  [28.32, 28.7, "lawan", 0], [28.7, 29.1, "craving", 1], [29.1, 29.52, "malam-malam", 0], [29.52, 29.88, "buta", 0], [29.88, 30.3, "seorang-seorang.", 0], [30.6, 31.13, "Apa", 0],
  [31.13, 31.23, "yang", 0], [31.23, 31.37, "dia", 0], [31.37, 31.61, "tengok", 0], [31.61, 32.15, "cuma", 0], [32.15, 32.39, "berat", 0], [32.39, 32.75, "badan", 0],
  [32.75, 32.99, "awak,", 0], [33.23, 33.45, "size", 0], [33.45, 33.95, "awak.", 0], [34.31, 34.43, "Lepas", 0], [34.43, 34.55, "tu", 0], [34.55, 34.67, "dia", 0],
  [34.67, 34.87, "dah", 0], [34.87, 35.41, "judge", 1], [35.41, 35.75, "kan,", 0], [35.97, 36.07, "macam", 0], [35.97, 36.57, "sama", 0], [36.57, 36.81, "je.", 0],
  [37.11, 37.39, "Mula", 0], [37.39, 37.81, "bila", 0], [37.81, 38.41, "nafas", 0], [38.41, 38.69, "rasa", 0], [38.69, 39.03, "ringan", 1], [39.43, 40.03, "sikit,", 0],
  [40.33, 40.53, "baju", 0], [40.53, 40.89, "rasa", 0], [40.89, 41.21, "kurang", 0], [41.21, 41.51, "ketat", 1], [41.81, 42.41, "sikit,", 0], [42.69, 42.91, "perut", 0],
  [42.91, 43.19, "rasa", 0], [43.19, 43.49, "lega", 1], [43.51, 44.11, "sikit,", 0], [44.41, 44.57, "tidur", 0], [44.57, 44.91, "makin", 0], [45.23, 45.83, "okey,", 1],
  [46.11, 46.31, "badan", 0], [46.31, 46.61, "rasa", 0], [46.61, 46.93, "kurang", 0], [46.93, 47.19, "berat", 0], [47.19, 47.37, "nak", 0], [47.37, 47.97, "bergerak.", 1],
  [48.25, 48.78, "And", 0], [48.78, 49.0, "yang", 0], [49.0, 49.24, "paling", 0], [49.66, 50.26, "penting,", 0], [50.54, 50.66, "awak", 0], [50.66, 51.12, "mula", 0],
  [51.38, 51.98, "percaya", 1], [51.98, 52.58, "yang", 0], [52.58, 52.76, "awak", 0], [52.76, 53.04, "masih", 0], [53.04, 53.22, "boleh", 0], [53.22, 53.66, "berubah.", 1],
  [53.96, 54.49, "Progress", 1], [54.49, 54.77, "is", 0], [54.77, 54.97, "still", 0], [54.97, 55.19, "a", 0], [55.19, 55.51, "progress", 0], [55.51, 55.99, "sebelum", 0],
  [55.99, 56.23, "orang", 0], [56.23, 56.47, "nak", 0], [56.47, 56.71, "tepuk", 0], [56.79, 57.39, "tangan.", 0], [57.51, 57.63, "Jadi", 0], [57.63, 57.79, "kalau", 0],
  [57.79, 57.95, "hari", 0], [57.95, 58.11, "ni", 0], [58.11, 58.25, "orang", 0], [58.25, 58.47, "belum", 0], [58.47, 58.99, "nampak", 0], [58.99, 59.09, "awak", 0],
  [59.09, 59.27, "punya", 0], [59.27, 59.87, "perbezaan,", 0], [60.17, 60.27, "jangan", 1], [60.27, 60.83, "stop.", 1], [61.13, 61.66, "Awak", 0], [61.66, 61.94, "bukan", 0],
  [61.94, 62.14, "buat", 0], [62.14, 62.38, "ni", 0], [62.38, 62.68, "untuk", 0], [62.68, 63.0, "orang", 0], [63.0, 63.38, "cakap", 0], [63.38, 63.78, "wow", 1],
  [63.78, 64.12, "ataupun", 0], [64.12, 64.39, "orang", 0], [64.39, 64.84, "impressed.", 0], [65.48, 65.59, "Awak", 0], [65.59, 65.76, "buat", 0], [65.76, 65.89, "ni", 0],
  [65.89, 66.08, "untuk", 0], [66.08, 66.34, "dapat", 0], [66.34, 66.66, "balik", 0], [66.66, 67.09, "energy", 1], [67.16, 67.76, "level,", 0], [68.2, 68.8, "kesihatan", 0],
  [68.8, 69.2, "dan", 0], [69.2, 69.59, "juga", 0], [69.59, 70.14, "yourself.", 1], [70.45, 70.97, "Send", 0], [70.97, 71.29, "this", 0], [71.29, 71.53, "to", 0],
  [71.53, 71.83, "someone", 0], [71.83, 72.01, "yang", 0], [72.01, 72.27, "tengah", 0], [72.27, 72.62, "usaha", 0], [72.62, 72.81, "nak", 0], [72.81, 73.23, "turunkan", 0],
  [73.23, 73.79, "berat,", 0], [74.09, 74.19, "tapi", 0], [74.17, 74.41, "rasa", 0], [74.41, 74.62, "macam", 0], [74.62, 74.73, "tak", 0], [74.73, 74.85, "ada", 0],
  [74.85, 75.12, "siapa", 0], [75.12, 75.25, "pun", 0], [75.25, 75.41, "yang", 0], [75.41, 75.77, "nampak.", 0],
];
const CHUNKS = chunkWords(WORDS);

// [reel second, text] — each item ticks as he starts the matching "Dia tak nampak…" line.
const UNSEEN: [number, string][] = [
  [15.5, "Tahan air manis"],
  [18.4, "Kurangkan portion"],
  [21.45, "Jalan walaupun malas"],
  [25.7, "Lawan craving malam-malam"],
];
// The script's "progress kadang mula bila…" signs, ticking as he says each one (take c12).
const SIGNS: [number, string][] = [
  [37.8, "Nafas rasa ringan"],
  [40.3, "Baju kurang ketat"],
  [42.7, "Perut rasa lega"],
  [44.4, "Tidur makin okey"],
  [46.1, "Badan ringan nak bergerak"],
];

const Checklist: React.FC<{ dur: number; from: number; title: React.ReactNode; items: [number, string][] }> = ({ dur, from, title, items }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = from + f / fps;
  const p = spring({ frame: f, fps, config: { damping: 15, stiffness: 160 } });
  const out = interpolate(f, [dur - 6, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: Math.min(1, p * 2) * out }}>
      <Card style={{ padding: "18px 34px", minWidth: 640 }}>
        <div style={{ fontSize: 40, fontWeight: 800, color: C.ink, marginBottom: 6 }}>
          {title}
        </div>
        {items.map(([s, text]) => {
          const q = spring({ frame: Math.round((t - s) * fps), fps, config: { damping: 12, stiffness: 200 } });
          return (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 36, fontWeight: 700, color: C.inkSoft, lineHeight: 1.4, opacity: t >= s ? 1 : 0.25 }}>
              <span style={{ display: "inline-block", width: 36, height: 36, borderRadius: 8, background: t >= s ? C.ink : "transparent", border: `3px solid ${C.ink}`, color: C.gold, fontSize: 26, lineHeight: "30px", textAlign: "center", transform: `scale(${t >= s ? 0.6 + 0.4 * q : 1})` }}>
                {t >= s ? "✓" : ""}
              </span>
              {text}
            </div>
          );
        })}
      </Card>
    </div>
  );
};

const hl: React.CSSProperties = { background: C.gold, padding: "0 10px", borderRadius: 8 };
const label: React.CSSProperties = { background: "#fff", color: C.ink, borderRadius: 18, padding: "16px 32px", fontSize: 50, fontWeight: 800, boxShadow: "0 10px 26px rgba(0,0,0,0.25)", textAlign: "center" };
const seq = (a: number, b: number) => ({ from: Math.round(a * FPS), durationInFrames: Math.round((b - a) * FPS) });

const Talk: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(CLIP)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <Sequence {...seq(0, 12.7)} layout="none">
      <SeriesTag series="MINDSET" />
      <HookTitle lines={[["TAK ADA", false], ["BEZA PUN?", true]]} tone="dark" hookSec={3.4} />
    </Sequence>
    <Sequence {...seq(15.3, 30.5)} layout="none">
      <Checklist dur={Math.round(15.2 * FPS)} from={15.3} items={UNSEEN} title={<>Orang tak nampak <span style={hl}>semua</span></>} />
    </Sequence>
    <Sequence {...seq(37.2, 48.2)} layout="none">
      <Checklist dur={Math.round(11 * FPS)} from={37.2} items={SIGNS} title={<>Progress kadang <span style={hl}>mula</span> bila…</>} />
    </Sequence>
    <Sequence {...seq(51.04, 53.94)} layout="none">
      <Overlay dur={Math.round(2.9 * FPS)} top={235}><div style={label}>Awak masih boleh <span style={{ background: C.gold, padding: "0 10px", borderRadius: 8 }}>berubah</span></div></Overlay>
    </Sequence>
    <Sequence {...seq(54.04, 57.84)} layout="none">
      <Overlay dur={Math.round(3.8 * FPS)} top={235}><div style={label}>Progress tetap progress</div></Overlay>
    </Sequence>
    <Sequence {...seq(70.54, TALK)} layout="none">
      <Overlay dur={Math.round((TALK - 70.54) * FPS)} top={235}><div style={{ ...label, background: C.ink, color: C.paper, fontSize: 40, whiteSpace: "nowrap" }}>Send kat kawan yang tengah usaha</div></Overlay>
    </Sequence>
    <PopWords chunks={CHUNKS} top={1290} />
  </AbsoluteFill>
);

export const R2010_BEZA_SCENES: SceneDef[] = [
  { id: "talk", dur: CLIP_LEN, el: <Talk /> },
  { id: "end", dur: END, el: <EndCardStd cta="Send kat kawan" icon="share" /> },
];
