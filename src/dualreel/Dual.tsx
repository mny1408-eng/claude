// DualReel templates — the same talking-head edit in two designs (props come from dualreel/dualreel.py).
//  * DualIG — Layout A: series tag, boxless hook title with the gold underline, pop captions under the chin, script
//    on-screen texts as white cards, standard ivory end card.
//  * DualTT — "suara dalam kepala" for TikTok: the hook arrives as a grey chat bubble, native-looking captions (TikTok's
//    background text style: dark words on a white box, keyword on gold), on-screen texts as plain outlined text that moves between two spots, a small jump-zoom
//    at every new sentence, CTA text over the last seconds and no end card (the video loops). Kept inside TikTok's safe area:
//    clear of the top tabs (y < 200), the right-hand buttons (x > 900) and the caption block (y > 1450).
import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS, POPPINS } from "../theme";
import { Reel, SceneDef } from "../Reel";
import { chunkWords, EndCardStd, HookTitle, Overlay, PopWords, SERIES, SeriesTag, Wd } from "../reels/formats/LayoutA";

// A card is a line of text, or (with "stat") a row of numbers that count up, e.g. [{label: "Isteri", value: 11, unit: "kg", sign: "−"}].
export type Stat = { label: string; value: number; unit?: string; sign?: string };
export type Card = { text: string; from: number; to: number; stat?: Stat[]; sub?: string };

export type DualProps = {
  clip: string;
  talk: number;
  words: Wd[];
  series: string;
  hook: string;
  hookKey: string;
  cards: Card[];
  photos: unknown[];
  cta: string;
  ctaIcon: string;
  handle: string;
  note?: string; // small line under the end-card CTA, e.g. the source of a claim
};

export const DUAL_DEFAULTS: DualProps = {
  clip: "dualreel/demo/ig.mp4", talk: 10, words: [], series: "MINDSET", hook: "Tak ada beza pun?", hookKey: "",
  cards: [], photos: [], cta: "Save reel ni", ctaIcon: "save", handle: "@coachnas.pharmacist",
};

const IG_END = 90;
export const calcDualIG: CalculateMetadataFunction<DualProps> = ({ props }) => ({ durationInFrames: Math.round(props.talk * FPS) + IG_END, fps: FPS });
export const calcDualTT: CalculateMetadataFunction<DualProps> = ({ props }) => ({ durationInFrames: Math.round(props.talk * FPS), fps: FPS });

// "Tak ada beza pun?" → [["TAK ADA", false], ["BEZA PUN?", true]]; hookKey picks the underlined part when given.
const hookLines = (hook: string, key: string): [string, boolean][] => {
  const h = hook.toUpperCase();
  const k = key.toUpperCase();
  if (k && h.includes(k)) {
    const rest = h.replace(k, "").trim();
    return rest ? (h.startsWith(k) ? [[k, true], [rest, false]] : [[rest, false], [k, true]]) : [[k, true]];
  }
  const w = h.split(/\s+/);
  if (w.length <= 2) return [[h, true]];
  const cut = Math.max(1, w.length - 2);
  return [[w.slice(0, cut).join(" "), false], [w.slice(cut).join(" "), true]];
};

const seq = (a: number, b: number) => ({ from: Math.round(a * FPS), durationInFrames: Math.max(1, Math.round((b - a) * FPS)) });

// ---------------- Instagram ----------------
// Numbers that count up over ~0.8 s (results, steps). Plain white card for IG, outlined text for TikTok.
const StatCard: React.FC<{ stat: Stat[]; sub?: string; tt?: boolean }> = ({ stat, sub, tt }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = interpolate(f, [4, 4 + 0.8 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ease = 1 - Math.pow(1 - k, 3);
  const num: React.CSSProperties = tt ? { color: "#fff", textShadow: OUTLINE } : { color: C.ink };
  return (
    <div style={tt ? { textAlign: "center" } : { ...igCard, padding: "20px 36px" }}>
      <div style={{ display: "flex", gap: 46, justifyContent: "center" }}>
        {stat.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontSize: tt ? 40 : 34, fontWeight: 700, ...(tt ? { color: "#fff", textShadow: OUTLINE } : { color: C.inkSoft }) }}>{s.label}</div>
            <div style={{ fontSize: tt ? 104 : 92, fontWeight: 800, lineHeight: 1, ...num }}>
              {s.sign ?? ""}{Math.round(s.value * ease)}
              <span style={{ fontSize: tt ? 54 : 46 }}>{s.unit ?? ""}</span>
            </div>
          </div>
        ))}
      </div>
      {sub && <div style={{ marginTop: 8, fontSize: tt ? 32 : 28, fontWeight: 600, ...(tt ? { color: "#fff", textShadow: OUTLINE } : { color: C.inkSoft }) }}>{sub}</div>}
    </div>
  );
};


