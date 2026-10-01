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

const SAT = 110;
const SUN = 185;
const MON = 240;
const DAYS: FlipDay[] = [
  { label: "ISNIN", at: 4 },
  { label: "SELASA", at: 18 },
  { label: "RABU", at: 32 },
  { label: "KHAMIS", at: 46 },
  { label: "JUMAAT", at: 60 },
  { label: "SABTU", at: SAT, weekend: true },
  { label: "AHAD", at: SUN, weekend: true },
  { label: "ISNIN", at: MON },
];
const CAL_DUR = 300;

const Calendar: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CalendarTile days={DAYS} />
    </div>
    <Sequence durationInFrames={SAT} layout="none">
      <Stack top={900} gap={8}>
        <Line delay={6} size={64} weight={700}>Isnin sampai Jumaat</Line>
        <Line delay={62} size={88} weight={800}>
          <Highlight delay={70}>jaga ketat.</Highlight>
        </Line>
      </Stack>
    </Sequence>
    <Sequence from={SAT} durationInFrames={SUN - SAT} layout="none">
      <Stack top={900} gap={20}>
        <Line delay={4} size={64} weight={700}>Sabtu datang —</Line>
        <Note delay={16} size={104} rotate={-3}>
          ‘dah weekend,
          <br />
          makan je lah.’
        </Note>
      </Stack>
    </Sequence>
    <Sequence from={SUN} durationInFrames={MON - SUN} layout="none">
      <Stack top={900} gap={8}>
        <Line delay={4} size={64} weight={700}>Lepas tu Ahad</Line>
        <Line delay={12} size={88} weight={800}>rasa bersalah.</Line>
      </Stack>
    </Sequence>
    <Sequence from={MON} layout="none">
      <div style={{ position: "absolute", top: 930, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BoxStamp delay={10} rotate={-5} size={100}>Isnin restart.</BoxStamp>
      </div>
    </Sequence>
  </AbsoluteFill>
);

const Reframe: React.FC = () => (
  <AbsoluteFill>
    <Stack top={300} gap={10}>
      <Line size={56} weight={600} color={C.inkSoft}>Kalau pattern ni familiar,</Line>
      <Line delay={12} size={70} weight={800}>
        mungkin masalah bukan
        <br />
        <Highlight delay={28}>weekend semata-mata.</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 740, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 24 }}>
      <Tag delay={56}>Weekday rigid?</Tag>
      <Tag delay={66}>Weekend “lepas”?</Tag>
    </div>
    <div style={{ position: "absolute", top: 880, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={78} rotate={-1}>
        <Card style={{ width: 920, padding: "46px 50px", textAlign: "center" }}>
          <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.22 }}>
            Mungkin weekday plan terlalu rigid sampai weekend jadi ruang untuk <Highlight delay={104}>‘lepas geram’.</Highlight>
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

const Buang: React.FC = () => (
  <AbsoluteFill>
    <Stack top={440} gap={50}>
      <Line size={66} weight={700}>Cuba buang konsep</Line>
      <Struck delay={16} strikeAt={58} rotate={-2}>lima hari perfect,</Struck>
      <Struck delay={30} strikeAt={72} rotate={1.5}>dua hari bebas.</Struck>
    </Stack>
  </AbsoluteFill>
);

const ANCHORS = ["protein", "portion yang sedar", "air", "next meal sambung biasa"];
const ANCHOR_AT = (i: number) => 66 + i * 24;

const Anchors: React.FC = () => (
  <AbsoluteFill>
    <Stack top={280} gap={8}>
      <Line size={52} weight={600} color={C.inkSoft}>Weekend tetap boleh ada</Line>
      <Line delay={10} size={62} weight={800}>makan family, dessert atau makan luar</Line>
    </Stack>
    <div style={{ position: "absolute", top: 620, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={46}>Keep anchors</Tag>
    </div>
    <div style={{ position: "absolute", top: 730, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={54}>
        <Card style={{ width: 920, padding: "40px 50px", display: "flex", flexDirection: "column", gap: 26 }}>
          {ANCHORS.map((a, i) => (
            <div key={a} style={{ display: "flex", alignItems: "center", gap: 26 }}>
              <div style={{ width: 66, height: 66, flexShrink: 0, border: `4px solid ${C.ink}`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mark kind="check" delay={ANCHOR_AT(i)} size={50} />
              </div>
              <div style={{ fontSize: 50, fontWeight: 800, whiteSpace: "nowrap" }}>{a}</div>
            </div>
          ))}
        </Card>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 1300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={ANCHOR_AT(3) + 16}>Next meal normal</Tag>
    </div>
  </AbsoluteFill>
);

const Close: React.FC = () => (
  <AbsoluteFill>
    <Stack top={470} gap={10}>
      <Line size={88} weight={800}>Tak perlu perfect.</Line>
      <Line delay={34} size={64} weight={600} color={C.inkSoft} style={{ marginTop: 30 }}>Tapi tak perlu</Line>
      <Line delay={42} size={84} weight={800}>
        <Highlight delay={54}>abandon semuanya.</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1080, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="share" delay={84}>Share</CtaPill>
    </div>
  </AbsoluteFill>
);

const flipCues: Cue[] = DAYS.map((d): Cue => [d.at, d.at === SAT || d.at === SUN ? "swipe" : "tick", 0.5]);

export const R0310_SCENES: SceneDef[] = [
  { id: "hook", dur: 110, el: <Hook />, cues: [[0, "whoosh", 0.4], [18, "swipe", 0.5], [66, "scribble", 0.5]] },
  { id: "calendar", dur: CAL_DUR, el: <Calendar />, cues: [...flipCues, [70, "swipe", 0.4], [MON + 10, "stamp", 0.85]] },
  { id: "reframe", dur: 190, el: <Reframe />, cues: [[28, "swipe", 0.45], [56, "pop", 0.45], [66, "pop", 0.45], [78, "whoosh", 0.35]] },
  { id: "buang", dur: 125, el: <Buang />, cues: [[16, "pop", 0.45], [30, "pop", 0.45], [58, "scribble", 0.55], [72, "scribble", 0.55]] },
  { id: "anchors", dur: 215, el: <Anchors />, cues: [[46, "pop", 0.45], ...ANCHORS.map((_, i): Cue => [ANCHOR_AT(i), "tick", 0.55]), [ANCHOR_AT(3) + 16, "pop", 0.45]] },
  { id: "close", dur: 150, el: <Close />, cues: [[54, "swipe", 0.5], [84, "pop", 0.5], [88, "chime", 0.45]] },
];
