// Reel 2 (02/10) "Kenapa Coaching?" with Coach Nas's own footage and voice.
// Media (local only, gitignored):
//   public/clips/R0210-coaching-opener.mp4    face-cam opener (Teleprompter 08:00, src 0–7.55s):
//                                             "Kalau seseorang sudah tahu protein penting… kenapa coaching masih boleh membantu?"
//   public/voice/R0210-coaching/source.mp3    TeleCue 08:02, one continuous take (src 0.80–33.27s): "Sebab knowledge and
//                                             execution…" through "So DM structure kalau awak nak tengok…"
// The opener replaces the silent cut's hook + "tahu" scenes; the rest reuses its scenes with word-start timings
// from a Whisper transcript, corrected against measured pauses.
import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile } from "remotion";
import { C, FPS } from "../theme";
import { Card, Highlight, Mark, Pop } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R0210CoachingTiming, r0210CoachingScenes } from "./R0210Coaching";

export const R0210_COACHING_CLIP = "clips/R0210-coaching-opener.mp4";
export const R0210_COACHING_AUDIO = "voice/R0210-coaching/source.mp3";

// ---- timeline ----
const CLIP_LEN = 227; // frames (7.57s)
const VOICE_AT = 7.65; // reel time where the voice track (src 0.80) starts
const reel = (src: number) => VOICE_AT + src - 0.8;

const LEAD = 6; // scenes change slightly before the first word
const PRE = 3; // elements start animating 0.1s before their word
const clipW = (src: number) => Math.max(0, Math.round(src * FPS) - PRE);

const start = (src: number) => Math.round(reel(src) * FPS) - LEAD;
const starts = {
  gap: CLIP_LEN, // "Sebab knowledge…" follows the opener directly
  barrier: start(4.85), // "Kadang-kadang barrier sebenarnya…"
  loop: start(14.27), // "Coaching bagi ruang untuk…"
  close: start(22.04), // "Bukan coach makan untuk awak…"
  end: Math.round((reel(32.92) + 1.8) * FPS),
};
const w = (sceneStart: number, src: number) => Math.max(0, Math.round(reel(src) * FPS) - PRE - sceneStart);

const T: R0210CoachingTiming = {
  gap: {
    knowledge: w(starts.gap, 1.7),
    neq: w(starts.gap, 2.1),
    execution: w(starts.gap, 2.34),
    line: w(starts.gap, 2.88), // "bukan benda yang sama"
    hl: w(starts.gap, 3.8),
  },
  barrier: {
    line2: w(starts.barrier, 5.92),
    hl: w(starts.barrier, 6.38),
    items: [7.7, 8.42, 9.7, 10.66, 11.74].map((s) => w(starts.barrier, s)), // shift · environment rumah · emotional eating · fallback plan · satu meal lari
  },
  loop: {
    steps: [15.3, 16.5, 17.28, 19.24, 20.98].map((s) => w(starts.loop, s)), // assess · bina structure · cuba real life · review · adjust
    tags: w(starts.loop, 21.4),
  },
  close: {
    strike: w(starts.close, 22.68), // "makan untuk awak"
    line2: w(starts.close, 24.16), // "Tapi kita kurangkan"
    hl: w(starts.close, 25.3), // "trial and error"
    line3: w(starts.close, 26.28), // "and buat plan lebih spesifik…"
    pill: w(starts.close, 29.8), // "DM structure"
    sub: w(starts.close, 30.38), // "kalau awak nak tengok…"
  },
};

// ---- opener: face-cam with the hook on top, the three "penting" items ticked as they are said ----
const KNOWN = [
  { text: "protein penting", at: clipW(1.38) },
  { text: "sayur penting", at: clipW(2.68) },
  { text: "portion penting", at: clipW(3.52) },
];
const COACHING_AT = clipW(5.38);

const Opener: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(R0210_COACHING_CLIP)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(247,245,237,0.9) 0%, rgba(247,245,237,0) 36%)" }} />
    <div style={{ position: "absolute", top: 220, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 960, padding: "34px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.18, color: C.ink }}>
          DAH TAHU APA NAK MAKAN.
          <br />
          KENAPA MASIH PERLU <Highlight delay={COACHING_AT}>COACHING?</Highlight>
        </div>
      </Card>
    </div>
    <div style={{ position: "absolute", top: 1180, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      {KNOWN.map((k, i) => (
        <Pop key={k.text} delay={k.at} rotate={i % 2 ? 1.5 : -1.5}>
          <Card style={{ display: "flex", alignItems: "center", gap: 22, padding: "20px 40px", boxShadow: "0 8px 22px rgba(20,30,20,0.25)" }}>
            <Mark kind="check" delay={k.at + 6} size={46} />
            <span style={{ fontSize: 52, fontWeight: 800, whiteSpace: "nowrap" }}>{k.text}</span>
          </Card>
        </Pop>
      ))}
    </div>
  </AbsoluteFill>
);

// ---- assembly ----
const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, v]) => [f, s, v * k]);

const dur = {
  gap: starts.barrier - starts.gap,
  barrier: starts.loop - starts.barrier,
  loop: starts.close - starts.loop,
  close: starts.end - starts.close,
};

export const R0210_COACHING_REAL_SCENES: SceneDef[] = [
  {
    id: "opener",
    dur: CLIP_LEN,
    el: <Opener />,
    cues: soft([...KNOWN.flatMap((k): Cue[] => [[k.at, "pop", 0.45], [k.at + 6, "tick", 0.5]]), [COACHING_AT, "swipe", 0.45]], 0.5),
  },
  ...r0210CoachingScenes(T, dur).map((s) => ({ ...s, cues: soft(s.cues ?? []) })),
];

export const R0210CoachingVoice: React.FC = () => (
  <Sequence from={Math.round(VOICE_AT * FPS)} layout="none">
    <Audio src={staticFile(R0210_COACHING_AUDIO)} />
  </Sequence>
);
