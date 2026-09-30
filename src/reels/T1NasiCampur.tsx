// T1 Vox Trial Reel — "Nasi Campur Tak Perlu Jadi Exam" (30/09/2026)
// Source: Notion 📅 30/09/2026 — Nasi Campur Lab (Reel 1 teleprompter + PM carousel), QA reviewed 27/09.
// Design: Editorial Clinical family; layouts Big Hook → Problem → Step-by-Step → Myth/Reality → Big Hook → CTA.
// Copy rule: approved wording only, no nutrition numbers.
import React from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, HAND } from "../theme";
import { Card, HandArrow, HandCircle, Highlight, Line, Mark, Note, Pop, Stamp, Strike, Tape } from "../kit";
import { Bowl, Cup, Drumstick, Greens, Plate, Rice, Tray } from "../food";
import { SceneDef } from "../Reel";

const Stack: React.FC<{ top: number; children: React.ReactNode; gap?: number }> = ({ top, children, gap = 10 }) => (
  <div style={{ position: "absolute", top, left: 80, right: 80, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap }}>
    {children}
  </div>
);

// ---------- 1. Hook (Big Hook / myth) ----------
export const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={560}>
      <Line size={78} weight={700}>Nasi campur:</Line>
      <Line delay={7} size={70} weight={600}>saya tak cari lauk</Line>
      <Stamp delay={14} style={{ marginTop: 40 }}>
        <div style={{ position: "relative", fontSize: 230, fontWeight: 800, letterSpacing: -6, lineHeight: 1, whiteSpace: "nowrap" }}>
          “DIET”
          <Strike delay={34} />
        </div>
      </Stamp>
      <Note delay={50} size={88} rotate={-6} style={{ marginTop: 50 }}>saya cari structure.</Note>
    </Stack>
  </AbsoluteFill>
);

// ---------- 2. Problem → explanation ----------
const TRAYS = ["ayam", "sayur", "kari", "ikan", "telur", "sambal"] as const;

export const Problem: React.FC = () => (
  <AbsoluteFill>
    <Stack top={290} gap={4}>
      <Line size={64} weight={600}>Berdiri lama depan lauk…</Line>
      <Line delay={8} size={64} weight={600}>cari yang kononnya</Line>
      <Line delay={14} size={86} weight={800}>
        <Highlight delay={24}>paling “diet”?</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 660, left: 90, width: 900, display: "grid", gridTemplateColumns: "repeat(3, 270px)", columnGap: 45, rowGap: 34 }}>
      {TRAYS.map((t, i) => (
        <Pop key={t} delay={20 + i * 6} rotate={i % 2 ? 1.5 : -1.5}>
          <Tray kind={t} />
        </Pop>
      ))}
    </div>
    {[
      [230, 600, 52],
      [760, 610, 60],
      [470, 845, 68],
    ].map(([x, y, d], i) => (
      <Note key={i} delay={d} size={110} rotate={i % 2 ? 8 : -8} style={{ position: "absolute", left: x, top: y }}>
        ?
      </Note>
    ))}
    <Stack top={1150} gap={4}>
      <Line delay={100} size={66} weight={600}>Tak perlu lauk “diet”.</Line>
      <Line delay={110} size={92} weight={800}>
        Perlu <Highlight delay={120}>structure</Highlight>.
      </Line>
    </Stack>
  </AbsoluteFill>
);

// ---------- 3. Step-by-step: build the plate ----------
export const STEP_AT = [20, 120, 220];

// Portion slider knob: 0 = zero carb, 1 = penuh pinggan, settles at 0.5.
const knob = (f: number, step3: number) => {
  const l = f - step3;
  const e = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const, easing: Easing.inOut(Easing.cubic) };
  if (l < 55) return interpolate(l, [30, 55], [0, 1], e);
  return interpolate(l, [70, 95], [1, 0.5], e);
};
const riceAmount = (p: number) => (p <= 0.5 ? p * 1.9 : 0.95 + (p - 0.5) * 0.9);

const Drop: React.FC<{ at: number; children: React.ReactNode; style: React.CSSProperties }> = ({ at, children, style }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - at, fps, config: { damping: 13, stiffness: 140 } });
  return (
    <div style={{ position: "absolute", opacity: f < at ? 0 : 1, transform: `translateY(${(1 - s) * -500}px)`, ...style }}>
      {children}
    </div>
  );
};

const StepLabel: React.FC<{ n: number; title: string; sub?: string }> = ({ n, title, sub }) => (
  <Stack top={1110} gap={8}>
    <Line size={76} weight={800}>
      <span
        style={{
          display: "inline-flex",
          width: 84,
          height: 84,
          borderRadius: "50%",
          background: C.ink,
          color: C.paper,
          fontSize: 52,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 22,
          verticalAlign: "middle",
          transform: "translateY(-6px)",
        }}
      >
        {n}
      </span>
      {title}
    </Line>
    {sub && (
      <Line delay={8} size={50} weight={500} color={C.inkSoft}>
        {sub}
      </Line>
    )}
  </Stack>
);

