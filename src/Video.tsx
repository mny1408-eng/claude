import React from "react";
import { Sequence } from "remotion";
import { BrandTag, Drift, Paper } from "./kit";
import { HookId, SceneBarriers, SceneCTA, SceneCalendar, SceneCoach, SceneHook, ScenePhone } from "./scenes";
import { Music, SceneSfx } from "./sound";

export type VoxAdProps = {
  hook: HookId;
  // Optional: file name inside public/clips/ to replace the Coach Nas photo (e.g. "01.mp4").
  coachClip?: string;
  // Optional: file name inside public/audio/ for the music bed, and where in the track to start.
  music?: string;
  musicStartSec?: number;
  sfx?: boolean;
};

// Scene lengths in frames @30fps
export const SCENES = [
  { id: "hook", dur: 90 },
  { id: "calendar", dur: 165 },
  { id: "barriers", dur: 195 },
  { id: "coach", dur: 165 },
  { id: "phone", dur: 195 },
  { id: "cta", dur: 150 },
] as const;
export const TOTAL = SCENES.reduce((a, s) => a + s.dur, 0);

export const VoxAd: React.FC<VoxAdProps> = ({ hook, coachClip, music, musicStartSec, sfx = true }) => {
  const render = (id: (typeof SCENES)[number]["id"]) => {
    switch (id) {
      case "hook": return <SceneHook hook={hook} />;
      case "calendar": return <SceneCalendar />;
      case "barriers": return <SceneBarriers />;
      case "coach": return <SceneCoach clip={coachClip} />;
      case "phone": return <ScenePhone />;
      case "cta": return <SceneCTA />;
    }
  };
  let from = 0;
  return (
    <Paper>
      {music && <Music file={music} total={TOTAL} startFromSec={musicStartSec} />}
      {SCENES.map((s) => {
        const seq = (
          <Sequence key={s.id} from={from} durationInFrames={s.dur} name={s.id}>
            <Drift dur={s.dur}>{render(s.id)}</Drift>
            {sfx && <SceneSfx scene={s.id} />}
          </Sequence>
        );
        from += s.dur;
        return seq;
      })}
      <BrandTag text="COACH NAS · PROGRESS CHECK" />
    </Paper>
  );
};
