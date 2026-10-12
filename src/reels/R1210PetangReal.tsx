// Reel 2 (12/10) "6 Petang, Otak Dah Penat" — Reel B (hybrid: face-cam opener + voice + design).
// Source: Notion 📅 12/10/2026 — Sarapan Rushing, IG REEL 2 (NEW TEST; no diagnosis). Overlays follow the Notion list:
// 6 PETANG = OTAK PENAT · BUKAN MALAS · SATU FALLBACK · BUKAN ALL-OR-NOTHING. CTA: comment.
// Media (local only, gitignored):
//   public/clips/R1210-petang-opener.mp4   Teleprompter 12/10 17:52, src 0.00–6.00: "Pukul 6 petang, otak dah penat — bukan
//                                           masa terbaik untuk buat 10 keputusan diet."
//   public/voice/R1210-petang/source.mp3   TeleCue 12/10 17:54, src 0.55–end: "Awak tahu perasaan tu kan?…" through
//                                           "Story lah sikit dekat komen, saya nak tahu."
// Times below are seconds in the TeleCue source (Whisper medium, unprompted).
import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { C } from "../theme";
import { Highlight, Line, Mark, Pop, Strike } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, Chip, CtaPill, NumCard, Stack } from "./formats/common";
import { FaceCamOpener } from "./formats/FaceCamOpener";
import { voiceTimeline } from "./formats/voiceTimeline";

const CLIP = "clips/R1210-petang-opener.mp4";
const AUDIO = "voice/R1210-petang/source.mp3";
const CLIP_LEN = 180;
const tl = voiceTimeline({ clipLen: CLIP_LEN, clipFrom: 0, voiceFrom: 0.55 });
const w = tl.w;

const starts = {
  choices: CLIP_LEN,
  lazy: tl.start(11.08), // "Ramai orang anggap benda tu adalah malas"
  fallback: tl.start(18.38), // "Jadi cara yang paling mudah…"
  notall: tl.start(26.56), // "Dan kalau malam tu dah tak jadi…"
  close: tl.start(35.64), // "Pukul 6 petang, awak biasa ni buat apa?"
  end: tl.end(40.0, 2.4),
};

const STAMP_AT = tl.clipW(1.76); // "penat"
const TEN_AT = tl.clipW(4.48); // "10 keputusan diet"

const Opener: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={<>6 PETANG, <span style={{ color: C.marker }}>OTAK DAH PENAT</span></>} hookSize={60} lowerTop={1260}>
    <Pop delay={STAMP_AT}>
      <div style={{ background: "rgba(247,245,237,0.92)", borderRadius: 18, padding: "6px 10px" }}>
        <BoxStamp delay={STAMP_AT} rotate={-4} size={66}>
          6 PETANG = OTAK PENAT
        </BoxStamp>
      </div>
    </Pop>
    <Chip delay={TEN_AT} rotate={2} size={44}>
      bukan masa untuk 10 keputusan diet
    </Chip>
  </FaceCamOpener>
);

const QUESTIONS: [string, number][] = [
  ["nak masak apa?", 4.36],
  ["nak order apa?", 5.14],
  ["nasi ke tak nak nasi?", 6.66],
];

const Choices: React.FC = () => {
  const s = starts.choices;
  return (
    <AbsoluteFill>
      <Stack top={250} gap={8}>
        <Line delay={w(s, 0.64)} size={52} weight={700}>
          Awak tahu perasaan tu kan?
        </Line>
        <Line delay={w(s, 2.94)} size={66} weight={800}>
          <Highlight delay={w(s, 3.24)}>Balik kerja…</Highlight>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 560, left: 60, right: 60, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
        {QUESTIONS.map(([q, at], i) => (
          <Chip key={q} delay={w(s, at)} rotate={i % 2 ? 2.5 : -2.5} size={52}>
            {q}
          </Chip>
        ))}
      </div>
      <Stack top={1000} gap={10}>
        <Line delay={w(s, 8.18)} size={44} weight={600} color={C.inkSoft}>
          lama-lama…
        </Line>
        <Line delay={w(s, 9.34)} size={78} weight={800} style={{ fontStyle: "italic" }}>
          “Ah, apa-apa jelah.”
        </Line>
      </Stack>
    </AbsoluteFill>
  );
};

const Lazy: React.FC = () => {
  const s = starts.lazy;
  return (
    <AbsoluteFill>
      <Stack top={300} gap={10}>
        <Line delay={w(s, 11.08)} size={50} weight={700} color={C.inkSoft}>
          Ramai orang anggap tu
        </Line>
        <Line delay={w(s, 12.84)} size={110} weight={800}>
          <span style={{ position: "relative", display: "inline-block" }}>
            MALAS
            <Strike delay={w(s, 14.2)} width={10} />
          </span>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 680, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BoxStamp delay={w(s, 14.4)} rotate={-5} size={96}>
          BUKAN MALAS
        </BoxStamp>
      </div>
      <Stack top={980} gap={10}>
        <Line delay={w(s, 15.84)} size={50} weight={700}>
          Selalunya, tu sebab
        </Line>
        <Line delay={w(s, 16.66)} size={70} weight={800}>
          otak memang <Highlight delay={w(s, 17.36)}>dah penat</Highlight>
        </Line>
      </Stack>
    </AbsoluteFill>
  );
};

