import React from "react";
import { Composition } from "remotion";
import { FPS } from "./theme";
import { TOTAL, VoxAd, VoxAdProps } from "./Video";
import { Reel, reelLength } from "./Reel";
import { T1_SCENES } from "./reels/T1NasiCampur";
import { T1_VOICE_IS_PLACEHOLDER, T1_VOICE_SCENES } from "./reels/T1Voice";
import { T1RealVoice, T1_REAL_SCENES } from "./reels/T1Real";

const hooks: VoxAdProps["hook"][] = ["A", "B", "C"];

// Weekly Vox trial reels (Notion "Trial Reels" R&D lane).
const REELS = [{ id: "T1-NasiCampur", scenes: T1_SCENES, musicStartSec: 40 }];

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
