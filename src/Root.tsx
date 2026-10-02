import React from "react";
import { Composition } from "remotion";
import { FPS } from "./theme";
import { TOTAL, VoxAd, VoxAdProps } from "./Video";
import { Reel, reelLength } from "./Reel";
import { T1_SCENES } from "./reels/T1NasiCampur";
import { T1_VOICE_IS_PLACEHOLDER, T1_VOICE_SCENES } from "./reels/T1Voice";
import { T1RealVoice, T1_REAL_SCENES } from "./reels/T1Real";
import { T2_SCENES } from "./reels/T2DietRule";
import { T3_SCENES, t3AnimScenes, t3ClipScenes } from "./reels/T3CoffeeDay";
import { P01_SCENES } from "./reels/P01ProgressReset";
import { M01_SCENES } from "./reels/M01KopiGemuk";
import { C01DietRule, C01_DIET_RULE_SLIDES } from "./carousel/C01DietRule";
import { C02Coaching, C02_SLIDES } from "./carousel/C02Coaching";
import { C03Buffet, C03_SLIDES } from "./carousel/C03Buffet";
import { C04WeeklyReview, C04_SLIDES } from "./carousel/C04WeeklyReview";
import { CarouselReel, carouselReelLength } from "./carousel/CarouselReel";

// PM carousels: each also becomes a 9:16 PM Reel (Reel-<id>).
const CAROUSELS = [
  { id: "01-10-DietRule", Slides: C01DietRule, slides: C01_DIET_RULE_SLIDES, music: 20 },
  { id: "02-10-Coaching", Slides: C02Coaching, slides: C02_SLIDES, music: 50 },
  { id: "03-10-Buffet", Slides: C03Buffet, slides: C03_SLIDES, music: 80 },
  { id: "04-10-WeeklyReview", Slides: C04WeeklyReview, slides: C04_SLIDES, music: 110 },
];

const hooks: VoxAdProps["hook"][] = ["A", "B", "C"];

// Weekly Vox trial reels (Notion "Trial Reels" R&D lane).
const REELS = [
  { id: "T1-NasiCampur", scenes: T1_SCENES, musicStartSec: 40 },
  { id: "T2-DietRule", scenes: T2_SCENES, musicStartSec: 70 },
  { id: "T3-CoffeeDay", scenes: T3_SCENES, musicStartSec: 100 },
  // Same reel with the HPPC pack shot (public/img/hppc-pack.png), opening on either
  // a coffee-making clip (public/clips/coffee-bancuh.mp4) or a drawn scoop → shake → pour.
  { id: "T3-CoffeeDay-Clip", scenes: t3ClipScenes(), musicStartSec: 100 },
  { id: "T3-CoffeeDay-Anim", scenes: t3AnimScenes(), musicStartSec: 100 },
  // Template reels (src/templates): P = Progress bar reset, M = Mitos vs Fakta.
  { id: "P01-ProgressReset", scenes: P01_SCENES, musicStartSec: 10 },
  { id: "M01-KopiGemuk", scenes: M01_SCENES, musicStartSec: 130 },
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
    {CAROUSELS.map((c) => (
      <Composition key={c.id} id={`Carousel-${c.id}`} component={c.Slides} durationInFrames={c.slides} fps={1} width={1080} height={1440} />
    ))}
    {CAROUSELS.map((c) => (
      <Composition
        key={`reel-${c.id}`}
        id={`PMReel-${c.id}`}
        component={() => <CarouselReel Slides={c.Slides} slides={c.slides} musicStartSec={c.music} />}
        durationInFrames={carouselReelLength(c.slides)}
        fps={FPS}
        width={1080}
        height={1920}
      />
    ))}
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
