// Reel 2 (15/10) "Tak Sempat Gym? Movement Yang Muat" — full talk, Notion 📅 15/10/2026 — Prevention dan Sempadan, IG REEL 2.
// Hook card = Notion cover; overlays = Notion list (TAK SEMPAT GYM · MOVEMENT KECIL · BOLEH ULANG · IKUT HAD DIRI); end pill
// = Notion CTA. Guardrail: no cure or weight-loss claim (Coach says so on camera). Laid out inside SAFE.
// Media (local only, gitignored):
//   public/clips/R1510b-full.mp4   one Teleprompter take (13/10 22:39:42) split in three by the app, joined, 46.2s;
//                                  take 1 cut after "Jadi" and take 3 after its repeated "sikit".
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Mark, Pop, Strike } from "../kit";
import { SceneDef } from "../Reel";
import { Chip, CtaPill, SAFE } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";

const CLIP = "clips/R1510b-full.mp4";
const CLIP_LEN = 1386;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const WORDS: Word[] = [
  [0.0, 0.48, "Health"],
  [0.48, 0.7, "care"],
  [0.7, 1.16, "profesional"],
  [1.16, 1.42, "yang"],
  [1.42, 1.64, "busy,"],
  [1.84, 1.88, "tak"],
  [1.88, 2.14, "sempat"],
  [2.14, 2.32, "nak"],
  [2.32, 2.54, "pergi"],
  [2.54, 2.9, "gym."],
  [3.36, 3.46, "Kalau"],
  [3.46, 3.7, "saya,"],
  [3.7, 3.9, "saya"],
  [3.9, 4.26, "cari"],
  [4.26, 4.56, "movement"],
  [4.56, 5.12, "yang"],
  [5.12, 5.44, "dapat"],
  [5.44, 5.66, "suit"],
  [5.66, 5.9, "dalam"],
  [5.9, 6.3, "rutin"],
  [6.3, 6.6, "harian"],
  [6.6, 6.94, "saya."],
  [7.28, 7.36, "Bukan"],
  [7.36, 7.56, "sebab"],
  [7.56, 7.74, "gym"],
  [7.74, 7.9, "tak"],
  [7.9, 8.22, "bagus,"],
  [8.3, 8.48, "cuma"],
  [8.48, 8.76, "memang"],
  [8.76, 8.96, "ada"],
  [8.96, 9.26, "hari"],
  [9.26, 9.58, "kerja"],
  [9.58, 9.72, "yang"],
  [9.72, 9.94, "sangat"],
  [9.94, 10.32, "busy"],
  [10.32, 10.64, "balik,"],
  [10.78, 10.78, "dah"],
  [10.78, 11.22, "penat."],
  [11.3, 11.48, "Gym"],
  [11.48, 11.84, "langsung"],
  [11.84, 11.98, "tak"],
  [11.98, 12.12, "dapat"],
  [12.12, 12.26, "nak"],
  [12.26, 12.62, "masuk."],
  [13.06, 13.18, "Jadi"],
  [13.18, 13.42, "soalan"],
  [13.42, 13.64, "saya"],
  [13.64, 14.06, "apa"],
  [14.06, 14.28, "yang"],
  [14.28, 14.58, "kita"],
  [14.58, 14.92, "boleh"],
  [14.92, 15.42, "suit"],
  [15.42, 15.76, "dalam"],
  [15.76, 16.24, "kehidupan"],
  [16.24, 16.98, "seharian."],
  [17.2, 17.36, "Naik"],
  [17.36, 17.72, "tangga"],
  [17.72, 17.92, "kalau"],
  [17.92, 18.12, "tak"],
  [18.12, 18.36, "jauh"],
  [18.36, 18.72, "sangat,"],
  [19.06, 19.22, "jalan"],
  [19.22, 19.52, "sikit"],
  [19.52, 20.0, "sementara"],
  [20.0, 20.16, "nak"],
  [20.16, 20.9, "tunggu,"],
  [21.04, 21.32, "bangun"],
  [21.32, 21.5, "dari"],
  [21.5, 22.08, "kerusi"],
  [22.08, 22.38, "selang"],
  [22.38, 22.94, "masa,"],
  [23.24, 23.46, "kecil"],
  [23.46, 23.6, "je"],
  [23.6, 23.88, "tapi"],
  [23.88, 24.2, "boleh"],
  [24.2, 24.54, "kita"],
  [24.54, 25.08, "ulang."],
  [25.18, 25.46, "Bila"],
  [25.46, 25.72, "kita"],
  [25.72, 25.84, "dah"],
  [25.84, 26.2, "selesa"],
  [26.2, 26.46, "baru"],
  [26.46, 27.08, "tambah"],
  [27.08, 27.68, "activity"],
  [27.68, 28.32, "sikit-sikit."],
  [28.54, 28.7, "Kalau"],
  [28.7, 28.84, "awak"],
  [28.84, 28.96, "ada"],
  [28.96, 29.24, "masalah"],
  [29.24, 29.62, "lutut,"],
  [29.76, 29.96, "jantung"],
  [29.96, 30.16, "atau"],
  [30.16, 30.48, "apa-apa"],
  [30.48, 30.58, "dan"],
  [30.58, 31.26, "lain-lain,"],
  [31.52, 31.62, "follow"],
  [31.62, 31.94, "nasihat"],
  [31.94, 32.28, "doktor"],
  [32.28, 32.5, "dulu"],
  [32.5, 32.8, "tau."],
  [33.36, 33.38, "Movement"],
  [33.38, 33.7, "kecil"],
  [33.7, 33.92, "bukan"],
  [33.92, 34.4, "pengganti"],
  [34.4, 34.86, "rawatan,"],
  [35.32, 35.36, "bukan"],
  [35.36, 35.96, "juga"],
  [35.96, 36.56, "janji"],
  [36.56, 36.78, "nak"],
  [36.78, 37.22, "turun"],
  [37.22, 37.48, "berat"],
  [37.48, 37.68, "terus."],
  [38.2, 38.48, "Tapi"],
  [38.48, 38.78, "it's"],
  [38.78, 38.98, "better"],
  [38.98, 39.24, "daripada"],
  [39.24, 39.6, "tunggu"],
  [39.6, 39.86, "masa"],
  [39.86, 40.08, "yang"],
  [40.08, 40.36, "perfect"],
  [40.36, 40.6, "untuk"],
  [40.6, 40.82, "buat"],
  [40.82, 41.18, "sesuatu"],
  [41.18, 41.4, "yang"],
  [41.4, 41.72, "perfect."],
  [42.16, 42.5, "Esok"],
  [42.5, 42.62, "awak"],
  [42.62, 42.82, "boleh"],
  [42.82, 43.04, "buat"],
  [43.04, 43.36, "movement"],
  [43.36, 43.68, "apa?"],
  [43.94, 44.08, "Komen"],
  [44.08, 44.26, "kat"],
  [44.26, 44.5, "bawah"],
  [44.5, 44.64, "dan"],
  [44.64, 44.82, "kita"],
  [44.82, 44.92, "buat"],
  [44.92, 45.44, "sama-sama."],
];

