// PM Carousel 08/10/2026 — "5 Soalan Sebelum Percaya Diet Rule"
// Source: Notion 📅 08/10/2026 — Pharmacist Myth to Action → PM CAROUSEL, QA reviewed.
// Notion production note: "premium clinical visual; no medicine imagery implying treatment."
// Slide 1 (“Rule ni absolute sangat?”) is the hook; slides 2–6 are numbered as the five questions.
// CTA: Save.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Body, Chip, HEAD, Headline, Kicker, NumDots, Pad, Rule, Sage, Slide, T } from "./template";

const TOTAL = 7;

const Q: React.FC<{ i: number; children: React.ReactNode }> = ({ i, children }) => (
  <Slide index={i + 1} total={TOTAL}>
    <div style={{ position: "absolute", top: 150, right: 80, fontFamily: HEAD, fontSize: 420, fontWeight: 700, color: T.sageSoft, lineHeight: 1 }}>?</div>
    <Pad top={300}>
      <Kicker>Soalan {i + 1} / 5</Kicker>
      <div style={{ borderLeft: `10px solid ${T.sage}`, paddingLeft: 40, marginTop: 20 }}>
        <Headline size={124}>{children}</Headline>
      </div>
    </Pad>
    <Pad top={1150}>
      <NumDots total={5} active={i} />
    </Pad>
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Pharmacist · myth to action</Kicker>
      <Headline size={124}>
        5 soalan
        <br />
        sebelum percaya
        <br />
        <Sage>diet rule</Sage>
      </Headline>
      <Rule style={{ margin: "44px 0 0" }} />
    </Pad>
    <div style={{ position: "absolute", top: 800, left: 84, right: 84, background: "#fff", border: `3px solid ${T.rule}`, borderLeft: `12px solid ${T.sage}`, borderRadius: 22, padding: "44px 48px" }}>
      <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.2 }}>
        Rule ni <span style={{ color: T.sage }}>absolute sangat?</span>
      </div>
    </div>
    <Pad top={1150}>
      <NumDots total={5} active={-1} />
    </Pad>
  </Slide>
);

const S2: React.FC = () => (
  <Q i={0}>
    Apa <Sage>evidence sebenar</Sage> di sebalik claim tu?
  </Q>
);
const S3: React.FC = () => (
  <Q i={1}>
    <Sage>Amount/&#8203;dose</Sage> dan keseluruhan pattern diambil kira tak?
  </Q>
);
const S4: React.FC = () => (
  <Q i={2}>
    Adakah rule ni sesuai dengan <Sage>keadaan dan preference individu?</Sage>
  </Q>
);
const S5: React.FC = () => (
  <Q i={3}>
    Apa <Sage>trade-off</Sage> bila ikut rule ni?
  </Q>
);
const S6: React.FC = () => (
  <Q i={4}>
    Boleh dibuat <Sage>konsisten</Sage> tanpa restriction yang tak perlu?
  </Q>
);

const Sym: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 96, lineHeight: 1, color: T.sage }}>{children}</div>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SIMPAN POST NI">
    <Pad top={210}>
      <Headline size={128}>Evidence-informed</Headline>
      <div style={{ display: "flex", alignItems: "center", gap: 28, marginTop: 50 }}>
        <Sym>=</Sym>
        <div style={{ fontSize: 44, fontWeight: 600, color: T.textSoft }}>guna</div>
        <Chip on>evidence</Chip>
        <Sym>+</Sym>
        <Chip on>context</Chip>
      </div>
      <Rule style={{ margin: "56px 0 44px" }} />
      <Body size={54} style={{ color: T.textSoft }}>bukan ikut slogan.</Body>
    </Pad>
    <Pad top={980}>
      <Headline size={140}>
        <Sage>Save.</Sage>
      </Headline>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C0810_SLIDES = SLIDES.length;
export const C0810SoalanRule: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
