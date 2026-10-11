// PM Carousel 12/10/2026 — "Pilih sarapan di kedai serbaneka tanpa overthink"
// Source: Notion 📅 12/10/2026 — Sarapan Rushing → PM CAROUSEL (READY FOR PRODUCTION, QA gate waived by Coach Nas).
// Notion production note: 4:5; no product brand logos, no price or label numbers.
// Layout: anchor checklist (four rows) that fills in as the slides go. CTA: Save.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Cup, Drumstick, Greens, Plate, Rice } from "../food";
import { Body, CheckIcon, CtaBox, Headline, Kicker, Pad, Rule, Sage, Slide, T } from "./template";

const TOTAL = 7;
const ANCHORS = ["Protein", "Buah / serat", "Cukup kenyang", "Minuman"];

const AnchorList: React.FC<{ active?: number; all?: boolean; width?: number }> = ({ active = -1, all, width = 560 }) => (
  <div style={{ width }}>
    {ANCHORS.map((a, i) => {
      const lit = all || i === active;
      const done = all || i < active;
      return (
        <div key={a} style={{ display: "flex", alignItems: "center", gap: 22, padding: "18px 24px", marginBottom: 14, borderRadius: 18, background: lit ? T.sageSoft : "#fff", border: `2px solid ${lit ? T.sage : "#E6E5E0"}` }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, border: `3px solid ${lit || done ? T.sage : T.dot}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {(done || all) && (
              <svg viewBox="0 0 20 20" width={26} height={26}>
                <path d="M4 10.5 L8.5 15 L16 5.5" fill="none" stroke={T.sage} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div style={{ fontSize: 34, fontWeight: lit ? 700 : 500, color: lit || done ? T.text : "#9A9A9A" }}>{a}</div>
        </div>
      );
    })}
  </div>
);

const Row: React.FC<{ active?: number; all?: boolean; art?: React.ReactNode }> = ({ active, all, art }) => (
  <div style={{ position: "absolute", top: 760, left: 104, right: 104, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
    <AnchorList active={active} all={all} />
    <div style={{ width: 260, display: "flex", justifyContent: "center" }}>{art}</div>
  </div>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Sarapan rushing</Kicker>
      <Headline size={124}>
        Pilih sarapan
        <br />
        di kedai serbaneka
        <br />
        <Sage>tanpa overthink.</Sage>
      </Headline>
      <Rule style={{ margin: "44px 0 0" }} />
    </Pad>
    <div style={{ position: "absolute", top: 880, left: 104, right: 104, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
      <Cup width={150} />
      <Greens width={290} />
      <Drumstick width={290} />
    </div>
  </Slide>
);

const Step: React.FC<{ i: number; head: React.ReactNode; line?: React.ReactNode; art: React.ReactNode }> = ({ i, head, line, art }) => (
  <Slide index={i + 1} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Anchor {i + 1} / 4</Kicker>
      <Headline size={120}>{head}</Headline>
      <Rule style={{ margin: "36px 0 30px" }} />
      {line && <Body size={44}>{line}</Body>}
    </Pad>
    <Row active={i} art={art} />
  </Slide>
);

const S2: React.FC = () => (
  <Step i={0} head={<>Cari <Sage>protein</Sage> dulu.</>} line="Contohnya telur, susu atau yogurt, kalau ada." art={<Drumstick width={240} />} />
);
const S3: React.FC = () => <Step i={1} head={<>Tambah <Sage>buah</Sage> atau pilihan berserat kalau ada.</>} art={<Greens width={240} />} />;
const S4: React.FC = () => (
  <Step
    i={2}
    head={<>Cukup <Sage>kenyang.</Sage></>}
    line="Terlalu sedikit boleh buat awak lapar awal."
    art={
      <Plate size={240}>
        <div style={{ position: "absolute", left: 36, top: 66 }}>
          <Rice width={170} amount={0.9} />
        </div>
      </Plate>
    }
  />
);
const S5: React.FC = () => (
  <Step i={3} head={<>Air pun satu <Sage>pilihan.</Sage></>} line="Tengok minuman yang awak ambil sekali." art={<Cup width={150} />} />
);

const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Kalau pilihan terhad</Kicker>
      <Headline size={120}>
        Pilihan <Sage>terhad?</Sage>
      </Headline>
      <Rule style={{ margin: "36px 0 30px" }} />
      <Body size={46}>Ambil yang paling dekat dengan anchor tadi.</Body>
    </Pad>
    <Row all art={<CheckIcon size={160} />} />
  </Slide>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SIMPAN POST NI">
    <Pad top={210}>
      <Headline size={124}>
        Pilih satu yang
        <br />
        awak <Sage>mampu ulang.</Sage>
      </Headline>
      <Rule style={{ margin: "48px 0 0" }} />
    </Pad>
    <Pad top={760}>
      <CtaBox>
        <strong style={{ color: T.gold }}>Save</strong> untuk pagi rushing.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C1210_SLIDES = SLIDES.length;
export const C1210Sarapan: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
