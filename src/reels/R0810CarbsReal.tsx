// Reel 1 (08/10) "Carbs Malam" — full talk (R1): Coach Nas's own recording, hook + auto-captions.
// Media (local only, gitignored):
//   public/clips/R0810-carbs-full.mp4   three Teleprompter takes (07/10 17:45–17:46) trimmed and joined:
//     0.00–4.80   "Makan carbs waktu malam… sebab jam dah malam."               (take 17:45:55, src 2.15–6.95; 2s of silence cut)
//     4.80–18.50  "Untuk tengok keseluruhan changes berat badan… pilihan makanan." (take 17:46:08, src 1.25–14.95)
//    18.50–27.60  "Jadi jangan tukar satu rule internet… confuse dengan diet rules." (take 17:46:27, src 0.55–9.65)
// Captions follow what was actually said (spelling fixed); word times are Whisper medium on the joined file.
import React from "react";
import { C, FPS } from "../theme";
import { SceneDef } from "../Reel";
import { CtaPill } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener } from "./formats/FaceCamOpener";

const CLIP = "clips/R0810-carbs-full.mp4";
const CLIP_LEN = 828;

const WORDS: Word[] = [
  [0.0, 0.54, "Makan"], [0.54, 0.82, "carbs"], [0.82, 1.1, "waktu"], [1.1, 1.46, "malam,"], [1.52, 1.66, "tak"], [1.66, 2.18, "automatik"],
  [2.18, 2.36, "terus"], [2.36, 2.64, "jadi"], [2.64, 3.08, "lemak"], [3.08, 3.72, "sebab"], [3.72, 3.96, "jam"], [3.96, 4.16, "dah"], [4.16, 4.7, "malam."],
  [4.93, 5.36, "Untuk"], [5.36, 5.68, "tengok"], [5.68, 6.34, "keseluruhan"], [6.34, 6.72, "changes"], [6.72, 6.96, "berat"], [6.96, 7.26, "badan,"],
  [7.4, 7.88, "keseluruhan"], [7.88, 8.22, "energy"], [8.22, 8.6, "intake"], [8.6, 8.8, "dan"], [8.8, 9.1, "pattern"], [9.1, 9.36, "dalam"],
  [9.36, 9.7, "tempoh"], [9.7, 10.04, "masa"], [10.04, 10.34, "lebih"], [10.34, 10.74, "penting"], [10.74, 11.0, "daripada"], [11.0, 11.4, "satu"],
  [11.4, 11.56, "jam"], [11.56, 12.02, "makan"], [12.02, 12.6, "sahaja."],
  [12.9, 13.2, "Tapi"], [13.2, 13.46, "timing"], [13.46, 13.74, "masih"], [13.74, 14.0, "boleh"], [14.0, 14.36, "matter"], [14.36, 14.7, "untuk"],
  [14.7, 15.12, "sesetengah"], [15.12, 15.36, "orang,"], [15.36, 15.6, "dari"], [15.6, 15.82, "segi"], [15.82, 16.54, "routine,"],
  [16.78, 17.08, "hunger"], [17.08, 17.56, "ataupun"], [17.56, 17.92, "pilihan"], [17.92, 18.4, "makanan."],
  [18.61, 18.94, "Jadi"], [18.94, 19.18, "jangan"], [19.18, 19.5, "tukar"], [19.5, 19.78, "satu"], [19.78, 19.92, "rule"], [19.92, 20.32, "internet"],
  [20.32, 20.56, "jadi"], [20.56, 20.94, "hukum"], [20.94, 21.52, "universal."], [21.52, 21.86, "Tengok"], [21.86, 22.3, "keseluruhan"], [22.3, 22.78, "pattern"],
  [22.9, 23.36, "dan"], [23.36, 23.68, "apa"], [23.68, 23.82, "yang"], [23.82, 23.94, "awak"], [23.94, 24.2, "boleh"], [24.2, 24.8, "sustain."],
  [25.35, 25.66, "Save"], [25.66, 25.94, "kalau"], [25.94, 26.24, "selalu"], [26.24, 26.62, "confuse"], [26.62, 26.92, "dengan"], [26.92, 27.2, "diet"], [27.2, 27.52, "rules."],
];

const CTA_AT = Math.round(25.35 * FPS) - 3;

const Talk: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={<>CARBS MALAM <span style={{ color: C.marker }}>AUTOMATIK GEMUK?</span></>} hookSize={60} lowerTop={1520}>
    <CtaPill icon="save" delay={CTA_AT}>
      Save
    </CtaPill>
  </FaceCamOpener>
);

export const R0810_CARBS_REAL_SCENES: SceneDef[] = [
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
