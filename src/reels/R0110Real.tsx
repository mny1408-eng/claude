// Reel 1 (01/10) with Coach Nas's own recorded voice (TeleCue take, 01/10 17:48).
// public/voice/R0110-real/source.mp3 = main read (src 1.55–34.40s) + the last of the repeated CTA takes
// (src 54.90–59.37s); earlier CTA takes cut. Scene cuts sit on sentence starts found by pause detection.
import React from "react";
import { Audio, staticFile } from "remotion";
import { FPS } from "../theme";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R0110_SCENES } from "./R0110BaikJahat";

export const R0110_REAL_AUDIO = "voice/R0110-real/source.mp3";

// Sentence starts in the trimmed track (seconds), snapped to measured pauses.
const SRC = {
  labels: 4.45, // "Sebagai clinical pharmacist dan coach…"
  tengok: 11.64, // "Kita kena tengok…"
  auto: 17.51, // "Buang satu makanan…"
  tanya: 23.1, // "Lebih berguna kalau kita tanya…"
  cta: 33.01, // last CTA take
  end: 36.94, // speech ends
};

const LEAD = 6; // visuals change slightly before the words
const at = (s: number) => Math.round(s * FPS) - LEAD;

const starts: Record<string, number> = {
  hook: 0,
  labels: at(SRC.labels),
  tengok: at(SRC.tengok),
  auto: at(SRC.auto),
  tanya: at(SRC.tanya),
  cta: at(SRC.cta),
  end: Math.round((SRC.end + 1.8) * FPS),
};
const ORDER = ["hook", "labels", "tengok", "auto", "tanya", "cta", "end"];

// SFX quieter so they sit under the voice.
const soft = (cues: Cue[]): Cue[] => cues.map(([f, s, v]) => [f, s, v * 0.6]);

export const R0110_REAL_SCENES: SceneDef[] = R0110_SCENES.map((s) => {
  const next = ORDER[ORDER.indexOf(s.id) + 1];
  const dur = starts[next] - starts[s.id];
  return { ...s, dur, cues: soft((s.cues ?? []).filter(([f]) => f < dur)) };
});

export const R0110RealVoice: React.FC = () => <Audio src={staticFile(R0110_REAL_AUDIO)} />;