const Stairs: React.FC = () => (
  <svg viewBox="0 0 120 100" width={110} height={92}>
    <path
      d="M 10 90 H 40 V 66 H 64 V 42 H 88 V 18 H 112"
      fill="none"
      stroke={C.ink}
      strokeWidth={9}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <circle cx={58} cy={20} r={8} fill={C.marker} />
    <path
      d="M 58 28 L 54 46 L 64 56 M 54 46 L 46 58 M 56 34 L 68 40"
      stroke={C.marker}
      strokeWidth={6}
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
const Walk: React.FC = () => (
  <svg viewBox="0 0 100 100" width={92} height={92}>
    <circle cx={52} cy={14} r={10} fill={C.marker} />
    <path
      d="M 52 26 L 46 56 L 60 74 L 58 94 M 46 56 L 34 76 L 22 90 M 50 34 L 66 46 M 50 34 L 34 44"
      stroke={C.ink}
      strokeWidth={8}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
const Chair: React.FC = () => (
  <svg viewBox="0 0 100 100" width={92} height={92}>
    <path
      d="M 24 10 V 60 H 76 V 94 M 24 60 V 94 M 24 40 H 70"
      stroke={C.ink}
      strokeWidth={8}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M 84 30 V 6 M 74 16 L 84 6 L 94 16"
      stroke={C.marker}
      strokeWidth={7}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const IdeaCard: React.FC<{
  at: number;
  Icon: React.FC;
  label: string;
  rot: number;
}> = ({ at, Icon, label, rot }) => (
  <Pop delay={f(at)} rotate={rot}>
    <Card
      style={{
        width: 240,
        padding: "12px 10px",
        textAlign: "center",
        ...OVER_VIDEO,
      }}
    >
      <Icon />
      <div style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.15 }}>
        {label}
      </div>
    </Card>
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
  if (t < 1.8) return null;
  if (t < 7.2)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Dark at={1.88}>TAK SEMPAT GYM</Dark>
        <Chip delay={f(4.26)} rotate={2} size={34}>
          cari movement yang muat rutin harian
        </Chip>
      </div>
    );
  if (t < 13.0)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Pop delay={f(7.56)} rotate={-1.5}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 36,
              fontWeight: 800,
              padding: "8px 22px",
              borderRadius: 16,
              background: C.card,
              ...OVER_VIDEO,
            }}
          >
            <Mark kind="check" delay={f(7.9)} size={34} /> gym memang bagus
          </span>
        </Pop>
        <Chip delay={f(8.96)} rotate={2} size={34}>
          tapi hari kerja busy, balik dah penat
        </Chip>
      </div>
    );
  if (t < 23.1)
    return (
      <div style={{ display: "flex", gap: 14 }}>
        <IdeaCard at={17.2} Icon={Stairs} label="naik tangga" rot={-3} />
        <IdeaCard
          at={19.06}
          Icon={Walk}
          label="jalan sementara tunggu"
          rot={2}
        />
        <IdeaCard at={21.04} Icon={Chair} label="bangun dari kerusi" rot={-2} />
      </div>
    );
  if (t < 28.4)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Dark at={23.24}>
          MOVEMENT KECIL · <span style={{ color: C.gold }}>BOLEH ULANG</span>
        </Dark>
        <Chip delay={f(25.84)} rotate={2} size={34}>
          dah selesa? tambah sikit-sikit
        </Chip>
      </div>
    );
  if (t < 33.3)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Dark at={28.96}>IKUT HAD DIRI</Dark>
        <Chip delay={f(31.52)} rotate={2} size={34}>
          lutut, jantung… ikut nasihat doktor dulu
        </Chip>
      </div>
    );
  if (t < 38.1)
    return (
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {(
          [
            ["pengganti rawatan", 33.92],
            ["janji turun berat terus", 35.96],
          ] as [string, number][]
        ).map(([x, at]) => (
          <Pop key={x} delay={f(at)} rotate={-1.5}>
            <span
              style={{
                position: "relative",
                display: "inline-block",
                fontSize: 36,
                fontWeight: 800,
                padding: "10px 22px",
                borderRadius: 16,
                background: C.card,
                color: C.inkSoft,
                ...OVER_VIDEO,
              }}
            >
              bukan {x}
              <Strike delay={f(at) + 12} width={5} />
            </span>
          </Pop>
        ))}
      </div>
    );
  if (t < 43.9)
    return (
      <Pop delay={f(38.78)} rotate={-1}>
        <Card
          style={{
            padding: "14px 28px",
            fontSize: 40,
            fontWeight: 800,
            textAlign: "center",
            ...OVER_VIDEO,
          }}
        >
          lagi baik daripada tunggu masa yang perfect
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
      <CtaPill icon="comment" delay={f(43.94)}>
        Comment 1 movement untuk esok
      </CtaPill>
    </div>
  );
};

export const R1510_MOVE_REAL_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: (
      <>
        <FaceCamOpener
          clip={CLIP}
          hook={
            <>
              TAK SEMPAT GYM?{" "}
              <span style={{ color: C.marker }}>CARI MOVEMENT YANG MUAT</span>
            </>
          }
          hookSize={54}
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
      [f(1.88), "pop", 0.3],
      [f(17.2), "pop", 0.3],
      [f(19.06), "pop", 0.3],
      [f(21.04), "pop", 0.3],
      [f(23.24), "pop", 0.3],
      [f(28.96), "pop", 0.3],
      [f(43.94), "pop", 0.3],
    ],
  },
];
