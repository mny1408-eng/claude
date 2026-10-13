// Reel 1 (13/10) "Pharmacist Semak Jawapan AI" — full talk (R1), Notion 📅 13/10/2026 — AI, Ubat dan Pharmacist, IG REEL 1.
// Hook card = Notion cover; the 4-step strip and cards = Notion overlays (SEMAK SUMBER · KONTEKS INDIVIDU · JAGA PRIVASI ·
// TANYA PROFESIONAL). First reel laid out inside SAFE (IG username/caption block and action icons).
// Media (local only, gitignored):
//   public/clips/R1310-full.mp4   seven Teleprompter takes (12/10 17:58–18:00) trimmed and joined, 46.44s, in spoken order:
//     hook 17:58:07 · "Kenapa?…" 17:58:29 · "Biasanya… empat benda" 17:59:02 · privacy + "And lastly" 17:59:33 (a) ·
//     "nak campur dengan supplement…" 17:59:33 (b) · CTA 18:00:02. The other 17:59:33 file is a retake of (b), unused.
// Points 2–3 come from the full 17:59:02 take Coach re-sent (the first upload stopped at "ubat ni bergantung…"). The spoken CTA is "Share…", not the Notion "Save", so the pill follows the voice.
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Mark, Pop } from "../kit";
import { SceneDef } from "../Reel";
import { Chip, CtaPill, SAFE } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";

const CLIP = "clips/R1310-full.mp4";
const CLIP_LEN = 1704;
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
  [9.07, 9.37, "memang"],
  [9.37, 9.75, "sangat"],
  [9.75, 10.13, "useful"],
  [10.13, 10.41, "untuk"],
  [10.41, 10.77, "faham"],
  [10.77, 10.95, "dan"],
  [10.95, 11.71, "susun"],
  [11.71, 12.35, "information"],
  [12.35, 12.75, "tapi"],
  [12.75, 13.19, "tentang"],
  [13.19, 14.05, "ubat-ubatan"],
  [14.05, 14.67, "jangan"],
  [14.67, 14.89, "ambil"],
  [14.89, 15.33, "bulat-bulat."],
  [15.35, 15.99, "Biasanya"],
  [15.99, 16.23, "bila"],
  [16.23, 16.57, "guna"],
  [16.57, 16.85, "AI"],
  [16.85, 16.99, "ni"],
  [16.99, 17.21, "saya"],
  [17.21, 17.43, "check"],
  [17.43, 17.73, "empat"],
  [17.73, 18.21, "benda."],
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
  [21.9, 22.46, "Kedua"],
  [22.46, 22.58, "ni"],
  [22.58, 22.86, "ubat"],
  [22.86, 23.1, "ni"],
  [23.1, 23.58, "bergantung"],
  [23.58, 23.96, "kepada"],
  [23.96, 24.62, "seseorang,"],
  [25.16, 26.08, "umur,"],
  [26.7, 27.06, "disease,"],
  [27.3, 27.46, "ubat"],
  [27.46, 27.82, "lain"],
  [27.82, 27.9, "awak"],
  [27.9, 28.42, "makan."],
  [28.7, 28.78, "AI"],
  [28.78, 28.9, "tak"],
  [28.9, 29.16, "nampak"],
  [29.16, 29.36, "semua"],
  [29.36, 29.5, "tu"],
  [29.5, 29.9, "kecuali"],
  [29.9, 30.04, "awak"],
  [30.04, 30.46, "beritahu"],
  [30.46, 30.68, "dia."],
  [31.12, 31.34, "And"],
  [31.34, 31.46, "yang"],
  [31.46, 32.1, "ketiga,"],
  [32.62, 32.86, "cuba"],
  [32.86, 33.1, "jaga"],
  [33.1, 33.54, "privacy."],
  [33.65, 34.15, "Jangan"],
  [34.15, 34.57, "taip"],
  [34.57, 35.13, "nama"],
  [35.13, 35.53, "IC"],
  [35.53, 35.93, "ataupun"],
  [35.93, 36.13, "rekod"],
  [36.13, 36.69, "perubatan"],
  [36.69, 36.97, "penuh"],
  [36.97, 37.33, "awak."],
  [37.53, 38.07, "Itu"],
  [38.07, 38.61, "confidential"],
  [38.61, 38.77, "tu."],
  [38.99, 39.07, "And"],
  [39.07, 39.31, "lastly"],
  [39.31, 39.47, "kalau"],
  [39.47, 39.65, "nak"],
  [39.65, 40.71, "melibatkan"],
  [40.71, 40.97, "ubat"],
  [40.97, 41.17, "awak"],
  [41.17, 41.77, "sendiri,"],
  [42.25, 42.25, "nak"],
  [42.25, 42.63, "ubah"],
  [42.63, 42.93, "dos,"],
  [43.19, 43.47, "nak"],
  [43.47, 43.73, "stop"],
  [43.73, 43.91, "ke"],
  [44.01, 44.25, "nak"],
  [44.25, 44.49, "campur"],
  [44.49, 44.61, "dengan"],
  [44.61, 45.19, "supplement,"],
  [45.61, 45.73, "tanya"],
  [45.73, 46.11, "pharmacist"],
  [46.11, 46.41, "ataupun"],
  [46.41, 46.73, "doktor"],
  [46.73, 47.09, "dulu,"],
  [47.61, 47.69, "AI"],
  [47.69, 47.91, "boleh"],
  [47.91, 48.19, "tolong"],
  [48.19, 48.31, "awak"],
  [48.31, 48.67, "faham"],
  [48.67, 49.05, "tapi"],
  [49.05, 49.85, "keputusan"],
  [49.85, 50.71, "ubat,"],
  [50.75, 51.23, "bawalah"],
  [51.23, 51.61, "dekat"],
  [51.61, 51.91, "orang"],
  [51.91, 52.33, "yang"],
  [52.33, 52.61, "tahu"],
  [52.61, 52.91, "tentang"],
  [52.91, 53.13, "kes"],
  [53.13, 53.41, "awak."],
  [53.59, 54.07, "Share"],
  [54.07, 54.53, "dekat"],
  [54.53, 54.83, "orang"],
  [54.83, 55.01, "yang"],
  [55.01, 55.11, "awak"],
  [55.11, 55.47, "kenal"],
  [55.47, 55.65, "yang"],
  [55.65, 55.89, "tengah"],
  [55.89, 56.05, "ambil"],
  [56.05, 56.27, "ubat"],
  [56.27, 56.59, "sekarang"],
];

const STEPS: [string, string, number][] = [
  ["SEMAK SUMBER", "dia ambil maklumat dari mana?", 18.43],
  ["KONTEKS INDIVIDU", "umur · penyakit lain · ubat lain", 21.9],
  ["JAGA PRIVASI", "jangan taip nama, IC, rekod perubatan", 31.46],
  ["TANYA PROFESIONAL", "ubah dos · berhenti · campur supplement", 39.07],
];

const LOWER_TOP = 1290;

const Strip: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 17.4 || t >= 53.5) return null;
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
  if (t < 47.55)
    return <StepCard i={t < 21.85 ? 0 : t < 31.4 ? 1 : t < 39.0 ? 2 : 3} />;
  if (t < 53.5)
    return (
      <Pop delay={f(47.61)} rotate={-1}>
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
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        transform: "translateX(-50%) scale(0.8)",
        transformOrigin: "top center",
      }}
    >
      <CtaPill icon="share" delay={f(53.59)}>
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
      [f(53.59), "pop", 0.3],
    ],
  },
];
