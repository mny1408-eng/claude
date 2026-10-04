// Format piece for Reel B (hybrid): the face-cam clip full-bleed, a hook card on top, and an optional
// lower area for elements timed to the clip's own words.
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile } from "remotion";
import { C } from "../../theme";
import { Card } from "../../kit";

export const FaceCamOpener: React.FC<{ clip: string; hook: React.ReactNode; hookSize?: number; children?: React.ReactNode; lowerTop?: number }> = ({
  clip,
  hook,
  hookSize = 54,
  children,
  lowerTop = 1180,
}) => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(clip)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(247,245,237,0.9) 0%, rgba(247,245,237,0) 36%)" }} />
    <div style={{ position: "absolute", top: 220, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 960, padding: "34px 40px", textAlign: "center" }}>
        <div style={{ fontSize: hookSize, fontWeight: 800, lineHeight: 1.2, color: C.ink }}>{hook}</div>
      </Card>
    </div>
    {children && (
      <div style={{ position: "absolute", top: lowerTop, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>{children}</div>
    )}
  </AbsoluteFill>
);

// Shadow for cards laid over video, so they separate from the footage.
export const OVER_VIDEO: React.CSSProperties = { boxShadow: "0 8px 22px rgba(20,30,20,0.25)" };
