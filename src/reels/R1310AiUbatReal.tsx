// Reel 1 (13/10) "Pharmacist Semak Jawapan AI" — full talk (R1), Notion 📅 13/10/2026 — AI, Ubat dan Pharmacist, IG REEL 1.
// Hook card = Notion cover; the 4-step strip and cards = Notion overlays (SEMAK SUMBER · KONTEKS INDIVIDU · JAGA PRIVASI ·
// TANYA PROFESIONAL). First reel laid out inside SAFE (IG username/caption block and action icons).
// Media (local only, gitignored):
//   public/clips/R1310-full.mp4   six Teleprompter takes (12/10 17:58–18:00) trimmed and joined, 46.44s, in spoken order:
//     hook 17:58:07 · "Kenapa?…" 17:58:29 · "Biasanya… empat benda" 17:59:02 · privacy + "And lastly" 17:59:33 (a) ·
//     "nak campur dengan supplement…" 17:59:33 (b) · CTA 18:00:02. The other 17:59:33 file is a retake of (b), unused.
// The "kedua" point was cut off in the recording ("ubat ni bergantung…"); its card shows the script's content
// (umur · penyakit lain · ubat lain). The spoken CTA is "Share…", not the Notion "Save", so the pill follows the voice.
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Mark, Pop } from "../kit";
import { SceneDef } from "../Reel";
import { Chip, CtaPill, SAFE } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";