const Fallback: React.FC = () => {
  const s = starts.fallback;
  return (
    <AbsoluteFill>
      <Stack top={260} gap={10}>
        <Line delay={w(s, 18.38)} size={50} weight={700} color={C.inkSoft}>
          Cara paling mudah:
        </Line>
        <Line delay={w(s, 20.02)} size={80} weight={800}>
          <Highlight delay={w(s, 20.58)}>decide awal</Highlight>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 600, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <NumCard n="1" tag="SATU FALLBACK" text="untuk malam" delay={w(s, 21.72)} rotate={-1} size={54} />
      </div>
      <Stack top={900} gap={20}>
        <Pop delay={w(s, 23.28)} rotate={1.5}>
          <div style={{ display: "flex", alignItems: "center", gap: 18, background: C.card, borderRadius: 20, padding: "22px 34px", fontSize: 46, fontWeight: 800, boxShadow: "0 12px 28px rgba(20,30,20,0.14)" }}>
            <Mark kind="check" delay={w(s, 24.1)} size={48} /> pilihan yang awak dah tahu
          </div>
        </Pop>
        <Line delay={w(s, 24.86)} size={48} weight={700} color={C.inkSoft}>
          tak payah fikir panjang.
        </Line>
      </Stack>
    </AbsoluteFill>
  );
};

const NotAll: React.FC = () => {
  const s = starts.notall;
  return (
    <AbsoluteFill>
      <Stack top={260} gap={10}>
        <Line delay={w(s, 26.56)} size={50} weight={700} color={C.inkSoft}>
          Kalau malam tu tak jadi macam plan…
        </Line>
        <Line delay={w(s, 29.96)} size={90} weight={800}>
          <Highlight delay={w(s, 30.3)}>Tak apa.</Highlight>
        </Line>
      </Stack>
      <Stack top={640} gap={10}>
        <Line delay={w(s, 31.08)} size={54} weight={700}>
          <span style={{ position: "relative", display: "inline-block" }}>
            “Semuanya dah rosak.”
            <Strike delay={w(s, 32.5)} width={7} />
          </span>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 820, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <BoxStamp delay={w(s, 32.7)} rotate={-4} size={74}>
          BUKAN ALL-OR-NOTHING
        </BoxStamp>
      </div>
      <Stack top={1080} gap={10}>
        <Line delay={w(s, 33.52)} size={70} weight={800}>
          Esoknya, <Highlight delay={w(s, 34.28)}>sambung balik.</Highlight>
        </Line>
      </Stack>
    </AbsoluteFill>
  );
};

const Close: React.FC = () => {
  const s = starts.close;
  return (
    <AbsoluteFill>
      <Stack top={380} gap={14}>
        <Line delay={w(s, 35.64)} size={86} weight={800}>
          Pukul 6 petang,
        </Line>
        <Line delay={w(s, 36.44)} size={64} weight={700}>
          awak biasanya <Highlight delay={w(s, 36.78)}>buat apa?</Highlight>
        </Line>
      </Stack>
      <Stack top={860} gap={20}>
        <CtaPill icon="comment" delay={w(s, 38.4)}>
          Cerita kat comment
        </CtaPill>
        <Line delay={w(s, 39.74)} size={44} weight={700} color={C.inkSoft}>
          saya nak tahu.
        </Line>
      </Stack>
    </AbsoluteFill>
  );
};

const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, x]) => [f, s, x * k]);

export const R1210_PETANG_REAL_SCENES: SceneDef[] = [
  { id: "opener", dur: CLIP_LEN, el: <Opener />, cues: soft([[STAMP_AT, "stamp", 0.7], [TEN_AT, "pop", 0.4]], 0.5) },
  {
    id: "choices",
    dur: starts.lazy - starts.choices,
    el: <Choices />,
    cues: soft([...QUESTIONS.map(([, at]): Cue => [w(starts.choices, at), "pop", 0.45]), [w(starts.choices, 9.34), "swipe", 0.45]]),
  },
  { id: "lazy", dur: starts.fallback - starts.lazy, el: <Lazy />, cues: soft([[w(starts.lazy, 14.2), "scribble", 0.5], [w(starts.lazy, 14.4), "stamp", 0.6]]) },
  { id: "fallback", dur: starts.notall - starts.fallback, el: <Fallback />, cues: soft([[w(starts.fallback, 21.72), "pop", 0.45], [w(starts.fallback, 24.1), "tick", 0.5]]) },
  { id: "notall", dur: starts.close - starts.notall, el: <NotAll />, cues: soft([[w(starts.notall, 32.5), "scribble", 0.5], [w(starts.notall, 32.7), "stamp", 0.6]]) },
  { id: "close", dur: starts.end - starts.close, el: <Close />, cues: soft([[w(starts.close, 38.4), "pop", 0.5], [w(starts.close, 38.4) + 4, "chime", 0.45]]) },
];

export const R1210PetangVoice: React.FC = () => (
  <Sequence from={tl.voiceFrame} layout="none">
    <Audio src={staticFile(AUDIO)} />
  </Sequence>
);
