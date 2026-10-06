// Reel 2 (09/10) "Dah Tahu… Tapi Susah Buat?" with Coach Nas's footage and voice.
// Media (local only, gitignored):
//   public/clips/R0910-tahu-opener.mp4   Teleprompter 06/10 08:05, src 0.00–9.60s: "Kalau awak dah tahu protein, portion, sayur,
//                                        exercise, tapi minggu busy terus semua benda tu hilang, mungkin tambah lagi tips bukan
//                                        langkah pertama." It carries the whole "tahu" scene, so that scene is filtered out.
//   public/voice/R0910-tahu/source.mp3   TeleCue 06/10 08:05, src 0.00–3.95 + 4.70–25.15s (a 1s pause after "environment" tightened).
//                                        Ends with the recorded CTA "Click link dekat bio."
// Voice times below are seconds in the original recording; words after the cut are shifted by CUT.
import React from "react";
import { Audio, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Pop } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { Known, R0910TahuTiming, R0910_TAHU_SILENT, r0910TahuScenes } from "./R0910TahuBuat";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";
import { voiceTimeline } from "./formats/voiceTimeline";

const CLIP = "clips/R0910-tahu-opener.mp4";
const AUDIO = "voice/R0910-tahu/source.mp3";
const CLIP_LEN = 288;
const tl = voiceTimeline({ clipLen: CLIP_LEN, clipFrom: 0, voiceFrom: 0 });
const CUT = { at: 4.7, len: 4.7 - 3.95 };
const v = (src: number) => (src >= CUT.at ? src - CUT.len : src); // original-recording time → edited-file time

const starts = { barrier: CLIP_LEN, close: tl.start(v(14.68)), end: tl.end(v(25.04), 2.2) };
const w = (scene: number, src: number) => tl.w(scene, v(src));

const T: R0910TahuTiming = {
  tahu: R0910_TAHU_SILENT.tahu, // carried by the opener
  barrier: {
    line1: w(starts.barrier, 0.86), // "Cuba tengok barrier awak"
    cards: [2.32, 3.24, 5.06, 6.2].map((s) => w(starts.barrier, s)), // timing · environment · tak ada fallback · satu meal lari…
    line2: w(starts.barrier, 10.6), // "Bila kita dapat tahu barrier, barulah strategi boleh jadi lebih spesifik"
    tag: w(starts.barrier, 13.56),
  },
  close: {
    line1: w(starts.close, 14.68), // "Kalau awak tak sure barrier awak dekat mana"
    card: w(starts.close, 17.12), // "Progress Scorecard dekat bio"
    note: w(starts.close, 21.64), // "bukan diagnosis, cuma starting point"
    pill: w(starts.close, 24.22), // "Click link dekat bio"
  },
};

const KNOWN = [
  { label: "protein", at: 1.3 },
  { label: "portion", at: 2.02 },
  { label: "sayur", at: 2.88 },
  { label: "exercise", at: 3.18 },
].map((k) => ({ ...k, at: tl.clipW(k.at) }));
const BUSY_AT = tl.clipW(4.3); // "minggu busy… semua benda tu hilang"
const TIPS_AT = tl.clipW(6.88); // "mungkin tambah lagi tips bukan langkah pertama"
const HL_AT = tl.clipW(7.78);

const Opener: React.FC = () => {
  const f = useCurrentFrame();
  const gone = interpolate(f, [BUSY_AT + 30, BUSY_AT + 50], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <FaceCamOpener clip={CLIP} hook={<>DAH TAHU… TAPI <span style={{ color: C.marker }}>SUSAH BUAT?</span></>} hookSize={60} lowerTop={1140}>
      {f < TIPS_AT ? (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, width: 860, opacity: gone > 0 ? 1 : 0 }}>
          {KNOWN.map((k, i) => (
            <Known key={k.label} label={k.label} at={k.at} busy={BUSY_AT + 6} i={i} />
          ))}
        </div>
      ) : (
        <Pop delay={TIPS_AT}>
          <Card style={{ padding: "24px 40px", textAlign: "center", ...OVER_VIDEO }}>
            <div style={{ fontSize: 44, fontWeight: 700 }}>mungkin tambah lagi tips</div>
            <div style={{ fontSize: 56, fontWeight: 800 }}>
              <Highlight delay={HL_AT}>bukan langkah pertama.</Highlight>
            </div>
          </Card>
        </Pop>
      )}
    </FaceCamOpener>
  );
};

const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([fr, s, x]) => [fr, s, x * k]);

export const R0910_TAHU_REAL_SCENES: SceneDef[] = [
  { id: "opener", dur: CLIP_LEN, el: <Opener />, cues: soft([...KNOWN.map((k): Cue => [k.at + 6, "tick", 0.45]), [BUSY_AT + 6, "whoosh", 0.4], [TIPS_AT, "pop", 0.45], [HL_AT, "swipe", 0.4]], 0.5) },
  ...r0910TahuScenes(T, { tahu: 0, barrier: starts.close - starts.barrier, close: starts.end - starts.close })
    .filter((s) => s.id !== "tahu")
    .map((s) => ({ ...s, cues: soft(s.cues ?? []) })),
];

export const R0910TahuVoice: React.FC = () => (
  <Sequence from={tl.voiceFrame} layout="none">
    <Audio src={staticFile(AUDIO)} />
  </Sequence>
);
