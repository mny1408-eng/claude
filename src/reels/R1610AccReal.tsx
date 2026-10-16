// Reel 2 (16/10) "Beli Makanan Sihat = Jadi Accountant?" — full talk, Notion 📅 16/10/2026 — World Food Day: Makan Sihat Bajet,
// IG REEL 2. Hook card = Notion cover; overlays = Notion list (BELI MAKANAN SIHAT = JADI ACCOUNTANT · HEALING PUN PERLU ·
// TETAPKAN KEUTAMAAN · BAJET YANG REALISTIK); end pill = Notion CTA (Share). Guardrail: no RM amounts, no shaming, no product.
// Media (local only, gitignored):
//   public/clips/R1610-acc-full.mp4   one Teleprompter take (16/10 14:13:15) split in three by the app, joined, 36.1s;
//                                     take 3 starts after its repeated "murah".
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Mark, Pop } from "../kit";
import { SceneDef } from "../Reel";
import { Chip, CtaPill, SAFE } from "./formats/common";
import { Captions, Word } from "./formats/Captions";
import { FaceCamOpener, LowerBand, OVER_VIDEO } from "./formats/FaceCamOpener";

const CLIP = "clips/R1610-acc-full.mp4";
const CLIP_LEN = 1083;
const ZOOM = 1.12; // with LowerBand: crops the lower chest out of frame (Coach Nas, 16/10)
const END = 75; // frozen last frame + share pill
const f = (sec: number) => Math.round(sec * FPS) - 3;

// Whisper medium on the joined take; "kereta" → "kalkulator" (the scripted word), "akuntan" → "accountant".
const WORDS: Word[] = [
  [0.0, 0.32, "Bila"], [0.32, 0.46, "nak"], [0.46, 0.62, "beli"], [0.62, 0.98, "makanan"], [0.98, 1.24, "sihat"], [1.24, 1.42, "kan,"],
  [1.48, 1.58, "tiba-tiba"], [1.74, 2.3, "semua"], [2.3, 2.52, "jadi"], [2.52, 3.1, "accountant."],
  [3.62, 4.0, "Bila"], [4.0, 4.52, "healing,"], [4.98, 5.22, "tiba-tiba"], [5.22, 5.5, "kalkulator"], [5.5, 6.0, "hilang"], [6.0, 6.2, "kan."],
  [6.66, 6.8, "Saya"], [6.8, 6.96, "bukan"], [6.96, 7.12, "nak"], [7.12, 7.28, "tegur"], [7.28, 7.72, "siapa-siapa"], [7.72, 8.0, "tau."],
  [8.14, 8.6, "Healing"], [8.6, 8.92, "pun"], [8.92, 9.3, "perlu,"], [9.54, 9.68, "kita"], [9.68, 9.9, "semua"], [9.9, 10.2, "perlukan"], [10.2, 10.7, "rehat."],
  [10.84, 11.26, "Cuma"], [11.26, 11.74, "kadang-kadang"], [11.74, 12.14, "kelakar"], [12.14, 12.36, "sikit"], [12.36, 12.54, "lah"], [12.54, 12.9, "bila"], [12.9, 13.3, "kita"], [13.3, 13.82, "kira"], [13.82, 14.12, "satu"], [14.12, 14.42, "benda"], [14.42, 14.8, "tu"],
  [15.04, 15.5, "teliti"], [15.5, 15.82, "sangat"], [15.82, 16.16, "bila"], [16.16, 16.62, "melibatkan"], [16.62, 17.1, "kesihatan"], [17.1, 17.38, "kita"], [17.38, 17.54, "kan,"],
  [17.54, 17.74, "tapi"], [17.74, 18.02, "benda"], [18.02, 18.1, "lain"], [18.1, 18.28, "tak"], [18.28, 18.5, "kira"], [18.5, 19.0, "langsung."],
  [19.36, 19.86, "So,"], [20.08, 20.16, "makanan"], [20.16, 20.36, "sihat"], [20.36, 20.52, "tu"], [20.52, 20.74, "bukan"], [20.74, 20.94, "kena"], [20.94, 21.32, "mahal,"], [21.32, 21.62, "and"], [21.62, 21.88, "bukan"], [21.88, 22.2, "juga"], [22.2, 22.66, "kena"], [22.66, 23.2, "murah."],
  [23.38, 23.7, "Cuma"], [23.7, 23.94, "tanya"], [23.94, 24.18, "diri"], [24.18, 24.68, "sendiri,"], [24.98, 25.16, "minggu"], [25.16, 25.32, "ni"], [25.32, 25.56, "apa"], [25.56, 25.72, "yang"], [25.72, 25.92, "paling"], [25.92, 26.44, "penting"], [26.44, 26.8, "untuk"], [26.8, 27.2, "saya?"],
  [27.3, 28.0, "Pilih"], [28.0, 28.36, "beberapa"], [28.36, 28.88, "pilihan"], [28.88, 29.06, "yang"], [29.06, 29.42, "betul-betul"], [29.42, 29.78, "penting,"], [29.92, 30.12, "lepas"], [30.12, 30.24, "tu"], [30.24, 30.4, "buat"], [30.4, 30.74, "budget"], [30.74, 30.96, "yang"], [30.96, 31.6, "realistik."],
  [31.82, 32.16, "Healing"], [32.16, 32.44, "ada"], [32.44, 32.84, "tempat"], [32.84, 33.06, "dia,"], [33.36, 33.56, "makanan"], [33.56, 33.82, "sihat"], [33.82, 34.06, "pun"], [34.06, 34.32, "ada"], [34.32, 34.64, "tempat"], [34.64, 34.8, "dia"], [34.8, 35.02, "dalam"], [35.02, 35.48, "kehidupan"], [35.48, 35.72, "kita."],
];

