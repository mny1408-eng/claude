// PM Carousel 15/10/2026 — "Wellness coach vs klinik: mana sempadan?"
// Source: Notion 📅 15/10/2026 — Prevention dan Sempadan → PM CAROUSEL (READY FOR PRODUCTION, QA gate waived by Coach Nas).
// Notion production note: premium clinical-clean look; two-column feel on S2–S5 optional; no stethoscope-as-cure imagery.
// Layout: two columns (Coach | Klinik) with the owner of each job lit. CTA: Share.
// Guardrail: coaching never replaces medical care; no thresholds or screening schedules.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Body, CtaBox, Headline, Kicker, Pad, Rule, Sage, Slide, T } from "./template";

const TOTAL = 7;

const Cols: React.FC<{ coach?: boolean; klinik?: boolean; top?: number }> = ({ coach, klinik, top = 760 }) => {
  const Col: React.FC<{ label: string; on?: boolean }> = ({ label, on }) => (
    <div style={{ flex: 1, height: 250, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", background: on ? T.ring : "#fff", border: `3px solid ${on ? T.ring : T.dot}`, color: on ? T.page : "#9A9A9A", fontSize: 54, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>
      {label}
    </div>
  );
  return (
    <div style={{ position: "absolute", top, left: 104, right: 104, display: "flex", gap: 32 }}>
      <Col label="Coach" on={coach} />
      <Col label="Klinik" on={klinik} />
    </div>
  );
};

const Step: React.FC<{ i: number; kicker: string; lead: React.ReactNode; rest: string; coach?: boolean; klinik?: boolean }> = ({ i, kicker, lead, rest, coach, klinik }) => (
  <Slide index={i} total={TOTAL}>
    <Pad top={190}>
      <Kicker>{kicker}</Kicker>
      <Headline size={124}>{lead}</Headline>
      <Rule style={{ margin: "36px 0 30px" }} />
      <Body size={46}>{rest}</Body>
    </Pad>
    <Cols coach={coach} klinik={klinik} top={820} />
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Sempadan peranan</Kicker>
      <Headline size={128}>
        Wellness coach
        <br />
        vs klinik:
        <br />
        <Sage>mana sempadan?</Sage>
      </Headline>
      <Rule style={{ margin: "44px 0 0" }} />
    </Pad>
    <Cols coach klinik top={860} />
  </Slide>
);

const S2: React.FC = () => <Step i={1} kicker="Peranan coach" lead={<><Sage>Wellness coach:</Sage></>} rest="edukasi gaya hidup, tabiat makan dan akauntabiliti." coach />;
const S3: React.FC = () => <Step i={2} kicker="Peranan klinik" lead={<><Sage>Saringan kesihatan:</Sage></>} rest="dibuat melalui klinik atau pusat kesihatan." klinik />;
const S4: React.FC = () => <Step i={3} kicker="Peranan klinik" lead={<><Sage>Diagnosis:</Sage></>} rest="penilaian doktor, bukan kerja coach." klinik />;
const S5: React.FC = () => <Step i={4} kicker="Peranan klinik" lead={<><Sage>Pengurusan ubat:</Sage></>} rest="ikut nasihat doktor atau pharmacist awak." klinik />;

const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Rujukan</Kicker>
      <Headline size={124}>
        Perlu <Sage>rujukan?</Sage>
      </Headline>
      <Rule style={{ margin: "36px 0 30px" }} />
      <Body size={46}>Gejala baru atau berterusan, jumpa profesional kesihatan.</Body>
    </Pad>
    <Cols klinik top={820} />
  </Slide>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SHARE POST NI">
    <Pad top={210}>
      <Headline size={116}>
        Coaching <Sage>tidak menggantikan</Sage> rawatan.
      </Headline>
      <Rule style={{ margin: "48px 0 36px" }} />
      <Body size={48}>Buat langkah seterusnya dengan maklumat yang betul.</Body>
    </Pad>
    <Pad top={940}>
      <CtaBox>
        <strong style={{ color: T.gold }}>Share.</strong>
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C1510_SLIDES = SLIDES.length;
export const C1510CoachKlinik: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
