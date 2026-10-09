// PM Carousel — "3 sebab awak perlukan coach untuk turun berat" (adapted from a mentor thread, weight-loss context).
// Deliberately not copied: "buat A bila dia cakap A" / blind obedience (unsafe when clients have medicines or
// conditions), harsh "yuran kebodohan" wording, and income-based "pilih yang ada result".
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, BigNum, Body, CtaBox, Headline, Kicker, NumDots, Pad, Portrait, Sage, Slide, T } from "./template";

const TOTAL = 7;

const Num: React.FC<{ n: number }> = ({ n }) => (
  <div style={{ width: 58, height: 58, flex: "none", borderRadius: "50%", background: T.ring, color: T.page, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 27, fontWeight: 700 }}>{n}</div>
);

const Row: React.FC<{ n: number; title: string; body: string }> = ({ n, title, body }) => (
  <div style={{ display: "flex", gap: 26, alignItems: "flex-start", background: "#fff", border: "3px solid #E6E5E0", borderRadius: 20, padding: "22px 28px" }}>
    <Num n={n} />
    <div>
      <div style={{ fontSize: 35, fontWeight: 700 }}>{title}</div>
      <div style={{ fontSize: 29, color: T.textSoft, marginTop: 6, lineHeight: 1.35 }}>{body}</div>
    </div>
  </div>
);

const Quote: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: T.sageSoft, borderLeft: `8px solid ${T.sage}`, borderRadius: 14, padding: "26px 32px", fontSize: 34, lineHeight: 1.4 }}>{children}</div>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Turun berat</Kicker>
      <Headline size={124}>
        3 sebab awak <Sage>perlukan coach.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 860, left: 104, right: 104, display: "flex", alignItems: "center", gap: 40 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={190} />
      </div>
      <Body size={36}>
        Bukan sebab awak lemah. Sebab <B>sorang-sorang memang lagi susah.</B>
      </Body>
    </div>
  </Slide>
);

const Reason: React.FC<{ i: number; title: React.ReactNode; quote: React.ReactNode }> = ({ i, title, quote }) => (
  <Slide index={i} total={TOTAL}>
    <BigNum>{i}</BigNum>
    <Pad top={230}>
      <Kicker>Sebab {i} / 3</Kicker>
      <Headline size={112}>{title}</Headline>
    </Pad>
    <Pad top={760}>
      <Quote>{quote}</Quote>
    </Pad>
    <Pad top={1150}>
      <NumDots total={3} active={i - 1} />
    </Pad>
  </Slide>
);

const S2: React.FC = () => (
  <Reason
    i={1}
    title={
      <>
        Coach nampak <Sage>apa awak tak nampak.</Sage>
      </>
    }
    quote={
      <>
        Awak rasa makan sikit je. Coach nampak <B>3 gelas air manis</B> sehari yang awak tak kira.
      </>
    }
  />
);

const S3: React.FC = () => (
  <Reason
    i={2}
    title={
      <>
        Coach dah lalui <Sage>trial & error.</Sage>
      </>
    }
    quote={
      <>
        Awak tak perlu cuba <B>10 diet trend</B> untuk tahu yang mana tak jalan untuk orang busy.
      </>
    }
  />
);

const S4: React.FC = () => (
  <Reason
    i={3}
    title={
      <>
        Coach tarik awak <Sage>bila nak give up.</Sage>
      </>
    }
    quote={
      <>
        Ada minggu timbang tak turun. Coach tahu itu <B>normal, bukan gagal</B>, dan bantu awak teruskan.
      </>
    }
  />
);

const S5: React.FC = () => (
  <Slide index={4} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Cara pilih coach</Kicker>
      <Headline size={96}>
        Bukan semua coach <Sage>sama.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 450, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 16 }}>
      <Row n={1} title="Ada ilmu, bukan janji magic" body="Red flag: “turun 10kg seminggu”, “tak payah ubah makan”." />
      <Row n={2} title="Tanya sejarah kesihatan awak" body="Ubat, penyakit, alahan. Kalau tak tanya langsung, hati-hati." />
      <Row n={3} title="Plan ikut rutin awak" body="Shift, family, makan luar. Bukan satu plan untuk semua." />
      <Row n={4} title="Ada check-in" body="Bukan jual, lepas tu hilang." />
    </div>
  </Slide>
);

const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Cara guna coach</Kicker>
      <Headline size={96}>
        Dah ada coach? <Sage>Ni kuncinya.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 450, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 16 }}>
      <Row n={1} title="Jujur" body="Report makan betul-betul. Coach tak boleh bantu apa yang dia tak tahu." />
      <Row n={2} title="Cuba plan dulu, baru nilai" body="Bagi masa beberapa minggu sebelum cakap “tak jalan”." />
      <Row n={3} title="Bayar harga" body="Masa, usaha, konsisten. Ilmu free pun perlu masa untuk buat." />
      <Row n={4} title="Ada ubat atau sakit? Beritahu." body="Coach yang baik akan dengar dan adjust, bukan suruh ikut buta-buta." />
    </div>
  </Slide>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="KOMEN NAK">
    <Pad top={210}>
      <Kicker>Kesimpulan</Kicker>
      <Headline size={110}>
        Tak ada coach = awak bayar trial & error <Sage>harga penuh.</Sage>
      </Headline>
    </Pad>
    <Pad top={830}>
      <CtaBox>
        <span style={{ fontSize: 46, fontWeight: 700 }}>
          Komen <span style={{ color: T.gold }}>NAK</span>
        </span>
        <br />
        saya guide awak step by step.
      </CtaBox>
      <Body size={28} style={{ color: T.textSoft, marginTop: 26 }}>
        Coach Nas · Clinical pharmacist + wellness coach
      </Body>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const CPERLU_SLIDES = SLIDES.length;
export const CPerluCoach: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
