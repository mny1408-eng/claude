// DualReel templates — the same talking-head edit in two designs (props come from dualreel/dualreel.py).
//  * DualIG — compact retention design (see IGTalk): progress bar, one-line hook → topic chip, slim pills, small picture
//    cards, punch-in per sentence, CTA over the last seconds, no end card.
//  * DualTT — "suara dalam kepala" for TikTok: the hook arrives as a grey chat bubble, native-looking captions (TikTok's
//    background text style: dark words on a white box, keyword on gold), on-screen texts as plain outlined text that moves between two spots, a small jump-zoom
//    at every new sentence, CTA text over the last seconds and no end card (the video loops). Kept inside TikTok's safe area:
//    clear of the top tabs (y < 200), the right-hand buttons (x > 900) and the caption block (y > 1450).
import React from "react";
import { AbsoluteFill, CalculateMetadataFunction, Img, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS, POPPINS } from "../theme";
import { chunkWords, Overlay, PopWords, Wd } from "../reels/formats/LayoutA";
import { CtaPill } from "../reels/formats/common";

// A card is a line of text, or (with "stat") a row of numbers that count up, e.g. [{label: "Isteri", value: 11, unit: "kg", sign: "−"}].
export type Stat = { label: string; value: number; unit?: string; sign?: string };
// "img" shows a picture (path under public/, e.g. Coach's result graphic) as a plain framed card over the video.
export type Card = { text: string; from: number; to: number; stat?: Stat[]; sub?: string; img?: string };

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

export const calcDualIG: CalculateMetadataFunction<DualProps> = ({ props }) => ({ durationInFrames: Math.round(props.talk * FPS), fps: FPS });
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
const ImgCard: React.FC<{ src: string; maxH?: number }> = ({ src, maxH = 1000 }) => (
  <Img src={staticFile(src)} style={{ maxWidth: 640, maxHeight: maxH, objectFit: "contain", border: "8px solid #fff", borderRadius: 14, boxShadow: "0 16px 40px rgba(0,0,0,0.45)" }} />
);

// Numbers that count up over ~0.8 s (results, steps). Plain white card for IG, outlined text for TikTok.
const StatCard: React.FC<{ stat: Stat[]; sub?: string; tt?: boolean; compact?: boolean }> = ({ stat, sub, tt, compact }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const k = interpolate(f, [4, 4 + 0.8 * fps], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ease = 1 - Math.pow(1 - k, 3);
  const num: React.CSSProperties = tt ? { color: "#fff", textShadow: OUTLINE } : { color: C.ink };
  if (compact) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 34, alignItems: "baseline" }}>
          {stat.map((s, i) => (
            <div key={i} style={{ fontSize: 30, fontWeight: 700, color: C.inkSoft }}>
              {s.label} <span style={{ fontSize: 58, fontWeight: 800, color: C.ink }}>{s.sign ?? ""}{Math.round(s.value * ease)}{s.unit ?? ""}</span>
            </div>
          ))}
        </div>
        {sub ? <div style={{ fontSize: 22, fontWeight: 600, color: C.inkSoft }}>{sub}</div> : null}
      </div>
    );
  }
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

// Compact retention design (26/10): everything small so the face and the video stay visible.
//  * thin gold progress bar at the very top (people see how much is left)
//  * hook as ONE line on a dark strip for the first ~2.8 s, then it shrinks into a small topic chip that stays
//  * cards as slim pills at the top; pictures as a small framed card on the right; counting stats as a compact pill
//  * a slight punch-in at every new sentence (pattern interrupt)
//  * no end card: the CTA rides on the last seconds and the reel loops back to the hook
const pill: React.CSSProperties = { background: "rgba(255,255,255,0.95)", color: C.ink, borderRadius: 999, padding: "10px 26px", fontSize: 40, fontWeight: 800, boxShadow: "0 6px 18px rgba(0,0,0,0.25)", textAlign: "center", maxWidth: 860 };

