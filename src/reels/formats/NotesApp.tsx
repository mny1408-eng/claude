// Format: Notes app typing. A note card whose title and lines type themselves in.
import React from "react";
import { useCurrentFrame } from "remotion";
import { C } from "../../theme";
import { Card, Mark } from "../../kit";
import { Typed } from "./common";

export type NoteLine = { text: string; at: number; checkAt?: number; soft?: boolean; bold?: boolean };

export const NotesApp: React.FC<{ title: string; titleAt?: number; lines: NoteLine[]; size?: number }> = ({ title, titleAt = 6, lines, size = 54 }) => {
  const f = useCurrentFrame();
  return (
    <Card style={{ width: 920, borderRadius: 28, overflow: "hidden" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "26px 44px", background: "#F3EFE2", fontSize: 34, fontWeight: 700, color: C.marker }}>
        <span>‹ Notes</span>
        <span>Done</span>
      </div>
      <div style={{ padding: "36px 50px 50px" }}>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.15, minHeight: 66, color: C.ink }}>
          <Typed text={title} delay={titleAt} />
        </div>
        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 24 }}>
          {lines.map((l) => (
            <div key={l.text} style={{ display: "flex", alignItems: "center", gap: 22, minHeight: 68, opacity: f >= l.at ? 1 : 0 }}>
              {l.checkAt !== undefined ? (
                <div style={{ width: 56, height: 56, flexShrink: 0, border: `4px solid ${C.ink}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {f >= l.checkAt && <Mark kind="check" delay={l.checkAt} size={38} />}
                </div>
              ) : (
                <div style={{ width: 18, height: 18, flexShrink: 0, margin: "0 19px", borderRadius: "50%", background: l.soft ? "#C9C4B4" : C.ink }} />
              )}
              <div style={{ fontSize: size, fontWeight: l.bold ? 800 : 600, color: l.soft ? C.inkSoft : C.ink, opacity: l.soft ? 0.75 : 1, lineHeight: 1.15 }}>
                <Typed text={l.text} delay={l.at} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
