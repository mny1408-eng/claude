// Shared pieces for the daily Reel 1 formats (docs/video-style-rotation.md).
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../../theme";
import { Card, Mark, Pop, Stamp } from "../../kit";

export const Stack: React.FC<{ top: number; children: React.ReactNode; gap?: number }> = ({ top, children, gap = 10 }) => (
  <div style={{ position: "absolute", top, left: 80, right: 80, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap }}>
    {children}
  </div>
);

// Overlay anchor word from the Notion "Overlays" line.
export const Tag: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <Pop delay={delay}>
    <div
      style={{
        border: `4px solid ${C.marker}`,
        borderRadius: 999,
        padding: "8px 30px",
        fontSize: 34,
        fontWeight: 800,
        letterSpacing: 3,
        color: C.marker,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        background: C.paper,
      }}
    >
      {children}
    </div>
  </Pop>
);

// Rubber stamp with a border.
export const BoxStamp: React.FC<{ children: React.ReactNode; delay?: number; rotate?: number; size?: number }> = ({ children, delay = 0, rotate = -6, size = 92 }) => (
  <Stamp delay={delay} rotate={rotate}>
    <div
      style={{
        border: `8px solid ${C.marker}`,
        borderRadius: 14,
        padding: "14px 34px",
        color: C.marker,
        fontSize: size,
        fontWeight: 800,
        letterSpacing: 2,
        lineHeight: 1.05,
        textAlign: "center",
        opacity: 0.92,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  </Stamp>
);

const ICONS = {
  save: "M 2 2 H 22 V 28 L 12 20 L 2 28 Z",
  share: "M 1 13 L 23 2 L 17 28 L 11 17 Z",
  comment: "M 1 3 H 23 V 20 H 11 L 5 27 V 20 H 1 Z",
  follow: "M 9 3 H 15 V 12 H 23 V 18 H 15 V 27 H 9 V 18 H 1 V 12 H 9 Z",
  link: "M 4 15 L 12 7 H 22 V 17 L 14 25 Z",
};

// End-card pill. Text must be the day's Reel 1 CTA only.
export const CtaPill: React.FC<{ children: React.ReactNode; icon: keyof typeof ICONS; delay?: number }> = ({ children, icon, delay = 0 }) => (
  <Pop delay={delay}>
    <div style={{ display: "flex", alignItems: "center", gap: 20, background: C.ink, color: C.paper, borderRadius: 999, padding: "24px 56px", fontSize: 54, fontWeight: 800, whiteSpace: "nowrap" }}>
      <svg viewBox="0 0 24 30" width={36} height={45}>
        <path d={ICONS[icon]} fill={C.gold} />
      </svg>
      {children}
    </div>
  </Pop>
);

// Typewriter text with a cursor while typing.
export const Typed: React.FC<{ text: string; delay?: number; cps?: number }> = ({ text, delay = 0, cps = 24 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = Math.max(0, Math.min(text.length, Math.floor(((f - delay) / fps) * cps)));
  const typing = f >= delay && n < text.length;
  return (
    <span>
      {text.slice(0, n)}
      {typing && <span style={{ display: "inline-block", width: 5, height: "0.9em", background: C.marker, marginLeft: 4, verticalAlign: "-0.1em" }} />}
    </span>
  );
};

// Numbered row card: a number disc, a small marker label, the line, and an optional tick.
export const NumCard: React.FC<{ n: string; tag: string; text: React.ReactNode; delay: number; checkAt?: number; rotate?: number; size?: number }> = ({ n, tag, text, delay, checkAt, rotate = 0, size = 44 }) => (
  <Pop delay={delay} rotate={rotate}>
    <Card style={{ width: 940, padding: "26px 36px", display: "flex", alignItems: "center", gap: 30, textAlign: "left" }}>
      <div style={{ width: 92, height: 92, flexShrink: 0, borderRadius: "50%", background: C.ink, color: C.paper, fontSize: 52, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{n}</div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: 3, color: C.marker }}>{tag}</div>
        <div style={{ fontSize: size, fontWeight: 700, lineHeight: 1.2 }}>{text}</div>
      </div>
      {checkAt !== undefined && (
        <div style={{ width: 60, flexShrink: 0 }}>
          <Mark kind="check" delay={checkAt} size={52} />
        </div>
      )}
    </Card>
  </Pop>
);

// Rounded word chip.
export const Chip: React.FC<{ children: React.ReactNode; delay?: number; rotate?: number; size?: number }> = ({ children, delay = 0, rotate = 0, size = 52 }) => (
  <Pop delay={delay} rotate={rotate}>
    <span style={{ display: "inline-block", fontSize: size, fontWeight: 800, padding: "10px 30px", borderRadius: 16, background: C.card, boxShadow: "0 8px 22px rgba(40,40,20,0.12)", whiteSpace: "nowrap" }}>{children}</span>
  </Pop>
);
