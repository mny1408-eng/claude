// Reel 2 (04/10) "3 Soalan Weekly Review" with Coach Nas's own footage and voice.
// Media (local only, gitignored):
//   public/clips/R0410-review-opener.mp4   face-cam opener (Teleprompter 13:13, src 1.85–6.95s):
//                                          "Saya tak suka review minggu dengan satu soalan. Minggu ni aku buat perfect ke tak?"
//   public/voice/R0410-review/source.mp3   TeleCue 14:18, one continuous take (src 1.0–35.1s): "Saya lebih suka tiga
//                                          soalan…" through "Komen satu adjustment awak untuk minggu depan."
// The opener replaces the silent cut's hook; the rest reuses its scenes with word-start timings from a Whisper
// transcript, corrected against measured pauses.
import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile } from "remotion";
import { C, FPS } from "../theme";
import { Card, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R0410ReviewTiming, r0410ReviewScenes } from "./R0410WeeklyReview";

export const R0410_REVIEW_CLIP = "clips/R0410-review-opener.mp4";
export const R0410_REVIEW_AUDIO = "voice/R0410-review/source.mp3";

// ---- timeline ----
const CLIP_FROM = 1.85; // clip source time at reel 0
const CLIP_LEN = 153; // frames (5.1s)
const VOICE_AT = 5.15; // reel time where the voice track (src 1.0) starts
const reel = (src: number) => VOICE_AT + src - 1.0;

const LEAD = 6;
const PRE = 3;
const clipW = (src: number) => Math.max(0, Math.round((src - CLIP_FROM) * FPS) - PRE);

const start = (src: number) => Math.round(reel(src) * FPS) - LEAD;
const starts = {
  bar: CLIP_LEN, // "Saya lebih suka tiga soalan." follows the opener directly
  questions: start(3.45), // "Yang pertama…"
  contoh: start(16.5), // "Contoh…"
  close: start(24.29), // "Weekly review bukan sesi marah diri."
  end: Math.round((reel(34.75) + 1.8) * FPS),
};
const w = (sceneStart: number, src: number) => Math.max(0, Math.round(reel(src) * FPS) - PRE - sceneStart);

const T: R0410ReviewTiming = {
  // The opener already said the first lines, so they are on screen (and struck) from the start of this scene.
  bar: { line2: 0, strike: 0, fillFrom: 0, fillTo: 30, more: w(starts.bar, 1.18), tiga: w(starts.bar, 1.94), hl: w(starts.bar, 2.0) },
  questions: { q: [3.45, 6.48, 10.5].map((s) => w(starts.questions, s)) }, // yang pertama · yang kedua · dan yang ketiga
  contoh: {
    line2: w(starts.contoh, 17.17), // "kalau tiga kali lunch lambat"
    hl: w(starts.contoh, 18.26),
    lunch: [17.36, 17.96, 18.3].map((s) => w(starts.contoh, s)),
    bukan: w(starts.contoh, 19.18), // "mungkin adjustment bukanlah"
    disiplin: w(starts.contoh, 20.54), // "lebih disiplin"
    strike: w(starts.contoh, 21.2),
    mungkin: w(starts.contoh, 21.88), // "Mungkin kena sediakan"
    fallback: w(starts.contoh, 22.5),
    fhl: w(starts.contoh, 23.06),
  },
  close: {
    line2: w(starts.close, 26.82), // "Ia cara kumpul data"
    hl: w(starts.close, 27.46),
    line3: w(starts.close, 29.12), // "and improve satu benda pada satu masa"
    tags: w(starts.close, 30.9),
    pill: w(starts.close, 32.23), // "Komen…"
    sub: w(starts.close, 32.6), // "…satu adjustment awak untuk minggu depan."
  },
};

// ---- opener: face-cam with the hook on top ----
const LINE_AT = clipW(2.03); // "Saya tak suka review minggu dengan satu soalan."
const STRIKE_AT = clipW(6.0); // "…perfect ke tak?"

const Opener: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(R0410_REVIEW_CLIP)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(247,245,237,0.9) 0%, rgba(247,245,237,0) 36%)" }} />
    <div style={{ position: "absolute", top: 220, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 960, padding: "34px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.2, color: C.ink }}>
          SAYA TAK TANYA
          <br />
          <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap", fontSize: 62 }}>
            “MINGGU NI PERFECT TAK?”
            <Strike delay={STRIKE_AT} width={6} />
          </span>
        </div>
      </Card>
    </div>
    <div style={{ position: "absolute", top: 1220, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <Pop delay={LINE_AT} rotate={-1.5}>
        <Card style={{ padding: "24px 44px", fontSize: 50, fontWeight: 800, lineHeight: 1.2, textAlign: "center", boxShadow: "0 8px 22px rgba(20,30,20,0.25)" }}>
          Saya tak suka review minggu
          <br />
          dengan satu soalan.
        </Card>
      </Pop>
    </div>
  </AbsoluteFill>
);

// ---- assembly ----
const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, v]) => [f, s, v * k]);

const dur = {
  bar: starts.questions - starts.bar,
  questions: starts.contoh - starts.questions,
  contoh: starts.close - starts.contoh,
  close: starts.end - starts.close,
};

export const R0410_REVIEW_REAL_SCENES: SceneDef[] = [
  { id: "opener", dur: CLIP_LEN, el: <Opener />, cues: soft([[LINE_AT, "pop", 0.45], [STRIKE_AT, "scribble", 0.55]], 0.5) },
  // the bar scene's strike and fill already happened in the opener: drop those cues
  ...r0410ReviewScenes(T, dur).map((s) => ({ ...s, cues: soft((s.cues ?? []).filter(([f, sfx]) => !(s.id === "bar" && f === 0 && sfx !== "pop"))) })),
];

export const R0410ReviewVoice: React.FC = () => (
  <Sequence from={Math.round(VOICE_AT * FPS)} layout="none">
    <Audio src={staticFile(R0410_REVIEW_AUDIO)} />
  </Sequence>
);
