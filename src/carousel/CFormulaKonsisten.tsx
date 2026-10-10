// PM Carousel — "Formula konsisten" (concept adapted from a consistency-formula post; own design and copy).
// Habit data: Lally et al. (2010), Eur J Soc Psychol 40(6):998–1009 — median ~66 days to automaticity, range 18–254.
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, BigNum, Body, CtaBox, HEAD, Headline, Kicker, NumDots, Pad, Sage, Slide, T } from "./template";

const TOTAL = 7;

const Term: React.FC<{ children: React.ReactNode; on?: boolean; dark?: boolean }> = ({ children, on, dark }) => (
  <div
    style={{
      fontFamily: HEAD,
      fontWeight: 700,
      fontSize: 52,
      lineHeight: 1.05,
      textTransform: "uppercase",
      textAlign: "center",
      padding: "22px 26px",
      borderRadius: 18,
      background: dark ? T.ring : on ? T.sageSoft : "#fff",
      color: dark ? T.page : T.text,
      border: `3px solid ${dark ? T.ring : on ? T.sage : T.rule}`,
    }}
  >
    {children}
  </div>
);

const Op: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 64, color: T.sage, textAlign: "center", lineHeight: 1 }}>{children}</div>
);

const Formula: React.FC<{ active?: number }> = ({ active }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <Term dark>Konsisten</Term>
    <Op>=</Op>
    <Term on={active === 1}>Langkah kecil</Term>
    <Op>×</Op>
    <Term on={active === 2}>Ulang hari-hari</Term>
    <Op>×</Op>
    <Term on={active === 3}>Masa</Term>
  </div>
);

const Try: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: T.sageSoft, borderLeft: `8px solid ${T.sage}`, borderRadius: 14, padding: "24px 32px" }}>
    <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: 4, color: T.sage, marginBottom: 10 }}>CONTOH</div>
    <div style={{ fontSize: 34, lineHeight: 1.38, fontWeight: 600 }}>{children}</div>
  </div>
);

const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Untuk orang busy</Kicker>
      <Headline size={130}>
        Formula <Sage>konsisten.</Sage>
      </Headline>
      <Body size={38} style={{ marginTop: 30 }}>
        Selalu mula semangat, lepas tu <B>stop separuh jalan?</B> Masalahnya bukan motivasi.
      </Body>
    </Pad>
    <Pad top={760}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        {["Langkah kecil", "×", "Ulang", "×", "Masa"].map((t, i) =>
          t === "×" ? (
            <Op key={i}>×</Op>
          ) : (
            <div key={i} style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 46, textTransform: "uppercase", padding: "16px 22px", borderRadius: 16, background: "#fff", border: `3px solid ${T.rule}` }}>
              {t}
            </div>
          ),
        )}
      </div>
    </Pad>
  </Slide>
);

const S2: React.FC = () => (
  <Slide index={1} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Simpan formula ni</Kicker>
    </Pad>
    <Pad top={250}>
      <Formula />
    </Pad>
    <Pad top={1110}>
      <Body size={32} style={{ color: T.textSoft }}>
        Kalau satu jadi kosong, hasil pun kosong.
      </Body>
    </Pad>
  </Slide>
);

const Part: React.FC<{ i: number; title: React.ReactNode; body: React.ReactNode; eg: React.ReactNode }> = ({ i, title, body, eg }) => (
  <Slide index={i + 1} total={TOTAL}>
    <BigNum>{i}</BigNum>
    <Pad top={220}>
      <Kicker>Bahagian {i} / 3</Kicker>
      <Headline size={108}>{title}</Headline>
      <Body size={36} style={{ marginTop: 32, color: T.textSoft, paddingRight: 150 }}>
        {body}
      </Body>
    </Pad>
    <Pad top={800}>
      <Try>{eg}</Try>
    </Pad>
    <Pad top={1160}>
      <NumDots total={3} active={i - 1} />
    </Pad>
  </Slide>
);

const S3: React.FC = () => (
  <Part
    i={1}
    title={
      <>
        Langkah <Sage>kecil.</Sage>
      </>
    }
    body="Kurangkan effort untuk mula. Lagi senang, lagi kurang alasan."
    eg="Tak sempat jalan 30 minit? Mula 10 minit lepas makan malam."
  />
);

const S4: React.FC = () => (
  <Part
    i={2}
    title={
      <>
        Ulang <Sage>hari-hari.</Sage>
      </>
    }
    body="Lekatkan pada rutin yang dah ada, supaya tak perlu fikir."
    eg="Lepas gosok gigi pagi → terus minum segelas air kosong."
  />
);

const S5: React.FC = () => (
  <Part
    i={3}
    title={
      <>
        Bagi <Sage>masa.</Sage>
      </>
    }
    body="Hasil kecil tak nampak sehari dua. Masa yang kumpulkan."
    eg="10 minit jalan sehari = 5 jam sebulan. Tanpa rasa terbeban."
  />
);

const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Hasilnya</Kicker>
      <Headline size={116}>
        Lama-lama jadi <Sage>automatik.</Sage>
      </Headline>
    </Pad>
    <Pad top={560}>
      <div style={{ background: "#fff", border: "3px solid #E6E5E0", borderRadius: 22, padding: "30px 36px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 20 }}>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 150, lineHeight: 1, color: T.ring }}>66</div>
          <div style={{ fontSize: 40, fontWeight: 700 }}>hari</div>
        </div>
        <Body size={32} style={{ marginTop: 14 }}>
          Purata masa untuk satu habit mula rasa automatik. Ada orang <B>18 hari</B>, ada yang sampai <B>254 hari</B>.
        </Body>
        <div style={{ fontSize: 22, color: T.textSoft, marginTop: 18 }}>Sumber: Lally et al. (2010), European Journal of Social Psychology</div>
      </div>
    </Pad>
    <Pad top={1100}>
      <Body size={34}>
        Jadi kalau minggu 2 masih rasa susah, <B sage>itu normal.</B>
      </Body>
    </Pad>
  </Slide>
);

const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="KOMEN LANGKAH AWAK">
    <Pad top={200}>
      <Kicker>Mula hari ni</Kicker>
      <Headline size={116}>
        Pilih <Sage>satu</Sage> langkah kecil je.
      </Headline>
      <Body size={36} style={{ marginTop: 30 }}>
        Bukan lima. Satu, dan ulang sampai tak perlu fikir.
      </Body>
    </Pad>
    <Pad top={800}>
      <CtaBox>
        <span style={{ fontSize: 42, fontWeight: 700 }}>Komen langkah kecil awak.</span>
        <br />
        Nak saya bantu susun? Komen <span style={{ color: T.gold, fontWeight: 700 }}>NAK</span>.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const CFORMULA_SLIDES = SLIDES.length;
export const CFormulaKonsisten: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
