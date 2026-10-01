// Reel 1 (01/10) with Coach Nas's own recorded voice (TeleCue take, 01/10 17:48).
// public/voice/R0110-real/source.mp3 = main read (src 1.55–34.40s) + the last of the repeated CTA takes
// (src 54.90–59.37s); earlier CTA takes cut. Scene cuts and every on-screen element sit on word starts
// measured in the source recording (pause + syllable mapping, 50 ms loudness envelope).
import React from "react";
import { Audio, staticFile } from "remotion";
import { FPS } from "../theme";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R0110Timing, r0110Scenes } from "./R0110BaikJahat";

export const R0110_REAL_AUDIO = "voice/R0110-real/source.mp3";

// Source recording → reel time (seconds). The CTA take is spliced in right after the main read.
const MAIN_FROM = 1.55;
const CTA_FROM = 54.9;
const CTA_AT = 34.4 - MAIN_FROM;
const reel = (src: number) => (src >= CTA_FROM ? CTA_AT + src - CTA_FROM : src - MAIN_FROM);

const LEAD = 6; // scenes change slightly before the first word
const PRE = 0.1; // elements start animating just before their word so they land on it

// Scene starts in the source recording.
const SCENE = { labels: 6.0, tengok: 13.15, auto: 19.05, tanya: 24.65, cta: 55.05, end: 59.0 };

const start = (src: number) => Math.round(reel(src) * FPS) - LEAD;
const starts = {
  hook: 0,
  labels: start(SCENE.labels),
  tengok: start(SCENE.tengok),
  auto: start(SCENE.auto),
  tanya: start(SCENE.tanya),
  cta: start(SCENE.cta),
  end: Math.round((reel(SCENE.end) + 1.8) * FPS),
};

// Frame within a scene for a word at source time `src`.
const w = (scene: number, src: number) => Math.max(0, Math.round((src - PRE - scene) * FPS) + LEAD);
const hookW = (src: number) => Math.round((reel(src) - PRE) * FPS);

const T: R0110Timing = {
  // "Saya tak suka label makanan 'baik' atau 'jahat'."
  hook: { line2: hookW(2.85), baik: hookW(3.65), atau: hookW(4.15), jahat: hookW(4.45) },
  labels: {
    line2: w(SCENE.labels, 7.35), // "saya berhati-hati bila orang cakap"
    labelA: w(SCENE.labels, 8.55), // "makanan ni baik"
    labelB: w(SCENE.labels, 9.7), // "makanan tu jahat"
    strikeA: w(SCENE.labels, 10.35),
    strikeB: w(SCENE.labels, 10.55),
    sebab: w(SCENE.labels, 10.5), // "Sebab nutrition jarang sesimple"
    satu: w(SCENE.labels, 12.1), // "satu label"
    satuHl: w(SCENE.labels, 12.2),
  },
  tengok: {
    hl: w(SCENE.tengok, 13.85), // "Kita kena tengok"
    tags: w(SCENE.tengok, 13.9),
    card: w(SCENE.tengok, 13.8),
    ticks: [14.15, 14.6, 15.25, 16.35, 17.25].map((s) => w(SCENE.tengok, s)), // amount … konteks kesihatan
  },
  auto: {
    cardA: w(SCENE.auto, 19.05), // "Buang satu makanan…"
    hlA: w(SCENE.auto, 19.75),
    cardB: w(SCENE.auto, 20.8), // "Dan makan satu makanan tertentu pun…"
    hlB: w(SCENE.auto, 22.3),
  },
  tanya: {
    line2: w(SCENE.tanya, 25.3), // "kalau kita tanya"
    hl: w(SCENE.tanya, 25.9),
    ask: [26.35, 28.25, 29.35, 30.05].map((s) => w(SCENE.tanya, s)), // peranan · kerap · banyak · structure
  },
  cta: { hl: w(SCENE.cta, 55.5), pill: w(SCENE.cta, 57.65) }, // second half of the CTA take = follow/save
};

const dur = {
  hook: starts.labels,
  labels: starts.tengok - starts.labels,
  tengok: starts.auto - starts.tengok,
  auto: starts.tanya - starts.auto,
  tanya: starts.cta - starts.tanya,
  cta: starts.end - starts.cta,
};

// SFX quieter so they sit under the voice.
const soft = (cues: Cue[]): Cue[] => cues.map(([f, s, v]) => [f, s, v * 0.6]);

export const R0110_REAL_SCENES: SceneDef[] = r0110Scenes(T, dur).map((s) => ({ ...s, cues: soft(s.cues ?? []) }));

export const R0110RealVoice: React.FC = () => <Audio src={staticFile(R0110_REAL_AUDIO)} />;
