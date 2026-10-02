// Stand-alone entry for the calendar so rendering it skips the video compositions (and their web fonts).
import React from "react";
import { Composition, registerRoot } from "remotion";
import { H, KALENDAR_SAMPLE, Kalendar, W } from "./Kalendar";

registerRoot(() => <Composition id="Kalendar" component={Kalendar} durationInFrames={1} fps={1} width={W} height={H} defaultProps={KALENDAR_SAMPLE} />);
