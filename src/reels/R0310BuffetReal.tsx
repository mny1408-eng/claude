// Reel 2 (03/10) "Buffet" with Coach Nas's own footage and voice.
// Media (local only, gitignored):
//   public/clips/R0310-buffet-opener.mp4   face-cam opener (Teleprompter 13:12, src 3.70–9.27s; the 3.5s of
//                                          silence before the first word is cut): "Buffet bukan ujian disiplin…plan yang simple."
//   public/voice/R0310-buffet/source.mp3   TeleCue 13:14, one continuous take (src 1.55–33.10s): "So dekat buffet, pusing
//                                          dulu…" through "Save sebelum buffet." (a trailing "korang" is cut).
// The opener replaces the silent cut's hook + "plan" scenes; the receipt and goal scenes reuse the silent design with
// word-start timings from a Whisper transcript, corrected against measured pauses.
import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile } from "remotion";
import { C, FPS } from "../theme";
import { Card, Highlight, Mark, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R0310BuffetTiming, r0310BuffetScenes } from "./R0310Buffet";

export const R0310_BUFFET_CLIP = "clips/R0310-buffet-opener.mp4";
export const R0310_BUFFET_AUDIO = "voice/R0310-buffet/source.mp3";

// ---- timeline ----
const CLIP_FROM = 3.7; // clip source time at reel 0
const CLIP_LEN = 167; // frames (5.57s)
const VOICE_AT = 5.6; // reel time where the voice track (src 1.55) starts
const reel = (src: number) => VOICE_AT + src - 1.55;

const LEAD = 6;
const PRE = 3;
const clipW = (src: number) => Math.max(0, Math.round((src - CLIP_FROM) * FPS) - PRE);

const starts = {
  receipt: CLIP_LEN, // "So dekat buffet…" follows the opener directly
  goal: Math.round(reel(23.95) * FPS) - LEAD, // "Goal bukan keluar daripada buffet lapar."
  end: Math.round((reel(33.04) + 1.8) * FPS),
};
const w = (sceneStart: number, src: number) => Math.max(0, Math.round(reel(src) * FPS) - PRE - sceneStart);

const T: R0310BuffetTiming = {
  receipt: {
    // pusing dulu · pilih makanan · bina plate · makan perlahan · pause dulu · dessert
    items: [2.22, 4.8, 10.26, 14.91, 16.26, 19.92].map((s) => w(starts.receipt, s)),
    // ticked as each step's sentence ends
    checks: [4.36, 9.8, 14.04, 15.38, 18.96, 23.08].map((s) => w(starts.receipt, s)),
  },
  goal: {
    line2: w(starts.goal, 26.58), // "Goal dia enjoy tanpa mindset"
    hl: w(starts.goal, 26.96),
    line3: w(starts.goal, 28.08), // "hari ini dah cheat, so belasah je"
    strike: w(starts.goal, 29.72),
    pill: w(starts.goal, 31.04), // "Save sebelum buffet."
  },
};

// ---- opener: face-cam with the hook on top ----
const STRIKE_AT = clipW(4.36); // "bukan ujian disiplin"
const LINE1_AT = clipW(3.91);
const LINE2_AT = clipW(7.4); // "plan yang lebih simple"
const HL_AT = clipW(4.64);

const Opener: React.FC = () => (
  <AbsoluteFill>
    <OffthreadVideo src={staticFile(R0310_BUFFET_CLIP)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(247,245,237,0.9) 0%, rgba(247,245,237,0) 36%)" }} />
    <div style={{ position: "absolute", top: 220, left: 60, right: 60, display: "flex", justifyContent: "center" }}>
      <Card style={{ width: 960, padding: "34px 40px", textAlign: "center" }}>
        <div style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.25, color: C.ink }}>
          <span style={{ color: C.marker, fontSize: 60 }}>BUFFET?</span>
          <br />
          SAYA TAK MASUK DENGAN MISI
          <br />
          <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
            “MAKAN PUAS SEBAB DAH BAYAR”.
            <Strike delay={STRIKE_AT} width={6} />
          </span>
        </div>
      </Card>
    </div>
    <div style={{ position: "absolute", top: 1200, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      <Pop delay={LINE1_AT} rotate={-1.5}>
        <Card style={{ padding: "22px 40px", fontSize: 54, fontWeight: 800, whiteSpace: "nowrap", boxShadow: "0 8px 22px rgba(20,30,20,0.25)" }}>
          Buffet bukan <Highlight delay={HL_AT}>ujian disiplin.</Highlight>
        </Card>
      </Pop>
      <Pop delay={LINE2_AT} rotate={1.5}>
        <Card style={{ display: "flex", alignItems: "center", gap: 22, padding: "22px 40px", boxShadow: "0 8px 22px rgba(20,30,20,0.25)" }}>
          <Mark kind="check" delay={LINE2_AT + 6} size={46} />
          <span style={{ fontSize: 50, fontWeight: 800, whiteSpace: "nowrap" }}>plan yang simple</span>
        </Card>
      </Pop>
    </div>
  </AbsoluteFill>
);

// ---- assembly ----
const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, v]) => [f, s, v * k]);

export const R0310_BUFFET_REAL_SCENES: SceneDef[] = [
  {
    id: "opener",
    dur: CLIP_LEN,
    el: <Opener />,
    cues: soft([[STRIKE_AT, "scribble", 0.5], [LINE1_AT, "pop", 0.45], [HL_AT, "swipe", 0.4], [LINE2_AT, "pop", 0.45], [LINE2_AT + 6, "tick", 0.5]], 0.5),
  },
  ...r0310BuffetScenes(T, { receipt: starts.goal - starts.receipt, goal: starts.end - starts.goal }).map((s) => ({ ...s, cues: soft(s.cues ?? []) })),
];

export const R0310BuffetVoice: React.FC = () => (
  <Sequence from={Math.round(VOICE_AT * FPS)} layout="none">
    <Audio src={staticFile(R0310_BUFFET_AUDIO)} />
  </Sequence>
);
