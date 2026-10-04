// Reel 2 — "Satu Backup dalam Bag" (06/10/2026) · Reel B (hybrid: 5s face-cam hook + voice + design)
// Source: Notion 📅 06/10/2026 — Shift Worker Survival, IG REEL 2. QA reviewed.
// Format: hunger meter + bag reveal (backup items pop out of a bag). Items are only the script's own examples.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { CtaPill, Stack, Tag } from "./formats/common";

export type R0610Timing = {
  krisis: { meterFrom: number; meterTo: number; label: number; line2: number; hl: number; tag: number };
  bag: { line1: number; items: number[]; last: number; tag: number };
  close: { strike: number; line2: number; hl: number; tag: number; pill: number };
};

export const R0610_SILENT: R0610Timing = {
  krisis: { meterFrom: 10, meterTo: 70, label: 72, line2: 96, hl: 112, tag: 130 },
  bag: { line1: 0, items: [40, 58, 76, 94, 112], last: 136, tag: 160 },
  close: { strike: 40, line2: 56, hl: 90, tag: 110, pill: 128 },
};

// A simple tote bag drawn in SVG.
const Bag: React.FC<{ size?: number }> = ({ size = 360 }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} style={{ filter: "drop-shadow(0 12px 26px rgba(40,40,20,0.2))" }}>
    <path d="M 62 70 C 62 26, 138 26, 138 70" fill="none" stroke={C.ink} strokeWidth={10} strokeLinecap="round" />
    <path d="M 34 70 L 166 70 L 154 188 L 46 188 Z" fill={C.ink} />
    <rect x={34} y={70} width={132} height={16} fill={C.gold} />
  </svg>
);

const Hook: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={2}>
        <Bag size={380} />
      </Pop>
    </div>
    <Stack top={820} gap={8}>
      <Line delay={20} size={96} weight={800}>
        <Highlight delay={30}>SATU BACKUP</Highlight>
      </Line>
      <Line delay={34} size={76} weight={700}>
        DALAM BAG
      </Line>
    </Stack>
  </AbsoluteFill>
);

export const R0610_HOOK: SceneDef = { id: "hook", dur: 95, el: <Hook />, cues: [[2, "pop", 0.45], [30, "swipe", 0.5]] };

const Meter: React.FC<{ from: number; to: number; label: number }> = ({ from, to, label }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [from, to], [0.1, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Card style={{ width: 920, padding: "34px 44px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34, fontWeight: 800, letterSpacing: 3, marginBottom: 18 }}>
        <span style={{ color: C.inkSoft }}>LAPAR</span>
        <span style={{ color: C.marker, opacity: f >= label ? 1 : 0 }}>TERLALU LAPAR</span>
      </div>
      <div style={{ height: 44, borderRadius: 22, background: "#ECE8DC", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${p * 100}%`, background: p > 0.75 ? C.marker : C.ink, borderRadius: 22 }} />
      </div>
    </Card>
  );
};

const Krisis: React.FC<{ t: R0610Timing["krisis"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={300} gap={8}>
      <Line size={54} weight={700}>
        Kalau awak selalu sampai tahap
        <br />
        terlalu lapar masa kerja,
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 560, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={2}>
        <Meter from={t.meterFrom} to={t.meterTo} label={t.label} />
      </Pop>
    </div>
    <Stack top={880} gap={10}>
      <Line delay={t.line2} size={60} weight={800}>
        jangan tunggu <Highlight delay={t.hl}>krisis</Highlight>
      </Line>
      <Line delay={t.line2 + 6} size={56} weight={700}>
        baru decide nak makan apa.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1150, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Plan before hungry</Tag>
    </div>
  </AbsoluteFill>
);

const ITEMS = ["buah", "yogurt (bila ada chiller)", "telur rebus", "susu", "kekacang (portion sesuai)"];

const BagScene: React.FC<{ t: R0610Timing["bag"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={270} gap={6}>
      <Line delay={t.line1} size={62} weight={800}>
        Letak <Highlight delay={t.line1 + 12}>satu backup</Highlight>
        <br />
        dalam bag.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Bag size={230} />
    </div>
    <Stack top={720} gap={18}>
      {ITEMS.map((it, i) => (
        <Pop key={it} delay={t.items[i]} rotate={i % 2 ? 1.5 : -1.5}>
          <Card style={{ padding: "20px 40px", fontSize: 48, fontWeight: 800, whiteSpace: "nowrap" }}>{it}</Card>
        </Pop>
      ))}
      <Line delay={t.last} size={42} weight={600} color={C.inkSoft} style={{ marginTop: 8 }}>
        atau apa-apa pilihan yang ngam
        <br />
        dengan rutin dan keperluan awak.
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1520, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>One backup</Tag>
    </div>
  </AbsoluteFill>
);

const Close: React.FC<{ t: R0610Timing["close"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={380} gap={14}>
      <Line size={64} weight={800}>
        Backup bukan{" "}
        <span style={{ position: "relative", display: "inline-block" }}>
          wajib makan
          <Strike delay={t.strike} width={6} />
        </span>
        <br />
        setiap hari.
      </Line>
      <Line delay={t.line2} size={54} weight={700} style={{ marginTop: 30 }}>
        Dia cuma kurangkan chance kita
        <br />
        buat keputusan masa dah
      </Line>
      <Line delay={t.line2 + 8} size={74} weight={800}>
        <Highlight delay={t.hl}>terlalu lapar.</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1010, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Tag delay={t.tag}>Practical &gt; perfect</Tag>
    </div>
    <div style={{ position: "absolute", top: 1150, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="save" delay={t.pill}>
        Save &amp; pilih satu
      </CtaPill>
    </div>
  </AbsoluteFill>
);

export const r0610Scenes = (t: R0610Timing, dur: Record<string, number> = { krisis: 180, bag: 220, close: 190 }): SceneDef[] => [
  { id: "krisis", dur: dur.krisis, el: <Krisis t={t.krisis} />, cues: [[2, "pop", 0.4], [t.krisis.meterFrom, "whoosh", 0.35], [t.krisis.hl, "swipe", 0.45], [t.krisis.tag, "pop", 0.4]] },
  { id: "bag", dur: dur.bag, el: <BagScene t={t.bag} />, cues: [[t.bag.line1 + 12, "swipe", 0.45], ...t.bag.items.map((f): Cue => [f, "pop", 0.45]), [t.bag.tag, "pop", 0.4]] },
  { id: "close", dur: dur.close, el: <Close t={t.close} />, cues: [[t.close.strike, "scribble", 0.5], [t.close.hl, "swipe", 0.45], [t.close.tag, "pop", 0.4], [t.close.pill, "pop", 0.5], [t.close.pill + 4, "chime", 0.45]] },
];

export const R0610_SCENES: SceneDef[] = [R0610_HOOK, ...r0610Scenes(R0610_SILENT)];
