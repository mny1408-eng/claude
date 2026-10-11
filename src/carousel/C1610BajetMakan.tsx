// PM Carousel 16/10/2026 — "Bajet makan sihat: 7 keputusan di pasar raya"
// Source: Notion 📅 16/10/2026 — World Food Day → PM CAROUSEL (QA REVIEWED / GREEN LIGHT, Coach Nas approval 11 Oct 2026).
// Notion production note: warm, clean; no prices, no brand logos. No prices or RM figures anywhere on the slides.
// Layout: a basket strip of seven slots fills up one decision at a time. CTA: Save.
// Count check: "7 keputusan" = all 7 slides are numbered decisions (S1 carries Keputusan 1, as the Notion page states).
import React from "react";
import { useCurrentFrame } from "remotion";
import { Bowl, Cup, Drumstick, Greens, Plate, Rice } from "../food";
import { Body, CtaBox, Headline, Kicker, Pad, Rule, Sage, Slide, T } from "./template";

const TOTAL = 7;

const Basket: React.FC<{ n: number }> = ({ n }) => (
  <div style={{ position: "absolute", left: 104, right: 104, top: 1130, display: "flex", gap: 14 }}>
    {Array.from({ length: 7 }, (_, i) => (
      <div
        key={i}
        style={{
          flex: 1,
          height: 74,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 32,
          fontWeight: 700,
          background: i < n ? T.ring : "#fff",
          color: i < n ? T.page : "#9A9A9A",
          border: `3px solid ${i < n ? T.ring : T.dot}`,
        }}
      >
        {i + 1}
      </div>
    ))}
  </div>
);

const Step: React.FC<{ i: number; head: React.ReactNode; art: React.ReactNode }> = ({ i, head, art }) => (
  <Slide index={i} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Keputusan {i + 1} / 7</Kicker>
      <Headline size={112}>{head}</Headline>
      <Rule style={{ margin: "36px 0 0" }} />
    </Pad>
    <div style={{ position: "absolute", top: 760, left: 104, right: 104, height: 300, display: "flex", alignItems: "center", justifyContent: "center", gap: 50 }}>{art}</div>
    <Basket n={i + 1} />
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={190}>
      <Kicker>World Food Day · pasar raya</Kicker>
      <Headline size={116}>
        Bajet makan sihat:
        <br />
        <Sage>7 keputusan</Sage>
        <br />
        di pasar raya.
      </Headline>
      <Rule style={{ margin: "36px 0 30px" }} />
      <div style={{ fontSize: 30, fontWeight: 700, color: T.sage, letterSpacing: 3, marginBottom: 12 }}>KEPUTUSAN 1</div>
      <Body size={48} style={{ fontWeight: 600 }}>
        Mula dengan bajet sebenar.
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 950, left: 104, right: 104, height: 150, display: "flex", alignItems: "center", justifyContent: "center", gap: 60 }}>
      <Cup width={100} />
      <Greens width={190} />
      <Drumstick width={190} />
    </div>
    <Basket n={1} />
  </Slide>
);

const S2: React.FC = () => (
  <Step
    i={1}
    head={<>Pilih <Sage>makanan asas</Sage> yang biasa awak makan.</>}
    art={
      <Plate size={280}>
        <div style={{ position: "absolute", left: 50, top: 86 }}>
          <Rice width={180} amount={0.9} />
        </div>
      </Plate>
    }
  />
);
const S3: React.FC = () => <Step i={2} head={<>Pilih sumber <Sage>protein</Sage> yang sesuai dengan bajet.</>} art={<Drumstick width={380} />} />;
const S4: React.FC = () => <Step i={3} head={<>Tambah <Sage>sayur</Sage> yang awak pasti akan guna.</>} art={<Greens width={380} />} />;
const S5: React.FC = () => (
  <Step i={4} head={<>Banding harga ikut <Sage>unit,</Sage> bukan saiz bungkus.</>} art={<Bowl width={170} />} />
);
const S6: React.FC = () => (
  <Step i={5} head={<>Beli ikut <Sage>keperluan,</Sage> kurangkan pembaziran.</>} art={<Cup width={150} />} />
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SIMPAN POST NI">
    <Pad top={190}>
      <Kicker>Keputusan 7 / 7</Kicker>
      <Headline size={116}>
        Susun satu bakul yang <Sage>boleh diulang.</Sage>
      </Headline>
      <Rule style={{ margin: "36px 0 0" }} />
    </Pad>
    <Pad top={740}>
      <CtaBox>
        <strong style={{ color: T.gold }}>Save.</strong>
      </CtaBox>
    </Pad>
    <Basket n={7} />
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C1610_SLIDES = SLIDES.length;
export const C1610BajetMakan: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
