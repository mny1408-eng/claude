import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, interpolate, staticFile, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { C } from "./theme";
import { Card, HandArrow, HandCircle, Highlight, Line, Mark, Note, Pop, Stamp, Strike, Tape, Underline, progress } from "./kit";

const Stack: React.FC<{ top: number; children: React.ReactNode; gap?: number }> = ({ top, children, gap = 10 }) => (
  <div style={{ position: "absolute", top, left: 80, right: 80, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap }}>
    {children}
  </div>
);

// ---------- Scene 1: hook (3 variants) ----------
export type HookId = "A" | "B" | "C";
const HOOKS: Record<HookId, { lines: string[]; big: string; bigSize: number; strike: boolean; note: string }> = {
  A: { lines: ["Ramai gagal jaga makan", "bukan sebab"], big: "MALAS.", bigSize: 250, strike: true, note: "salah faham!" },
  B: { lines: ["Kenapa diet selalu", "gagal masuk"], big: "MINGGU KE-3?", bigSize: 128, strike: false, note: "ramai kena ni" },
  C: { lines: ["Pegawai farmasi klinikal:", "masalah sebenar bukan"], big: "MAKANAN.", bigSize: 168, strike: false, note: "serius." },
};

export const SceneHook: React.FC<{ hook: HookId }> = ({ hook }) => {
  const h = HOOKS[hook];
  return (
    <AbsoluteFill>
      <Stack top={560}>
        <Line delay={0} size={72} weight={600}>{h.lines[0]}</Line>
        <Line delay={7} size={72} weight={600}>{h.lines[1]}</Line>
        <Stamp delay={14} style={{ marginTop: 40 }}>
          <div style={{ position: "relative", fontSize: h.bigSize, fontWeight: 800, letterSpacing: -6, lineHeight: 1, whiteSpace: "nowrap" }}>
            {h.big}
            {h.strike ? <Strike delay={34} /> : <HandCircle delay={34} />}
          </div>
        </Stamp>
        <Note delay={50} size={90} rotate={-6} style={{ marginTop: 50 }}>{h.note}</Note>
      </Stack>
    </AbsoluteFill>
  );
};

// ---------- Scene 2: week-3 drop-off calendar ----------
const WEEKS: ("check" | "cross")[][] = [
  ["check", "check", "check", "check", "check", "check", "check"],
  ["check", "check", "cross", "check", "cross", "cross", "check"],
  ["cross", "cross", "cross", "cross", "cross", "cross", "cross"],
];
const DAYS = ["I", "S", "R", "K", "J", "S", "A"];

