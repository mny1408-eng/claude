// AutoReel: one data-driven template for every value-content reel. All content comes from the project's props.json written by
// autoreel/autoreel.py (cut video, word-timed captions, hook, step titles, key message, end card). Nothing here invents text:
// captions are the creator's own words; titles come from the topic preset and are only shown where the footage covers them.
import React from "react";
import { AbsoluteFill, Easing, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CalculateMetadataFunction } from "remotion";
import { POPPINS } from "../theme";

type W = { w: string; s: number; e: number; hl?: boolean };
type Chunk = { s: number; e: number; words: W[] };
type Step = { n: number; title: string; icon: string; start: number; end: number };
export type AutoReelProps = {
  video: string;
  fps: number;
  durationInFrames: number;
  talkSeconds: number;
  handle: string;
  colors: { paper: string; ink: string; inkSoft: string; gold: string; marker: string; card: string };
  layout: { titleTop: number; captionTop: number; zoomOrigin: [number, number]; sideInset: number };
  hook: { text: string; end: number } | null;
  steps: Step[];
  keyMessage: { text: string; start: number } | null; // not "key": React strips a prop named key
  captions: Chunk[];
  cuts: number[];
  end: { seconds: number; recap: string[]; cta: { text: string; icon: string } };
};

export const AUTO_REEL_DEFAULTS: AutoReelProps = {
  video: "autoreel/demo/cut.mp4",
  fps: 30,
  durationInFrames: 90,
  talkSeconds: 1,
  handle: "@coachnas.pharmacist",
  colors: { paper: "#F7F5ED", ink: "#173C30", inkSoft: "#394A41", gold: "#EAD49C", marker: "#C0613E", card: "#FFFFFF" },
  layout: { titleTop: 220, captionTop: 1100, zoomOrigin: [0.5, 0.35], sideInset: 110 },
  hook: null,
  steps: [],
  keyMessage: null,
  captions: [],
  cuts: [],
  end: { seconds: 2.5, recap: [], cta: { text: "Save reel ni", icon: "save" } },
};

export const calcAutoReel: CalculateMetadataFunction<AutoReelProps> = ({ props }) => ({
  durationInFrames: props.durationInFrames,
  fps: props.fps,
});

const SHADOW = "0 8px 22px rgba(20,30,20,0.25)";

const Icon: React.FC<{ name: string; color: string; size?: number }> = ({ name, color, size = 44 }) => {
  const p = { fill: "none", stroke: color, strokeWidth: 7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 64 64" width={size} height={size}>
      {name === "flame" && <path {...p} d="M32 6c4 10 14 16 14 30a14 14 0 0 1-28 0c0-8 5-12 7-18 3 4 3 8 7 10 2-8 0-14 0-22z" />}
      {name === "plate" && (
        <>
          <circle {...p} cx={32} cy={34} r={22} />
          <path {...p} d="M22 34a10 10 0 0 1 20 0" />
        </>
      )}
      {name === "calendar" && (
        <>
          <rect {...p} x={8} y={12} width={48} height={44} rx={8} />
          <path {...p} d="M8 26h48M20 6v12M44 6v12M22 40l6 6 12-12" />
        </>
      )}
      {name === "shield" && <path {...p} d="M32 6l22 8v16c0 14-10 24-22 28C20 54 10 44 10 30V14z M22 32l7 7 13-14" />}
      {name === "save" && <path fill={color} d="M14 6h36v52L32 44 14 58z" />}
      {(name === "dot" || !["flame", "plate", "calendar", "shield", "save"].includes(name)) && <circle cx={32} cy={32} r={12} fill={color} />}
    </svg>
  );
};

const pop = (frame: number, fps: number, delay: number) => spring({ frame: frame - delay, fps, config: { damping: 13, stiffness: 170 } });

// Alternate a gentle punch-in on every cut (hides jump cuts) and a slightly bigger one when a step starts.
const useZoom = (p: AutoReelProps) => {
  const f = useCurrentFrame();
  const t = f / p.fps;
  let k = 0;
  for (let i = 0; i < p.cuts.length; i++) if (p.cuts[i] <= t) k = i;
  const base = k % 2 ? 1.06 : 1.0;
  const step = [...p.steps].reverse().find((s) => s.start <= t);
  const since = step ? t - step.start : 99;
  const punch = since < 0.6 ? interpolate(since, [0, 0.6], [0.06, 0], { easing: Easing.out(Easing.cubic) }) : 0;
  return base + punch;
};

