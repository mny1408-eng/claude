// Reel: "Jaga kesihatan pun boleh kena kanser, jadi buat apa jaga?" — Coach Nas talking head, 11 teleprompter takes.
// Clips are trimmed + re-encoded into public/clips/kanser/cNN.mp4 (local only, not in git).
// data.json: per-clip duration, word start times (from Whisper, corrected by hand) and caption chunks.
// Overlays are anchored to word indices so text lands on the spoken word.
// WHO figure: WHO Cancer fact sheet — "between 30 and 50% of cancers can currently be prevented by avoiding risk factors".
import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FPS, HAND, POPPINS } from "../../theme";
import DATA from "./data.json";

type Clip = { id: string; dur: number; caps: { from: number; to: number; text: string }[]; wordAt: number[] };
const CLIPS = DATA as Clip[];

const frames = (s: number) => Math.round(s * FPS);
const clipFrames = CLIPS.map((c) => frames(c.dur));
export const KANSER_TOTAL = clipFrames.reduce((a, b) => a + b, 0);

// Gold highlight inside title cards.
const G: React.FC<{ children: React.ReactNode }> = ({ children }) => <span style={{ color: "#B8892B" }}>{children}</span>;

// ---------- overlay spec ----------
type Side = "left" | "right";
type Ov =
  | { kind: "title"; at: number; until?: number; text: React.ReactNode }
  | { kind: "sticky"; at: number; side: Side; y: number; text: React.ReactNode; tone?: "gold" | "green" | "red"; small?: React.ReactNode }
  | { kind: "name"; at: number }
  | { kind: "cta"; at: number };

const OVERLAYS: Record<string, Ov[]> = {
  c01: [{ kind: "title", at: 0, text: <>“Jaga makan pun boleh kena <G>kanser.</G>”</> }],
  c02: [
    { kind: "title", at: 0, until: 13, text: <>“Merokok puluh tahun, sihat sampai <G>90.</G>”</> },
    { kind: "title", at: 13, text: <>Pernah dengar ayat ni?</> },
  ],
  c03: [{ kind: "name", at: 6 }],
  c04: [
    { kind: "sticky", at: 0, side: "left", y: 420, text: "Jaga makan ✓" },
    { kind: "sticky", at: 3, side: "left", y: 600, text: "Aktif ✓" },
    { kind: "sticky", at: 5, side: "left", y: 780, text: "Tak merokok ✓" },
    { kind: "sticky", at: 10, side: "right", y: 560, tone: "red", text: "Tetap didiagnos kanser" },
  ],
  c05: [{ kind: "title", at: 10, text: <>Jadi, buat apa <G>bersusah payah?</G></> }],
  c06: [
    { kind: "title", at: 4, text: <>Risiko <G>≠</G> jaminan</> },
    { kind: "sticky", at: 24, side: "left", y: 420, text: "Umur" },
    { kind: "sticky", at: 25, side: "right", y: 420, text: "Genetik" },
    { kind: "sticky", at: 26, side: "left", y: 600, text: "Persekitaran" },
    { kind: "sticky", at: 28, side: "right", y: 600, text: "Jangkitan" },
    { kind: "sticky", at: 31, side: "left", y: 780, tone: "green", text: "Lifestyle", small: "← boleh ubah" },
  ],
  c07: [
    { kind: "sticky", at: 0, side: "left", y: 440, tone: "green", text: "Boleh ubah", small: "makan, aktiviti, rokok" },
    { kind: "sticky", at: 5, side: "right", y: 440, text: "Luar kawalan", small: "umur, genetik" },
    { kind: "title", at: 12, text: <>Bukan jaminan <G>100%</G></> },
  ],
  c08: [
    { kind: "sticky", at: 5, side: "right", y: 440, tone: "green", text: "↓ Risiko", small: "beberapa jenis kanser & penyakit kronik" },
    { kind: "sticky", at: 7, side: "left", y: 520, text: "30–50%", small: "kanser boleh dicegah dengan elak faktor risiko (WHO)" },
  ],
  c09: [
    { kind: "sticky", at: 7, side: "left", y: 440, text: "Jaga, kena kanser?", small: "✓ Betul" },
    { kind: "sticky", at: 19, side: "right", y: 440, text: "Tak jaga, hidup 90?", small: "✓ Pun betul" },
    { kind: "title", at: 22, text: <>Jadi <G>tak penting?</G></> },
  ],
  c10: [
    { kind: "title", at: 1, text: <>Tujuan jaga kesihatan?</> },
    { kind: "sticky", at: 20, side: "left", y: 440, tone: "green", text: "Lebih sihat" },
    { kind: "sticky", at: 22, side: "right", y: 440, tone: "green", text: "Lebih lama" },
    { kind: "sticky", at: 25, side: "left", y: 640, tone: "green", text: "Kualiti hidup ↑" },
  ],
  c11: [
    { kind: "title", at: 14, until: 23, text: <>Jangan tunggu <G>diagnosis.</G></> },
    { kind: "cta", at: 23 },
  ],
};

// ---------- pieces ----------

const usePop = (delay = 0) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - delay, fps, config: { damping: 13, stiffness: 160 } });
};

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

const Sticky: React.FC<{ side: Side; y: number; text: React.ReactNode; tone?: keyof typeof TONES; small?: React.ReactNode; seed: number }> = ({ side, y, text, tone = "gold", small, seed }) => {
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

const Cta: React.FC = () => {
  const p = usePop();
  return (
    <div style={{ position: "absolute", top: 110, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: `scale(${0.85 + 0.15 * p})`, opacity: p, background: C.ink, color: C.paper, borderRadius: 28, padding: "30px 44px", textAlign: "center", boxShadow: "0 12px 36px rgba(0,0,0,0.3)" }}>
        <div style={{ fontFamily: POPPINS, fontWeight: 800, fontSize: 54 }}>
          Komen <span style={{ color: C.gold }}>NAK</span>
        </div>
        <div style={{ fontFamily: POPPINS, fontWeight: 600, fontSize: 32, marginTop: 6 }}>Follow @coachnas.pharmacist</div>
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
  const local = f - frames(c.from);
  const s = interpolate(local, [0, 4], [0.92, 1], { extrapolateRight: "clamp" });
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

const ClipOverlays: React.FC<{ clip: Clip }> = ({ clip }) => {
  const total = frames(clip.dur);
  const startOf = (w: number) => Math.max(0, frames(clip.wordAt[w]) - 4);
  const list = OVERLAYS[clip.id] ?? [];
  return (
    <>
      {list.map((o, i) => {
        const from = startOf(o.at);
        const until = o.kind === "title" && o.until !== undefined ? startOf(o.until) : total;
        const el =
          o.kind === "title" ? <Title>{o.text}</Title> : o.kind === "sticky" ? <Sticky side={o.side} y={o.y} text={o.text} tone={o.tone} small={o.small} seed={i} /> : o.kind === "name" ? <NamePlate /> : <Cta />;
        const sfx = o.kind === "sticky" ? "pop" : "whoosh";
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

export const ReelKanser: React.FC = () => {
  let acc = 0;
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {CLIPS.map((clip, i) => {
        const from = acc;
        acc += clipFrames[i];
        return (
          <Sequence key={clip.id} from={from} durationInFrames={clipFrames[i]}>
            <OffthreadVideo src={staticFile(`clips/kanser/${clip.id}.mp4`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 22%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.35) 85%)" }} />
            <Captions clip={clip} />
            <ClipOverlays clip={clip} />
          </Sequence>
        );
      })}
      <Handle />
    </AbsoluteFill>
  );
};
