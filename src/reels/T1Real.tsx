// T1 with Coach Nas's own recorded voice (VideoSnap teleprompter take, 30/09 08:49).
// The recording plays as one continuous track; scene cuts and plate steps are placed on the
// sentence starts found by Gemini transcription + pause detection (public/voice/T1-real/).
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { FPS } from "../theme";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { CTA, Extras, Hook, PlateBuild, Point, Problem } from "./T1NasiCampur";

export const T1_REAL_AUDIO = "voice/T1-real/source.mp3";

// Sentence starts in the source recording (seconds), snapped to measured pauses.
const SRC = {
  problem: 1.6, // "Dekat kedai nasi campur saya tak berdiri lama…"
  plate: 6.7, // "Saya buat tiga keputusan je."
  step1: 8.35, // "Yang pertama cari sumber protein…" (no clear pause; quiet dip at 8.33)
  step2: 11.45, // "Yang kedua tambah sayur…"
  step3: 15.45, // "And yang ketiga ambil nasi ikut portion…"
  extras: 23.35, // "Lepas tu tengok kuah, lauk bergoreng…"
  point: 33.05, // "Tujuan dia bukan nak membina plate yang perfect."
  cta: 42.8, // speech ends; "Save untuk lunch nanti" at 44.5
  end: 45.9,
};

const HOOK_LEAD = 2.4; // hook plays alone before the first word, so the stamp lands first
export const VOICE_FROM = Math.round((HOOK_LEAD - SRC.problem) * FPS); // frame the recording starts
const at = (src: number) => Math.round((src + HOOK_LEAD - SRC.problem) * FPS);
const LEAD = 6; // visuals change slightly before the words

const starts = {
  hook: 0,
  problem: at(SRC.problem) - LEAD,
  plate: at(SRC.plate) - LEAD,
  extras: at(SRC.extras) - LEAD,
  point: at(SRC.point) - LEAD,
  cta: at(SRC.cta),
  end: at(SRC.end) + 2.5 * FPS,
};

const stepAt = [SRC.step1, SRC.step2, SRC.step3].map((s) => at(s) - starts.plate - LEAD);

const soft = (cues: Cue[]): Cue[] => cues.map(([f, s, v]) => [f, s, v * 0.6]);

const plateCues = (s: number[]): Cue[] => [
  [0, "whoosh", 0.45], [8, "swipe", 0.5],
  [s[0], "whoosh", 0.4], [s[0] + 12, "pop", 0.6], [s[0] + 30, "scribble", 0.5],
  [s[1], "whoosh", 0.4], [s[1] + 12, "pop", 0.6], [s[1] + 30, "scribble", 0.5],
  [s[2] + 4, "pop", 0.5], [s[2] + 22, "tick", 0.5], [s[2] + 30, "whoosh", 0.35], [s[2] + 60, "tick", 0.5],
  [s[2] + 70, "whoosh", 0.35], [s[2] + 100, "tick", 0.55], [s[2] + 102, "swipe", 0.5],
];

const dur = (a: keyof typeof starts, b: keyof typeof starts) => starts[b] - starts[a];

export const T1_REAL_SCENES: SceneDef[] = [
  { id: "hook", dur: dur("hook", "problem"), el: <Hook />, cues: [[0, "whoosh", 0.35], [14, "stamp", 0.8], [34, "scribble", 0.6], [50, "pop", 0.4]] },
  { id: "problem", dur: dur("problem", "plate"), el: <Problem />, cues: soft([[2, "whoosh", 0.35], [24, "swipe", 0.5], [52, "tick", 0.4], [60, "tick", 0.4], [68, "tick", 0.4], [120, "swipe", 0.5]]) },
  { id: "plate", dur: dur("plate", "extras"), el: <PlateBuild stepAt={stepAt} />, cues: soft(plateCues(stepAt)) },
  { id: "extras", dur: dur("extras", "point"), el: <Extras />, cues: soft([[12, "pop", 0.5], [24, "pop", 0.5], [36, "pop", 0.5], [72, "swipe", 0.5], [100, "scribble", 0.35]]) },
  { id: "point", dur: dur("point", "cta"), el: <Point />, cues: soft([[0, "stamp", 0.55], [8, "swipe", 0.5], [12, "pop", 0.4]]) },
  { id: "cta", dur: dur("cta", "end"), el: <CTA />, cues: soft([[24, "stamp", 0.6], [36, "swipe", 0.5], [50, "pop", 0.55], [54, "chime", 0.45], [60, "scribble", 0.5]]) },
];

export const T1RealVoice: React.FC = () => (
  <Sequence from={VOICE_FROM} layout="none">
    <Audio src={staticFile(T1_REAL_AUDIO)} />
  </Sequence>
);
