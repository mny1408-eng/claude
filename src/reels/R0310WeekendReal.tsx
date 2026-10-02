// Reel 1 (03/10) "Weekend Mindset" with Coach Nas's own recorded voice (Teleprompter 18:45), one continuous take.
// public/voice/R0310-weekend/source.mp3 = src 0–45.0s. The hook is not spoken, so it plays alone (as in the silent cut)
// before the voice comes in. Timings are word starts from a Whisper transcript (checked with the medium model where
// the small one misheard), corrected against measured pauses. On-screen text stays as scripted.
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { FPS } from "../theme";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { R0310WeekendTiming, R0310_WEEKEND_HOOK, r0310WeekendScenes } from "./R0310Weekend";

export const R0310_WEEKEND_AUDIO = "voice/R0310-weekend/source.mp3";

const VOICE_AT = 2.1; // reel time of the track start; first word (src 0.5) lands at 2.6s, after the hook's underline
const reel = (src: number) => VOICE_AT + src;

const LEAD = 6;
const PRE = 3;
const start = (src: number) => Math.round(reel(src) * FPS) - LEAD;
const starts = {
  calendar: start(0.5), // "Isnin sampai Jumaat…"
  reframe: start(11.64), // "Kalau pattern ni familiar…"
  buang: start(22.7), // "Cuba buang konsep…"
  anchors: start(27.02), // "Weekend tetap boleh ada…"
  close: start(39.98), // "Tak perlu perfect…"
  end: Math.round((reel(44.68) + 1.5) * FPS),
};
const w = (sceneStart: number, src: number) => Math.max(0, Math.round(reel(src) * FPS) - PRE - sceneStart);

// Calendar: weekday flips run through "Isnin sampai Jumaat"; Sabtu / Ahad / Isnin flip on their words.
const C0 = starts.calendar;
const days = [0.5, 0.8, 1.1, 1.35, 1.52, 4.5, 8.46, 9.8].map((s) => w(C0, s));
const [sat, sun, mon] = [days[5], days[6], days[7]];

const T: R0310WeekendTiming = {
  calendar: {
    days,
    isnin: w(C0, 0.5),
    jaga: w(C0, 2.24), // "jaga ketat"
    jagaHl: w(C0, 2.52),
    satLine: w(C0, 4.5) - sat, // "Tapi bila Sabtu datang"
    note: w(C0, 5.96) - sat, // "ah dah weekend lah…"
    sunLine: w(C0, 8.46) - sun, // "Ahad rasa bersalah"
    bersalah: w(C0, 8.88) - sun,
    stamp: w(C0, 10.62) - mon, // "Isnin pula hari start balik"
  },
  reframe: {
    line2: w(starts.reframe, 13.16), // "mungkin masalah bukan weekend semata-mata"
    hl: w(starts.reframe, 14.36),
    card: w(starts.reframe, 15.98), // "Mungkin weekdays plan terlalu rigid…"
    tag1: w(starts.reframe, 18.22), // "rigid"
    tag2: w(starts.reframe, 21.0), // "lepaskan geram"
    cardHl: w(starts.reframe, 21.0),
  },
  buang: {
    struck1: w(starts.buang, 23.86), // "5 hari perfect"
    struck2: w(starts.buang, 24.82), // "2 hari bebas"
    strike1: w(starts.buang, 25.1),
    strike2: w(starts.buang, 25.6),
  },
  anchors: {
    line2: w(starts.anchors, 28.56), // "makan dengan family, dessert atau makan luar"
    card: w(starts.anchors, 31.66), // "Cuma masih ada beberapa anchor"
    tag: w(starts.anchors, 32.48),
    checks: [34.36, 35.12, 37.08, 37.8].map((s) => w(starts.anchors, s)), // protein · portion yang sedar · air · next meal
    tag2: w(starts.anchors, 38.6),
  },
  close: {
    line2: w(starts.close, 40.78), // "tapi tak perlu"
    line3: w(starts.close, 41.08),
    hl: w(starts.close, 41.68), // "abandon semuanya"
    pill: w(starts.close, 43.4), // "Share kalau bermanfaat."
  },
};

const soft = (cues: Cue[]): Cue[] => cues.map(([f, s, v]) => [f, s, v * 0.6]);

export const R0310_WEEKEND_REAL_SCENES: SceneDef[] = [
  { ...R0310_WEEKEND_HOOK, dur: starts.calendar }, // no voice under the hook: full SFX
  ...r0310WeekendScenes(T, {
    calendar: starts.reframe - starts.calendar,
    reframe: starts.buang - starts.reframe,
    buang: starts.anchors - starts.buang,
    anchors: starts.close - starts.anchors,
    close: starts.end - starts.close,
  }).map((s) => ({ ...s, cues: soft(s.cues ?? []) })),
];

export const R0310WeekendVoice: React.FC = () => (
  <Sequence from={Math.round(VOICE_AT * FPS)} layout="none">
    <Audio src={staticFile(R0310_WEEKEND_AUDIO)} />
  </Sequence>
);
