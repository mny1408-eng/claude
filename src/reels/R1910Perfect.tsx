// 19/10 "Tunggu hari perfect" — first reel in Layout A (19/10 design review): BUSY MODE series tag, boxless hook title
// with the gold underline, pop captions under the chin, one overlay at a time, standard ivory end card. No SFX.
// 5 Teleprompter takes (19/10 17:53–17:54) joined, each trimmed to its first/last word.
// Captions: Whisper (BM+EN), cross-checked with EN and unprompted runs. The first two words of take 1 could not be made out
// ("Bapak nampak…"?), so the captions start at "Kerja pun busy". "tenang je" is the unprompted reading of take 3.
import React from "react";
import { AbsoluteFill, OffthreadVideo, Sequence, staticFile } from "remotion";
import { C, FPS } from "../theme";
import { SceneDef } from "../Reel";
import { chunkWords, EndCardStd, HookTitle, Overlay, PopWords, SeriesTag, Wd } from "./formats/LayoutA";

const CLIP = "clips/R1910-perfect-full.mp4";
const TALK = 46.4;
const CLIP_LEN = Math.round(TALK * FPS);
const END = 90;

const WORDS: Wd[] = [
  [1.09, 1.59, "Kerja", 0], [1.59, 1.77, "pun", 0], [1.77, 2.23, "busy.", 1], [2.53, 3.09, "Kenapa", 0], [3.09, 3.43, "kita", 0], [3.43, 3.71, "masih", 0],
  [3.71, 3.93, "nak", 0], [3.93, 4.35, "tunggu", 0], [4.35, 4.75, "hari", 0], [4.75, 4.99, "yang", 0], [4.99, 5.25, "sangat", 0], [5.25, 5.65, "perfect", 1],
  [5.65, 6.19, "untuk", 0], [6.19, 6.49, "kita", 0], [6.49, 6.79, "jaga", 0], [6.79, 7.13, "diri?", 0], [7.44, 7.96, "Dulu", 0], [7.96, 8.12, "saya", 0],
  [8.12, 8.34, "ingat", 0], [8.34, 8.74, "masalah", 0], [8.74, 9.0, "saya", 0], [9.0, 9.24, "adalah", 0], [9.24, 9.54, "kurang", 0], [9.54, 10.54, "disiplin.", 1],
  [10.82, 10.92, "Jadi", 0], [10.92, 11.18, "setiap", 0], [11.18, 11.32, "kali", 0], [11.32, 11.52, "benda", 0], [11.52, 11.74, "tak", 0], [11.74, 12.08, "jadi,", 0],
  [12.42, 12.52, "saya", 0], [12.46, 12.82, "cari", 0], [12.82, 13.0, "plan", 0], [13.0, 13.26, "yang", 0], [13.26, 13.64, "lagi", 0], [13.64, 13.9, "strict.", 0],
  [14.54, 14.72, "Tapi", 0], [14.72, 15.26, "kan,", 0], [15.42, 15.64, "lagi", 0], [15.64, 15.92, "strict", 1], [15.92, 16.26, "plan", 0], [16.26, 16.62, "tu,", 0],
  [16.86, 16.96, "lagi", 0], [16.88, 17.12, "cepat", 0], [17.12, 17.3, "saya", 0], [17.3, 17.6, "penat.", 1], [17.95, 18.59, "Lama-lama", 0], [18.59, 18.89, "saya", 0],
  [18.89, 19.55, "tersedar,", 1], [19.69, 19.79, "plan", 0], [19.77, 19.97, "tu", 0], [19.97, 20.17, "cuma", 0], [20.17, 20.37, "boleh", 0], [20.37, 21.15, "jalan,", 0],
  [21.59, 21.69, "masa", 0], [21.65, 21.97, "semua", 0], [21.97, 22.23, "benda", 0], [22.23, 22.87, "tenang", 1], [22.87, 23.19, "je.", 0], [23.25, 23.65, "Padahal", 0],
  [23.65, 23.89, "ada", 0], [23.89, 24.19, "hari", 0], [24.19, 24.47, "saya", 0], [24.47, 25.17, "kerja,", 0], [25.47, 25.57, "ada", 0], [25.55, 25.97, "family,", 1],
  [26.19, 26.29, "ada", 0], [26.27, 26.51, "hari", 0], [26.51, 26.69, "yang", 0], [26.69, 26.91, "memang", 0], [26.91, 27.07, "tak", 0], [27.07, 27.27, "dapat", 0],
  [27.27, 27.43, "nak", 0], [27.43, 27.67, "ikut", 0], [27.67, 28.05, "plan.", 0], [28.35, 28.88, "So,", 0], [29.12, 29.3, "saya", 0], [29.3, 29.66, "berhenti", 0],
  [29.66, 30.3, "tunggu", 0], [30.3, 30.58, "hari", 0], [30.58, 30.82, "yang", 0], [30.82, 31.14, "perfect.", 1], [31.66, 31.82, "Saya", 0], [31.82, 32.16, "cari", 0],
  [32.16, 32.58, "version", 0], [32.58, 32.88, "yang", 0], [32.88, 33.12, "paling", 0], [33.12, 33.56, "kecil", 1], [33.56, 33.78, "yang", 0], [33.78, 34.12, "masih", 0],
  [34.12, 34.32, "boleh", 0], [34.32, 34.56, "kita", 0], [34.56, 34.74, "buat", 0], [34.74, 35.16, "walaupun", 0], [35.16, 35.44, "hari", 0], [35.44, 35.64, "tu", 0],
  [35.64, 35.92, "haru", 1], [35.92, 36.3, "biru.", 1], [36.68, 37.12, "Kalau", 0], [37.12, 37.32, "awak", 0], [37.32, 37.5, "pula", 0], [37.5, 37.66, "macam", 0],
  [37.66, 37.82, "mana?", 0], [37.96, 38.1, "Waktu", 0], [38.1, 38.32, "mana", 0], [38.32, 38.46, "yang", 0], [38.46, 38.68, "paling", 0], [38.68, 39.18, "susah", 1],
  [39.18, 39.42, "dalam", 0], [39.42, 39.7, "hari", 0], [39.7, 40.12, "awak?", 0], [40.52, 40.68, "Pagi,", 1], [40.82, 41.1, "petang", 1], [41.1, 41.42, "ataupun", 0],
  [41.42, 41.8, "lepas", 0], [41.8, 41.98, "anak", 0], [41.98, 42.7, "tidur.", 1], [42.76, 43.08, "Komen", 1], [43.08, 43.3, "kat", 0], [43.3, 43.88, "bawah", 0],
  [43.88, 44.1, "dan", 0], [44.1, 44.32, "share", 0], [44.32, 44.54, "dengan", 0], [44.54, 44.82, "kawan", 0], [44.82, 44.98, "yang", 0], [44.98, 45.28, "tengah", 0],
  [45.28, 45.56, "tunggu", 0], [45.56, 45.78, "hari", 0], [45.78, 46.14, "perfect.", 1],
];
const CHUNKS = chunkWords(WORDS);

