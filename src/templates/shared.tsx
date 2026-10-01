// Pieces shared by the reusable reel templates (brand frame in docs/video-style-rotation.md).
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Line, Note, Pop, Stamp } from "../kit";

export const Stack: React.FC<{ top: number; children: React.ReactNode; gap?: number }> = ({ top, children, gap = 10 }) => (
  <div style={{ position: "absolute", top, left: 80, right: 80, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap }}>
    {children}
  </div>
);

// Series tag, top-left, e.g. "MITOS #01".
export const SeriesTag: React.FC<{ text: string }> = ({ text }) => (
  <div style={{ position: "absolute", top: 250, left: 80, padding: "8px 20px", border: `4px solid ${C.ink}`, borderRadius: 8, fontSize: 30, fontWeight: 800, letterSpacing: 3 }}>
    {text}
  </div>
);

export const BoxStamp: React.FC<{ children: React.ReactNode; delay?: number; rotate?: number; size?: number; color?: string }> = ({
  children,
  delay = 0,
  rotate = -6,
  size = 80,
  color = C.marker,
}) => (
  <Stamp delay={delay} rotate={rotate}>
    <div
      style={{
        border: `8px solid ${color}`,
        borderRadius: 14,
        padding: "14px 34px",
        color,
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

// Brand-frame end card: same layout in every template.
export type EndCardProps = { lead?: string; cta?: string; sub?: string };

export const EndCard: React.FC<EndCardProps> = ({ lead, cta = "Semak skor anda →", sub = "link di bio" }) => (
  <AbsoluteFill>
    {lead && (
      <Stack top={520}>
        <Line size={70} weight={800}>
          {lead}
        </Line>
      </Stack>
    )}
    <div style={{ position: "absolute", top: 900, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={20}>
        <div style={{ background: C.ink, color: C.paper, borderRadius: 999, padding: "28px 64px", fontSize: 60, fontWeight: 800 }}>
          {cta}
        </div>
      </Pop>
    </div>
    <Note delay={40} size={56} rotate={-2} style={{ position: "absolute", top: 1080, left: 0, right: 0, textAlign: "center" }}>
      {sub}
    </Note>
  </AbsoluteFill>
);
