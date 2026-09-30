import React from "react";
import { Composition } from "remotion";
import { FPS } from "./theme";
import { TOTAL, VoxAd, VoxAdProps } from "./Video";
import { Reel, reelLength } from "./Reel";
import { T1_SCENES } from "./reels/T1NasiCampur";
import { T1_VOICE_IS_PLACEHOLDER, T1_VOICE_SCENES } from "./reels/T1Voice";
import { T1RealVoice, T1_REAL_SCENES } from "./reels/T1Real";
import { T2_SCENES } from "./reels/T2DietRule";
import { C01DietRule, C01_DIET_RULE_SLIDES } from "./carousel/C01DietRule";
import { C02Coaching, C02_SLIDES } from "./carousel/C02Coaching";
import { C03Buffet, C03_SLIDES } from "./carousel/C03Buffet";
import { C04WeeklyReview, C04_SLIDES } from "./carousel/C04WeeklyReview";

const hooks: VoxAdProps["hook"][] = ["A", "B", "C"];

// Weekly Vox trial reels (Notion "Trial Reels" R&D lane).
const REELS = [
  { id: "T1-NasiCampur", scenes: T1_SCENES, musicStartSec: 40 },
  { id: "T2-DietRule", scenes: T2_SCENES, musicStartSec: 70 },
];

export const Root: React.FC = () => (
  <>
    {hooks.map((h) => (
      <Composition
        key={h}
        id={`VoxAd-${h}`}
        component={VoxAd}
        durationInFrames={TOTAL}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ hook: h, music: "music.mp3", musicStartSec: 18 } as VoxAdProps}
      />
    ))}
    <Composition
      id="T1-NasiCampur-Voice"
      component={() => (
        <Reel
          scenes={T1_VOICE_SCENES}
          music="music.mp3"
          musicStartSec={40}
          musicLevel={0.28}
          draftLabel={T1_VOICE_IS_PLACEHOLDER ? "DRAFT · placeholder voice" : undefined}
        />
      )}
      durationInFrames={reelLength(T1_VOICE_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="T1-NasiCampur-CoachNasVoice"
      component={() => <Reel scenes={T1_REAL_SCENES} music="music.mp3" musicStartSec={40} musicLevel={0.25} overlay={<T1RealVoice />} />}
      durationInFrames={reelLength(T1_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    {/* PM carousels: one frame per slide, render with remotion still --frame=N */}
    <Composition id="Carousel-01-10-DietRule" component={C01DietRule} durationInFrames={C01_DIET_RULE_SLIDES} fps={1} width={1080} height={1440} />
    <Composition id="Carousel-02-10-Coaching" component={C02Coaching} durationInFrames={C02_SLIDES} fps={1} width={1080} height={1440} />
    <Composition id="Carousel-03-10-Buffet" component={C03Buffet} durationInFrames={C03_SLIDES} fps={1} width={1080} height={1440} />
    <Composition id="Carousel-04-10-WeeklyReview" component={C04WeeklyReview} durationInFrames={C04_SLIDES} fps={1} width={1080} height={1440} />
    {REELS.map((r) => (
      <Composition
        key={r.id}
        id={r.id}
        component={() => <Reel scenes={r.scenes} music="music.mp3" musicStartSec={r.musicStartSec} />}
        durationInFrames={reelLength(r.scenes)}
        fps={FPS}
        width={1080}
        height={1920}
      />
    ))}
  </>
);
