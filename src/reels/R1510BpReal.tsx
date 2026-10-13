// Reel 1 (15/10) "Rasa Sihat, Tekanan Darah?" — full talk, Notion 📅 15/10/2026 — Prevention dan Sempadan, IG REEL 1.
// Hook card = Notion cover; overlays = Notion list (RASA SIHAT ≠ BACAAN OKAY · BOLEH TIADA SIMPTOM · UKUR DENGAN BETUL ·
// BINCANG DENGAN PROFESIONAL); end pill = spoken CTA (Share). Guardrail: no BP thresholds or screening frequency — the
// drawn monitor shows no numbers. Laid out inside SAFE.
// Media (local only, gitignored):
//   public/clips/R1510a-full.mp4   one Teleprompter take (13/10 22:38:29) split in three by the app, joined, 39.95s;
//                                  take 2 cut before its trailing "tu" (take 3 opens with "itu").
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Highlight, Mark, Pop, Strike } from "../kit";
import { SceneDef } from "../Reel";
import { BoxStamp, Chip, CtaPill, SAFE } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";

const CLIP = "clips/R1510a-full.mp4";
const CLIP_LEN = 1200;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const WORDS: Word[] = [
  [0.0, 0.5, "Rasa"],
  [0.5, 0.76, "sihat"],
  [0.76, 1.1, "tapi"],
  [1.1, 1.42, "bila"],
  [1.42, 1.68, "kali"],
  [1.68, 2.02, "terakhir"],
  [2.02, 2.22, "awak"],
  [2.22, 2.74, "check"],
  [2.74, 3.66, "BP?"],
  [3.9, 4.2, "tekanan"],
  [4.2, 4.48, "darah"],
  [4.48, 4.76, "tinggi"],
  [4.76, 4.88, "ni"],
  [4.88, 5.04, "boleh"],
  [5.04, 5.26, "jadi"],
  [5.26, 5.42, "tak"],
  [5.42, 5.54, "ada"],
  [5.54, 5.84, "simptom"],
  [5.84, 6.4, "langsung"],
  [6.4, 6.82, "Jadi"],
  [6.82, 7.12, "rasa"],
  [7.12, 7.54, "sihat"],
  [7.54, 7.84, "tak"],
  [7.84, 8.44, "semestinya"],
  [8.44, 9.02, "bacaan"],
  [9.02, 9.2, "awak"],
  [9.2, 9.38, "tu"],
  [9.38, 10.08, "okey."],
  [10.24, 10.38, "Kalau"],
  [10.38, 10.64, "nak"],
  [10.64, 10.96, "check,"],
  [11.24, 11.42, "ukur"],
  [11.42, 11.68, "dengan"],
  [11.68, 11.94, "cara"],
  [11.94, 12.14, "yang"],
  [12.14, 12.58, "betul"],
  [12.58, 12.96, "ikut"],
  [12.96, 13.56, "arahan"],
  [13.65, 14.75, "device"],
  [14.75, 15.33, "masing-masing"],
  [15.33, 15.57, "dan"],
  [15.57, 15.89, "tanya"],
  [15.89, 16.11, "kalau"],
  [16.11, 16.33, "tak"],
  [16.33, 16.73, "pasti."],
  [17.11, 17.31, "Kalau"],
  [17.31, 17.71, "bacaan"],
  [17.71, 17.81, "tu"],
  [17.81, 18.11, "nampak"],
  [18.11, 18.53, "tinggi,"],
  [18.81, 18.91, "jangan"],
  [18.91, 19.33, "panik"],
  [19.33, 19.57, "dan"],
  [19.57, 19.89, "jangan"],
  [19.89, 21.13, "self-diagnose."],
  [21.23, 21.57, "Ulang"],
  [21.57, 21.83, "balik"],
  [21.83, 22.61, "bacaan"],
  [22.61, 22.75, "tu"],
  [22.75, 23.05, "lepas"],
  [23.05, 23.21, "tu"],
  [23.21, 23.61, "bincang"],
  [23.61, 23.71, "dengan"],
  [23.71, 24.05, "doktor"],
  [24.05, 24.35, "ataupun"],
  [24.35, 25.57, "pharmacist."],
  [25.93, 26.21, "Makan,"],
  [26.37, 27.05, "aktiviti,"],
  [27.35, 27.55, "tidur"],
  [27.55, 27.85, "memang"],
  [27.85, 28.33, "relevan"],
  [28.33, 28.73, "tapi"],
  [28.75, 29.19, "itu"],
  [29.19, 29.55, "hanyalah"],
  [29.55, 30.15, "sebahagian"],
  [30.15, 30.41, "daripada"],
  [30.41, 31.13, "cerita."],
  [31.25, 31.41, "Kalau"],
  [31.41, 31.65, "dah"],
  [31.65, 31.97, "lama"],
  [31.97, 32.27, "tak"],
  [32.27, 32.57, "check,"],
  [32.57, 33.11, "anggap"],
  [33.11, 33.37, "this"],
  [33.37, 33.81, "is"],
  [33.81, 33.99, "a"],
  [33.99, 34.29, "reminder"],
  [34.29, 34.59, "from"],
  [34.59, 34.81, "your"],
  [34.81, 35.13, "friendly"],
  [35.13, 35.99, "pharmacist."],
  [36.27, 36.29, "Share"],
  [36.29, 36.47, "dengan"],
  [36.47, 36.61, "orang"],
  [36.61, 36.71, "yang"],
  [36.71, 36.79, "awak"],
  [36.79, 37.31, "sayang,"],
  [37.45, 37.55, "mak"],
  [37.55, 37.83, "ayah"],
  [37.83, 38.29, "ataupun"],
  [38.29, 38.57, "your"],
  [38.57, 38.93, "partner."],
];

