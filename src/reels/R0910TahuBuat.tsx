// Reel 2 — "Dah Tahu… Tapi Susah Buat?" (09/10/2026) · Reel B (hybrid: face-cam opener + voice + design)
// Source: Notion 📅 09/10/2026 — Restart Cycle, IG REEL 2. QA reviewed. CTA: Progress Scorecard (lead magnet).
// Format: a "dah tahu" checklist that falls apart in a busy week, then four barrier questions, then the Scorecard card.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Pop } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { CtaPill, NumCard, Stack, Tag } from "./formats/common";

export type R0910TahuTiming = {
  tahu: { items: number[]; busy: number; line2: number; tag: number };
  barrier: { line1: number; cards: number[]; line2: number; tag: number };
  close: { line1: number; card: number; note: number; pill: number };
};

export const R0910_TAHU_SILENT: R0910TahuTiming = {
  tahu: { items: [10, 22, 34, 46], busy: 80, line2: 120, tag: 160 },
  barrier: { line1: 0, cards: [30, 50, 70, 90], line2: 130, tag: 170 },
  close: { line1: 0, card: 30, note: 90, pill: 130 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={520} gap={14}>
      <Line size={96} weight={800}>DAH TAHU…</Line>
      <Line delay={16} size={84} weight={800}>
        TAPI <Highlight delay={28}>SUSAH BUAT?</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const R0910_TAHU_HOOK: SceneDef = { id: "hook", dur: 90, el: <Hook />, cues: [[0, "whoosh", 0.4], [28, "swipe", 0.5]] };

const KNOWN = ["protein", "portion", "sayur", "exercise"];

// Each known item: ticked when it pops, then drops and fades once the busy week hits.
const Known: React.FC<{ label: string; at: number; busy: number; i: number }> = ({ label, at, busy, i }) => {
  const f = useCurrentFrame();
  const fall = interpolate(f, [busy + i * 4, busy + i * 4 + 16], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ transform: `translateY(${fall * 60}px) rotate(${fall * (i % 2 ? 8 : -8)}deg)`, opacity: 1 - fall * 0.75 }}>
      <Pop delay={at}>
        <Card style={{ width: 400, padding: "22px 30px", display: "flex", alignItems: "center", gap: 18 }}>
          <Mark kind="check" delay={at + 6} size={46} />
          <span style={{ fontSize: 48, fontWeight: 800 }}>{label}</span>
        </Card>
      </Pop>
    </div>
  );
};

const Tahu: React.FC<{ t: R0910TahuTiming["tahu"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={260} gap={6}>
      <Line size={60} weight={800}>
        Awak dah <Highlight delay={8}>tahu:</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 420, left: 80, right: 80, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
      {KNOWN.map((k, i) => (
        <Known key={k} label={k} at={t.items[i]} busy={t.busy} i={i} />
      ))}
    </div>
    <Stack top={830} gap={10}>
      <Line delay={t.busy} size={58} weight={800}>
        Minggu busy → <span style={{ color: C.marker }}>semua hilang.</span>
      </Line>
      <Line delay={t.line2} size={48} weight={600} color={C.inkSoft} style={{ marginTop: 24 }}>
        Mungkin tambah lagi tips
      </Line>
      <Line delay={t.line2 + 6} size={58} weight={800}>
        <Highlight delay={t.line2 + 16}>bukan langkah pertama.</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1250, left: 60, right: 60, display: "flex", justifyContent: "center", gap: 18 }}>
      <Tag delay={t.tag}>Knowledge</Tag>
      <Tag delay={t.tag + 6}>≠ Execution</Tag>
    </div>
  </AbsoluteFill>
);

const BARRIERS = [
  { tag: "TIMING", text: "Timing?" },
  { tag: "ENVIRONMENT", text: "Environment?" },
  { tag: "FALLBACK", text: "Tak ada fallback?" },
  { tag: "ALL-OR-NOTHING", text: "Satu meal lari → terus abandon plan?" },
];

const Barrier: React.FC<{ t: R0910TahuTiming["barrier"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={250} gap={6}>
      <Line delay={t.line1} size={76} weight={800}>
        Tengok <Highlight delay={t.line1 + 10}>barrier.</Highlight>
      </Line>
    </Stack>
    <Stack top={420} gap={22}>
      {BARRIERS.map((b, i) => (
        <NumCard key={b.tag} n={`${i + 1}`} tag={b.tag} text={b.text} delay={t.cards[i]} rotate={i % 2 ? 1 : -1} />
      ))}
    </Stack>
    <Stack top={1290} gap={8}>
      <Line delay={t.line2} size={46} weight={600} color={C.inkSoft}>
        Bila tahu barrier, baru strategy
      </Line>
      <Line delay={t.line2 + 6} size={58} weight={800}>
        boleh jadi <Highlight delay={t.line2 + 16}>lebih specific.</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1490, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Find the barrier</Tag>
    </div>
  </AbsoluteFill>
);

const Close: React.FC<{ t: R0910TahuTiming["close"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={290} gap={8}>
      <Line delay={t.line1} size={54} weight={700}>
        Tak pasti barrier awak
      </Line>
      <Line delay={t.line1 + 6} size={64} weight={800}>
        dekat mana?
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 520, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.card} rotate={-1.5}>
        <Card style={{ width: 900, padding: "44px 50px", textAlign: "center", display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 4, color: C.marker }}>SELF-CHECK · 2 MINIT</div>
          <div style={{ fontSize: 70, fontWeight: 800, lineHeight: 1.1 }}>
            <Highlight delay={t.card + 14}>Progress Scorecard</Highlight>
          </div>
          <div style={{ fontSize: 46, fontWeight: 700, color: C.inkSoft }}>dekat bio</div>
        </Card>
      </Pop>
    </div>
    <Stack top={940} gap={8}>
      <Line delay={t.note} size={50} weight={700}>
        Bukan diagnosis —
      </Line>
      <Line delay={t.note + 6} size={50} weight={700}>
        cuma <Highlight delay={t.note + 16}>starting point.</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1180, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="link" delay={t.pill}>
        Scorecard dekat bio
      </CtaPill>
    </div>
  </AbsoluteFill>
);

export const r0910TahuScenes = (t: R0910TahuTiming, dur: Record<string, number> = { tahu: 200, barrier: 210, close: 180 }): SceneDef[] => [
  { id: "tahu", dur: dur.tahu, el: <Tahu t={t.tahu} />, cues: [[8, "swipe", 0.4], ...t.tahu.items.map((f): Cue => [f + 6, "tick", 0.45]), [t.tahu.busy, "whoosh", 0.4], [t.tahu.line2 + 16, "swipe", 0.4], [t.tahu.tag, "pop", 0.4]] },
  { id: "barrier", dur: dur.barrier, el: <Barrier t={t.barrier} />, cues: [[t.barrier.line1 + 10, "swipe", 0.45], ...t.barrier.cards.map((f): Cue => [f, "pop", 0.45]), [t.barrier.line2 + 16, "swipe", 0.4], [t.barrier.tag, "pop", 0.4]] },
  { id: "close", dur: dur.close, el: <Close t={t.close} />, cues: [[t.close.card, "pop", 0.5], [t.close.card + 14, "swipe", 0.4], [t.close.note + 16, "swipe", 0.4], [t.close.pill, "pop", 0.5], [t.close.pill + 4, "chime", 0.45]] },
];

export const R0910_TAHU_SCENES: SceneDef[] = [R0910_TAHU_HOOK, ...r0910TahuScenes(R0910_TAHU_SILENT)];
