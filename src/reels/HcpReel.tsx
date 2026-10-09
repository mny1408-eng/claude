// Talk reel: "Siapa layak ajar pemakanan? Dietitian je ke?" (recorded 10/09/2026 night, Teleprompter takes 22:47–22:52).
// Hook take punched in close, then a whip-pan into the main talk (cropped from the top so the bottom of the frame, the
// sarong, is out of shot). Design cutaways with a face bubble carry the stats and the 100 × 30 example.
// Media (local only, gitignored):
//   public/clips/HCP-full.mp4   nine takes trimmed and joined, 81.15s. Take 1 loses its 4s of dead air before the hook;
//                               take 5 loses its trailing "So personally…" (said again at the start of take 6).
// Stats as spoken; they match NHMS 2019 (adults overweight/obese 50.1%; ~95% not eating enough fruit and vegetables).
import React from "react";
import { AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C, FPS } from "../theme";
import { Card, Highlight, Line, Mark, Pop } from "../kit";
import { SceneDef } from "../Reel";
import { BoxStamp, Chip, CtaPill, Stack } from "./formats/common";
import { Captions } from "./formats/Captions";
import { FaceCamOpener, OVER_VIDEO } from "./formats/FaceCamOpener";
import { WhipPan } from "./formats/WhipPan";
import { HCP_WORDS } from "./HcpWords";

const CLIP = "clips/HCP-full.mp4";
const CLIP_LEN = 2434;
const f = (sec: number) => Math.round(sec * FPS) - 3;

const WHIP_AT = Math.round(5.4 * FPS) - 5; // just before "Okey, okey, okey"
const ZOOM = 1.2; // crops ~320px off the bottom (sarong)
const HOOK = <>SIAPA LAYAK AJAR <span style={{ color: C.marker }}>PEMAKANAN?</span></>;

const CUTS: Record<string, [number, number]> = {
  stats: [14.25, 23.05],
  multiply: [23.05, 42.55],
  refer: [56.5, 72.55],
};

// ---------- hook (punched in) ----------
const HookLayer: React.FC<{ muted?: boolean }> = ({ muted = false }) => (
  <FaceCamOpener clip={CLIP} muted={muted} zoom={1.38} hook={HOOK} hookSize={62} lowerTop={1420}>
    <div style={{ background: "rgba(247,245,237,0.94)", borderRadius: 20, padding: "8px 14px" }}>
      <BoxStamp delay={f(4.1)} rotate={-4} size={84}>
        DIETITIAN JE KE?
      </BoxStamp>
    </div>
  </FaceCamOpener>
);

// ---------- face sections ----------
const DOES: [string, number][] = [
  ["susun sarapan", 50.36],
  ["cukupkan protein", 51.76],
  ["tambah serat", 53.48],
  ["konsisten dengan rutin harian", 54.5],
];

const FaceLower: React.FC = () => {
  const t = useCurrentFrame() / FPS;
  if (t < 14.25)
    return (
      <Pop delay={f(7.74)} rotate={-1.5}>
        <Card style={{ width: 860, padding: "22px 30px", ...OVER_VIDEO }}>
          <div style={{ fontSize: 34, fontWeight: 800, color: C.marker, letterSpacing: 3 }}>RESPECT DIETITIAN</div>
          <div style={{ fontSize: 44, fontWeight: 800, marginTop: 8 }}>Pakar dalam:</div>
          <Pop delay={f(10.08)}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 42, fontWeight: 700, marginTop: 6 }}>
              <Mark kind="check" delay={f(10.08) + 5} size={42} /> dietetics
            </div>
          </Pop>
          <Pop delay={f(10.76)}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 42, fontWeight: 700, marginTop: 6 }}>
              <Mark kind="check" delay={f(10.76) + 5} size={42} /> medical nutrition therapy
            </div>
          </Pop>
        </Card>
      </Pop>
    );
  if (t < 56.5)
    return (
      <>
        <Pop delay={f(43.2)} rotate={-1.5}>
          <div style={{ background: C.ink, color: C.paper, fontSize: 40, fontWeight: 800, borderRadius: 18, padding: "14px 26px", textAlign: "center", ...OVER_VIDEO }}>
            Bukan semua perlu <span style={{ color: C.gold }}>clinical consultation</span>
          </div>
        </Pop>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, width: 960 }}>
          {DOES.map(([d, at], i) => (
            <Pop key={d} delay={f(at)} rotate={i % 2 ? 1.5 : -1.5}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 38, fontWeight: 800, padding: "10px 22px", borderRadius: 16, background: C.card, ...OVER_VIDEO }}>
                <Mark kind="check" delay={f(at) + 5} size={36} />
                {d}
              </span>
            </Pop>
          ))}
        </div>
      </>
    );
  if (t < 75.3)
    return (
      <Pop delay={f(72.7)} rotate={-1}>
        <Card style={{ width: 900, padding: "26px 34px", textAlign: "center", ...OVER_VIDEO }}>
          <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.2 }}>
            Protect the <Highlight delay={f(73.24)}>standard</Highlight> of care,
          </div>
          <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.2, marginTop: 6, color: C.inkSoft }}>not the territory of care.</div>
        </Card>
      </Pop>
    );
  return (
    <>
      <Pop delay={f(76.44)} rotate={-1}>
        <Card style={{ width: 900, padding: "22px 30px", textAlign: "center", ...OVER_VIDEO }}>
          <div style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.25 }}>
            Nutrition education:
            <br />
            <span style={{ color: C.marker }}>tanggungjawab bersama</span> atau profession tertentu?
          </div>
        </Card>
      </Pop>
      <CtaPill icon="comment" delay={f(80.32)}>
        Komen kat bawah
      </CtaPill>
    </>
  );
};

