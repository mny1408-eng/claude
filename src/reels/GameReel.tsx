// Game reel: "Healthy, unhealthy… atau nampak je healthy?" (recorded 11/10/2026 00:05). An AI host asks, Coach answers.
// Coach left silent gaps in his takes for the host's questions; each question shows its food sticker, an AI bubble, and
// Coach's verdict. At "Nampak tak?" an iris transition opens the lesson part.
// Media (local only, gitignored):
//   public/clips/GAME-full.mp4   six takes joined, 51.25s. The first 2.2s reuse take 1's own listening footage so the
//                                host's intro fits before Coach's "Okey".
//   public/voice/GAME/*.wav      host lines from scripts/gen-voice.mjs content/GAME.voice.json (Gemini TTS). Until they
//                                exist the reel renders silently in those gaps, with the bubbles still on screen.
import React from "react";
import { AbsoluteFill, Audio, Easing, Sequence, getStaticFiles, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Highlight, Mark, Pop, Strike } from "../kit";
import { SceneDef } from "../Reel";
import { BoxStamp, CtaPill } from "./formats/common";
import { Captions } from "./formats/Captions";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";
import { FruitJuice, GranolaBar, NasiLemak, OvernightOats } from "./formats/FoodStickers";
import { GAME_WORDS } from "./GameWords";

const CLIP = "clips/GAME-full.mp4";
const CLIP_LEN = 1540;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const IRIS_AT = f(31.5); // "Nampak tak?"
const IRIS_DUR = 18;

// Host lines: id (matches content/GAME.voice.json), start (s), text.
const HOST: [string, number, string][] = [
  ["intro", 0.15, "Jom main satu game. Healthy, unhealthy… atau nampak je healthy?"],
  ["q1", 5.2, "Nasi lemak?"],
  ["q2", 11.0, "Granola bar?"],
  ["q3", 18.7, "Fruit juice?"],
  ["q4", 25.0, "Overnight oats?"],
];

const hostFile = (id: string) => getStaticFiles().find((s) => s.name.startsWith(`voice/GAME/${id}-`) && /\.(wav|mp3)$/.test(s.name))?.name;

// ---------- game part ----------
type Round = { n: number; host: number; until: number; Sticker: React.FC<{ size?: number }>; name: string; verdict: React.ReactNode; verdictAt: number };

const ROUNDS: Round[] = [
  {
    n: 1, host: 5.2, until: 10.95, Sticker: NasiLemak, name: "Nasi lemak", verdictAt: 6.74,
    verdict: (
      <>
        <BoxStamp delay={f(6.74)} rotate={-4} size={80}>DEPENDS!</BoxStamp>
        <ChipRow at={7.6} items={["portion", "lauk", "sepanjang hari"]} />
      </>
    ),
  },
  {
    n: 2, host: 11.0, until: 18.6, Sticker: GranolaBar, name: "Granola bar", verdictAt: 12.26,
    verdict: (
      <>
        <BoxStamp delay={f(13.62)} rotate={-3} size={70}>CHECK LABEL</BoxStamp>
        <ChipRow at={15.08} items={["protein?", "fibre?", "added sugar?"]} times={[15.08, 15.94, 17.1]} />
      </>
    ),
  },
  {
    n: 3, host: 18.7, until: 24.9, Sticker: FruitJuice, name: "Fruit juice", verdictAt: 20.4,
    verdict: (
      <Pop delay={f(21.78)} rotate={-1.5}>
        <Card style={{ padding: "20px 30px", textAlign: "center", ...OVER_VIDEO }}>
          <div style={{ fontSize: 34, fontWeight: 700, color: C.inkSoft }}>Ada vitamin ✓ tapi…</div>
          <div style={{ fontSize: 50, fontWeight: 800 }}>
            Whole fruit = <Highlight delay={f(23.54)}>lebih fibre</Highlight>
          </div>
        </Card>
      </Pop>
    ),
  },
  {
    n: 4, host: 25.0, until: 31.5, Sticker: OvernightOats, name: "Overnight oats", verdictAt: 27.26,
    verdict: (
      <Pop delay={f(27.26)} rotate={1.5}>
        <Card style={{ padding: "20px 30px", textAlign: "center", ...OVER_VIDEO }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, fontSize: 46, fontWeight: 800 }}>
            <Mark kind="check" delay={f(27.84)} size={46} /> Good breakfast
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, color: C.marker, marginTop: 6 }}>+ adjust protein</div>
        </Card>
      </Pop>
    ),
  },
];

