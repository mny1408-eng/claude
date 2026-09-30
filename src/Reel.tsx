// Generic Vox-style reel: a list of scenes (each with its own SFX cues) on WDT paper,
// with the music bed and the @coachnas.pharmacist tag. Each topic reel only defines SceneDefs.
import React from "react";
import { Sequence } from "remotion";
import { BrandTag, Drift, Paper } from "./kit";
import { Cue, Cues, Music } from "./sound";

export type SceneDef = { id: string; dur: number; el: React.ReactNode; cues?: Cue[] };

export const reelLength = (scenes: SceneDef[]) => scenes.reduce((a, s) => a + s.dur, 0);

export const Reel: React.FC<{
  scenes: SceneDef[];
  music?: string;
  musicStartSec?: number;
  musicLevel?: number;
  tag?: string;
  overlay?: React.ReactNode; // reel-wide layers, e.g. a continuous voiceover track
  draftLabel?: string; // e.g. "DRAFT · placeholder voice" — burned in so drafts cannot be posted by accident
}> = ({ scenes, music, musicStartSec, musicLevel, tag, overlay, draftLabel }) => {
  const total = reelLength(scenes);
  let from = 0;
  return (
    <Paper>
      {music && <Music file={music} total={total} startFromSec={musicStartSec} level={musicLevel} />}
      {scenes.map((s) => {
        const seq = (
          <Sequence key={s.id} from={from} durationInFrames={s.dur} name={s.id}>
            <Drift dur={s.dur}>{s.el}</Drift>
            {s.cues && <Cues cues={s.cues} />}
          </Sequence>
        );
        from += s.dur;
        return seq;
      })}
      <BrandTag text={tag} />
      {overlay}
      {draftLabel && (
        <div style={{ position: "absolute", top: 60, left: 40, padding: "10px 22px", background: "#C0613E", color: "#fff", fontSize: 30, fontWeight: 800, borderRadius: 8 }}>
          {draftLabel}
        </div>
      )}
    </Paper>
  );
};
