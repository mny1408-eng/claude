// Reel 2 — "Prep Environment untuk Minggu Depan" (11/10/2026) · Reel B (hybrid: face-cam opener + voice + design)
// Source: Notion 📅 11/10/2026 — Weekly Review, IG REEL 2. QA reviewed.
// Format: motivation vs decision fatigue, three prep cards, then "kurangkan keputusan masa lapar · penat · rushing".
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Highlight, Line, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, Chip, CtaPill, NumCard, Stack, Tag } from "./formats/common";

export type R1110PrepTiming = {
  fatigue: { stamp: number; line2: number; strike: number; tag: number };
  prep: { cards: number[] };
  close: { strike: number; line2: number; chips: number[]; pill: number; sub: number };
};

export const R1110_PREP_SILENT: R1110PrepTiming = {
  fatigue: { stamp: 50, line2: 90, strike: 120, tag: 150 },
  prep: { cards: [20, 70, 120] },
  close: { strike: 20, line2: 50, chips: [80, 92, 104], pill: 140, sub: 150 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={470} gap={14}>
      <Line size={60} weight={700}>NAK MINGGU DEPAN</Line>
      <Line delay={8} size={76} weight={800}>LEBIH SENANG?</Line>
      <Line delay={24} size={92} weight={800} style={{ marginTop: 30 }}>
        <Highlight delay={34}>PREP ENVIRONMENT.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const R1110_PREP_HOOK: SceneDef = { id: "hook", dur: 90, el: <Hook />, cues: [[0, "whoosh", 0.4], [34, "swipe", 0.5]] };

const Fatigue: React.FC<{ t: R1110PrepTiming["fatigue"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={270} gap={8}>
      <Line size={50} weight={700}>
        Kalau setiap minggu harap
      </Line>
      <Line delay={6} size={60} weight={800}>
        motivation datang tepat pada masanya,
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 560, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <BoxStamp delay={t.stamp} rotate={-4} size={70}>
        DECISION FATIGUE
        <br />
        CEPAT MENANG
      </BoxStamp>
    </div>
    <Stack top={900} gap={10}>
      <Line delay={t.line2} size={50} weight={600} color={C.inkSoft}>
        Sunday ni cuba
      </Line>
      <Line delay={t.line2 + 6} size={70} weight={800}>
        <Highlight delay={t.line2 + 16}>prep environment,</Highlight>
      </Line>
      <Line delay={t.line2 + 12} size={54} weight={700}>
        bukan{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          overhaul semuanya.
          <Strike delay={t.strike} width={6} />
        </span>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1240, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Prep environment</Tag>
    </div>
  </AbsoluteFill>
);

const PREP = [
  { tag: "EASY PROTEIN OPTION", text: "Satu dua protein option yang senang dicapai" },
  { tag: "VISIBLE BACKUP", text: "Buah atau snack practical dekat tempat mudah nampak" },
  { tag: "PLAN BUSY DAYS", text: "Check hari paling padat, decide fallback awal" },
];

const Prep: React.FC<{ t: R1110PrepTiming["prep"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={260} gap={6}>
      <Line size={64} weight={800}>
        Prep <Highlight delay={8}>3 benda</Highlight>
      </Line>
    </Stack>
    <Stack top={440} gap={30}>
      {PREP.map((p, i) => (
        <NumCard key={p.tag} n={`${i + 1}`} tag={p.tag} text={p.text} delay={t.cards[i]} checkAt={t.cards[i] + 16} rotate={i % 2 ? 1 : -1} size={42} />
      ))}
    </Stack>
  </AbsoluteFill>
);

const Close: React.FC<{ t: R1110PrepTiming["close"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={290} gap={10}>
      <Line size={54} weight={700}>
        Kita bukan cuba{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          control satu minggu penuh.
          <Strike delay={t.strike} width={6} />
        </span>
      </Line>
      <Line delay={t.line2} size={54} weight={700} style={{ marginTop: 30 }}>
        Kita cuma <Highlight delay={t.line2 + 12}>kurangkan keputusan</Highlight>
      </Line>
      <Line delay={t.line2 + 6} size={48} weight={600} color={C.inkSoft}>
        yang biasanya dibuat masa dah…
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 760, left: 60, right: 60, display: "flex", justifyContent: "center", gap: 22 }}>
      {["lapar", "penat", "rushing"].map((w, i) => (
        <Chip key={w} delay={t.chips[i]} rotate={i % 2 ? 2 : -2} size={54}>
          {w}
        </Chip>
      ))}
    </div>
    <Stack top={1020} gap={20}>
      <CtaPill icon="save" delay={t.pill}>
        Save &amp; prep satu benda
      </CtaPill>
      <Line delay={t.sub} size={44} weight={700} color={C.inkSoft}>
        malam ni.
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const r1110PrepScenes = (t: R1110PrepTiming, dur: Record<string, number> = { fatigue: 190, prep: 210, close: 190 }): SceneDef[] => [
  { id: "fatigue", dur: dur.fatigue, el: <Fatigue t={t.fatigue} />, cues: [[t.fatigue.stamp, "stamp", 0.7], [t.fatigue.line2 + 16, "swipe", 0.45], [t.fatigue.strike, "scribble", 0.5], [t.fatigue.tag, "pop", 0.4]] },
  { id: "prep", dur: dur.prep, el: <Prep t={t.prep} />, cues: [[8, "swipe", 0.45], ...t.prep.cards.map((f): Cue => [f, "pop", 0.45]), ...t.prep.cards.map((f): Cue => [f + 16, "tick", 0.5]) ] },
  { id: "close", dur: dur.close, el: <Close t={t.close} />, cues: [[t.close.strike, "scribble", 0.5], [t.close.line2 + 12, "swipe", 0.45], ...t.close.chips.map((f): Cue => [f, "pop", 0.4]), [t.close.pill, "pop", 0.5], [t.close.pill + 4, "chime", 0.45]] },
];

export const R1110_PREP_SCENES: SceneDef[] = [R1110_PREP_HOOK, ...r1110PrepScenes(R1110_PREP_SILENT)];
