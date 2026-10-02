// Reel 1 (04/10) "Ahad Compensate" with Coach Nas's own recorded voice (Teleprompter 18:01), one continuous take.
// public/voice/R0410-tebus/source.mp3 = src 0–38.7s. The recording opens with 2.6s of silence, so the (unspoken)
// hook plays in that gap. Timings are word starts from a Whisper transcript, corrected against measured pauses.
// Spoken wording differs slightly from the script ("ke laut" for terbabas, "rasa guilty"); on-screen text stays as scripted.
import React from "react";
import { Audio, staticFile } from "remotion";
import { FPS } from "../theme";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R0410TebusTiming, R0410_TEBUS_HOOK, r0410TebusScenes } from "./R0410Tebus";

export const R0410_TEBUS_AUDIO = "voice/R0410-tebus/source.mp3";

const LEAD = 6;
const PRE = 3;
const start = (src: number) => Math.round(src * FPS) - LEAD; // track starts at reel 0, so reel time = source time
const starts = {
  notes1: start(2.67), // "Kalau setiap Ahad…"
  cycle: start(11.08), // "Compensation yang extreme…"
  notes2: start(20.13), // "Lepas meal ataupun weekend…"
  close: start(31.88), // "Just tanya apa yang berlaku…"
  end: Math.round((38.24 + 1.5) * FPS),
};
const w = (sceneStart: number, src: number) => Math.max(0, Math.round(src * FPS) - PRE - sceneStart);

const T: R0410TebusTiming = {
  notes1: {
    title: w(starts.notes1, 2.67),
    lines: [4.32, 5.84, 6.64, 7.82].map((s) => w(starts.notes1, s)), // makan terlalu sikit · skip meal · exercise extra · sebab weekend
    line1: w(starts.notes1, 9.16), // "saya nak awak tengok"
    pattern: w(starts.notes1, 9.7),
    hl: w(starts.notes1, 9.98),
  },
  cycle: {
    line2: w(starts.cycle, 13.46), // "all or nothing"
    hl: w(starts.cycle, 13.6),
    nodes: [15.45, 16.59, 17.67, 18.82].map((s) => w(starts.cycle, s)), // restrict · ke laut · rasa guilty · restrict balik
    arrows: [16.3, 17.4, 18.6, 19.4].map((s) => w(starts.cycle, s)),
    tag: w(starts.cycle, 19.77),
  },
  notes2: {
    line2: w(starts.notes2, 23.23), // "langkah yang paling boring…"
    hl: w(starts.notes2, 24.56), // "paling useful"
    card: w(starts.notes2, 25.4),
    title: w(starts.notes2, 25.5),
    lines: [26.32, 27.64, 28.93, 30.2].map((s) => w(starts.notes2, s)), // kembali · dan rutin biasa · tak perlu detox · tak payah punish
    checks: [27.3, 28.3].map((s) => w(starts.notes2, s)),
  },
  close: {
    line2: w(starts.close, 33.12), // "ambil satu lesson"
    hl: w(starts.close, 33.32),
    line3: w(starts.close, 33.84), // "and masuk minggu baru"
    line4: w(starts.close, 34.96), // "tanpa hutang rasa bersalah"
    underline: w(starts.close, 36.0),
    pill: w(starts.close, 37.36), // "Save video ni."
  },
};

const soft = (cues: Cue[]): Cue[] => cues.map(([f, s, v]) => [f, s, v * 0.6]);

export const R0410_TEBUS_REAL_SCENES: SceneDef[] = [
  // Hook plays in the recording's opening silence: full SFX, no voice under it.
  { ...R0410_TEBUS_HOOK, dur: starts.notes1 },
  ...r0410TebusScenes(T, {
    notes1: starts.cycle - starts.notes1,
    cycle: starts.notes2 - starts.cycle,
    notes2: starts.close - starts.notes2,
    close: starts.end - starts.close,
  }).map((s) => ({ ...s, cues: soft(s.cues ?? []) })),
];

export const R0410TebusVoice: React.FC = () => <Audio src={staticFile(R0410_TEBUS_AUDIO)} />;