const CLIP = "clips/R1310-full.mp4";
const CLIP_LEN = 1395;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const WORDS: Word[] = [
  [0.14, 0.86, "Pharmacist"],
  [0.86, 1.14, "pun"],
  [1.14, 1.38, "saya"],
  [1.38, 1.56, "semak"],
  [1.56, 1.94, "balik"],
  [1.94, 2.3, "jawapan"],
  [2.3, 2.66, "AI"],
  [2.66, 3.04, "pasal"],
  [3.04, 3.64, "ubat-ubatan"],
  [3.87, 4.57, "Kenapa?"],
  [4.75, 5.19, "Sebab"],
  [5.19, 5.59, "jawapan"],
  [5.59, 5.83, "yang"],
  [5.83, 6.09, "bunyi"],
  [6.09, 6.57, "yakin"],
  [6.57, 6.81, "itu"],
  [6.81, 7.15, "tak"],
  [7.15, 7.57, "semestinya"],
  [7.57, 7.89, "tepat"],
  [7.89, 8.09, "untuk"],
  [8.09, 8.49, "awak."],
  [9.01, 9.07, "AI"],
  [9.07, 9.35, "memang"],
  [9.35, 9.75, "sangat"],
  [9.75, 10.13, "useful"],
  [10.13, 10.41, "untuk"],
  [10.41, 10.77, "faham"],
  [10.77, 10.93, "dan"],
  [10.93, 11.71, "susun"],
  [11.71, 12.35, "information"],
  [12.35, 12.75, "tapi"],
  [12.75, 13.19, "tentang"],
  [13.19, 14.03, "ubat-ubatan"],
  [14.03, 14.67, "jangan"],
  [14.67, 14.89, "ambil"],
  [14.89, 15.33, "bulat-bulat."],
  [15.35, 15.99, "Biasanya"],
  [15.99, 16.23, "bila"],
  [16.23, 16.57, "guna"],
  [16.57, 16.83, "AI"],
  [16.83, 16.99, "ni"],
  [16.99, 17.21, "saya"],
  [17.21, 17.43, "check"],
  [17.43, 17.75, "empat"],
  [17.75, 18.21, "benda."],
  [18.43, 18.63, "First"],
  [18.63, 18.83, "kali"],
  [18.83, 19.01, "kita"],
  [19.01, 19.29, "punya"],
  [19.29, 19.59, "source"],
  [19.59, 19.85, "lah,"],
  [19.89, 20.35, "sumber"],
  [20.35, 20.51, "dia"],
  [20.51, 20.71, "ambil"],
  [20.71, 20.99, "ubat"],
  [20.99, 21.23, "daripada"],
  [21.23, 21.59, "mana."],
  [22.01, 22.15, "Kan"],
  [22.15, 22.53, "kedua"],
  [22.53, 22.69, "ni"],
  [22.69, 22.99, "ubat"],
  [22.99, 23.17, "ni"],
  [23.17, 23.37, "bergantung..."],
  [23.87, 24.29, "taip"],
  [24.29, 24.85, "nama"],
  [24.85, 25.25, "IC"],
  [25.25, 25.65, "ataupun"],
  [25.65, 25.85, "rekod"],
  [25.85, 26.41, "perubatan"],
  [26.41, 26.69, "penuh"],
  [26.69, 27.13, "awak,"],
  [27.69, 27.81, "itu"],
  [27.81, 28.33, "confidential"],
  [28.33, 28.51, "itu"],
  [28.51, 28.77, "And"],
  [28.77, 29.03, "lastly"],
  [29.03, 29.19, "kalau"],
  [29.19, 29.37, "nak"],
  [29.37, 30.43, "melibatkan"],
  [30.43, 30.69, "ubat"],
  [30.69, 30.89, "awak"],
  [30.89, 31.53, "sendiri,"],
  [31.97, 31.97, "nak"],
  [31.97, 32.35, "ubah"],
  [32.35, 32.65, "dos,"],
  [32.93, 33.19, "nak"],
  [33.19, 33.45, "stop"],
  [33.45, 33.63, "ke"],
  [33.73, 33.97, "nak"],
  [33.97, 34.21, "campur"],
  [34.21, 34.33, "dengan"],
  [34.33, 34.89, "supplement,"],
  [35.33, 35.45, "tanya"],
  [35.45, 35.83, "pharmacist"],
  [35.83, 36.13, "ataupun"],
  [36.13, 36.45, "doktor"],
  [36.45, 36.81, "dulu,"],
  [37.37, 37.41, "AI"],
  [37.41, 37.63, "boleh"],
  [37.63, 37.89, "tolong"],
  [37.89, 38.03, "awak"],
  [38.03, 38.39, "faham"],
  [38.39, 38.77, "tapi"],
  [38.77, 39.57, "keputusan"],
  [39.57, 40.43, "ubat,"],
  [40.47, 40.95, "bawalah"],
  [40.95, 41.33, "dekat"],
  [41.33, 41.63, "orang"],
  [41.63, 42.05, "yang"],
  [42.05, 42.33, "tahu"],
  [42.33, 42.65, "tentang"],
  [42.65, 42.85, "kes"],
  [42.85, 43.13, "awak."],
  [43.31, 43.79, "Share"],
  [43.79, 44.25, "dekat"],
  [44.25, 44.55, "orang"],
  [44.55, 44.73, "yang"],
  [44.73, 44.83, "awak"],
  [44.83, 45.19, "kenal"],
  [45.19, 45.37, "yang"],
  [45.37, 45.61, "tengah"],
  [45.61, 45.75, "ambil"],
  [45.75, 45.99, "ubat"],
  [45.99, 46.31, "sekarang"],
];
WORDS.splice(
  WORDS.findIndex((w) => w[2] === "taip"),
  0,
  [23.45, 23.85, "Jangan"],
);

const STEPS: [string, string, number][] = [
  ["SEMAK SUMBER", "dia ambil maklumat dari mana?", 18.43],
  ["KONTEKS INDIVIDU", "umur · penyakit lain · ubat lain", 22.15],
  ["JAGA PRIVASI", "jangan taip nama, IC, rekod perubatan", 23.45],
  ["TANYA PROFESIONAL", "ubah dos · berhenti · campur supplement", 28.77],
];

const LOWER_TOP = 1290;