const MainLayer: React.FC = () => (
  <FaceCamOpener clip={CLIP} zoom={ZOOM} hook={HOOK} hookSize={62} lowerTop={1350}>
    <FaceLower />
  </FaceCamOpener>
);

// ---------- cutaways ----------
const Bubble: React.FC = () => (
  <div style={{ position: "absolute", right: 50, top: 1350, width: 240, height: 240, borderRadius: "50%", overflow: "hidden", border: `8px solid ${C.card}`, boxShadow: "0 12px 30px rgba(20,30,20,0.3)" }}>
    <OffthreadVideo src={staticFile(CLIP)} muted style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 18%" }} />
  </div>
);

const useCount = (to: number, at: number, dur = 20) => Math.round(interpolate(useCurrentFrame(), [at, at + dur], [0, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

const StatCard: React.FC<{ at: number; value: number; prefix?: string; text: React.ReactNode; rotate: number }> = ({ at, value, prefix = "", text, rotate }) => {
  const n = useCount(value, at);
  const fill = interpolate(useCurrentFrame(), [at, at + 20], [0, value], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <Pop delay={at} rotate={rotate}>
      <Card style={{ width: 900, padding: "28px 36px" }}>
        <div style={{ fontSize: 120, fontWeight: 800, color: C.marker, lineHeight: 1 }}>
          {prefix}
          {n}%
        </div>
        <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.2, marginTop: 10 }}>{text}</div>
        <div style={{ height: 22, borderRadius: 11, background: "#E8E4D6", marginTop: 20, overflow: "hidden" }}>
          <div style={{ width: `${fill}%`, height: "100%", background: C.ink, borderRadius: 11 }} />
        </div>
      </Card>
    </Pop>
  );
};

const Stats: React.FC = () => (
  <>
    <Stack top={230} gap={8}>
      <Line delay={f(14.46)} size={36} weight={800} color={C.marker} style={{ letterSpacing: 4 }}>
        DEKAT MALAYSIA
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 330, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <StatCard at={f(15.3)} value={50} prefix=">" text={<>orang dewasa <Highlight delay={f(17.4)}>berat badan berlebihan</Highlight> & obesiti</>} rotate={-1} />
    </div>
    <div style={{ position: "absolute", top: 790, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <StatCard at={f(20.24)} value={95} prefix=">" text={<>tak cukup <Highlight delay={f(22.0)}>buah & sayur</Highlight></>} rotate={1} />
    </div>
    <div style={{ position: "absolute", top: 1250, left: 80, fontSize: 28, fontWeight: 600, color: C.inkSoft }}>Sumber: NHMS 2019</div>
  </>
);

const Dots: React.FC<{ at: number }> = ({ at }) => {
  const fr = useCurrentFrame();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(20, 30px)", gap: 8 }}>
      {Array.from({ length: 100 }, (_, i) => {
        const on = fr >= at + i * 0.25;
        return <div key={i} style={{ width: 30, height: 30, borderRadius: "50%", background: on ? C.ink : "#E3DFD0", transform: `scale(${on ? 1 : 0.6})` }} />;
      })}
    </div>
  );
};

const Multiply: React.FC = () => {
  const total = useCount(3000, f(37.32), 24);
  return (
    <>
      <Stack top={220} gap={8}>
        <Line delay={f(23.36)} size={36} weight={800} color={C.marker} style={{ letterSpacing: 4 }}>
          CUBA BAYANGKAN
        </Line>
      </Stack>
      <Stack top={300} gap={18}>
        <Pop delay={f(24.54)} rotate={-1.5}>
          <Card style={{ padding: "18px 34px", fontSize: 46, fontWeight: 800 }}>1 pharmacist & coach</Card>
        </Pop>
        <Pop delay={f(27.1)}>
          <div style={{ fontSize: 38, fontWeight: 700, color: C.inkSoft }}>↓ share basic nutrition education</div>
        </Pop>
        <Pop delay={f(28.9)}>
          <Card style={{ padding: "22px 30px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 46, fontWeight: 800 }}>100 wellness coaches</div>
            <Dots at={f(28.9)} />
          </Card>
        </Pop>
        <Pop delay={f(34.24)}>
          <div style={{ fontSize: 46, fontWeight: 800 }}>
            × <Highlight delay={f(35.34)}>30 orang</Highlight> setiap coach
          </div>
        </Pop>
        <Pop delay={f(37.32)} rotate={-2}>
          <div style={{ background: C.ink, color: C.paper, borderRadius: 24, padding: "18px 40px", textAlign: "center" }}>
            <div style={{ fontSize: 100, fontWeight: 800, lineHeight: 1 }}>{total.toLocaleString("en-US")}</div>
            <div style={{ fontSize: 38, fontWeight: 700, color: C.gold, marginTop: 6 }}>orang berpotensi dapat manfaat</div>
          </div>
        </Pop>
      </Stack>
    </>
  );
};

const Lane: React.FC<{ at: number; tag: string; title: React.ReactNode; result: React.ReactNode; resultAt: number; tone: "refer" | "help"; rotate: number }> = ({ at, tag, title, result, resultAt, tone, rotate }) => (
  <Pop delay={at} rotate={rotate}>
    <div style={{ width: 920, background: C.card, borderRadius: 22, overflow: "hidden", boxShadow: "0 16px 36px rgba(20,30,20,0.18)" }}>
      <div style={{ background: tone === "refer" ? C.marker : C.ink, color: C.paper, fontSize: 30, fontWeight: 800, letterSpacing: 2, padding: "12px 28px" }}>{tag}</div>
      <div style={{ padding: "22px 30px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.15 }}>{title}</div>
        <Pop delay={resultAt}>
          <div style={{ fontSize: 42, fontWeight: 700, color: C.inkSoft, lineHeight: 1.25 }}>{result}</div>
        </Pop>
      </div>
    </div>
  </Pop>
);

const Refer: React.FC = () => (
  <>
    <div style={{ position: "absolute", top: 260, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Lane
        at={f(57.5)}
        tone="refer"
        tag="MEDICAL CONDITION / THERAPEUTIC DIET"
        title={<>Kena tahu bila perlu refer</>}
        result={<>→ <Highlight delay={f(63.08)}>dietitian</Highlight> & healthcare team</>}
        resultAt={f(61.3)}
        rotate={-1}
      />
    </div>
    <div style={{ position: "absolute", top: 720, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Lane
        at={f(65.84)}
        tone="help"
        tag="BASIC WELLNESS EDUCATION"
        title={<>Perlu lebih ramai orang <Highlight delay={f(69.78)}>terlatih</Highlight></>}
        result={<>untuk membantu, bukannya kurang</>}
        resultAt={f(70.18)}
        rotate={1}
      />
    </div>
    <div style={{ position: "absolute", top: 1150, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Chip delay={f(71.28)} rotate={-2} size={44}>
        bukannya kurang
      </Chip>
    </div>
  </>
);

const SCENES: Record<string, React.FC> = { stats: Stats, multiply: Multiply, refer: Refer };

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
          <div style={{ position: "absolute", inset: 0, transform: "translateY(40px)" }}>
            <Cut />
          </div>
          <Bubble />
        </AbsoluteFill>
      )}
      <Captions words={HCP_WORDS} top={Cut ? 1650 : 1150} size={Cut ? 54 : 62} plate={!!Cut} />
    </>
  );
};

export const HCP_SCENES: SceneDef[] = [
  {
    id: "talk",
    dur: CLIP_LEN,
    el: <Layers />,
    cues: [
      [f(4.1), "stamp", 0.4],
      [WHIP_AT, "whoosh", 0.55],
      [f(15.3), "pop", 0.3],
      [f(20.24), "pop", 0.3],
      [f(37.32), "chime", 0.3],
      [f(61.3), "pop", 0.3],
      [f(80.32), "pop", 0.3],
    ],
  },
];