const IGTalk: React.FC<DualProps> = (p) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = f / fps;
  const chunks = React.useMemo(() => chunkWords(p.words), [p.words]);
  const starts = React.useMemo(() => {
    const s = [0];
    p.words.forEach((w, i) => {
      if (i > 0 && /[.?!]$/.test(p.words[i - 1][2])) s.push(w[0]);
    });
    return s;
  }, [p.words]);
  const k = starts.filter((x) => t >= x - 0.02).length - 1;
  const zoom = k % 2 === 1 ? 1.04 : 1;
  const HOOK = 2.8;
  const hp = spring({ frame: f - 2, fps, config: { damping: 14, stiffness: 180 } });
  const hookOut = interpolate(t, [HOOK - 0.3, HOOK], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const chipIn = interpolate(t, [HOOK, HOOK + 0.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaFrom = Math.max(0, p.talk - 3);
  const progress = Math.min(1, t / p.talk);
  const icon = (["comment", "follow", "share", "save"].includes(p.ctaIcon) ? p.ctaIcon : "save") as "save";
  return (
    <AbsoluteFill style={{ background: "#000", fontFamily: POPPINS }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 38%" }}>
        <OffthreadVideo src={staticFile(p.clip)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 0, left: 0, height: 8, width: `${progress * 100}%`, background: C.gold }} />
      {/* hook: one line, then a small topic chip */}
      {t < HOOK && (
        <div style={{ position: "absolute", top: 250, left: 60, right: 60, display: "flex", justifyContent: "center", opacity: hookOut }}>
          <div style={{ background: "rgba(23,60,48,0.88)", color: "#fff", borderRadius: 20, padding: "16px 30px", fontSize: 58, fontWeight: 800, lineHeight: 1.12, textAlign: "center", transform: `scale(${0.85 + 0.15 * hp})`, opacity: Math.min(1, hp * 2) }}>
            {p.hook}
          </div>
        </div>
      )}
      {t >= HOOK && (
        <div style={{ position: "absolute", top: 196, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: chipIn }}>
          <div style={{ background: "rgba(23,60,48,0.8)", color: C.paper, borderRadius: 999, padding: "6px 20px", fontSize: 28, fontWeight: 700, letterSpacing: 0.5 }}>
            {p.series ? <span style={{ color: C.gold, fontWeight: 800 }}>{p.series} · </span> : null}
            {p.hook}
          </div>
        </div>
      )}
      {p.cards.map((c, i) => {
        const a = Math.max(c.from, HOOK + 0.1);
        const b = Math.min(c.to, ctaFrom);
        if (b - a < 0.4) return null;
        return (
          <Sequence key={i} {...seq(a, b)} layout="none">
            {c.img ? (
              <Overlay dur={Math.round((b - a) * FPS)} top={270}>
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                  <Img src={staticFile(c.img)} style={{ maxWidth: 560, maxHeight: 560, objectFit: "contain", border: "6px solid #fff", borderRadius: 12, boxShadow: "0 12px 30px rgba(0,0,0,0.45)", transform: "rotate(2deg)" }} />
                </div>
              </Overlay>
            ) : (
              <Overlay dur={Math.round((b - a) * FPS)} top={262}>
                {c.stat ? (
                  <div style={{ ...pill, borderRadius: 22, padding: "10px 30px", display: "flex", gap: 30, alignItems: "baseline" }}>
                    <StatCard stat={c.stat} sub={c.sub} compact />
                  </div>
                ) : (
                  <div style={pill}>{c.text}</div>
                )}
              </Overlay>
            )}
          </Sequence>
        );
      })}
      <Sequence {...seq(ctaFrom, p.talk)} layout="none">
        <Overlay dur={Math.round((p.talk - ctaFrom) * FPS)} top={262}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ transform: "scale(0.78)" }}>
              <CtaPill icon={icon}>{p.cta}</CtaPill>
            </div>
            {p.note ? <div style={{ fontSize: 24, color: "#fff", textShadow: "0 2px 6px rgba(0,0,0,0.8)", textAlign: "center", maxWidth: 820 }}>{p.note}</div> : null}
          </div>
        </Overlay>
      </Sequence>
      <PopWords chunks={chunks} top={1290} size="sm" />
    </AbsoluteFill>
  );
};

export const DualIG: React.FC<DualProps> = (p) => <IGTalk {...p} />;

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
          {c.img ? (
            <div style={{ position: "absolute", top: 240, left: TT_SAFE.left, right: TT_SAFE.right, display: "flex", justifyContent: "center" }}>
              <ImgCard src={c.img} maxH={900} />
            </div>
          ) : c.stat ? (
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
