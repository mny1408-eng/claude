// Format piece: an analogue wall clock whose hands sweep from one time to another.
import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { C } from "../../theme";

export const Clock: React.FC<{
  size?: number;
  from: number; // hours, e.g. 7 for 7:00
  to: number;
  start: number; // frame the sweep starts
  dur?: number;
  night?: boolean;
}> = ({ size = 380, from, to, start, dur = 40, night = false }) => {
  const f = useCurrentFrame();
  const h = interpolate(f, [start, start + dur], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const hourDeg = (h % 12) * 30;
  const minDeg = (h % 1) * 360 + (h - from) * 360;
  const face = night ? C.ink : C.card;
  const ink = night ? C.paper : C.ink;
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} style={{ filter: "drop-shadow(0 12px 26px rgba(40,40,20,0.2))" }}>
      <circle cx={100} cy={100} r={94} fill={face} stroke={night ? C.gold : C.ink} strokeWidth={8} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        const r1 = i % 3 === 0 ? 70 : 76;
        return <line key={i} x1={100 + r1 * Math.sin(a)} y1={100 - r1 * Math.cos(a)} x2={100 + 84 * Math.sin(a)} y2={100 - 84 * Math.cos(a)} stroke={ink} strokeWidth={i % 3 === 0 ? 6 : 3} strokeLinecap="round" />;
      })}
      <line x1={100} y1={100} x2={100} y2={48} stroke={ink} strokeWidth={9} strokeLinecap="round" transform={`rotate(${hourDeg} 100 100)`} />
      <line x1={100} y1={100} x2={100} y2={28} stroke={C.marker} strokeWidth={5} strokeLinecap="round" transform={`rotate(${minDeg} 100 100)`} />
      <circle cx={100} cy={100} r={7} fill={C.marker} />
    </svg>
  );
};
