// PM Carousel 17/10/2026 — "Apa sebenarnya jadi dalam nutrition club?"
// Source: Notion 📅 17/10/2026 — Fake Healthy dan Side Project Jujur → PM CAROUSEL (QA REVIEWED / GREEN LIGHT, Coach Nas approval 11 Oct 2026).
// Notion production note: premium healthcare look; no before/after, no product hero shots (no product imagery at all).
// Layout: "what it is / what it is not" boundary cards; the product and clinical-boundary slides state the limits in full. CTA: Follow.
// Guardrail: Herbalife affiliation is disclosed on slide 4 exactly as written; no outcomes, no income claims.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Body, CtaBox, Headline, Kicker, Pad, Rule, Sage, Slide, T } from "./template";

const TOTAL = 7;

const Tag: React.FC<{ children: React.ReactNode; no?: boolean }> = ({ children, no }) => (
  <div style={{ display: "inline-flex", alignItems: "center", gap: 14, padding: "14px 28px", borderRadius: 999, background: no ? "#fff" : T.sageSoft, border: `2px solid ${no ? "#C9C8C3" : T.sage}`, fontSize: 32, fontWeight: 700, color: no ? "#8A8A8A" : T.text }}>
    {no ? "✕" : "✓"} {children}
  </div>
);

const Card: React.FC<{ kicker: string; title: React.ReactNode; line: React.ReactNode; tags: React.ReactNode }> = ({ kicker, title, line, tags }) => (
  <>
    <Pad top={190}>
      <Kicker>{kicker}</Kicker>
      <Headline size={116}>{title}</Headline>
    </Pad>
    <div style={{ position: "absolute", top: 640, left: 84, right: 84, background: "#fff", border: `3px solid ${T.rule}`, borderLeft: `12px solid ${T.sage}`, borderRadius: 22, padding: "40px 44px" }}>
      <Body size={44}>{line}</Body>
    </div>
    <div style={{ position: "absolute", top: 1030, left: 104, right: 104, display: "flex", gap: 18, flexWrap: "wrap" }}>{tags}</div>
  </>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Nutrition club</Kicker>
      <Headline size={124}>
        Apa sebenarnya
        <br />
        jadi dalam
        <br />
        <Sage>nutrition club?</Sage>
      </Headline>
      <Rule style={{ margin: "44px 0 36px" }} />
      <Body size={50} style={{ fontWeight: 600 }}>
        Jangkaan yang jujur.
      </Body>
    </Pad>
  </Slide>
);

const S2: React.FC = () => (
  <Slide index={1} total={TOTAL}>
    <Card
      kicker="Langkah 1"
      title={<><Sage>Penilaian</Sage> wellness:</>}
      line="kita mula dengan faham rutin, makanan dan cabaran awak."
      tags={<Tag no>Bukan diagnosis</Tag>}
    />
  </Slide>
);
const S3: React.FC = () => (
  <Slide index={2} total={TOTAL}>
    <Card kicker="Langkah 2" title={<><Sage>Edukasi:</Sage></>} line="struktur makan, portion dan tabiat yang praktikal." tags={<Tag>Praktikal</Tag>} />
  </Slide>
);
const S4: React.FC = () => (
  <Slide index={3} total={TOTAL}>
    <Card
      kicker="Langkah 3"
      title={<><Sage>Produk:</Sage> pilihan, bukan wajib.</>}
      line="Produk Herbalife ialah sokongan nutrisi, bukan ubat."
      tags={
        <>
          <Tag>Pilihan</Tag>
          <Tag no>Bukan wajib</Tag>
          <Tag no>Bukan ubat</Tag>
        </>
      }
    />
  </Slide>
);
const S5: React.FC = () => (
  <Slide index={4} total={TOTAL}>
    <Card kicker="Langkah 4" title={<><Sage>Sokongan:</Sage></>} line="semakan berkala dan akauntabiliti." tags={<Tag>Semakan berkala</Tag>} />
  </Slide>
);
const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Card
      kicker="Batas"
      title={<><Sage>Batas klinikal:</Sage></>}
      line="tiada diagnosis, tiada rawatan penyakit. Perlu rujukan? Jumpa doktor."
      tags={
        <>
          <Tag no>Tiada diagnosis</Tag>
          <Tag no>Tiada rawatan penyakit</Tag>
        </>
      }
    />
  </Slide>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="FOLLOW AKAUN NI">
    <Pad top={210}>
      <Headline size={124}>
        Tiada janji
        <br />
        <Sage>hasil.</Sage>
      </Headline>
      <Rule style={{ margin: "48px 0 40px" }} />
      <Body size={50}>Nak tahu lebih?</Body>
    </Pad>
    <Pad top={820}>
      <CtaBox>
        <strong style={{ color: T.gold }}>Follow</strong> untuk penerangan seterusnya.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C1710_SLIDES = SLIDES.length;
export const C1710NutritionClub: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
