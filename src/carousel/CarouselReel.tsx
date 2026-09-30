// Turns any coded PM carousel into a 9:16 Reel: each slide is frozen, framed on the brand page,
// and pushed in with a paper-slide transition, slow drift, SFX and the music bed. No per-day design needed.
import React from "react";
import { AbsoluteFill, Easing, Freeze, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Cues, Music } from "../sound";
import { ReelMode, T } from "./template";

export const HOLD_FIRST = 105; // cover slide: 3.5s so the hook is read
export const HOLD = 120; // other slides: 4s each
const TRANS = 14; // push-in transition length
const SCALE = 0.93; // slide sits inside Reels safe zones (top UI / bottom caption)

export const carouselReelLength = (slides: number) => HOLD_FIRST + HOLD * (slides - 1);

const slideStart = (i: number) => (i === 0 ? 0 : HOLD_FIRST + HOLD * (i - 1));

const Framed: React.FC<{ i: number; dur: number; Slides: React.FC }> = ({ i, dur, Slides }) => {
  const f = useCurrentFrame();
  const e = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const, easing: Easing.out(Easing.cubic) };
  const enter = i === 0 ? 1 : interpolate(f, [0, TRANS], [0, 1], e);
  const drift = interpolate(f, [0, dur], [1, 1.025]);
  return (
    <div
      style={{
        position: "absolute",
        left: (1080 - 1080 * SCALE) / 2,
        top: 215,
        width: 1080,
        height: 1440,
        transformOrigin: "top left",
        transform: `translateX(${(1 - enter) * 1080}px) scale(${SCALE * drift}) rotate(${(1 - enter) * 3}deg)`,
        boxShadow: "0 24px 60px rgba(40,40,20,0.18)",
        borderRadius: 18,
        overflow: "hidden",
      }}
    >
      <ReelMode.Provider value>
        <Freeze frame={i}>
          <Slides />
        </Freeze>
      </ReelMode.Provider>
    </div>
  );
};

export const CarouselReel: React.FC<{ Slides: React.FC; slides: number; musicStartSec?: number }> = ({ Slides, slides, musicStartSec = 60 }) => {
  const total = carouselReelLength(slides);
  return (
    <AbsoluteFill style={{ background: "#EFEDE6" }}>
      <Music file="music.mp3" total={total} startFromSec={musicStartSec} level={0.7} />
      {Array.from({ length: slides }, (_, i) => {
        const from = slideStart(i);
        const dur = i === slides - 1 ? total - from : (i === 0 ? HOLD_FIRST : HOLD) + TRANS;
        return (
          <Sequence key={i} from={from} durationInFrames={dur} name={`slide-${i + 1}`}>
            <Framed i={i} dur={dur} Slides={Slides} />
            <Cues cues={i === 0 ? [[0, "pop", 0.4]] : [[0, "whoosh", 0.45], [TRANS - 2, "pop", 0.3]]} />
          </Sequence>
        );
      })}
      {/* progress bar so viewers know how much is left */}
      <Progress total={total} />
    </AbsoluteFill>
  );
};

const Progress: React.FC<{ total: number }> = ({ total }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: 60, right: 60, top: 1600, height: 8, borderRadius: 4, background: "#DDDAD2" }}>
      <div style={{ width: `${(f / total) * 100}%`, height: "100%", borderRadius: 4, background: T.sage }} />
    </div>
  );
};
