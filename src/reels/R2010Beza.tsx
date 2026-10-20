// 20/10 "Tak ada beza pun?" — MINDSET series, Layout A plus a checklist overlay ("Orang tak nampak semua") that ticks in
// time with each "Dia tak nampak…" line. 9 Teleprompter takes (20/10 18:18–18:20): the cleaner take of each retake is used
// (c01 over c02, c09 over the end of c08, c11 over c10). The script's "progress bukan selalu mula dengan gambar before-after…"
// section was not in the recordings, so it is not in the reel.
// Captions: Whisper (BM+EN) checked against Coach's script; "nak tinggalkan air manis" is a best reading (Whisper heard
// "tengahkan"), listed in the chat review. Checklist items are the script's own wording. No SFX.
import React from "react";
import { AbsoluteFill, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS } from "../theme";
import { Card } from "../kit";
import { SceneDef } from "../Reel";
import { chunkWords, EndCardStd, HookTitle, Overlay, PopWords, SeriesTag, Wd } from "./formats/LayoutA";

const CLIP = "clips/R2010-beza-full.mp4";
const TALK = 64.93;
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
  [37.11, 37.64, "And", 0], [37.64, 37.86, "yang", 0], [37.86, 38.1, "paling", 0], [38.52, 39.12, "penting,", 0], [39.4, 39.52, "awak", 0], [39.52, 39.98, "mula", 0],
  [40.24, 40.84, "percaya", 1], [40.84, 41.44, "yang", 0], [41.44, 41.62, "awak", 0], [41.62, 41.9, "masih", 0], [41.9, 42.08, "boleh", 0], [42.08, 42.52, "berubah.", 1],
  [42.82, 43.35, "Progress", 1], [43.35, 43.63, "is", 0], [43.63, 43.83, "still", 0], [43.83, 44.05, "a", 0], [44.05, 44.37, "progress", 0], [44.37, 44.85, "sebelum", 0],
  [44.85, 45.09, "orang", 0], [45.09, 45.33, "nak", 0], [45.33, 45.57, "tepuk", 0], [45.65, 46.25, "tangan.", 0], [46.37, 46.49, "Jadi", 0], [46.49, 46.65, "kalau", 0],
  [46.65, 46.81, "hari", 0], [46.81, 46.97, "ni", 0], [46.97, 47.11, "orang", 0], [47.11, 47.33, "belum", 0], [47.33, 47.85, "nampak", 0], [47.85, 47.95, "awak", 0],
  [47.95, 48.13, "punya", 0], [48.13, 48.73, "perbezaan,", 0], [49.03, 49.13, "jangan", 1], [49.13, 49.69, "stop.", 1], [49.99, 50.52, "Awak", 0], [50.52, 50.8, "bukan", 0],
  [50.8, 51.0, "buat", 0], [51.0, 51.24, "ni", 0], [51.24, 51.54, "untuk", 0], [51.54, 51.86, "orang", 0], [51.86, 52.24, "cakap", 0], [52.24, 52.64, "wow", 1],
  [52.64, 52.98, "ataupun", 0], [52.98, 53.26, "orang", 0], [53.26, 53.7, "impressed.", 0], [54.34, 54.46, "Awak", 0], [54.46, 54.62, "buat", 0], [54.62, 54.76, "ni", 0],
  [54.76, 54.94, "untuk", 0], [54.94, 55.2, "dapat", 0], [55.2, 55.52, "balik", 0], [55.52, 55.96, "energy", 1], [56.02, 56.62, "level,", 0], [57.06, 57.66, "kesihatan", 0],
  [57.66, 58.06, "dan", 0], [58.06, 58.46, "juga", 0], [58.46, 59.0, "yourself.", 1], [59.31, 59.83, "Send", 0], [59.83, 60.15, "this", 0], [60.15, 60.39, "to", 0],
  [60.39, 60.69, "someone", 0], [60.69, 60.87, "yang", 0], [60.87, 61.13, "tengah", 0], [61.13, 61.49, "usaha", 0], [61.49, 61.67, "nak", 0], [61.67, 62.09, "turunkan", 0],
  [62.09, 62.65, "berat,", 0], [62.95, 63.05, "tapi", 0], [63.03, 63.27, "rasa", 0], [63.27, 63.49, "macam", 0], [63.49, 63.59, "tak", 0], [63.59, 63.71, "ada", 0],
  [63.71, 63.99, "siapa", 0], [63.99, 64.11, "pun", 0], [64.11, 64.27, "yang", 0], [64.27, 64.63, "nampak.", 0],
];
const CHUNKS = chunkWords(WORDS);

