// Reel 1 (12/10) "Sarapan Stesen Minyak" — full talk (R1), Notion 📅 12/10/2026 — Sarapan Rushing, IG REEL 1.
// Hook card = Notion cover; overlays = Notion overlay list; end pill = Notion CTA (not spoken in the takes).
// Media (local only, gitignored):
//   public/clips/R1210-full.mp4   four Teleprompter takes (12/10 17:49–17:50) trimmed and joined, 40.95s.
// The script's "Satu lagi, tengok poket awak sekali" line was not recorded; "MAMPU ULANG" still matches what is said.
// Word times are Whisper medium (prompted with the teleprompter text) on the joined file.
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { SceneDef } from "../Reel";
import { Chip, CtaPill, NumCard } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener } from "./formats/FaceCamOpener";

const CLIP = "clips/R1210-full.mp4";
const CLIP_LEN = 1229;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const WORDS: Word[] = [
  [0.0, 0.82, "Pagi"],
  [0.82, 1.22, "rushing,"],
  [1.26, 1.62, "singgah"],
  [1.62, 2.0, "stesen"],
  [2.0, 2.4, "minyak,"],
  [2.44, 2.62, "saya"],
  [2.62, 2.9, "cari"],
  [2.9, 3.3, "3"],
  [3.3, 3.62, "benda"],
  [3.62, 3.82, "ni"],
  [3.82, 4.24, "sebelum"],
  [4.24, 4.46, "beli"],
  [4.46, 5.04, "breakfast."],
  [5.72, 5.94, "Awak"],
  [5.94, 6.12, "pun"],
  [6.12, 6.3, "pernah"],
  [6.3, 6.58, "kan?"],
  [6.68, 6.72, "Dah"],
  [6.72, 7.14, "lambat,"],
  [7.24, 7.34, "perut"],
  [7.34, 7.88, "berbunyi,"],
  [7.98, 8.2, "tengok"],
  [8.2, 8.42, "rak"],
  [8.42, 8.62, "tu"],
  [8.62, 8.96, "otak"],
  [8.96, 9.16, "terus"],
  [9.16, 9.5, "jadi"],
  [9.5, 9.86, "blank."],
  [10.34, 10.46, "Jadi"],
  [10.46, 10.68, "saya"],
  [10.68, 11.32, "ringkaskan"],
  [11.32, 11.52, "je."],
  [12.0, 12.16, "First"],
  [12.16, 12.32, "kali"],
  [12.32, 12.48, "ada"],
  [12.48, 12.86, "protein"],
  [12.86, 13.02, "tak?"],
  [13.58, 14.02, "Telur"],
  [14.02, 14.38, "rebus"],
  [14.38, 14.54, "ke,"],
  [14.64, 15.1, "susu"],
  [15.1, 15.26, "ke,"],
  [15.38, 15.74, "yogurt"],
  [15.74, 16.0, "ke"],
  [16.0, 16.56, "apa-apalah."],
  [16.8, 16.94, "Yang"],
  [16.94, 17.34, "kedua,"],
  [17.46, 17.6, "ada"],
  [17.6, 17.88, "buah"],
  [17.88, 18.24, "ataupun"],
  [18.24, 18.72, "sesuatu"],
  [18.72, 19.22, "yang"],
  [19.22, 19.84, "berserat"],
  [19.84, 20.04, "tak?"],
  [20.58, 20.84, "Yang"],
  [20.84, 21.34, "ketiga,"],
  [21.46, 21.72, "cukup"],
  [21.72, 21.96, "kenyang"],
  [21.96, 22.12, "tak?"],
  [22.5, 22.76, "Sebab"],
  [22.76, 23.0, "kalau"],
  [23.0, 23.2, "ambil"],
  [23.2, 23.44, "sikit"],
  [23.44, 23.82, "sangat,"],
  [23.98, 24.12, "belum"],
  [24.12, 24.28, "pukul"],
  [24.28, 24.58, "sepuluh"],
  [24.58, 24.74, "dah"],
  [24.74, 25.06, "lapar"],
  [25.06, 25.64, "balik."],
  [25.64, 25.98, "Lepas"],
  [25.98, 26.1, "tu"],
  [26.1, 26.42, "mulalah"],
  [26.42, 26.76, "cari"],
  [26.76, 27.08, "snek."],
  [27.4, 27.62, "Pilihan"],
  [27.62, 27.8, "yang"],
  [27.8, 27.92, "awak"],
  [27.92, 28.44, "mampu"],
  [28.44, 28.68, "ulang"],
  [28.68, 28.94, "setiap"],
  [28.94, 29.34, "minggu"],
  [29.34, 29.54, "lagi"],
  [29.54, 30.0, "berguna"],
  [30.0, 30.78, "daripada"],
  [30.78, 31.1, "yang"],
  [31.1, 31.42, "nampak"],
  [31.42, 31.88, "cantik"],
  [31.88, 32.22, "tapi"],
  [32.22, 32.78, "sekali"],
  [32.78, 33.26, "je."],
  [33.5, 33.68, "Kalau"],
  [33.68, 33.98, "pilihan"],
  [33.98, 34.22, "memang"],
  [34.22, 34.58, "terhad,"],
  [34.8, 34.94, "ambil"],
  [34.94, 35.14, "yang"],
  [35.14, 35.4, "paling"],
  [35.4, 35.76, "dekat"],
  [35.76, 36.0, "dengan"],
  [36.0, 36.22, "tiga"],
  [36.22, 36.52, "benda"],
  [36.52, 36.86, "tadi."],
  [37.26, 37.36, "Tak"],
  [37.36, 37.54, "perlu"],
  [37.54, 37.9, "perfect,"],
  [38.12, 38.28, "tau."],
  [38.3, 38.8, "Cukup"],
  [38.8, 39.04, "ada"],
  [39.04, 39.42, "satu"],
  [39.42, 40.02, "pilihan"],
  [40.02, 40.22, "yang"],
  [40.22, 40.42, "awak"],
  [40.42, 40.64, "boleh"],
  [40.64, 40.96, "ulang."],
];

