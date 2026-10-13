// Reel 2 (14/10) "Favourite Food Tak Perlu Buang" — full talk, Notion 📅 14/10/2026 — Baca Label, IG REEL 2 (Connection).
// Hook card = Notion cover; overlays = Notion list (BERTAHUN-TAHUN CUBA · FAVOURITE FOOD BOLEH ADA RUANG · FIKIR PORTION ·
// MAKAN SEKALI DENGAN FAMILY); end pill = Notion CTA. Guardrail: personal history only as Coach says it; no weight
// figures or promises on screen. Laid out inside SAFE.
// Media (local only, gitignored):
//   public/clips/R1410b-full.mp4   three Teleprompter files (13/10 22:28:08, one take split by the app) joined, 49.2s.
//     Take 2 is cut before its trailing "masih boleh makan", which take 3 opens with; take 3 keeps 1.5s of tail for the CTA.
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Highlight, Mark, Pop, Strike } from "../kit";
import { SceneDef } from "../Reel";
import { BoxStamp, Chip, CtaPill, SAFE } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";
import { NasiLemak } from "./formats/FoodStickers";

const CLIP = "clips/R1410b-full.mp4";
const CLIP_LEN = 1479;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const WORDS: Word[] = [
  [0.0, 0.41, "Saya"],
  [0.41, 0.67, "kan"],
  [0.67, 0.83, "dah"],
  [0.83, 1.13, "cuba"],
  [1.13, 1.27, "diet"],
  [1.27, 1.83, "sendiri"],
  [1.83, 2.75, "bertahun-tahun"],
  [2.75, 3.31, "lamanya."],
  [3.61, 3.77, "Apa"],
  [3.77, 3.87, "yang"],
  [3.87, 4.07, "saya"],
  [4.07, 4.39, "belajar"],
  [4.39, 4.63, "selama"],
  [4.63, 4.85, "10"],
  [4.85, 5.17, "tahun"],
  [5.17, 5.61, "ni,"],
  [6.01, 6.11, "favourite"],
  [6.11, 6.31, "food"],
  [6.31, 6.53, "tak"],
  [6.53, 6.95, "semestinya"],
  [6.95, 7.21, "kena"],
  [7.21, 7.43, "buang"],
  [7.43, 7.89, "terus."],
  [8.25, 8.67, "Sebab"],
  [8.67, 9.09, "selalunya"],
  [9.09, 9.33, "bila"],
  [9.33, 9.63, "kita"],
  [9.63, 10.21, "buang,"],
  [10.39, 10.67, "kita"],
  [10.67, 10.83, "cut"],
  [10.83, 11.07, "terus"],
  [11.07, 11.45, "makanan"],
  [11.45, 11.59, "yang"],
  [11.59, 11.83, "kita"],
  [11.83, 12.15, "suka,"],
  [12.59, 12.67, "dia"],
  [12.67, 12.89, "senang"],
  [12.89, 13.13, "jadi"],
  [13.13, 13.75, "all-or-nothing,"],
  [13.78, 14.42, "tau."],
  [14.74, 14.94, "Tahan,"],
  [14.94, 15.28, "tahan"],
  [15.28, 15.54, "tahan"],
  [15.54, 15.98, "lepas"],
  [15.98, 16.48, "tu"],
  [16.48, 16.76, "ke"],
  [16.76, 16.96, "laut"],
  [16.96, 17.23, "kan"],
  [17.23, 17.42, "tak"],
  [17.42, 17.87, "tahan."],
  [18.48, 18.6, "Awak"],
  [18.6, 18.73, "pernah"],
  [18.73, 18.96, "rasa"],
  [18.96, 19.1, "tak"],
  [19.1, 19.3, "macam"],
  [19.3, 19.58, "tu?"],
  [20.02, 20.2, "Yang"],
  [20.2, 20.38, "saya"],
  [20.38, 20.72, "nampak"],
  [20.72, 20.96, "lebih"],
  [20.96, 21.2, "boleh"],
  [21.2, 21.54, "tahan"],
  [21.54, 21.9, "lama"],
  [21.9, 22.54, "bagi"],
  [22.54, 22.78, "ruang"],
  [22.78, 23.02, "untuk"],
  [23.02, 23.51, "makanan"],
  [23.51, 23.78, "tu"],
  [23.78, 24.28, "tapi"],
  [24.28, 24.7, "fikir"],
  [24.7, 25.04, "portion"],
  [25.04, 25.36, "and"],
  [25.36, 25.6, "bila"],
  [25.6, 25.84, "masa"],
  [25.84, 25.96, "kau"],
  [25.96, 26.08, "boleh"],
  [26.08, 26.48, "makan."],
  [26.98, 27.12, "And"],
  [27.12, 27.38, "sampai"],
  [27.38, 27.68, "hari"],
  [27.68, 27.8, "ni"],
  [27.8, 28.02, "saya"],
  [28.02, 28.28, "masih"],
  [28.28, 28.6, "boleh"],
  [28.6, 29.12, "makan"],
  [29.12, 29.54, "makanan"],
  [29.54, 30.5, "favourite"],
  [30.5, 31.12, "sambil"],
  [31.12, 31.52, "maintain"],
  [31.52, 32.02, "berat."],
  [32.28, 32.52, "Bila"],
  [32.52, 32.88, "makan"],
  [32.88, 33.06, "dengan"],
  [33.06, 33.42, "keluarga"],
  [33.42, 33.6, "pun"],
  [33.6, 33.78, "tak"],
  [33.78, 34.18, "perlulah"],
  [34.18, 34.78, "nak"],
  [34.78, 35.38, "asingkan"],
  [35.38, 35.9, "diri"],
  [35.9, 36.24, "ataupun"],
  [36.24, 36.52, "rasa"],
  [36.52, 37.14, "bersalah"],
  [37.14, 37.74, "kan."],
  [37.88, 38.2, "Duduk"],
  [38.2, 38.48, "makan"],
  [38.48, 38.83, "sekali"],
  [38.83, 39.26, "ambil"],
  [39.26, 39.78, "portion"],
  [39.78, 40.24, "yang"],
  [40.24, 40.83, "selesa"],
  [40.83, 41.36, "esok"],
  [41.36, 41.7, "sambung"],
  [41.7, 41.94, "balik"],
  [41.94, 42.2, "rutin"],
  [42.2, 42.46, "macam"],
  [42.46, 42.98, "biasa."],
  [43.18, 43.28, "Ini"],
  [43.28, 43.4, "yang"],
  [43.4, 43.62, "saya"],
  [43.62, 44.22, "belajarlah"],
  [44.22, 44.48, "dan"],
  [44.48, 44.74, "belum"],
  [44.74, 45.12, "tentu"],
  [45.12, 45.44, "sama"],
  [45.44, 45.66, "untuk"],
  [45.66, 46.0, "semua"],
  [46.0, 46.26, "orang."],
  [46.64, 46.84, "Apa"],
  [46.84, 47.22, "favourite"],
  [47.22, 47.38, "food"],
  [47.38, 47.64, "awak?"],
];

