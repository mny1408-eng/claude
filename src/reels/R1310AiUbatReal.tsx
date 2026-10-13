// Reel 1 (13/10) "Pharmacist Semak Jawapan AI" — full talk (R1), Notion 📅 13/10/2026 — AI, Ubat dan Pharmacist, IG REEL 1.
// Hook card = Notion cover; the 4-step strip and cards = Notion overlays (SEMAK SUMBER · KONTEKS INDIVIDU · JAGA PRIVASI ·
// TANYA PROFESIONAL). First reel laid out inside SAFE (IG username/caption block and action icons).
// Media (local only, gitignored):
//   public/clips/R1310-full.mp4   six Teleprompter takes (12/10 17:58–18:00) trimmed and joined, 46.44s, in spoken order:
//     hook 17:58:07 · "Kenapa?…" 17:58:29 · "Biasanya… empat benda" 17:59:02 · privacy + "And lastly" 17:59:33 (a) ·
//     "nak campur dengan supplement…" 17:59:33 (b) · CTA 18:00:02. The other 17:59:33 file is a retake of (b), unused.
// The "kedua" point was cut off in the recording ("ubat ni bergantung…"): that phrase is muted and covered by a full
// card for point 2 (script content: umur · penyakit lain · ubat lain), with a 0.8s hold so it can be read. The spoken CTA is "Share…", not the Notion "Save", so the pill follows the voice.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Mark, Pop } from "../kit";
import { SceneDef } from "../Reel";
import { Chip, CtaPill, SAFE } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";

const CLIP = "clips/R1310-full.mp4";
const CLIP_LEN = 1419;
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
  [24.67, 25.09, "taip"],
  [25.09, 25.65, "nama"],
  [25.65, 26.05, "IC"],
  [26.05, 26.45, "ataupun"],
  [26.45, 26.65, "rekod"],
  [26.65, 27.21, "perubatan"],
  [27.21, 27.49, "penuh"],
  [27.49, 27.93, "awak,"],
  [28.49, 28.61, "itu"],
  [28.61, 29.13, "confidential"],
  [29.13, 29.31, "itu"],
  [29.31, 29.57, "And"],
  [29.57, 29.83, "lastly"],
  [29.83, 29.99, "kalau"],
  [29.99, 30.17, "nak"],
  [30.17, 31.23, "melibatkan"],
  [31.23, 31.49, "ubat"],
  [31.49, 31.69, "awak"],
  [31.69, 32.33, "sendiri,"],
  [32.77, 32.77, "nak"],
  [32.77, 33.15, "ubah"],
  [33.15, 33.45, "dos,"],
  [33.73, 33.99, "nak"],
  [33.99, 34.25, "stop"],
  [34.25, 34.43, "ke"],
  [34.53, 34.77, "nak"],
  [34.77, 35.01, "campur"],
  [35.01, 35.13, "dengan"],
  [35.13, 35.69, "supplement,"],
  [36.13, 36.25, "tanya"],
  [36.25, 36.63, "pharmacist"],
  [36.63, 36.93, "ataupun"],
  [36.93, 37.25, "doktor"],
  [37.25, 37.61, "dulu,"],
  [38.17, 38.21, "AI"],
  [38.21, 38.43, "boleh"],
  [38.43, 38.69, "tolong"],
  [38.69, 38.83, "awak"],
  [38.83, 39.19, "faham"],
  [39.19, 39.57, "tapi"],
  [39.57, 40.37, "keputusan"],
  [40.37, 41.23, "ubat,"],
  [41.27, 41.75, "bawalah"],
  [41.75, 42.13, "dekat"],
  [42.13, 42.43, "orang"],
  [42.43, 42.85, "yang"],
  [42.85, 43.13, "tahu"],
  [43.13, 43.45, "tentang"],
  [43.45, 43.65, "kes"],
  [43.65, 43.93, "awak."],
  [44.11, 44.59, "Share"],
  [44.59, 45.05, "dekat"],
  [45.05, 45.35, "orang"],
  [45.35, 45.53, "yang"],
  [45.53, 45.63, "awak"],
  [45.63, 45.99, "kenal"],
  [45.99, 46.17, "yang"],
  [46.17, 46.41, "tengah"],
  [46.41, 46.55, "ambil"],
  [46.55, 46.79, "ubat"],
  [46.79, 47.11, "sekarang"],
];
WORDS.splice(
  WORDS.findIndex((w) => w[2] === "taip"),
  0,
  [24.25, 24.65, "Jangan"],
);

const STEPS: [string, string, number][] = [
  ["SEMAK SUMBER", "dia ambil maklumat dari mana?", 18.43],
  ["KONTEKS INDIVIDU", "umur · penyakit lain · ubat lain", 22.15],
  ["JAGA PRIVASI", "jangan taip nama, IC, rekod perubatan", 24.25],
  ["TANYA PROFESIONAL", "ubah dos · berhenti · campur supplement", 29.57],
];

const LOWER_TOP = 1290;

const Strip: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 17.4 || t >= 44.0) return null;
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
  if (t < 38.1) return <StepCard i={t < 24.2 ? 0 : t < 29.5 ? 2 : 3} />;
  if (t < 44.0)
    return (
      <Pop delay={f(38.17)} rotate={-1}>
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
      <CtaPill icon="share" delay={f(44.11)}>
        Share kepada yang ambil ubat
      </CtaPill>
    </div>
  );
};

// Point 2 was cut off mid-sentence in the recording; its words are muted and this card stands in (21.85–24.2s).
const Kedua: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 21.85 || t >= 24.2) return null;
  return (
    <AbsoluteFill
      style={{
        background: C.paper,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Pop delay={f(21.95)}>
        <Card style={{ width: 860, padding: "40px 44px", textAlign: "center" }}>
          <div
            style={{
              width: 110,
              height: 110,
              margin: "0 auto 20px",
              borderRadius: "50%",
              background: C.ink,
              color: C.paper,
              fontSize: 64,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            2
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: 4,
              color: C.marker,
            }}
          >
            KONTEKS INDIVIDU
          </div>
          <div
            style={{
              fontSize: 56,
              fontWeight: 800,
              lineHeight: 1.2,
              marginTop: 14,
            }}
          >
            umur · penyakit lain · ubat lain
          </div>
        </Card>
      </Pop>
    </AbsoluteFill>
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
        <Kedua />
      </>
    ),
    cues: [
      [f(5.83), "pop", 0.3],
      [f(14.03), "pop", 0.3],
      ...STEPS.map(([, , at]): [number, "pop", number] => [f(at), "pop", 0.3]),
      [f(44.11), "pop", 0.3],
      [f(21.85), "whoosh", 0.3],
    ],
  },
];
