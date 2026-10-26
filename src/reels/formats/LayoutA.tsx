// Layout A (from the 19/10 design review): talking head with no white title box.
//  * SeriesTag  — small series label at the top, so a viewer knows the series in a second (BUSY MODE, PHARMACIST CHECK…)
//  * HookTitle  — big title without a box; the key word gets the gold underline (the brand's signature move). It shrinks
//                 to a compact title after the hook so the face stays clear.
//  * PopWords   — word-by-word pop captions under the chin; emphasised words on a gold block.
//  * Overlay    — one small card at a time (never stacked).
//  * EndCardStd — the standard end card: ivory, round photo, one CTA, handle. No frozen dark frame.
import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../../theme";
import { Underline } from "../../kit";
import { CtaPill } from "./common";

export type Wd = [number, number, string, number]; // [start s, end s, text, emphasised]

export const SERIES = {
  "BUSY MODE": { bg: "rgba(247,245,237,0.92)", fg: C.ink, border: C.ink },
  "PHARMACIST CHECK": { bg: C.ink, fg: C.paper, border: C.ink },
  "MAKAN REALISTIK": { bg: C.gold, fg: C.ink, border: C.gold },
  "KISAH COACH": { bg: C.marker, fg: "#fff", border: C.marker },
  "KISAH CLIENT": { bg: C.gold, fg: C.ink, border: C.ink },
  MINDSET: { bg: "rgba(255,255,255,0.92)", fg: C.marker, border: C.marker },
} as const;

export const SeriesTag: React.FC<{ series: keyof typeof SERIES; top?: number }> = ({ series, top = 225 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - 2, fps, config: { damping: 15, stiffness: 160 } });
  const s = SERIES[series];
  return (
    <div style={{ position: "absolute", top, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: Math.min(1, p * 2) }}>
      <div style={{ padding: "8px 22px", borderRadius: 999, border: `3px solid ${s.border}`, background: s.bg, color: s.fg, fontSize: 30, fontWeight: 800, letterSpacing: 3 }}>
        {series}
      </div>
    </div>
  );
};