const CTA_AT = f(38.3);

const Lower: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 5.6)
    return (
      <Chip delay={f(2.9)} rotate={-2} size={50}>
        3 BENDA SEBELUM BELI
      </Chip>
    );
  if (t < 12.3) return null;
  if (t < 16.7)
    return (
      <NumCard
        n="1"
        tag="PROTEIN DULU"
        text="telur rebus · susu · yogurt"
        delay={f(12.48)}
        checkAt={f(13.6)}
        rotate={-1}
      />
    );
  if (t < 20.5)
    return (
      <NumCard
        n="2"
        tag="BUAH / SERAT"
        text="ada buah atau sesuatu berserat?"
        delay={f(17.46)}
        checkAt={f(19.3)}
        rotate={1}
      />
    );
  if (t < 27.3)
    return (
      <NumCard
        n="3"
        tag="CUKUP KENYANG"
        text="sikit sangat = lapar sebelum pukul 10"
        delay={f(20.84)}
        checkAt={f(22.0)}
        rotate={-1}
        size={40}
      />
    );
  if (t < 38.2)
    return (
      <>
        <Chip delay={f(27.92)} rotate={-2} size={56}>
          MAMPU ULANG
        </Chip>
        <Chip delay={f(29.54)} rotate={1.5} size={38}>
          setiap minggu &gt; cantik sekali je
        </Chip>
      </>
    );
  return (
    <div style={{ transform: "scale(0.82)" }}>
      <CtaPill icon="save" delay={CTA_AT}>
        Save untuk pagi rushing seterusnya
      </CtaPill>
    </div>
  );
};

const Talk: React.FC = () => (
  <FaceCamOpener
    clip={CLIP}
    hook={
      <>
        SARAPAN STESEN MINYAK:{" "}
        <span style={{ color: C.marker }}>CARI 3 BENDA</span>
      </>
    }
    hookSize={58}
    lowerTop={1430}
  >
    <Lower />
  </FaceCamOpener>
);

export const R1210_SARAPAN_REAL_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: (
      <>
        <Talk />
        <Captions words={WORDS} top={1260} />
      </>
    ),
    cues: [
      [f(2.9), "pop", 0.3],
      [f(12.48), "pop", 0.3],
      [f(17.46), "pop", 0.3],
      [f(20.84), "pop", 0.3],
      [f(27.92), "pop", 0.3],
      [CTA_AT, "pop", 0.3],
    ],
  },
];
