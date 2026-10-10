// Vox-style building blocks: paper, highlighter, hand-drawn marks, stamps, taped cards.
import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C, HAND, POPPINS } from "./theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const progress = (frame: number, start: number, dur: number) =>
  interpolate(frame, [start, start + dur], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });

export const Paper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill style={{ background: C.paper, fontFamily: POPPINS, color: C.ink }}>
    <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.45, mixBlendMode: "multiply" }}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.40  0 0 0 0 0.30  0 0 0 0.35 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
    <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(80,60,20,0.18) 100%)" }} />
    {children}
  </AbsoluteFill>
);

// Slow push-in so every scene feels alive, like a Vox camera move over the collage.
export const Drift: React.FC<{ dur: number; children: React.ReactNode }> = ({ dur, children }) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, dur], [1, 1.045], clamp);
  return <AbsoluteFill style={{ transform: `scale(${s})` }}>{children}</AbsoluteFill>;
};

export const Highlight: React.FC<{ children: React.ReactNode; delay?: number; color?: string }> = ({
  children,
  delay = 0,
  color = C.gold,
}) => {
  const p = progress(useCurrentFrame(), delay, 12);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          position: "absolute",
          left: -10,
          right: -10,
          top: "22%",
          bottom: "6%",
          background: color,
          transform: `scaleX(${p}) skewX(-8deg) rotate(-1deg)`,
          transformOrigin: "left center",
          borderRadius: 6,
        }}
      />
      <span style={{ position: "relative" }}>{children}</span>
    </span>
  );
};

// Words that slide up into place.
export const Line: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  weight?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, size = 64, weight = 700, color = C.ink, style }) => {
  const p = progress(useCurrentFrame(), delay, 10);
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight: 1.15,
        letterSpacing: -1,
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Big word slammed down like a rubber stamp.
export const Stamp: React.FC<{
  children: React.ReactNode;
  delay?: number;
  rotate?: number;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, rotate = -4, style }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - delay, fps, config: { damping: 11, stiffness: 180 } });
  return (
    <div
      style={{
        opacity: f < delay ? 0 : 1,
        transform: `scale(${interpolate(s, [0, 1], [1.6, 1])}) rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// Pops an element in with a small overshoot.
export const Pop: React.FC<{ children: React.ReactNode; delay?: number; rotate?: number; style?: React.CSSProperties }> = ({
  children,
  delay = 0,
  rotate = 0,
  style,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: f - delay, fps, config: { damping: 12, stiffness: 160 } });
  return (
    <div
      style={{
        opacity: f < delay ? 0 : Math.min(1, s * 2),
        transform: `scale(${interpolate(s, [0, 1], [0.6, 1])}) rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

type DrawProps = { delay?: number; dur?: number; color?: string; width?: number; style?: React.CSSProperties };

// Rough hand-drawn loop around whatever it is placed over.
export const HandCircle: React.FC<DrawProps> = ({ delay = 0, dur = 14, color = C.marker, width = 5, style }) => {
  const p = progress(useCurrentFrame(), delay, dur);
  return (
    <svg
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: "-18% -10%", width: "120%", height: "136%", overflow: "visible", ...style }}
    >
      <path
        d="M 168 20 C 135 0, 42 2, 14 30 C -8 58, 32 96, 104 95 C 176 94, 206 64, 190 36 C 180 18, 150 6, 118 9"
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
      />
    </svg>
  );
};

export const Strike: React.FC<DrawProps> = ({ delay = 0, dur = 10, color = C.marker, width = 4, style }) => {
  const p = progress(useCurrentFrame(), delay, dur);
  return (
    <svg viewBox="0 0 100 20" preserveAspectRatio="none" style={{ position: "absolute", left: "-6%", top: "38%", width: "112%", height: "30%", overflow: "visible", ...style }}>
      <path
        d="M 2 14 C 30 10, 60 8, 98 4"
        fill="none"
        stroke={color}
        strokeWidth={width}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
        opacity={p > 0 ? 1 : 0} // a round cap would otherwise show as a dot before the stroke starts
      />
    </svg>
  );
};

export const Underline: React.FC<DrawProps> = ({ delay = 0, dur = 10, color = C.marker, width = 4, style }) => {
  const p = progress(useCurrentFrame(), delay, dur);
  return (
    <svg viewBox="0 0 100 10" preserveAspectRatio="none" style={{ position: "absolute", left: 0, bottom: -14, width: "100%", height: 16, overflow: "visible", ...style }}>
      <path d="M 1 6 C 30 9, 70 2, 99 5" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={p > 0 ? 1 : 0} />
    </svg>
  );
};

export const Mark: React.FC<{ kind: "check" | "cross"; delay?: number; size?: number }> = ({ kind, delay = 0, size = 70 }) => {
  const p = progress(useCurrentFrame(), delay, 6);
  const color = kind === "check" ? C.ink : C.marker;
  const d = kind === "check" ? "M 12 52 L 38 78 L 88 18" : "M 18 18 L 82 82 M 82 18 L 18 82";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} style={{ overflow: "visible" }}>
      <path d={d} fill="none" stroke={color} strokeWidth={13} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
    </svg>
  );
};

export const HandArrow: React.FC<DrawProps & { rotate?: number }> = ({ delay = 0, dur = 12, color = C.marker, width = 7, rotate = 0, style }) => {
  const p = progress(useCurrentFrame(), delay, dur);
  const head = progress(useCurrentFrame(), delay + dur, 5);
  return (
    <svg viewBox="0 0 120 160" width={120} height={160} style={{ overflow: "visible", transform: `rotate(${rotate}deg)`, ...style }}>
      <path d="M 20 10 C 70 30, 90 80, 62 140" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      <path d="M 36 118 L 62 142 L 84 112" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - head} />
    </svg>
  );
};

export const Note: React.FC<{ children: React.ReactNode; delay?: number; size?: number; color?: string; rotate?: number; style?: React.CSSProperties }> = ({
  children,
  delay = 0,
  size = 64,
  color = C.marker,
  rotate = -3,
  style,
}) => {
  const p = progress(useCurrentFrame(), delay, 8);
  return (
    <div style={{ fontFamily: HAND, fontWeight: 700, fontSize: size, color, opacity: p, transform: `rotate(${rotate}deg)`, lineHeight: 1, ...style }}>
      {children}
    </div>
  );
};

export const Tape: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div
    style={{
      position: "absolute",
      width: 170,
      height: 46,
      background: "rgba(246, 232, 170, 0.75)",
      boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
      ...style,
    }}
  />
);

// White card with shadow. Tape is opt-in: WDT rules say decoration must have a job.
export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties; tape?: boolean }> = ({ children, style, tape = false }) => (
  <div
    style={{
      position: "relative",
      background: C.card,
      borderRadius: 10,
      boxShadow: "0 10px 30px rgba(40,40,20,0.18), 0 2px 6px rgba(40,40,20,0.12)",
      ...style,
    }}
  >
    {tape && <Tape style={{ top: -22, left: "50%", marginLeft: -85, transform: "rotate(-3deg)" }} />}
    {children}
  </div>
);

export const BrandTag: React.FC<{ text?: string }> = ({ text = "@coachnas.pharmacist" }) => (
  <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", fontSize: 30, fontWeight: 800, letterSpacing: 3, color: C.ink, opacity: 0.75 }}>
    {text}
  </div>
);
