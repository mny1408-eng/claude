// PM Carousel 06/10/2026 — "5 Backup Untuk Shift Tak Menentu"
// Source: Notion 📅 06/10/2026 — Shift Worker Survival → PM CAROUSEL, QA reviewed.
// Notion production note: "premium healthcare visual, clock/bag/meal icons, concise."
// CTA: Save.
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, Clock, HEAD, Headline, Kicker, NumDots, Pad, Rule, Sage, Slide, T } from "./template";

const TOTAL = 7;

const stroke = { fill: "none", stroke: T.ring, strokeWidth: 5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

const BagIcon: React.FC<{ size?: number }> = ({ size = 130 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <path d="M 36 34 V 26 C 36 12, 64 12, 64 26 V 34" {...stroke} />
    <rect x={16} y={34} width={68} height={52} rx={10} {...stroke} fill="#fff" />
    <path d="M 16 54 H 84 M 44 54 V 62 H 56 V 54" {...stroke} />
  </svg>
);

const MealIcon: React.FC<{ size?: number }> = ({ size = 130 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx={56} cy={52} r={30} {...stroke} fill="#fff" />
    <circle cx={56} cy={52} r={16} {...stroke} stroke={T.sage} />
    <path d="M 12 22 V 82 M 4 22 V 38 C 4 46, 20 46, 20 38 V 22" {...stroke} />
  </svg>
);

const NextIcon: React.FC<{ size?: number }> = ({ size = 130 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <circle cx={22} cy={50} r={13} {...stroke} stroke={T.rule} />
    <path d="M 40 50 H 58 M 51 42 L 59 50 L 51 58" {...stroke} stroke={T.sage} />
    <circle cx={78} cy={50} r={14} {...stroke} fill="#fff" />
    <path d="M 71 50 L 76 55 L 85 45" {...stroke} stroke={T.sage} />
  </svg>
);

const ReviewIcon: React.FC<{ size?: number }> = ({ size = 130 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size}>
    <rect x={20} y={16} width={60} height={72} rx={8} {...stroke} fill="#fff" />
    <rect x={38} y={9} width={24} height={14} rx={5} {...stroke} fill="#fff" />
    <path d="M 32 42 L 37 47 L 45 37 M 54 43 H 68 M 32 64 L 37 69 L 45 59 M 54 65 H 68" {...stroke} stroke={T.sage} />
  </svg>
);

const IconDisc: React.FC<{ size?: number; children: React.ReactNode }> = ({ size = 230, children }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: T.sageSoft, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
);

const Backup: React.FC<{ i: number; icon: React.ReactNode; children: React.ReactNode }> = ({ i, icon, children }) => (
  <Slide index={i + 1} total={TOTAL}>
    <Pad top={190}>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <div style={{ width: 124, height: 124, borderRadius: 28, background: T.ring, color: T.page, fontFamily: HEAD, fontWeight: 700, fontSize: 96, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {i + 1}
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, color: T.sage, letterSpacing: 4 }}>BACKUP {i + 1} / 5</div>
      </div>
      <Headline size={112} style={{ marginTop: 50 }}>
        {children}
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 836, right: 104 }}>
      <IconDisc size={270}>{icon}</IconDisc>
    </div>
    <Pad top={1150}>
      <NumDots total={5} active={i} />
    </Pad>
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Shift worker survival</Kicker>
      <Headline size={124}>
        5 backup
        <br />
        untuk shift
        <br />
        <Sage>tak menentu</Sage>
      </Headline>
      <Rule style={{ margin: "44px 0 40px" }} />
      <Body size={46}>
        Lunch selalu lambat?
        <br />
        <B>Bina fallback sebelum lapar.</B>
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 990, left: 104, display: "flex", gap: 34 }}>
      <IconDisc size={190}>
        <Clock size={120} hour={4} />
      </IconDisc>
      <IconDisc size={190}>
        <BagIcon size={108} />
      </IconDisc>
      <IconDisc size={190}>
        <MealIcon size={108} />
      </IconDisc>
    </div>
  </Slide>
);

const S2: React.FC = () => (
  <Backup i={0} icon={<BagIcon size={170} />}>
    Simpan satu <Sage>snack practical.</Sage>
  </Backup>
);
const S3: React.FC = () => (
  <Backup i={1} icon={<MealIcon size={170} />}>
    Kenal pasti <Sage>protein option</Sage> paling mudah dekat tempat kerja.
  </Backup>
);
const S4: React.FC = () => (
  <Backup i={2} icon={<Clock size={170} hour={4} />}>
    Jangan tunggu <Sage>terlalu lapar</Sage> untuk mula fikir.
  </Backup>
);
const S5: React.FC = () => (
  <Backup i={3} icon={<NextIcon size={210} />}>
    Kalau satu meal lari, <Sage>next meal kembali normal.</Sage>
  </Backup>
);
const S6: React.FC = () => (
  <Backup i={4} icon={<ReviewIcon size={170} />}>
    Review apa yang betul-betul <Sage>realistic</Sage> untuk shift awak.
  </Backup>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SIMPAN POST NI">
    <div style={{ position: "absolute", top: 190, left: 84, right: 84 }}>
      <div style={{ background: T.ring, borderRadius: 26, padding: "44px 48px" }}>
        <Headline size={104} style={{ color: T.page }}>
          Plan yang <span style={{ color: T.gold }}>survive</span> hari busy
        </Headline>
      </div>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 150, lineHeight: 1, color: T.sage, textAlign: "center", margin: "14px 0 18px" }}>&gt;</div>
      <div style={{ background: "#fff", border: `3px solid ${T.rule}`, borderRadius: 26, padding: "40px 48px" }}>
        <Headline size={84} style={{ color: "#8A8A8A" }}>
          plan yang cantik atas kertas.
        </Headline>
      </div>
    </div>
    <Pad top={1080}>
      <Headline size={130}>
        <Sage>Save.</Sage>
      </Headline>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C0610_SLIDES = SLIDES.length;
export const C0610ShiftBackup: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
