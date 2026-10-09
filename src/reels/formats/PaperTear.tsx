// Paper-tear transition: the outgoing layer is drawn twice, clipped along a jagged horizontal edge, and the two
// halves are pulled apart (top up and left-tilted, bottom down and right-tilted) to reveal what is underneath.
// Render this ABOVE the incoming layer, only for frames in [at, at + dur).
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";
import { C } from "../../theme";

const W = 1080;
const H = 1920;

// A fixed jagged edge around y = mid (deterministic, so every frame tears the same way).
const edge = (mid: number) => {
  const pts: [number, number][] = [];
  const n = 18;
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * W;
    const jag = ((i * 73) % 11) - 5; // -5..5
    const wave = Math.sin(i * 1.7) * 26;
    pts.push([x, mid + wave + jag * 9]);
  }
  return pts;
};

export const PaperTear: React.FC<{ at: number; dur?: number; mid?: number; children: React.ReactNode }> = ({ at, dur = 16, mid = 980, children }) => {
  const f = useCurrentFrame();
  if (f < at || f >= at + dur) return null;
  const p = interpolate(f, [at, at + dur], [0, 1], { easing: Easing.in(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pts = edge(mid);
  const line = pts.map(([x, y]) => `${x}px ${y}px`).join(", ");
  const topClip = `polygon(0px 0px, ${W}px 0px, ${[...pts].reverse().map(([x, y]) => `${x}px ${y}px`).join(", ")})`;
  const botClip = `polygon(${line}, ${W}px ${H}px, 0px ${H}px)`;
  const svgEdge = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const piece = (clip: string, dy: number, rot: number, dx: number) => (
    <AbsoluteFill style={{ transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, transformOrigin: "50% 50%", filter: "drop-shadow(0 14px 22px rgba(20,30,20,0.35))" }}>
      <AbsoluteFill style={{ clipPath: clip }}>{children}</AbsoluteFill>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <polyline points={svgEdge} fill="none" stroke={C.paper} strokeWidth={12} strokeLinejoin="round" />
      </svg>
    </AbsoluteFill>
  );
  return (
    <AbsoluteFill>
      {piece(topClip, -p * 1150, -p * 9, -p * 60)}
      {piece(botClip, p * 1150, p * 7, p * 50)}
    </AbsoluteFill>
  );
};
