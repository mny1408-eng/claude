// T2 Trial Reel — "4 Soalan Sebelum Ikut Satu Diet Rule" (01/10/2026)
// Source: Notion 📅 01/10/2026 — Clinical Pharmacist Lens, PM carousel (7 slides) + caption. QA reviewed 27/09.
// Style: Rx / prescription-label (docs/video-style-rotation.md: "Only a pharmacist can own this look.
// Make clear it's a metaphor"). Premium Clinical family; no pills or medical-treatment imagery.
import React from "react";
import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, HAND } from "../theme";
import { Card, Highlight, Line, Mark, Note, Pop, Stamp, Underline } from "../kit";
import { SceneDef } from "../Reel";

const Stack: React.FC<{ top: number; children: React.ReactNode; gap?: number }> = ({ top, children, gap = 10 }) => (
  <div style={{ position: "absolute", top, left: 80, right: 80, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap }}>
    {children}
  </div>
);

// Rubber stamp with a border, like a pharmacy "checked" stamp.
const BoxStamp: React.FC<{ children: React.ReactNode; delay?: number; rotate?: number; size?: number }> = ({ children, delay = 0, rotate = -6, size = 92 }) => (
  <Stamp delay={delay} rotate={rotate}>
    <div
      style={{
        border: `8px solid ${C.marker}`,
        borderRadius: 14,
        padding: "14px 34px",
        color: C.marker,
        fontSize: size,
        fontWeight: 800,
        letterSpacing: 2,
        lineHeight: 1.05,
        textAlign: "center",
        opacity: 0.92,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  </Stamp>
);

// ---------- 1. Hook: a viral rule, stamped ----------
const Blank: React.FC = () => (
  <span style={{ display: "inline-block", width: 100, height: 8, background: C.ink, verticalAlign: "baseline", margin: "0 6px" }} />
);

const ViralPost: React.FC = () => (
  <Card style={{ width: 760, padding: "34px 40px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 26 }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#E4DFD1" }} />
      <div>
        <div style={{ width: 220, height: 18, borderRadius: 9, background: "#E4DFD1", marginBottom: 10 }} />
        <div style={{ width: 140, height: 14, borderRadius: 7, background: "#EEEAE0" }} />
      </div>
    </div>
    <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.1, color: C.ink, whiteSpace: "nowrap" }}>
      “JANGAN MAKAN <Blank />
      <br />
      LEPAS <Blank />!”
    </div>
    <div style={{ display: "flex", gap: 14, marginTop: 26 }}>
      {[260, 180, 120].map((w, i) => (
        <div key={i} style={{ width: w, height: 16, borderRadius: 8, background: "#EEEAE0" }} />
      ))}
    </div>
  </Card>
);

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={300}>
      <Line size={70} weight={700}>
        Nampak satu <Highlight delay={10}>diet rule</Highlight> online?
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 520, left: 160 }}>
      <Pop delay={4} rotate={-2}>
        <ViralPost />
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 930, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <BoxStamp delay={30} rotate={-7}>
        JANGAN
        <br />
        TERUS IKUT.
      </BoxStamp>
    </div>
  </AbsoluteFill>
);

// ---------- Rx label (persists through the checks) ----------
const CHECKS = [
  { key: "Evidence", q: "Apa evidence sebenar di belakang rule ni?", sub: "Testimonial bukan sama dengan bukti." },
  { key: "Sesuai", q: "Sesuai tak dengan keadaan dan goal aku?", sub: "Context individu matters." },
  { key: "Sustain", q: "Boleh sustain dalam real life?", sub: "Shift, family, budget dan makan luar tetap wujud." },
  { key: "Gantikan", q: "Apa yang rule ni gantikan?", sub: "Bila buang sesuatu, apa masuk tempatnya?" },
];

