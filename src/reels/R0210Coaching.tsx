// Reel 2 — "Kenapa Coaching?" (02/10/2026)
// Source: Notion 📅 02/10/2026 — Personal Story × Coaching, 🎥 REEL 2 (hook, teleprompter, overlays, CTA). QA reviewed 27/09.
// Format: kinetic type + process loop. Reel 1 that day is portrait + captions; no format repeats within 7 days
// (docs/video-style-rotation.md). Text from the script only; no outcome or income claims.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike, progress } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, CtaPill, Stack, Tag } from "./formats/common";

// Frame (within each scene) where each element appears, for the scenes after the opener.
// Defaults = silent version; R0210CoachingReal passes timings measured from Coach Nas's recording.
export type R0210CoachingTiming = {
  gap: { knowledge: number; neq: number; execution: number; line: number; hl: number };
  barrier: { line2: number; hl: number; items: number[] };
  loop: { steps: number[]; tags: number };
  close: { strike: number; line2: number; hl: number; line3: number; pill: number; sub: number };
};

export const R0210_COACHING_SILENT: R0210CoachingTiming = {
  gap: { knowledge: 10, neq: 30, execution: 44, line: 70, hl: 82 },
  barrier: { line2: 10, hl: 20, items: [0, 1, 2, 3, 4].map((i) => 40 + i * 24) },
  loop: { steps: [0, 1, 2, 3, 4].map((i) => 40 + i * 26), tags: 190 },
  close: { strike: 24, line2: 44, hl: 58, line3: 76, pill: 110, sub: 122 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={440} gap={14}>
      <Line size={70} weight={700}>DAH TAHU</Line>
      <Line delay={8} size={70} weight={700}>APA NAK MAKAN.</Line>
      <Line delay={22} size={62} weight={700} color={C.inkSoft} style={{ marginTop: 24 }}>
        KENAPA MASIH PERLU
      </Line>
      <BoxStamp delay={36} rotate={-4} size={112}>
        COACHING?
      </BoxStamp>
    </Stack>
  </AbsoluteFill>
);

const KNOWN = ["protein penting", "sayur penting", "portion penting"];
const KNOWN_AT = (i: number) => 26 + i * 18;

const Tahu: React.FC = () => (
  <AbsoluteFill>
    <Stack top={300} gap={8}>
      <Line size={56} weight={600} color={C.inkSoft}>
        Kalau seseorang dah tahu
      </Line>
    </Stack>
    <Stack top={460} gap={26}>
      {KNOWN.map((k, i) => (
        <Pop key={k} delay={KNOWN_AT(i)} rotate={i % 2 ? 1.5 : -1.5}>
          <Card style={{ display: "flex", alignItems: "center", gap: 26, padding: "26px 46px" }}>
            <Mark kind="check" delay={KNOWN_AT(i) + 6} size={52} />
            <span style={{ fontSize: 60, fontWeight: 800, whiteSpace: "nowrap" }}>{k}</span>
          </Card>
        </Pop>
      ))}
    </Stack>
    <Stack top={1080} gap={8}>
      <Line delay={100} size={60} weight={700}>
        kenapa coaching
      </Line>
      <Line delay={108} size={76} weight={800}>
        masih boleh <Highlight delay={120}>membantu?</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const Gap: React.FC<{ t: R0210CoachingTiming["gap"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={330} gap={6}>
      <Line size={58} weight={600} color={C.inkSoft}>
        Sebab
      </Line>
    </Stack>
    <Stack top={470} gap={20}>
      <Pop delay={t.knowledge} rotate={-1.5}>
        <Card style={{ padding: "34px 70px", fontSize: 92, fontWeight: 800, letterSpacing: 2 }}>KNOWLEDGE</Card>
      </Pop>
      <Pop delay={t.neq}>
        <div style={{ fontSize: 150, fontWeight: 800, color: C.marker, lineHeight: 1 }}>≠</div>
      </Pop>
      <Pop delay={t.execution} rotate={1.5}>
        <Card style={{ padding: "34px 70px", fontSize: 92, fontWeight: 800, letterSpacing: 2 }}>EXECUTION</Card>
      </Pop>
    </Stack>
    <Stack top={1170} gap={8}>
      <Line delay={t.line} size={56} weight={700}>
        bukan benda yang <Highlight delay={t.hl}>sama.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const BARRIERS = ["shift", "environment rumah", "emotional eating", "tak ada fallback plan", "satu meal lari → terus restart"];

const Barrier: React.FC<{ t: R0210CoachingTiming["barrier"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={280} gap={6}>
      <Line size={54} weight={600} color={C.inkSoft}>
        Kadang barrier sebenar
      </Line>
      <Line delay={t.line2} size={76} weight={800}>
        <Highlight delay={t.hl}>ialah:</Highlight>
      </Line>
    </Stack>
    <Stack top={560} gap={24}>
      {BARRIERS.map((b, i) => (
        <Pop key={b} delay={t.items[i]} rotate={i % 2 ? 1 : -1}>
          <Card style={{ padding: "24px 44px", fontSize: 54, fontWeight: 800, whiteSpace: "nowrap" }}>{b}</Card>
        </Pop>
      ))}
    </Stack>
  </AbsoluteFill>
);

// ---------- process loop: five nodes on a ring ----------
const STEPS = ["assess pattern", "bina structure", "cuba dalam real life", "review apa yang jadi", "adjust"];
const CX = 540;
const CY = 1000;
const R = 330; // drawn ring
const RX = 350; // node positions: a little wider than tall so the bottom pair cannot touch
const RY = 360;
const pos = (i: number) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / STEPS.length;
  return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
};

const Ring: React.FC<{ steps: number[] }> = ({ steps }) => {
  const f = useCurrentFrame();
  const p = progress(f, steps[0], steps[steps.length - 1] + 30 - steps[0]);
  const circ = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={C.marker} strokeWidth={8} strokeDasharray={`${circ * p} ${circ}`} transform={`rotate(-90 ${CX} ${CY})`} strokeLinecap="round" opacity={0.85} />
    </svg>
  );
};

const Loop: React.FC<{ t: R0210CoachingTiming["loop"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={270} gap={6}>
      <Line size={54} weight={600} color={C.inkSoft}>
        Coaching bagi ruang untuk
      </Line>
    </Stack>
    <Ring steps={t.steps} />
    {STEPS.map((s, i) => {
      const { x, y } = pos(i);
      return (
        <div key={s} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)" }}>
          <Pop delay={t.steps[i]}>
            <Card style={{ maxWidth: 320, padding: "20px 28px", fontSize: 42, fontWeight: 800, lineHeight: 1.15, textAlign: "center" }}>{s}</Card>
          </Pop>
        </div>
      );
    })}
    <div style={{ position: "absolute", top: 1440, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
      {["Assess", "Practise", "Review & adjust"].map((tag, i) => (
        <Tag key={tag} delay={t.tags + i * 8}>
          {tag}
        </Tag>
      ))}
    </div>
  </AbsoluteFill>
);

const Close: React.FC<{ t: R0210CoachingTiming["close"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={330} gap={18}>
      <Line size={66} weight={700}>
        Bukan coach{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          makan untuk awak.
          <Strike delay={t.strike} width={5} />
        </span>
      </Line>
      <Line delay={t.line2} size={62} weight={700} style={{ marginTop: 20 }}>
        Tapi kita kurangkan <Highlight delay={t.hl}>trial-and-error</Highlight>
      </Line>
      <Line delay={t.line3} size={56} weight={600} color={C.inkSoft}>
        dan buat plan lebih specific
        <br />
        kepada kehidupan awak.
      </Line>
    </Stack>
    <Stack top={1000} gap={22}>
      <CtaPill icon="share" delay={t.pill}>
        DM STRUCTURE
      </CtaPill>
      <Line delay={t.sub} size={42} weight={600} color={C.inkSoft}>
        kalau nak tengok macam mana
        <br />
        coaching saya berjalan.
      </Line>
    </Stack>
  </AbsoluteFill>
);

// Scenes after the opener (hook + "kalau seseorang dah tahu…"). Lengths default to the silent version.
export const r0210CoachingScenes = (t: R0210CoachingTiming, dur: Record<string, number> = { gap: 150, barrier: 200, loop: 250, close: 200 }): SceneDef[] => [
  { id: "gap", dur: dur.gap, el: <Gap t={t.gap} />, cues: [[t.gap.knowledge, "pop", 0.5], [t.gap.neq, "stamp", 0.6], [t.gap.execution, "pop", 0.5], [t.gap.hl, "swipe", 0.45]] },
  { id: "barrier", dur: dur.barrier, el: <Barrier t={t.barrier} />, cues: [[t.barrier.hl, "swipe", 0.45], ...t.barrier.items.map((f): Cue => [f, "pop", 0.45])] },
  {
    id: "loop",
    dur: dur.loop,
    el: <Loop t={t.loop} />,
    cues: [[t.loop.steps[0], "scribble", 0.35], ...t.loop.steps.map((f): Cue => [f, "pop", 0.45]), ...[0, 1, 2].map((i): Cue => [t.loop.tags + i * 8, "pop", 0.35])],
  },
  { id: "close", dur: dur.close, el: <Close t={t.close} />, cues: [[t.close.strike, "scribble", 0.5], [t.close.hl, "swipe", 0.45], [t.close.pill, "pop", 0.5], [t.close.pill + 4, "chime", 0.45]] },
];

export const R0210_COACHING_SCENES: SceneDef[] = [
  { id: "hook", dur: 105, el: <Hook />, cues: [[0, "whoosh", 0.4], [36, "stamp", 0.85]] },
  { id: "tahu", dur: 190, el: <Tahu />, cues: [...KNOWN.flatMap((_, i): Cue[] => [[KNOWN_AT(i), "pop", 0.45], [KNOWN_AT(i) + 6, "tick", 0.5]]), [120, "swipe", 0.5]] },
  ...r0210CoachingScenes(R0210_COACHING_SILENT),
];
