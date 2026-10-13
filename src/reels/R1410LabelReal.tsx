// Reel 1 (14/10) "Dua Roti Wholemeal" — full talk (R1), Notion 📅 14/10/2026 — Baca Label, IG REEL 1.
// Hook card = Notion cover; step chips = Notion overlays (SERVING SIZE DULU · INGREDIENTS · SERAT · GULA + PROTEIN ·
// KONTEKS MEAL); end pill = Notion CTA (not spoken). Guardrail: no label numbers typed on screen — only Coach's own label
// photo is shown, with rows highlighted. Laid out inside SAFE.
// Media (local only, gitignored):
//   public/clips/R1410-full.mp4   four Teleprompter takes (13/10 22:08) joined, 40.30s (take 1 cut before its repeated
//                                 "bungkusan tu", which take 2 opens with).
//   public/img/bread-label.jpg    Coach's photo of the back-of-pack nutrition panel (387×516).
//   public/img/bread-white.jpg, bread-seeded.jpg   two bread photos Coach sent, shown at his two raised fingers.
import React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { C, FPS } from "../theme";
import { Card, Pop, Strike } from "../kit";
import { SceneDef } from "../Reel";
import { Chip, CtaPill, SAFE } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";

const CLIP = "clips/R1410-full.mp4";
const CLIP_LEN = 1211;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const WORDS: Word[] = [
  [0.0, 0.56, "Dua"],
  [0.56, 1.0, "roti"],
  [1.0, 1.5, "sama-sama"],
  [1.5, 1.84, "tulis"],
  [1.84, 2.42, "wholemeal."],
  [2.7, 2.7, "Saya"],
  [2.7, 3.02, "tengok"],
  [3.02, 3.34, "label"],
  [3.34, 3.56, "ni"],
  [3.56, 4.32, "dulu."],
  [4.62, 4.96, "Perkataan"],
  [4.96, 5.1, "kat"],
  [5.1, 5.36, "depan"],
  [5.36, 5.84, "bungkusan"],
  [5.84, 6.08, "tu"],
  [6.08, 6.42, "baru"],
  [6.42, 6.9, "permulaan"],
  [6.9, 7.22, "cerita"],
  [7.22, 7.48, "tau."],
  [7.62, 7.82, "Jadi"],
  [7.82, 8.22, "kita"],
  [8.22, 8.46, "kena"],
  [8.46, 8.88, "pusing"],
  [8.9, 9.4, "bungkusan"],
  [9.4, 9.54, "tu"],
  [9.54, 9.9, "tengok"],
  [9.9, 10.12, "dekat"],
  [10.12, 10.94, "belakang"],
  [10.94, 11.36, "nutrition"],
  [11.36, 11.74, "facts."],
  [12.4, 12.4, "First"],
  [12.4, 12.66, "kali"],
  [12.66, 13.0, "serving"],
  [13.0, 13.34, "size,"],
  [13.56, 13.72, "berapa"],
  [13.72, 14.06, "keping"],
  [14.06, 14.38, "untuk"],
  [14.38, 14.9, "satu"],
  [14.9, 15.74, "hidangan"],
  [15.74, 16.06, "sebab"],
  [16.06, 16.3, "nombor"],
  [16.3, 16.5, "dekat"],
  [16.5, 16.84, "belakang"],
  [16.84, 17.0, "tu"],
  [17.0, 17.32, "ikut"],
  [17.32, 17.54, "serving"],
  [17.54, 17.8, "bukan"],
  [17.8, 18.06, "satu"],
  [18.06, 18.54, "bungkus."],
  [18.6, 18.98, "Yang"],
  [18.98, 19.26, "kedua"],
  [19.26, 19.48, "adalah"],
  [19.48, 20.36, "ingredients."],
  [20.4, 20.84, "Tengok"],
  [20.84, 21.26, "apa"],
  [21.26, 21.92, "tiga"],
  [21.92, 22.22, "benda"],
  [22.22, 22.42, "yang"],
  [22.42, 23.34, "disenaraikan"],
  [23.34, 24.06, "awal."],
  [24.44, 24.52, "Yang"],
  [24.52, 24.98, "ketiga"],
  [24.98, 25.38, "adalah"],
  [25.38, 26.22, "serat."],
  [26.44, 26.52, "Yang"],
  [26.52, 26.84, "keempat"],
  [26.84, 27.1, "adalah"],
  [27.1, 27.36, "gula"],
  [27.36, 27.56, "dan"],
  [27.56, 27.7, "juga"],
  [27.7, 28.14, "protein."],
  [28.32, 28.52, "Lepas"],
  [28.52, 28.6, "tu"],
  [28.6, 28.92, "fikir"],
  [28.92, 29.3, "konteks."],
  [29.32, 29.6, "Awak"],
  [29.6, 29.82, "makan"],
  [29.82, 30.14, "roti"],
  [30.14, 30.26, "ni"],
  [30.26, 30.72, "sorang-sorang"],
  [30.72, 31.56, "ataupun"],
  [31.56, 32.22, "bersama-sama"],
  [32.22, 32.42, "dengan"],
  [32.42, 32.7, "telur"],
  [32.7, 33.08, "ataupun"],
  [33.08, 33.42, "buah"],
  [33.42, 33.66, "Tak"],
  [33.66, 33.78, "perlu"],
  [33.78, 34.06, "jadi"],
  [34.06, 34.32, "food"],
  [34.32, 34.68, "police"],
  [34.68, 35.28, "pun,"],
  [35.54, 36.08, "cukup"],
  [36.08, 36.5, "pusing"],
  [36.5, 36.9, "bungkus"],
  [36.9, 37.28, "baca"],
  [37.28, 37.74, "nutrition"],
  [37.74, 37.98, "facts"],
  [37.98, 38.26, "dan"],
  [38.26, 38.76, "pilih"],
  [38.76, 39.02, "apa"],
  [39.02, 39.14, "yang"],
  [39.14, 39.6, "sesuai"],
  [39.6, 39.92, "dengan"],
  [39.92, 40.26, "awak"],
];

