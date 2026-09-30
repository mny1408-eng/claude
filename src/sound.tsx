// Sound design: Vox-style SFX cues synced to each scene's animation, plus the music bed.
import React from "react";
import { Audio, Sequence, interpolate, staticFile } from "remotion";

export type Sfx = "whoosh" | "stamp" | "scribble" | "swipe" | "pop" | "tick" | "chime";
export type Cue = [frame: number, sfx: Sfx, volume: number];

// Frames are relative to the start of each scene and match the delays in scenes.tsx.
const calendarTicks: Cue[] = [0, 1, 2].flatMap((w) =>
  [0, 1, 2, 3, 4, 5, 6].map((d): Cue => [12 + w * 30 + d * 4, "tick", 0.3])
);

export const CUES: Record<string, Cue[]> = {
  hook: [[0, "whoosh", 0.35], [14, "stamp", 0.9], [34, "scribble", 0.6], [50, "pop", 0.4]],
  calendar: [[2, "whoosh", 0.45], ...calendarTicks, [100, "scribble", 0.6], [110, "swipe", 0.5]],
  barriers: [
    [16, "swipe", 0.5],
    [30, "pop", 0.5], [44, "pop", 0.5], [58, "pop", 0.5],
    [82, "scribble", 0.55], [94, "scribble", 0.55], [106, "scribble", 0.55],
    [146, "swipe", 0.5],
  ],
  coach: [[10, "whoosh", 0.5], [16, "swipe", 0.5], [36, "pop", 0.5], [58, "swipe", 0.4], [70, "scribble", 0.35]],
  phone: [
    [4, "whoosh", 0.5], [10, "swipe", 0.5],
    [34, "tick", 0.5], [50, "tick", 0.5], [66, "tick", 0.5], [82, "tick", 0.5],
    [70, "whoosh", 0.3], [110, "pop", 0.5],
  ],
  cta: [[0, "stamp", 0.8], [14, "swipe", 0.5], [26, "pop", 0.6], [30, "chime", 0.45], [54, "scribble", 0.5]],
};

// Overall SFX loudness relative to the cue volumes above.
const SFX_GAIN = 1.3;

export const SceneSfx: React.FC<{ scene: string }> = ({ scene }) => <Cues cues={CUES[scene] ?? []} />;

export const Cues: React.FC<{ cues: Cue[] }> = ({ cues }) => (
  <>
    {cues.map(([frame, sfx, volume], i) => (
      <Sequence key={i} from={frame} durationInFrames={45} layout="none">
        <Audio src={staticFile(`sfx/${sfx}.wav`)} volume={Math.min(1, volume * SFX_GAIN)} />
      </Sequence>
    ))}
  </>
);

// Background music: fades in, sits under the SFX, fades out over the last second.
export const Music: React.FC<{ file: string; total: number; startFromSec?: number; level?: number }> = ({
  file,
  total,
  startFromSec = 0,
  level = 0.85,
}) => (
  <Audio
    src={staticFile(`audio/${file}`)}
    trimBefore={Math.round(startFromSec * 30)}
    volume={(f) =>
      interpolate(f, [0, 12, total - 30, total], [0, level, level, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })
    }
  />
);
