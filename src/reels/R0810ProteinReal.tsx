// Reel 2 (08/10) "Jangan Lupa Protein" with Coach Nas's footage and voice.
// Media (local only, gitignored):
//   public/clips/R0810-protein-opener.mp4   Teleprompter 05/10 18:03, src 0.00–6.55s: "Bila orang nak turun berat kan, fokus selalu
//                                           pergi dekat apa yang nak kena buang: nasi lah, gula lah, minyak lah."
//   public/voice/R0810-protein/source.mp3   TeleCue 05/10 18:05, src 0.45–19.56 + 20.62–29.55s (a repeated "ada kesihatan" cut out).
//                                           Ends with Coach's own "Tanya coach dulu macam mana" and the recorded Follow CTA.
// Voice times below are seconds in the original recording; words after the cut are shifted by CUT.
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { C } from "../theme";
import { Card, Pop } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R0810ProteinTiming, r0810ProteinScenes } from "./R0810Protein";
import { Chip } from "./formats/common";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";
import { voiceTimeline } from "./formats/voiceTimeline";

const CLIP = "clips/R0810-protein-opener.mp4";
const AUDIO = "voice/R0810-protein/source.mp3";
const CLIP_LEN = 197;
const tl = voiceTimeline({ clipLen: CLIP_LEN, clipFrom: 0, voiceFrom: 0.45 });
const CUT = 20.62 - 19.56;
const v = (src: number) => (src > 20.62 ? src - CUT : src); // original-recording time → edited-file time

const starts = { buang: CLIP_LEN, protein: tl.start(5.6), close: tl.start(16.72), end: tl.end(v(29.44), 2.2) };
const w = (scene: number, src: number) => tl.w(scene, v(src));

const T: R0810ProteinTiming = {
  buang: {
    chips: [0, 3, 6], // already shown over the clip; they settle in as the scene opens
    line2: w(starts.buang, 0.45), // "Saya juga nak tanya apa yang perlu dikekalkan"
    kekal: w(starts.buang, 4.02), // "termasuk protein yang cukup"
    hl: w(starts.buang, 4.4),
    tag: w(starts.buang, 4.9),
  },
  protein: {
    line1: w(starts.protein, 5.6), // "Protein nak membantu memenuhi keperluan tubuh"
    hl: w(starts.protein, 7.26),
    parts: [6.12, 9.52, 11.6].map((s) => w(starts.protein, s)), // (protein) · resistance exercise · overall diet
    result: w(starts.protein, 12.98), // "menyokong pemeliharaan lean mass…"
    tag: w(starts.protein, 15.62),
  },
  close: {
    line1: w(starts.close, 16.72), // "Jumlah tepat tak sama"
    line2: w(starts.close, 18.54), // "terutama kalau ada keadaan kesihatan tertentu"
    strike: w(starts.close, 23.56), // "nombor random"
    tag: w(starts.close, 24.62),
    pill: w(starts.close, 27.1), // "Follow…"
    sub: w(starts.close, 27.4),
  },
};

const BUANG_AT = tl.clipW(3.56); // "buang"
const CHIPS_AT = [4.16, 4.94, 5.74].map(tl.clipW); // nasi · gula · minyak

const Opener: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={<>TURUN BERAT: JANGAN LUPA <span style={{ color: C.marker }}>PROTEIN</span></>} hookSize={58}>
    <Pop delay={BUANG_AT}>
      <Card style={{ padding: "16px 36px", fontSize: 50, fontWeight: 800, ...OVER_VIDEO }}>
        apa nak <span style={{ color: C.marker }}>dibuang:</span>
      </Card>
    </Pop>
    <div style={{ display: "flex", justifyContent: "center", gap: 22 }}>
      {["nasi", "gula", "minyak"].map((x, i) => (
        <Chip key={x} delay={CHIPS_AT[i]} rotate={i % 2 ? 2 : -2} size={54}>
          − {x}
        </Chip>
      ))}
    </div>
  </FaceCamOpener>
);

const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, x]) => [f, s, x * k]);

export const R0810_PROTEIN_REAL_SCENES: SceneDef[] = [
  { id: "opener", dur: CLIP_LEN, el: <Opener />, cues: soft([[BUANG_AT, "pop", 0.45], ...CHIPS_AT.map((f): Cue => [f, "pop", 0.4])], 0.5) },
  ...r0810ProteinScenes(T, { buang: starts.protein - starts.buang, protein: starts.close - starts.protein, close: starts.end - starts.close }).map((s) => ({ ...s, cues: soft(s.cues ?? []) })),
];

export const R0810ProteinVoice: React.FC = () => (
  <Sequence from={tl.voiceFrame} layout="none">
    <Audio src={staticFile(AUDIO)} />
  </Sequence>
);