const igCard: React.CSSProperties = { background: "#fff", color: C.ink, borderRadius: 18, padding: "16px 32px", fontSize: 50, fontWeight: 800, boxShadow: "0 10px 26px rgba(0,0,0,0.25)", textAlign: "center" };

const IGTalk: React.FC<DualProps> = (p) => {
  const chunks = React.useMemo(() => chunkWords(p.words), [p.words]);
  const series = (p.series in SERIES ? p.series : "MINDSET") as keyof typeof SERIES;
  const hookEnd = Math.min(p.talk, Math.max(6, p.cards[0]?.from ?? 12) - 0.2);
  return (
    <AbsoluteFill>
      <OffthreadVideo src={staticFile(p.clip)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <Sequence {...seq(0, hookEnd)} layout="none">
        {p.series ? <SeriesTag series={series} /> : null}
        <HookTitle lines={hookLines(p.hook, p.hookKey)} tone="dark" hookSec={3.4} />
      </Sequence>
      {p.cards.map((c, i) => (
        <Sequence key={i} {...seq(Math.max(c.from, hookEnd + 0.1), c.to)} layout="none">
          <Overlay dur={Math.round((c.to - Math.max(c.from, hookEnd + 0.1)) * FPS)} top={240}>
            {c.stat ? <StatCard stat={c.stat} sub={c.sub} /> : <div style={igCard}>{c.text}</div>}
          </Overlay>
        </Sequence>
      ))}
      <PopWords chunks={chunks} top={1290} />
    </AbsoluteFill>
  );
};

export const DualIG: React.FC<DualProps> = (p) => {
  const scenes: SceneDef[] = [
    { id: "talk", dur: Math.round(p.talk * FPS), el: <IGTalk {...p} /> },
    { id: "end", dur: IG_END, el: <EndCardStd cta={p.cta} note={p.note} icon={(["comment", "follow", "share", "save"].includes(p.ctaIcon) ? p.ctaIcon : "save") as "save"} /> },
  ];
  return <Reel scenes={scenes} />;
};

// ---------------- TikTok ----------------
const OUTLINE = "-3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000, 3px 3px 0 #000, 0 3px 0 #000, 0 -3px 0 #000, 3px 0 0 #000, -3px 0 0 #000, 0 6px 12px rgba(0,0,0,0.5)";
const TT_SAFE = { left: 70, right: 200 };

const ChatHook: React.FC<{ text: string }> = ({ text }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - 2, fps, config: { damping: 14, stiffness: 200 } });
  const typing = f < 12;
  const out = interpolate(f, [2.6 * fps, 3 * fps], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div style={{ position: "absolute", top: 300, left: TT_SAFE.left, right: TT_SAFE.right, opacity: out }}>
      <div style={{ display: "inline-block", maxWidth: 720, background: "#E9E9EB", color: "#111", borderRadius: "38px 38px 38px 10px", padding: "26px 36px", fontSize: 54, fontWeight: 700, lineHeight: 1.2, transformOrigin: "0% 100%", transform: `scale(${0.6 + 0.4 * p})`, opacity: Math.min(1, p * 2), boxShadow: "0 10px 30px rgba(0,0,0,0.25)" }}>
        {typing ? <span style={{ letterSpacing: 8 }}>• • •</span> : text}
      </div>
    </div>
  );
};

