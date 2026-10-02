// Reel 2 — "3 Soalan Weekly Review" (04/10/2026)
// Source: Notion 📅 04/10/2026 — Reset + Reflection, 🎥 REEL 2 (hook, teleprompter, overlays, CTA). QA reviewed 27/09.
// Format: progress bar (the week fills up, then three review questions). Reel 1 that day is Notes app.
// Text from the script only; no shaming language beyond the script's own.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { CtaPill, Stack, Tag } from "./formats/common";

// Frame (within each scene) where each element appears, for the scenes after the hook.
// Defaults = silent version; R0410WeeklyReviewReal passes timings measured from Coach Nas's recording.
export type R0410ReviewTiming = {
  bar: { line2: number; strike: number; fillFrom: number; fillTo: number; more: number; tiga: number; hl: number };
  questions: { q: number[] };
  contoh: { line2: number; hl: number; lunch: number[]; bukan: number; disiplin: number; strike: number; mungkin: number; fallback: number; fhl: number };
  close: { line2: number; hl: number; line3: number; tags: number; pill: number; sub: number };
};

export const R0410_REVIEW_SILENT: R0410ReviewTiming = {
  bar: { line2: 16, strike: 40, fillFrom: 6, fillTo: 70, more: 84, tiga: 92, hl: 102 },
  questions: { q: [10, 90, 170] },
  contoh: { line2: 8, hl: 20, lunch: [30, 44, 58], bukan: 84, disiplin: 92, strike: 112, mungkin: 136, fallback: 144, fhl: 154 },
  close: { line2: 34, hl: 46, line3: 66, tags: 92, pill: 122, sub: 132 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={480} gap={26}>
      <Line size={70} weight={700}>SAYA TAK TANYA</Line>
      <Pop delay={14} rotate={-1.5}>
        <Card style={{ padding: "36px 56px", position: "relative" }}>
          <span style={{ position: "relative", display: "inline-block", fontSize: 76, fontWeight: 800, whiteSpace: "nowrap" }}>
            “MINGGU NI
            <br />
            PERFECT TAK?”
            <Strike delay={48} width={6} />
          </span>
        </Card>
      </Pop>
    </Stack>
  </AbsoluteFill>
);

// Week progress bar: fills across the week, never labelled with a score.
const WeekBar: React.FC<{ from: number; to: number }> = ({ from, to }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [from, to], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Card style={{ width: 920, padding: "34px 44px" }}>
      <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: 4, color: C.inkSoft, marginBottom: 20 }}>MINGGU NI</div>
      <div style={{ height: 44, borderRadius: 22, background: "#ECE8DC", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${p * 100}%`, background: C.ink, borderRadius: 22 }} />
      </div>
    </Card>
  );
};

const Bar: React.FC<{ t: R0410ReviewTiming["bar"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={300} gap={8}>
      <Line size={52} weight={600} color={C.inkSoft}>
        Saya tak suka review minggu
        <br />
        dengan satu soalan:
      </Line>
      <Line delay={t.line2} size={64} weight={800}>
        <span style={{ position: "relative", display: "inline-block" }}>
          ‘aku perfect tak?’
          <Strike delay={t.strike} width={5} />
        </span>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 760, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={2}>
        <WeekBar from={t.fillFrom} to={t.fillTo} />
      </Pop>
    </div>
    <Stack top={1100} gap={8}>
      <Line delay={t.more} size={58} weight={700}>
        Saya lebih suka
      </Line>
      <Line delay={t.tiga} size={92} weight={800}>
        <Highlight delay={t.hl}>tiga soalan.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const QS = [
  { n: "SATU", tag: "What worked?", text: "Apa yang actually menjadi minggu ni?" },
  { n: "DUA", tag: "Where did it break?", text: "Dekat mana routine paling selalu pecah?" },
  { n: "TIGA", tag: "One small adjustment", text: "Apa satu adjustment paling kecil yang boleh buat minggu depan lebih mudah?" },
];

const Questions: React.FC<{ t: R0410ReviewTiming["questions"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={290} gap={34}>
      {QS.map((q, i) => (
        <Pop key={q.n} delay={t.q[i]} rotate={i % 2 ? 1 : -1}>
          <Card style={{ width: 940, padding: "32px 44px", textAlign: "left" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 12 }}>
              <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: 4, color: C.marker }}>{q.n}</span>
              <span style={{ fontSize: 30, fontWeight: 700, color: C.inkSoft }}>· {q.tag}</span>
            </div>
            <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.2 }}>{q.text}</div>
          </Card>
        </Pop>
      ))}
    </Stack>
  </AbsoluteFill>
);

const Contoh: React.FC<{ t: R0410ReviewTiming["contoh"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={280} gap={8}>
      <Line size={56} weight={600} color={C.inkSoft}>
        Contoh —
      </Line>
      <Line delay={t.line2} size={66} weight={800}>
        kalau tiga kali <Highlight delay={t.hl}>lunch lambat,</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 530, left: 80, right: 80, display: "flex", justifyContent: "center", gap: 30 }}>
      {t.lunch.map((at, i) => (
        <Pop key={i} delay={at}>
          <Card style={{ width: 250, height: 190, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <div style={{ fontSize: 38, fontWeight: 800 }}>lunch</div>
            <Mark kind="cross" delay={at + 6} size={64} />
          </Card>
        </Pop>
      ))}
    </div>
    <Stack top={860} gap={14}>
      <Line delay={t.bukan} size={56} weight={700}>
        mungkin adjustment bukan
      </Line>
      <Line delay={t.disiplin} size={66} weight={800} color={C.inkSoft}>
        <span style={{ position: "relative", display: "inline-block" }}>
          ‘lebih disiplin’.
          <Strike delay={t.strike} width={5} />
        </span>
      </Line>
      <Line delay={t.mungkin} size={58} weight={700} style={{ marginTop: 26 }}>
        Mungkin kena sediakan
      </Line>
      <Line delay={t.fallback} size={92} weight={800}>
        <Highlight delay={t.fhl}>fallback.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const Close: React.FC<{ t: R0410ReviewTiming["close"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={330} gap={20}>
      <Line size={60} weight={700}>
        Weekly review bukan
        <br />
        sesi marah diri.
      </Line>
      <Line delay={t.line2} size={58} weight={700} style={{ marginTop: 16 }}>
        Ia cara <Highlight delay={t.hl}>kumpul data</Highlight>
        <br />
        daripada hidup sendiri
      </Line>
      <Line delay={t.line3} size={54} weight={600} color={C.inkSoft}>
        dan improve satu benda
        <br />
        pada satu masa.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1010, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
      {QS.map((q, i) => (
        <Tag key={q.tag} delay={t.tags + i * 6}>
          {q.tag}
        </Tag>
      ))}
    </div>
    <Stack top={1250} gap={20}>
      <CtaPill icon="comment" delay={t.pill}>
        Comment
      </CtaPill>
      <Line delay={t.sub} size={44} weight={700} color={C.inkSoft}>
        satu adjustment minggu depan.
      </Line>
    </Stack>
  </AbsoluteFill>
);

// Scenes after the hook. Lengths default to the silent version.
export const r0410ReviewScenes = (t: R0410ReviewTiming, dur: Record<string, number> = { bar: 160, questions: 290, contoh: 220, close: 200 }): SceneDef[] => [
  { id: "bar", dur: dur.bar, el: <Bar t={t.bar} />, cues: [[2, "pop", 0.4], [t.bar.strike, "scribble", 0.5], [t.bar.fillFrom, "swipe", 0.3], [t.bar.hl, "swipe", 0.5]] },
  { id: "questions", dur: dur.questions, el: <Questions t={t.questions} />, cues: t.questions.q.map((f): Cue => [f, "pop", 0.5]) },
  {
    id: "contoh",
    dur: dur.contoh,
    el: <Contoh t={t.contoh} />,
    cues: [[t.contoh.hl, "swipe", 0.45], ...t.contoh.lunch.flatMap((f): Cue[] => [[f, "pop", 0.4], [f + 6, "tick", 0.4]]), [t.contoh.strike, "scribble", 0.5], [t.contoh.fhl, "swipe", 0.5]],
  },
  {
    id: "close",
    dur: dur.close,
    el: <Close t={t.close} />,
    cues: [[t.close.hl, "swipe", 0.45], ...QS.map((_, i): Cue => [t.close.tags + i * 6, "pop", 0.35]), [t.close.pill, "pop", 0.5], [t.close.pill + 4, "chime", 0.45]],
  },
];

export const R0410_REVIEW_SCENES: SceneDef[] = [
  { id: "hook", dur: 100, el: <Hook />, cues: [[0, "whoosh", 0.4], [14, "pop", 0.45], [48, "scribble", 0.55]] },
  ...r0410ReviewScenes(R0410_REVIEW_SILENT),
];
