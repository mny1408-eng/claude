// Timing math for Reel B (hybrid) voiced versions: a face-cam clip opens the reel, then the voice track
// plays from just after it. All times passed in are seconds in the *source* recordings.
import { FPS } from "../../theme";

export const LEAD = 6; // scenes change slightly before their first word
export const PRE = 3; // elements start animating 0.1s before their word so they land on it

export const voiceTimeline = ({ clipLen, clipFrom, voiceFrom, gap = 0.05 }: { clipLen: number; clipFrom: number; voiceFrom: number; gap?: number }) => {
  const voiceAt = clipLen / FPS + gap; // reel time where the voice file (cut at voiceFrom) starts
  const reel = (src: number) => voiceAt + src - voiceFrom;
  return {
    voiceAt,
    voiceFrame: Math.round(voiceAt * FPS),
    reel,
    // frame within the clip for a word at clip-source time `src`
    clipW: (src: number) => Math.max(0, Math.round((src - clipFrom) * FPS) - PRE),
    // scene start frame for a scene whose first word is at voice-source time `src`
    start: (src: number) => Math.round(reel(src) * FPS) - LEAD,
    // frame within a scene starting at `sceneStart` for a word at voice-source time `src`
    w: (sceneStart: number, src: number) => Math.max(0, Math.round(reel(src) * FPS) - PRE - sceneStart),
    // reel frame `pad` seconds after the last spoken word
    end: (lastWord: number, pad = 2.5) => Math.round((reel(lastWord) + pad) * FPS),
  };
};