// ---------- two breads at the raised fingers (0.5–2.6s) ----------
const BreadAt: React.FC<{
  src: string;
  x: number;
  y: number;
  at: number;
  rot: number;
}> = ({ src, x, y, at, rot }) => (
  <div style={{ position: "absolute", left: x - 125, top: y - 250 }}>
    <Pop delay={f(at)} rotate={rot}>
      <div
        style={{
          width: 300,
          height: 300,
          borderRadius: 26,
          overflow: "hidden",
          border: "8px solid #fff",
          boxShadow: "0 16px 34px rgba(20,30,20,0.35)",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
    </Pop>
  </div>
);

const Breads: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 0.4 || t >= 2.65) return null;
  return (
    <>
      <BreadAt src="img/bread-white.jpg" x={330} y={860} at={0.56} rot={-5} />
      <BreadAt src="img/bread-seeded.jpg" x={700} y={840} at={0.75} rot={5} />
    </>
  );
};

// ---------- label card: front "WHOLEMEAL" flips to the back panel at "pusing" ----------
const LBL = { w: 387 * 1.38, h: 516 * 1.38 };
// highlight bands, in label-photo pixels (y0, y1)
const BANDS: [number, number, number, number][] = [
  // [from, to, y0, y1]
  [12.6, 18.5, 178, 204], // serving size
  [25.3, 26.5, 316, 334], // dietary fibre
  [27.0, 29.3, 226, 244], // protein
  [27.0, 29.3, 300, 318], // total sugar
];