const Struck: React.FC<{
  at: number;
  children: React.ReactNode;
  size?: number;
}> = ({ at, children, size = 40 }) => (
  <Pop delay={f(at)} rotate={-1.5}>
    <span
      style={{
        position: "relative",
        display: "inline-block",
        fontSize: size,
        fontWeight: 800,
        padding: "10px 24px",
        borderRadius: 16,
        background: C.card,
        color: C.inkSoft,
        ...OVER_VIDEO,
      }}
    >
      {children}
      <Strike delay={f(at) + 10} width={6} />
    </span>
  </Pop>
);

const Lower: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 1.7) return null;
  if (t < 5.9)
    return (
      <Chip delay={f(1.83)} rotate={-2} size={48}>
        BERTAHUN-TAHUN CUBA
      </Chip>
    );
  if (t < 12.5)
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Pop delay={f(6.01)} rotate={-6}>
          <NasiLemak size={170} />
        </Pop>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Chip delay={f(6.11)} rotate={1.5} size={40}>
            favourite food
          </Chip>
          <Struck at={7.21}>buang terus</Struck>
        </div>
      </div>
    );
  if (t < 14.6)
    return (
      <div
        style={{
          background: "rgba(247,245,237,0.92)",
          borderRadius: 18,
          padding: "6px 10px",
        }}
      >
        <BoxStamp delay={f(13.13)} rotate={-4} size={64}>
          ALL-OR-NOTHING
        </BoxStamp>
      </div>
    );
  if (t < 19.9)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 10 }}>
          {[14.74, 14.94, 15.28].map((at, i) => (
            <Chip
              key={i}
              delay={f(at)}
              rotate={i % 2 ? 3 : -3}
              size={34 + i * 6}
            >
              tahan…
            </Chip>
          ))}
        </div>
        <Chip delay={f(15.54)} rotate={2} size={40}>
          lepas tu… ke laut 🌊
        </Chip>
      </div>
    );
  if (t < 26.9)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pop delay={f(22.54)} rotate={-1.5}>
          <div
            style={{
              background: C.ink,
              color: C.paper,
              borderRadius: 18,
              padding: "12px 26px",
              fontSize: 40,
              fontWeight: 800,
              textAlign: "center",
              ...OVER_VIDEO,
            }}
          >
            FAVOURITE FOOD{" "}
            <span style={{ color: C.gold }}>BOLEH ADA RUANG</span>
          </div>
        </Pop>
        <Pop delay={f(24.28)} rotate={1.5}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 40,
              fontWeight: 800,
              padding: "10px 24px",
              borderRadius: 16,
              background: C.card,
              ...OVER_VIDEO,
            }}
          >
            <Mark kind="check" delay={f(24.28) + 6} size={38} /> FIKIR PORTION
            &amp; bila makan
          </span>
        </Pop>
      </div>
    );
  if (t < 32.2)
    return (
      <Pop delay={f(28.6)} rotate={-1}>
        <Card
          style={{ padding: "16px 28px", textAlign: "center", ...OVER_VIDEO }}
        >
          <div style={{ fontSize: 34, fontWeight: 700, color: C.inkSoft }}>
            sampai hari ni
          </div>
          <div style={{ fontSize: 42, fontWeight: 800 }}>
            masih makan <Highlight delay={f(29.54)}>favourite food</Highlight>
          </div>
        </Card>
      </Pop>
    );
  if (t < 37.8)
    return (
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Struck at={34.78}>asingkan diri</Struck>
        <Struck at={36.24}>rasa bersalah</Struck>
      </div>
    );
  if (t < 43.1)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Pop delay={f(37.88)} rotate={-1.5}>
          <div
            style={{
              background: C.ink,
              color: C.paper,
              borderRadius: 18,
              padding: "12px 26px",
              fontSize: 40,
              fontWeight: 800,
              ...OVER_VIDEO,
            }}
          >
            MAKAN SEKALI <span style={{ color: C.gold }}>DENGAN FAMILY</span> 👨‍👩‍👧
          </div>
        </Pop>
        <div style={{ display: "flex", gap: 10 }}>
          <Chip delay={f(39.26)} rotate={-2} size={34}>
            portion yang selesa
          </Chip>
          <Chip delay={f(41.36)} rotate={2} size={34}>
            esok sambung rutin
          </Chip>
        </div>
      </div>
    );
  if (t < 46.6)
    return (
      <Pop delay={f(44.48)} rotate={-1}>
        <div
          style={{
            fontSize: 34,
            fontWeight: 700,
            color: C.paper,
            background: "rgba(23,60,48,0.9)",
            borderRadius: 14,
            padding: "8px 20px",
          }}
        >
          pengalaman saya, belum tentu sama untuk semua
        </div>
      </Pop>
    );
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        transform: "translateX(-50%) scale(0.8)",
        transformOrigin: "top center",
      }}
    >
      <CtaPill icon="comment" delay={f(46.64)}>
        Comment favourite food awak
      </CtaPill>
    </div>
  );
};

const Talk: React.FC = () => (
  <>
    <FaceCamOpener
      clip={CLIP}
      hook={
        <>
          FAVOURITE FOOD{" "}
          <span style={{ color: C.marker }}>TAK PERLU BUANG</span>
        </>
      }
      hookSize={58}
    />
    <div
      style={{
        position: "absolute",
        top: 1335,
        left: SAFE.left,
        right: SAFE.right,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Lower />
    </div>
  </>
);

export const R1410_FAV_REAL_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: (
      <>
        <Talk />
        <Captions
          words={WORDS}
          top={1100}
          size={58}
          left={SAFE.left}
          right={SAFE.right}
        />
      </>
    ),
    cues: [
      [f(1.83), "pop", 0.3],
      [f(7.21) + 10, "scribble", 0.35],
      [f(13.13), "stamp", 0.4],
      [f(22.54), "pop", 0.3],
      [f(37.88), "pop", 0.3],
      [f(46.64), "pop", 0.3],
    ],
  },
];
