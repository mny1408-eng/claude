// Reel 2 — "Jangan Lupa Protein" (08/10/2026) · Reel B (hybrid: face-cam opener + voice + design)
// Source: Notion 📅 08/10/2026 — Pharmacist Myth to Action, IG REEL 2. QA reviewed.
// Format: "buang" chips vs "kekal" card, then three supports for lean mass. No gram targets: needs vary.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { Chip, CtaPill, Stack, Tag } from "./formats/common";

export type R0810ProteinTiming = {
  buang: { chips: number[]; line2: number; kekal: number; hl: number; tag: number };
  protein: { line1: number; hl: number; parts: number[]; result: number; tag: number };
  close: { line1: number; line2: number; strike: number; tag: number; pill: number; sub: number };
};

export const R0810_PROTEIN_SILENT: R0810ProteinTiming = {
  buang: { chips: [30, 42, 54], line2: 90, kekal: 110, hl: 124, tag: 150 },
  protein: { line1: 0, hl: 14, parts: [40, 64, 88], result: 120, tag: 160 },
  close: { line1: 0, line2: 30, strike: 80, tag: 100, pill: 124, sub: 134 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={500} gap={12}>
      <Line size={70} weight={700}>TURUN BERAT:</Line>
      <Line delay={10} size={76} weight={800}>JANGAN LUPA</Line>
      <Line delay={18} size={120} weight={800}>
        <Highlight delay={30}>PROTEIN</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const R0810_PROTEIN_HOOK: SceneDef = { id: "hook", dur: 90, el: <Hook />, cues: [[0, "whoosh", 0.4], [30, "swipe", 0.5]] };

const Buang: React.FC<{ t: R0810ProteinTiming["buang"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={280} gap={8}>
      <Line size={52} weight={700}>
        Fokus selalu pergi dekat
      </Line>
      <Line delay={6} size={68} weight={800}>
        apa nak <span style={{ color: C.marker }}>dibuang:</span>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 500, left: 60, right: 60, display: "flex", justifyContent: "center", gap: 24 }}>
      {["nasi", "gula", "minyak"].map((w, i) => (
        <Chip key={w} delay={t.chips[i]} rotate={i % 2 ? 2 : -2} size={56}>
          − {w}
        </Chip>
      ))}
    </div>
    <Stack top={720} gap={10}>
      <Line delay={t.line2} size={50} weight={600} color={C.inkSoft}>
        Saya juga nak tanya:
      </Line>
      <Line delay={t.line2 + 6} size={64} weight={800}>
        apa yang perlu <Highlight delay={t.line2 + 18}>dikekalkan?</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1000, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.kekal} rotate={-1.5}>
        <Card style={{ padding: "30px 56px", display: "flex", alignItems: "center", gap: 26 }}>
          <span style={{ fontSize: 60, fontWeight: 800 }}>
            + <Highlight delay={t.hl}>protein yang mencukupi</Highlight>
          </span>
        </Card>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 1240, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Bukan potong sahaja</Tag>
    </div>
  </AbsoluteFill>
);

const PARTS = ["protein yang mencukupi", "resistance exercise", "overall diet yang sesuai"];

const Protein: React.FC<{ t: R0810ProteinTiming["protein"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={250} gap={8}>
      <Line delay={t.line1} size={54} weight={700}>
        Protein bantu penuhi
      </Line>
      <Line delay={t.line1 + 6} size={66} weight={800}>
        <Highlight delay={t.hl}>keperluan tubuh.</Highlight>
      </Line>
    </Stack>
    <Stack top={500} gap={16}>
      {PARTS.map((p, i) => (
        <React.Fragment key={p}>
          {i > 0 && (
            <Pop delay={t.parts[i]}>
              <span style={{ fontSize: 60, fontWeight: 800, color: C.marker, lineHeight: 1 }}>+</span>
            </Pop>
          )}
          <Pop delay={t.parts[i]} rotate={i % 2 ? 1.2 : -1.2}>
            <Card style={{ width: 820, padding: "24px 40px", fontSize: 50, fontWeight: 800, textAlign: "center" }}>{p}</Card>
          </Pop>
        </React.Fragment>
      ))}
    </Stack>
    <Stack top={1130} gap={10}>
      <Line delay={t.result} size={46} weight={600} color={C.inkSoft}>
        menyokong pemeliharaan
      </Line>
      <Line delay={t.result + 6} size={70} weight={800}>
        <Highlight delay={t.result + 16}>lean mass</Highlight>
      </Line>
      <Line delay={t.result + 10} size={46} weight={600} color={C.inkSoft}>
        semasa energy restriction.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1480, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Protein matters</Tag>
    </div>
  </AbsoluteFill>
);

const Close: React.FC<{ t: R0810ProteinTiming["close"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={300} gap={10}>
      <Line delay={t.line1} size={60} weight={800}>
        Jumlah tepat
      </Line>
      <Line delay={t.line1 + 6} size={72} weight={800}>
        <Highlight delay={t.line1 + 16}>tak sama</Highlight> untuk semua.
      </Line>
      <Line delay={t.line2} size={46} weight={600} color={C.inkSoft} style={{ marginTop: 16 }}>
        Terutama kalau ada keadaan
        <br />
        kesihatan tertentu.
      </Line>
    </Stack>
    <Stack top={760} gap={10}>
      <Line delay={t.strike - 14} size={52} weight={700}>
        Jangan kejar{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          nombor random
          <Strike delay={t.strike} width={6} />
        </span>
      </Line>
      <Line delay={t.strike - 8} size={52} weight={700}>
        dari internet.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1000, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Needs vary</Tag>
    </div>
    <Stack top={1150} gap={20}>
      <CtaPill icon="follow" delay={t.pill}>
        Follow
      </CtaPill>
      <Line delay={t.sub} size={42} weight={700} color={C.inkSoft}>
        untuk practical evidence-informed nutrition.
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const r0810ProteinScenes = (t: R0810ProteinTiming, dur: Record<string, number> = { buang: 200, protein: 210, close: 190 }): SceneDef[] => [
  { id: "buang", dur: dur.buang, el: <Buang t={t.buang} />, cues: [...t.buang.chips.map((f): Cue => [f, "pop", 0.4]), [t.buang.line2 + 18, "swipe", 0.4], [t.buang.kekal, "pop", 0.5], [t.buang.tag, "pop", 0.4]] },
  { id: "protein", dur: dur.protein, el: <Protein t={t.protein} />, cues: [[t.protein.hl, "swipe", 0.45], ...t.protein.parts.map((f): Cue => [f, "pop", 0.45]), [t.protein.result + 16, "swipe", 0.45], [t.protein.tag, "pop", 0.4]] },
  { id: "close", dur: dur.close, el: <Close t={t.close} />, cues: [[t.close.line1 + 16, "swipe", 0.45], [t.close.strike, "scribble", 0.5], [t.close.tag, "pop", 0.4], [t.close.pill, "pop", 0.5], [t.close.pill + 4, "chime", 0.45]] },
];

export const R0810_PROTEIN_SCENES: SceneDef[] = [R0810_PROTEIN_HOOK, ...r0810ProteinScenes(R0810_PROTEIN_SILENT)];
