// Whip-pan transition: the outgoing layer (frozen on its last frame) flies out to the left with motion blur while the
// incoming layer slides in from the right. Outside [at, at + dur) it simply shows `from` before and `children` after.
// Pass `from` with its media muted: it is frozen, so its audio would otherwise double the incoming layer's.
import React from "react";
import { AbsoluteFill, Easing, Freeze, interpolate, useCurrentFrame } from "remotion";

export const WhipPan: React.FC<{ at: number; dur?: number; from: React.ReactNode; children: React.ReactNode }> = ({ at, dur = 10, from, children }) => {
  const f = useCurrentFrame();
  if (f < at) return <>{from}</>;
  if (f >= at + dur) return <>{children}</>;
  const p = interpolate(f, [at, at + dur], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const blur = Math.sin(Math.PI * p) * 28;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#000" }}>
      <AbsoluteFill style={{ transform: `translateX(${-p * 1080}px)`, filter: `blur(${blur}px)` }}>
        <Freeze frame={at - 1}>{from}</Freeze>
      </AbsoluteFill>
      <AbsoluteFill style={{ transform: `translateX(${(1 - p) * 1080}px)`, filter: `blur(${blur}px)` }}>{children}</AbsoluteFill>
    </AbsoluteFill>
  );
};
