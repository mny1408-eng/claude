// Reel 1 — "Carbs Malam Automatik Gemuk?" (08/10/2026) · Reel B (hybrid: 5s face-cam hook + voice + design)
// Source: Notion 📅 08/10/2026 — Pharmacist Myth to Action, IG REEL 1. Clinical wording reviewed in Notion.
// Format: Mitos → Fakta (fixed weekly series). Wording stays as cautious as the script: timing can still matter for some.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike, Underline } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, CtaPill, Stack, Tag } from "./formats/common";
import { Clock } from "./formats/Clock";

export type R0810Timing = {
  mitos: { card: number; stamp: number; strike: number; tag: number };
  fakta: { stamp: number; line2: number; hl: number; vs: number; tag: number };
  tapi: { chips: number[]; tag: number };
  close: { strike: number; line2: number; hl: number; pill: number; sub: number };
};

export const R0810_SILENT: R0810Timing = {
  mitos: { card: 6, stamp: 30, strike: 70, tag: 90 },
  fakta: { stamp: 6, line2: 30, hl: 60, vs: 90, tag: 130 },
  tapi: { chips: [40, 60, 80], tag: 110 },
  close: { strike: 40, line2: 60, hl: 84, pill: 110, sub: 120 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={2}>
        <Clock from={6} to={10} start={6} dur={30} size={340} night />
      </Pop>
    </div>
    <Stack top={760} gap={8}>
      <Line delay={24} size={96} weight={800}>
        CARBS MALAM
      </Line>
      <Line delay={34} size={78} weight={800}>
        <Highlight delay={46}>AUTOMATIK GEMUK?</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const R0810_HOOK: SceneDef = { id: "hook", dur: 95, el: <Hook />, cues: [[2, "pop", 0.4], [6, "whoosh", 0.35], [46, "swipe", 0.5]] };

const Mitos: React.FC<{ t: R0810Timing["mitos"] }> = ({ t }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <BoxStamp delay={t.stamp} rotate={-6} size={110}>
        MITOS
      </BoxStamp>
    </div>
    <div style={{ position: "absolute", top: 560, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.card} rotate={-1.5}>
        <Card style={{ width: 920, padding: "50px 50px", textAlign: "center" }}>
          <span style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.22 }}>Makan carbs waktu malam terus jadi lemak sebab jam dah malam.</span>
          <div style={{ position: "absolute", right: -30, top: -40 }}>
            <Mark kind="cross" delay={t.strike} size={120} />
          </div>
        </Card>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 1000, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Jam ≠ magic switch</Tag>
    </div>
  </AbsoluteFill>
);

const Fakta: React.FC<{ t: R0810Timing["fakta"] }> = ({ t }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <BoxStamp delay={t.stamp} rotate={4} size={100}>
        FAKTA
      </BoxStamp>
    </div>
    <Stack top={520} gap={12}>
      <Line delay={t.line2} size={52} weight={600} color={C.inkSoft}>
        Untuk perubahan berat badan,
      </Line>
      <Line delay={t.line2 + 8} size={62} weight={800}>
        <Highlight delay={t.hl}>keseluruhan energy intake</Highlight>
        <br />
        dan pattern dalam tempoh masa
      </Line>
      <Line delay={t.vs} size={54} weight={700} style={{ marginTop: 20 }}>
        lebih penting daripada
        <br />
        satu jam makan sahaja.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1240, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Total pattern matters</Tag>
    </div>
  </AbsoluteFill>
);

const CHIPS = ["routine", "hunger", "pilihan makanan"];

const Tapi: React.FC<{ t: R0810Timing["tapi"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={360} gap={10}>
      <Line size={64} weight={800}>
        Tapi timing masih boleh matter
      </Line>
      <Line delay={10} size={54} weight={600} color={C.inkSoft}>
        untuk sesetengah orang dari segi
      </Line>
    </Stack>
    <Stack top={700} gap={24}>
      {CHIPS.map((c, i) => (
        <Pop key={c} delay={t.chips[i]} rotate={i % 2 ? 1.5 : -1.5}>
          <Card style={{ padding: "26px 56px", fontSize: 60, fontWeight: 800, whiteSpace: "nowrap" }}>{c}</Card>
        </Pop>
      ))}
    </Stack>
    <div style={{ position: "absolute", top: 1240, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Context matters</Tag>
    </div>
  </AbsoluteFill>
);

const Close: React.FC<{ t: R0810Timing["close"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={360} gap={14}>
      <Line size={56} weight={700}>
        Jangan tukar satu rule internet
      </Line>
      <Line delay={10} size={72} weight={800}>
        jadi{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          hukum universal.
          <Strike delay={t.strike} width={6} />
        </span>
      </Line>
      <Line delay={t.line2} size={56} weight={700} style={{ marginTop: 34 }}>
        Tengok <Highlight delay={t.hl}>keseluruhan pattern</Highlight>
      </Line>
      <Line delay={t.line2 + 8} size={48} weight={700}>
        <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
          dan apa yang awak boleh sustain.
          <Underline delay={t.hl + 14} width={5} />
        </span>
      </Line>
    </Stack>
    <Stack top={1080} gap={20}>
      <CtaPill icon="save" delay={t.pill}>
        Save
      </CtaPill>
      <Line delay={t.sub} size={42} weight={600} color={C.inkSoft}>
        kalau selalu confuse dengan diet rules.
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const r0810Scenes = (t: R0810Timing, dur: Record<string, number> = { mitos: 140, fakta: 190, tapi: 160, close: 190 }): SceneDef[] => [
  { id: "mitos", dur: dur.mitos, el: <Mitos t={t.mitos} />, cues: [[t.mitos.card, "pop", 0.45], [t.mitos.stamp, "stamp", 0.85], [t.mitos.strike, "scribble", 0.55], [t.mitos.tag, "pop", 0.4]] },
  { id: "fakta", dur: dur.fakta, el: <Fakta t={t.fakta} />, cues: [[t.fakta.stamp, "stamp", 0.8], [t.fakta.hl, "swipe", 0.45], [t.fakta.tag, "pop", 0.4]] },
  { id: "tapi", dur: dur.tapi, el: <Tapi t={t.tapi} />, cues: [...t.tapi.chips.map((f): Cue => [f, "pop", 0.45]), [t.tapi.tag, "pop", 0.4]] },
  { id: "close", dur: dur.close, el: <Close t={t.close} />, cues: [[t.close.strike, "scribble", 0.5], [t.close.hl, "swipe", 0.45], [t.close.pill, "pop", 0.5], [t.close.pill + 4, "chime", 0.45]] },
];

export const R0810_SCENES: SceneDef[] = [R0810_HOOK, ...r0810Scenes(R0810_SILENT)];