const Slider: React.FC<{ p: number }> = ({ p }) => {
  const W = 820;
  return (
    <div style={{ position: "absolute", top: 1250, left: 130, width: W }}>
      <Pop delay={4}>
        <div style={{ position: "relative", height: 220 }}>
          <div style={{ position: "absolute", top: 34, left: 0, right: 0, height: 12, borderRadius: 6, background: "#E4DFD1" }} />
          <div style={{ position: "absolute", top: 34, left: W * 0.36, width: W * 0.28, height: 12, borderRadius: 6, background: C.gold }} />
          <div
            style={{
              position: "absolute",
              top: 12,
              left: p * W - 28,
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: C.ink,
              boxShadow: "0 6px 14px rgba(23,60,48,0.3)",
            }}
          />
          {[
            { x: 0, label: "zero carb", align: "left" as const, mark: "cross" as const, at: 22 },
            { x: 0.5, label: "ikut keperluan & meal", align: "center" as const, mark: "check" as const, at: 100 },
            { x: 1, label: "penuh pinggan", align: "right" as const, mark: "cross" as const, at: 60 },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                position: "absolute",
                // End labels sit under the track ends; the answer gets its own row under the knob.
                top: m.align === "center" ? 150 : 86,
                left: m.align === "left" ? 0 : m.align === "right" ? undefined : 0,
                right: m.align === "right" ? 0 : m.align === "center" ? 0 : undefined,
                textAlign: m.align,
                fontSize: m.align === "center" ? 48 : 38,
                fontWeight: m.mark === "check" ? 800 : 600,
                color: m.mark === "check" ? C.ink : C.inkSoft,
                display: "flex",
                gap: 8,
                alignItems: "center",
                justifyContent: m.align === "left" ? "flex-start" : m.align === "right" ? "flex-end" : "center",
              }}
            >
              <Mark kind={m.mark} delay={m.at} size={44} />
              {m.mark === "check" ? <Highlight delay={m.at + 2}>{m.label}</Highlight> : m.label}
            </div>
          ))}
        </div>
      </Pop>
    </div>
  );
};

export const PlateBuild: React.FC<{ stepAt?: number[] }> = ({ stepAt = STEP_AT }) => {
  const f = useCurrentFrame();
  const p = knob(f, stepAt[2]);
  return (
    <AbsoluteFill>
      <Stack top={290}>
        <Line size={86} weight={800}>
          <Highlight delay={8}>3 keputusan</Highlight> je.
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 450, left: 240 }}>
        <Pop delay={0} rotate={-2}>
          <Plate size={600}>
            <Tape style={{ top: -18, left: 215, transform: "rotate(-4deg)" }} />
            <Drop at={stepAt[0]} style={{ left: 50, top: 120 }}>
              <div style={{ position: "relative", transform: "rotate(-16deg)" }}>
                <Drumstick width={260} />
                <HandCircle delay={stepAt[0] + 30} />
              </div>
            </Drop>
            <Drop at={stepAt[1]} style={{ left: 330, top: 100 }}>
              <div style={{ position: "relative" }}>
                <Greens width={230} />
                <HandCircle delay={stepAt[1] + 30} />
              </div>
            </Drop>
            <div style={{ position: "absolute", left: 150, top: 330 }}>
              <Rice width={300} amount={riceAmount(p)} />
            </div>
          </Plate>
        </Pop>
      </div>
      <Sequence from={stepAt[0]} durationInFrames={stepAt[1] - stepAt[0]} layout="none">
        <StepLabel n={1} title="Protein" sub="pilih satu sumber yang jelas" />
      </Sequence>
      <Sequence from={stepAt[1]} durationInFrames={stepAt[2] - stepAt[1]} layout="none">
        <StepLabel n={2} title="Sayur" sub="tambah bila ada pilihan yang sesuai" />
      </Sequence>
      <Sequence from={stepAt[2]} layout="none">
        <StepLabel n={3} title="Portion nasi" />
        <Slider p={p} />
      </Sequence>
    </AbsoluteFill>
  );
};

// ---------- 4. Myth → reality: kuah, goreng & extras ----------
const EXTRAS = [
  { label: "Kuah", icon: <Bowl width={120} />, x: 70, y: 560, r: -4 },
  { label: "Bergoreng", icon: <Drumstick width={150} />, x: 430, y: 650, r: 3 },
  { label: "Minuman & extras", icon: <Cup width={80} />, x: 150, y: 870, r: -2 },
];

