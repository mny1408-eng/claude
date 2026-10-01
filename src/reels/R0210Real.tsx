// Reel 1 (02/10) with Coach Nas's own recorded voice (TeleCue take, 01/10 18:42), one continuous take.
// public/voice/R0210-real/source.mp3 = src 0.80–43.49s. The hook is not spoken on its own, so it plays alone
// (as in the silent cut) before the voice comes in. Timings are word starts from a Whisper transcript,
// with sentence starts corrected against the measured loudness envelope.
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { FPS } from "../theme";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R0210Timing, R0210_SILENT, r0210Scenes } from "./R0210DietKeras";

export const R0210_REAL_AUDIO = "voice/R0210-real/source.mp3";

const FILE_FROM = 0.8; // source time where the track file starts
const SPEECH_AT = 2.2; // reel time of the first word: hook lands first
const FIRST_WORD = 0.96;
const reel = (src: number) => SPEECH_AT + src - FIRST_WORD;

const LEAD = 6; // captions change slightly before the first word
const PRE = 0.1; // highlights start just before their word so they land on it

// First word of each caption in the source recording.
const SCENE: Record<string, number> = {
  yoyo: 0.96, // "Dulu kan saya ingat…"
  restart: 6.65, // "Saya dah lama melalui cycle…"
  tahan: 12.5, // "Masalahnya plan yang terlalu bergantung…"
  berubah: 21.05, // "Yang berubah untuk saya…"
  structure: 25.0, // "Saya mula lebih menghargai struktur…"
  reallife: 28.25, // "Termasuk bila kita kerja busy…"
  perfect: 33.0, // "Sebab plan yang hanya menjadi…"
  cta: 39.85, // "Comment pernah…"
};
const ORDER = ["hook", ...Object.keys(SCENE), "end"];
const starts: Record<string, number> = {
  hook: 0,
  ...Object.fromEntries(Object.entries(SCENE).map(([id, s]) => [id, Math.round(reel(s) * FPS) - LEAD])),
  end: Math.round((reel(43.2) + 1.5) * FPS),
};

// Frame within scene `id` for a word at source time `src`.
const w = (id: string, src: number) => Math.max(0, Math.round((reel(src) - PRE) * FPS) - starts[id]);

const T: R0210Timing = {
  hook: R0210_SILENT.hook, // not spoken: same timing as the silent cut
  hl: {
    yoyo: [w("yoyo", 4.96)], // "lagi hardcore"
    restart: [w("restart", 9.94), w("restart", 11.9)], // "turun naik" · "start balik"
    tahan: [w("tahan", 15.06)], // "aku kena tahan"
    structure: [w("structure", 26.32)], // "struktur"
    perfect: [w("perfect", 35.88)], // "bukan plan"
  },
  cta: { comment: w("cta", 39.85), stamp: w("cta", 40.2), relate: w("cta", 40.6) }, // "Comment" · "pernah" · "kalau awak pun sama…"
};

const dur = Object.fromEntries(ORDER.slice(0, -1).map((id, i) => [id, starts[ORDER[i + 1]] - starts[id]]));

// SFX quieter so they sit under the voice; the hook has no voice, so it keeps full SFX.
const soft = (cues: Cue[]): Cue[] => cues.map(([f, s, v]) => [f, s, v * 0.6]);

export const R0210_REAL_SCENES: SceneDef[] = r0210Scenes(T, dur).map((s) => (s.id === "hook" ? s : { ...s, cues: soft(s.cues ?? []) }));

export const R0210RealVoice: React.FC = () => (
  <Sequence from={Math.round(reel(FILE_FROM) * FPS)} layout="none">
    <Audio src={staticFile(R0210_REAL_AUDIO)} />
  </Sequence>
);
