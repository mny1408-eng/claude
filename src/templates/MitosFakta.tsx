// Template: Mitos vs Fakta (docs/video-style-rotation.md, trust / education; fixed weekly series).
// The myth card is shown, crossed out and stamped, then the fact card arrives with its source
// on screen. Only claim things you can source: `source` is required and always shown.
// Usage: mitosFaktaScenes(content) → SceneDef[]; register it in Root like any reel.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Note, Pop, progress } from "../kit";
import { SceneDef } from "../Reel";
import { BoxStamp, EndCard, EndCardProps, SeriesTag, Stack } from "./shared";

export type MitosFaktaContent = {
  no: number; // series number → "MITOS #01"
  hook: string; // e.g. "Ramai percaya…"
  mitos: string; // the myth, in quotes on the card
  fakta: string[]; // 2–3 short fact lines
  source: string; // shown under the fact card
  takeawayTitle: string;
  takeaways: string[]; // 2–3 short lines
  end: EndCardProps;
};

const tag = (n: number) => `MITOS #${String(n).padStart(2, "0")}`;

const Label: React.FC<{ text: string; color: string }> = ({ text, color }) => (
  <div style={{ display: "inline-block", background: color, color: C.paper, padding: "8px 24px", borderRadius: 8, fontSize: 36, fontWeight: 800, letterSpacing: 4, marginBottom: 22 }}>
    {text}
  </div>
);

// ---------- 1. Myth ----------
const Myth: React.FC<{ c: MitosFaktaContent }> = ({ c }) => (
  <AbsoluteFill>
    <SeriesTag text={tag(c.no)} />
    <Stack top={420}>
      <Line size={60} weight={600} color={C.inkSoft}>
        {c.hook}
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 580, left: 110, right: 110 }}>
      <Pop delay={10} rotate={-1.5}>
        <Card style={{ padding: "40px 48px" }}>
          <Label text="MITOS" color={C.marker} />
          <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.12 }}>“{c.mitos}”</div>
        </Card>
      </Pop>
    </div>
    <Note delay={50} size={72} rotate={-4} style={{ position: "absolute", top: 1120, left: 0, right: 0, textAlign: "center" }}>
      betul ke?
    </Note>
  </AbsoluteFill>
);

// Diagonal line through the whole myth, however many lines it wraps to.
const CrossOut: React.FC<{ delay: number }> = ({ delay }) => {
  const p = progress(useCurrentFrame(), delay, 10);
  return (
    <div
      style={{
        position: "absolute",
        left: "-2%",
        top: "85%", // starts low-left and climbs, so the line crosses every row
        width: "104%",
        height: 7,
        borderRadius: 4,
        background: C.marker,
        transform: `rotate(-9deg) scaleX(${p})`,
        transformOrigin: "left center",
      }}
    />
  );
};

// ---------- 2. Busted ----------
const Busted: React.FC<{ c: MitosFaktaContent }> = ({ c }) => (
  <AbsoluteFill>
    <SeriesTag text={tag(c.no)} />
    <div style={{ position: "absolute", top: 580, left: 110, right: 110, opacity: 0.85 }}>
      <Card style={{ padding: "40px 48px", transform: "rotate(-1.5deg)" }}>
        <Label text="MITOS" color={C.marker} />
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.12, position: "relative" }}>
          “{c.mitos}”
          <CrossOut delay={8} />
        </div>
      </Card>
    </div>
    <div style={{ position: "absolute", top: 1080, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <BoxStamp delay={24} rotate={-7} size={100}>
        TAK TEPAT
      </BoxStamp>
    </div>
  </AbsoluteFill>
);

// ---------- 3. Fact ----------
const FACT_EVERY = 36;
const Fact: React.FC<{ c: MitosFaktaContent }> = ({ c }) => {
  const f = useCurrentFrame();
  const slide = interpolate(f, [0, 14], [400, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <SeriesTag text={tag(c.no)} />
      <div style={{ position: "absolute", top: 400, left: 110, right: 110, transform: `translateX(${slide}px) rotate(1deg)` }}>
        <Card style={{ padding: "40px 48px" }}>
          <Label text="FAKTA" color={C.ink} />
          {c.fakta.map((line, i) => (
            <Line key={line} delay={20 + i * FACT_EVERY} size={52} weight={700} style={{ marginBottom: 20, display: "flex", gap: 18, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, marginTop: 4 }}>
                <Mark kind="check" delay={24 + i * FACT_EVERY} size={48} />
              </span>
              <span>{line}</span>
            </Line>
          ))}
          <div style={{ borderTop: "3px dashed #E4DFD1", marginTop: 10, paddingTop: 18, fontSize: 28, fontWeight: 500, color: C.inkSoft }}>
            Sumber: {c.source}
          </div>
        </Card>
      </div>
    </AbsoluteFill>
  );
};
const factDur = (c: MitosFaktaContent) => 30 + c.fakta.length * FACT_EVERY + 90;

// ---------- 4. Takeaway ----------
const TAKE_EVERY = 34;
const Takeaway: React.FC<{ c: MitosFaktaContent }> = ({ c }) => (
  <AbsoluteFill>
    <Stack top={420} gap={34}>
      <Line size={62} weight={800}>
        <Highlight delay={10}>{c.takeawayTitle}</Highlight>
      </Line>
      {c.takeaways.map((t, i) => (
        <Line key={t} delay={26 + i * TAKE_EVERY} size={58} weight={700}>
          {t}
        </Line>
      ))}
    </Stack>
  </AbsoluteFill>
);

export const mitosFaktaScenes = (c: MitosFaktaContent): SceneDef[] => [
  { id: "mitos", dur: 120, el: <Myth c={c} />, cues: [[4, "whoosh", 0.4], [10, "pop", 0.5], [50, "scribble", 0.35]] },
  { id: "busted", dur: 80, el: <Busted c={c} />, cues: [[8, "scribble", 0.5], [24, "stamp", 0.9]] },
  {
    id: "fakta",
    dur: factDur(c),
    el: <Fact c={c} />,
    cues: [[0, "swipe", 0.5], ...c.fakta.map((_, i): [number, "tick", number] => [24 + i * FACT_EVERY, "tick", 0.5])],
  },
  {
    id: "takeaway",
    dur: 40 + c.takeaways.length * TAKE_EVERY + 70,
    el: <Takeaway c={c} />,
    cues: [[10, "swipe", 0.45], ...c.takeaways.map((_, i): [number, "pop", number] => [26 + i * TAKE_EVERY, "pop", 0.4])],
  },
  { id: "end", dur: 120, el: <EndCard {...c.end} />, cues: [[20, "pop", 0.55], [24, "chime", 0.45], [40, "scribble", 0.35]] },
];
