// Recruit talk reel: "Kita tak perlukan lebih ramai orang yang berdebat…" (recorded 10/09/2026 night, takes 22:53–22:55),
// a follow-up to the HCP-territory reel. Hook on camera, whip-pan into the talk, design cutaways (face bubble) for the
// "struggle with basics" list, who can join, and the honest business disclosure, then the DM CTA on camera.
// Media (local only, gitignored):
//   public/clips/REC-full.mp4   eight takes trimmed and joined, 65.85s. In take 6 the word heard as "employment" between
//                               "coaching system" and "business" is cut (it reads as a salaried job, which take 7 says it is not).
// Business wording follows the script as spoken: product-supported business, not a salaried job, income depends on effort
// and actual sales. No income figures are shown.
import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { C, FPS } from "../theme";
import { Card, Highlight, Line, Mark, Pop, Strike } from "../kit";
import { SceneDef } from "../Reel";
import { Chip, CtaPill, Stack } from "./formats/common";
import { Captions } from "./formats/Captions";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";
import { WhipPan } from "./formats/WhipPan";
import { REC_WORDS } from "./RecruitWords";

const CLIP = "clips/REC-full.mp4";
const CLIP_LEN = 1975;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const WHIP_AT = Math.round(6.0 * FPS) - 4; // into "Kita perlukan…"
const HOOK = (
  <>
    BERDEBAT ATAU <span style={{ color: C.marker }}>BANTU?</span>
  </>
);

const CUTS: Record<string, [number, number]> = {
  basics: [9.6, 21.9],
  who: [31.2, 44.8],
  honest: [50.5, 63.6],
};

// ---------- hook ----------
const HookLayer: React.FC<{ muted?: boolean }> = ({ muted = false }) => (
  <FaceCamOpener
    clip={CLIP}
    muted={muted}
    hook={HOOK}
    hookSize={64}
    lowerTop={1420}
  >
    <Pop delay={f(2.26)} rotate={-2}>
      <span
        style={{
          position: "relative",
          display: "inline-block",
          fontSize: 50,
          fontWeight: 800,
          padding: "12px 30px",
          borderRadius: 18,
          background: C.card,
          ...OVER_VIDEO,
        }}
      >
        berdebat siapa patut ajar
        <Strike delay={f(5.2)} width={7} />
      </span>
    </Pop>
  </FaceCamOpener>
);

// ---------- face sections ----------
const TEAM: [string, number][] = [
  ["training", 46.12],
  ["product knowledge", 46.76],
  ["coaching system", 47.64],
  ["business secara part-time", 48.44],
];

const FaceLower: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 9.6)
    return (
      <Pop delay={f(7.92)} rotate={-1.5}>
        <Card
          style={{
            padding: "20px 34px",
            fontSize: 50,
            fontWeight: 800,
            ...OVER_VIDEO,
          }}
        >
          <Highlight delay={f(8.28)}>sanggup bantu</Highlight> orang lain
        </Card>
      </Pop>
    );
  if (t < 31.2)
    return (
      <>
        {t < 29.0 && (
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Chip delay={f(22.98)} rotate={-2} size={44}>
              Pharmacist
            </Chip>
            <Pop delay={f(24.92)} rotate={2}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 44,
                  fontWeight: 800,
                  padding: "10px 24px",
                  borderRadius: 16,
                  background: C.card,
                  ...OVER_VIDEO,
                }}
              >
                tapi ada <span style={{ color: C.marker }}>limitation</span>
              </span>
            </Pop>
          </div>
        )}
        {t < 29.0 ? (
          <Pop delay={f(25.54)}>
            <div
              style={{
                fontSize: 40,
                fontWeight: 800,
                color: C.paper,
                background: "rgba(23,60,48,0.92)",
                borderRadius: 16,
                padding: "10px 24px",
              }}
            >
              tak boleh bantu semua orang seorang diri
            </div>
          </Pop>
        ) : (
          <Pop delay={f(29.18)} rotate={-1.5}>
            <div
              style={{
                background: C.ink,
                color: C.paper,
                borderRadius: 20,
                padding: "16px 30px",
                textAlign: "center",
                ...OVER_VIDEO,
              }}
            >
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: C.gold,
                  letterSpacing: 3,
                }}
              >
                SAYA PERCAYA PADA
              </div>
              <div style={{ fontSize: 50, fontWeight: 800 }}>
                community-based wellness coaching
              </div>
            </div>
          </Pop>
        )}
      </>
    );
  if (t < 50.5)
    return (
      <>
        <Line
          delay={f(45.04)}
          size={40}
          weight={800}
          color={C.paper}
          style={{
            background: "rgba(23,60,48,0.92)",
            borderRadius: 14,
            padding: "6px 22px",
          }}
        >
          Dalam team kami ada:
        </Line>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
            width: 960,
          }}
        >
          {TEAM.map(([x, at], i) => (
            <Pop key={x} delay={f(at)} rotate={i % 2 ? 1.5 : -1.5}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 42,
                  fontWeight: 800,
                  padding: "10px 22px",
                  borderRadius: 16,
                  background: C.card,
                  ...OVER_VIDEO,
                }}
              >
                <Mark kind="check" delay={f(at) + 5} size={38} />
                {x}
              </span>
            </Pop>
          ))}
        </div>
      </>
    );
  return (
    <CtaPill icon="comment" delay={f(63.88)}>
      DM saya “GROWTH”
    </CtaPill>
  );
};

