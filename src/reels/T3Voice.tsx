// T3 Coffee Day with Coach Nas's own voice (TeleCue take, 02/10 14:25, talking-head script B).
// The recording plays as one continuous track from frame 0; scene cuts sit on the sentence starts
// found by Whisper transcription + pause detection. The voice does not mention the ICO theme, so
// that scene is left out here (the caption still carries it).
import React from "react";
import { Audio, staticFile } from "remotion";
import { FPS } from "../theme";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { AnimHook, CTA, ResitBefore, ResitSwap, T3_PACK_FILE, Tips, Turn } from "./T3CoffeeDay";

export const T3_VOICE_AUDIO = "voice/T3-real/source.mp3";

// Sentence starts in the recording (seconds).
const SRC = {
  turn: 6.56, // "So sebagai pharmacist saya nak cakap kopi O ni hampir kosong kalori"
  resit: 11.44, // "Yang buat berat susah turun tu adalah gula dan susu pekat"
  swap: 20.2, // "Saya sendiri tak stop kopi, petang-petang saya minum protein kopi"
  tips: 31.08, // "Kalau awak nak mula, order kopi yang kurang manis dulu"
  tip2: 37.58, // "Dan jangan minum kopi lewat petang…"
  cta: 41.56, // "Nak saya tunjukkan cara susun minum harian…"
  comment: 46.26, // "Comment KOPI"
  end: 49.3, // "Happy Coffee Day" ends
};

const at = (src: number) => Math.round(src * FPS);
const LEAD = 6; // visuals change slightly before the words

const starts = {
  hook: 0,
  turn: at(SRC.turn) - LEAD,
  resit: at(SRC.resit) - LEAD,
  swap: at(SRC.swap) - LEAD,
  tips: at(SRC.tips) - LEAD,
  cta: at(SRC.cta) - LEAD,
  end: at(SRC.end) + Math.round(1.5 * FPS),
};

const dur = (a: keyof typeof starts, b: keyof typeof starts) => starts[b] - starts[a];
const soft = (cues: Cue[]): Cue[] => cues.map(([f, s, v]) => [f, s, v * 0.6]);

const tipAt = [LEAD + 4, at(SRC.tip2) - starts.tips, at(SRC.tip2) - starts.tips + 50];
const pillAt = at(SRC.comment) - starts.cta;

export const T3_VOICE_SCENES: SceneDef[] = [
  { id: "anim-hook", dur: dur("hook", "turn"), el: <AnimHook />, cues: soft([[6, "stamp", 0.85], [24, "pop", 0.45], [36, "swipe", 0.4], [50, "swipe", 0.4], [62, "swipe", 0.4], [76, "whoosh", 0.45]]) },
  { id: "turn", dur: dur("turn", "resit"), el: <Turn />, cues: soft([[4, "whoosh", 0.4], [28, "swipe", 0.45], [50, "stamp", 0.85]]) },
  { id: "resit", dur: dur("resit", "swap"), el: <ResitBefore />, cues: soft([[2, "whoosh", 0.5], [20, "tick", 0.5], [60, "tick", 0.5], [110, "pop", 0.5], [116, "swipe", 0.5]]) },
  {
    id: "swap",
    dur: dur("swap", "tips"),
    el: <ResitSwap pack={T3_PACK_FILE} />,
    cues: soft([[2, "whoosh", 0.5], [28, "tick", 0.6], [78, "tick", 0.6], [96, "pop", 0.5], [140, "pop", 0.45], [152, "swipe", 0.45]]),
  },
  { id: "tips", dur: dur("tips", "cta"), el: <Tips tipAt={tipAt} />, cues: soft([[4, "swipe", 0.45], ...tipAt.map((f): Cue => [f, "pop", 0.5])]) },
  { id: "cta", dur: dur("cta", "end"), el: <CTA pillAt={pillAt} />, cues: soft([[2, "pop", 0.45], [28, "swipe", 0.45], [pillAt, "pop", 0.55], [pillAt + 4, "chime", 0.45]]) },
];

export const T3Voice: React.FC = () => <Audio src={staticFile(T3_VOICE_AUDIO)} />;
