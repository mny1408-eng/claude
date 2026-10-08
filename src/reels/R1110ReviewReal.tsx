// Reel 1 (11/10) "Review 3 Soalan" — full talk (R1): Coach Nas's own recording, hook + question tags + auto-captions.
// Media (local only, gitignored):
//   public/clips/R1110-review-full.mp4   four Teleprompter takes (08/10 08:31) trimmed and joined:
//     0.00–6.05   "Sebelum tukar diet lagi minggu depan… sebenarnya jadi minggu ni?"   (take 08:31:03, src 0.50–6.55)
//     6.05–13.73  "Yang kedua, dekat mana plan paling kerap pecah?… expectation kita?" (take 08:31:22, src 0.62–8.30)
//    13.73–22.23  "Dan yang ketiga… Jangan nak buat tujuh benda serentak tau."          (take 08:31:33, src 0.45–8.95)
//    22.23–29.06  "Review macam ni bagi kita feedback… Save untuk review malam ni."      (take 08:31:45, src 1.45–8.28)
// Recorded from the original (pre-rewrite) script. Word times are Whisper medium on the joined file.
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Pop } from "../kit";
import { SceneDef } from "../Reel";
import { CtaPill } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener } from "./formats/FaceCamOpener";

const CLIP = "clips/R1110-review-full.mp4";
const CLIP_LEN = 872;

const WORDS: Word[] = [
  [0.0, 0.5, "Sebelum"], [0.5, 0.88, "tukar"], [0.88, 1.1, "diet"], [1.1, 1.44, "lagi"], [1.44, 1.6, "minggu"], [1.6, 2.04, "depan,"], [2.26, 2.46, "tanya"], [2.46, 2.84, "tiga"], [2.84, 3.36, "soalan."],
  [3.56, 3.72, "Yang"], [3.72, 4.08, "pertama,"], [4.26, 4.62, "apa"], [4.62, 4.88, "yang"], [4.88, 5.24, "sebenarnya"], [5.24, 5.48, "jadi"], [5.48, 5.84, "minggu"], [5.84, 6.0, "ni?"],
  [6.26, 6.44, "Yang"], [6.44, 6.84, "kedua,"], [6.98, 7.16, "dekat"], [7.16, 7.54, "mana"], [7.54, 7.98, "plan"], [7.98, 8.42, "paling"], [8.42, 8.88, "kerap"], [8.88, 9.7, "pecah?"],
  [9.94, 10.22, "Adakah"], [10.22, 10.84, "timing,"], [10.94, 11.36, "hunger,"], [11.6, 12.04, "environment"], [12.04, 12.6, "ataupun"], [12.6, 13.32, "expectation"], [13.32, 13.65, "kita?"],
  [13.9, 14.14, "Dan"], [14.14, 14.36, "yang"], [14.36, 14.98, "ketiga,"], [15.32, 15.48, "apa"], [15.48, 16.0, "satu"], [16.0, 16.4, "adjustment"], [16.4, 16.76, "paling"], [16.76, 17.12, "kecil"],
  [17.12, 17.46, "yang"], [17.46, 17.88, "boleh"], [17.88, 18.3, "kita"], [18.3, 18.6, "test"], [18.6, 18.86, "untuk"], [18.86, 19.14, "minggu"], [19.14, 19.9, "depan?"],
  [20.3, 20.54, "Jangan"], [20.54, 20.72, "nak"], [20.72, 20.88, "buat"], [20.88, 21.12, "tujuh"], [21.12, 21.38, "benda"], [21.38, 21.92, "serentak"], [21.92, 22.2, "tau."],
  [22.54, 22.68, "Review"], [22.68, 22.96, "macam"], [22.96, 23.12, "ni"], [23.12, 23.44, "bagi"], [23.44, 23.68, "kita"], [23.68, 24.08, "feedback,"],
  [24.2, 24.4, "bukan"], [24.4, 24.82, "untuk"], [24.82, 25.06, "judge"], [25.06, 25.56, "minggu"], [25.56, 26.16, "tu"], [26.16, 26.72, "berjaya"], [26.72, 27.0, "ataupun"], [27.0, 27.6, "gagal."],
  [27.86, 28.02, "Save"], [28.02, 28.26, "untuk"], [28.26, 28.54, "review"], [28.54, 28.86, "malam"], [28.86, 29.0, "ni."],
];

const fr = (sec: number) => Math.round(sec * FPS) - 3;
// Notion overlays, one per question, from "Yang pertama/kedua/ketiga" until the next.
const QUESTIONS: [label: string, from: number, to: number][] = [
  ["1 · WHAT WORKED?", fr(3.56), fr(6.26)],
  ["2 · WHERE DID IT BREAK?", fr(6.26), fr(13.9)],
  ["3 · ONE ADJUSTMENT", fr(13.9), fr(22.54)],
];
const CTA_AT = fr(27.86);

const QuestionTag: React.FC = () => {
  const f = useCurrentFrame();
  const q = QUESTIONS.find(([, a, b]) => f >= a && f < b);
  if (!q) return null;
  return (
    <div style={{ position: "absolute", top: 1130, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop key={q[0]} delay={q[1]}>
        <div style={{ background: C.ink, color: C.paper, borderRadius: 999, padding: "14px 36px", fontSize: 40, fontWeight: 800, letterSpacing: 2, boxShadow: "0 8px 22px rgba(20,30,20,0.25)" }}>{q[0]}</div>
      </Pop>
    </div>
  );
};

const Talk: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={<>SEBELUM UBAH PLAN, <span style={{ color: C.marker }}>TANYA 3 SOALAN</span></>} hookSize={58} lowerTop={1520}>
    <CtaPill icon="save" delay={CTA_AT}>
      Save untuk review malam ni
    </CtaPill>
  </FaceCamOpener>
);

export const R1110_REVIEW_REAL_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: (
      <>
        <Talk />
        <QuestionTag />
        <Captions words={WORDS} top={1260} />
      </>
    ),
    cues: [...QUESTIONS.map(([, a]): [number, "pop", number] => [a, "pop", 0.3]), [CTA_AT, "pop", 0.3]],
  },
];