const Strip: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 17.4 || t >= 43.2) return null;
  return (
    <Pop delay={f(17.43)}>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        {STEPS.map(([tag, , at], i) => {
          const on = t >= at - 0.1;
          return (
            <div
              key={tag}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 14px",
                borderRadius: 999,
                fontSize: 24,
                fontWeight: 800,
                background: on ? C.ink : "rgba(255,255,255,0.9)",
                color: on ? C.paper : C.inkSoft,
                ...OVER_VIDEO,
              }}
            >
              <span style={{ color: on ? C.gold : C.inkSoft }}>{i + 1}</span>{" "}
              {tag.split(" ")[1]}
            </div>
          );
        })}
      </div>
    </Pop>
  );
};

const StepCard: React.FC<{ i: number }> = ({ i }) => {
  const [tag, text, at] = STEPS[i];
  return (
    <Pop delay={f(at)} rotate={i % 2 ? 1 : -1}>
      <Card
        style={{
          width: 800,
          padding: "20px 26px",
          display: "flex",
          alignItems: "center",
          gap: 22,
          textAlign: "left",
          ...OVER_VIDEO,
        }}
      >
        <div
          style={{
            width: 74,
            height: 74,
            flexShrink: 0,
            borderRadius: "50%",
            background: C.ink,
            color: C.paper,
            fontSize: 42,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {i + 1}
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: 3,
              color: C.marker,
            }}
          >
            {tag}
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, lineHeight: 1.2 }}>
            {text}
          </div>
        </div>
        <Mark kind="check" delay={f(at) + 12} size={44} />
      </Card>
    </Pop>
  );
};

const Lower: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 4.7) return null;
  if (t < 8.9)
    return (
      <Chip delay={f(5.83)} rotate={-2} size={42}>
        bunyi yakin ≠ tepat untuk awak
      </Chip>
    );
  if (t < 15.3)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
        }}
      >
        <Chip delay={f(10.41)} rotate={-1.5} size={40}>
          AI: bantu faham &amp; susun info ✓
        </Chip>
        <Chip delay={f(14.03)} rotate={1.5} size={40}>
          ubat: jangan ambil bulat-bulat
        </Chip>
      </div>
    );
  if (t < 18.4)
    return (
      <Chip delay={f(17.43)} rotate={-2} size={46}>
        4 benda saya check
      </Chip>
    );
  if (t < 37.3)
    return <StepCard i={t < 22.1 ? 0 : t < 23.4 ? 1 : t < 28.7 ? 2 : 3} />;
  if (t < 43.2)
    return (
      <Pop delay={f(37.37)} rotate={-1}>
        <Card
          style={{
            width: 800,
            padding: "18px 26px",
            textAlign: "center",
            ...OVER_VIDEO,
          }}
        >
          <div style={{ fontSize: 36, fontWeight: 700, color: C.inkSoft }}>
            AI boleh bantu awak faham.
          </div>
          <div style={{ fontSize: 40, fontWeight: 800 }}>
            Keputusan ubat → orang yang tahu kes awak.
          </div>
        </Card>
      </Pop>
    );
  return (
    <div style={{ position: "absolute", left: "50%", top: 0, transform: "translateX(-50%) scale(0.8)", transformOrigin: "top center" }}>
      <CtaPill icon="share" delay={f(43.31)}>
        Share kepada yang ambil ubat
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
          PHARMACIST PUN SEMAK{" "}
          <span style={{ color: C.marker }}>JAWAPAN AI TENTANG UBAT</span>
        </>
      }
      hookSize={54}
    />
    <div
      style={{
        position: "absolute",
        top: 440,
        left: SAFE.left,
        right: SAFE.left,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Strip />
    </div>
    <div
      style={{
        position: "absolute",
        top: LOWER_TOP,
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

export const R1310_AIUBAT_REAL_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: (
      <>
        <Talk />
        <Captions
          words={WORDS}
          top={1150}
          size={60}
          left={SAFE.left}
          right={SAFE.right}
        />
      </>
    ),
    cues: [
      [f(5.83), "pop", 0.3],
      [f(14.03), "pop", 0.3],
      ...STEPS.map(([, , at]): [number, "pop", number] => [f(at), "pop", 0.3]),
      [f(43.31), "pop", 0.3],
    ],
  },
];
