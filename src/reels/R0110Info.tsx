// Reel 2 — "Information Overload" (01/10/2026), with Coach Nas's own footage and voice.
// Source: Notion 📅 01/10/2026 — Clinical Pharmacist Lens, 🎥 REEL 2 (hook, teleprompter, overlays, CTA). QA reviewed 27/09.
// Format: browser tabs → checklist (the script's own "20 tab nutrition dalam kepala"). Notes app is 04/10's
// format, so it is not reused within 7 days (docs/video-style-rotation.md). On-screen text from the script only.
//
// Media (local only, gitignored):
//   public/clips/R0110-info-hook.mp4    face-cam opener (Teleprompter 17:52, src 0.95–6.85s): "Protein, Fibre, Calories…"
//   public/voice/R0110-info/source.mp3  TeleCue 17:54 take: src 1.0–28.85s + 0.5s pause + last CTA take
//                                       "Save for your reference." (src 37.6–39.0s); earlier CTA takes cut.
// Timings are word starts from a Whisper transcript, corrected against measured pauses.
import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, CtaPill, Stack, Tag } from "./formats/common";

export const R0110_INFO_CLIP = "clips/R0110-info-hook.mp4";
export const R0110_INFO_AUDIO = "voice/R0110-info/source.mp3";

// ---- timeline ---------------------------------------------------------------------------------
const CLIP_FROM = 0.95; // clip source time at reel 0
const CLIP_LEN = 178; // frames (5.93s)
const VOICE_AT = 6.0; // reel time where the voice track (src 1.0) starts
const CTA_FROM = 37.6;
const CTA_AT = VOICE_AT + (28.85 - 1.0) + 0.5;
const reel = (src: number) => (src >= CTA_FROM ? CTA_AT + src - CTA_FROM : VOICE_AT + src - 1.0);

const LEAD = 6; // scenes change slightly before the first word
const PRE = 3; // elements start animating 0.1s before their word
const clipW = (src: number) => Math.max(0, Math.round((src - CLIP_FROM) * FPS) - PRE);

const SCENE = { project: 1.15, simplify: 4.46, soalan: 9.05, framework: 21.82 };
const starts = {
  project: CLIP_LEN,
  simplify: Math.round(reel(SCENE.simplify) * FPS) - LEAD,
  soalan: Math.round(reel(SCENE.soalan) * FPS) - LEAD,
  framework: Math.round(reel(SCENE.framework) * FPS) - LEAD,
  cta: Math.round((reel(28.85) + 0.15) * FPS),
  end: Math.round((reel(39.0) + 1.8) * FPS),
};
const w = (sceneStart: number, src: number) => Math.max(0, Math.round(reel(src) * FPS) - PRE - sceneStart);

// ---- browser tabs -----------------------------------------------------------------------------
const TOPICS = ["Protein", "Fibre", "Calories", "Timing", "Supplements", "Gut health"];

const TabChip: React.FC<{ children: React.ReactNode; delay: number; rotate?: number }> = ({ children, delay, rotate = 0 }) => (
  <Pop delay={delay} rotate={rotate}>
    <div style={{ display: "flex", alignItems: "center", gap: 18, background: C.card, border: `4px solid ${C.ink}`, borderRadius: "18px 18px 6px 6px", padding: "14px 26px", fontSize: 44, fontWeight: 800, color: C.ink, whiteSpace: "nowrap", boxShadow: "0 8px 22px rgba(20,30,20,0.25)" }}>
      <span style={{ width: 18, height: 18, borderRadius: "50%", background: C.marker }} />
      {children}
      <span style={{ fontSize: 34, fontWeight: 700, color: C.inkSoft, marginLeft: 6 }}>×</span>
    </div>
  </Pop>
);

