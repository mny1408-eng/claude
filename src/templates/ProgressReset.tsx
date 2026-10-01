// Template: Progress bar reset (docs/video-style-rotation.md, hook / reach).
// A progress bar climbs day by day, crashes to 0%, then repeats week after week.
// About the pattern, never the body, so it is safe for ads.
// Usage: progressResetScenes(content) → SceneDef[]; register it in Root like any reel.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Note, Pop } from "../kit";
import { SceneDef } from "../Reel";
import { BoxStamp, EndCard, EndCardProps, SeriesTag, Stack } from "./shared";

export type ProgressResetContent = {
  series: string; // e.g. "RESET #01"
  hook: string; // line above the bar
  barLabel: string; // e.g. "Progress diet minggu ni"
  days: { day: string; pct: number; note: string }[]; // the climb
  reset: { day: string; note: string }; // the crash to 0%
  loop: string; // e.g. "Minggu depan? Ulang semula."
  insight: [string, string]; // [what it isn't, what it is]
  fixTitle: string;
  fixes: string[]; // 2–3 short lines
  end: EndCardProps;
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// The bar itself. pct is the value to show this frame.
const Bar: React.FC<{ pct: number; label: string; crashed?: boolean; width?: number; height?: number; showPct?: boolean }> = ({
  pct,
  label,
  crashed = false,
  width = 860,
  height = 96,
  showPct = true,
}) => (
  <div style={{ width }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
      <span style={{ fontSize: 36, fontWeight: 700, color: C.inkSoft }}>{label}</span>
      {showPct && <span style={{ fontSize: 76, fontWeight: 800, color: crashed ? C.marker : C.ink, fontVariantNumeric: "tabular-nums" }}>{Math.round(pct)}%</span>}
    </div>
    <div style={{ height, borderRadius: height / 2, background: C.card, border: `6px solid ${C.ink}`, overflow: "hidden", boxShadow: "0 10px 30px rgba(40,40,20,0.15)" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: pct >= 70 ? C.gold : C.ink, borderRadius: height / 2 }} />
    </div>
  </div>
);

// ---------- 1. Climb ----------
const DAY_EVERY = 34;
const climbDur = (c: ProgressResetContent) => 30 + c.days.length * DAY_EVERY + 40;

const Climb: React.FC<{ c: ProgressResetContent }> = ({ c }) => {
  const f = useCurrentFrame();
  const keys = [0, ...c.days.map((_, i) => 30 + i * DAY_EVERY + 20)];
  const vals = [0, ...c.days.map((d) => d.pct)];
  const pct = interpolate(f, keys, vals, clamp);
  const current = Math.max(-1, Math.min(c.days.length - 1, Math.floor((f - 30) / DAY_EVERY)));
  return (
    <AbsoluteFill>
      <SeriesTag text={c.series} />
      <Stack top={420}>
        <Line size={66} weight={800}>
          {c.hook}
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 640, left: 110 }}>
        <Bar pct={pct} label={c.barLabel} />
      </div>
      {current >= 0 && (
        <Stack top={920} gap={6}>
          <Line key={current} delay={30 + current * DAY_EVERY} size={64} weight={800}>
            {c.days[current].day}
          </Line>
          <Note key={`n${current}`} delay={30 + current * DAY_EVERY + 4} size={66} rotate={-2} style={{ textAlign: "center" }}>
            {c.days[current].note}
          </Note>
        </Stack>
      )}
    </AbsoluteFill>
  );
};

// ---------- 2. Crash ----------
const Crash: React.FC<{ c: ProgressResetContent }> = ({ c }) => {
  const f = useCurrentFrame();
  const top = c.days[c.days.length - 1].pct;
  const pct = interpolate(f, [18, 30], [top, 0], clamp);
  const shake = f >= 30 && f < 42 ? Math.sin(f * 3) * 10 : 0;
  return (
    <AbsoluteFill>
      <SeriesTag text={c.series} />
      <Stack top={420}>
        <Line size={66} weight={800}>
          {c.reset.day}…
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 640, left: 110, transform: `translateX(${shake}px)` }}>
        <Bar pct={pct} label={c.barLabel} crashed={f >= 30} />
      </div>
      <Note delay={6} size={72} rotate={-3} style={{ position: "absolute", top: 930, left: 0, right: 0, textAlign: "center" }}>
        {c.reset.note}
      </Note>
      <div style={{ position: "absolute", top: 1080, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BoxStamp delay={32} rotate={-6} size={110}>
          RESET
        </BoxStamp>
      </div>
    </AbsoluteFill>
  );
};

