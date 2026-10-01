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

const Gap: React.FC = () => (
  <AbsoluteFill>
    <Stack top={330} gap={6}>
      <Line size={58} weight={600} color={C.inkSoft}>
        Sebab
      </Line>
    </Stack>
    <Stack top={470} gap={20}>
      <Pop delay={10} rotate={-1.5}>
        <Card style={{ padding: "34px 70px", fontSize: 92, fontWeight: 800, letterSpacing: 2 }}>KNOWLEDGE</Card>
      </Pop>
      <Pop delay={30}>
        <div style={{ fontSize: 150, fontWeight: 800, color: C.marker, lineHeight: 1 }}>≠</div>
      </Pop>
      <Pop delay={44} rotate={1.5}>
        <Card style={{ padding: "34px 70px", fontSize: 92, fontWeight: 800, letterSpacing: 2 }}>EXECUTION</Card>
      </Pop>
    </Stack>
    <Stack top={1170} gap={8}>
      <Line delay={70} size={56} weight={700}>
        bukan benda yang <Highlight delay={82}>sama.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const BARRIERS = ["shift", "environment rumah", "emotional eating", "tak ada fallback plan", "satu meal lari → terus restart"];
const BAR_AT = (i: number) => 40 + i * 24;

const Barrier: React.FC = () => (
  <AbsoluteFill>
    <Stack top={280} gap={6}>
      <Line size={54} weight={600} color={C.inkSoft}>
        Kadang barrier sebenar
      </Line>
      <Line delay={10} size={76} weight={800}>
        <Highlight delay={20}>ialah:</Highlight>
      </Line>
    </Stack>
    <Stack top={560} gap={24}>
      {BARRIERS.map((b, i) => (
        <Pop key={b} delay={BAR_AT(i)} rotate={i % 2 ? 1 : -1}>
          <Card style={{ padding: "24px 44px", fontSize: 54, fontWeight: 800, whiteSpace: "nowrap" }}>{b}</Card>
        </Pop>
      ))}
    </Stack>
  </AbsoluteFill>
);

// ---------- process loop: five nodes on a ring ----------
const STEPS = ["assess pattern", "bina structure", "cuba dalam real life", "review apa yang jadi", "adjust"];
const STEP_AT = (i: number) => 40 + i * 26;
const CX = 540;
const CY = 1000;
const R = 330; // drawn ring
const RX = 350; // node positions: a little wider than tall so the bottom pair cannot touch
const RY = 360;
const pos = (i: number) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / STEPS.length;
  return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) };
};

const Ring: React.FC = () => {
  const f = useCurrentFrame();
  const p = progress(f, STEP_AT(0), STEP_AT(STEPS.length - 1) + 30 - STEP_AT(0));
  const circ = 2 * Math.PI * R;
  return (
    <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={C.marker} strokeWidth={8} strokeDasharray={`${circ * p} ${circ}`} transform={`rotate(-90 ${CX} ${CY})`} strokeLinecap="round" opacity={0.85} />
    </svg>
  );
};

const Loop: React.FC = () => (
  <AbsoluteFill>
    <Stack top={270} gap={6}>
      <Line size={54} weight={600} color={C.inkSoft}>
        Coaching bagi ruang untuk
      </Line>
    </Stack>
    <Ring />
    {STEPS.map((s, i) => {
      const { x, y } = pos(i);
      return (
        <div key={s} style={{ position: "absolute", left: x, top: y, transform: "translate(-50%, -50%)" }}>
          <Pop delay={STEP_AT(i)}>
            <Card style={{ maxWidth: 320, padding: "20px 28px", fontSize: 42, fontWeight: 800, lineHeight: 1.15, textAlign: "center" }}>{s}</Card>
          </Pop>
        </div>
      );
    })}
    <div style={{ position: "absolute", top: 1440, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
      {["Assess", "Practise", "Review & adjust"].map((t, i) => (
        <Tag key={t} delay={190 + i * 8}>
          {t}
        </Tag>
      ))}
    </div>
  </AbsoluteFill>
);

const Close: React.FC = () => (
  <AbsoluteFill>
    <Stack top={330} gap={18}>
      <Line size={66} weight={700}>
        Bukan coach{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          makan untuk awak.
          <Strike delay={24} width={5} />
        </span>
      </Line>
      <Line delay={44} size={62} weight={700} style={{ marginTop: 20 }}>
        Tapi kita kurangkan <Highlight delay={58}>trial-and-error</Highlight>
      </Line>
      <Line delay={76} size={56} weight={600} color={C.inkSoft}>
        dan buat plan lebih specific
        <br />
        kepada kehidupan awak.
      </Line>
    </Stack>
    <Stack top={1000} gap={22}>
      <CtaPill icon="share" delay={110}>
        DM STRUCTURE
      </CtaPill>
      <Line delay={122} size={42} weight={600} color={C.inkSoft}>
        kalau nak tengok macam mana
        <br />
        coaching saya berjalan.
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const R0210_COACHING_SCENES: SceneDef[] = [
  { id: "hook", dur: 105, el: <Hook />, cues: [[0, "whoosh", 0.4], [36, "stamp", 0.85]] },
  { id: "tahu", dur: 190, el: <Tahu />, cues: [...KNOWN.flatMap((_, i): Cue[] => [[KNOWN_AT(i), "pop", 0.45], [KNOWN_AT(i) + 6, "tick", 0.5]]), [120, "swipe", 0.5]] },
  { id: "gap", dur: 150, el: <Gap />, cues: [[10, "pop", 0.5], [30, "stamp", 0.6], [44, "pop", 0.5], [82, "swipe", 0.45]] },
  { id: "barrier", dur: 200, el: <Barrier />, cues: [[20, "swipe", 0.45], ...BARRIERS.map((_, i): Cue => [BAR_AT(i), "pop", 0.45])] },
  { id: "loop", dur: 250, el: <Loop />, cues: [[STEP_AT(0), "scribble", 0.35], ...STEPS.map((_, i): Cue => [STEP_AT(i), "pop", 0.45]), ...[0, 1, 2].map((i): Cue => [190 + i * 8, "pop", 0.35])] },
  { id: "close", dur: 200, el: <Close />, cues: [[24, "scribble", 0.5], [58, "swipe", 0.45], [110, "pop", 0.5], [114, "chime", 0.45]] },
];
