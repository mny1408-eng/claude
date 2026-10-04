// Reel 1 — "10 Pagi Dah Lapar?" (05/10/2026) · Reel B (hybrid: 5s face-cam hook + voice + design)
// Source: Notion 📅 05/10/2026 — Breakfast Structure, IG REEL 1. QA reviewed.
// Format: clock + breakfast checklist. On-screen text from the script/overlays only; no breakfast formula claims.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike, Underline } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { CtaPill, Stack, Tag } from "./formats/common";
import { Clock } from "./formats/Clock";

// Frame (within each scene) where each element appears. Defaults = silent version;
// a voiced version passes timings measured from Coach Nas's recording.
export type R0510Timing = {
  snack: { line2: number; assume: number; strike: number; check: number; hl: number };
  list: { items: number[]; checks: number[] };
  context: { line2: number; hl: number; line3: number; underline: number };
  audit: { days: number[]; line2: number; tag: number; pill: number };
};

export const R0510_SILENT: R0510Timing = {
  snack: { line2: 40, assume: 70, strike: 100, check: 118, hl: 130 },
  list: { items: [16, 76, 160], checks: [56, 140, 200] },
  context: { line2: 40, hl: 26, line3: 70, underline: 96 },
  audit: { days: [24, 38, 52], line2: 80, tag: 96, pill: 116 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={2}>
        <Clock from={7} to={10} start={8} dur={30} size={360} />
      </Pop>
    </div>
    <Stack top={800} gap={8}>
      <Line delay={30} size={96} weight={800}>
        <Highlight delay={40}>10 PAGI</Highlight> DAH LAPAR
      </Line>
      <Line delay={46} size={68} weight={700}>
        LEPAS BREAKFAST?
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const R0510_HOOK: SceneDef = { id: "hook", dur: 100, el: <Hook />, cues: [[2, "pop", 0.4], [8, "whoosh", 0.35], [40, "swipe", 0.5]] };

const Snack: React.FC<{ t: R0510Timing["snack"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={330} gap={10}>
      <Line size={58} weight={700}>Breakfast dah makan,</Line>
      <Line delay={t.line2} size={58} weight={700}>
        tapi pukul 10 pagi dah <Highlight delay={t.line2 + 10}>cari snack?</Highlight>
      </Line>
    </Stack>
    <Stack top={700} gap={14}>
      <Line delay={t.assume} size={52} weight={600} color={C.inkSoft}>
        Jangan terus assume awak
      </Line>
      <Line delay={t.assume + 6} size={72} weight={800}>
        <span style={{ position: "relative", display: "inline-block" }}>
          kurang disiplin.
          <Strike delay={t.strike} width={6} />
        </span>
      </Line>
    </Stack>
    <Stack top={1040} gap={8}>
      <Line delay={t.check} size={58} weight={700}>
        Check <Highlight delay={t.hl}>structure breakfast</Highlight>
      </Line>
      <Line delay={t.check + 6} size={58} weight={700}>
        tu dulu.
      </Line>
    </Stack>
  </AbsoluteFill>
);

const ITEMS = [
  { tag: "CHECK PROTEIN", text: "Ada sumber protein yang jelas?" },
  { tag: "CHECK FIBRE", text: "Ada fibre daripada buah, whole grains atau pilihan lain yang sesuai?" },
  { tag: "CHECK PORTION", text: "Portion cukup untuk keperluan awak?" },
];

const List: React.FC<{ t: R0510Timing["list"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={290} gap={6}>
      <Line size={50} weight={600} color={C.inkSoft}>
        Breakfast checklist
      </Line>
    </Stack>
    <Stack top={420} gap={30}>
      {ITEMS.map((it, i) => (
        <Pop key={it.tag} delay={t.items[i]} rotate={i % 2 ? 1 : -1}>
          <Card style={{ width: 940, padding: "30px 40px", display: "flex", alignItems: "center", gap: 30, textAlign: "left" }}>
            <div style={{ width: 74, height: 74, flexShrink: 0, border: `5px solid ${C.ink}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Mark kind="check" delay={t.checks[i]} size={52} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 3, color: C.marker }}>{it.tag}</div>
              <div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.2 }}>{it.text}</div>
            </div>
          </Card>
        </Pop>
      ))}
    </Stack>
  </AbsoluteFill>
);

const Context: React.FC<{ t: R0510Timing["context"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={420} gap={22}>
      <Line size={60} weight={700}>
        Protein dan fibre boleh
        <br />
        membantu <Highlight delay={t.hl}>rasa kenyang,</Highlight>
      </Line>
      <Line delay={t.line2} size={56} weight={600} color={C.inkSoft} style={{ marginTop: 30 }}>
        tapi tak ada satu breakfast formula
      </Line>
      <Line delay={t.line3} size={66} weight={800}>
        <span style={{ position: "relative", display: "inline-block" }}>
          yang wajib untuk semua orang.
          <Underline delay={t.underline} width={5} />
        </span>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const Audit: React.FC<{ t: R0510Timing["audit"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={300} gap={8}>
      <Line size={62} weight={700}>
        Cuba audit breakfast awak
      </Line>
      <Line delay={t.days[0]} size={88} weight={800}>
        <Highlight delay={t.days[0] + 6}>tiga hari</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 640, left: 80, right: 80, display: "flex", justifyContent: "center", gap: 28 }}>
      {[1, 2, 3].map((d, i) => (
        <Pop key={d} delay={t.days[i]}>
          <Card style={{ width: 260, height: 220, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <div style={{ fontSize: 40, fontWeight: 800 }}>HARI {d}</div>
            <Mark kind="check" delay={t.days[i] + 8} size={60} />
          </Card>
        </Pop>
      ))}
    </div>
    <Stack top={960} gap={18}>
      <Line delay={t.line2} size={56} weight={700}>
        sebelum tambah restriction.
      </Line>
      <Tag delay={t.tag}>Audit 3 hari</Tag>
    </Stack>
    <div style={{ position: "absolute", top: 1240, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="save" delay={t.pill}>
        Save &amp; check esok
      </CtaPill>
    </div>
  </AbsoluteFill>
);

// Scenes after the hook. Lengths default to the silent version.
export const r0510Scenes = (t: R0510Timing, dur: Record<string, number> = { snack: 175, list: 250, context: 150, audit: 180 }): SceneDef[] => [
  { id: "snack", dur: dur.snack, el: <Snack t={t.snack} />, cues: [[t.snack.line2 + 10, "swipe", 0.45], [t.snack.strike, "scribble", 0.55], [t.snack.hl, "swipe", 0.45]] },
  { id: "list", dur: dur.list, el: <List t={t.list} />, cues: [...t.list.items.map((f): Cue => [f, "pop", 0.45]), ...t.list.checks.map((f): Cue => [f, "tick", 0.55])] },
  { id: "context", dur: dur.context, el: <Context t={t.context} />, cues: [[t.context.hl, "swipe", 0.45], [t.context.underline, "scribble", 0.45]] },
  {
    id: "audit",
    dur: dur.audit,
    el: <Audit t={t.audit} />,
    cues: [...t.audit.days.flatMap((f): Cue[] => [[f, "pop", 0.45], [f + 8, "tick", 0.5]]), [t.audit.tag, "pop", 0.4], [t.audit.pill, "pop", 0.5], [t.audit.pill + 4, "chime", 0.45]],
  },
];

export const R0510_SCENES: SceneDef[] = [R0510_HOOK, ...r0510Scenes(R0510_SILENT)];
