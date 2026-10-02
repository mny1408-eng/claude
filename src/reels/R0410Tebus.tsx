// Reel 1 — "Ahad Compensate" (04/10/2026)
// Source: Notion 📅 04/10/2026 — Reset + Reflection, 🎥 REEL 1 (hook, teleprompter, overlays, CTA). QA reviewed 27/09.
// Format: Notes app typing (progress-bar reset fits too, but Saturday was already a hook-style format).
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Pop, Underline, progress } from "../kit";
import { useCurrentFrame } from "remotion";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, CtaPill, Stack, Tag } from "./formats/common";
import { NotesApp } from "./formats/NotesApp";

// Frame (within each scene) where each element appears. Defaults = silent version;
// R0410TebusReal passes timings measured from Coach Nas's recording.
export type R0410TebusTiming = {
  notes1: { title: number; lines: number[]; line1: number; pattern: number; hl: number };
  cycle: { line2: number; hl: number; nodes: number[]; arrows: number[]; tag: number };
  notes2: { line2: number; hl: number; card: number; title: number; lines: number[]; checks: number[] };
  close: { line2: number; hl: number; line3: number; line4: number; underline: number; pill: number };
};

export const R0410_TEBUS_SILENT: R0410TebusTiming = {
  notes1: { title: 6, lines: [40, 72, 94, 122], line1: 150, pattern: 158, hl: 168 },
  cycle: { line2: 14, hl: 26, nodes: [44, 68, 92, 116], arrows: [60, 84, 108, 132], tag: 158 },
  notes2: { line2: 12, hl: 30, card: 44, title: 50, lines: [76, 116, 158, 186], checks: [112, 142] },
  close: { line2: 26, hl: 36, line3: 54, line4: 66, underline: 80, pill: 104 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={460} gap={22}>
      <Line size={70} weight={700}>SETIAP AHAD</Line>
      <Line delay={8} size={70} weight={700}>RASA KENA</Line>
      <BoxStamp delay={24} rotate={-5} size={140}>“TEBUS”</BoxStamp>
      <Line delay={40} size={84} weight={800} style={{ marginTop: 10 }}>WEEKEND?</Line>
    </Stack>
  </AbsoluteFill>
);

const NOTES1 = ["makan terlalu sedikit", "skip meal", "exercise extra", "sebab weekend…"];

const Notes1: React.FC<{ t: R0410TebusTiming["notes1"] }> = ({ t }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 300, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={2}>
        <NotesApp title="Setiap Ahad rasa kena" titleAt={t.title} lines={NOTES1.map((text, i) => ({ text, at: t.lines[i], soft: i === 3 }))} />
      </Pop>
    </div>
    <Stack top={1100} gap={8}>
      <Line delay={t.line1} size={60} weight={700}>saya nak awak tengok</Line>
      <Line delay={t.pattern} size={88} weight={800}>
        <Highlight delay={t.hl}>pattern tu.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

// ---------- cycle: four nodes in a loop ----------
const NODES = [
  { text: "restrict", x: 90, y: 620 },
  { text: "terbabas", x: 570, y: 620 },
  { text: "rasa bersalah", x: 570, y: 940 },
  { text: "restrict balik", x: 90, y: 940 },
];
const NODE_W = 420;
const NODE_H = 130;
// arrows between node edges (viewBox = full frame)
const ARROWS = ["M 520 685 L 560 685", "M 780 760 L 780 930", "M 560 1005 L 520 1005", "M 300 930 L 300 760"];

const Arrow: React.FC<{ d: string; at: number }> = ({ d, at }) => {
  const p = progress(useCurrentFrame(), at, 10);
  return <path d={d} fill="none" stroke={C.marker} strokeWidth={9} strokeLinecap="round" markerEnd="url(#head)" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={p > 0 ? 1 : 0} />;
};

const Cycle: React.FC<{ t: R0410TebusTiming["cycle"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={280} gap={8}>
      <Line size={50} weight={600} color={C.inkSoft}>
        Compensation yang extreme
        <br />
        boleh sambung cycle
      </Line>
      <Line delay={t.line2} size={84} weight={800}>
        <Highlight delay={t.hl}>all-or-nothing:</Highlight>
      </Line>
    </Stack>
    {NODES.map((n, i) => (
      <div key={n.text} style={{ position: "absolute", left: n.x, top: n.y }}>
        <Pop delay={t.nodes[i]} rotate={i % 2 ? 1 : -1}>
          <Card style={{ width: NODE_W, height: NODE_H, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 54, fontWeight: 800, whiteSpace: "nowrap" }}>{n.text}</Card>
        </Pop>
      </div>
    ))}
    <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <marker id="head" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
          <path d="M 0 0 L 5 2.5 L 0 5 Z" fill={C.marker} />
        </marker>
      </defs>
      {ARROWS.map((d, i) => (
        <Arrow key={d} d={d} at={t.arrows[i]} />
      ))}
    </svg>
    <div style={{ position: "absolute", top: 1190, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Break the cycle</Tag>
    </div>
  </AbsoluteFill>
);

const NOTES2 = [
  { text: "kembali kepada meal biasa", check: true },
  { text: "dan routine biasa.", check: true },
  { text: "Tak perlu detox.", bold: true },
  { text: "Tak perlu punish.", bold: true },
];

const Notes2: React.FC<{ t: R0410TebusTiming["notes2"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={270} gap={8}>
      <Line size={46} weight={600} color={C.inkSoft}>
        Selepas meal atau weekend
        <br />
        yang lebih flexible,
      </Line>
      <Line delay={t.line2} size={58} weight={800}>
        langkah paling boring selalunya <Highlight delay={t.hl}>paling useful —</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 660, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.card}>
        <NotesApp
          title="Return to normal"
          titleAt={t.title}
          size={48}
          lines={NOTES2.map((l, i) => ({ text: l.text, at: t.lines[i], checkAt: l.check ? t.checks[i] : undefined, bold: l.bold }))}
        />
      </Pop>
    </div>
  </AbsoluteFill>
);

const Close: React.FC<{ t: R0410TebusTiming["close"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={400} gap={22}>
      <Line size={64} weight={700}>Tanya apa yang berlaku,</Line>
      <Line delay={t.line2} size={64} weight={700}>
        ambil <Highlight delay={t.hl}>satu lesson,</Highlight>
      </Line>
      <Line delay={t.line3} size={64} weight={700}>dan masuk minggu baru</Line>
      <Line delay={t.line4} size={74} weight={800}>
        tanpa hutang
        <br />
        <span style={{ position: "relative" }}>
          rasa bersalah.
          <Underline delay={t.underline} width={5} />
        </span>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1080, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="save" delay={t.pill}>Save</CtaPill>
    </div>
  </AbsoluteFill>
);

// Keyboard ticks while a line types itself in (Typed runs at 24 chars/s).
const typing = (from: number, text: string): Cue[] => {
  const out: Cue[] = [];
  for (let f = from; f < from + Math.ceil((text.length / 24) * 30); f += 5) out.push([f, "tick", 0.18]);
  return out;
};

// Scenes after the hook. Lengths default to the silent version.
export const r0410TebusScenes = (t: R0410TebusTiming, dur: Record<string, number> = { notes1: 215, cycle: 215, notes2: 245, close: 165 }): SceneDef[] => [
  {
    id: "notes1",
    dur: dur.notes1,
    el: <Notes1 t={t.notes1} />,
    cues: [[2, "pop", 0.4], ...typing(t.notes1.title, "Setiap Ahad rasa kena"), ...NOTES1.flatMap((l, i) => typing(t.notes1.lines[i], l)), [t.notes1.hl, "swipe", 0.5]],
  },
  {
    id: "cycle",
    dur: dur.cycle,
    el: <Cycle t={t.cycle} />,
    cues: [[t.cycle.hl, "swipe", 0.45], ...t.cycle.nodes.map((f): Cue => [f, "pop", 0.5]), ...t.cycle.arrows.map((f): Cue => [f, "scribble", 0.35]), [t.cycle.tag, "pop", 0.5]],
  },
  {
    id: "notes2",
    dur: dur.notes2,
    el: <Notes2 t={t.notes2} />,
    cues: [
      [t.notes2.hl, "swipe", 0.45],
      [t.notes2.card, "pop", 0.4],
      ...typing(t.notes2.title, "Return to normal"),
      ...NOTES2.flatMap((l, i) => typing(t.notes2.lines[i], l.text)),
      ...t.notes2.checks.map((f): Cue => [f, "tick", 0.6]),
    ],
  },
  { id: "close", dur: dur.close, el: <Close t={t.close} />, cues: [[t.close.hl, "swipe", 0.45], [t.close.underline, "scribble", 0.45], [t.close.pill, "pop", 0.5], [t.close.pill + 4, "chime", 0.45]] },
];

export const R0410_TEBUS_HOOK: SceneDef = { id: "hook", dur: 100, el: <Hook />, cues: [[0, "whoosh", 0.4], [24, "stamp", 0.85]] };

export const R0410_SCENES: SceneDef[] = [R0410_TEBUS_HOOK, ...r0410TebusScenes(R0410_TEBUS_SILENT)];
