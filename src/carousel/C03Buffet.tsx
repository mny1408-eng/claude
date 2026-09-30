// PM Carousel 03/10/2026 — "Buffet Tanpa 'Cheat Day' Mindset"
// Source: Notion 📅 03/10/2026 — Weekend Real Life → PM CAROUSEL, QA reviewed 27/09.
// Notion production note: "7-slide Food Editorial; warm real-life buffet visuals; avoid moralising food."
// CTA: Lead Magnet — Scorecard dekat bio.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Drumstick, Greens, Plate, Rice, Tray } from "../food";
import { B, BigNum, Body, Chip, CtaBox, Headline, Kicker, Pad, Rule, Sage, Slide, StepStrip, T } from "./template";

const TOTAL = 7;
const STEPS = ["Scan", "Favourites", "Plate", "Pace", "Pause"];
const TRAYS = ["ayam", "sayur", "kari", "ikan", "telur", "sambal"] as const;

const TrayRow: React.FC<{ picked?: number[]; w?: number }> = ({ picked = [], w = 277 }) => (
  <div style={{ display: "grid", gridTemplateColumns: `repeat(3, ${w}px)`, gap: 20, justifyContent: "center", width: 872 }}>
    {TRAYS.map((t, i) => (
      <div key={t} style={{ position: "relative", borderRadius: 26, boxShadow: picked.includes(i) ? `0 0 0 6px ${T.sage}` : undefined }}>
        <Tray kind={t} width={w} />
      </div>
    ))}
  </div>
);

const Step: React.FC<{ i: number; title: string; line: React.ReactNode; children?: React.ReactNode }> = ({ i, title, line, children }) => (
  <Slide index={i + 1} total={TOTAL}>
    <BigNum>{i + 1}</BigNum>
    <Pad top={200}>
      <Kicker>Langkah {i + 1} / 5</Kicker>
      <Headline size={120}>
        <Sage>{title}</Sage>
      </Headline>
      <Rule style={{ margin: "40px 0 36px" }} />
      <Body size={44}>{line}</Body>
      {children}
    </Pad>
    <Pad top={1090}>
      <StepStrip items={STEPS} done={i + 1} active={i} />
    </Pad>
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Weekend real life</Kicker>
      <Headline size={126}>
        Buffet tanpa
        <br />
        <Sage>“cheat day”</Sage>
        <br />
        mindset
      </Headline>
      <Rule style={{ margin: "44px 0 40px" }} />
      <Body size={44}>
        Buffet malam ni?
        <br />
        <B>Tak perlu skip makan seharian.</B>
      </Body>
    </Pad>
    <Pad top={900}>
      <TrayRow w={236} />
    </Pad>
  </Slide>
);

const S2: React.FC = () => (
  <Step i={0} title="Scan dulu" line={<>Tengok pilihan <B>sebelum</B> isi plate.</>}>
    <div style={{ marginTop: 40 }}>
      <TrayRow />
    </div>
  </Step>
);

const S3: React.FC = () => (
  <Step i={1} title="Pilih favourites" line={<>Tak wajib rasa <B>semua benda.</B></>}>
    <div style={{ marginTop: 40 }}>
      <TrayRow picked={[0, 1, 4]} />
    </div>
  </Step>
);

const S4: React.FC = () => (
  <Step i={2} title="Build plate" line={<>Utamakan makanan yang <B>mengenyangkan</B> dan yang awak <B>memang nak.</B></>}>
    <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
      <Plate size={380}>
        <div style={{ position: "absolute", left: 30, top: 70, transform: "rotate(-16deg)" }}>
          <Drumstick width={170} />
        </div>
        <div style={{ position: "absolute", left: 200, top: 60 }}>
          <Greens width={150} />
        </div>
        <div style={{ position: "absolute", left: 100, top: 200 }}>
          <Rice width={180} amount={0.9} />
        </div>
      </Plate>
    </div>
  </Step>
);

const S5: React.FC = () => (
  <Step i={3} title="Pace biasa" line={<>Makan dengan pace biasa — <B>buffet bukan race.</B></>} />
);

const S6: React.FC = () => (
  <Step i={4} title="Pause sebelum repeat" line={<>Check dulu:</>}>
    <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 30, alignItems: "flex-start" }}>
      <Chip on>Masih lapar?</Chip>
      <Chip>Atau sekadar nampak makanan?</Chip>
    </div>
  </Step>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SCORECARD DEKAT BIO">
    <Pad top={200}>
      <Headline size={130}>
        Next meal
        <br />
        <Sage>sambung biasa.</Sage>
      </Headline>
      <Rule style={{ margin: "48px 0 0" }} />
    </Pad>
    <Pad top={640}>
      <StepStrip items={STEPS} done={5} />
    </Pad>
    <Pad top={820}>
      <CtaBox>
        Kalau makan luar selalu buat plan terus hilang, buat <strong style={{ color: T.gold }}>free Scorecard</strong> dekat bio.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C03_SLIDES = SLIDES.length;
export const C03Buffet: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
