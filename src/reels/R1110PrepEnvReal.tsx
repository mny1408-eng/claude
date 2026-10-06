// Reel 2 (11/10) "Prep Environment" with Coach Nas's footage and voice.
// Media (local only, gitignored):
//   public/clips/R1110-prep-opener.mp4   Teleprompter 06/10 20:40, src 2.00–8.90s: "Kalau setiap minggu kita harap motivasi datang
//                                        tepat pada masanya, decision fatigue memang cepat menang."
//   public/voice/R1110-prep/source.mp3   TeleCue 06/10 20:38, src 0.80–26.30s: "Ahad ni cuba prep environment…" through the
//                                        recorded CTA "Save dan prep satu benda malam ni."
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { C } from "../theme";
import { Pop } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R1110PrepTiming, r1110PrepScenes } from "./R1110PrepEnv";
import { BoxStamp } from "./formats/common";
import { FaceCamOpener } from "./formats/FaceCamOpener";
import { voiceTimeline } from "./formats/voiceTimeline";

const CLIP = "clips/R1110-prep-opener.mp4";
const AUDIO = "voice/R1110-prep/source.mp3";
const CLIP_LEN = 207;
const tl = voiceTimeline({ clipLen: CLIP_LEN, clipFrom: 2.0, voiceFrom: 0.8 });

const starts = { fatigue: CLIP_LEN, prep: tl.start(4.56), close: tl.start(16.72), end: tl.end(26.02, 2.2) };
const w = tl.w;

const T: R1110PrepTiming = {
  fatigue: {
    stamp: 0, // already stamped over the clip
    line2: w(starts.fatigue, 0.8), // "Ahad ni cuba prep environment, bukan overhaul semuanya"
    strike: w(starts.fatigue, 3.28),
    tag: w(starts.fatigue, 3.88),
  },
  prep: { cards: [4.56, 8.38, 12.04].map((s) => w(starts.prep, s)) }, // protein option · buah/snack · hari paling padat
  close: {
    strike: w(starts.close, 17.26), // "Kita bukan cuba control satu minggu penuh"
    line2: w(starts.close, 18.74), // "kita cuma kurangkan beberapa decision…"
    chips: [22.06, 22.62, 23.2].map((s) => w(starts.close, s)), // lapar · penat · rushing
    pill: w(starts.close, 24.36), // "Save dan prep satu benda malam ni"
    sub: w(starts.close, 25.58),
  },
};

const STAMP_AT = tl.clipW(6.3); // "decision fatigue memang cepat menang"

const Opener: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={<>NAK MINGGU DEPAN LEBIH SENANG? <span style={{ color: C.marker }}>PREP ENVIRONMENT.</span></>} hookSize={54} lowerTop={1240}>
    <Pop delay={STAMP_AT}>
      <div style={{ background: "rgba(247,245,237,0.92)", borderRadius: 18, padding: "6px 10px" }}>
        <BoxStamp delay={STAMP_AT} rotate={-4} size={64}>
          DECISION FATIGUE
          <br />
          CEPAT MENANG
        </BoxStamp>
      </div>
    </Pop>
  </FaceCamOpener>
);

const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, x]) => [f, s, x * k]);

export const R1110_PREP_REAL_SCENES: SceneDef[] = [
  { id: "opener", dur: CLIP_LEN, el: <Opener />, cues: soft([[STAMP_AT, "stamp", 0.7]], 0.5) },
  ...r1110PrepScenes(T, { fatigue: starts.prep - starts.fatigue, prep: starts.close - starts.prep, close: starts.end - starts.close }).map((s) => ({ ...s, cues: soft(s.cues ?? []) })),
];

export const R1110PrepVoice: React.FC = () => (
  <Sequence from={tl.voiceFrame} layout="none">
    <Audio src={staticFile(AUDIO)} />
  </Sequence>
);