const FrontPack: React.FC = () => (
  <div
    style={{
      width: LBL.w,
      height: LBL.h,
      borderRadius: 26,
      background: "#E9D7B5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 20,
      border: `8px solid #fff`,
    }}
  >
    <svg viewBox="0 0 200 180" width={300} height={270}>
      <path
        d="M 30 70 Q 30 20 100 20 Q 170 20 170 70 Q 170 90 155 95 L 155 170 L 45 170 L 45 95 Q 30 90 30 70 Z"
        fill="#C98D4E"
      />
      <path
        d="M 45 80 Q 45 42 100 42 Q 155 42 155 80 L 145 88 L 145 160 L 55 160 L 55 88 Z"
        fill="#F3E3C3"
      />
      {[...Array(10)].map((_, i) => (
        <ellipse
          key={i}
          cx={70 + (i % 4) * 20}
          cy={70 + Math.floor(i / 4) * 30}
          rx={4}
          ry={2.5}
          fill="#B9874F"
        />
      ))}
    </svg>
    <div
      style={{ fontSize: 64, fontWeight: 800, color: C.ink, letterSpacing: 2 }}
    >
      “WHOLEMEAL”
    </div>
    <div style={{ fontSize: 30, fontWeight: 700, color: C.inkSoft }}>
      depan bungkus
    </div>
  </div>
);

const LabelCard: React.FC = () => {
  const fr = useCurrentFrame();
  const t = fr / FPS;
  if (t < 4.5 || t >= 29.3) return null;
  const flip = interpolate(fr, [f(8.46), f(8.46) + 14], [0, 180], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const showBack = flip >= 90;
  return (
    <div style={{ position: "absolute", left: SAFE.left, top: 1480 - LBL.h }}>
      <Pop delay={f(4.62)} rotate={-2}>
        <div
          style={{
            transform: `perspective(1400px) rotateY(${showBack ? flip - 180 : flip}deg)`,
            boxShadow: "0 16px 34px rgba(20,30,20,0.3)",
            borderRadius: 26,
          }}
        >
          {!showBack ? (
            <FrontPack />
          ) : (
            <div
              style={{
                position: "relative",
                width: LBL.w,
                height: LBL.h,
                borderRadius: 26,
                overflow: "hidden",
                border: "8px solid #fff",
                background: "#fff",
              }}
            >
              <Img
                src={staticFile("img/bread-label.jpg")}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              {BANDS.filter(([a, b]) => t >= a && t < b).map(
                ([a, , y0, y1]) => {
                  const p = interpolate(fr, [f(a), f(a) + 8], [0, 1], {
                    extrapolateRight: "clamp",
                  });
                  return (
                    <div
                      key={y0}
                      style={{
                        position: "absolute",
                        left: 10,
                        top: (y0 / 516) * LBL.h - 8,
                        height: ((y1 - y0) / 516) * LBL.h,
                        width: `${p * 92}%`,
                        background: "rgba(234,212,156,0.55)",
                        border: `4px solid ${C.marker}`,
                        borderRadius: 10,
                      }}
                    />
                  );
                },
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: C.ink,
                  color: C.paper,
                  fontSize: 26,
                  fontWeight: 800,
                  textAlign: "center",
                  padding: "6px 0",
                  letterSpacing: 2,
                }}
              >
                BELAKANG BUNGKUS
              </div>
            </div>
          )}
        </div>
      </Pop>
    </div>
  );
};

// ---------- step chips (right column while the label is up) ----------
const STEPS: [string, string, number][] = [
  ["1", "SERVING SIZE DULU", 12.66],
  ["2", "INGREDIENTS", 18.98],
  ["3", "SERAT", 24.52],
  ["4", "GULA + PROTEIN", 26.52],
  ["5", "KONTEKS MEAL", 28.6],
];
const COL_X = SAFE.left + LBL.w + 24;

const StepChips: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 12.5 || t >= 29.3) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: COL_X,
        right: SAFE.right - 120,
        top: 760,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {STEPS.map(([n, label, at]) => (
        <Pop key={n} delay={f(at)} rotate={-1}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background:
                t >= at && (STEPS.find(([, , b]) => b > at)?.[2] ?? 99) > t
                  ? C.ink
                  : C.card,
              color:
                t >= at && (STEPS.find(([, , b]) => b > at)?.[2] ?? 99) > t
                  ? C.paper
                  : C.ink,
              borderRadius: 16,
              padding: "10px 16px",
              fontSize: 30,
              fontWeight: 800,
              ...OVER_VIDEO,
            }}
          >
            <span style={{ color: C.marker }}>{n}</span>
            {label}
          </div>
        </Pop>
      ))}
      {t >= 21.1 && t < 24.4 && (
        <Pop delay={f(21.26)}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: C.paper,
              background: "rgba(23,60,48,0.9)",
              borderRadius: 12,
              padding: "8px 14px",
            }}
          >
            tengok 3 bahan pertama dalam senarai
          </div>
        </Pop>
      )}
    </div>
  );
};

