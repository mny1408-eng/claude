// PM Carousel — "Berkira bab kesihatan" (carousel version of Reel-Healing).
// All RM amounts are illustrative examples, labelled "Contoh" on the slides. RM18 × 20 hari kerja = RM360.
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, CtaBox, HEAD, Headline, Kicker, Pad, Portrait, Sage, Slide, T } from "./template";

const TOTAL = 7;

const Tag: React.FC = () => (
  <div style={{ display: "inline-block", fontSize: 24, fontWeight: 600, color: T.textSoft, background: T.footer, borderRadius: 999, padding: "12px 26px" }}>Contoh ilustrasi, bukan harga sebenar</div>
);

const Calc: React.FC<{ top: string; result: string }> = ({ top, result }) => (
  <div style={{ background: "#2B2F2C", borderRadius: 30, padding: "24px 26px 28px", width: 760, boxShadow: "0 14px 34px rgba(0,0,0,0.18)" }}>
    <div style={{ background: "#C9D6B5", borderRadius: 16, padding: "20px 28px", textAlign: "right", color: "#1E2A1F" }}>
      <div style={{ fontSize: 42, fontWeight: 600, opacity: 0.75 }}>{top}</div>
      <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.05 }}>{result}</div>
    </div>
  </div>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Pelik kan?</Kicker>
      <Headline size={116}>
        Bab kesihatan, tiba-tiba semua jadi <Sage>accountant.</Sage> 🧮
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 900, left: 104, right: 104, display: "flex", alignItems: "center", gap: 40 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={190} />
      </div>
      <Body size={36}>
        Tapi bab lain? <B>Kalkulator hilang.</B>
      </Body>
    </div>
  </Slide>
);

const S2: React.FC = () => (
  <Slide index={1} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Bila nak sihat</Kicker>
      <Headline size={96}>
        Breakfast berkhasiat? <Sage>“Mahal!”</Sage>
      </Headline>
    </Pad>
    <Pad top={520}>
      <Calc top="RM12 × 30 hari" result="= RM360 😱" />
      <Body size={36} style={{ marginTop: 36 }}>
        Nak join wellness coaching? <B>“Mahal la…”</B>
      </Body>
    </Pad>
    <Pad top={1170}>
      <Tag />
    </Pad>
  </Slide>
);

const Line: React.FC<{ item: string; verdict: string }> = ({ item, verdict }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", borderBottom: `3px dashed ${T.rule}` }}>
    <div style={{ fontSize: 38, fontWeight: 600 }}>{item}</div>
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 52, color: T.sage, textTransform: "uppercase" }}>{verdict}</div>
  </div>
);

const S3: React.FC = () => (
  <Slide index={2} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Bila nak healing</Kicker>
      <Headline size={96}>
        Kalkulator <Sage>hilang ke mana?</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 480, left: 104, right: 104, background: "#fff", border: "3px solid #E6E5E0", borderRadius: 22, padding: "10px 36px 20px" }}>
      <Line item="Kopi RM18 ☕" verdict="On!" />
      <Line item="Food delivery RM30 🛵" verdict="Checkout!" />
      <Line item="Weekend healing RM200" verdict="Deserve!" />
    </div>
    <Pad top={1170}>
      <Tag />
    </Pad>
  </Slide>
);

const S4: React.FC = () => (
  <Slide index={3} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Cuba kira sekali</Kicker>
      <Headline size={96}>
        Kopi tu pun <Sage>RM360 sebulan.</Sage>
      </Headline>
    </Pad>
    <Pad top={520}>
      <Calc top="RM18 × 20 hari kerja" result="= RM360 ☕" />
      <Body size={36} style={{ marginTop: 36 }}>
        Sama je jumlahnya. Yang beza, <B>yang mana kita persoalkan.</B>
      </Body>
    </Pad>
    <Pad top={1170}>
      <Tag />
    </Pad>
  </Slide>
);

const S5: React.FC = () => (
  <Slide index={4} total={TOTAL}>
    <Pad top={220}>
      <Kicker>Jangan salah faham</Kicker>
      <Headline size={124}>
        Bukan salah nak <Sage>healing.</Sage>
      </Headline>
      <Body size={38} style={{ marginTop: 34 }}>
        Kita semua perlukan <B>reward</B> untuk diri sendiri. Saya pun sama.
      </Body>
    </Pad>
  </Slide>
);

const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Soalan sebenar</Kicker>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 84, lineHeight: 1.05, textTransform: "uppercase", color: "#B0B0B0", textDecoration: "line-through" }}>Soal harga</div>
      <Headline size={130} style={{ marginTop: 30 }}>
        Soal <Sage>prioriti.</Sage>
      </Headline>
      <Body size={36} style={{ marginTop: 34 }}>
        Kenapa bila nak jaga kesihatan, <B>setiap ringgit</B> kita persoalkan?
      </Body>
    </Pad>
  </Slide>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="KOMEN SETUJU">
    <Pad top={210}>
      <Headline size={120}>
        Healing penting. <Sage>Kesihatan pun penting.</Sage>
      </Headline>
    </Pad>
    <Pad top={790}>
      <CtaBox>
        <span style={{ fontSize: 46, fontWeight: 700 }}>
          Setuju <span style={{ color: T.gold }}>tak?</span>
        </span>
        <br />
        Komen pendapat awak 👇
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const CBERKIRA_SLIDES = SLIDES.length;
export const CBerkira: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
