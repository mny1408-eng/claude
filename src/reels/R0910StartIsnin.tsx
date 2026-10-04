// Reel 1 — "Kenapa Asyik Start Isnin?" (09/10/2026) · Reel B (hybrid: 5s face-cam hook + voice + design)
// Source: Notion 📅 09/10/2026 — Restart Cycle, IG REEL 1. QA reviewed.
// Format: fork in the road (meal lari → "tunggu Isnin" vs "next meal normal"). Calendar flip was 03/10, so not reused.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Note, Pop, Strike, progress } from "../kit";
import { useCurrentFrame } from "remotion";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, CtaPill, Stack, Tag } from "./formats/common";

export type R0910Timing = {
  rule: { note: number; line2: number; line3: number; hl: number };
  fork: { lari: number; left: number; leftStrike: number; right: number; rightCheck: number; tag: number; caption: number };
  nots: { skip: number; comp: number; strikes: number[]; tag: number };
  skill: { line2: number; strike: number; line3: number; hl: number; tag: number; pill: number; sub: number };
};

export const R0910_SILENT: R0910Timing = {
  rule: { note: 10, line2: 60, line3: 84, hl: 96 },
  fork: { lari: 6, left: 34, leftStrike: 70, right: 90, rightCheck: 116, tag: 80, caption: 130 },
  nots: { skip: 10, comp: 34, strikes: [24, 56], tag: 76 },
  skill: { line2: 10, strike: 40, line3: 60, hl: 80, tag: 104, pill: 124, sub: 134 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={520} gap={22}>
      <Line size={78} weight={700}>KENAPA ASYIK</Line>
      <BoxStamp delay={18} rotate={-5} size={140}>
        START ISNIN?
      </BoxStamp>
    </Stack>
  </AbsoluteFill>
);

export const R0910_HOOK: SceneDef = { id: "hook", dur: 85, el: <Hook />, cues: [[0, "whoosh", 0.4], [18, "stamp", 0.85]] };

const Rule: React.FC<{ t: R0910Timing["rule"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={300} gap={18}>
      <Line size={54} weight={700}>
        Kalau setiap kali meal lari
        <br />
        awak cakap
      </Line>
      <Note delay={t.note} size={96} rotate={-3}>
        ‘takpe, Isnin aku
        <br />
        start balik’,
      </Note>
    </Stack>
    <Stack top={880} gap={12}>
      <Line delay={t.line2} size={54} weight={600} color={C.inkSoft}>
        masalahnya mungkin bukan meal tu.
      </Line>
      <Line delay={t.line3} size={64} weight={700} style={{ marginTop: 20 }}>
        Masalahnya
      </Line>
      <Line delay={t.line3 + 6} size={96} weight={800}>
        <Highlight delay={t.hl}>recovery rule.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

// Fork: a node at the top splitting into two paths; the left one gets struck, the right one ticked.
const Path: React.FC<{ d: string; at: number }> = ({ d, at }) => {
  const p = progress(useCurrentFrame(), at, 12);
  return <path d={d} fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={p > 0 ? 1 : 0} />;
};

const Fork: React.FC<{ t: R0910Timing["fork"] }> = ({ t }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.lari}>
        <Card style={{ padding: "26px 56px", fontSize: 64, fontWeight: 800 }}>satu meal lari</Card>
      </Pop>
    </div>
    <svg viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <Path d="M 540 440 C 540 540, 300 540, 280 640" at={t.left - 10} />
      <Path d="M 540 440 C 540 540, 780 540, 800 640" at={t.right - 10} />
    </svg>
    <div style={{ position: "absolute", top: 660, left: 50, width: 470, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.left} rotate={-1.5}>
        <Card style={{ width: 440, padding: "30px 26px", textAlign: "center" }}>
          <span style={{ position: "relative", display: "inline-block", fontSize: 50, fontWeight: 800, lineHeight: 1.15, color: C.inkSoft }}>
            tunggu Isnin,
            <br />
            start balik
            <Strike delay={t.leftStrike} width={6} />
          </span>
        </Card>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 660, right: 50, width: 470, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.right} rotate={1.5}>
        <Card style={{ width: 440, padding: "30px 26px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.15 }}>
            next meal →
            <br />
            struktur biasa
          </span>
          <Mark kind="check" delay={t.rightCheck} size={60} />
        </Card>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 1010, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Stop restart</Tag>
    </div>
    <Stack top={1130} gap={8}>
      <Line delay={t.caption} size={52} weight={700}>
        Satu meal lari <Highlight delay={t.caption + 10}>tak perlukan hukuman.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const Nots: React.FC<{ t: R0910Timing["nots"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={460} gap={40}>
      {[
        { text: "Tak perlu skip.", at: t.skip, strike: t.strikes[0] },
        { text: "Tak perlu compensate secara ekstrem.", at: t.comp, strike: t.strikes[1] },
      ].map((n, i) => (
        <Pop key={n.text} delay={n.at} rotate={i % 2 ? 1 : -1}>
          <Card style={{ padding: "34px 50px", maxWidth: 920, textAlign: "center" }}>
            <span style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.18 }}>{n.text}</span>
          </Card>
        </Pop>
      ))}
    </Stack>
    <div style={{ position: "absolute", top: 1000, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>No extreme compensation</Tag>
    </div>
  </AbsoluteFill>
);

const Skill: React.FC<{ t: R0910Timing["skill"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={330} gap={14}>
      <Line size={56} weight={700}>
        Skill yang kita nak bina bukan
      </Line>
      <Line delay={t.line2} size={72} weight={800} color={C.inkSoft}>
        <span style={{ position: "relative", display: "inline-block" }}>
          ‘tak pernah tersasar’.
          <Strike delay={t.strike} width={6} />
        </span>
      </Line>
      <Line delay={t.line3} size={56} weight={700} style={{ marginTop: 34 }}>
        Skill dia ialah
      </Line>
      <Line delay={t.line3 + 6} size={74} weight={800}>
        <Highlight delay={t.hl}>cepat kembali</Highlight>
      </Line>
      <Line delay={t.line3 + 12} size={54} weight={700}>
        kepada rutin yang reasonable.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1040, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Next meal normal</Tag>
    </div>
    <Stack top={1180} gap={20}>
      <CtaPill icon="comment" delay={t.pill}>
        Comment “pernah”
      </CtaPill>
      <Line delay={t.sub} size={42} weight={600} color={C.inkSoft}>
        kalau familiar.
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const r0910Scenes = (t: R0910Timing, dur: Record<string, number> = { rule: 170, fork: 190, nots: 130, skill: 200 }): SceneDef[] => [
  { id: "rule", dur: dur.rule, el: <Rule t={t.rule} />, cues: [[t.rule.note, "scribble", 0.45], [t.rule.hl, "swipe", 0.5]] },
  {
    id: "fork",
    dur: dur.fork,
    el: <Fork t={t.fork} />,
    cues: [[t.fork.lari, "pop", 0.45], [t.fork.left, "pop", 0.4], [t.fork.leftStrike, "scribble", 0.55], [t.fork.right, "pop", 0.4], [t.fork.rightCheck, "tick", 0.55], [t.fork.tag, "pop", 0.4], [t.fork.caption + 10, "swipe", 0.4]],
  },
  { id: "nots", dur: dur.nots, el: <Nots t={t.nots} />, cues: [[t.nots.skip, "pop", 0.45], [t.nots.comp, "pop", 0.45], [t.nots.tag, "pop", 0.4]] },
  { id: "skill", dur: dur.skill, el: <Skill t={t.skill} />, cues: [[t.skill.strike, "scribble", 0.5], [t.skill.hl, "swipe", 0.45], [t.skill.tag, "pop", 0.4], [t.skill.pill, "pop", 0.5], [t.skill.pill + 4, "chime", 0.45]] },
];

export const R0910_SCENES: SceneDef[] = [R0910_HOOK, ...r0910Scenes(R0910_SILENT)];
