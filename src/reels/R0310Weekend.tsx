// Reel 1 — "Weekend Mindset" (03/10/2026)
// Source: Notion 📅 03/10/2026 — Weekend Real Life, 🎥 REEL 1 (hook, teleprompter, overlays, CTA). QA reviewed 27/09.
// Format: calendar flip (weekday → weekend → restart pattern). No guilt imagery; food is not moralised.
import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Note, Pop, Strike, Underline } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, CtaPill, Stack, Tag } from "./formats/common";
import { CalendarTile, FlipDay } from "./formats/CalendarFlip";

// Frame (within each scene) where each element appears, for the scenes after the hook.
// Defaults = silent version; R0310WeekendReal passes timings measured from Coach Nas's recording.
export type R0310WeekendTiming = {
  // calendar: day flips; sat/sun/mon are the flips that start each caption block, whose own delays are relative to them
  calendar: { days: number[]; isnin: number; jaga: number; jagaHl: number; satLine: number; note: number; sunLine: number; bersalah: number; stamp: number };
  reframe: { line2: number; hl: number; tag1: number; tag2: number; card: number; cardHl: number };
  buang: { struck1: number; struck2: number; strike1: number; strike2: number };
  anchors: { line2: number; tag: number; card: number; checks: number[]; tag2: number };
  close: { line2: number; line3: number; hl: number; pill: number };
};