const TTCaptions: React.FC<{ words: Wd[] }> = ({ words }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  // 1–2 words at a time
  const groups = React.useMemo(() => {
    const out: Wd[][] = [];
    let cur: Wd[] = [];
    words.forEach((w, i) => {
      cur.push(w);
      const n = words[i + 1];
      if (!n || cur.length >= 2 || /[.,?!…]$/.test(w[2]) || n[0] - w[1] > 0.3) {
        out.push(cur);
        cur = [];
      }
    });
    return out;
  }, [words]);
  const g = groups.find((c, k) => t >= c[0][0] - 0.03 && t < Math.min(groups[k + 1]?.[0][0] ?? 1e9, c[c.length - 1][1] + 0.5));
  if (!g) return null;
  const st = Math.round((g[0][0] - 0.03) * fps);
  const p = spring({ frame: f - st, fps, config: { damping: 10, stiffness: 260 } });
  // TikTok "background" text style: dark words on a white rounded box, the keyword on gold
  return (
    <div style={{ position: "absolute", top: 1180, left: TT_SAFE.left, right: TT_SAFE.right, display: "flex", justifyContent: "center", transform: `scale(${0.85 + 0.15 * p})` }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "0 14px", background: "#fff", borderRadius: 22, padding: "10px 26px 14px", boxShadow: "0 8px 22px rgba(0,0,0,0.3)" }}>
        {g.map(([, , text, emph], i) => (
          <span key={i} style={{ fontFamily: POPPINS, fontSize: 64, fontWeight: 800, lineHeight: 1.15, color: "#111", textTransform: "lowercase", ...(emph ? { background: C.gold, borderRadius: 12, padding: "0 12px", margin: "0 -6px" } : {}) }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

const TTText: React.FC<{ text: string; dur: number; i: number }> = ({ text, dur, i }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f, fps, config: { damping: 12, stiffness: 200 } });
  const out = interpolate(f, [dur - 5, dur], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const spot = i % 2 === 0 ? { top: 300, justifyContent: "flex-start" } : { top: 420, justifyContent: "flex-end" };
  return (
    <div style={{ position: "absolute", top: spot.top, left: TT_SAFE.left, right: TT_SAFE.right, display: "flex", justifyContent: spot.justifyContent, opacity: out }}>
      <div style={{ fontSize: 66, fontWeight: 800, color: "#fff", textShadow: OUTLINE, maxWidth: 760, lineHeight: 1.1, transform: `translateY(${(1 - p) * 30}px) rotate(${i % 2 ? 2 : -2}deg)`, opacity: Math.min(1, p * 2) }}>
        {text}
      </div>
    </div>
  );
};

export const DualTT: React.FC<DualProps> = (p) => {
  const f = useCurrentFrame();
  const t = f / FPS;
  // jump-zoom: alternate 100% / 106% at each new sentence
  const starts = React.useMemo(() => {
    const s = [0];
    p.words.forEach((w, i) => {
      if (i > 0 && /[.?!]$/.test(p.words[i - 1][2])) s.push(w[0]);
    });
    return s;
  }, [p.words]);
  const k = starts.filter((s) => t >= s - 0.02).length - 1;
  const zoom = k % 2 === 1 ? 1.06 : 1;
  const ctaFrom = Math.max(0, p.talk - 3.2);
  return (
    <AbsoluteFill style={{ background: "#000", fontFamily: POPPINS }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 38%" }}>
        <OffthreadVideo src={staticFile(p.clip)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 215, left: TT_SAFE.left, fontSize: 30, fontWeight: 700, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>{p.handle}</div>
      <Sequence {...seq(0, 3)} layout="none">
        <ChatHook text={p.hook} />
      </Sequence>
      {p.cards.map((c, i) => (
        <Sequence key={i} {...seq(Math.max(c.from, 3), Math.min(c.to, ctaFrom))} layout="none">
          {c.stat ? (
            <div style={{ position: "absolute", top: 320, left: TT_SAFE.left, right: TT_SAFE.right }}>
              <StatCard stat={c.stat} sub={c.sub} tt />
            </div>
          ) : (
            <TTText text={c.text} i={i} dur={Math.round((Math.min(c.to, ctaFrom) - Math.max(c.from, 3)) * FPS)} />
          )}
        </Sequence>
      ))}
      <Sequence {...seq(ctaFrom, p.talk)} layout="none">
        <TTText text={p.cta} i={0} dur={Math.round((p.talk - ctaFrom) * FPS) + 10} />
      </Sequence>
      <TTCaptions words={p.words} />
    </AbsoluteFill>
  );
};
