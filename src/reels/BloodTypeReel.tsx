// Myth-busting reel: "Diet ikut jenis darah — mitos atau fakta?" (recorded 09/10/2026 evening).
// Hook on camera with blood-type cards, a paper-tear transition into the explanation, design cutaways (face bubble)
// for the evidence and the basics, and the face again for the opinion and the CTA. Media (local only, gitignored):
//   public/clips/BLOODTYPE-full.mp4   eight Teleprompter takes (09/10 21:21–21:23) trimmed and joined, 78.5s. The repeated
//                                     "Eh betul ke?" between the first two hook takes is cut (only the second is kept).
// Evidence wording follows the two papers Coach Nas cites (checked on PubMed):
//   Cusack et al. 2013, Am J Clin Nutr, systematic review: 1,415 references screened, no evidence for blood type diets.
//   Barnard et al. 2021, J Acad Nutr Diet: within a 16-week vegan-diet RCT (n=68 typed), outcomes did not differ by ABO type.
import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike } from "../kit";
import { SceneDef } from "../Reel";
import { BoxStamp, Chip, CtaPill, Stack } from "./formats/common";
import { Captions } from "./formats/Captions";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";
import { PaperTear } from "./formats/PaperTear";
import { BLOODTYPE_WORDS } from "./BloodTypeWords";

const CLIP = "clips/BLOODTYPE-full.mp4";
const CLIP_LEN = 2356;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const TEAR_AT = f(11.6); // "Okay, sebenarnya mitos."
const TEAR_DUR = 16;

// Design cutaways (seconds on the joined clip).
const CUTS: Record<string, [number, number]> = {
  evidence: [11.6, 32.5],
  basics: [45.1, 55.0],
  structure: [55.0, 65.3],
};

// ---------- hook (on camera) ----------
const DropIcon: React.FC<{ type: string }> = ({ type }) => (
  <svg viewBox="0 0 60 76" width={64} height={80}>
    <path d="M 30 4 C 44 26, 56 40, 56 52 C 56 66, 44 74, 30 74 C 16 74, 4 66, 4 52 C 4 40, 16 26, 30 4 Z" fill="#B3263B" />
    <text x={30} y={60} textAnchor="middle" fontSize={26} fontWeight={800} fill="#fff" fontFamily="Poppins, sans-serif">
      {type}
    </text>
  </svg>
);

const TYPES: [string, string, number][] = [
  ["O", "banyak daging", 0.67],
  ["A", "banyak sayur", 2.89],
  ["B", "lain cerita…", 5.05],
];

const HookLayer: React.FC<{ muted?: boolean }> = ({ muted = false }) => {
  const fr = useCurrentFrame();
  const mythAt = f(10.64);
  return (
    <FaceCamOpener clip={CLIP} muted={muted} hook={<>DIET IKUT <span style={{ color: C.marker }}>JENIS DARAH?</span></>} hookSize={62} lowerTop={1400}>
      {fr < mythAt ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
          {TYPES.map(([t, txt, at], i) => (
            <Pop key={t} delay={f(at)} rotate={i % 2 ? 2 : -2}>
              <Card style={{ width: 600, padding: "14px 30px", display: "flex", alignItems: "center", gap: 22, ...OVER_VIDEO }}>
                <DropIcon type={t} />
                <span style={{ fontSize: 46, fontWeight: 800 }}>{txt}</span>
              </Card>
            </Pop>
          ))}
        </div>
      ) : (
        <div style={{ background: "rgba(247,245,237,0.94)", borderRadius: 20, padding: "8px 14px" }}>
          <BoxStamp delay={mythAt} rotate={-4} size={78}>
            MITOS ATAU FAKTA?
          </BoxStamp>
        </div>
      )}
    </FaceCamOpener>
  );
};

// ---------- cutaways ----------
const Bubble: React.FC = () => (
  <div style={{ position: "absolute", right: 50, top: 1350, width: 240, height: 240, borderRadius: "50%", overflow: "hidden", border: `8px solid ${C.card}`, boxShadow: "0 12px 30px rgba(20,30,20,0.3)" }}>
    <OffthreadVideo src={staticFile(CLIP)} muted style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%" }} />
  </div>
);

