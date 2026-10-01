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

// Frame (within each scene) where each element appears. Defaults = silent version;
// R0210Real passes timings measured from Coach Nas's recording.
export type R0210Timing = {
  hook: { l1: number; l2: number; l3: number; hl: number };
  hl: Record<string, number[]>; // caption highlights, in order of appearance
  cta: { comment: number; stamp: number; relate: number };
};

export const R0210_SILENT: R0210Timing = {
  hook: { l1: 8, l2: 16, l3: 24, hl: 36 },
  hl: { yoyo: [34], restart: [30, 42], tahan: [28], structure: [26], perfect: [40] },
  cta: { comment: 4, stamp: 18, relate: 34 },
};

const Hook: React.FC<{ t: R0210Timing["hook"] }> = ({ t }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Pop delay={2}>
        <PortraitBadge size={380} />
      </Pop>
    </div>
    <Stack top={770} gap={6}>
      <Line delay={t.l1} size={64} weight={700}>DULU SAYA INGAT</Line>
      <Line delay={t.l2} size={64} weight={700}>SAYA PERLUKAN</Line>
      <Line delay={t.l3} size={80} weight={800}>
        <Highlight delay={t.hl}>DIET LEBIH KERAS.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const caps = (hl: R0210Timing["hl"]): { id: string; dur: number; tag?: string; el: React.ReactNode }[] => [
  {
    id: "yoyo",
    dur: 120,
    tag: "Diet yoyo",
    el: (
      <>
        Dulu saya ingat kalau progress tak jadi, maksudnya saya kena buat diet yang <Highlight delay={hl.yoyo[0]}>lagi keras.</Highlight>
      </>
    ),
  },
  {
    id: "restart",
    dur: 110,
    tag: "Restart cycle",
    el: (
      <>
        Saya dah lama melalui cycle cuba diet sendiri, <Highlight delay={hl.restart[0]}>turun-naik</Highlight> dan <Highlight delay={hl.restart[1]}>restart.</Highlight>
      </>
    ),
  },
  {
    id: "tahan",
    dur: 125,
    el: (
      <>
        Plan yang terlalu bergantung pada <Highlight delay={hl.tahan[0]}>‘aku kena tahan’</Highlight> memang susah nak hidup lama dalam rutin sebenar.
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
        Saya mula lebih hargai <Highlight delay={hl.structure[0]}>structure</Highlight> yang saya boleh ulang
      </>
    ),
  },
  { id: "reallife", dur: 105, tag: "Real life", el: <>termasuk bila kerja busy, makan luar atau motivation tak tinggi.</> },
  {
    id: "perfect",
    dur: 125,
    el: (
      <>
        Plan yang hanya menjadi masa hidup perfect… <Highlight delay={hl.perfect[0]}>bukan plan</Highlight> yang saya nak bergantung lama.
      </>
    ),
  },
];

const CTA: React.FC<{ t: R0210Timing["cta"] }> = ({ t }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 300, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <PortraitBadge size={300} />
    </div>
    <Stack top={700} gap={26}>
      <Line delay={t.comment} size={76} weight={700}>Comment</Line>
      <BoxStamp delay={t.stamp} rotate={-4} size={130}>“pernah”</BoxStamp>
      <Line delay={t.relate} size={76} weight={700} color={C.inkSoft}>kalau relate.</Line>
    </Stack>
  </AbsoluteFill>
);

// Scene lengths default to the silent version (caption lengths live in caps()); the voiced version passes its own.
export const r0210Scenes = (t: R0210Timing, dur: Record<string, number> = {}): SceneDef[] => [
  { id: "hook", dur: dur.hook ?? 95, el: <Hook t={t.hook} />, cues: [[2, "whoosh", 0.4], [8, "pop", 0.4], [t.hook.hl, "swipe", 0.5]] },
  ...caps(t.hl).map((c): SceneDef => ({ id: c.id, dur: dur[c.id] ?? c.dur, el: <CaptionScene tag={c.tag}>{c.el}</CaptionScene>, cues: [[4, "pop", 0.4]] })),
  { id: "cta", dur: dur.cta ?? 115, el: <CTA t={t.cta} />, cues: [[t.cta.stamp, "stamp", 0.8], [t.cta.stamp + 16, "chime", 0.4]] },
];

export const R0210_SCENES = r0210Scenes(R0210_SILENT);
