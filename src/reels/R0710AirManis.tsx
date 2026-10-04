// Reel 2 — "Air Manis" (07/10/2026) · Reel B (hybrid: 5s face-cam hook + voice + design)
// Source: Notion 📅 07/10/2026 — Mamak Decisions, IG REEL 2. QA reviewed.
// Format: a week of meals, each with its drink; some swap to air kosong. No calorie/sugar numbers, sugar not demonised.
import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, CtaPill, Stack, Tag } from "./formats/common";

export type R0710Timing = {
  nasi: { strike: number; line2: number; minuman: number; hl: number; tag: number };
  // intro: optional "Tengok minuman." title on top of this scene (voiced cut, where the nasi scene is folded in); header: when it appears
  week: { meals: number[]; swaps: number[]; line2: number; intro?: number; header?: number };
  racun: { stamp: number; strike: number; tag: number; line2: number; hl: number };
  close: { hl: number; tag: number; pill: number };
};

export const R0710_SILENT: R0710Timing = {
  nasi: { strike: 44, line2: 64, minuman: 104, hl: 114, tag: 130 },
  week: { meals: [10, 18, 26, 34, 42], swaps: [96, 116], line2: 70 },
  racun: { stamp: 8, strike: 34, tag: 46, line2: 70, hl: 96 },
  close: { hl: 24, tag: 44, pill: 64 },
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={480} gap={10}>
      <Line size={70} weight={700}>KADANG BUKAN</Line>
      <Line delay={10} size={110} weight={800}>
        <span style={{ position: "relative", display: "inline-block" }}>
          NASI
          <Strike delay={34} width={8} />
        </span>
      </Line>
      <Line delay={22} size={66} weight={700}>
        YANG MUDAH <Highlight delay={44}>DIUBAH</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const R0710_HOOK: SceneDef = { id: "hook", dur: 90, el: <Hook />, cues: [[0, "whoosh", 0.4], [34, "scribble", 0.55], [44, "swipe", 0.45]] };

const Nasi: React.FC<{ t: R0710Timing["nasi"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={320} gap={10}>
      <Line size={56} weight={700}>
        Bila makan luar, ramai terus
      </Line>
      <Line delay={10} size={72} weight={800}>
        fokus{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          potong nasi.
          <Strike delay={t.strike} width={6} />
        </span>
      </Line>
    </Stack>
    <Stack top={680} gap={10}>
      <Line delay={t.line2} size={46} weight={600} color={C.inkSoft} style={{ whiteSpace: "nowrap" }}>
        Tapi kadang perubahan paling senang
        <br />
        bukan dekat nasi pun.
      </Line>
    </Stack>
    <Stack top={960} gap={18}>
      <Line delay={t.minuman} size={96} weight={800}>
        <Highlight delay={t.hl}>Tengok minuman.</Highlight>
      </Line>
      <Tag delay={t.tag}>Check minuman</Tag>
    </Stack>
  </AbsoluteFill>
);

// One meal tile: a plate and a cup; `swapAt` flips the cup from "minuman bergula" to "air kosong".
const Meal: React.FC<{ at: number; swapAt?: number; frame: number }> = ({ at, swapAt, frame }) => {
  const swapped = swapAt !== undefined && frame >= swapAt;
  return (
    <Pop delay={at}>
      <Card style={{ width: 300, padding: "26px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <div style={{ fontSize: 34, fontWeight: 800, color: C.inkSoft }}>meal</div>
        <svg viewBox="0 0 120 120" width={110} height={110}>
          <path d="M 28 20 L 92 20 L 84 108 L 36 108 Z" fill={swapped ? "#DCEAF0" : C.marker} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
        </svg>
        <div style={{ fontSize: 30, fontWeight: 800, textAlign: "center", lineHeight: 1.15, color: swapped ? C.ink : C.marker }}>{swapped ? "air kosong" : "minuman bergula"}</div>
      </Card>
    </Pop>
  );
};

const Week: React.FC<{ t: R0710Timing["week"] }> = ({ t }) => {
  const intro = t.intro !== undefined;
  const h = t.header ?? 0;
  const shift = intro ? 150 : 0; // push the rest down when the title is shown
  return (
    <AbsoluteFill>
      {intro && (
        <Stack top={250} gap={0}>
          <Line delay={t.intro} size={84} weight={800}>
            <Highlight delay={t.intro! + 8}>Tengok minuman.</Highlight>
          </Line>
        </Stack>
      )}
      <Stack top={270 + shift} gap={8}>
        <Line delay={h} size={54} weight={700}>
          Kalau hampir setiap meal
        </Line>
        <Line delay={h + 6} size={64} weight={800}>
          ada <Highlight delay={h + 14}>minuman bergula,</Highlight>
        </Line>
      </Stack>
      <WeekGrid t={t} top={520 + shift} />
      <Stack top={1240 + shift} gap={8}>
        <Line delay={t.line2} size={50} weight={700}>
          cuba tukar <Highlight delay={t.line2 + 12}>sebahagian occasion</Highlight>
        </Line>
        <Line delay={t.line2 + 8} size={46} weight={600} color={C.inkSoft}>
          kepada air kosong atau pilihan
          <br />
          kurang gula yang awak suka.
        </Line>
      </Stack>
    </AbsoluteFill>
  );
};

const WeekGrid: React.FC<{ t: R0710Timing["week"]; top: number }> = ({ t, top }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top, left: 40, right: 40, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
      {t.meals.map((at, i) => (
        <Meal key={i} at={at} swapAt={i === 1 ? t.swaps[0] : i === 3 ? t.swaps[1] : undefined} frame={frame} />
      ))}
    </div>
  );
};


const Racun: React.FC<{ t: R0710Timing["racun"] }> = ({ t }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 380, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative" }}>
        <BoxStamp delay={t.stamp} rotate={-4} size={88}>
          GULA = RACUN
        </BoxStamp>
        <Strike delay={t.strike} width={8} style={{ top: "42%" }} />
      </div>
    </div>
    <div style={{ position: "absolute", top: 600, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Bukan “gula = racun”</Tag>
    </div>
    <div style={{ position: "absolute", top: 760, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={t.line2}>
        <Card style={{ width: 920, padding: "44px 50px", textAlign: "center" }}>
          <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1.25 }}>
            Cuma minuman boleh menyumbang energy tanpa semestinya memberi <Highlight delay={t.hl}>satiety yang sama</Highlight> macam makanan.
          </div>
        </Card>
      </Pop>
    </div>
  </AbsoluteFill>
);

const Close: React.FC<{ t: R0710Timing["close"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={460} gap={10}>
      <Line size={66} weight={700}>
        Start dengan
      </Line>
      <Line delay={8} size={88} weight={800}>
        <Highlight delay={t.hl}>satu perubahan</Highlight>
      </Line>
      <Line delay={16} size={60} weight={700}>
        yang awak boleh ulang.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 900, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Start one change</Tag>
    </div>
    <div style={{ position: "absolute", top: 1050, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="share" delay={t.pill}>
        Share geng mamak
      </CtaPill>
    </div>
  </AbsoluteFill>
);

export const r0710Scenes = (t: R0710Timing, dur: Record<string, number> = { nasi: 170, week: 200, racun: 170, close: 130 }): SceneDef[] => [
  { id: "nasi", dur: dur.nasi, el: <Nasi t={t.nasi} />, cues: [[t.nasi.strike, "scribble", 0.5], [t.nasi.hl, "swipe", 0.5], [t.nasi.tag, "pop", 0.4]] },
  { id: "week", dur: dur.week, el: <Week t={t.week} />, cues: [...(t.week.intro !== undefined ? ([[t.week.intro + 8, "swipe", 0.45]] as Cue[]) : []), [(t.week.header ?? 0) + 14, "swipe", 0.4], ...t.week.meals.map((f): Cue => [f, "pop", 0.35]), ...t.week.swaps.map((f): Cue => [f, "tick", 0.55]), [t.week.line2 + 12, "swipe", 0.4]] },
  { id: "racun", dur: dur.racun, el: <Racun t={t.racun} />, cues: [[t.racun.stamp, "stamp", 0.8], [t.racun.strike, "scribble", 0.55], [t.racun.tag, "pop", 0.4], [t.racun.line2, "pop", 0.4], [t.racun.hl, "swipe", 0.4]] },
  { id: "close", dur: dur.close, el: <Close t={t.close} />, cues: [[t.close.hl, "swipe", 0.45], [t.close.tag, "pop", 0.4], [t.close.pill, "pop", 0.5], [t.close.pill + 4, "chime", 0.45]] },
];

export const R0710_SCENES: SceneDef[] = [R0710_HOOK, ...r0710Scenes(R0710_SILENT)];