// ---------- 3. Loop: same pattern, week after week ----------
const LOOP_WEEKS = ["Minggu 1", "Minggu 2", "Minggu 3"];
const Loop: React.FC<{ c: ProgressResetContent }> = ({ c }) => {
  const f = useCurrentFrame();
  const peak = c.days[c.days.length - 1].pct;
  return (
    <AbsoluteFill>
      <Stack top={380}>
        <Line size={66} weight={800}>
          {c.loop}
        </Line>
      </Stack>
      {LOOP_WEEKS.map((w, i) => {
        const start = 16 + i * 26;
        const pct = interpolate(f, [start, start + 14, start + 20, start + 26], [0, peak, peak, 0], clamp);
        return (
          <div key={w} style={{ position: "absolute", top: 600 + i * 200, left: 160 }}>
            <Pop delay={start - 6}>
              <Bar pct={pct} label={w} width={760} height={60} showPct={false} />
            </Pop>
          </div>
        );
      })}
      <Note delay={100} size={70} rotate={-3} style={{ position: "absolute", top: 1220, left: 0, right: 0, textAlign: "center" }}>
        pernah?
      </Note>
    </AbsoluteFill>
  );
};

// ---------- 4. Insight ----------
const Insight: React.FC<{ c: ProgressResetContent }> = ({ c }) => (
  <AbsoluteFill>
    <Stack top={560} gap={30}>
      <Line size={78} weight={800}>
        {c.insight[0]}
      </Line>
      <Line delay={24} size={78} weight={800}>
        <Highlight delay={36}>{c.insight[1]}</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

// ---------- 5. Fixes ----------
const FIX_EVERY = 40;
const Fixes: React.FC<{ c: ProgressResetContent }> = ({ c }) => (
  <AbsoluteFill>
    <Stack top={360}>
      <Line size={66} weight={800}>
        <Highlight delay={10}>{c.fixTitle}</Highlight>
      </Line>
    </Stack>
    {c.fixes.map((fx, i) => (
      <div key={fx} style={{ position: "absolute", top: 580 + i * 220, left: 110, right: 110 }}>
        <Pop delay={20 + i * FIX_EVERY} rotate={i % 2 ? 1 : -1}>
          <Card style={{ padding: "30px 36px", display: "flex", alignItems: "center", gap: 26 }}>
            <Mark kind="check" delay={28 + i * FIX_EVERY} size={64} />
            <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.15 }}>{fx}</div>
          </Card>
        </Pop>
      </div>
    ))}
  </AbsoluteFill>
);

export const progressResetScenes = (c: ProgressResetContent): SceneDef[] => [
  {
    id: "climb",
    dur: climbDur(c),
    el: <Climb c={c} />,
    cues: [[4, "whoosh", 0.4], ...c.days.map((_, i): [number, "tick", number] => [30 + i * DAY_EVERY, "tick", 0.5])],
  },
  { id: "crash", dur: 120, el: <Crash c={c} />, cues: [[6, "scribble", 0.4], [20, "whoosh", 0.5], [32, "stamp", 0.9]] },
  {
    id: "loop",
    dur: 140,
    el: <Loop c={c} />,
    cues: [[4, "swipe", 0.4], ...LOOP_WEEKS.map((_, i): [number, "pop", number] => [16 + i * 26 + 20, "pop", 0.4]), [100, "scribble", 0.35]],
  },
  { id: "insight", dur: 120, el: <Insight c={c} />, cues: [[4, "whoosh", 0.4], [36, "swipe", 0.5]] },
  {
    id: "fixes",
    dur: 40 + c.fixes.length * FIX_EVERY + 70,
    el: <Fixes c={c} />,
    cues: [[10, "swipe", 0.45], ...c.fixes.map((_, i): [number, "tick", number] => [28 + i * FIX_EVERY, "tick", 0.55])],
  },
  { id: "end", dur: 120, el: <EndCard {...c.end} />, cues: [[20, "pop", 0.55], [24, "chime", 0.45], [40, "scribble", 0.35]] },
];
