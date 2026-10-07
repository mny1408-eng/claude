// Reel 1 (09/10) "Start Isnin" — full talk (R1), spoken-voice script (ChatGPT rewrite, Notion 07/10): hook + auto-captions.
// Media (local only, gitignored):
//   public/clips/R0910-isnin-full.mp4   three Teleprompter takes (07/10 22:49–22:50) trimmed and joined:
//     0.00–5.70   "Pernah tak, hari ni makan lari sikit je… Isnin aku start balik."   (take 22:49:39, src 0.15–5.85)
//     5.70–19.05  "Lunch dah terlepas… banyak kali lah kita start diet."            (take 22:49:51 .mov, src 0.00–13.35)
//    19.05–26.00  "Yang kita nak belajar… cepat sambung balik."                      (take 22:50:18, src 1.20–8.15)
//    26.00–29.55  "Comment pernah kalau benda ni familiar dengan awak."              (same take, src 10.80–14.35; 3s pause cut)
// The 22:50:18 take was uploaded twice (identical files). Word times are Whisper medium on the joined file.
import React from "react";
import { C, FPS } from "../theme";
import { SceneDef } from "../Reel";
import { CtaPill } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener } from "./formats/FaceCamOpener";

const CLIP = "clips/R0910-isnin-full.mp4";
const CLIP_LEN = 888;

const WORDS: Word[] = [
  [0.0, 0.46, "Pernah"], [0.46, 0.62, "tak,"], [0.68, 0.92, "hari"], [0.92, 1.14, "ni"], [1.14, 1.44, "makan"], [1.44, 1.78, "lari"], [1.78, 2.16, "sikit"], [2.16, 2.4, "je."],
  [2.5, 2.66, "Terus"], [2.66, 2.86, "dalam"], [2.86, 3.56, "kepala,"], [3.76, 4.22, "“Takpelah,"], [4.4, 4.68, "Isnin"], [4.68, 4.86, "aku"], [4.86, 5.06, "start"], [5.06, 5.6, "balik.”"],
  [6.0, 6.12, "Lunch"], [6.12, 6.4, "dah"], [6.4, 7.22, "terlepas,"], [7.68, 7.76, "dinner"], [7.76, 8.12, "makan"], [8.12, 8.4, "macam"], [8.4, 8.64, "biasa"], [8.64, 9.0, "balik."],
  [9.14, 9.28, "Tak"], [9.28, 9.5, "payah"], [9.5, 9.72, "skip"], [9.72, 10.2, "makan,"], [10.34, 10.46, "tak"], [10.46, 10.72, "payah"], [10.72, 11.04, "esok"], [11.04, 11.44, "seksa"], [11.44, 12.12, "diri."],
  [12.56, 13.12, "Sebab"], [13.12, 13.48, "kalau"], [13.48, 13.76, "setiap"], [13.76, 13.96, "kali"], [13.96, 14.46, "tersasar"], [14.46, 14.66, "sikit"], [14.66, 14.9, "kena"], [14.9, 15.16, "tunggu"], [15.16, 15.52, "Isnin,"],
  [15.66, 16.08, "memang"], [16.08, 16.72, "setahun"], [16.72, 16.9, "tu"], [16.9, 17.26, "banyak"], [17.26, 17.74, "kali"], [17.74, 18.28, "kita"], [18.28, 18.62, "start"], [18.62, 19.0, "diet."],
  [19.7, 19.82, "Yang"], [19.82, 20.08, "kita"], [20.08, 20.2, "nak"], [20.2, 20.52, "belajar"], [20.52, 20.9, "sebenarnya"], [20.9, 21.22, "bukan"], [21.22, 21.44, "macam"], [21.44, 21.64, "mana"], [21.64, 21.82, "nak"], [21.82, 22.22, "perfect."],
  [22.34, 22.62, "Kita"], [22.62, 22.8, "nak"], [22.8, 23.1, "belajar"], [23.1, 23.4, "macam"], [23.4, 23.58, "mana"], [23.58, 23.84, "nak"], [23.84, 24.8, "cepat"], [24.8, 25.32, "sambung"], [25.32, 26.0, "balik."],
  [26.52, 26.72, "Comment"], [26.72, 27.24, "“pernah”"], [27.24, 28.06, "kalau"], [28.06, 28.36, "benda"], [28.36, 28.5, "ni"], [28.5, 28.92, "familiar"], [28.92, 29.14, "dengan"], [29.14, 29.42, "awak."],
];

const CTA_AT = Math.round(26.52 * FPS) - 3;

const Talk: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={<>KENAPA ASYIK <span style={{ color: C.marker }}>START ISNIN?</span></>} hookSize={62} lowerTop={1520}>
    <CtaPill icon="comment" delay={CTA_AT}>
      Comment “pernah”
    </CtaPill>
  </FaceCamOpener>
);

export const R0910_ISNIN_REAL_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: (
      <>
        <Talk />
        <Captions words={WORDS} top={1260} />
      </>
    ),
    cues: [[CTA_AT, "pop", 0.3]],
  },
];