const card: React.CSSProperties = { background: "#fff", color: C.ink, borderRadius: 18, padding: "16px 30px", fontSize: 44, fontWeight: 800, boxShadow: "0 10px 26px rgba(0,0,0,0.25)", textAlign: "center" };

// [start, end, content] in reel seconds; never overlapping.
const OVERLAYS: [number, number, React.ReactNode][] = [
  [14.5, 17.9, <div style={card}>Lagi <span style={{ background: C.gold, padding: "0 10px", borderRadius: 8 }}>strict</span> = lagi cepat penat</div>],
  [31.6, 36.5, <div style={card}>✓ Versi paling <span style={{ background: C.gold, padding: "0 10px", borderRadius: 8 }}>kecil</span>, hari-hari</div>],
  [42.7, 46.4, (
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
      {["Pagi", "Petang", "Lepas anak tidur"].map((t) => (
        <div key={t} style={{ ...card, background: C.ink, color: C.paper, fontSize: 40, padding: "12px 26px" }}>{t}</div>
      ))}
    </div>
  )],
];

const Talk: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(CLIP)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <SeriesTag series="BUSY MODE" />
    <HookTitle lines={[["TUNGGU HARI", false], ["PERFECT?", true]]} tone="dark" />
    {OVERLAYS.map(([a, b, el], i) => (
      <Sequence key={i} from={Math.round(a * FPS)} durationInFrames={Math.round((b - a) * FPS)} layout="none">
        <Overlay dur={Math.round((b - a) * FPS)} top={1390}>{el}</Overlay>
      </Sequence>
    ))}
    <PopWords chunks={CHUNKS} top={1230} />
  </AbsoluteFill>
);

export const R1910_PERFECT_SCENES: SceneDef[] = [
  { id: "talk", dur: CLIP_LEN, el: <Talk /> },
  { id: "end", dur: END, el: <EndCardStd cta="Komen waktu paling susah" icon="comment" /> },
];