export const SceneCalendar: React.FC = () => (
  <AbsoluteFill>
    <Stack top={330}>
      <Line size={76}>Mula dengan semangat…</Line>
    </Stack>
    <div style={{ position: "absolute", top: 560, left: 70, right: 70 }}>
      <Pop delay={4} rotate={-1.5}>
        <Card style={{ padding: "50px 40px 40px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "150px repeat(7, 1fr)", rowGap: 26, alignItems: "center", justifyItems: "center" }}>
            <div />
            {DAYS.map((d, i) => (
              <div key={i} style={{ fontSize: 34, fontWeight: 700, color: C.inkSoft }}>{d}</div>
            ))}
            {WEEKS.map((week, w) => (
              <React.Fragment key={w}>
                <div style={{ position: "relative", justifySelf: "start", fontSize: 38, fontWeight: 700 }}>
                  Mg {w + 1}
                  {w === 2 && <HandCircle delay={100} style={{ inset: "-40% -30%", width: "160%", height: "180%" }} />}
                </div>
                {week.map((kind, d) => (
                  <div key={d} style={{ width: 88, height: 88, border: `3px solid #E4E2D8`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Mark kind={kind} delay={12 + w * 30 + d * 4} size={62} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </Card>
      </Pop>
    </div>
    <Stack top={1180}>
      <Line delay={100} size={76}>
        Masuk <Highlight delay={110}>minggu ke-3</Highlight>…
      </Line>
      <Line delay={116} size={76}>semua hilang.</Line>
    </Stack>
  </AbsoluteFill>
);

// ---------- Scene 3: the real barriers ----------
const Icon: React.FC<{ kind: "sleep" | "stress" | "work" }> = ({ kind }) => {
  const common = { fill: "none", stroke: C.ink, strokeWidth: 7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 100 100" width={120} height={120}>
      {kind === "sleep" && (
        <>
          <path d="M 62 18 A 34 34 0 1 0 84 66 A 28 28 0 0 1 62 18 Z" {...common} />
          <path d="M 70 10 h 16 l -16 16 h 16" {...common} strokeWidth={5} />
        </>
      )}
      {kind === "stress" && <path d="M 56 6 L 26 54 H 50 L 40 94 L 76 40 H 52 L 62 6 Z" {...common} />}
      {kind === "work" && (
        <>
          <rect x="10" y="30" width="80" height="56" rx="8" {...common} />
          <path d="M 36 30 V 20 A 6 6 0 0 1 42 14 H 58 A 6 6 0 0 1 64 20 V 30 M 10 54 H 90" {...common} />
        </>
      )}
    </svg>
  );
};

const BARRIERS = [
  { kind: "sleep" as const, label: "Tidur", x: 90, y: 640, r: -5 },
  { kind: "stress" as const, label: "Stres", x: 580, y: 740, r: 4 },
  { kind: "work" as const, label: "Jadual kerja", x: 200, y: 990, r: -2 },
];

export const SceneBarriers: React.FC = () => (
  <AbsoluteFill>
    <Stack top={300}>
      <Line size={70}>Masalah sebenar selalunya</Line>
      <Line delay={6} size={84} weight={800}>
        <Highlight delay={16}>bukan makanan.</Highlight>
      </Line>
    </Stack>
    {BARRIERS.map((b, i) => (
      <div key={b.label} style={{ position: "absolute", left: b.x, top: b.y }}>
        <Pop delay={30 + i * 14} rotate={b.r}>
          <Card style={{ padding: "34px 50px", display: "flex", alignItems: "center", gap: 28 }}>
            <Icon kind={b.kind} />
            <div style={{ position: "relative", fontSize: 64, fontWeight: 800 }}>
              {b.label}
              <HandCircle delay={82 + i * 12} />
            </div>
          </Card>
        </Pop>
      </div>
    ))}
    <Stack top={1260}>
      <Line delay={130} size={70}>Corak harian yang</Line>
      <Line delay={136} size={84} weight={800}>
        awak <Highlight delay={146}>tak nampak.</Highlight>
      </Line>
    </Stack>
  </AbsoluteFill>
);

// ---------- Scene 4: Coach Nas (photo, or the user's own clip) ----------
export const SceneCoach: React.FC<{ clip?: string }> = ({ clip }) => (
  <AbsoluteFill>
    <Stack top={300}>
      <Line size={70}>Sebab tu Coach Nas bina</Line>
      <Line delay={6} size={92} weight={800}>
        <Highlight delay={16}>Progress Check</Highlight>
      </Line>
    </Stack>
    <div style={{ position: "absolute", top: 600, left: 210, width: 660 }}>
      <Pop delay={10} rotate={3}>
        <div style={{ position: "relative", background: "#fff", padding: "26px 26px 30px", boxShadow: "0 14px 40px rgba(40,40,20,0.22)" }}>
          <Tape style={{ top: -24, left: 40, transform: "rotate(-8deg)" }} />
          <Tape style={{ top: -24, right: 40, transform: "rotate(7deg)" }} />
          <div style={{ width: 608, height: 700, overflow: "hidden", background: "#eee" }}>
            {clip ? (
              <OffthreadVideo src={staticFile(`clips/${clip}`)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Img src={staticFile("img/coach-nas.jpeg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%" }} />
            )}
          </div>
        </div>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 1180, left: 60 }}>
      <Pop delay={36} rotate={-4}>
        <Card tape={false} style={{ padding: "22px 36px", background: C.ink }}>
          <div style={{ fontSize: 58, fontWeight: 800, color: "#fff" }}>Coach Nas</div>
        </Card>
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 1330, left: 0, right: 0, textAlign: "center" }}>
      <Line delay={48} size={54} weight={700}>
        <span style={{ position: "relative" }}>
          Clinical Pharmacist
          <Underline delay={58} />
        </span>
        {"  ·  "}Wellness Coach
      </Line>
    </div>
    <Note delay={70} size={68} rotate={-6} style={{ position: "absolute", top: 1170, right: 60, textAlign: "right" }}>
      ahli farmasi,
      <br />
      bukan influencer
    </Note>
  </AbsoluteFill>
);

// ---------- Scene 5: the scorecard on a phone ----------
const Phone: React.FC = () => {
  const f = useCurrentFrame();
  const swap = progress(f, 70, 12);
  const tap = progress(f, 110, 16);
  return (
    <div style={{ position: "relative", width: 500, height: 1060, borderRadius: 64, background: "#111", padding: 16, boxShadow: "0 24px 60px rgba(20,30,20,0.35)" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 50, overflow: "hidden", background: C.paper }}>
        <Img src={staticFile("img/site-hero.jpg")} style={{ position: "absolute", width: "100%", transform: `translateX(${-swap * 100}%)` }} />
        <Img src={staticFile("img/site-q1.jpg")} style={{ position: "absolute", width: "100%", transform: `translateX(${(1 - swap) * 100}%)` }} />
        {/* finger tap on an answer */}
        <div
          style={{
            position: "absolute",
            left: 234,
            top: 549,
            width: 90,
            height: 90,
            marginLeft: -45,
            marginTop: -45,
            borderRadius: "50%",
            border: `6px solid ${C.marker}`,
            opacity: tap > 0 && tap < 1 ? 1 - tap : 0,
            transform: `scale(${0.4 + tap * 1.4})`,
          }}
        />
      </div>
    </div>
  );
};

const PERKS = ["Percuma", "±2 minit", "7 soalan", "Tak perlu email / no. tel"];

export const ScenePhone: React.FC = () => (
  <AbsoluteFill>
    <Stack top={290}>
      <Line size={78} weight={800}>
        Jawab <Highlight delay={10}>7 soalan</Highlight>.
      </Line>
      <Line delay={6} size={60} weight={600}>Cari barrier utama awak.</Line>
    </Stack>
    <div style={{ position: "absolute", top: 540, left: 60 }}>
      <Pop delay={4} rotate={-4}>
        <Phone />
      </Pop>
    </div>
    <div style={{ position: "absolute", top: 680, left: 610, right: 40, display: "flex", flexDirection: "column", gap: 44 }}>
      {PERKS.map((p, i) => (
        <Pop key={p} delay={30 + i * 16} rotate={i % 2 ? 2 : -2}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Mark kind="check" delay={34 + i * 16} size={64} />
            <div style={{ fontSize: 50, fontWeight: 800, lineHeight: 1.1 }}>{p}</div>
          </div>
        </Pop>
      ))}
    </div>
  </AbsoluteFill>
);

// ---------- Scene 6: end card / CTA ----------
export const SceneCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const btnIn = spring({ frame: f - 26, fps, config: { damping: 12 } });
  const pulse = 1 + Math.max(0, Math.sin((f - 40) / 6)) * 0.04 * (f > 40 ? 1 : 0);
  return (
    <AbsoluteFill>
      <Stack top={400} gap={0}>
        <Stamp delay={0} rotate={-2}>
          <div style={{ fontSize: 108, fontWeight: 800, lineHeight: 1.05, letterSpacing: -4, whiteSpace: "nowrap" }}>
            Apa Sebenarnya
            <br />
            Halang <Highlight delay={14}>Progress</Highlight>
            <br />
            Awak?
          </div>
        </Stamp>
      </Stack>
      <div style={{ position: "absolute", top: 900, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <div
          style={{
            background: C.ink,
            color: "#fff",
            fontSize: 60,
            fontWeight: 800,
            padding: "44px 70px",
            borderRadius: 18,
            letterSpacing: 1,
            boxShadow: "0 14px 34px rgba(23,60,48,0.35)",
            opacity: f < 26 ? 0 : 1,
            transform: `scale(${interpolate(btnIn, [0, 1], [0.7, 1]) * pulse})`,
          }}
        >
          MULA SCORECARD →
        </div>
      </div>
      <Note delay={44} size={70} rotate={-3} style={{ position: "absolute", top: 1100, left: 0, right: 0, textAlign: "center" }}>
        percuma · ±2 minit · tekan link bawah
      </Note>
      <div style={{ position: "absolute", top: 1180, left: 480 }}>
        <HandArrow delay={54} />
      </div>
      <div style={{ position: "absolute", top: 1400, left: 110, right: 110, textAlign: "center", fontSize: 24, fontWeight: 500, color: C.inkSoft, opacity: 0.8, fontFamily: undefined }}>
        Self-reflection tool, bukan nasihat perubatan atau diagnosis. Tiada jaminan penurunan berat.
      </div>
    </AbsoluteFill>
  );
};