const Monitor: React.FC = () => (
  <svg viewBox="0 0 200 150" width={230} height={172}>
    <rect
      x={10}
      y={10}
      width={120}
      height={130}
      rx={16}
      fill="#fff"
      stroke={C.ink}
      strokeWidth={7}
    />
    <rect x={26} y={26} width={88} height={52} rx={6} fill="#DDEBE1" />
    <text
      x={70}
      y={62}
      textAnchor="middle"
      fontSize={30}
      fontWeight={800}
      fill={C.ink}
      fontFamily="Poppins, sans-serif"
    >
      ? ? ?
    </text>
    <circle cx={70} cy={108} r={14} fill={C.marker} />
    <path
      d="M 130 90 Q 175 90 175 60 Q 175 30 150 30"
      fill="none"
      stroke={C.inkSoft}
      strokeWidth={7}
      strokeLinecap="round"
    />
    <rect
      x={140}
      y={18}
      width={40}
      height={30}
      rx={8}
      fill={C.gold}
      stroke={C.ink}
      strokeWidth={5}
    />
  </svg>
);

const Struck: React.FC<{ at: number; children: React.ReactNode }> = ({
  at,
  children,
}) => (
  <Pop delay={f(at)} rotate={-1.5}>
    <span
      style={{
        position: "relative",
        display: "inline-block",
        fontSize: 40,
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

const Dark: React.FC<{ at: number; children: React.ReactNode }> = ({
  at,
  children,
}) => (
  <Pop delay={f(at)} rotate={-1.5}>
    <div
      style={{
        background: C.ink,
        color: C.paper,
        borderRadius: 18,
        padding: "12px 26px",
        fontSize: 42,
        fontWeight: 800,
        textAlign: "center",
        ...OVER_VIDEO,
      }}
    >
      {children}
    </div>
  </Pop>
);

const Lower: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 5.3) return null;
  if (t < 6.7)
    return (
      <div
        style={{
          background: "rgba(247,245,237,0.92)",
          borderRadius: 18,
          padding: "6px 10px",
        }}
      >
        <BoxStamp delay={f(5.4)} rotate={-4} size={60}>
          BOLEH TIADA SIMPTOM
        </BoxStamp>
      </div>
    );
  if (t < 10.2)
    return (
      <Dark at={7.12}>
        RASA SIHAT <span style={{ color: C.gold }}>≠</span> BACAAN OKAY
      </Dark>
    );
  if (t < 17.0)
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Pop delay={f(10.64)} rotate={-4}>
          <Monitor />
        </Pop>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Dark at={11.24}>UKUR DENGAN BETUL</Dark>
          <div style={{ display: "flex", gap: 8 }}>
            <Chip delay={f(12.58)} rotate={-2} size={30}>
              ikut arahan alat
            </Chip>
            <Chip delay={f(15.57)} rotate={2} size={30}>
              tanya kalau tak pasti
            </Chip>
          </div>
        </div>
      </div>
    );
  if (t < 23.1)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <Struck at={18.81}>panik</Struck>
          <Struck at={19.57}>self-diagnose</Struck>
        </div>
        <Pop delay={f(21.23)} rotate={1.5}>
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
            <Mark kind="check" delay={f(21.23) + 6} size={38} /> ulang ukur
          </span>
        </Pop>
      </div>
    );
  if (t < 25.8)
    return (
      <Dark at={23.21}>
        BINCANG DENGAN <span style={{ color: C.gold }}>PROFESIONAL</span>
      </Dark>
    );
  if (t < 31.2)
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
          <Chip delay={f(25.93)} rotate={-2} size={38}>
            makan
          </Chip>
          <Chip delay={f(26.37)} rotate={2} size={38}>
            aktiviti
          </Chip>
          <Chip delay={f(27.35)} rotate={-2} size={38}>
            tidur
          </Chip>
        </div>
        <Pop delay={f(29.55)}>
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
            relevan, tapi sebahagian cerita je
          </div>
        </Pop>
      </div>
    );
  if (t < 36.2)
    return (
      <Pop delay={f(33.99)} rotate={-1}>
        <Card
          style={{ padding: "16px 28px", textAlign: "center", ...OVER_VIDEO }}
        >
          <div style={{ fontSize: 32, fontWeight: 700, color: C.inkSoft }}>
            dah lama tak check?
          </div>
          <div style={{ fontSize: 42, fontWeight: 800 }}>
            ni <Highlight delay={f(34.3)}>reminder</Highlight> daripada
            pharmacist 💊
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
        transform: "translateX(-50%) scale(0.78)",
        transformOrigin: "top center",
      }}
    >
      <CtaPill icon="share" delay={f(36.27)}>
        Share dengan orang yang awak sayang
      </CtaPill>
    </div>
  );
};

export const R1510_BP_REAL_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: (
      <>
        <FaceCamOpener
          clip={CLIP}
          hook={
            <>
              RASA SIHAT.{" "}
              <span style={{ color: C.marker }}>
                BILA LAST CHECK TEKANAN DARAH?
              </span>
            </>
          }
          hookSize={52}
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
      [f(5.4), "stamp", 0.4],
      [f(7.12), "pop", 0.3],
      [f(11.24), "pop", 0.3],
      [f(19.57) + 10, "scribble", 0.35],
      [f(23.21), "pop", 0.3],
      [f(36.27), "pop", 0.3],
    ],
  },
];