function ChipRow({ at, items, times }: { at: number; items: string[]; times?: number[] }) {
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 14 }}>
      {items.map((x, i) => (
        <Pop key={x} delay={f(times?.[i] ?? at + i * 0.4)} rotate={i % 2 ? 2 : -2}>
          <span style={{ display: "inline-block", fontSize: 40, fontWeight: 800, padding: "8px 22px", borderRadius: 16, background: C.card, ...OVER_VIDEO }}>{x}</span>
        </Pop>
      ))}
    </div>
  );
}

const HostBubble: React.FC<{ at: number; text: string; wide?: boolean }> = ({ at, text, wide }) => (
  <Pop delay={f(at) + 3} rotate={-1}>
    <div style={{ position: "relative", maxWidth: wide ? 900 : 420, background: C.ink, color: C.paper, borderRadius: 26, padding: "16px 24px", boxShadow: "0 12px 26px rgba(20,30,20,0.3)" }}>
      <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: 3, color: C.gold, marginBottom: 4 }}>✦ AI HOST</div>
      <div style={{ fontSize: wide ? 40 : 46, fontWeight: 800, lineHeight: 1.2 }}>{text}</div>
    </div>
  </Pop>
);

const StickerIn: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const fr = useCurrentFrame();
  const p = interpolate(fr, [f(at), f(at) + 12], [0, 1], { easing: Easing.out(Easing.back(1.8)), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const wobble = Math.sin((fr - f(at)) / 9) * 3;
  return <div style={{ transform: `scale(${p}) rotate(${(1 - p) * -30 + wobble}deg)`, transformOrigin: "50% 60%" }}>{children}</div>;
};

const GameLayer: React.FC = () => {
  const fr = useCurrentFrame();
  const t = fr / FPS;
  const round = ROUNDS.find((r) => t >= r.host - 0.1 && t < r.until);
  return (
    <FaceCamOpener clip={CLIP} muted={fr >= IRIS_AT} hook={<>HEALTHY, UNHEALTHY<br />ATAU <span style={{ color: C.marker }}>NAMPAK JE HEALTHY?</span></>} hookSize={54} lowerTop={1420}>
      {round && <div key={round.n} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>{round.verdict}</div>}
      {/* top area: host bubble + sticker */}
      <div style={{ position: "absolute", top: 480 - 1420, left: -10, right: -10, height: 420 }}>
        {t < 4.4 && (
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, display: "flex", justifyContent: "center" }}>
            <HostBubble at={HOST[0][1]} text={HOST[0][2]} wide />
          </div>
        )}
        {round && (
          <React.Fragment key={round.n}>
            <div style={{ position: "absolute", left: 0, top: 10 }}>
              <HostBubble at={round.host} text={`${round.name}?`} />
            </div>
            <div style={{ position: "absolute", right: 0, top: -20 }}>
              <StickerIn at={round.host}>
                <round.Sticker size={350} />
              </StickerIn>
            </div>
            <div style={{ position: "absolute", left: 0, top: 200, fontSize: 30, fontWeight: 800, color: C.ink, background: C.gold, borderRadius: 999, padding: "6px 18px" }}>
              ROUND {round.n}/4
            </div>
          </React.Fragment>
        )}
      </div>
    </FaceCamOpener>
  );
};

