// Reel 1 — "Baik vs Jahat" (01/10/2026)
// Source: Notion 📅 01/10/2026 — Clinical Pharmacist Lens, 🎥 REEL 1 (hook, teleprompter, overlays, CTA). QA reviewed 27/09.
// Format: Mitos vs Fakta mechanic (label struck out → what to look at instead). The script never calls this a
// "mitos", so the stamps use its own words (“baik” / “jahat”) and no MITOS/FAKTA label is added. Food is not moralised.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, CtaPill, Stack, Tag } from "./formats/common";

// Frame (within each scene) where each element appears. Defaults = silent version;
// R0110Real passes timings measured from Coach Nas's recording.
export type R0110Timing = {
  hook: { line2: number; baik: number; atau: number; jahat: number };
  labels: { line2: number; labelA: number; labelB: number; strikeA: number; strikeB: number; sebab: number; satu: number; satuHl: number };
  tengok: { hl: number; tags: number; card: number; ticks: number[] };
  auto: { cardA: number; hlA: number; cardB: number; hlB: number };
  tanya: { line2: number; hl: number; ask: number[] };
  cta: { hl: number; pill: number };
};

export const R0110_SILENT: R0110Timing = {
  hook: { line2: 8, baik: 26, atau: 40, jahat: 50 },
  labels: { line2: 12, labelA: 40, labelB: 56, strikeA: 150, strikeB: 162, sebab: 116, satu: 124, satuHl: 134 },
  tengok: { hl: 12, tags: 26, card: 60, ticks: [0, 1, 2, 3, 4].map((i) => 70 + i * 22) },
  auto: { cardA: 4, hlA: 22, cardB: 80, hlB: 100 },
  tanya: { line2: 8, hl: 18, ask: [0, 1, 2, 3].map((i) => 34 + i * 34) },
  cta: { hl: 20, pill: 44 },
};