const StudyCard: React.FC<{ delay: number; tag: string; title: React.ReactNode; lines: [React.ReactNode, number][]; rotate: number }> = ({ delay, tag, title, lines, rotate }) => (
  <Pop delay={delay} rotate={rotate}>
    <div style={{ width: 900, background: C.card, borderRadius: 22, overflow: "hidden", boxShadow: "0 16px 36px rgba(20,30,20,0.18)" }}>
      <div style={{ background: C.ink, color: C.paper, fontSize: 30, fontWeight: 800, letterSpacing: 2, padding: "14px 28px" }}>{tag}</div>
      <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.15 }}>{title}</div>
        {lines.map(([l, at], i) => (
          <Pop key={i} delay={at}>
            <div style={{ fontSize: 44, fontWeight: 700, color: C.inkSoft, lineHeight: 1.25 }}>{l}</div>
          </Pop>
        ))}
      </div>
    </div>
  </Pop>
);

const Evidence: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 210, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <BoxStamp delay={f(12.5)} rotate={-5} size={110}>
        MITOS
      </BoxStamp>
    </div>
    <div style={{ position: "absolute", top: 470, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <StudyCard
        delay={f(15.8)}
        rotate={-1.2}
        tag="SYSTEMATIC REVIEW · 2013"
        title={<>Diet ikut jenis darah</>}
        lines={[
          [<>1,415 rujukan disaring</>, f(19.72)],
          [<><Highlight delay={f(22.6)}>Tiada bukti</Highlight> manfaat kesihatan</>, f(22.0)],
        ]}
      />
    </div>
    <div style={{ position: "absolute", top: 1010, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <StudyCard
        delay={f(26.36)}
        rotate={1.2}
        tag="RCT · 2021 · 16 MINGGU"
        title={<>Plant-based diet</>}
        lines={[[<>Respons <Highlight delay={f(30.3)}>tak berbeza</Highlight> ikut jenis darah</>, f(28.4)]]}
      />
    </div>
  </>
);

const BASICS: [string, number][] = [
  ["Protein cukup?", 45.18],
  ["Serat cukup?", 46.24],
  ["Portion?", 47.18],
  ["Air?", 48.2],
];

const Basics: React.FC = () => (
  <>
    <Stack top={250} gap={8}>
      <Line delay={f(45.1)} size={34} weight={800} color={C.marker} style={{ letterSpacing: 4 }}>
        YANG BASIC DULU
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 350, left: 60, right: 60, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
      {BASICS.map(([b, at], i) => (
        <Pop key={b} delay={f(at)} rotate={i % 2 ? 2 : -2}>
          <Card style={{ width: 420, padding: "28px 22px", display: "flex", alignItems: "center", gap: 18 }}>
            <Mark kind="check" delay={f(at) + 6} size={50} />
            <span style={{ fontSize: 46, fontWeight: 800 }}>{b}</span>
          </Card>
        </Pop>
      ))}
    </div>
    <Stack top={760} gap={14}>
      <Line delay={f(50.16)} size={50} weight={700}>
        Diet makin <Highlight delay={f(50.66)}>complicated</Highlight>
      </Line>
      <Line delay={f(51.78)} size={58} weight={800}>
        → makin susah ikut
      </Line>
      <div style={{ marginTop: 14 }}>
        <Chip delay={f(53.4)} rotate={-2} size={44}>
          especially bila kerja busy
        </Chip>
      </div>
    </Stack>
  </>
);

const PILLS: [string, number][] = [
  ["cukup nutrisi", 62.1],
  ["sesuai lifestyle", 63.22],
  ["boleh konsisten", 64.22],
];

const Structure: React.FC = () => (
  <>
    <Stack top={260} gap={12}>
      <Line delay={f(55.1)} size={48} weight={700} color={C.inkSoft}>
        Kita tak semestinya perlukan
      </Line>
      <Line delay={f(57.4)} size={60} weight={800}>
        <span style={{ position: "relative", display: "inline-block" }}>
          diet lebih restrictive
          <Strike delay={f(58.6)} width={7} />
        </span>
      </Line>
    </Stack>
    <Stack top={600} gap={18}>
      <Line delay={f(60.72)} size={44} weight={700} color={C.inkSoft}>
        Kita perlukan
      </Line>
      <Line delay={f(61.16)} size={78} weight={800}>
        <Highlight delay={f(61.6)}>eating structure</Highlight>
      </Line>
    </Stack>
    <Stack top={860} gap={20}>
      {PILLS.map(([p, at], i) => (
        <Pop key={p} delay={f(at)} rotate={i % 2 ? 1.5 : -1.5}>
          <Card style={{ width: 640, padding: "22px 30px", display: "flex", alignItems: "center", gap: 20 }}>
            <Mark kind="check" delay={f(at) + 5} size={48} />
            <span style={{ fontSize: 50, fontWeight: 800 }}>{p}</span>
          </Card>
        </Pop>
      ))}
    </Stack>
  </>
);

const SCENES: Record<string, React.FC> = { evidence: Evidence, basics: Basics, structure: Structure };

// ---------- face sections after the hook ----------
const NOT_ALLOWED: [string, number][] = [
  ["tak boleh makan", 37.4],
  ["kena cut", 39.48],
  ["kena pantang", 41.86],
];

const FaceLayer: React.FC = () => {
  const fr = useCurrentFrame();
  const t = fr / FPS;
  return (
    <FaceCamOpener clip={CLIP} hook={<>DIET IKUT <span style={{ color: C.marker }}>JENIS DARAH?</span></>} hookSize={62} lowerTop={1400}>
      {t < 45.1 && t >= 33 ? (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16, width: 940 }}>
          {NOT_ALLOWED.map(([n, at], i) => (
            <Pop key={n} delay={f(at)} rotate={i % 2 ? 2 : -2}>
              <span style={{ position: "relative", display: "inline-block", fontSize: 44, fontWeight: 800, padding: "10px 26px", borderRadius: 16, background: C.card, ...OVER_VIDEO }}>
                {n}
                <Strike delay={f(at) + 12} width={6} />
              </span>
            </Pop>
          ))}
        </div>
      ) : t >= 65.3 ? (
        <CtaPill icon="link" delay={f(71.6)}>
          Scorecard 2 minit · link di bio
        </CtaPill>
      ) : null}
    </FaceCamOpener>
  );
};

const Layers: React.FC = () => {
  const fr = useCurrentFrame();
  const t = fr / FPS;
  const cut = Object.entries(CUTS).find(([, [a, b]]) => t >= a && t < b);
  const Cut = cut ? SCENES[cut[0]] : null;
  return (
    <>
      {fr < TEAR_AT ? <HookLayer /> : <FaceLayer />}
      {Cut && (
        <AbsoluteFill style={{ background: C.paper }}>
          <div style={{ position: "absolute", inset: 0, transform: "translateY(40px)" }}>
            <Cut />
          </div>
          <Bubble />
        </AbsoluteFill>
      )}
      <PaperTear at={TEAR_AT} dur={TEAR_DUR}>
        <HookLayer muted />
      </PaperTear>
      <Captions words={BLOODTYPE_WORDS} top={Cut ? 1650 : 1150} size={Cut ? 54 : 62} plate={!!Cut} />
    </>
  );
};

export const BLOODTYPE_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: <Layers />,
    cues: [
      ...TYPES.map(([, , at]): [number, "pop", number] => [f(at), "pop", 0.3]),
      [f(10.64), "stamp", 0.4],
      [TEAR_AT, "whoosh", 0.5],
      [f(12.5), "stamp", 0.45],
      [Math.round(CUTS.basics[0] * FPS), "whoosh", 0.25],
      [Math.round(CUTS.structure[0] * FPS), "whoosh", 0.25],
      [f(71.6), "pop", 0.3],
    ],
  },
];