const Calc: React.FC<{ size?: number }> = ({ size = 70 }) => (
  <svg viewBox="0 0 80 100" width={size * 0.8} height={size}>
    <rect x={4} y={4} width={72} height={92} rx={12} fill={C.ink} />
    <rect x={14} y={14} width={52} height={20} rx={4} fill={C.gold} />
    {[0, 1, 2].map((r) =>
      [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={14 + c * 18} y={44 + r * 16} width={14} height={11} rx={3} fill={r === 2 && c === 2 ? C.marker : "#E7E3D4"} />),
    )}
  </svg>
);

const Dark: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => (
  <Pop delay={f(at)} rotate={-1.5}>
    <div style={{ background: C.ink, color: C.paper, borderRadius: 18, padding: "12px 26px", fontSize: 42, fontWeight: 800, textAlign: "center", display: "flex", alignItems: "center", gap: 16, whiteSpace: "nowrap", ...OVER_VIDEO }}>
      {children}
    </div>
  </Pop>
);

const Col: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>{children}</div>
);

// the calculator that vanishes when "healing" comes up
const Vanish: React.FC<{ at: number }> = ({ at }) => {
  const t = useCurrentFrame() / FPS;
  const p = Math.max(0, Math.min(1, (t - at) / 0.5));
  return (
    <div style={{ opacity: 1 - p, transform: `translateY(${-p * 40}px) rotate(${p * 25}deg) scale(${1 - p * 0.4})` }}>
      <Calc size={64} />
    </div>
  );
};