// A browser window whose tab strip fills up to `n` tabs (labels only for the script's six topics).
const Browser: React.FC<{ n: (f: number) => number; width?: number }> = ({ n, width = 920 }) => {
  const f = useCurrentFrame();
  const count = Math.round(n(f));
  return (
    <Card style={{ width, padding: 0, borderRadius: 24, overflow: "hidden" }}>
      <div style={{ display: "flex", gap: 4, padding: "16px 14px 0", background: "#E9E4D4", height: 74, alignItems: "flex-end" }}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} style={{ flex: 1, minWidth: 0, height: 56, background: i === count - 1 ? C.card : "#F7F3E7", borderRadius: "12px 12px 0 0", display: "flex", alignItems: "center", gap: 8, padding: "0 10px", overflow: "hidden" }}>
            <span style={{ width: 12, height: 12, flexShrink: 0, borderRadius: "50%", background: C.marker }} />
            {count <= 8 && <span style={{ fontSize: 24, fontWeight: 700, color: C.ink, whiteSpace: "nowrap" }}>{TOPICS[i % TOPICS.length]}</span>}
          </div>
        ))}
      </div>
      <div style={{ height: 150, display: "flex", flexDirection: "column", gap: 18, padding: "30px 40px" }}>
        <div style={{ height: 22, width: "70%", borderRadius: 11, background: "#ECE8DC" }} />
        <div style={{ height: 22, width: "45%", borderRadius: 11, background: "#ECE8DC" }} />
      </div>
    </Card>
  );
};

// ---- scenes ------------------------------------------------------------------------------------
const CHIP_AT = [1.12, 2.24, 2.98, 4.18, 4.98, 5.88].map(clipW); // spoken in the clip

const Opener: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(R0110_INFO_CLIP)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(247,245,237,0.9) 0%, rgba(247,245,237,0) 36%)" }} />
    <div style={{ position: "absolute", top: 220, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 960, padding: "34px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.18, color: C.ink }}>
          LAGI BANYAK TAHU NUTRITION,
          <br />
          KADANG LAGI <Highlight delay={14}>SUSAH NAK PILIH.</Highlight>
        </div>
      </Card>
    </div>
    <div style={{ position: "absolute", top: 1180, left: 50, right: 50, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 22 }}>
      {TOPICS.map((t, i) => (
        <TabChip key={t} delay={CHIP_AT[i]} rotate={i % 2 ? 2 : -2}>
          {t}
        </TabChip>
      ))}
    </div>
  </AbsoluteFill>
);

const P = (src: number) => w(starts.project, src);
const Project: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 330, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Browser n={(f) => interpolate(f, [0, 70], [6, 20], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })} />
    </div>
    <Stack top={720} gap={10}>
      <Line delay={P(1.15)} size={64} weight={700}>
        Semua benda nak fikir
      </Line>
      <Line delay={P(2.38)} size={64} weight={700}>
        sampai lunch pun
      </Line>
      <Line delay={P(3.44)} size={92} weight={800}>
        jadi <Highlight delay={P(3.66)}>project.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const S = (src: number) => w(starts.simplify, src);