const MainLayer: React.FC = () => (
  <FaceCamOpener clip={CLIP} hook={HOOK} hookSize={64} lowerTop={1460}>
    <FaceLower />
  </FaceCamOpener>
);

// ---------- cutaways ----------
const Bubble: React.FC = () => (
  <div
    style={{
      position: "absolute",
      right: 50,
      top: 1350,
      width: 240,
      height: 240,
      borderRadius: "50%",
      overflow: "hidden",
      border: `8px solid ${C.card}`,
      boxShadow: "0 12px 30px rgba(20,30,20,0.3)",
    }}
  >
    <OffthreadVideo
      src={staticFile(CLIP)}
      muted
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        objectPosition: "50% 18%",
      }}
    />
  </div>
);

const ListCard: React.FC<{
  items: [string, number][];
  kind: "check" | "cross";
  width?: number;
  size?: number;
}> = ({ items, kind, width = 900, size = 46 }) => (
  <Stack top={0} gap={16}>
    {items.map(([x, at], i) => (
      <Pop key={x} delay={f(at)} rotate={i % 2 ? 1.2 : -1.2}>
        <Card
          style={{
            width,
            padding: "20px 30px",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Mark kind={kind} delay={f(at) + 5} size={46} />
          <span
            style={{ fontSize: size, fontWeight: 800, whiteSpace: "nowrap" }}
          >
            {x}
          </span>
        </Card>
      </Pop>
    ))}
  </Stack>
);

const BASICS: [string, number][] = [
  ["Sarapan tunggang-langgang", 14.1],
  ["Makan tak teratur", 15.12],
  ["Protein tak cukup", 15.82],
  ["Sayur & buah jarang", 16.84],
];

const Basics: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  return (
    <>
      <Stack top={210} gap={10}>
        <Line
          delay={f(9.86)}
          size={36}
          weight={800}
          color={C.marker}
          style={{ letterSpacing: 4 }}
        >
          REALITINYA
        </Line>
        <Line delay={f(10.66)} size={54} weight={800}>
          Ramai masih struggle dengan
        </Line>
        <Line delay={f(12.92)} size={70} weight={800}>
          <Highlight delay={f(13.26)}>benda basic</Highlight>
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 520, left: 0, right: 0 }}>
        <ListCard items={BASICS} kind="cross" />
      </div>
      {t >= 19.26 && (
        <div
          style={{
            position: "absolute",
            top: 1060,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pop delay={f(19.26)} rotate={-1.5}>
            <div
              style={{
                background: C.ink,
                color: C.paper,
                borderRadius: 22,
                padding: "18px 34px",
                textAlign: "center",
                width: 860,
              }}
            >
              <div style={{ fontSize: 40, fontWeight: 700 }}>Nak berubah…</div>
              <div style={{ fontSize: 52, fontWeight: 800, color: C.gold }}>
                tak tahu nak bermula kat mana?
              </div>
            </div>
          </Pop>
        </div>
      )}
    </>
  );
};

const WHO: [string, number][] = [
  ["willing to learn", 38.36],
  ["ikut evidence", 39.34],
  ["tahu batas peranan", 40.14],
  ["support orang bina healthy habits", 41.94],
];

const Who: React.FC = () => (
  <>
    <Stack top={210} gap={14}>
      <Pop delay={f(31.5)} rotate={-1.5}>
        <Card style={{ padding: "16px 30px", fontSize: 46, fontWeight: 800 }}>
          Kita terima training
        </Card>
      </Pop>
      <Pop delay={f(32.4)}>
        <div style={{ fontSize: 50, fontWeight: 800, color: C.marker }}>↓</div>
      </Pop>
      <Pop delay={f(32.76)} rotate={1.5}>
        <Card style={{ padding: "16px 30px", fontSize: 46, fontWeight: 800 }}>
          train orang yang ada <Highlight delay={f(33.62)}>passion</Highlight>{" "}
          nak bantu
        </Card>
      </Pop>
    </Stack>
    <div
      style={{
        position: "absolute",
        top: 590,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pop delay={f(35.38)} rotate={-2}>
        <span
          style={{
            position: "relative",
            display: "inline-block",
            fontSize: 40,
            fontWeight: 800,
            padding: "10px 24px",
            borderRadius: 16,
            background: "#EFE9D8",
            color: C.inkSoft,
          }}
        >
          tak semestinya healthcare professional
        </span>
      </Pop>
    </div>
    <Stack top={700} gap={8}>
      <Line
        delay={f(37.54)}
        size={40}
        weight={800}
        color={C.marker}
        style={{ letterSpacing: 3 }}
      >
        YANG PENTING
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 780, left: 0, right: 0 }}>
      <ListCard items={WHO} kind="check" size={42} />
    </div>
  </>
);

const Honest: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pop delay={f(51.0)} rotate={-1}>
          <div
            style={{
              width: 920,
              background: C.card,
              borderRadius: 22,
              overflow: "hidden",
              boxShadow: "0 16px 36px rgba(20,30,20,0.18)",
            }}
          >
            <div
              style={{
                background: C.ink,
                color: C.paper,
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: 2,
                padding: "14px 28px",
              }}
            >
              AND YES…
            </div>
            <div
              style={{
                padding: "22px 30px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.15 }}>
                Product-supported wellness business
              </div>
              <Pop delay={f(53.32)}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    fontSize: 44,
                    fontWeight: 800,
                  }}
                >
                  <Mark kind="cross" delay={f(53.32) + 5} size={44} /> bukan
                  kerja bergaji
                </div>
              </Pop>
              <Pop delay={f(54.36)}>
                <div
                  style={{
                    fontSize: 42,
                    fontWeight: 700,
                    color: C.inkSoft,
                    lineHeight: 1.3,
                  }}
                >
                  Income bergantung pada{" "}
                  <Highlight delay={f(55.36)}>usaha</Highlight> &{" "}
                  <Highlight delay={f(56.48)}>hasil jualan sebenar</Highlight>
                </div>
              </Pop>
            </div>
          </div>
        </Pop>
      </div>
      {t >= 57.6 && (
        <Stack top={830} gap={16}>
          <Line delay={f(57.96)} size={44} weight={700} color={C.inkSoft}>
            Kalau rasa preventive health
          </Line>
          <Line delay={f(59.42)} size={54} weight={800}>
            patut sampai kepada{" "}
            <Highlight delay={f(60.4)}>lebih ramai orang</Highlight>
          </Line>
          <div style={{ marginTop: 10 }}>
            <Chip delay={f(61.82)} rotate={-2} size={50}>
              mungkin kita ada mission yang sama
            </Chip>
          </div>
        </Stack>
      )}
    </>
  );
};

