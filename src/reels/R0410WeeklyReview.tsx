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
const FILL_FROM = 6;
const FILL_TO = 70;
const WeekBar: React.FC = () => {
  const f = useCurrentFrame();
  const p = interpolate(f, [FILL_FROM, FILL_TO], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Card style={{ width: 920, padding: "34px 44px" }}>
      <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: 4, color: C.inkSoft, marginBottom: 20 }}>MINGGU NI</div>
      <div style={{ height: 44, borderRadius: 22, background: "#ECE8DC", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${p * 100}%`, background: C.ink, borderRadius: 22 }} />
      </div>
    </Card>
  );
};

const Bar: React.FC = () => (
  <AbsoluteFill>
    <Stack top={300} gap={8}>
      <Line size={52} weight={600} color={C.inkSoft}>
        Saya tak suka review minggu
        <br />
        dengan satu soalan:
      </Line>
      <Line delay={16} size={64} weight={800}>
        <span style={{ position: "relative", display: "inline-block" }}>
          ‘aku perfect tak?’
          <Strike delay={40} width={5} />
        </span>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 760, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={2}>
        <WeekBar />
      </Pop>
    </div>
    <Stack top={1100} gap={8}>
      <Line delay={84} size={58} weight={700}>
        Saya lebih suka
      </Line>
      <Line delay={92} size={92} weight={800}>
        <Highlight delay={102}>tiga soalan.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const QS = [
  { n: "SATU", tag: "What worked?", text: "Apa yang actually menjadi minggu ni?" },
  { n: "DUA", tag: "Where did it break?", text: "Dekat mana routine paling selalu pecah?" },
  { n: "TIGA", tag: "One small adjustment", text: "Apa satu adjustment paling kecil yang boleh buat minggu depan lebih mudah?" },
];
const Q_AT = (i: number) => 10 + i * 80;

const Questions: React.FC = () => (
  <AbsoluteFill>
    <Stack top={290} gap={34}>
      {QS.map((q, i) => (
        <Pop key={q.n} delay={Q_AT(i)} rotate={i % 2 ? 1 : -1}>
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

const LUNCH_AT = (i: number) => 30 + i * 14;

const Contoh: React.FC = () => (
  <AbsoluteFill>
    <Stack top={280} gap={8}>
      <Line size={56} weight={600} color={C.inkSoft}>
        Contoh —
      </Line>
      <Line delay={8} size={66} weight={800}>
        kalau tiga kali <Highlight delay={20}>lunch lambat,</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 530, left: 80, right: 80, display: "flex", justifyContent: "center", gap: 30 }}>
      {[0, 1, 2].map((i) => (
        <Pop key={i} delay={LUNCH_AT(i)}>
          <Card style={{ width: 250, height: 190, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <div style={{ fontSize: 38, fontWeight: 800 }}>lunch</div>
            <Mark kind="cross" delay={LUNCH_AT(i) + 6} size={64} />
          </Card>
        </Pop>
      ))}
    </div>
    <Stack top={860} gap={14}>
      <Line delay={84} size={56} weight={700}>
        mungkin adjustment bukan
      </Line>
      <Line delay={92} size={66} weight={800} color={C.inkSoft}>
        <span style={{ position: "relative", display: "inline-block" }}>
          ‘lebih disiplin’.
          <Strike delay={112} width={5} />
        </span>
      </Line>
      <Line delay={136} size={58} weight={700} style={{ marginTop: 26 }}>
        Mungkin kena sediakan
      </Line>
      <Line delay={144} size={92} weight={800}>
        <Highlight delay={154}>fallback.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const Close: React.FC = () => (
  <AbsoluteFill>
    <Stack top={330} gap={20}>
      <Line size={60} weight={700}>
        Weekly review bukan
        <br />
        sesi marah diri.
      </Line>
      <Line delay={34} size={58} weight={700} style={{ marginTop: 16 }}>
        Ia cara <Highlight delay={46}>kumpul data</Highlight>
        <br />
        daripada hidup sendiri
      </Line>
      <Line delay={66} size={54} weight={600} color={C.inkSoft}>
        dan improve satu benda
        <br />
        pada satu masa.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1010, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18 }}>
      {QS.map((q, i) => (
        <Tag key={q.tag} delay={92 + i * 6}>
          {q.tag}
        </Tag>
      ))}
    </div>
    <Stack top={1250} gap={20}>
      <CtaPill icon="comment" delay={122}>
        Comment
      </CtaPill>
      <Line delay={132} size={44} weight={700} color={C.inkSoft}>
        satu adjustment minggu depan.
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const R0410_REVIEW_SCENES: SceneDef[] = [
  { id: "hook", dur: 100, el: <Hook />, cues: [[0, "whoosh", 0.4], [14, "pop", 0.45], [48, "scribble", 0.55]] },
  { id: "bar", dur: 160, el: <Bar />, cues: [[2, "pop", 0.4], [40, "scribble", 0.5], [FILL_FROM, "swipe", 0.3], [102, "swipe", 0.5]] },
  { id: "questions", dur: Q_AT(2) + 120, el: <Questions />, cues: QS.map((_, i): Cue => [Q_AT(i), "pop", 0.5]) },
  { id: "contoh", dur: 220, el: <Contoh />, cues: [[20, "swipe", 0.45], ...[0, 1, 2].flatMap((i): Cue[] => [[LUNCH_AT(i), "pop", 0.4], [LUNCH_AT(i) + 6, "tick", 0.4]]), [112, "scribble", 0.5], [154, "swipe", 0.5]] },
  { id: "close", dur: 200, el: <Close />, cues: [[46, "swipe", 0.45], ...QS.map((_, i): Cue => [92 + i * 6, "pop", 0.35]), [122, "pop", 0.5], [126, "chime", 0.45]] },
];