const Lower: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 1.5) return null;
  if (t < 3.6)
    return (
      <Dark at={1.6}>
        <Calc size={56} /> semua jadi <span style={{ color: C.gold }}>ACCOUNTANT</span>
      </Dark>
    );
  if (t < 6.4)
    return (
      <Dark at={3.7}>
        HEALING? <Vanish at={5.3} /> <span style={{ color: C.gold }}>kalkulator hilang</span>
      </Dark>
    );
  if (t < 8.1)
    return (
      <Chip delay={f(6.66)} rotate={1.5} size={38}>
        bukan nak tegur sesiapa 🙏
      </Chip>
    );
  if (t < 10.84)
    return (
      <Col>
        <Dark at={8.14}>HEALING PUN PERLU</Dark>
        <Chip delay={f(9.9)} rotate={2} size={34}>
          kita semua perlukan rehat
        </Chip>
      </Col>
    );
  if (t < 19.36)
    return (
      <div style={{ display: "flex", gap: 14 }}>
        <Pop delay={f(13.3)} rotate={-2}>
          <Card style={{ width: 360, padding: "14px 16px", textAlign: "center", ...OVER_VIDEO }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Calc size={56} />
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15, marginTop: 6 }}>kesihatan: kira teliti</div>
          </Card>
        </Pop>
        <Pop delay={f(17.74)} rotate={2}>
          <Card style={{ width: 360, padding: "14px 16px", textAlign: "center", ...OVER_VIDEO }}>
            <div style={{ fontSize: 52, lineHeight: 1.1 }}>🤷</div>
            <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.15, marginTop: 6 }}>benda lain: tak kira langsung</div>
          </Card>
        </Pop>
      </div>
    );
  if (t < 23.38)
    return (
      <Col>
        <Chip delay={f(20.52)} rotate={-1.5} size={38}>
          tak semestinya mahal
        </Chip>
        <Chip delay={f(21.62)} rotate={1.5} size={38}>
          tak semestinya murah
        </Chip>
      </Col>
    );
  if (t < 27.3)
    return (
      <Col>
        <Dark at={23.38}>TETAPKAN KEUTAMAAN</Dark>
        <Chip delay={f(24.98)} rotate={2} size={34}>
          minggu ni, apa paling penting untuk saya?
        </Chip>
      </Col>
    );
  if (t < 31.82)
    return (
      <Col>
        <Pop delay={f(27.3)} rotate={-1}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 34, fontWeight: 800, padding: "8px 22px", borderRadius: 16, background: C.card, ...OVER_VIDEO }}>
            <Mark kind="check" delay={f(27.6)} size={32} /> pilih yang betul-betul penting
          </span>
        </Pop>
        <Dark at={30.24}>
          <Calc size={50} /> BAJET YANG REALISTIK
        </Dark>
      </Col>
    );
  return (
    <Col>
      <Chip delay={f(31.82)} rotate={-1.5} size={36}>
        healing ada tempat dia
      </Chip>
      <Chip delay={f(33.36)} rotate={1.5} size={36}>
        makanan sihat pun ada tempat dia
      </Chip>
    </Col>
  );
};

const Hook = (
  <>
    BELI MAKANAN SIHAT = <span style={{ color: C.marker }}>JADI ACCOUNTANT?</span>
  </>
);

const End: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(CLIP)} muted startFrom={CLIP_LEN - 10} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${ZOOM})`, transformOrigin: "50% 0%" }} />
    <AbsoluteFill style={{ background: "rgba(23,60,48,0.35)" }} />
    <LowerBand />
    <div style={{ position: "absolute", top: 1180, left: SAFE.left, right: SAFE.right, display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      <div style={{ transform: "scale(0.85)" }}>
        <CtaPill icon="share" delay={2}>
          Share dengan kawan
        </CtaPill>
      </div>
      <Chip delay={10} rotate={-1.5} size={38}>
        yang tiba-tiba jadi accountant 🧮
      </Chip>
    </div>
  </AbsoluteFill>
);

export const R1610_ACC_REAL_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: (
      <>
        <FaceCamOpener clip={CLIP} hook={Hook} hookSize={54} zoom={ZOOM} />
        <LowerBand />
        <div style={{ position: "absolute", top: 1335, left: SAFE.left, right: SAFE.right, display: "flex", justifyContent: "center" }}>
          <Lower />
        </div>
        <Captions words={WORDS} top={1100} size={58} left={SAFE.left} right={SAFE.right} />
      </>
    ),
    cues: [
      [f(1.6), "pop", 0.3],
      [f(5.3), "whoosh", 0.3],
      [f(8.14), "pop", 0.3],
      [f(13.3), "pop", 0.3],
      [f(17.74), "pop", 0.3],
      [f(23.38), "pop", 0.3],
      [f(30.24), "pop", 0.3],
    ],
  },
  { id: "end", dur: END, el: <End />, cues: [[2, "pop", 0.35], [12, "chime", 0.3]] },
];
