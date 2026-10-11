// PM Carousel 13/10/2026 — "5 soalan ubat jangan serah bulat-bulat kepada AI"
// Source: Notion 📅 13/10/2026 — AI, Ubat dan Pharmacist → PM CAROUSEL (READY FOR PRODUCTION, QA gate waived by Coach Nas).
// Notion production note: premium clinical visual; no pills or medicine imagery implying treatment.
// Layout: each question sits in a chat-style bubble, the caution under it. CTA: Save.
// Count check: title says 5 soalan; slides 2–6 are Soalan 1–5, so title and slides match.
import React from "react";
import { useCurrentFrame } from "remotion";
import { Body, CtaBox, HEAD, Headline, Kicker, NumDots, Pad, Rule, Sage, Slide, T } from "./template";

const TOTAL = 7;

const Q: React.FC<{ i: number; q: string; a: React.ReactNode }> = ({ i, q, a }) => (
  <Slide index={i + 1} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Soalan {i + 1}</Kicker>
      <div style={{ background: T.sageSoft, border: `3px solid ${T.sage}`, borderRadius: "36px 36px 36px 8px", padding: "44px 48px" }}>
        <Headline size={98} style={{ lineHeight: 1.04 }}>
          {q}
        </Headline>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, margin: "44px 0 30px 12px" }}>
        <div style={{ width: 6, height: 70, background: T.rule }} />
        <div style={{ fontFamily: HEAD, fontSize: 40, fontWeight: 700, letterSpacing: 2, color: T.textSoft }}>JAWAPAN</div>
      </div>
      <Body size={44}>{a}</Body>
    </Pad>
    <Pad top={1150}>
      <NumDots total={5} active={i} />
    </Pad>
  </Slide>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Pharmacist · ubat &amp; AI</Kicker>
      <Headline size={128}>
        5 soalan ubat
        <br />
        jangan serah
        <br />
        <Sage>bulat-bulat</Sage>
        <br />
        kepada AI.
      </Headline>
      <Rule style={{ margin: "44px 0 0" }} />
    </Pad>
    <Pad top={1150}>
      <NumDots total={5} active={-1} />
    </Pad>
  </Slide>
);

const S2: React.FC = () => <Q i={0} q="Dos ini sesuai untuk saya?" a="Dos bergantung pada umur, keadaan kesihatan dan faktor lain." />;
const S3: React.FC = () => <Q i={1} q="Ada interaksi dengan ubat atau supplement lain?" a="Senarai penuh yang awak ambil penting." />;
const S4: React.FC = () => <Q i={2} q="Boleh berhenti sendiri?" a="Jangan berhenti atau tukar ubat tanpa bincang dengan doktor atau pharmacist." />;
const S5: React.FC = () => <Q i={3} q="Supplement ini sesuai bersama ubat saya?" a="Semak dengan pharmacist, bukan jawapan chatbot sahaja." />;
const S6: React.FC = () => <Q i={4} q="Ini tanda bahaya?" a="Gejala teruk atau mengejut perlukan bantuan perubatan segera." />;

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="SIMPAN POST NI">
    <Pad top={210}>
      <Headline size={128}>
        AI boleh
        <br />
        bantu <Sage>faham.</Sage>
      </Headline>
      <Rule style={{ margin: "48px 0 40px" }} />
      <Body size={52}>Keputusan ubat, tanya pharmacist atau doktor awak.</Body>
    </Pad>
    <Pad top={900}>
      <CtaBox>
        <strong style={{ color: T.gold }}>Save.</strong>
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const C1310_SLIDES = SLIDES.length;
export const C1310SoalanAI: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