export const R0310_WEEKEND_SILENT: R0310WeekendTiming = {
  calendar: { days: [4, 18, 32, 46, 60, 110, 185, 240], isnin: 6, jaga: 62, jagaHl: 70, satLine: 4, note: 16, sunLine: 4, bersalah: 12, stamp: 10 },
  reframe: { line2: 12, hl: 28, tag1: 56, tag2: 66, card: 78, cardHl: 104 },
  buang: { struck1: 16, struck2: 30, strike1: 58, strike2: 72 },
  anchors: { line2: 10, tag: 46, card: 54, checks: [0, 1, 2, 3].map((i) => 66 + i * 24), tag2: 66 + 3 * 24 + 16 },
  close: { line2: 34, line3: 42, hl: 54, pill: 84 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={470} gap={8}>
      <Line size={64} weight={700}>WEEKEND YANG</Line>
      <Line delay={8} size={76} weight={800}>
        <Highlight delay={18}>ROSAKKAN PROGRESS…</Highlight>
      </Line>
    </Stack>
    <Stack top={800} gap={8}>
      <Line delay={46} size={60} weight={700} color={C.inkSoft}>ATAU CARA KITA FIKIR</Line>
      <Line delay={54} size={80} weight={800}>
        <span style={{ position: "relative" }}>
          PASAL WEEKEND?
          <Underline delay={66} width={5} />
        </span>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const DAY_LABELS = ["ISNIN", "SELASA", "RABU", "KHAMIS", "JUMAAT", "SABTU", "AHAD", "ISNIN"];
const SAT = 5; // index of the Saturday flip
const SUN = 6;
const MON = 7;

const Calendar: React.FC<{ t: R0310WeekendTiming["calendar"] }> = ({ t }) => {
  const days: FlipDay[] = DAY_LABELS.map((label, i) => ({ label, at: t.days[i], weekend: i === SAT || i === SUN }));
  const [sat, sun, mon] = [t.days[SAT], t.days[SUN], t.days[MON]];
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <CalendarTile days={days} />
      </div>
      <Sequence durationInFrames={sat} layout="none">
        <Stack top={900} gap={8}>
          <Line delay={t.isnin} size={64} weight={700}>Isnin sampai Jumaat</Line>
          <Line delay={t.jaga} size={88} weight={800}>
            <Highlight delay={t.jagaHl}>jaga ketat.</Highlight>
          </Line>
        </Stack>
      </Sequence>
      <Sequence from={sat} durationInFrames={sun - sat} layout="none">
        <Stack top={900} gap={20}>
          <Line delay={t.satLine} size={64} weight={700}>Sabtu datang —</Line>
          <Note delay={t.note} size={104} rotate={-3}>
            ‘dah weekend,
            <br />
            makan je lah.’
          </Note>
        </Stack>
      </Sequence>
      <Sequence from={sun} durationInFrames={mon - sun} layout="none">
        <Stack top={900} gap={8}>
          <Line delay={t.sunLine} size={64} weight={700}>Lepas tu Ahad</Line>
          <Line delay={t.bersalah} size={88} weight={800}>rasa bersalah.</Line>
        </Stack>
      </Sequence>
      <Sequence from={mon} layout="none">
        <div style={{ position: "absolute", top: 930, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <BoxStamp delay={t.stamp} rotate={-5} size={100}>Isnin restart.</BoxStamp>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

const Reframe: React.FC<{ t: R0310WeekendTiming["reframe"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={300} gap={10}>
      <Line size={56} weight={600} color={C.inkSoft}>Kalau pattern ni familiar,</Line>
      <Line delay={t.line2} size={70} weight={800}>
        mungkin masalah bukan
        <br />
        <Highlight delay={t.hl}>weekend semata-mata.</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 740, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 24 }}>
      <Tag delay={t.tag1}>Weekday rigid?</Tag>
      <Tag delay={t.tag2}>Weekend “lepas”?</Tag>
    </div>
    <div style={{ position: "absolute", top: 880, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.card} rotate={-1}>
        <Card style={{ width: 920, padding: "46px 50px", textAlign: "center" }}>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.22 }}>
            Mungkin weekday plan terlalu rigid sampai weekend jadi ruang untuk <Highlight delay={t.cardHl}>‘lepas geram’.</Highlight>
          </div>
        </Card>
      </Pop>
    </div>
  </AbsoluteFill>
);

const Struck: React.FC<{ children: React.ReactNode; delay: number; strikeAt: number; rotate: number }> = ({ children, delay, strikeAt, rotate }) => (
  <Pop delay={delay} rotate={rotate}>
    <Card style={{ padding: "34px 54px" }}>
      <span style={{ position: "relative", display: "inline-block", fontSize: 76, fontWeight: 800, whiteSpace: "nowrap" }}>
        {children}
        <Strike delay={strikeAt} width={5} />
      </span>
    </Card>
  </Pop>
);

const Buang: React.FC<{ t: R0310WeekendTiming["buang"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={440} gap={50}>
      <Line size={66} weight={700}>Cuba buang konsep</Line>
      <Struck delay={t.struck1} strikeAt={t.strike1} rotate={-2}>lima hari perfect,</Struck>
      <Struck delay={t.struck2} strikeAt={t.strike2} rotate={1.5}>dua hari bebas.</Struck>
    </Stack>
  </AbsoluteFill>
);

const ANCHORS = ["protein", "portion yang sedar", "air", "next meal sambung biasa"];

const Anchors: React.FC<{ t: R0310WeekendTiming["anchors"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={280} gap={8}>
      <Line size={52} weight={600} color={C.inkSoft}>Weekend tetap boleh ada</Line>
      <Line delay={t.line2} size={62} weight={800}>makan family, dessert atau makan luar</Line>
    </Stack>
    <div style={{ position: "absolute", top: 620, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Keep anchors</Tag>
    </div>
    <div style={{ position: "absolute", top: 730, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.card}>
        <Card style={{ width: 920, padding: "40px 50px", display: "flex", flexDirection: "column", gap: 26 }}>
          {ANCHORS.map((a, i) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 26 }}>
              <div style={{ width: 66, height: 66, flexShrink: 0, border: `4px solid ${C.ink}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mark kind="check" delay={t.checks[i]} size={50} />
              </div>
              <div style={{ fontSize: 50, fontWeight: 800, whiteSpace: "nowrap" }}>{a}</div>
            </div>
          ))}
        </Card>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 1300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag2}>Next meal normal</Tag>
    </div>
  </AbsoluteFill>
);

const Close: React.FC<{ t: R0310WeekendTiming["close"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={470} gap={10}>
      <Line size={88} weight={800}>Tak perlu perfect.</Line>
      <Line delay={t.line2} size={64} weight={600} color={C.inkSoft} style={{ marginTop: 30 }}>Tapi tak perlu</Line>
      <Line delay={t.line3} size={84} weight={800}>
        <Highlight delay={t.hl}>abandon semuanya.</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1080, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="share" delay={t.pill}>Share</CtaPill>
    </div>
  </AbsoluteFill>
);

export const R0310_WEEKEND_HOOK: SceneDef = { id: "hook", dur: 110, el: <Hook />, cues: [[0, "whoosh", 0.4], [18, "swipe", 0.5], [66, "scribble", 0.5]] };

// Scenes after the hook. Lengths default to the silent version.
export const r0310WeekendScenes = (t: R0310WeekendTiming, dur: Record<string, number> = { calendar: 300, reframe: 190, buang: 125, anchors: 215, close: 150 }): SceneDef[] => [
  {
    id: "calendar",
    dur: dur.calendar,
    el: <Calendar t={t.calendar} />,
    cues: [
      ...t.calendar.days.map((f, i): Cue => [f, i === SAT || i === SUN ? "swipe" : "tick", 0.5]),
      [t.calendar.jagaHl, "swipe", 0.4],
      [t.calendar.days[MON] + t.calendar.stamp, "stamp", 0.85],
    ],
  },
  { id: "reframe", dur: dur.reframe, el: <Reframe t={t.reframe} />, cues: [[t.reframe.hl, "swipe", 0.45], [t.reframe.tag1, "pop", 0.45], [t.reframe.tag2, "pop", 0.45], [t.reframe.card, "whoosh", 0.35]] },
  { id: "buang", dur: dur.buang, el: <Buang t={t.buang} />, cues: [[t.buang.struck1, "pop", 0.45], [t.buang.struck2, "pop", 0.45], [t.buang.strike1, "scribble", 0.55], [t.buang.strike2, "scribble", 0.55]] },
  { id: "anchors", dur: dur.anchors, el: <Anchors t={t.anchors} />, cues: [[t.anchors.tag, "pop", 0.45], ...t.anchors.checks.map((f): Cue => [f, "tick", 0.55]), [t.anchors.tag2, "pop", 0.45]] },
  { id: "close", dur: dur.close, el: <Close t={t.close} />, cues: [[t.close.hl, "swipe", 0.5], [t.close.pill, "pop", 0.5], [t.close.pill + 4, "chime", 0.45]] },
];

export const R0310_SCENES: SceneDef[] = [R0310_WEEKEND_HOOK, ...r0310WeekendScenes(R0310_WEEKEND_SILENT)];
