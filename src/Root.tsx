import React from "react";
import { Composition } from "remotion";
import { FPS } from "./theme";
import { TOTAL, VoxAd, VoxAdProps } from "./Video";
import { Reel, reelLength } from "./Reel";
import { T1_SCENES } from "./reels/T1NasiCampur";
import { T1_VOICE_IS_PLACEHOLDER, T1_VOICE_SCENES } from "./reels/T1Voice";
import { T1RealVoice, T1_REAL_SCENES } from "./reels/T1Real";
import { T2_SCENES } from "./reels/T2DietRule";
import { R0110_SCENES } from "./reels/R0110BaikJahat";
import { R0210_SCENES } from "./reels/R0210DietKeras";
import { R0310_SCENES } from "./reels/R0310Weekend";
import { R0410_SCENES } from "./reels/R0410Tebus";
import { C01DietRule, C01_DIET_RULE_SLIDES } from "./carousel/C01DietRule";
import { C02Coaching, C02_SLIDES } from "./carousel/C02Coaching";
import { C03Buffet, C03_SLIDES } from "./carousel/C03Buffet";
import { C04WeeklyReview, C04_SLIDES } from "./carousel/C04WeeklyReview";
import { C0510LaparPagi, C0510_SLIDES } from "./carousel/C0510LaparPagi";
import { C0610ShiftBackup, C0610_SLIDES } from "./carousel/C0610ShiftBackup";
import { C0710Mamak, C0710_SLIDES } from "./carousel/C0710Mamak";
import { C0810SoalanRule, C0810_SLIDES } from "./carousel/C0810SoalanRule";
import { C0910Motivation, C0910_SLIDES } from "./carousel/C0910Motivation";
import { C1010Weekend, C1010_SLIDES } from "./carousel/C1010Weekend";
import { C1110SundayReset, C1110_SLIDES } from "./carousel/C1110SundayReset";
import { CNhmsRealiti, CNHMS_SLIDES } from "./carousel/CNhmsRealiti";
import { CHargaCoaching, CHARGA_SLIDES } from "./carousel/CHargaCoaching";
import { CGoalSistem, CGOAL_SLIDES } from "./carousel/CGoalSistem";
import { CPerluCoach, CPERLU_SLIDES } from "./carousel/CPerluCoach";
import { CarouselReel, carouselReelLength } from "./carousel/CarouselReel";
import { Kalendar, KALENDAR_SAMPLE, W as KAL_W, H as KAL_H } from "./kalendar/Kalendar";

// PM carousels: each also becomes a 9:16 PM Reel (Reel-<id>).
const CAROUSELS = [
  { id: "01-10-DietRule", Slides: C01DietRule, slides: C01_DIET_RULE_SLIDES, music: 20 },
  { id: "02-10-Coaching", Slides: C02Coaching, slides: C02_SLIDES, music: 50 },
  { id: "03-10-Buffet", Slides: C03Buffet, slides: C03_SLIDES, music: 80 },
  { id: "04-10-WeeklyReview", Slides: C04WeeklyReview, slides: C04_SLIDES, music: 110 },
  { id: "05-10-LaparPagi", Slides: C0510LaparPagi, slides: C0510_SLIDES, music: 140 },
  { id: "06-10-ShiftBackup", Slides: C0610ShiftBackup, slides: C0610_SLIDES, music: 28 },
  { id: "07-10-Mamak", Slides: C0710Mamak, slides: C0710_SLIDES, music: 64 },
  { id: "08-10-SoalanRule", Slides: C0810SoalanRule, slides: C0810_SLIDES, music: 98 },
  { id: "09-10-Motivation", Slides: C0910Motivation, slides: C0910_SLIDES, music: 12 },
  { id: "10-10-Weekend", Slides: C1010Weekend, slides: C1010_SLIDES, music: 125 },
  { id: "11-10-SundayReset", Slides: C1110SundayReset, slides: C1110_SLIDES, music: 44 },
  { id: "NHMS-Realiti", Slides: CNhmsRealiti, slides: CNHMS_SLIDES, music: 76 },
  { id: "Harga-Coaching", Slides: CHargaCoaching, slides: CHARGA_SLIDES, music: 102 },
  { id: "Goal-Sistem", Slides: CGoalSistem, slides: CGOAL_SLIDES, music: 58 },
  { id: "Perlu-Coach", Slides: CPerluCoach, slides: CPERLU_SLIDES, music: 88 },
];

const hooks: VoxAdProps["hook"][] = ["A", "B", "C"];

// Weekly Vox trial reels (Notion "Trial Reels" R&D lane).
const REELS = [
  { id: "T1-NasiCampur", scenes: T1_SCENES, musicStartSec: 40 },
  { id: "T2-DietRule", scenes: T2_SCENES, musicStartSec: 70 },
  // Daily Reel 1, designed version (one format per day, see docs/video-style-rotation.md).
  { id: "R1-01-10-BaikJahat", scenes: R0110_SCENES, musicStartSec: 35 },
  { id: "R1-02-10-DietKeras", scenes: R0210_SCENES, musicStartSec: 15 },
  { id: "R1-03-10-Weekend", scenes: R0310_SCENES, musicStartSec: 60 },
  { id: "R1-04-10-Tebus", scenes: R0410_SCENES, musicStartSec: 95 },
];

export const Root: React.FC = () => (
  <>
    {/* Monthly group-coaching calendar: data via --props from scripts/kalendar.mjs */}
    <Composition id="Kalendar" component={Kalendar} durationInFrames={1} fps={1} width={KAL_W} height={KAL_H} defaultProps={KALENDAR_SAMPLE} />
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