const Captions: React.FC<{ p: AutoReelProps }> = ({ p }) => {
  const t = useCurrentFrame() / p.fps;
  const c = p.captions.find((x) => t >= x.s - 0.03 && t < x.e);
  if (!c) return null;
  return (
    <div style={{ position: "absolute", top: p.layout.captionTop, left: p.layout.sideInset, right: p.layout.sideInset, display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 14px" }}>
        {c.words.map((w, i) => {
          const on = t >= w.s - 0.03 && t < w.e + 0.2;
          return (
            <span
              key={i}
              style={{
                fontFamily: POPPINS,
                fontSize: 60,
                fontWeight: 800,
                lineHeight: 1.15,
                padding: "2px 14px",
                borderRadius: 12,
                color: on ? p.colors.ink : w.hl ? p.colors.gold : "#FFFFFF",
                background: on ? p.colors.gold : "transparent",
                textShadow: on ? "none" : "0 3px 0 rgba(0,0,0,0.55), 0 0 14px rgba(0,0,0,0.5)",
                transform: on ? "scale(1.06)" : undefined,
              }}
            >
              {w.w.replace(/[.,]$/, "")}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const HookCard: React.FC<{ p: AutoReelProps }> = ({ p }) => {
  const f = useCurrentFrame();
  if (!p.hook || f / p.fps > p.hook.end) return null;
  const s = pop(f, p.fps, 2);
  return (
    <div style={{ position: "absolute", top: p.layout.titleTop, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: `scale(${0.7 + 0.3 * s})`, opacity: Math.min(1, s * 2), background: p.colors.card, borderRadius: 26, padding: "30px 38px", boxShadow: SHADOW, textAlign: "center", fontFamily: POPPINS, fontSize: 52, fontWeight: 800, lineHeight: 1.18, color: p.colors.ink }}>
        {p.hook.text}
      </div>
    </div>
  );
};

const StepTitle: React.FC<{ p: AutoReelProps }> = ({ p }) => {
  const f = useCurrentFrame();
  const t = f / p.fps;
  if (p.keyMessage && t >= p.keyMessage.start) {
    const s = pop(f, p.fps, Math.round(p.keyMessage.start * p.fps));
    return (
      <div style={{ position: "absolute", top: p.layout.titleTop, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
        <div style={{ transform: `scale(${0.7 + 0.3 * s})`, background: p.colors.ink, color: p.colors.paper, borderRadius: 22, padding: "20px 34px", fontFamily: POPPINS, fontSize: 50, fontWeight: 800, boxShadow: SHADOW, whiteSpace: "nowrap" }}>
          {p.keyMessage.text.split(">").map((x, i, a) => (
            <React.Fragment key={i}>
              {x.trim()}
              {i < a.length - 1 && <span style={{ color: p.colors.gold }}> &gt; </span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }
  const st = p.steps.find((s) => t >= s.start && t < s.end);
  if (!st) return null;
  const s = pop(f, p.fps, Math.round(st.start * p.fps));
  const x = interpolate(s, [0, 1], [-140, 0]);
  return (
    <div style={{ position: "absolute", top: p.layout.titleTop, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: `translateX(${x}px)`, opacity: Math.min(1, s * 2), display: "flex", alignItems: "center", gap: 20, background: p.colors.card, borderRadius: 24, padding: "14px 30px 14px 14px", boxShadow: SHADOW }}>
        <div style={{ width: 92, height: 92, borderRadius: 20, background: p.colors.ink, color: p.colors.gold, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: POPPINS, lineHeight: 1 }}>
          <span style={{ fontSize: 17, fontWeight: 800, letterSpacing: 2 }}>STEP</span>
          <span style={{ fontSize: 46, fontWeight: 800 }}>{st.n}</span>
        </div>
        <Icon name={st.icon} color={p.colors.marker} size={52} />
        <span style={{ fontFamily: POPPINS, fontSize: 44, fontWeight: 800, color: p.colors.ink, whiteSpace: "nowrap" }}>{st.title}</span>
      </div>
    </div>
  );
};

const EndCard: React.FC<{ p: AutoReelProps }> = ({ p }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile(p.video)} muted startFrom={Math.max(0, Math.round(p.talkSeconds * fps) - 4)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <AbsoluteFill style={{ background: "rgba(23,60,48,0.55)" }} />
      <div style={{ position: "absolute", top: 640, left: p.layout.sideInset, right: p.layout.sideInset, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        {p.end.recap.map((r, i) => {
          const s = pop(f, fps, i * 4);
          return (
            <div key={r} style={{ transform: `scale(${0.7 + 0.3 * s})`, opacity: Math.min(1, s * 2), display: "flex", alignItems: "center", gap: 16, background: p.colors.card, borderRadius: 18, padding: "10px 26px 10px 10px", boxShadow: SHADOW }}>
              <div style={{ width: 58, height: 58, borderRadius: 14, background: p.colors.ink, color: p.colors.gold, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: POPPINS, fontSize: 32, fontWeight: 800 }}>{i + 1}</div>
              <span style={{ fontFamily: POPPINS, fontSize: 38, fontWeight: 800, color: p.colors.ink, whiteSpace: "nowrap" }}>{r}</span>
            </div>
          );
        })}
        {(() => {
          const s = pop(f, fps, p.end.recap.length * 4 + 8);
          return (
            <div style={{ marginTop: 24, transform: `scale(${0.7 + 0.3 * s})`, opacity: Math.min(1, s * 2), display: "flex", alignItems: "center", gap: 18, background: p.colors.gold, color: p.colors.ink, borderRadius: 999, padding: "22px 50px", fontFamily: POPPINS, fontSize: 50, fontWeight: 800, boxShadow: SHADOW }}>
              <Icon name={p.end.cta.icon} color={p.colors.ink} size={44} />
              {p.end.cta.text}
            </div>
          );
        })()}
      </div>
    </AbsoluteFill>
  );
};

export const AutoReel: React.FC<AutoReelProps> = (p) => {
  const zoom = useZoom(p);
  const talk = Math.round(p.talkSeconds * p.fps);
  return (
    <AbsoluteFill style={{ background: p.colors.paper, fontFamily: POPPINS }}>
      <Sequence durationInFrames={talk} layout="none">
        <AbsoluteFill>
          <OffthreadVideo
            src={staticFile(p.video)}
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})`, transformOrigin: `${p.layout.zoomOrigin[0] * 100}% ${p.layout.zoomOrigin[1] * 100}%` }}
          />
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(247,245,237,0.55) 0%, rgba(247,245,237,0) 22%)" }} />
          <HookCard p={p} />
          <StepTitle p={p} />
          <Captions p={p} />
        </AbsoluteFill>
      </Sequence>
      <Sequence from={talk} layout="none">
        <EndCard p={p} />
      </Sequence>
      <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center", fontFamily: POPPINS, fontSize: 26, fontWeight: 700, letterSpacing: 2, color: "rgba(23,60,48,0.75)" }}>{p.handle}</div>
    </AbsoluteFill>
  );
};