const RxLabel: React.FC<{ enter: boolean; active: number; tickAt: number[] }> = ({ enter, active, tickAt }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = enter ? spring({ frame: f - 4, fps, config: { damping: 13, stiffness: 150 } }) : 1;
  return (
    <div
      style={{
        position: "absolute",
        top: 370,
        left: 110,
        width: 860,
        opacity: enter && f < 4 ? 0 : 1,
        transform: `translateY(${(1 - s) * 260}px) rotate(${interpolate(s, [0, 1], [4, -1.5])}deg)`,
      }}
    >
      <div style={{ background: C.card, borderRadius: 16, overflow: "hidden", boxShadow: "0 16px 40px rgba(40,40,20,0.18), 0 2px 6px rgba(40,40,20,0.1)" }}>
        <div style={{ background: C.ink, color: C.paper, padding: "22px 36px", display: "flex", alignItems: "baseline", gap: 20 }}>
          <span style={{ fontSize: 72, fontWeight: 800, fontStyle: "italic", lineHeight: 1 }}>
            R<span style={{ fontSize: 44 }}>x</span>
          </span>
          <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: 4 }}>SEMAKAN · DIET RULE</span>
        </div>
        <div style={{ padding: "22px 36px 10px", borderBottom: "3px dashed #E4DFD1", display: "flex", alignItems: "baseline", gap: 16 }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: C.inkSoft, letterSpacing: 2 }}>RULE:</span>
          <span style={{ fontFamily: HAND, fontWeight: 700, fontSize: 52, color: C.marker }}>“jangan makan ___ lepas ___”</span>
        </div>
        <div style={{ padding: "18px 36px 26px", display: "grid", gridTemplateColumns: "1fr 1fr", rowGap: 18, columnGap: 20 }}>
          {CHECKS.map((c, i) => {
            const on = i === active;
            return (
              <div
                key={c.key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: on ? C.gold : "transparent",
                  transition: "none",
                }}
              >
                <div style={{ width: 54, height: 54, border: `4px solid ${C.ink}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", background: C.card }}>
                  {f >= tickAt[i] && <Mark kind="check" delay={tickAt[i]} size={44} />}
                </div>
                <div style={{ fontSize: 42, fontWeight: 800 }}>
                  <span style={{ color: C.inkSoft, fontWeight: 700 }}>#{i + 1}</span> {c.key}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ marginTop: 14, textAlign: "right", fontSize: 24, fontWeight: 500, color: C.inkSoft, opacity: 0.8 }}>
        *metafora sahaja — bukan preskripsi ubat
      </div>
    </div>
  );
};

// ---------- 2. Intro: the label arrives ----------
const Intro: React.FC = () => (
  <AbsoluteFill>
    <Stack top={236}>
      <Line size={60} weight={700}>
        <Highlight delay={30}>4 soalan</Highlight> sebelum ikut:
      </Line>
    </Stack>
    <RxLabel enter active={-1} tickAt={[1e9, 1e9, 1e9, 1e9]} />
    <Note delay={60} size={70} rotate={-4} style={{ position: "absolute", top: 1000, left: 0, right: 0, textAlign: "center" }}>
      semak dulu, baru ikut.
    </Note>
  </AbsoluteFill>
);

// ---------- 3. The four checks ----------
export const CHECK_DUR = 135;
const TICK_OFFSET = 96; // tick lands after the question has been read

const Checks: React.FC = () => {
  const f = useCurrentFrame();
  const active = Math.min(3, Math.floor(f / CHECK_DUR));
  const tickAt = CHECKS.map((_, i) => i * CHECK_DUR + TICK_OFFSET);
  return (
    <AbsoluteFill>
      <Stack top={236}>
        <Line size={60} weight={700}>
          <Highlight>4 soalan</Highlight> sebelum ikut:
        </Line>
      </Stack>
      <RxLabel enter={false} active={active} tickAt={tickAt} />
      {CHECKS.map((c, i) => (
        <Sequence key={c.key} from={i * CHECK_DUR} durationInFrames={CHECK_DUR} layout="none">
          <Stack top={960} gap={18}>
            <Line size={40} weight={800} color={C.marker} style={{ letterSpacing: 4 }}>
              SOALAN #{i + 1}
            </Line>
            <Line delay={4} size={70} weight={800}>
              {c.q}
            </Line>
            <Line delay={40} size={48} weight={500} color={C.inkSoft}>
              <span style={{ position: "relative" }}>
                {c.sub}
                {c.sub.length <= 30 && <Underline delay={52} />}
              </span>
            </Line>
          </Stack>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

// ---------- 4. Simple vs strict ----------
const Nuance: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 420, left: 90 }}>
      <Pop delay={4} rotate={-2}>
        <Card style={{ width: 900, padding: "44px 50px" }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.15 }}>
            Rule yang <Highlight delay={20}>simple</Highlight>
            <br />
            belum tentu salah.
          </div>
        </Card>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 760, left: 90 }}>
      <Pop delay={40} rotate={1.5}>
        <Card style={{ width: 900, padding: "44px 50px" }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.15 }}>
            Rule yang <Highlight delay={56}>strict</Highlight> belum
            <br />
            tentu lebih bagus.
          </div>
        </Card>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 1130, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <BoxStamp delay={84} rotate={-5} size={78}>
        STRICT ≠ BETTER
      </BoxStamp>
    </div>
  </AbsoluteFill>
);

// ---------- 5. CTA: structure + save ----------
const CTA: React.FC = () => (
  <AbsoluteFill>
    <Stack top={440} gap={6}>
      <Line size={70} weight={600}>Cari structure yang</Line>
      <Line delay={8} size={84} weight={800}>
        <Highlight delay={20}>evidence-informed</Highlight>
      </Line>
      <Line delay={14} size={84} weight={800}>
        & <Highlight delay={30}>practical</Highlight>
      </Line>
      <Line delay={20} size={70} weight={600}>untuk hidup awak.</Line>
    </Stack>
    <div style={{ position: "absolute", top: 1020, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={50}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, background: C.ink, color: C.paper, borderRadius: 999, padding: "24px 50px", fontSize: 50, fontWeight: 800 }}>
          <svg viewBox="0 0 24 30" width={34} height={42}>
            <path d="M 2 2 H 22 V 28 L 12 20 L 2 28 Z" fill={C.gold} />
          </svg>
          Save untuk semak nanti
        </div>
      </Pop>
    </div>
  </AbsoluteFill>
);

export const T2_SCENES: SceneDef[] = [
  { id: "hook", dur: 105, el: <Hook />, cues: [[4, "whoosh", 0.4], [10, "swipe", 0.5], [30, "stamp", 0.85]] },
  { id: "intro", dur: 120, el: <Intro />, cues: [[4, "whoosh", 0.5], [30, "swipe", 0.5], [60, "scribble", 0.35]] },
  {
    id: "checks",
    dur: CHECK_DUR * 4,
    el: <Checks />,
    cues: CHECKS.flatMap((_, i) => {
      const o = i * CHECK_DUR;
      return [
        [o + 2, "pop", 0.45],
        [o + 52, "swipe", 0.35],
        [o + TICK_OFFSET, "tick", 0.6],
      ] as [number, "pop" | "swipe" | "tick", number][];
    }),
  },
  { id: "nuance", dur: 135, el: <Nuance />, cues: [[4, "pop", 0.5], [20, "swipe", 0.45], [40, "pop", 0.5], [56, "swipe", 0.45], [84, "stamp", 0.7]] },
  { id: "cta", dur: 135, el: <CTA />, cues: [[20, "swipe", 0.45], [30, "swipe", 0.45], [50, "pop", 0.55], [54, "chime", 0.45]] },
];
