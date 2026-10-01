// Shared pieces for the daily Reel 1 formats (docs/video-style-rotation.md).
import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../../theme";
import { Pop, Stamp } from "../../kit";

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
