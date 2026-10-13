// Reel 2 (13/10) "Masih Pharmacist, Tapi Saya Bina Sesuatu" — Reel B (hybrid: face-cam opener + voice + design).
// Source: Notion 📅 13/10/2026 — AI, Ubat dan Pharmacist, IG REEL 2 (Story Series EP6; no financial claims).
// Overlays follow the Notion list: MASIH PHARMACIST · KERJA UTAMA TETAP UTAMA · COACHING DALAM MASA YANG ADA · COMMENT CURIOUS.
// Transition: in the opener's last frames the video shrinks into a polaroid that stays pinned top-right through the
// illustrated scenes. Illustrations are drawn here (SVG), in the WDT palette.
// Media (local only, gitignored):
//   public/clips/R1310-bina-opener.mp4   Teleprompter 13/10 21:49, src 0.00–5.30: "Saya masih lagi pharmacist, tapi saya
//                                         sedang membina sesuatu di luar kerja hakiki."
//   public/voice/R1310-bina/source.mp3   TeleCue 13/10 21:50, full: "Jangan salah faham tau…" through "…kita boleh sembang."
// Times below are seconds in the TeleCue source (Whisper medium, unprompted).
import React from "react";
import { AbsoluteFill, Audio, Easing, Img, Loop, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { C } from "../theme";
import { Card, Highlight, Line, Pop } from "../kit";
import { Cue } from "../sound";
import { SceneDef } from "../Reel";
import { BoxStamp, Chip, CtaPill, SAFE, Stack } from "./formats/common";
import { FaceCamOpener } from "./formats/FaceCamOpener";
import { voiceTimeline } from "./formats/voiceTimeline";

const CLIP = "clips/R1310-bina-opener.mp4";
const AUDIO = "voice/R1310-bina/source.mp3";
const CLIP_LEN = 159;
const tl = voiceTimeline({ clipLen: CLIP_LEN, clipFrom: 0, voiceFrom: 0 });
const w = tl.w;

const starts = {
  utama: CLIP_LEN,
  coaching: tl.start(7.14), // "Apa yang saya bina ni adalah coaching…"
  masa: tl.start(12.78), // "Saya buat dalam masa yang saya ada…"
  dulu: tl.start(20.4), // "Dulu saya jenis cepat cakap semua boleh…"
  kenapa: tl.start(28.72), // "Kenapa saya buat?"
  cta: tl.start(36.66), // "Kalau awak curious…"
  end: tl.end(39.1, 2.4),
};

// ---------- polaroid (opener video shrinks into it) ----------
const POL = { x: 1080 - SAFE.left - 250, y: 150, w: 250, h: 310, rot: 5 };
const SHRINK = 18; // frames

const PolaroidFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "absolute", left: POL.x, top: POL.y, width: POL.w, transform: `rotate(${POL.rot}deg)`, background: "#fff", padding: "12px 12px 44px", boxShadow: "0 14px 30px rgba(20,30,20,0.28)" }}>
    <div style={{ width: POL.w - 24, height: POL.h - 56, overflow: "hidden" }}>{children}</div>
    <div style={{ position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center", fontSize: 22, fontWeight: 800, color: C.ink, letterSpacing: 1 }}>masih pharmacist ✓</div>
  </div>
);

const Opener: React.FC = () => {
  const fr = useCurrentFrame();
  const p = interpolate(fr, [CLIP_LEN - SHRINK, CLIP_LEN], [0, 1], { easing: Easing.inOut(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const stamp = Math.max(0, Math.round(1.3 * 30) - 3);
  if (p === 0)
    return (
      <FaceCamOpener clip={CLIP} hook={<>MASIH PHARMACIST. <span style={{ color: C.marker }}>TAPI SAYA BINA SESUATU.</span></>} hookSize={56} lowerTop={1280}>
        <div style={{ background: "rgba(247,245,237,0.92)", borderRadius: 18, padding: "6px 10px", opacity: fr >= stamp ? 1 : 0 }}>
          <BoxStamp delay={stamp} rotate={-4} size={70}>
            MASIH PHARMACIST
          </BoxStamp>
        </div>
      </FaceCamOpener>
    );
  // shrink: full frame -> polaroid box
  const lerp = (a: number, b: number) => a + (b - a) * p;
  const boxW = lerp(1080, POL.w - 24);
  const boxH = lerp(1920, POL.h - 56);
  const left = lerp(0, POL.x + 12);
  const top = lerp(0, POL.y + 12);
  return (
    <AbsoluteFill style={{ background: C.paper }}>
      <div
        style={{
          position: "absolute",
          left: left - lerp(0, 12),
          top: top - lerp(0, 12),
          padding: `${lerp(0, 12)}px ${lerp(0, 12)}px ${lerp(0, 44)}px`,
          background: "#fff",
          transform: `rotate(${lerp(0, POL.rot)}deg)`,
          boxShadow: `0 14px 30px rgba(20,30,20,${0.28 * p})`,
        }}
      >
        <div style={{ width: boxW, height: boxH, overflow: "hidden" }}>
          <OffthreadVideo src={staticFile(CLIP)} muted style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------- illustrations ----------
const Hospital: React.FC = () => (
  <svg viewBox="0 0 200 200" width={300} height={300}>
    <rect x={30} y={60} width={140} height={120} rx={10} fill="#fff" stroke={C.ink} strokeWidth={6} />
    <rect x={80} y={30} width={40} height={40} rx={6} fill={C.marker} />
    <path d="M 100 38 V 62 M 88 50 H 112" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={48 + i * 40} y={86} width={24} height={22} rx={3} fill={C.gold} />
    ))}
    <rect x={84} y={132} width={32} height={48} rx={4} fill={C.ink} />
  </svg>
);

const Research: React.FC = () => (
  <svg viewBox="0 0 200 200" width={300} height={300}>
    <rect x={40} y={36} width={110} height={140} rx={8} fill="#fff" stroke={C.ink} strokeWidth={6} />
    {[64, 84, 104].map((y) => (
      <line key={y} x1={58} y1={y} x2={132} y2={y} stroke={C.inkSoft} strokeWidth={5} strokeLinecap="round" />
    ))}
    <polyline points="58,150 80,132 98,142 130,116" fill="none" stroke={C.marker} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
    <circle cx={146} cy={140} r={22} fill="none" stroke={C.ink} strokeWidth={7} />
    <line x1={162} y1={156} x2={182} y2={176} stroke={C.ink} strokeWidth={9} strokeLinecap="round" />
  </svg>
);

const Heart: React.FC<{ size?: number }> = ({ size = 90 }) => (
  <svg viewBox="0 0 100 90" width={size} height={size * 0.9}>
    <path d="M 50 86 C 20 64, 4 46, 4 28 C 4 12, 16 4, 28 4 C 38 4, 46 10, 50 18 C 54 10, 62 4, 72 4 C 84 4, 96 12, 96 28 C 96 46, 80 64, 50 86 Z" fill={C.marker} />
  </svg>
);

const Plate: React.FC = () => (
  <svg viewBox="0 0 200 200" width={280} height={280}>
    <circle cx={100} cy={100} r={84} fill="#fff" stroke={C.ink} strokeWidth={6} />
    <path d="M 100 100 L 100 30 A 70 70 0 0 1 170 100 Z" fill="#7CB46B" />
    <path d="M 100 100 L 170 100 A 70 70 0 0 1 100 170 Z" fill={C.marker} />
    <path d="M 100 100 L 100 170 A 70 70 0 0 1 30 100 Z" fill={C.gold} />
    <path d="M 100 100 L 30 100 A 70 70 0 0 1 100 30 Z" fill="#9CC7D9" />
  </svg>
);

const Shoe: React.FC = () => (
  <svg viewBox="0 0 200 200" width={280} height={280}>
    <path d="M 24 128 L 40 70 Q 70 84 92 80 L 120 104 Q 168 112 178 136 L 178 150 L 24 150 Z" fill={C.ink} />
    <path d="M 24 150 L 178 150 L 178 162 L 24 162 Z" fill={C.gold} />
    {[0, 1, 2].map((i) => (
      <line key={i} x1={70 + i * 14} y1={88 + i * 6} x2={84 + i * 14} y2={98 + i * 6} stroke="#fff" strokeWidth={5} strokeLinecap="round" />
    ))}
  </svg>
);

const Streak: React.FC<{ delay: number }> = ({ delay }) => {
  const days = [1, 1, 0, 1, 0, 0, 1];
  return (
    <div style={{ display: "flex", gap: 10 }}>
      {days.map((d, i) => (
        <Pop key={i} delay={delay + i * 3}>
          <div style={{ width: 100, height: 100, borderRadius: 18, background: d ? C.ink : "#fff", border: `4px solid ${C.ink}`, color: d ? C.gold : C.marker, fontSize: 48, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{d ? "✓" : "✗"}</div>
        </Pop>
      ))}
    </div>
  );
};

const Clock: React.FC<{ fill: number }> = ({ fill }) => {
  const a = fill * 2 * Math.PI;
  const x = 100 + 80 * Math.sin(a);
  const y = 100 - 80 * Math.cos(a);
  return (
    <svg viewBox="0 0 200 200" width={440} height={440}>
      <circle cx={100} cy={100} r={88} fill="#fff" stroke={C.ink} strokeWidth={8} />
      {fill > 0 && <path d={`M 100 100 L 100 20 A 80 80 0 ${fill > 0.5 ? 1 : 0} 1 ${x} ${y} Z`} fill={C.gold} />}
      {[...Array(12)].map((_, i) => (
        <line key={i} x1={100 + 76 * Math.sin((i * Math.PI) / 6)} y1={100 - 76 * Math.cos((i * Math.PI) / 6)} x2={100 + 86 * Math.sin((i * Math.PI) / 6)} y2={100 - 86 * Math.cos((i * Math.PI) / 6)} stroke={C.ink} strokeWidth={4} />
      ))}
      <line x1={100} y1={100} x2={100} y2={46} stroke={C.ink} strokeWidth={7} strokeLinecap="round" />
      <line x1={100} y1={100} x2={140} y2={112} stroke={C.ink} strokeWidth={6} strokeLinecap="round" />
      <circle cx={100} cy={100} r={7} fill={C.ink} />
    </svg>
  );
};

const Battery: React.FC<{ level: number }> = ({ level }) => (
  <svg viewBox="0 0 200 100" width={380} height={190}>
    <rect x={8} y={14} width={170} height={72} rx={12} fill="#fff" stroke={C.ink} strokeWidth={7} />
    <rect x={180} y={36} width={14} height={28} rx={4} fill={C.ink} />
    <rect x={18} y={24} width={150 * level} height={52} rx={6} fill={level < 0.3 ? C.marker : "#7CB46B"} />
  </svg>
);

const Fence: React.FC = () => (
  <svg viewBox="0 0 240 120" width={460} height={230}>
    {[0, 1, 2, 3, 4].map((i) => (
      <path key={i} d={`M ${20 + i * 48} 110 V 34 L ${36 + i * 48} 14 L ${52 + i * 48} 34 V 110 Z`} fill="#fff" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    ))}
    <rect x={10} y={52} width={220} height={14} fill={C.gold} stroke={C.ink} strokeWidth={4} />
    <rect x={10} y={84} width={220} height={14} fill={C.gold} stroke={C.ink} strokeWidth={4} />
  </svg>
);

const Book: React.FC = () => (
  <svg viewBox="0 0 200 160" width={180} height={144}>
    <path d="M 100 30 Q 60 10 16 22 V 140 Q 60 128 100 148 Z" fill="#fff" stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
    <path d="M 100 30 Q 140 10 184 22 V 140 Q 140 128 100 148 Z" fill={C.gold} stroke={C.ink} strokeWidth={6} strokeLinejoin="round" />
  </svg>
);

const House: React.FC = () => (
  <svg viewBox="0 0 200 160" width={180} height={144}>
    <path d="M 20 76 L 100 14 L 180 76" fill="none" stroke={C.ink} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    <rect x={40} y={70} width={120} height={80} fill="#fff" stroke={C.ink} strokeWidth={6} />
    <circle cx={80} cy={100} r={10} fill={C.marker} />
    <circle cx={110} cy={104} r={8} fill={C.marker} />
    <circle cx={132} cy={108} r={6} fill={C.marker} />
    <path d="M 70 150 Q 80 118 90 150 M 102 150 Q 110 124 118 150 M 126 150 Q 132 130 138 150" fill={C.marker} />
  </svg>
);

const People: React.FC = () => (
  <svg viewBox="0 0 200 160" width={180} height={144}>
    {[50, 100, 150].map((x, i) => (
      <g key={x}>
        <circle cx={x} cy={56 - (i === 1 ? 10 : 0)} r={18} fill={i === 1 ? C.ink : C.inkSoft} />
        <path d={`M ${x - 28} 140 Q ${x - 28} ${92 - (i === 1 ? 10 : 0)} ${x} ${88 - (i === 1 ? 10 : 0)} Q ${x + 28} ${92 - (i === 1 ? 10 : 0)} ${x + 28} 140 Z`} fill={i === 1 ? C.ink : C.inkSoft} />
      </g>
    ))}
    <g transform="translate(130 6) scale(0.4)">
      <path d="M 50 86 C 20 64, 4 46, 4 28 C 4 12, 16 4, 28 4 C 38 4, 46 10, 50 18 C 54 10, 62 4, 72 4 C 84 4, 96 12, 96 28 C 96 46, 80 64, 50 86 Z" fill={C.marker} />
    </g>
  </svg>
);

// Event photos Coach sent (Coach is fine showing the brand: slides, screen and product table kept in frame).
const Photo: React.FC<{ src: string; w: number; h: number; delay: number; rot: number; label?: string }> = ({ src, w: pw, h, delay, rot, label }) => (
  <Pop delay={delay} rotate={rot}>
    <div style={{ background: "#fff", padding: "10px 10px 38px", boxShadow: "0 14px 30px rgba(20,30,20,0.25)", position: "relative" }}>
      <Img src={staticFile(src)} style={{ width: pw, height: h, objectFit: "cover", objectPosition: "50% 30%", display: "block" }} />
      {label && <div style={{ position: "absolute", bottom: 6, left: 0, right: 0, textAlign: "center", fontSize: 22, fontWeight: 800, color: C.ink }}>{label}</div>}
    </div>
  </Pop>
);

// ---------- scenes ----------
const Center: React.FC<{ top: number; children: React.ReactNode }> = ({ top, children }) => (
  <div style={{ position: "absolute", top, left: SAFE.left, right: SAFE.left, display: "flex", justifyContent: "center", alignItems: "center", gap: 30 }}>{children}</div>
);

const Utama: React.FC = () => {
  const s = starts.utama;
  return (
    <AbsoluteFill>
      <Stack top={260} gap={8}>
        <Line delay={w(s, 0.3)} size={60} weight={800} style={{ marginRight: 280 }}>
          Jangan salah faham…
        </Line>
      </Stack>
      <Center top={520}>
        <Pop delay={w(s, 2.24)} rotate={-3}>
          <div style={{ textAlign: "center" }}>
            <Hospital />
            <div style={{ fontSize: 40, fontWeight: 800 }}>kerja klinikal</div>
          </div>
        </Pop>
        <Pop delay={w(s, 3.02)} rotate={3}>
          <div style={{ textAlign: "center" }}>
            <Research />
            <div style={{ fontSize: 40, fontWeight: 800 }}>research</div>
          </div>
        </Pop>
      </Center>
      <Center top={960}>
        <Pop delay={w(s, 3.96)}>
          <Heart size={150} />
        </Pop>
      </Center>
      <Center top={1180}>
        <BoxStamp delay={w(s, 4.84)} rotate={-3} size={64}>
          KERJA UTAMA TETAP UTAMA
        </BoxStamp>
      </Center>
    </AbsoluteFill>
  );
};

const Coaching: React.FC = () => {
  const s = starts.coaching;
  return (
    <AbsoluteFill>
      <Stack top={250} gap={8}>
        <Line delay={w(s, 7.14)} size={46} weight={700} color={C.inkSoft} style={{ marginRight: 280 }}>
          Apa yang saya bina:
        </Line>
        <Line delay={w(s, 8.24)} size={72} weight={800} style={{ marginRight: 280 }}>
          <Highlight delay={w(s, 8.5)}>coaching</Highlight>
        </Line>
      </Stack>
      <Center top={440}>
        <Pop delay={w(s, 8.98)} rotate={-3}>
          <div style={{ textAlign: "center" }}>
            <Plate />
            <div style={{ fontSize: 40, fontWeight: 800 }}>nutrition</div>
          </div>
        </Pop>
        <div style={{ fontSize: 70, fontWeight: 800, color: C.marker }}>+</div>
        <Pop delay={w(s, 9.72)} rotate={3}>
          <div style={{ textAlign: "center" }}>
            <Shoe />
            <div style={{ fontSize: 40, fontWeight: 800 }}>lifestyle</div>
          </div>
        </Pop>
      </Center>
      <Stack top={840} gap={18}>
        <Line delay={w(s, 10.5)} size={46} weight={700}>
          untuk orang yang <Highlight delay={w(s, 10.9)}>susah nak konsisten</Highlight>
        </Line>
        <Streak delay={w(s, 11.0)} />
      </Stack>
      <Center top={1100}>
        <Photo src="img/event-present.jpg" w={250} h={300} delay={w(s, 8.6)} rot={-4} label="sesi coaching" />
      </Center>
    </AbsoluteFill>
  );
};

const Masa: React.FC = () => {
  const s = starts.masa;
  const fr = useCurrentFrame();
  const fill = interpolate(fr, [w(s, 13.44), w(s, 14.4)], [0, 0.25], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Stack top={250} gap={8}>
        <Line delay={w(s, 12.78)} size={50} weight={700} style={{ marginRight: 280 }}>
          Dalam masa yang saya ada
        </Line>
      </Stack>
      <Center top={400}>
        <Pop delay={w(s, 13.0)}>
          <Clock fill={fill} />
        </Pop>
      </Center>
      <Center top={900}>
        <BoxStamp delay={w(s, 15.44)} rotate={-3} size={58}>
          COACHING DALAM
          <br />
          MASA YANG ADA
        </BoxStamp>
      </Center>
      <Stack top={1170} gap={12}>
        <Line delay={w(s, 15.68)} size={56} weight={800}>
          memang ada <Highlight delay={w(s, 15.9)}>limit</Highlight>
        </Line>
        <Line delay={w(s, 16.52)} size={42} weight={700} color={C.inkSoft}>
          tak boleh layan semua orang, satu-satu masa
        </Line>
      </Stack>
    </AbsoluteFill>
  );
};

const Dulu: React.FC = () => {
  const s = starts.dulu;
  const fr = useCurrentFrame();
  const level = interpolate(fr, [w(s, 22.34), w(s, 24.9)], [1, 0.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const now = fr >= w(s, 25.92);
  return (
    <AbsoluteFill>
      {!now ? (
        <>
          <Stack top={250} gap={8}>
            <Line delay={w(s, 20.4)} size={46} weight={700} color={C.inkSoft} style={{ marginRight: 280 }}>
              Dulu…
            </Line>
          </Stack>
          <Center top={500}>
            <Pop delay={w(s, 21.74)} rotate={-4}>
              <div style={{ position: "relative", background: C.ink, color: C.paper, borderRadius: 30, padding: "26px 40px", fontSize: 56, fontWeight: 800, maxWidth: 860, textAlign: "center" }}>
                “Semua boleh! Yes boss!”
                <div style={{ position: "absolute", bottom: -26, left: 70, width: 0, height: 0, borderLeft: "20px solid transparent", borderRight: "20px solid transparent", borderTop: `30px solid ${C.ink}` }} />
              </div>
            </Pop>
          </Center>
          <Center top={800}>
            <Pop delay={w(s, 22.34)}>
              <Battery level={level} />
            </Pop>
          </Center>
          <Stack top={1080} gap={8}>
            <Line delay={w(s, 24.04)} size={62} weight={800}>
              lepas tu… <Highlight delay={w(s, 24.6)}>penat sendiri</Highlight>
            </Line>
          </Stack>
        </>
      ) : (
        <>
          <Stack top={250} gap={8}>
            <Line delay={w(s, 25.92)} size={50} weight={700} style={{ marginRight: 280 }}>
              Sekarang saya belajar
            </Line>
          </Stack>
          <Center top={450}>
            <Pop delay={w(s, 26.7)}>
              <Fence />
            </Pop>
          </Center>
          <Stack top={800} gap={20}>
            <Chip delay={w(s, 26.7)} rotate={-2} size={56}>
              jaga masa
            </Chip>
            <Chip delay={w(s, 28.18)} rotate={2} size={56}>
              jaga boundaries
            </Chip>
          </Stack>
        </>
      )}
    </AbsoluteFill>
  );
};

const WHY: [React.FC, string, number][] = [
  [Book, "terus belajar", 30.58],
  [House, "bina sesuatu untuk family", 31.42],
  [People, "bantu lebih ramai jaga kesihatan", 33.92],
];

const Kenapa: React.FC = () => {
  const s = starts.kenapa;
  return (
    <AbsoluteFill>
      <Stack top={250} gap={8}>
        <Line delay={w(s, 28.72)} size={72} weight={800} style={{ marginRight: 280 }}>
          Kenapa saya buat?
        </Line>
      </Stack>
      <div style={{ position: "absolute", top: 480, left: SAFE.left, right: SAFE.left, display: "flex", flexDirection: "column", gap: 26, alignItems: "center" }}>
        {WHY.map(([Icon, label, at], i) => (
          <Pop key={label} delay={w(s, at)} rotate={i % 2 ? 1.5 : -1.5}>
            <Card style={{ width: 860, padding: "14px 30px", display: "flex", alignItems: "center", gap: 26 }}>
              <div style={{ transform: "scale(0.7)", margin: "-20px -20px" }}>
                <Icon />
              </div>
              <span style={{ fontSize: 48, fontWeight: 800, lineHeight: 1.2 }}>{label}</span>
            </Card>
          </Pop>
        ))}
      </div>
      <Center top={1060}>
        <Photo src="img/event-stage.jpg" w={250} h={310} delay={w(s, 33.92)} rot={-4} />
        <Photo src="img/event-help.jpg" w={300} h={310} delay={w(s, 34.58)} rot={3} />
      </Center>
    </AbsoluteFill>
  );
};

const Cta: React.FC = () => {
  const s = starts.cta;
  return (
    <AbsoluteFill>
      <Stack top={620} gap={16}>
        <Line delay={w(s, 36.66)} size={60} weight={800}>
          Kalau awak <Highlight delay={w(s, 37.0)}>curious</Highlight>…
        </Line>
      </Stack>
      <Stack top={860} gap={20}>
        <CtaPill icon="comment" delay={w(s, 37.6)}>
          Comment CURIOUS
        </CtaPill>
        <Line delay={w(s, 38.72)} size={44} weight={700} color={C.inkSoft}>
          kita boleh sembang.
        </Line>
      </Stack>
    </AbsoluteFill>
  );
};

// Polaroid pinned through the illustrated part (the opener clip looped, muted, so it keeps moving), plus the voice track.
export const R1310BinaOverlay: React.FC = () => (
  <>
    <Sequence from={CLIP_LEN} layout="none">
      <PolaroidFrame>
        <Loop durationInFrames={CLIP_LEN}>
          <OffthreadVideo src={staticFile(CLIP)} muted style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%" }} />
        </Loop>
      </PolaroidFrame>
    </Sequence>
    <Sequence from={tl.voiceFrame} layout="none">
      <Audio src={staticFile(AUDIO)} />
    </Sequence>
  </>
);

const soft = (cues: Cue[], k = 0.6): Cue[] => cues.map(([f, s, x]) => [f, s, x * k]);

export const R1310_BINA_REAL_SCENES: SceneDef[] = [
  { id: "opener", dur: CLIP_LEN, el: <Opener />, cues: soft([[Math.round(1.3 * 30) - 3, "stamp", 0.6], [CLIP_LEN - SHRINK, "whoosh", 0.7]], 0.6) },
  { id: "utama", dur: starts.coaching - starts.utama, el: <Utama />, cues: soft([[w(starts.utama, 2.24), "pop", 0.4], [w(starts.utama, 3.02), "pop", 0.4], [w(starts.utama, 4.84), "stamp", 0.6]]) },
  { id: "coaching", dur: starts.masa - starts.coaching, el: <Coaching />, cues: soft([[w(starts.coaching, 8.98), "pop", 0.4], [w(starts.coaching, 9.72), "pop", 0.4]]) },
  { id: "masa", dur: starts.dulu - starts.masa, el: <Masa />, cues: soft([[w(starts.masa, 13.0), "tick", 0.5], [w(starts.masa, 15.44), "stamp", 0.6]]) },
  { id: "dulu", dur: starts.kenapa - starts.dulu, el: <Dulu />, cues: soft([[w(starts.dulu, 21.74), "pop", 0.45], [w(starts.dulu, 25.92), "swipe", 0.45]]) },
  { id: "kenapa", dur: starts.cta - starts.kenapa, el: <Kenapa />, cues: soft(WHY.map(([, , at]): Cue => [w(starts.kenapa, at), "pop", 0.45])) },
  { id: "cta", dur: starts.end - starts.cta, el: <Cta />, cues: soft([[w(starts.cta, 37.6), "pop", 0.5], [w(starts.cta, 37.6) + 4, "chime", 0.45]]) },
];