// ---------- after the label ----------
const Lower: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 29.3) return null;
  if (t < 33.4)
    return (
      <div
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Chip delay={f(30.26)} rotate={-2} size={40}>
          roti sorang-sorang?
        </Chip>
        <Chip delay={f(31.56)} rotate={2} size={40}>
          roti + telur + buah?
        </Chip>
      </div>
    );
  if (t < 37.9)
    return (
      <Pop delay={f(33.66)} rotate={-1.5}>
        <Card
          style={{
            padding: "14px 30px",
            fontSize: 44,
            fontWeight: 800,
            ...OVER_VIDEO,
          }}
        >
          tak perlu jadi{" "}
          <span style={{ position: "relative", display: "inline-block" }}>
            food police
            <Strike delay={f(34.6)} width={6} />
          </span>
        </Card>
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
      <CtaPill icon="save" delay={f(37.98)}>
        Save untuk next kali beli roti
      </CtaPill>
    </div>
  );
};

const Window: React.FC<{
  from: number;
  to: number;
  children: React.ReactNode;
}> = ({ from, to, children }) => {
  const t = useCurrentFrame() / FPS;
  return t >= from && t < to ? <>{children}</> : null;
};

const LABEL_FROM = 4.5;
const LABEL_TO = 29.3;

const Talk: React.FC = () => (
  <>
    <FaceCamOpener
      clip={CLIP}
      hook={
        <>
          DUA ROTI “WHOLEMEAL”.{" "}
          <span style={{ color: C.marker }}>LABEL MANA?</span>
        </>
      }
      hookSize={56}
    />
    <Breads />
    <LabelCard />
    <StepChips />
    <div
      style={{
        position: "absolute",
        top: 1340,
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

export const R1410_LABEL_REAL_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: (
      <>
        <Talk />
        {/* captions: full width outside the label section, right-hand column beside the label during it; each set is
            cut off at the section boundary so the two never show together */}
        <Window from={0} to={LABEL_FROM}>
          <Captions
            words={WORDS.filter((w) => w[0] < LABEL_FROM)}
            top={1150}
            size={60}
            left={SAFE.left}
            right={SAFE.right}
          />
        </Window>
        <Window from={LABEL_FROM} to={LABEL_TO}>
          <Captions
            words={WORDS.filter((w) => w[0] >= LABEL_FROM && w[0] < LABEL_TO)}
            top={1290}
            size={44}
            max={2}
            left={COL_X}
            right={SAFE.right - 120}
          />
        </Window>
        <Window from={LABEL_TO} to={99}>
          <Captions
            words={WORDS.filter((w) => w[0] >= LABEL_TO)}
            top={1130}
            size={56}
            left={SAFE.left}
            right={SAFE.right}
          />
        </Window>
      </>
    ),
    cues: [
      [f(0.56), "pop", 0.3],
      [f(0.75), "pop", 0.3],
      [f(8.46), "swipe", 0.45],
      ...STEPS.map(([, , at]): [number, "pop", number] => [f(at), "pop", 0.3]),
      [f(34.6), "scribble", 0.35],
      [f(37.98), "pop", 0.3],
    ],
  },
];
