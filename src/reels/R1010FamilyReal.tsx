// Reel 2 (10/10) "Family Makan Luar" with Coach Nas's footage and voice.
// Media (local only, gitignored):
//   public/clips/R1010-family-opener.mp4   Teleprompter 06/10 17:46, src 1.40–9.10s: "Bila family ajak makan luar, saya tak nak satu
//                                          plan yang buat kita rasa kena pilih antara progress dengan family."
//   public/voice/R1010-family/source.mp3   TeleCue 06/10 20:37, src 0.50–28.00s: "Saya pilih beberapa keputusan…" through the
//                                          recorded CTA "Share dengan pasangan ataupun family yang selalu makan luar sama-sama."
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { C } from "../theme";
import { Card, Pop } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R1010FamilyTiming, r1010FamilyScenes } from "./R1010Family";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";
import { voiceTimeline } from "./formats/voiceTimeline";

const CLIP = "clips/R1010-family-opener.mp4";
const AUDIO = "voice/R1010-family/source.mp3";
const CLIP_LEN = 231;
const tl = voiceTimeline({ clipLen: CLIP_LEN, clipFrom: 1.4, voiceFrom: 0.5 });

const starts = { vs: CLIP_LEN, pilih: tl.start(3.4), close: tl.start(15.42), end: tl.end(27.8, 2.2) };
const w = tl.w;

const T: R1010FamilyTiming = {
  vs: {
    cards: 0, // already shown over the clip
    strike: w(starts.vs, 0.88), // "Saya pilih…" — "vs" becomes "&"
    and: w(starts.vs, 1.16),
    line2: w(starts.vs, 1.16), // "beberapa keputusan yang masih boleh dikawal"
    tag: w(starts.vs, 2.78),
  },
  pilih: { cards: [3.4, 8.66, 11.06, 12.76].map((s) => w(starts.pilih, s)) }, // hunger · enjoy · protein · minuman
  close: {
    line1: w(starts.close, 15.42), // "Lepas makan, tak perlu compensate ataupun rasa kena tebus"
    strike: w(starts.close, 16.4),
    next: w(starts.close, 19.04), // "Next meal sambung je rutin macam biasa"
    line3: w(starts.close, 21.8), // "Sustainable plan kena boleh hidup sekali dengan family"
    tags: w(starts.close, 23.72),
    pill: w(starts.close, 24.76), // "Share dengan pasangan ataupun family…"
  },
};

const PROGRESS_AT = tl.clipW(7.5); // "progress"
const FAMILY_AT = tl.clipW(8.44); // "family"

const Opener: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={<>FAMILY NAK <span style={{ color: C.marker }}>MAKAN LUAR.</span> DIET MACAM MANA?</>} hookSize={56}>
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <Pop delay={PROGRESS_AT} rotate={-2}>
        <Card style={{ padding: "24px 38px", fontSize: 54, fontWeight: 800, ...OVER_VIDEO }}>progress</Card>
      </Pop>
      <Pop delay={PROGRESS_AT + 8}>
        <span style={{ fontSize: 56, fontWeight: 800, color: C.paper, textShadow: "0 2px 10px rgba(0,0,0,0.5)" }}>vs</span>
      </Pop>
      <Pop delay={FAMILY_AT} rotate={2}>
        <Card style={{ padding: "24px 38px", fontSize: 54, fontWeight: 800, ...OVER_VIDEO }}>family</Card>
      </Pop>
    </div>
  </FaceCamOpener>
);

const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, x]) => [f, s, x * k]);

export const R1010_FAMILY_REAL_SCENES: SceneDef[] = [
  { id: "opener", dur: CLIP_LEN, el: <Opener />, cues: soft([[PROGRESS_AT, "pop", 0.45], [FAMILY_AT, "pop", 0.45]], 0.5) },
  ...r1010FamilyScenes(T, { vs: starts.pilih - starts.vs, pilih: starts.close - starts.pilih, close: starts.end - starts.close }).map((s) => ({ ...s, cues: soft(s.cues ?? []) })),
];

export const R1010FamilyVoice: React.FC = () => (
  <Sequence from={tl.voiceFrame} layout="none">
    <Audio src={staticFile(AUDIO)} />
  </Sequence>
);
