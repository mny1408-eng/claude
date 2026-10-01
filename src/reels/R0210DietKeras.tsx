// Reel 1 — "Diet Lebih Keras" (02/10/2026)
// Source: Notion 📅 02/10/2026 — Personal Story × Coaching, 🎥 REEL 1 (hook, teleprompter, overlays, CTA). QA reviewed 27/09.
// Format: portrait + captions (personal story; text only from the script, no added story details).
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Highlight, Line, Pop } from "../kit";
import { SceneDef } from "../Reel";
import { BoxStamp, Stack } from "./formats/common";
import { CaptionScene, PortraitBadge } from "./formats/PortraitCaption";

const Hook: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={2}>
        <PortraitBadge size={380} />
      </Pop>
    </div>
    <Stack top={770} gap={6}>
      <Line delay={8} size={64} weight={700}>DULU SAYA INGAT</Line>
      <Line delay={16} size={64} weight={700}>SAYA PERLUKAN</Line>
      <Line delay={24} size={80} weight={800}>
        <Highlight delay={36}>DIET LEBIH KERAS.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const CAPS: { id: string; dur: number; tag?: string; el: React.ReactNode }[] = [
  {
    id: "yoyo",
    dur: 120,
    tag: "Diet yoyo",
    el: (
      <>
        Dulu saya ingat kalau progress tak jadi, maksudnya saya kena buat diet yang <Highlight delay={34}>lagi keras.</Highlight>
      </>
    ),
  },
  {
    id: "restart",
    dur: 110,
    tag: "Restart cycle",
    el: (
      <>
        Saya dah lama melalui cycle cuba diet sendiri, <Highlight delay={30}>turun-naik</Highlight> dan <Highlight delay={42}>restart.</Highlight>
      </>
    ),
  },
  {
    id: "tahan",
    dur: 125,
    el: (
      <>
        Plan yang terlalu bergantung pada <Highlight delay={28}>‘aku kena tahan’</Highlight> memang susah nak hidup lama dalam rutin sebenar.
      </>
    ),
  },
  { id: "berubah", dur: 95, el: <>Yang berubah untuk saya bukan cari satu diet paling strict.</> },
  {
    id: "structure",
    dur: 105,
    tag: "Repeatable structure",
    el: (
      <>
        Saya mula lebih hargai <Highlight delay={26}>structure</Highlight> yang saya boleh ulang
      </>
    ),
  },
  { id: "reallife", dur: 105, tag: "Real life", el: <>termasuk bila kerja busy, makan luar atau motivation tak tinggi.</> },
  {
    id: "perfect",
    dur: 125,
    el: (
      <>
        Plan yang hanya menjadi masa hidup perfect… <Highlight delay={40}>bukan plan</Highlight> yang saya nak bergantung lama.
      </>
    ),
  },
];

const CTA: React.FC = () => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <PortraitBadge size={300} />
    </div>
    <Stack top={700} gap={26}>
      <Line delay={4} size={76} weight={700}>Comment</Line>
      <BoxStamp delay={18} rotate={-4} size={130}>“pernah”</BoxStamp>
      <Line delay={34} size={76} weight={700} color={C.inkSoft}>kalau relate.</Line>
    </Stack>
  </AbsoluteFill>
);

export const R0210_SCENES: SceneDef[] = [
  { id: "hook", dur: 95, el: <Hook />, cues: [[2, "whoosh", 0.4], [8, "pop", 0.4], [36, "swipe", 0.5]] },
  ...CAPS.map((c): SceneDef => ({ id: c.id, dur: c.dur, el: <CaptionScene tag={c.tag}>{c.el}</CaptionScene>, cues: [[4, "pop", 0.4]] })),
  { id: "cta", dur: 115, el: <CTA />, cues: [[18, "stamp", 0.8], [34, "chime", 0.4]] },
];
