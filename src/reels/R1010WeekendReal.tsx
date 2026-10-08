// Reel 1 (10/10) "Weekend Off-Plan" — full talk (R1), spoken-voice script: hook + auto-captions.
// Media (local only, gitignored):
//   public/clips/R1010-weekend-full.mp4   five Teleprompter takes (08/10 08:50–08:52) trimmed and joined:
//     0.00–4.75   "Kenapa bila masuk weekend je… diet off dulu."                 (take 08:50:21, src 0.35–5.10)
//     4.75–14.35  "Sebenarnya weekend ni bukan masalah pun… lepas geram je kan?"  (take 08:50:36, src 2.80–12.40)
//    14.35–22.50  "Saya lagi suka macam ni… semua benda yang kita dah buat tu."   (take 08:51:28, src 1.15–9.30)
//    22.50–33.10  "Kalau boleh ada protein, ambil… makan macam biasa balik."      (take 08:51:43, src 0.45–11.05)
//    33.10–38.60  "Diet yang boleh tahan lama… Save untuk weekend ni."           (take 08:51:58, src 1.45–5.60 + 8.45–9.80; 2.8s pause cut)
// Word times are Whisper medium on the joined file; captions follow what was said (spelling fixed).
import React from "react";
import { C, FPS } from "../theme";
import { SceneDef } from "../Reel";
import { CtaPill } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener } from "./formats/FaceCamOpener";

const CLIP = "clips/R1010-weekend-full.mp4";
const CLIP_LEN = 1158;

const WORDS: Word[] = [
  [0.0, 0.56, "Kenapa"], [0.56, 0.82, "bila"], [0.82, 1.1, "masuk"], [1.1, 1.54, "weekend"], [1.54, 1.72, "je"], [1.72, 2.0, "terus"], [2.0, 2.32, "rasa,"],
  [2.6, 2.96, "“Okaylah,"], [2.96, 3.74, "weekend."], [3.86, 4.1, "Diet"], [4.1, 4.34, "off"], [4.34, 4.68, "dulu.”"],
  [5.02, 5.36, "Sebenarnya"], [5.36, 5.74, "weekend"], [5.74, 5.9, "ni"], [5.9, 6.12, "bukan"], [6.12, 6.56, "masalah"], [6.56, 6.9, "pun."],
  [6.9, 7.4, "Cuma"], [7.4, 7.64, "kalau"], [7.64, 7.96, "sampai"], [7.96, 8.18, "Isnin"], [8.18, 8.5, "sampai"], [8.5, 8.96, "Jumaat"], [8.96, 9.32, "kita"],
  [9.32, 9.62, "control"], [9.62, 10.0, "makan"], [10.0, 10.46, "terlalu"], [10.46, 10.62, "strict"], [10.62, 11.16, "sangat,"],
  [11.78, 11.86, "memang"], [11.86, 12.24, "weekend"], [12.24, 12.38, "tu"], [12.38, 12.58, "rasa"], [12.58, 12.74, "nak"], [12.74, 13.02, "lepas"], [13.02, 13.68, "geram"], [13.68, 13.92, "je"], [13.92, 14.2, "kan?"],
  [14.5, 14.84, "Saya"], [14.84, 15.12, "lagi"], [15.12, 15.34, "suka"], [15.34, 15.56, "macam"], [15.56, 16.0, "ni."],
  [16.2, 16.4, "Keluar"], [16.4, 16.7, "makan,"], [16.82, 17.0, "makan"], [17.0, 17.22, "lah."], [17.32, 17.5, "Family"], [17.5, 17.74, "ajak"], [17.74, 18.02, "makan,"], [18.1, 18.64, "pergi."], [18.88, 19.44, "Enjoy."],
  [19.78, 20.16, "Cuma"], [20.16, 20.56, "jangan"], [20.56, 20.9, "buang"], [20.9, 21.16, "semua"], [21.16, 21.4, "benda"], [21.4, 21.54, "yang"], [21.54, 21.72, "kita"], [21.72, 21.84, "dah"], [21.84, 22.02, "buat"], [22.02, 22.3, "tu."],
  [22.5, 22.9, "Kalau"], [22.9, 23.12, "boleh"], [23.12, 23.42, "ada"], [23.42, 23.74, "protein,"], [23.96, 24.42, "ambil."], [24.66, 25.3, "Minum,"],
  [25.5, 25.68, "boleh"], [25.68, 25.92, "pilih"], [25.92, 26.06, "air"], [26.06, 26.38, "kosong"], [26.38, 26.96, "sekali-sekala."],
  [26.96, 27.14, "Dah"], [27.14, 27.42, "makan"], [27.42, 27.72, "sedap"], [27.72, 28.0, "tengah"], [28.0, 28.2, "hari,"], [28.2, 28.52, "malam"],
  [28.56, 28.72, "tak"], [28.72, 28.92, "payahlah"], [28.92, 29.08, "nak"], [29.08, 29.46, "sambung"], [29.46, 29.9, "sebab"], [29.9, 30.3, "“dah"], [30.3, 30.54, "cheat"], [30.54, 30.86, "hari"], [30.86, 31.3, "ni.”"],
  [31.74, 32.08, "Makan"], [32.08, 32.34, "macam"], [32.34, 32.68, "biasa"], [32.68, 33.1, "balik."],
  [33.42, 33.6, "Diet"], [33.6, 33.86, "yang"], [33.86, 34.08, "boleh"], [34.08, 34.4, "tahan"], [34.4, 34.72, "lama"], [34.72, 35.1, "ni"],
  [35.1, 35.64, "kena"], [35.64, 36.06, "boleh"], [36.06, 36.42, "survive"], [36.42, 36.76, "weekend"], [36.76, 37.3, "jugak."],
  [37.44, 37.72, "Save"], [37.72, 37.96, "untuk"], [37.96, 38.32, "weekend"], [38.32, 38.46, "ni."],
];

const CTA_AT = Math.round(37.44 * FPS) - 3;

const Talk: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={<>WEEKEND KENA <span style={{ color: C.marker, whiteSpace: "nowrap" }}>OFF-PLAN?</span></>} hookSize={64} lowerTop={1520}>
    <CtaPill icon="save" delay={CTA_AT}>
      Save untuk weekend ni
    </CtaPill>
  </FaceCamOpener>
);

export const R1010_WEEKEND_REAL_SCENES: SceneDef[] = [
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
