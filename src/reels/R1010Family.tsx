// Reel 2 — "Family Makan Luar" (10/10/2026) · Reel B (hybrid: face-cam opener + voice + design)
// Source: Notion 📅 10/10/2026 — Weekend Flexibility, IG REEL 2. QA reviewed.
// Format: "progress vs family" becomes "progress & family", four controllable decisions, then next meal normal.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { CtaPill, NumCard, Stack, Tag } from "./formats/common";

export type R1010FamilyTiming = {
  vs: { cards: number; strike: number; and: number; line2: number; tag: number };
  pilih: { cards: number[]; tag: number };
  close: { line1: number; strike: number; next: number; line3: number; tags: number; pill: number };
};

export const R1010_FAMILY_SILENT: R1010FamilyTiming = {
  vs: { cards: 10, strike: 50, and: 62, line2: 100, tag: 150 },
  pilih: { cards: [20, 60, 100, 140], tag: 180 },
  close: { line1: 0, strike: 30, next: 60, line3: 100, tags: 140, pill: 160 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={480} gap={14}>
      <Line size={70} weight={800}>FAMILY NAK</Line>
      <Line delay={8} size={92} weight={800}>
        <Highlight delay={20}>MAKAN LUAR.</Highlight>
      </Line>
      <Line delay={30} size={64} weight={700} style={{ marginTop: 20 }}>
        DIET MACAM MANA?
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const R1010_FAMILY_HOOK: SceneDef = { id: "hook", dur: 90, el: <Hook />, cues: [[0, "whoosh", 0.4], [20, "swipe", 0.5]] };

const Vs: React.FC<{ t: R1010FamilyTiming["vs"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={270} gap={8}>
      <Line size={50} weight={700}>
        Saya tak nak plan yang buat kita
      </Line>
      <Line delay={6} size={50} weight={700}>
        rasa kena pilih antara…
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 520, left: 60, right: 60, display: "flex", alignItems: "center", justifyContent: "center", gap: 30 }}>
      <Pop delay={t.cards} rotate={-2}>
        <Card style={{ padding: "30px 44px", fontSize: 60, fontWeight: 800 }}>progress</Card>
      </Pop>
      <div style={{ position: "relative", width: 120, height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Pop delay={t.cards + 8}>
          <span style={{ position: "relative", display: "inline-block", fontSize: 64, fontWeight: 800, color: C.inkSoft }}>
            vs
            <Strike delay={t.strike} width={7} />
          </span>
        </Pop>
        <div style={{ position: "absolute", top: -70 }}>
          <Pop delay={t.and}>
            <span style={{ fontSize: 80, fontWeight: 800, color: C.marker }}>&amp;</span>
          </Pop>
        </div>
      </div>
      <Pop delay={t.cards + 14} rotate={2}>
        <Card style={{ padding: "30px 44px", fontSize: 60, fontWeight: 800 }}>family</Card>
      </Pop>
    </div>
    <Stack top={850} gap={10}>
      <Line delay={t.line2} size={50} weight={600} color={C.inkSoft}>
        Saya pilih beberapa keputusan
      </Line>
      <Line delay={t.line2 + 6} size={64} weight={800}>
        yang <Highlight delay={t.line2 + 16}>masih boleh dikawal.</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1120, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Family time ≠ fail</Tag>
    </div>
  </AbsoluteFill>
);

const DECISIONS = [
  { tag: "HUNGER", text: "Datang dengan hunger yang reasonable — bukan tahan sampai terlalu lapar" },
  { tag: "ENJOY", text: "Pilih makanan yang memang nak enjoy" },
  { tag: "PROTEIN", text: "Cari protein bila practical" },
  { tag: "MINUMAN", text: "Decide minuman dengan sedar" },
];

const Pilih: React.FC<{ t: R1010FamilyTiming["pilih"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={250} gap={6}>
      <Line size={62} weight={800}>
        <Highlight delay={8}>Pilih yang boleh dikawal</Highlight>
      </Line>
    </Stack>
    <Stack top={410} gap={24}>
      {DECISIONS.map((d, i) => (
        <NumCard key={d.tag} n={`${i + 1}`} tag={d.tag} text={d.text} delay={t.cards[i]} checkAt={t.cards[i] + 14} rotate={i % 2 ? 1 : -1} size={i === 0 ? 38 : 44} />
      ))}
    </Stack>
    <div style={{ position: "absolute", top: 1420, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Anchor, bukan perfect</Tag>
    </div>
  </AbsoluteFill>
);

const Close: React.FC<{ t: R1010FamilyTiming["close"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={280} gap={10}>
      <Line delay={t.line1} size={54} weight={700}>
        Lepas makan, tak perlu
      </Line>
      <Line delay={t.line1 + 6} size={62} weight={800}>
        <span style={{ position: "relative", display: "inline-block" }}>
          compensate
          <Strike delay={t.strike} width={6} />
        </span>{" "}
        atau{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          “tebus”.
          <Strike delay={t.strike + 8} width={6} />
        </span>
      </Line>
      <Line delay={t.next} size={84} weight={800} style={{ marginTop: 30 }}>
        <Highlight delay={t.next + 10}>Next meal</Highlight>
      </Line>
      <Line delay={t.next + 6} size={54} weight={700}>
        sambung routine biasa.
      </Line>
      <Line delay={t.line3} size={46} weight={600} color={C.inkSoft} style={{ marginTop: 24 }}>
        Sustainable plan kena boleh hidup
        <br />
        sekali dengan family.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1060, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
      <Tag delay={t.tags}>Next meal normal</Tag>
      <Tag delay={t.tags + 6}>Sustainable &gt; perfect</Tag>
    </div>
    <div style={{ position: "absolute", top: 1260, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="share" delay={t.pill}>
        Share dengan family
      </CtaPill>
    </div>
  </AbsoluteFill>
);

export const r1010FamilyScenes = (t: R1010FamilyTiming, dur: Record<string, number> = { vs: 190, pilih: 230, close: 200 }): SceneDef[] => [
  { id: "vs", dur: dur.vs, el: <Vs t={t.vs} />, cues: [[t.vs.cards, "pop", 0.45], [t.vs.strike, "scribble", 0.5], [t.vs.and, "pop", 0.5], [t.vs.line2 + 16, "swipe", 0.4], [t.vs.tag, "pop", 0.4]] },
  { id: "pilih", dur: dur.pilih, el: <Pilih t={t.pilih} />, cues: [[8, "swipe", 0.45], ...t.pilih.cards.map((f): Cue => [f, "pop", 0.45]), ...t.pilih.cards.map((f): Cue => [f + 14, "tick", 0.5]), [t.pilih.tag, "pop", 0.4]] },
  { id: "close", dur: dur.close, el: <Close t={t.close} />, cues: [[t.close.strike, "scribble", 0.45], [t.close.strike + 8, "scribble", 0.45], [t.close.next + 10, "swipe", 0.45], [t.close.tags, "pop", 0.4], [t.close.pill, "pop", 0.5], [t.close.pill + 4, "chime", 0.45]] },
];

export const R1010_FAMILY_SCENES: SceneDef[] = [R1010_FAMILY_HOOK, ...r1010FamilyScenes(R1010_FAMILY_SILENT)];
