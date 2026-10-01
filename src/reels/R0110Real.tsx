// Reel 1 (01/10) with Coach Nas's own recorded voice (TeleCue take, 01/10 17:48).
// public/voice/R0110-real/source.mp3 = full read (src 1.55–39.80s) + 0.55s pause + the last, complete CTA take
// "Follow untuk lebih banyak info." (src 57.45–59.37s); the three earlier CTA takes are cut.
// The recording has no spoken hook, so the hook plays alone (as in the silent cut) before the voice comes in.
// Element timings are word starts from a Whisper transcript (word timestamps), checked against measured pauses.
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { FPS } from "../theme";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R0110Timing, R0110_SILENT, r0110Scenes } from "./R0110BaikJahat";

export const R0110_REAL_AUDIO = "voice/R0110-real/source.mp3";

// Source recording → reel time (seconds).
const VOICE_AT = 2.4; // reel time where the track (src 1.55) starts: hook stamps land first
const MAIN_FROM = 1.55;
const CTA_FROM = 57.45;
const CTA_AT = VOICE_AT + (39.8 - MAIN_FROM) + 0.55;
const reel = (src: number) => (src >= CTA_FROM ? CTA_AT + src - CTA_FROM : VOICE_AT + src - MAIN_FROM);

const LEAD = 6; // scenes change slightly before the first word
const PRE = 0.1; // elements start animating just before their word so they land on it

// First word of each scene in the source recording.
const SCENE = {
  labels: 1.75, // "As a clinical pharmacist dan coach…"
  tengok: 13.15, // "Kita kena tengok…"
  auto: 20.84, // "Buang satu makanan…"
  tanya: 29.36, // "Lebih bermakna kalau kita tanya…"
};
const CTA_START = reel(39.75); // just after "…membantu goal saya."
const CTA_END = reel(59.0) + 1.8;

const start = (src: number) => Math.round(reel(src) * FPS) - LEAD;
const starts = {
  labels: start(SCENE.labels),
  tengok: start(SCENE.tengok),
  auto: start(SCENE.auto),
  tanya: start(SCENE.tanya),
  cta: Math.round(CTA_START * FPS),
  end: Math.round(CTA_END * FPS),
};

// Frame within a scene for a word at source time `src`.
const w = (sceneStart: number, src: number) => Math.max(0, Math.round((reel(src) - PRE) * FPS) - sceneStart);

const T: R0110Timing = {
  hook: R0110_SILENT.hook, // not spoken: same timing as the silent cut
  labels: {
    line2: w(starts.labels, 3.7), // "saya berhati-hati bila orang cakap"
    labelA: w(starts.labels, 5.45), // "makanan ini baik"
    labelB: w(starts.labels, 6.94), // "makanan itu tak elok"
    strikeA: w(starts.labels, 7.96), // "sebab"
    strikeB: w(starts.labels, 8.15),
    sebab: w(starts.labels, 8.52), // "nutrisi ini jarang sesimple itu"
    satu: w(starts.labels, 11.3), // "untuk sesuatu label"
    satuHl: w(starts.labels, 12.06),
  },
  tengok: {
    hl: w(starts.tengok, 13.38),
    tags: w(starts.tengok, 13.4),
    card: w(starts.tengok, 13.3),
    ticks: [13.64, 14.38, 15.22, 16.4, 17.78].map((s) => w(starts.tengok, s)), // amount · frekuensi · keseluruhan diet · tujuan individu · konteks kesihatan
  },
  auto: {
    cardA: w(starts.auto, 20.84),
    hlA: w(starts.auto, 21.6), // "tak otomatik"
    cardB: w(starts.auto, 24.6), // "dan makan satu makanan tertentu pun"
    hlB: w(starts.auto, 26.44), // "bukan otomatik"
  },
  tanya: {
    line2: w(starts.tanya, 30.66), // "kalau kita tanya"
    hl: w(starts.tanya, 31.06),
    ask: [31.36, 34.5, 35.46, 35.94].map((s) => w(starts.tanya, s)), // apa peranan · berapa kerap · berapa banyak · dan adakah struktur
  },
  cta: { hl: 12, pill: w(starts.cta, 57.65) }, // "Follow untuk lebih banyak info."
};

const dur = {
  hook: starts.labels,
  labels: starts.tengok - starts.labels,
  tengok: starts.auto - starts.tengok,
  auto: starts.tanya - starts.auto,
  tanya: starts.cta - starts.tanya,
  cta: starts.end - starts.cta,
};

// SFX quieter so they sit under the voice; the hook has no voice, so it keeps full SFX.
const soft = (cues: Cue[]): Cue[] => cues.map(([f, s, v]) => [f, s, v * 0.6]);

export const R0110_REAL_SCENES: SceneDef[] = r0110Scenes(T, dur).map((s) => (s.id === "hook" ? s : { ...s, cues: soft(s.cues ?? []) }));

export const R0110RealVoice: React.FC = () => (
  <Sequence from={Math.round(VOICE_AT * FPS)} layout="none">
    <Audio src={staticFile(R0110_REAL_AUDIO)} />
  </Sequence>
);