const Hook: React.FC<{ t: R0110Timing["hook"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={420} gap={8}>
      <Line size={64} weight={700}>SAYA TAK SUKA</Line>
      <Line delay={t.line2} size={76} weight={800}>LABEL MAKANAN</Line>
    </Stack>
    <Stack top={690} gap={26}>
      <BoxStamp delay={t.baik} rotate={-5} size={130}>“BAIK”</BoxStamp>
      <Line delay={t.atau} size={56} weight={700} color={C.inkSoft}>ATAU</Line>
      <BoxStamp delay={t.jahat} rotate={4} size={130}>“JAHAT”.</BoxStamp>
    </Stack>
  </AbsoluteFill>
);

const Label: React.FC<{ children: React.ReactNode; delay: number; strikeAt: number; rotate: number }> = ({ children, delay, strikeAt, rotate }) => (
  <Pop delay={delay} rotate={rotate}>
    <Card style={{ padding: "32px 50px" }}>
      <span style={{ position: "relative", display: "inline-block", fontSize: 72, fontWeight: 800, whiteSpace: "nowrap" }}>
        {children}
        <Strike delay={strikeAt} width={5} />
      </span>
    </Card>
  </Pop>
);

const Labels: React.FC<{ t: R0110Timing["labels"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={270} gap={8}>
      <Line size={50} weight={600} color={C.inkSoft}>
        Sebagai clinical pharmacist
        <br />
        dan coach,
      </Line>
      <Line delay={t.line2} size={66} weight={800}>
        saya berhati-hati
        <br />
        bila orang cakap
      </Line>
    </Stack>
    <Stack top={690} gap={44}>
      <Label delay={t.labelA} strikeAt={t.strikeA} rotate={-2}>makanan ni ‘baik’,</Label>
      <Label delay={t.labelB} strikeAt={t.strikeB} rotate={1.5}>makanan tu ‘jahat’.</Label>
    </Stack>
    <Stack top={1150} gap={8}>
      <Line delay={t.sebab} size={58} weight={700}>
        Sebab nutrition
        <br />
        jarang sesimple
      </Line>
      <Line delay={t.satu} size={88} weight={800}>
        <Highlight delay={t.satuHl}>satu label.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const LOOK = ["amount", "frequency", "keseluruhan diet", "tujuan individu", "konteks kesihatan"];
const OVERLAYS = ["Context", "Amount", "Frequency", "Overall pattern"];

const Tengok: React.FC<{ t: R0110Timing["tengok"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={280} gap={8}>
      <Line size={84} weight={800}>
        Kita kena <Highlight delay={t.hl}>tengok</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 450, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
      {OVERLAYS.map((o, i) => (
        <Tag key={o} delay={t.tags + i * 8}>{o}</Tag>
      ))}
    </div>
    <div style={{ position: "absolute", top: 660, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.card}>
        <Card style={{ width: 920, padding: "40px 50px", display: "flex", flexDirection: "column", gap: 24 }}>
          {LOOK.map((a, i) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 26 }}>
              <div style={{ width: 64, height: 64, flexShrink: 0, border: `4px solid ${C.ink}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mark kind="check" delay={t.ticks[i]} size={48} />
              </div>
              <div style={{ fontSize: 54, fontWeight: 800, whiteSpace: "nowrap" }}>{a}</div>
            </div>
          ))}
        </Card>
      </Pop>
    </div>
  </AbsoluteFill>
);

const Auto: React.FC<{ t: R0110Timing["auto"] }> = ({ t }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 400, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.cardA} rotate={-1.5}>
        <Card style={{ width: 920, padding: "46px 50px", textAlign: "center" }}>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.22 }}>
            Buang satu makanan <Highlight delay={t.hlA}>tak automatik</Highlight> jadikan diet bagus.
          </div>
        </Card>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 850, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.cardB} rotate={1.5}>
        <Card style={{ width: 920, padding: "46px 50px", textAlign: "center" }}>
          <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.22 }}>
            Dan makan satu makanan tertentu pun <Highlight delay={t.hlB}>tak automatik</Highlight> jadikan diet gagal.
          </div>
        </Card>
      </Pop>
    </div>
  </AbsoluteFill>
);

const ASK = ["apa peranan makanan ni\ndalam pattern aku,", "berapa kerap,", "berapa banyak,", "dan adakah structure\nkeseluruhan membantu goal aku?"];

const Tanya: React.FC<{ t: R0110Timing["tanya"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={300} gap={8}>
      <Line size={54} weight={600} color={C.inkSoft}>Lebih berguna</Line>
      <Line delay={t.line2} size={80} weight={800}>
        kalau kita <Highlight delay={t.hl}>tanya:</Highlight>
      </Line>
    </Stack>
    <Stack top={620} gap={30}>
      {ASK.map((q, i) => (
        <Pop key={q} delay={t.ask[i]} rotate={i % 2 ? 1 : -1}>
          <Card style={{ width: 920, padding: "30px 44px", textAlign: "center", fontSize: 46, fontWeight: 800, lineHeight: 1.2, whiteSpace: "pre-line" }}>{q}</Card>
        </Pop>
      ))}
    </Stack>
  </AbsoluteFill>
);

const CTA: React.FC<{ t: R0110Timing["cta"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={520} gap={10}>
      <Line size={56} weight={600} color={C.inkSoft}>Context · Amount · Frequency</Line>
      <Line delay={10} size={84} weight={800}>
        <Highlight delay={t.hl}>Overall pattern</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 960, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="save" delay={t.pill}>Follow/save.</CtaPill>
    </div>
  </AbsoluteFill>
);

// Scene lengths default to the silent version; the voiced version passes its own.
export const r0110Scenes = (t: R0110Timing, dur: Record<string, number> = { hook: 115, labels: 225, tengok: 225, auto: 195, tanya: 215, cta: 120 }): SceneDef[] => [
  { id: "hook", dur: dur.hook, el: <Hook t={t.hook} />, cues: [[0, "whoosh", 0.4], [t.hook.baik, "stamp", 0.85], [t.hook.jahat, "stamp", 0.85]] },
  {
    id: "labels",
    dur: dur.labels,
    el: <Labels t={t.labels} />,
    cues: [[t.labels.labelA, "pop", 0.45], [t.labels.labelB, "pop", 0.45], [t.labels.satuHl, "swipe", 0.5], [t.labels.strikeA, "scribble", 0.55], [t.labels.strikeB, "scribble", 0.55]],
  },
  {
    id: "tengok",
    dur: dur.tengok,
    el: <Tengok t={t.tengok} />,
    cues: [[t.tengok.hl, "swipe", 0.45], ...OVERLAYS.map((_, i): Cue => [t.tengok.tags + i * 8, "pop", 0.4]), ...t.tengok.ticks.map((f): Cue => [f, "tick", 0.55])],
  },
  { id: "auto", dur: dur.auto, el: <Auto t={t.auto} />, cues: [[t.auto.cardA, "pop", 0.45], [t.auto.hlA, "swipe", 0.45], [t.auto.cardB, "pop", 0.45], [t.auto.hlB, "swipe", 0.45]] },
  { id: "tanya", dur: dur.tanya, el: <Tanya t={t.tanya} />, cues: [[t.tanya.hl, "swipe", 0.45], ...t.tanya.ask.map((f): Cue => [f, "pop", 0.45])] },
  { id: "cta", dur: dur.cta, el: <CTA t={t.cta} />, cues: [[t.cta.hl, "swipe", 0.45], [t.cta.pill, "pop", 0.5], [t.cta.pill + 4, "chime", 0.45]] },
];

export const R0110_SCENES = r0110Scenes(R0110_SILENT);
