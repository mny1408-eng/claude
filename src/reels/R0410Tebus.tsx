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

const Notes1: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 300, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={2}>
        <NotesApp
          title="Setiap Ahad rasa kena"
          lines={[
            { text: "makan terlalu sedikit", at: 40 },
            { text: "skip meal", at: 72 },
            { text: "exercise extra", at: 94 },
            { text: "sebab weekend…", at: 122, soft: true },
          ]}
        />
      </Pop>
    </div>
    <Stack top={1100} gap={8}>
      <Line delay={150} size={60} weight={700}>saya nak awak tengok</Line>
      <Line delay={158} size={88} weight={800}>
        <Highlight delay={168}>pattern tu.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

// ---------- cycle: four nodes in a loop ----------
const NODES = [
  { text: "restrict", x: 90, y: 620, at: 44 },
  { text: "terbabas", x: 570, y: 620, at: 68 },
  { text: "rasa bersalah", x: 570, y: 940, at: 92 },
  { text: "restrict balik", x: 90, y: 940, at: 116 },
];
const NODE_W = 420;
const NODE_H = 130;
// arrows between node edges (viewBox = full frame)
const ARROWS = [
  { d: "M 520 685 L 560 685", at: 60 },
  { d: "M 780 760 L 780 930", at: 84 },
  { d: "M 560 1005 L 520 1005", at: 108 },
  { d: "M 300 930 L 300 760", at: 132 },
];

const Arrow: React.FC<{ d: string; at: number }> = ({ d, at }) => {
  const p = progress(useCurrentFrame(), at, 10);
  return <path d={d} fill="none" stroke={C.marker} strokeWidth={9} strokeLinecap="round" markerEnd="url(#head)" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={p > 0 ? 1 : 0} />;
};

const Cycle: React.FC = () => (
  <AbsoluteFill>
    <Stack top={280} gap={8}>
      <Line size={50} weight={600} color={C.inkSoft}>
        Compensation yang extreme
        <br />
        boleh sambung cycle
      </Line>
      <Line delay={14} size={84} weight={800}>
        <Highlight delay={26}>all-or-nothing:</Highlight>
      </Line>
    </Stack>
    {NODES.map((n, i) => (
      <div key={n.text} style={{ position: "absolute", left: n.x, top: n.y }}>
        <Pop delay={n.at} rotate={i % 2 ? 1 : -1}>
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
      {ARROWS.map((a) => (
        <Arrow key={a.d} {...a} />
      ))}
    </svg>
    <div style={{ position: "absolute", top: 1190, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={158}>Break the cycle</Tag>
    </div>
  </AbsoluteFill>
);

const Notes2: React.FC = () => (
  <AbsoluteFill>
    <Stack top={270} gap={8}>
      <Line size={46} weight={600} color={C.inkSoft}>
        Selepas meal atau weekend
        <br />
        yang lebih flexible,
      </Line>
      <Line delay={12} size={58} weight={800}>
        langkah paling boring selalunya <Highlight delay={30}>paling useful —</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 660, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={44}>
        <NotesApp
          title="Return to normal"
          titleAt={50}
          size={48}
          lines={[
            { text: "kembali kepada meal biasa", at: 76, checkAt: 112 },
            { text: "dan routine biasa.", at: 116, checkAt: 142 },
            { text: "Tak perlu detox.", at: 158, bold: true },
            { text: "Tak perlu punish.", at: 186, bold: true },
          ]}
        />
      </Pop>
    </div>
  </AbsoluteFill>
);

const Close: React.FC = () => (
  <AbsoluteFill>
    <Stack top={400} gap={22}>
      <Line size={64} weight={700}>Tanya apa yang berlaku,</Line>
      <Line delay={26} size={64} weight={700}>
        ambil <Highlight delay={36}>satu lesson,</Highlight>
      </Line>
      <Line delay={54} size={64} weight={700}>dan masuk minggu baru</Line>
      <Line delay={66} size={74} weight={800}>
        tanpa hutang
        <br />
        <span style={{ position: "relative" }}>
          rasa bersalah.
          <Underline delay={80} width={5} />
        </span>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1080, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="save" delay={104}>Save</CtaPill>
    </div>
  </AbsoluteFill>
);

const typing = (from: number, to: number): Cue[] => {
  const out: Cue[] = [];
  for (let f = from; f < to; f += 5) out.push([f, "tick", 0.18]);
  return out;
};

export const R0410_SCENES: SceneDef[] = [
  { id: "hook", dur: 100, el: <Hook />, cues: [[0, "whoosh", 0.4], [24, "stamp", 0.85]] },
  { id: "notes1", dur: 215, el: <Notes1 />, cues: [[2, "pop", 0.4], ...typing(6, 32), ...typing(40, 66), ...typing(72, 84), ...typing(94, 112), ...typing(122, 140), [168, "swipe", 0.5]] },
  { id: "cycle", dur: 215, el: <Cycle />, cues: [[26, "swipe", 0.45], ...NODES.map((n): Cue => [n.at, "pop", 0.5]), ...ARROWS.map((a): Cue => [a.at, "scribble", 0.35]), [158, "pop", 0.5]] },
  { id: "notes2", dur: 245, el: <Notes2 />, cues: [[30, "swipe", 0.45], [44, "pop", 0.4], ...typing(50, 70), ...typing(76, 108), [112, "tick", 0.6], ...typing(116, 138), [142, "tick", 0.6], ...typing(158, 178), ...typing(186, 206)] },
  { id: "close", dur: 165, el: <Close />, cues: [[36, "swipe", 0.45], [80, "scribble", 0.45], [104, "pop", 0.5], [108, "chime", 0.45]] },
];
