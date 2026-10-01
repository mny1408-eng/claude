// Format: portrait + captions. Coach Nas photo on top, one caption card per scene.
import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C } from "../../theme";
import { Card, Pop } from "../../kit";
import { Tag } from "./common";

export const PortraitBadge: React.FC<{ size?: number }> = ({ size = 300 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", border: `8px solid ${C.gold}`, overflow: "hidden", background: C.card, boxShadow: "0 10px 30px rgba(40,40,20,0.18)" }}>
    <Img src={staticFile("img/coach-nas.jpeg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 18%" }} />
  </div>
);

export const CaptionScene: React.FC<{ tag?: string; children: React.ReactNode }> = ({ tag, children }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 260, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <PortraitBadge />
    </div>
    <div style={{ position: "absolute", top: 610, left: 0, right: 0, display: "flex", justifyContent: "center", height: 70 }}>
      {tag && <Tag delay={2}>{tag}</Tag>}
    </div>
    <div style={{ position: "absolute", top: 730, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={4}>
        <Card style={{ width: 920, padding: "50px 54px", textAlign: "center" }}>
          <div style={{ fontSize: 62, fontWeight: 700, lineHeight: 1.22, letterSpacing: -1, color: C.ink }}>{children}</div>
        </Card>
      </Pop>
    </div>
  </AbsoluteFill>
);
