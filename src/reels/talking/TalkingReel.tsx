// Shared talking-head reel: trimmed teleprompter clips played back to back, burned-in captions,
// plus title cards / sticky notes / custom cards anchored to spoken words.
// Clip data (per clip: duration, word start times, caption chunks) is generated from a Whisper
// transcript and corrected by hand. Videos live in public/clips/<folder>/<id>.mp4 (local only).
import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS, HAND, POPPINS } from "../../theme";

export type Clip = { id: string; dur: number; caps: { from: number; to: number; text: string }[]; wordAt: number[] };
export type Side = "left" | "right";
export type Ov =
  | { kind: "title"; at: number; until?: number; text: React.ReactNode }
  | { kind: "sticky"; at: number; side: Side; y: number; text: React.ReactNode; tone?: Tone; small?: React.ReactNode }
  | { kind: "name"; at: number }
  | { kind: "card"; at: number; until?: number; el: React.ReactNode; sfx?: "pop" | "whoosh" | "stamp" | "tick" | "chime" };

const frames = (s: number) => Math.round(s * FPS);
export const reelLength = (clips: Clip[]) => clips.reduce((a, c) => a + frames(c.dur), 0);

// Gold highlight inside title cards.
export const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: "#B8892B" }}>{children}</span>;

export const usePop = (delay = 0) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - delay, fps, config: { damping: 13, stiffness: 160 } });
};

export const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const p = usePop();
  return (
    <div style={{ position: "absolute", top: 120, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          transform: `translateY(${(1 - p) * -40}px) scale(${0.9 + 0.1 * p})`,
          opacity: p,
          background: C.paper,
          color: C.ink,
          fontFamily: POPPINS,
          fontWeight: 800,
          fontSize: 58,
          lineHeight: 1.18,
          letterSpacing: -1,
          textAlign: "center",
          padding: "26px 40px",
          borderRadius: 26,
          boxShadow: "0 12px 36px rgba(0,0,0,0.28)",
          maxWidth: 960,
        }}
      >
        {children}
      </div>
    </div>
  );
};

const TONES = { gold: "#F4E3A1", green: "#D9E8D2", red: "#F6D2C4" };
type Tone = keyof typeof TONES;

export const Sticky: React.FC<{ side: Side; y: number; text: React.ReactNode; tone?: Tone; small?: React.ReactNode; seed: number }> = ({ side, y, text, tone = "gold", small, seed }) => {
  const p = usePop();
  const rot = (side === "left" ? -1 : 1) * (3 + (seed % 3));
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        [side]: 26,
        width: 262,
        transform: `rotate(${rot * p}deg) scale(${0.6 + 0.4 * p})`,
        opacity: Math.min(1, p * 1.4),
        transformOrigin: side === "left" ? "left center" : "right center",
      }}
    >
      <div style={{ position: "absolute", top: -16, left: "50%", marginLeft: -50, width: 100, height: 30, background: "rgba(255,255,255,0.55)", transform: "rotate(-3deg)" }} />
      <div style={{ background: TONES[tone], padding: "24px 22px 26px", boxShadow: "0 10px 24px rgba(0,0,0,0.3)", color: C.ink }}>
        <div style={{ fontFamily: HAND, fontWeight: 700, fontSize: 54, lineHeight: 1.0 }}>{text}</div>
        {small && <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 24, lineHeight: 1.3, marginTop: 10, color: C.inkSoft }}>{small}</div>}
      </div>
    </div>
  );
};

const NamePlate: React.FC = () => {
  const p = usePop();
  return (
    <div style={{ position: "absolute", top: 130, left: 60, transform: `translateX(${(1 - p) * -80}px)`, opacity: p }}>
      <div style={{ background: C.ink, color: C.paper, borderRadius: 18, padding: "20px 30px", boxShadow: "0 10px 30px rgba(0,0,0,0.3)", borderLeft: `10px solid ${C.gold}` }}>
        <div style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 44 }}>Coach Nas</div>
        <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 28, opacity: 0.9 }}>Farmasis Klinikal · Onkologi & Hematologi</div>
      </div>
    </div>
  );
};