const SCENES: Record<string, React.FC> = {
  basics: Basics,
  who: Who,
  honest: Honest,
};

const Layers: React.FC = () => {
  const fr = useCurrentFrame();
  const t = fr / FPS;
  const cut = Object.entries(CUTS).find(([, [a, b]]) => t >= a && t < b);
  const Cut = cut ? SCENES[cut[0]] : null;
  return (
    <>
      {fr < WHIP_AT ? (
        <HookLayer />
      ) : (
        <WhipPan at={WHIP_AT} dur={10} from={<HookLayer muted />}>
          <MainLayer />
        </WhipPan>
      )}
      {Cut && (
        <AbsoluteFill style={{ background: C.paper }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: "translateY(40px)",
            }}
          >
            <Cut />
          </div>
          <Bubble />
        </AbsoluteFill>
      )}
      <Captions
        words={REC_WORDS}
        top={Cut ? 1650 : 1270}
        size={Cut ? 54 : 62}
        plate={!!Cut}
      />
    </>
  );
};

export const RECRUIT_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: <Layers />,
    cues: [
      [f(2.26), "pop", 0.3],
      [f(5.2), "scribble", 0.35],
      [WHIP_AT, "whoosh", 0.55],
      ...[14.1, 15.12, 15.82, 16.84].map((s): [number, "tick", number] => [
        f(s) + 5,
        "tick",
        0.3,
      ]),
      [f(29.18), "pop", 0.3],
      [f(53.32), "pop", 0.3],
      [f(63.88), "pop", 0.35],
    ],
  },
];
