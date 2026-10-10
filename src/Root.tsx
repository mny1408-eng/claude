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
import { R0110RealVoice, R0110_REAL_SCENES } from "./reels/R0110Real";
import { R0110InfoVoice, R0110_INFO_SCENES } from "./reels/R0110Info";
import { R0210_SCENES } from "./reels/R0210DietKeras";
import { R0210RealVoice, R0210_REAL_SCENES } from "./reels/R0210Real";
import { R0310_SCENES } from "./reels/R0310Weekend";
import { R0310WeekendVoice, R0310_WEEKEND_REAL_SCENES } from "./reels/R0310WeekendReal";
import { R0410_SCENES } from "./reels/R0410Tebus";
import { R0410TebusVoice, R0410_TEBUS_REAL_SCENES } from "./reels/R0410TebusReal";
import { R0210_COACHING_SCENES } from "./reels/R0210Coaching";
import { R0210CoachingVoice, R0210_COACHING_REAL_SCENES } from "./reels/R0210CoachingReal";
import { R0310_BUFFET_SCENES } from "./reels/R0310Buffet";
import { R0310BuffetVoice, R0310_BUFFET_REAL_SCENES } from "./reels/R0310BuffetReal";
import { R0410_REVIEW_SCENES } from "./reels/R0410WeeklyReview";
import { R0510_SCENES } from "./reels/R0510Lapar";
import { R0610_SCENES } from "./reels/R0610Backup";
import { R0710_SCENES } from "./reels/R0710AirManis";
import { R0810_SCENES } from "./reels/R0810CarbsMalam";
import { R0910_SCENES } from "./reels/R0910StartIsnin";
import { R0510_BUSY_SCENES } from "./reels/R0510Busy";
import { R0510_LAPAR_REAL_SCENES } from "./reels/R0510LaparReal";
import { R0610_SHIFT_REAL_SCENES } from "./reels/R0610ShiftReal";
import { R0710_MAMAK_REAL_SCENES } from "./reels/R0710MamakReal";
import { R0810_CARBS_REAL_SCENES } from "./reels/R0810CarbsReal";
import { R0910_ISNIN_REAL_SCENES } from "./reels/R0910IsninReal";
import { R1110_REVIEW_REAL_SCENES } from "./reels/R1110ReviewReal";
import { R1010_WEEKEND_REAL_SCENES } from "./reels/R1010WeekendReal";
import { IMMULIFT_SCENES } from "./reels/ImmuLiftReel";
import { BLOODTYPE_SCENES } from "./reels/BloodTypeReel";
import { HCP_SCENES } from "./reels/HcpReel";
import { RECRUIT_SCENES } from "./reels/RecruitReel";
import { GAME_SCENES } from "./reels/GameReel";
import { R0810_PROTEIN_SCENES } from "./reels/R0810Protein";
import { R0810ProteinVoice, R0810_PROTEIN_REAL_SCENES } from "./reels/R0810ProteinReal";
import { R0910_TAHU_SCENES } from "./reels/R0910TahuBuat";
import { R0910TahuVoice, R0910_TAHU_REAL_SCENES } from "./reels/R0910TahuBuatReal";
import { R1010_FAMILY_SCENES } from "./reels/R1010Family";
import { R1010FamilyVoice, R1010_FAMILY_REAL_SCENES } from "./reels/R1010FamilyReal";
import { R1110_PREP_SCENES } from "./reels/R1110PrepEnv";
import { R1110PrepVoice, R1110_PREP_REAL_SCENES } from "./reels/R1110PrepEnvReal";
import { R0510BusyVoice, R0510_BUSY_REAL_SCENES } from "./reels/R0510BusyReal";
import { R0610Voice, R0610_REAL_SCENES } from "./reels/R0610BackupReal";
import { R0710Voice, R0710_REAL_SCENES } from "./reels/R0710AirManisReal";
import { R0410ReviewVoice, R0410_REVIEW_REAL_SCENES } from "./reels/R0410WeeklyReviewReal";
import { C01DietRule, C01_DIET_RULE_SLIDES } from "./carousel/C01DietRule";
import { C02Coaching, C02_SLIDES } from "./carousel/C02Coaching";
import { C03Buffet, C03_SLIDES } from "./carousel/C03Buffet";
import { C04WeeklyReview, C04_SLIDES } from "./carousel/C04WeeklyReview";
import { C05Foundation, C05_SLIDES } from "./carousel/C05Foundation";
import { CarouselReel, carouselReelLength } from "./carousel/CarouselReel";