export const Extras: React.FC = () => (
  <AbsoluteFill>
    <Stack top={300}>
      <Line size={80} weight={800}>Kuah, goreng & extras?</Line>
    </Stack>
    {EXTRAS.map((e, i) => (
      <div key={e.label} style={{ position: "absolute", left: e.x, top: e.y }}>
        <Pop delay={12 + i * 12} rotate={e.r}>
          <Card style={{ padding: "26px 40px", display: "flex", alignItems: "center", gap: 24 }}>
            {e.icon}
            <div style={{ fontSize: 58, fontWeight: 800 }}>{e.label}</div>
          </Card>
        </Pop>
      </div>
    ))}
    <Note delay={100} size={66} rotate={-5} style={{ position: "absolute", top: 1030, right: 90 }}>
      pilih dengan sedar
    </Note>
    <Stack top={1170} gap={6}>
      <Line delay={60} size={68} weight={600}>
        Semua tu <Highlight delay={72}>sebahagian plate</Highlight> —
      </Line>
      <Line delay={78} size={80} weight={800}>bukan makanan ‘haram’.</Line>
    </Stack>
  </AbsoluteFill>
);

// ---------- 5. Big hook: the point ----------
export const Point: React.FC = () => (
  <AbsoluteFill>
    <Stack top={560} gap={0}>
      <Stamp delay={0} rotate={-3}>
        <div style={{ fontSize: 156, fontWeight: 800, letterSpacing: -6, lineHeight: 1 }}>
          <Highlight delay={8}>Repeatable</Highlight>
        </div>
      </Stamp>
      <Line delay={12} size={140} weight={800} color={C.inkSoft} style={{ opacity: 0.55, marginTop: 10 }}>
        &gt; perfect
      </Line>
    </Stack>
    <Stack top={1030} gap={2}>
      <Line delay={36} size={56} weight={600}>Keputusan yang cukup baik,</Line>
      <Line delay={42} size={56} weight={600}>dan boleh diulang</Line>
      <Line delay={48} size={56} weight={700}>walaupun makan luar.</Line>
    </Stack>
  </AbsoluteFill>
);

// ---------- 6. CTA: Scorecard dekat bio ----------
export const CTA: React.FC = () => (
  <AbsoluteFill>
    <Stack top={320} gap={4}>
      <Line size={64} weight={600}>Kalau makan luar selalu</Line>
      <Line delay={6} size={64} weight={600}>buat plan hilang…</Line>
    </Stack>
    <Stack top={560} gap={0}>
      <Stamp delay={24} rotate={-2}>
        <div style={{ fontSize: 124, fontWeight: 800, letterSpacing: -4, lineHeight: 1.05, whiteSpace: "nowrap" }}>
          Cuba Scorecard
          <br />
          <Highlight delay={36}>dekat bio</Highlight>
        </div>
      </Stamp>
    </Stack>
    <div style={{ position: "absolute", top: 930, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={50}>
        <div style={{ border: `4px solid ${C.ink}`, borderRadius: 999, padding: "18px 44px", fontSize: 48, fontWeight: 800 }}>
          Percuma · ±2 minit
        </div>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 1100, left: 170 }}>
      <HandArrow delay={60} rotate={35} />
    </div>
    <Note delay={74} size={74} rotate={-4} style={{ position: "absolute", top: 1150, right: 110, fontFamily: HAND }}>
      save untuk lunch!
    </Note>
  </AbsoluteFill>
);

export const T1_SCENES: SceneDef[] = [
  { id: "hook", dur: 90, el: <Hook />, cues: [[0, "whoosh", 0.35], [14, "stamp", 0.9], [34, "scribble", 0.6], [50, "pop", 0.4]] },
  {
    id: "problem",
    dur: 165,
    el: <Problem />,
    cues: [
      [2, "whoosh", 0.35], [24, "swipe", 0.5],
      ...[0, 1, 2, 3, 4, 5].map((i): [number, "pop", number] => [20 + i * 6, "pop", 0.28]),
      [52, "tick", 0.4], [60, "tick", 0.4], [68, "tick", 0.4],
      [120, "swipe", 0.5],
    ],
  },
  {
    id: "plate",
    dur: 360,
    el: <PlateBuild />,
    cues: [
      [0, "whoosh", 0.45], [8, "swipe", 0.5],
      [20, "whoosh", 0.4], [32, "pop", 0.6], [50, "scribble", 0.5],
      [120, "whoosh", 0.4], [132, "pop", 0.6], [150, "scribble", 0.5],
      [224, "pop", 0.5], [242, "tick", 0.5], [250, "whoosh", 0.35], [280, "tick", 0.5], [290, "whoosh", 0.35], [320, "tick", 0.55], [322, "swipe", 0.5],
    ],
  },
  {
    id: "extras",
    dur: 150,
    el: <Extras />,
    cues: [[12, "pop", 0.5], [24, "pop", 0.5], [36, "pop", 0.5], [72, "swipe", 0.5], [100, "scribble", 0.35]],
  },
  { id: "point", dur: 105, el: <Point />, cues: [[0, "stamp", 0.55], [8, "swipe", 0.5], [12, "pop", 0.4]] },
  {
    id: "cta",
    dur: 150,
    el: <CTA />,
    cues: [[24, "stamp", 0.6], [36, "swipe", 0.5], [50, "pop", 0.55], [54, "chime", 0.45], [60, "scribble", 0.5]],
  },
];
