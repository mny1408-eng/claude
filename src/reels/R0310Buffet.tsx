// Reel 2 — "Buffet" (03/10/2026)
// Source: Notion 📅 03/10/2026 — Weekend Real Life, 🎥 REEL 2 (hook, teleprompter, overlays, CTA). QA reviewed 27/09.
// Format: resit harian (a "Resit Buffet" whose line items are the plan's steps). Reel 1 that day is calendar flip.
// Text from the script only; no prices, calories or food moralising.
import React from "react";
import { AbsoluteFill } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, CtaPill, Stack } from "./formats/common";

// Frame (within each scene) where each element appears, for the receipt and goal scenes.
// Defaults = silent version; R0310BuffetReal passes timings measured from Coach Nas's recording.
export type R0310BuffetTiming = {
  receipt: { items: number[]; checks: number[] };
  goal: { line2: number; hl: number; line3: number; strike: number; pill: number };
};

const Hook: React.FC = () => (
  <AbsoluteFill>
    <Stack top={400} gap={20}>
      <BoxStamp delay={4} rotate={-5} size={150}>
        BUFFET?
      </BoxStamp>
      <Line delay={28} size={58} weight={700} style={{ marginTop: 20 }}>
        SAYA TAK MASUK DENGAN MISI
      </Line>
      <Line delay={40} size={66} weight={800}>
        <span style={{ position: "relative", display: "inline-block" }}>
          “MAKAN PUAS
          <br />
          SEBAB DAH BAYAR”.
          <Strike delay={64} width={6} />
        </span>
      </Line>
    </Stack>
  </AbsoluteFill>
);

const Plan: React.FC = () => (
  <AbsoluteFill>
    <Stack top={500} gap={30}>
      <Line size={76} weight={800}>
        Buffet bukan
        <br />
        <Highlight delay={14}>ujian disiplin.</Highlight>
      </Line>
      <Line delay={44} size={56} weight={700} color={C.inkSoft}>
        Saya lebih suka masuk
        <br />
        dengan plan yang simple.
      </Line>
    </Stack>
  </AbsoluteFill>
);

// ---------- receipt ----------
const ITEMS = [
  { label: "Scan first", text: "Pusing dulu tengok pilihan." },
  { label: "Choose favourites", text: "Pilih makanan yang memang saya nak — bukan ambil semua sebab takut rugi." },
  { label: "Build plate", text: "Plate pertama: protein dan pilihan yang saya enjoy." },
  { label: "", text: "Makan perlahan sikit." },
  { label: "Pause before repeat", text: "Lepas habis, pause dulu sebelum decide nak repeat." },
  { label: "", text: "Dessert? Kalau nak, pilih yang betul-betul berbaloi untuk awak." },
];
const ITEM_AT = (i: number) => 20 + i * 62;

export const R0310_BUFFET_SILENT: R0310BuffetTiming = {
  receipt: { items: [0, 1, 2, 3, 4, 5].map(ITEM_AT), checks: [0, 1, 2, 3, 4, 5].map((i) => ITEM_AT(i) + 40) },
  goal: { line2: 40, hl: 52, line3: 70, strike: 100, pill: 130 },
};

const Dashes: React.FC = () => <div style={{ borderTop: `4px dashed ${C.inkSoft}`, opacity: 0.35, margin: "4px 0" }} />;

const Receipt: React.FC<{ t: R0310BuffetTiming["receipt"] }> = ({ t }) => (
  <AbsoluteFill>
    <div style={{ position: "absolute", top: 250, left: 70, right: 70, display: "flex", justifyContent: "center" }}>
      <Pop delay={2}>
        <Card style={{ width: 940, padding: "40px 50px 46px", borderRadius: 6, fontFamily: "inherit" }}>
          <div style={{ textAlign: "center", fontSize: 48, fontWeight: 800, letterSpacing: 6 }}>RESIT BUFFET</div>
          <div style={{ textAlign: "center", fontSize: 30, fontWeight: 600, color: C.inkSoft, marginTop: 6, marginBottom: 18 }}>plan yang simple</div>
          <Dashes />
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 18 }}>
            {ITEMS.map((it, i) => (
              <Pop key={it.text} delay={t.items[i]}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 22 }}>
                  <div style={{ fontSize: 34, fontWeight: 800, color: C.marker, width: 56, flexShrink: 0, paddingTop: 4 }}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ flex: 1 }}>
                    {it.label && <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 3, color: C.marker, textTransform: "uppercase" }}>{it.label}</div>}
                    <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.2 }}>{it.text}</div>
                  </div>
                  <div style={{ width: 52, flexShrink: 0, paddingTop: 6 }}>
                    <Mark kind="check" delay={t.checks[i]} size={44} />
                  </div>
                </div>
              </Pop>
            ))}
          </div>
        </Card>
      </Pop>
    </div>
  </AbsoluteFill>
);

const Goal: React.FC<{ t: R0310BuffetTiming["goal"] }> = ({ t }) => (
  <AbsoluteFill>
    <Stack top={420} gap={22}>
      <Line size={66} weight={800}>
        Goal bukan keluar
        <br />
        buffet lapar.
      </Line>
      <Line delay={t.line2} size={58} weight={700} style={{ marginTop: 24 }}>
        Goal dia <Highlight delay={t.hl}>enjoy</Highlight> tanpa mindset
      </Line>
      <Line delay={t.line3} size={58} weight={700} color={C.inkSoft}>
        <span style={{ position: "relative", display: "inline-block" }}>
          ‘hari ni dah cheat,
          <br />
          so belasah je’.
          <Strike delay={t.strike} width={6} />
        </span>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 1180, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <CtaPill icon="save" delay={t.pill}>
        Save sebelum buffet.
      </CtaPill>
    </div>
  </AbsoluteFill>
);

// Scenes after the opener (hook + "buffet bukan ujian disiplin"). Lengths default to the silent version.
export const r0310BuffetScenes = (t: R0310BuffetTiming, dur: Record<string, number> = { receipt: ITEM_AT(ITEMS.length - 1) + 110, goal: 230 }): SceneDef[] => [
  {
    id: "receipt",
    dur: dur.receipt,
    el: <Receipt t={t.receipt} />,
    cues: [[2, "pop", 0.45], ...t.receipt.items.map((f): Cue => [f, "pop", 0.4]), ...t.receipt.checks.map((f): Cue => [f, "tick", 0.5])],
  },
  { id: "goal", dur: dur.goal, el: <Goal t={t.goal} />, cues: [[t.goal.hl, "swipe", 0.45], [t.goal.strike, "scribble", 0.55], [t.goal.pill, "pop", 0.5], [t.goal.pill + 4, "chime", 0.45]] },
];

export const R0310_BUFFET_SCENES: SceneDef[] = [
  { id: "hook", dur: 115, el: <Hook />, cues: [[0, "whoosh", 0.35], [4, "stamp", 0.85], [64, "scribble", 0.55]] },
  { id: "plan", dur: 130, el: <Plan />, cues: [[14, "swipe", 0.5], [44, "pop", 0.35]] },
  ...r0310BuffetScenes(R0310_BUFFET_SILENT),
];