// Dark green card at the top (CTA / punchline).
export const TopCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const p = usePop();
  return (
    <div style={{ position: "absolute", top: 110, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: `scale(${0.85 + 0.15 * p})`, opacity: p, background: C.ink, color: C.paper, borderRadius: 28, padding: "30px 44px", textAlign: "center", boxShadow: "0 12px 36px rgba(0,0,0,0.3)", fontFamily: POPPINS }}>
        {children}
      </div>
    </div>
  );
};

// Caption: *word* = gold highlight.
const CaptionText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\*[^*]+\*)/).map((part, i) =>
      part.startsWith("*") ? (
        <span key={i} style={{ color: C.gold }}>
          {part.slice(1, -1)}
        </span>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      ),
    )}
  </>
);

const Captions: React.FC<{ clip: Clip }> = ({ clip }) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const idx = clip.caps.reduce((found, c, i) => (t >= c.from && t < c.to ? i : found), -1);
  if (idx < 0) return null;
  const c = clip.caps[idx];
  const s = interpolate(f - frames(c.from), [0, 4], [0.92, 1], { extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 1290, left: 70, right: 70, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          transform: `scale(${s})`,
          fontFamily: POPPINS,
          fontWeight: 800,
          fontSize: 60,
          lineHeight: 1.18,
          textAlign: "center",
          color: "#fff",
          textShadow: "0 3px 0 rgba(0,0,0,0.55), 0 0 18px rgba(0,0,0,0.65), 0 0 4px rgba(0,0,0,0.9)",
          letterSpacing: -0.5,
        }}
      >
        <CaptionText text={c.text} />
      </div>
    </div>
  );
};

const ClipOverlays: React.FC<{ clip: Clip; list: Ov[] }> = ({ clip, list }) => {
  const total = frames(clip.dur);
  const startOf = (w: number) => Math.max(0, frames(clip.wordAt[w]) - 4);
  return (
    <>
      {list.map((o, i) => {
        const from = startOf(o.at);
        const until = (o.kind === "title" || o.kind === "card") && o.until !== undefined ? startOf(o.until) : total;
        const el =
          o.kind === "title" ? (
            <Title>{o.text}</Title>
          ) : o.kind === "sticky" ? (
            <Sticky side={o.side} y={o.y} text={o.text} tone={o.tone} small={o.small} seed={i} />
          ) : o.kind === "name" ? (
            <NamePlate />
          ) : (
            o.el
          );
        const sfx = o.kind === "sticky" ? "pop" : o.kind === "card" ? o.sfx ?? "whoosh" : "whoosh";
        return (
          <Sequence key={i} from={from} durationInFrames={Math.max(1, until - from)} layout="none">
            {el}
            <Audio src={staticFile(`sfx/${sfx}.wav`)} volume={o.kind === "sticky" ? 0.35 : 0.22} />
          </Sequence>
        );
      })}
    </>
  );
};

const Handle: React.FC = () => (
  <div style={{ position: "absolute", top: 54, left: 0, right: 0, textAlign: "center", fontFamily: POPPINS, fontWeight: 600, fontSize: 26, color: "rgba(255,255,255,0.85)", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
    @coachnas.pharmacist
  </div>
);

export const TalkingReel: React.FC<{ clips: Clip[]; folder: string; overlays: Record<string, Ov[]> }> = ({ clips, folder, overlays }) => {
  let acc = 0;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {clips.map((clip) => {
        const from = acc;
        const len = frames(clip.dur);
        acc += len;
        return (
          <Sequence key={clip.id} from={from} durationInFrames={len}>
            <OffthreadVideo src={staticFile(`clips/${folder}/${clip.id}.mp4`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 85%)" }} />
            <Captions clip={clip} />
            <ClipOverlays clip={clip} list={overlays[clip.id] ?? []} />
          </Sequence>
        );
      })}
      <Handle />
    </AbsoluteFill>
  );
};
