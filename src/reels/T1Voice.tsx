// T1 with voiceover: scene lengths and plate-step timings come from the generated voice clips
// (scripts/gen-voice.mjs → src/reels/voice/T1.manifest.json). Swap the provider, re-run, re-render.
import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { FPS } from "../theme";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { CTA, Extras, Hook, PlateBuild, Point, Problem } from "./T1NasiCampur";
import manifest from "./voice/T1.manifest.json";

const LEAD = 8; // frames of visuals before the first line in a scene
const GAP = 6; // pause between lines
const TAIL = 14; // breathing room after the last line

type Line = { id: string; scene: string; file: string; duration: number };
const LINES = manifest.lines as Line[];

// Shortest length each scene's animation needs to play out (matches the silent version).
const MIN: Record<string, number> = { hook: 70, problem: 150, plate: 0, extras: 130, point: 90, cta: 110 };

const layout = (scene: string) => {
  let t = LEAD;
  const placed = LINES.filter((l) => l.scene === scene).map((l) => {
    const at = t;
    t += Math.ceil(l.duration * FPS) + GAP;
    return { ...l, at };
  });
  return { placed, end: t - GAP + TAIL };
};

const Voice: React.FC<{ placed: (Line & { at: number })[] }> = ({ placed }) => (
  <>
    {placed.map((l) => (
      <Sequence key={l.id} from={l.at} durationInFrames={Math.ceil(l.duration * FPS) + 2} layout="none">
        <Audio src={staticFile(l.file)} />
      </Sequence>
    ))}
  </>
);

// SFX a bit quieter than the silent cut so they sit under the voice.
const soft = (cues: Cue[]): Cue[] => cues.map(([f, s, v]) => [f, s, v * 0.7]);

const plateCues = (s: number[]): Cue[] => [
  [0, "whoosh", 0.45], [8, "swipe", 0.5],
  [s[0], "whoosh", 0.4], [s[0] + 12, "pop", 0.6], [s[0] + 30, "scribble", 0.5],
  [s[1], "whoosh", 0.4], [s[1] + 12, "pop", 0.6], [s[1] + 30, "scribble", 0.5],
  [s[2] + 4, "pop", 0.5], [s[2] + 22, "tick", 0.5], [s[2] + 30, "whoosh", 0.35], [s[2] + 60, "tick", 0.5],
  [s[2] + 70, "whoosh", 0.35], [s[2] + 100, "tick", 0.55], [s[2] + 102, "swipe", 0.5],
];

const scene = (id: string, el: (placed: (Line & { at: number })[]) => React.ReactNode, cues: (placed: (Line & { at: number })[]) => Cue[]): SceneDef => {
  const { placed, end } = layout(id);
  let dur = Math.max(end, MIN[id] ?? 0);
  if (id === "plate") {
    const step3 = placed.find((l) => l.id === "step3")!.at;
    dur = Math.max(dur, step3 + 120); // slider needs ~4s to finish
  }
  return {
    id,
    dur,
    el: (
      <>
        {el(placed)}
        <Voice placed={placed} />
      </>
    ),
    cues: soft(cues(placed)),
  };
};

const stepsFrom = (placed: (Line & { at: number })[]) => ["step1", "step2", "step3"].map((id) => placed.find((l) => l.id === id)!.at);

export const T1_VOICE_SCENES: SceneDef[] = [
  scene("hook", () => <Hook />, () => [[0, "whoosh", 0.35], [14, "stamp", 0.8], [34, "scribble", 0.6], [50, "pop", 0.4]]),
  scene("problem", () => <Problem />, () => [[2, "whoosh", 0.35], [24, "swipe", 0.5], [52, "tick", 0.4], [60, "tick", 0.4], [68, "tick", 0.4], [120, "swipe", 0.5]]),
  scene("plate", (p) => <PlateBuild stepAt={stepsFrom(p)} />, (p) => plateCues(stepsFrom(p))),
  scene("extras", () => <Extras />, () => [[12, "pop", 0.5], [24, "pop", 0.5], [36, "pop", 0.5], [72, "swipe", 0.5], [100, "scribble", 0.35]]),
  scene("point", () => <Point />, () => [[0, "stamp", 0.55], [8, "swipe", 0.5], [12, "pop", 0.4]]),
  scene("cta", () => <CTA />, () => [[24, "stamp", 0.6], [36, "swipe", 0.5], [50, "pop", 0.55], [54, "chime", 0.45], [60, "scribble", 0.5]]),
];

export const T1_VOICE_IS_PLACEHOLDER = manifest.placeholder;
