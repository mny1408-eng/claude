// Reel 1 (07/10) "Makan Mamak" — full talk (R1): Coach Nas's own recording, hook + auto-captions.
// Media (local only, gitignored):
//   public/clips/R0710-mamak-full.mp4   four Teleprompter takes (07/10 08:47–08:52) trimmed and joined:
//     0.00–6.85   "Makan mamak masa nak turun berat… semata-mata."           (take 08:47, src 0.80–7.65)
//     6.85–17.40  "Saya tengok decision… seluruh progress."                    (take 08:51:28, src 0.00–10.55)
//    17.40–25.20  "Tapi tak kisah langsung… sambung rutin macam biasa."        (take 08:51:44, src 1.65–9.45; two broken CTA tries cut)
//    25.20–28.25  "Save sebelum next sesi mamak awak."                         (take 08:52, src 0.00–3.05)
// Captions follow what was actually said (spelling fixed); word times are Whisper medium on the joined file.
import React from "react";
import { C, FPS } from "../theme";
import { SceneDef } from "../Reel";
import { CtaPill } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener } from "./formats/FaceCamOpener";

const CLIP = "clips/R0710-mamak-full.mp4";
const CLIP_LEN = 849;

const WORDS: Word[] = [
  [0.0, 0.78, "Makan"], [0.78, 1.34, "mamak"], [1.4, 1.76, "masa"], [1.76, 1.9, "nak"], [1.9, 2.18, "turun"], [2.18, 2.42, "berat,"],
  [2.48, 2.68, "tak"], [2.68, 2.88, "perlu"], [2.88, 3.26, "jadi"], [3.26, 3.6, "panic"], [3.6, 3.98, "mode."],
  [4.36, 4.5, "Saya"], [4.5, 4.66, "tak"], [4.66, 4.98, "cari"], [4.98, 5.42, "menu"], [5.82, 6.0, "“clean”"], [6.0, 6.76, "semata-mata."],
  [7.38, 7.56, "Saya"], [7.56, 7.86, "tengok"], [7.86, 8.32, "decision"], [8.32, 8.68, "yang"], [8.68, 8.92, "boleh"], [8.92, 9.46, "dikawal,"],
  [9.46, 9.98, "contohnya"], [9.98, 10.44, "minuman,"], [10.66, 10.96, "portion,"], [11.26, 11.38, "sumber"], [11.38, 11.8, "protein"],
  [11.95, 12.44, "dan"], [12.44, 12.82, "berapa"], [12.82, 13.04, "kerap"], [13.04, 13.24, "meal"], [13.24, 13.56, "macam"], [13.56, 13.82, "ni"], [13.82, 14.6, "berlaku."],
  [15.14, 15.3, "Satu"], [15.3, 15.42, "meal"], [15.42, 15.6, "tak"], [15.6, 16.12, "menentukan"], [16.12, 16.64, "seluruh"], [16.64, 17.2, "progress."],
  [17.55, 18.34, "Tapi"], [18.34, 18.64, "tak"], [18.64, 18.96, "kisah"], [18.96, 19.34, "langsung"], [19.34, 19.52, "pun"], [19.52, 20.08, "bukanlah"],
  [20.08, 20.3, "satu"], [20.3, 21.1, "strategy."], [21.26, 21.56, "Pilih"], [21.56, 21.88, "dengan"], [21.88, 22.46, "awareness,"],
  [22.8, 23.08, "enjoy"], [23.08, 23.3, "meal,"], [23.3, 23.7, "kemudian"], [23.7, 24.16, "sambung"], [24.16, 24.48, "rutin"], [24.48, 24.72, "macam"], [24.72, 25.1, "biasa."],
  [25.9, 26.5, "Save"], [26.5, 26.98, "sebelum"], [26.98, 27.14, "next"], [27.14, 27.42, "sesi"], [27.42, 27.86, "mamak"], [27.86, 28.06, "awak."],
];

const CTA_AT = Math.round(25.9 * FPS) - 3;

const Talk: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={<>MAMAK MASA DIET: <span style={{ color: C.marker }}>JANGAN PANIC</span></>} hookSize={60} lowerTop={1520}>
    <CtaPill icon="save" delay={CTA_AT}>
      Save sebelum next mamak
    </CtaPill>
  </FaceCamOpener>
);

export const R0710_MAMAK_REAL_SCENES: SceneDef[] = [
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
