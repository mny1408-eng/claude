// Reel 2 — "Breakfast Orang Busy" (05/10/2026) · Reel B (hybrid: face-cam opener + voice + design)
// Source: Notion 📅 05/10/2026 — Breakfast Structure, IG REEL 2. QA reviewed.
// Format: three numbered slots + two example combos (only the script's own examples). Reel 1 that day is the clock + checklist.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike, Underline } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { CtaPill, Stack, Tag } from "./formats/common";

export type R0510BusyTiming = {
  three: { items: number[]; checks: number[] };
  combos: { cards: number[]; checks: number[] };
  close: { line2: number; hl: number; line3: number; underline: number; tags: number; pill: number; sub: number };
};

export const R0510_BUSY_SILENT: R0510BusyTiming = {
  three: { items: [24, 80, 140], checks: [60, 120, 180] },
  combos: { cards: [10, 70], checks: [50, 110] },
  close: { line2: 30, hl: 46, line3: 70, underline: 100, tags: 116, pill: 140, sub: 150 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={420} gap={14}>
      <Line size={64} weight={700}>Kalau pagi memang kelam-kabut,</Line>
      <Line delay={14} size={58} weight={700} color={C.inkSoft} style={{ marginTop: 20 }}>
        saya tak cuba bina breakfast
      </Line>
      <Line delay={20} size={78} weight={800}>
        <span style={{ position: "relative", display: "inline-block" }}>
          paling cantik.
          <Strike delay={44} width={6} />
        </span>
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const R0510_BUSY_HOOK: SceneDef = { id: "hook", dur: 90, el: <Hook />, cues: [[0, "whoosh", 0.4], [44, "scribble", 0.5]] };

const SLOTS = [
  { n: "1", tag: "PROTEIN", text: "ada protein source" },
  { n: "2", tag: "FIBRE / WHOLE FOOD", text: "sesuatu yang bagi fibre atau whole-food volume bila practical" },
  { n: "3", tag: "REPEATABLE", text: "cukup senang untuk diulang" },
];

const Three: React.FC<{ t: R0510BusyTiming["three"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={290} gap={6}>
      <Line size={70} weight={800}>
        Saya check <Highlight delay={10}>tiga benda.</Highlight>
      </Line>
    </Stack>
    <Stack top={480} gap={30}>
      {SLOTS.map((s, i) => (
        <Pop key={s.n} delay={t.items[i]} rotate={i % 2 ? 1 : -1}>
          <Card style={{ width: 940, padding: "28px 36px", display: "flex", alignItems: "center", gap: 30, textAlign: "left" }}>
            <div style={{ width: 96, height: 96, flexShrink: 0, borderRadius: "50%", background: C.ink, color: C.paper, fontSize: 56, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.n}</div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: 3, color: C.marker }}>{s.tag}</div>
              <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.2 }}>{s.text}</div>
            </div>
            <div style={{ width: 60, flexShrink: 0 }}>
              <Mark kind="check" delay={t.checks[i]} size={52} />
            </div>
          </Card>
        </Pop>
      ))}
    </Stack>
  </AbsoluteFill>
);

const COMBOS = [
  { items: ["telur", "roti", "buah"], line: "pun boleh." },
  { items: ["oat", "susu / yogurt"], line: "pun boleh." },
];

const Combos: React.FC<{ t: R0510BusyTiming["combos"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={300} gap={6}>
      <Line size={56} weight={600} color={C.inkSoft}>
        Contoh
      </Line>
    </Stack>
    <Stack top={440} gap={50}>
      {COMBOS.map((c, i) => (
        <Pop key={i} delay={t.cards[i]} rotate={i % 2 ? 1.5 : -1.5}>
          <Card style={{ width: 920, padding: "36px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap", justifyContent: "center" }}>
              {c.items.map((it, j) => (
                <React.Fragment key={it}>
                  {j > 0 && <span style={{ fontSize: 56, fontWeight: 800, color: C.marker }}>+</span>}
                  <span style={{ fontSize: 58, fontWeight: 800, padding: "8px 26px", borderRadius: 14, background: "#F3EFE2" }}>{it}</span>
                </React.Fragment>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Mark kind="check" delay={t.checks[i]} size={50} />
              <span style={{ fontSize: 46, fontWeight: 700 }}>{c.line}</span>
            </div>
          </Card>
        </Pop>
      ))}
    </Stack>
  </AbsoluteFill>
);

const Close: React.FC<{ t: R0510BusyTiming["close"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={300} gap={14}>
      <Line size={80} weight={800}>Tak perlu fancy.</Line>
      <Line delay={t.line2} size={54} weight={700} style={{ marginTop: 26 }}>
        Breakfast yang simple tapi
      </Line>
      <Line delay={t.line2 + 6} size={84} weight={800}>
        <Highlight delay={t.hl}>repeatable</Highlight>
      </Line>
      <Line delay={t.line3} size={48} weight={600} color={C.inkSoft} style={{ marginTop: 16 }}>
        lebih berguna daripada plan cantik
        <br />
        <span style={{ position: "relative", display: "inline-block" }}>
          yang kita tak sempat buat.
          <Underline delay={t.underline} width={5} />
        </span>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1000, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
      {["Protein", "Fibre/whole food", "Repeatable"].map((tag, i) => (
        <Tag key={tag} delay={t.tags + i * 6}>
          {tag}
        </Tag>
      ))}
    </div>
    <Stack top={1180} gap={20}>
      <CtaPill icon="comment" delay={t.pill}>
        Comment
      </CtaPill>
      <Line delay={t.sub} size={44} weight={700} color={C.inkSoft}>
        breakfast paling senang awak.
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const r0510BusyScenes = (t: R0510BusyTiming, dur: Record<string, number> = { three: 230, combos: 160, close: 200 }): SceneDef[] => [
  { id: "three", dur: dur.three, el: <Three t={t.three} />, cues: [[10, "swipe", 0.45], ...t.three.items.map((f): Cue => [f, "pop", 0.45]), ...t.three.checks.map((f): Cue => [f, "tick", 0.5])] },
  { id: "combos", dur: dur.combos, el: <Combos t={t.combos} />, cues: [...t.combos.cards.map((f): Cue => [f, "pop", 0.45]), ...t.combos.checks.map((f): Cue => [f, "tick", 0.55])] },
  {
    id: "close",
    dur: dur.close,
    el: <Close t={t.close} />,
    cues: [[t.close.hl, "swipe", 0.45], [t.close.underline, "scribble", 0.4], ...[0, 1, 2].map((i): Cue => [t.close.tags + i * 6, "pop", 0.35]), [t.close.pill, "pop", 0.5], [t.close.pill + 4, "chime", 0.45]],
  },
];

export const R0510_BUSY_SCENES: SceneDef[] = [R0510_BUSY_HOOK, ...r0510BusyScenes(R0510_BUSY_SILENT)];
