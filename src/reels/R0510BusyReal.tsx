// Reel 2 (05/10) "Breakfast Orang Busy" with Coach Nas's footage and voice.
// Media (local only, gitignored):
//   public/clips/R0510-busy-opener.mp4   FluentCue export, src 0.70–6.40s: "Kalau pagi-pagi memang kelam-kabut, saya tak cuba
//                                        bina breakfast yang paling perfect" (720p source upscaled to 1080×1920)
//   public/voice/R0510-busy/source.mp3   TeleCue 04/10 18:41, src 0.85–22.60s: "Saya check tiga benda…" through "…tak sempat
//                                        nak buat." The CTA was not recorded, so it is on screen only, after the voice ends.
// Timings are word starts from a Whisper transcript, corrected against measured pauses.
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { C } from "../theme";
import { Card, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R0510BusyTiming, r0510BusyScenes } from "./R0510Busy";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";
import { voiceTimeline } from "./formats/voiceTimeline";

const CLIP = "clips/R0510-busy-opener.mp4";
const AUDIO = "voice/R0510-busy/source.mp3";
const CLIP_LEN = 171;
const tl = voiceTimeline({ clipLen: CLIP_LEN, clipFrom: 0.7, voiceFrom: 0.85 });

const starts = { three: CLIP_LEN, combos: tl.start(11.3), close: tl.start(16.26), end: tl.end(22.35) };
const w = tl.w;

const T: R0510BusyTiming = {
  three: {
    items: [2.28, 4.42, 8.59].map((s) => w(starts.three, s)), // satu · dua · yang ketiga
    checks: [3.34, 7.6, 10.48].map((s) => w(starts.three, s)),
  },
  combos: { cards: [11.3, 13.72].map((s) => w(starts.combos, s)), checks: [13.0, 15.44].map((s) => w(starts.combos, s)) }, // telur roti buah · oat susu yogurt
  close: {
    line2: w(starts.close, 17.14), // "breakfast yang simple tapi repeatable"
    hl: w(starts.close, 18.26),
    line3: w(starts.close, 19.04), // "lebih berguna daripada plan cantik…"
    underline: w(starts.close, 21.38),
    tags: w(starts.close, 22.0),
    pill: w(starts.close, 22.6), // on-screen CTA after the last word
    sub: w(starts.close, 22.9),
  },
};

const LINE_AT = tl.clipW(2.9); // "saya tak cuba bina breakfast…"
const STRIKE_AT = tl.clipW(5.68); // "…paling perfect"

const Opener: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={<>BREAKFAST BUSY: <span style={{ color: C.marker }}>3 BENDA JE</span></>} hookSize={58}>
    <Pop delay={LINE_AT} rotate={-1.5}>
      <Card style={{ padding: "24px 44px", textAlign: "center", ...OVER_VIDEO }}>
        <div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.2 }}>saya tak cuba bina breakfast</div>
        <span style={{ position: "relative", display: "inline-block", fontSize: 62, fontWeight: 800 }}>
          paling cantik.
          <Strike delay={STRIKE_AT} width={6} />
        </span>
      </Card>
    </Pop>
  </FaceCamOpener>
);

const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, v]) => [f, s, v * k]);

export const R0510_BUSY_REAL_SCENES: SceneDef[] = [
  { id: "opener", dur: CLIP_LEN, el: <Opener />, cues: soft([[LINE_AT, "pop", 0.45], [STRIKE_AT, "scribble", 0.55]], 0.5) },
  ...r0510BusyScenes(T, { three: starts.combos - starts.three, combos: starts.close - starts.combos, close: starts.end - starts.close }).map((s) => ({ ...s, cues: soft(s.cues ?? []) })),
];

export const R0510BusyVoice: React.FC = () => (
  <Sequence from={tl.voiceFrame} layout="none">
    <Audio src={staticFile(AUDIO)} />
  </Sequence>
);