// [reel second, text] — each item ticks as he starts the matching "Dia tak nampak…" line.
const UNSEEN: [number, string][] = [
  [15.5, "Tahan air manis"],
  [18.4, "Kurangkan portion"],
  [21.45, "Jalan walaupun malas"],
  [25.7, "Lawan craving malam-malam"],
];
const LIST_FROM = 15.3;
const LIST_TO = 30.5;

const Unseen: React.FC<{ dur: number }> = ({ dur }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = LIST_FROM + f / fps;
  const p = spring({ frame: f, fps, config: { damping: 15, stiffness: 160 } });
  const out = interpolate(f, [dur - 6, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 240, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: Math.min(1, p * 2) * out }}>
      <Card style={{ padding: "18px 34px", minWidth: 640 }}>
        <div style={{ fontSize: 40, fontWeight: 800, color: C.ink, marginBottom: 6 }}>
          Orang tak nampak <span style={{ background: C.gold, padding: "0 10px", borderRadius: 8 }}>semua</span>
        </div>
        {UNSEEN.map(([s, text]) => {
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

const label: React.CSSProperties = { background: "#fff", color: C.ink, borderRadius: 18, padding: "16px 32px", fontSize: 50, fontWeight: 800, boxShadow: "0 10px 26px rgba(0,0,0,0.25)", textAlign: "center" };
const seq = (a: number, b: number) => ({ from: Math.round(a * FPS), durationInFrames: Math.round((b - a) * FPS) });

const Talk: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(CLIP)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <Sequence {...seq(0, 12.7)} layout="none">
      <SeriesTag series="MINDSET" />
      <HookTitle lines={[["TAK ADA", false], ["BEZA PUN?", true]]} tone="dark" hookSec={3.4} />
    </Sequence>
    <Sequence {...seq(LIST_FROM, LIST_TO)} layout="none">
      <Unseen dur={Math.round((LIST_TO - LIST_FROM) * FPS)} />
    </Sequence>
    <Sequence {...seq(39.9, 42.8)} layout="none">
      <Overlay dur={Math.round(2.9 * FPS)} top={235}><div style={label}>Awak masih boleh <span style={{ background: C.gold, padding: "0 10px", borderRadius: 8 }}>berubah</span></div></Overlay>
    </Sequence>
    <Sequence {...seq(42.9, 46.7)} layout="none">
      <Overlay dur={Math.round(3.8 * FPS)} top={235}><div style={label}>Progress tetap progress</div></Overlay>
    </Sequence>
    <Sequence {...seq(59.4, TALK)} layout="none">
      <Overlay dur={Math.round((TALK - 59.4) * FPS)} top={235}><div style={{ ...label, background: C.ink, color: C.paper, fontSize: 40, whiteSpace: "nowrap" }}>Send kat kawan yang tengah usaha</div></Overlay>
    </Sequence>
    <PopWords chunks={CHUNKS} top={1290} />
  </AbsoluteFill>
);

export const R2010_BEZA_SCENES: SceneDef[] = [
  { id: "talk", dur: CLIP_LEN, el: <Talk /> },
  { id: "end", dur: END, el: <EndCardStd cta="Send kat kawan" icon="share" /> },
];
