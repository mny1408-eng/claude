// "Do it anyway" trend remix: the uploaded trend audio (10.3s, "Do it sad, do it angry … do it anyway") over Coach Nas's own
// footage, one cut per "do it", every shot from a different clip (Coach Nas, 17/10: no repeats; name tags fine). Captions re-made in house style; the original's profane end line is replaced with
// "Ikut plan, bukan mood." No footage of the original creator is used.
// Media (local only, gitignored):
//   public/voice/remix/doit.mp3          audio from the uploaded trend video (2eb08f77…mp4), loudness-normalised
//   public/clips/remix/i4561|i2869.mp4   IMG_4561 / IMG_2869 driving B-roll, rotated to portrait, 30fps
//   public/clips/remix/i4106.mp4         IMG_4106 night walk at a petrol station
//   public/clips/R0610-shift, R0710-mamak, R0810-carbs, GAME, R1510a-full   earlier talking-head takes (pause/gesture moments)
//   public/clips/R1610-acc-full.mp4      smile at the end of the 16/10 reel; public/img/event-stage.jpg, event-help.jpg event photos
import React from "react";
import { AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Pop } from "../kit";
import { SceneDef } from "../Reel";
import { BoxStamp } from "./formats/common";

type Shot = { word: string; at: number; src: string; from?: number; img?: boolean; pos?: string };

// `at` = start of each "do it" (Whisper word times in the trend audio)
const SHOTS: Shot[] = [
  { word: "SAD", at: 0.0, src: "clips/remix/i4561.mp4", from: 1.0 },
  { word: "ANGRY", at: 1.0, src: "clips/R0610-shift-full.mp4", from: 9.0 },
  { word: "HEARTBROKEN", at: 1.75, src: "clips/R0710-mamak-full.mp4", from: 17.3 },
  { word: "MISERABLE", at: 2.72, src: "clips/remix/i4106.mp4", from: 4.0 },
  { word: "EXCITED", at: 3.56, src: "img/event-stage.jpg", img: true },
  { word: "ENERGIZED", at: 4.48, src: "img/event-help.jpg", img: true, pos: "35% 50%" },
  { word: "HAPPY", at: 5.42, src: "clips/R1610-acc-full.mp4", from: 35.1 },
  { word: "TIRED", at: 6.2, src: "clips/R0810-carbs-full.mp4", from: 24.75 },
  { word: "CONFIDENT", at: 7.05, src: "clips/remix/i2869.mp4", from: 0.3 },
  { word: "DISCOURAGED", at: 7.9, src: "clips/GAME-full.mp4", from: 12.9 },
  { word: "ANYWAY", at: 9.4, src: "clips/R1510a-full.mp4", from: 37.2 },
];
const AUDIO_END = 10.28;
const HOLD = 1.8; // end card after the audio
const TOTAL = Math.round((AUDIO_END + HOLD) * FPS);
const fr = (s: number) => Math.round(s * FPS);

const ShotView: React.FC<{ shot: Shot; dur: number }> = ({ shot, dur }) => {
  const f = useCurrentFrame();
  const z = interpolate(f, [0, dur], [1.0, 1.08]);
  const style: React.CSSProperties = { width: "100%", height: "100%", objectFit: "cover", objectPosition: shot.pos ?? "50% 50%", transform: `scale(${z})`, transformOrigin: shot.pos ?? "50% 50%" };
  return shot.img ? <Img src={staticFile(shot.src)} style={style} /> : <OffthreadVideo src={staticFile(shot.src)} muted startFrom={fr(shot.from ?? 0)} style={style} />;
};

const Caption: React.FC<{ word: string; last: boolean }> = ({ word, last }) => (
  <div style={{ position: "absolute", top: 1170, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
    <Pop delay={0}>
      <div style={{ fontSize: 52, fontWeight: 800, color: "#fff", letterSpacing: 6, textShadow: "0 4px 18px rgba(0,0,0,0.6)" }}>DO IT</div>
    </Pop>
    <Pop delay={2}>
      <div style={{ fontSize: word.length > 9 ? 96 : 120, fontWeight: 800, lineHeight: 1.0, color: last ? C.gold : "#fff", textShadow: "0 6px 26px rgba(0,0,0,0.65)" }}>{word}</div>
    </Pop>
  </div>
);

const Remix: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#000" }}>
      {SHOTS.map((s, i) => {
        const start = fr(s.at);
        const end = i + 1 < SHOTS.length ? fr(SHOTS[i + 1].at) : TOTAL;
        return (
          <Sequence key={i} from={start} durationInFrames={end - start} layout="none">
            <AbsoluteFill>
              <ShotView shot={s} dur={end - start} />
              <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 100%)" }} />
              {f < fr(AUDIO_END) && <Caption word={s.word} last={i === SHOTS.length - 1} />}
            </AbsoluteFill>
          </Sequence>
        );
      })}
      <Sequence from={fr(AUDIO_END)} layout="none">
        <AbsoluteFill style={{ background: "rgba(23,60,48,0.55)" }}>
          <div style={{ position: "absolute", top: 700, left: 0, right: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
            <div style={{ background: "rgba(247,245,237,0.95)", borderRadius: 18, padding: "6px 10px" }}>
              <BoxStamp delay={0} rotate={-4} size={92}>
                DO IT ANYWAY
              </BoxStamp>
            </div>
            <Pop delay={10}>
              <div style={{ fontSize: 58, fontWeight: 800, color: C.paper, textShadow: "0 4px 18px rgba(0,0,0,0.5)" }}>
                Ikut plan, <span style={{ color: C.gold }}>bukan mood.</span>
              </div>
            </Pop>
          </div>
        </AbsoluteFill>
      </Sequence>
      <Audio src={staticFile("voice/remix/doit.mp3")} />
    </AbsoluteFill>
  );
};

export const R_DOIT_SCENES: SceneDef[] = [
  { id: "remix", dur: TOTAL, el: <Remix />, cues: [[fr(AUDIO_END) + 1, "stamp", 0.5]] },
];
