// Reel 2 (06/10) "Satu Backup dalam Bag" with Coach Nas's footage and voice.
// Media (local only, gitignored):
//   public/clips/R0610-backup-opener.mp4   FluentCue export, src 1.60–8.00s: "Kalau awak selalu sampai tahap terlalu lapar masa
//                                          kerja, jangan tunggu krisis baru decide nak makan apa." (720p upscaled)
//   public/voice/R0610-backup/source.mp3   TeleCue 04/10 18:43, src 0.75–22.00s: "Letaklah satu backup dalam bag…" through
//                                          "…masa dah terlalu lapar." CTA not recorded: on screen only.
// The opener replaces the silent cut's "krisis" scene (its hunger meter now runs over the clip).
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Pop } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { Meter, R0610Timing, R0610_SILENT, r0610Scenes } from "./R0610Backup";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";
import { Tag } from "./formats/common";
import { voiceTimeline } from "./formats/voiceTimeline";

const CLIP = "clips/R0610-backup-opener.mp4";
const AUDIO = "voice/R0610-backup/source.mp3";
const CLIP_LEN = 192;
const tl = voiceTimeline({ clipLen: CLIP_LEN, clipFrom: 1.6, voiceFrom: 0.75 });

const starts = { bag: CLIP_LEN, close: tl.start(14.6), end: tl.end(21.88) };
const w = tl.w;

const T: R0610Timing = {
  krisis: R0610_SILENT.krisis, // replaced by the opener
  bag: {
    line1: w(starts.bag, 0.89), // "Letaklah satu backup dalam bag."
    items: [4.28, 5.44, 7.14, 8.1, 8.66].map((s) => w(starts.bag, s)), // buah · yogurt · telur rebus · susu · kekacang
    last: w(starts.bag, 10.52), // "atau pun apa-apa pilihan…"
    tag: w(starts.bag, 12.5),
  },
  close: {
    strike: w(starts.close, 15.1), // "wajib makan"
    line2: w(starts.close, 17.08), // "dia cuma kurangkan chance…"
    hl: w(starts.close, 20.78), // "terlalu lapar"
    tag: w(starts.close, 21.4),
    pill: w(starts.close, 22.2), // on-screen CTA after the last word
  },
};

const M = { from: tl.clipW(3.16), to: tl.clipW(3.9), label: tl.clipW(3.56) }; // "terlalu lapar"
const KRISIS_AT = tl.clipW(4.7); // "jangan tunggu krisis…"
const HL_AT = tl.clipW(5.22);
const TAG_AT = tl.clipW(6.6);

const Opener: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={<><span style={{ color: C.marker }}>SATU BACKUP</span> DALAM BAG</>} hookSize={64} lowerTop={1120}>
    <Pop delay={2}>
      <Meter from={M.from} to={M.to} label={M.label} />
    </Pop>
    <Pop delay={KRISIS_AT}>
      <Card style={{ padding: "18px 34px", ...OVER_VIDEO }}>
        <Line size={54} weight={800}>
          jangan tunggu <Highlight delay={HL_AT}>krisis</Highlight>
        </Line>
      </Card>
    </Pop>
    <Tag delay={TAG_AT}>Plan before hungry</Tag>
  </FaceCamOpener>
);

const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, v]) => [f, s, v * k]);

export const R0610_REAL_SCENES: SceneDef[] = [
  { id: "opener", dur: CLIP_LEN, el: <Opener />, cues: soft([[2, "pop", 0.4], [M.from, "whoosh", 0.35], [HL_AT, "swipe", 0.45], [TAG_AT, "pop", 0.4]], 0.5) },
  ...r0610Scenes(T, { krisis: 0, bag: starts.close - starts.bag, close: starts.end - starts.close })
    .filter((s) => s.id !== "krisis")
    .map((s) => ({ ...s, cues: soft(s.cues ?? []) })),
];

export const R0610Voice: React.FC = () => (
  <Sequence from={tl.voiceFrame} layout="none">
    <Audio src={staticFile(AUDIO)} />
  </Sequence>
);