const Simplify: React.FC = () => {
  const f = useCurrentFrame();
  const fade = interpolate(f, [S(7.52) - 4, S(7.52) + 8], [1, 0.25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <div style={{ position: "absolute", top: 300, left: 80, right: 80, display: "flex", justifyContent: "center", opacity: fade }}>
        <Browser n={() => 20} />
      </div>
      <Stack top={640} gap={8}>
        <Line size={62} weight={700}>
          Kalau <Highlight delay={S(4.8)}>information overload</Highlight>
        </Line>
        <Line delay={S(5.82)} size={62} weight={700}>
          buat awak tak execute,
        </Line>
      </Stack>
      <Stack top={1000}>
        <BoxStamp delay={S(7.52)} rotate={-4} size={130}>
          SIMPLIFY.
        </BoxStamp>
      </Stack>
    </AbsoluteFill>
  );
};

const QS = [
  { tag: "Protein?", text: "Ada protein yang jelas?", at: 12.86, check: 13.76 },
  { tag: "Fibre?", text: "Ada sumber fibre seperti sayur, buah atau pilihan lain yang sesuai?", at: 14.38, check: 17.68 },
  { tag: "Portion?", text: "Portion keseluruhan masuk akal untuk goal dan keadaan awak?", at: 18.71, check: 21.24 },
];
const Q = (src: number) => w(starts.soalan, src);
const Soalan: React.FC = () => (
  <AbsoluteFill>
    <Stack top={250} gap={6}>
      <Line size={50} weight={600} color={C.inkSoft}>
        Untuk satu main meal,
      </Line>
      <Line delay={Q(10.2)} size={50} weight={600} color={C.inkSoft}>
        saya suka mula dengan
      </Line>
      <Line delay={Q(11.56)} size={88} weight={800}>
        <Highlight delay={Q(11.7)}>tiga soalan:</Highlight>
      </Line>
    </Stack>
    <Stack top={660} gap={30}>
      {QS.map((q, i) => (
        <Pop key={q.tag} delay={Q(q.at)} rotate={i % 2 ? 1 : -1}>
          <Card style={{ width: 940, padding: "30px 40px", display: "flex", alignItems: "center", gap: 30, textAlign: "left" }}>
            <div style={{ width: 70, height: 70, flexShrink: 0, border: `5px solid ${C.ink}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Mark kind="check" delay={Q(q.check)} size={46} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: 3, color: C.marker, textTransform: "uppercase" }}>{q.tag}</div>
              <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.2, color: C.ink }}>{q.text}</div>
            </div>
          </Card>
        </Pop>
      ))}
    </Stack>
  </AbsoluteFill>
);

const F = (src: number) => w(starts.framework, src);
const Framework: React.FC = () => (
  <AbsoluteFill>
    <Stack top={300} gap={14}>
      <Line size={78} weight={800}>
        Bukan framework sempurna.
      </Line>
      <Line delay={F(23.42)} size={58} weight={700} color={C.inkSoft}>
        Tapi cukup untuk bantu
        <br />
        buat keputusan
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 760, left: 80, right: 80, display: "flex", justifyContent: "center" }}>
      <Pop delay={F(25.76)}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
          <div style={{ position: "relative" }}>
            <Browser n={() => 20} width={860} />
            <Strike delay={F(27.0)} width={7} />
          </div>
          <div style={{ fontSize: 56, fontWeight: 700, textAlign: "center", lineHeight: 1.2, color: C.ink }}>
            tanpa buka <span style={{ fontWeight: 800, color: C.marker }}>20 tab nutrition</span>
            <br />
            dalam kepala.
          </div>
        </div>
      </Pop>
    </div>
  </AbsoluteFill>
);

const OVERLAYS = ["Simplify", "Protein?", "Fibre?", "Portion?"];
const PILL = w(starts.cta, 37.72); // "Save for your reference."
const CTA: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 560, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
      {OVERLAYS.map((o, i) => (
        <Tag key={o} delay={2 + i * 5}>
          {o}
        </Tag>
      ))}
    </div>
    <div style={{ position: "absolute", top: 860, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="save" delay={PILL}>
        Save.
      </CtaPill>
    </div>
  </AbsoluteFill>
);

// ---- assembly ----------------------------------------------------------------------------------
const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, v]) => [f, s, v * k]);

export const R0110_INFO_SCENES: SceneDef[] = [
  { id: "opener", dur: starts.project, el: <Opener />, cues: soft(CHIP_AT.map((f): Cue => [f, "pop", 0.45]), 0.5) },
  { id: "project", dur: starts.simplify - starts.project, el: <Project />, cues: soft([[0, "whoosh", 0.4], ...[0, 1, 2, 3, 4, 5, 6].map((i): Cue => [8 + i * 9, "tick", 0.3]), [P(3.66), "swipe", 0.5]]) },
  { id: "simplify", dur: starts.soalan - starts.simplify, el: <Simplify />, cues: soft([[S(4.8), "swipe", 0.45], [S(7.52), "stamp", 0.85]]) },
  { id: "soalan", dur: starts.framework - starts.soalan, el: <Soalan />, cues: soft([[Q(11.7), "swipe", 0.45], ...QS.flatMap((q): Cue[] => [[Q(q.at), "pop", 0.45], [Q(q.check), "tick", 0.55]])]) },
  { id: "framework", dur: starts.cta - starts.framework, el: <Framework />, cues: soft([[F(25.76), "pop", 0.45], [F(27.0), "scribble", 0.55]]) },
  { id: "cta", dur: starts.end - starts.cta, el: <CTA />, cues: soft([...OVERLAYS.map((_, i): Cue => [2 + i * 5, "pop", 0.4]), [PILL, "pop", 0.5], [PILL + 4, "chime", 0.45]]) },
];

export const R0110InfoVoice: React.FC = () => (
  <Sequence from={Math.round(VOICE_AT * FPS)} layout="none">
    <Audio src={staticFile(R0110_INFO_AUDIO)} />
  </Sequence>
);