// PM carousels: each also becomes a 9:16 PM Reel (Reel-<id>).
const CAROUSELS = [
  { id: "01-10-DietRule", Slides: C01DietRule, slides: C01_DIET_RULE_SLIDES, music: 20 },
  { id: "02-10-Coaching", Slides: C02Coaching, slides: C02_SLIDES, music: 50 },
  { id: "03-10-Buffet", Slides: C03Buffet, slides: C03_SLIDES, music: 80 },
  { id: "04-10-WeeklyReview", Slides: C04WeeklyReview, slides: C04_SLIDES, music: 110 },
  { id: "10-10-Foundation", Slides: C05Foundation, slides: C05_SLIDES, music: 140 },
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
  // Daily Reel 2, designed version (format differs from that day's Reel 1).
  { id: "R2-02-10-Coaching", scenes: R0210_COACHING_SCENES, musicStartSec: 50 },
  { id: "R2-03-10-Buffet", scenes: R0310_BUFFET_SCENES, musicStartSec: 80 },
  { id: "R2-04-10-WeeklyReview", scenes: R0410_REVIEW_SCENES, musicStartSec: 30 },
  // Week 5–11 Oct: Reel B (hybrid) designed versions; the face-cam opener and voice are added when recorded.
  { id: "R1-05-10-Lapar", scenes: R0510_SCENES, musicStartSec: 40 },
  { id: "R2-06-10-Backup", scenes: R0610_SCENES, musicStartSec: 65 },
  { id: "R2-07-10-AirManis", scenes: R0710_SCENES, musicStartSec: 90 },
  { id: "R1-08-10-CarbsMalam", scenes: R0810_SCENES, musicStartSec: 25 },
  { id: "R1-09-10-StartIsnin", scenes: R0910_SCENES, musicStartSec: 55 },
  { id: "R2-05-10-Busy", scenes: R0510_BUSY_SCENES, musicStartSec: 75 },
  { id: "R2-08-10-Protein", scenes: R0810_PROTEIN_SCENES, musicStartSec: 45 },
  { id: "R2-09-10-TahuBuat", scenes: R0910_TAHU_SCENES, musicStartSec: 85 },
  { id: "R2-10-10-Family", scenes: R1010_FAMILY_SCENES, musicStartSec: 20 },
  { id: "R2-11-10-PrepEnv", scenes: R1110_PREP_SCENES, musicStartSec: 100 },
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
    <Composition
      id="R1-01-10-BaikJahat-CoachNasVoice"
      component={() => <Reel scenes={R0110_REAL_SCENES} overlay={<R0110RealVoice />} />}
      durationInFrames={reelLength(R0110_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R1-02-10-DietKeras-CoachNasVoice"
      component={() => <Reel scenes={R0210_REAL_SCENES} overlay={<R0210RealVoice />} />}
      durationInFrames={reelLength(R0210_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R2-01-10-InfoOverload-CoachNas"
      component={() => <Reel scenes={R0110_INFO_SCENES} overlay={<R0110InfoVoice />} />}
      durationInFrames={reelLength(R0110_INFO_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R2-02-10-Coaching-CoachNas"
      component={() => <Reel scenes={R0210_COACHING_REAL_SCENES} overlay={<R0210CoachingVoice />} />}
      durationInFrames={reelLength(R0210_COACHING_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R2-03-10-Buffet-CoachNas"
      component={() => <Reel scenes={R0310_BUFFET_REAL_SCENES} overlay={<R0310BuffetVoice />} />}
      durationInFrames={reelLength(R0310_BUFFET_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R2-04-10-WeeklyReview-CoachNas"
      component={() => <Reel scenes={R0410_REVIEW_REAL_SCENES} overlay={<R0410ReviewVoice />} />}
      durationInFrames={reelLength(R0410_REVIEW_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R1-04-10-Tebus-CoachNasVoice"
      component={() => <Reel scenes={R0410_TEBUS_REAL_SCENES} overlay={<R0410TebusVoice />} />}
      durationInFrames={reelLength(R0410_TEBUS_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R1-03-10-Weekend-CoachNasVoice"
      component={() => <Reel scenes={R0310_WEEKEND_REAL_SCENES} overlay={<R0310WeekendVoice />} />}
      durationInFrames={reelLength(R0310_WEEKEND_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R1-05-10-Lapar-CoachNas"
      component={() => <Reel scenes={R0510_LAPAR_REAL_SCENES} />}
      durationInFrames={reelLength(R0510_LAPAR_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R2-08-10-Protein-CoachNas"
      component={() => <Reel scenes={R0810_PROTEIN_REAL_SCENES} overlay={<R0810ProteinVoice />} />}
      durationInFrames={reelLength(R0810_PROTEIN_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R2-09-10-TahuBuat-CoachNas"
      component={() => <Reel scenes={R0910_TAHU_REAL_SCENES} overlay={<R0910TahuVoice />} />}
      durationInFrames={reelLength(R0910_TAHU_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R1-06-10-Shift-CoachNas"
      component={() => <Reel scenes={R0610_SHIFT_REAL_SCENES} />}
      durationInFrames={reelLength(R0610_SHIFT_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R2-10-10-Family-CoachNas"
      component={() => <Reel scenes={R1010_FAMILY_REAL_SCENES} overlay={<R1010FamilyVoice />} />}
      durationInFrames={reelLength(R1010_FAMILY_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R2-11-10-PrepEnv-CoachNas"
      component={() => <Reel scenes={R1110_PREP_REAL_SCENES} overlay={<R1110PrepVoice />} />}
      durationInFrames={reelLength(R1110_PREP_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R1-07-10-Mamak-CoachNas"
      component={() => <Reel scenes={R0710_MAMAK_REAL_SCENES} />}
      durationInFrames={reelLength(R0710_MAMAK_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R1-08-10-CarbsMalam-CoachNas"
      component={() => <Reel scenes={R0810_CARBS_REAL_SCENES} />}
      durationInFrames={reelLength(R0810_CARBS_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R1-09-10-StartIsnin-CoachNas"
      component={() => <Reel scenes={R0910_ISNIN_REAL_SCENES} />}
      durationInFrames={reelLength(R0910_ISNIN_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R1-11-10-Review-CoachNas"
      component={() => <Reel scenes={R1110_REVIEW_REAL_SCENES} />}
      durationInFrames={reelLength(R1110_REVIEW_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R1-10-10-Weekend-CoachNas"
      component={() => <Reel scenes={R1010_WEEKEND_REAL_SCENES} />}
      durationInFrames={reelLength(R1010_WEEKEND_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="X-Game-NampakHealthy"
      component={() => <Reel scenes={GAME_SCENES} />}
      durationInFrames={reelLength(GAME_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="X-Recruit-Growth"
      component={() => <Reel scenes={RECRUIT_SCENES} />}
      durationInFrames={reelLength(RECRUIT_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="X-HCP-Territory"
      component={() => <Reel scenes={HCP_SCENES} />}
      durationInFrames={reelLength(HCP_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="X-BloodType-Myth"
      component={() => <Reel scenes={BLOODTYPE_SCENES} />}
      durationInFrames={reelLength(BLOODTYPE_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="X-ImmuLift-Elderberry-EpiCor"
      component={() => <Reel scenes={IMMULIFT_SCENES} />}
      durationInFrames={reelLength(IMMULIFT_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R2-05-10-Busy-CoachNas"
      component={() => <Reel scenes={R0510_BUSY_REAL_SCENES} overlay={<R0510BusyVoice />} />}
      durationInFrames={reelLength(R0510_BUSY_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R2-06-10-Backup-CoachNas"
      component={() => <Reel scenes={R0610_REAL_SCENES} overlay={<R0610Voice />} />}
      durationInFrames={reelLength(R0610_REAL_SCENES)}
      fps={FPS}
      width={1080}
      height={1920}
    />
    <Composition
      id="R2-07-10-AirManis-CoachNas"
      component={() => <Reel scenes={R0710_REAL_SCENES} overlay={<R0710Voice />} />}
      durationInFrames={reelLength(R0710_REAL_SCENES)}
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
