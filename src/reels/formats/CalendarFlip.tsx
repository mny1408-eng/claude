// Format: calendar flip. One tear-off tile that flips to a new day at each `at` frame.
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../../theme";

export type FlipDay = { label: string; at: number; weekend?: boolean };

export const CalendarTile: React.FC<{ days: FlipDay[] }> = ({ days }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  let cur = days[0];
  for (const d of days) if (f >= d.at) cur = d;
  const s = spring({ frame: f - cur.at, fps, config: { damping: 14, stiffness: 170 } });
  const band = cur.weekend ? C.marker : C.ink;
  return (
    <div style={{ width: 640, perspective: 1400 }}>
      <div
        style={{
          borderRadius: 22,
          overflow: "hidden",
          background: C.card,
          boxShadow: "0 18px 44px rgba(40,40,20,0.2), 0 2px 6px rgba(40,40,20,0.12)",
          transformOrigin: "50% 0%",
          transform: `rotateX(${interpolate(s, [0, 1], [-80, 0])}deg)`,
          opacity: Math.min(1, s * 3),
        }}
      >
        <div style={{ height: 120, background: band, display: "flex", justifyContent: "space-around", alignItems: "center", padding: "0 150px" }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ width: 44, height: 44, borderRadius: "50%", background: C.paper }} />
          ))}
        </div>
        <div style={{ height: 360, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 128, fontWeight: 800, letterSpacing: 2, color: band }}>
          {cur.label}
        </div>
      </div>
    </div>
  );
};