// lines: each line is [text, isKeyWord]; the key line gets the gold underline. tone "dark" = ink text with a light glow
// (for light backgrounds such as a car ceiling), "light" = white text with a dark shadow.
export const HookTitle: React.FC<{ lines: [string, boolean][]; hookSec?: number; tone?: "dark" | "light"; top?: number }> = ({ lines, hookSec = 3.6, tone = "dark", top = 290 }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - 3, fps, config: { damping: 13, stiffness: 170 } });
  const shrink = spring({ frame: f - hookSec * fps, fps, config: { damping: 18, stiffness: 120 } });
  const scale = interpolate(shrink, [0, 1], [1, 0.58]);
  const y = interpolate(shrink, [0, 1], [0, 20]);
  const color = tone === "dark" ? C.ink : "#fff";
  const shadow = tone === "dark" ? "0 0 18px rgba(255,255,255,0.95), 0 0 6px rgba(255,255,255,0.9)" : "0 4px 0 rgba(0,0,0,0.5), 0 0 18px rgba(0,0,0,0.5)";
  return (
    <div style={{ position: "absolute", top, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center", transformOrigin: "50% 0", transform: `translateY(${y}px) scale(${scale * (0.8 + 0.2 * p)})`, opacity: Math.min(1, p * 2) }}>
      {lines.map(([t, key], i) => (
        <div key={i} style={{ position: "relative", fontSize: key ? 112 : 84, fontWeight: 800, lineHeight: 1.08, color, textShadow: shadow, textAlign: "center" }}>
          {t}
          {key && <Underline delay={12} dur={14} color={C.gold} width={9} style={{ bottom: -10, height: 22 }} />}
        </div>
      ))}
    </div>
  );
};

export const chunkWords = (words: Wd[]) => {
  const out: Wd[][] = [];
  let cur: Wd[] = [];
  words.forEach((w, i) => {
    cur.push(w);
    const n = words[i + 1];
    if (!n || cur.length >= 3 || /[.,?!”…]$/.test(w[2]) || n[0] - w[1] > 0.4) {
      out.push(cur);
      cur = [];
    }
  });
  return out;
};

// size "sm" = smaller captions for the compact design (more of the video visible)
export const PopWords: React.FC<{ chunks: Wd[][]; top: number; size?: "md" | "sm" }> = ({ chunks, top, size = "md" }) => {
  const [EM, NO] = size === "sm" ? [66, 52] : [80, 60];
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const idx = chunks.findIndex((c, k) => t >= c[0][0] - 0.05 && t < Math.min(chunks[k + 1]?.[0][0] ?? 1e9, c[c.length - 1][1] + 0.9));
  if (idx < 0) return null;
  const c = chunks[idx];
  return (
    <div style={{ position: "absolute", top, left: 90, right: 90, display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "10px 16px" }}>
      {c.map(([s, , text, emph], i) => {
        const st = Math.round((s - 0.05) * fps);
        if (f < st) return <span key={i} style={{ visibility: "hidden", fontSize: emph ? EM : NO, fontWeight: 800 }}>{text}</span>;
        const p = spring({ frame: f - st, fps, config: { damping: 11, stiffness: 220 } });
        const scale = interpolate(p, [0, 1], [0.35, 1]);
        const y = interpolate(p, [0, 1], [26, 0]);
        return emph ? (
          <span key={i} style={{ display: "inline-block", transform: `translateY(${y}px) scale(${scale}) rotate(${i % 2 ? 3 : -3}deg)`, fontSize: EM, fontWeight: 800, lineHeight: 1.05, color: C.ink, background: C.gold, borderRadius: 14, padding: "4px 16px", boxShadow: "0 6px 18px rgba(0,0,0,0.3)" }}>
            {text}
          </span>
        ) : (
          <span key={i} style={{ display: "inline-block", transform: `translateY(${y}px) scale(${scale})`, fontSize: NO, fontWeight: 800, lineHeight: 1.1, color: "#fff", textShadow: "0 4px 0 rgba(0,0,0,0.55), 0 0 16px rgba(0,0,0,0.55)" }}>
            {text}
          </span>
        );
      })}
    </div>
  );
};

// One small overlay card; use inside a <Sequence>. Fades out over its last 6 frames.
export const Overlay: React.FC<{ dur: number; top: number; children: React.ReactNode }> = ({ dur, top, children }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f, fps, config: { damping: 14, stiffness: 170 } });
  const out = interpolate(f, [dur - 6, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top, left: 110, right: 110, display: "flex", justifyContent: "center", opacity: Math.min(1, p * 2) * out, transform: `translateY(${(1 - p) * 30}px)` }}>
      {children}
    </div>
  );
};

export const EndCardStd: React.FC<{ cta: string; icon: "comment" | "follow" | "share" | "save"; note?: string }> = ({ cta, icon, note }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f, fps, config: { damping: 15, stiffness: 150 } });
  return (
    <AbsoluteFill style={{ background: C.paper, alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 26, marginTop: -160, transform: `scale(${0.9 + 0.1 * p})`, opacity: Math.min(1, p * 2) }}>
        <Img src={staticFile("img/coach-nas.jpeg")} style={{ width: 440, height: 440, borderRadius: "50%", objectFit: "cover", border: `8px solid ${C.gold}` }} />
        <div style={{ fontSize: 78, fontWeight: 800, color: C.ink }}>Coach Nas</div>
        <div style={{ fontSize: 40, fontWeight: 600, color: C.inkSoft, marginTop: -14 }}>Clinical Pharmacist · Wellness Coach</div>
        <div style={{ marginTop: 40 }}>
          <CtaPill icon={icon} delay={8}>
            {cta}
          </CtaPill>
        </div>
        {note && <div style={{ fontSize: 28, color: C.inkSoft, maxWidth: 800, textAlign: "center" }}>{note}</div>}
      </div>
    </AbsoluteFill>
  );
};