// ---------- lesson part ----------
const LessonLayer: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  return (
    <AbsoluteFill>
      <FaceCamOpener clip={CLIP} hook={<>BUKAN BAIK VS JAHAT, TAPI <span style={{ color: C.marker }}>NUTRITION SEBENAR</span></>} hookSize={52} lowerTop={1420}>
        {t < 37.6 ? (
          <>
            <div style={{ fontSize: 40, fontWeight: 800, color: C.paper, background: "rgba(23,60,48,0.92)", borderRadius: 14, padding: "6px 22px" }}>Bukan semua makanan kena label</div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
              {(
                [
                  ["healthy", 34.58],
                  ["unhealthy", 35.24],
                  ["fake healthy", 36.36],
                ] as [string, number][]
              ).map(([x, at], i) => (
                <Pop key={x} delay={f(at)} rotate={i % 2 ? 2 : -2}>
                  <span style={{ position: "relative", display: "inline-block", fontSize: 42, fontWeight: 800, padding: "10px 24px", borderRadius: 16, background: C.card, ...OVER_VIDEO }}>
                    {x}
                    <Strike delay={f(at) + 10} width={6} />
                  </span>
                </Pop>
              ))}
            </div>
          </>
        ) : t < 44.1 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "center" }}>
            <Pop delay={f(39.32)} rotate={-1.5}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 12, fontSize: 44, fontWeight: 800, padding: "10px 26px", borderRadius: 16, background: C.card, color: C.inkSoft, ...OVER_VIDEO }}>
                <Mark kind="cross" delay={f(39.32) + 5} size={40} /> nama makanan
              </span>
            </Pop>
            <Pop delay={f(41.28)} rotate={1.5}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 12, fontSize: 48, fontWeight: 800, padding: "12px 28px", borderRadius: 16, background: C.card, ...OVER_VIDEO }}>
                <Mark kind="check" delay={f(41.28) + 5} size={44} /> <Highlight delay={f(41.66)}>nutrition facts</Highlight>
              </span>
            </Pop>
          </div>
        ) : t < 48.5 ? (
          <Pop delay={f(44.24)} rotate={-1}>
            <Card style={{ padding: "22px 32px", textAlign: "center", ...OVER_VIDEO }}>
              <div style={{ fontSize: 40, fontWeight: 700, color: C.inkSoft }}>
                Healthy eating ≠ <span style={{ textDecoration: "line-through" }}>perfect food</span>
              </div>
              <div style={{ fontSize: 54, fontWeight: 800, marginTop: 4 }}>
                <Highlight delay={f(46.3)}>Better choices</Highlight>, consistently.
              </div>
            </Card>
          </Pop>
        ) : (
          <CtaPill icon="comment" delay={f(49.38)}>
            Komen makanan untuk Part 2
          </CtaPill>
        )}
      </FaceCamOpener>
    </AbsoluteFill>
  );
};

// Iris: the lesson layer opens from a circle centred on the face, with a gold ring on its edge.
const Iris: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fr = useCurrentFrame();
  const p = interpolate(fr, [IRIS_AT, IRIS_AT + IRIS_DUR], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const r = p * 1500;
  if (fr >= IRIS_AT + IRIS_DUR) return <>{children}</>;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `circle(${r}px at 50% 42%)` }}>{children}</AbsoluteFill>
      <svg width={1080} height={1920} style={{ position: "absolute", inset: 0 }}>
        <circle cx={540} cy={806} r={r} fill="none" stroke={C.gold} strokeWidth={14} />
      </svg>
    </AbsoluteFill>
  );
};

const Layers: React.FC = () => {
  const fr = useCurrentFrame();
  return (
    <>
      {fr < IRIS_AT + IRIS_DUR && <GameLayer />}
      {fr >= IRIS_AT && (
        <Iris>
          <LessonLayer />
        </Iris>
      )}
      <Captions words={GAME_WORDS} top={1290} />
      {HOST.map(([id, at]) => {
        const file = hostFile(id);
        return file ? (
          <Sequence key={id} from={Math.round(at * FPS)} layout="none">
            <Audio src={staticFile(file)} />
          </Sequence>
        ) : null;
      })}
    </>
  );
};

export const GAME_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: <Layers />,
    cues: [
      ...ROUNDS.map((r): [number, "pop", number] => [f(r.host), "pop", 0.35]),
      [f(6.74), "stamp", 0.4],
      [f(13.62), "stamp", 0.35],
      [IRIS_AT, "whoosh", 0.55],
      [f(49.38), "pop", 0.3],
    ],
  },
];
