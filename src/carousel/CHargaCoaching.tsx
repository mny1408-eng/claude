// PM Carousel — "Coaching mahal?" objection post (Coach Nas voice).
// No prices or RM figures on purpose: the worksheet slide is left blank for the reader to fill in,
// and the actual package price is given in DM. No income, cure or guaranteed-result claims.
import React from "react";
import { useCurrentFrame } from "remotion";
import { ArrowDown, B, Body, Callout, CheckIcon, CtaBox, HEAD, Headline, Kicker, Pad, Portrait, Sage, Slide, T, WriteLine } from "./template";

const TOTAL = 7;

const Box: React.FC<{ children: React.ReactNode; on?: boolean; style?: React.CSSProperties }> = ({ children, on, style }) => (
  <div style={{ background: on ? T.sageSoft : "#fff", border: `3px solid ${on ? T.sage : "#E6E5E0"}`, borderRadius: 22, padding: "26px 32px", ...style }}>{children}</div>
);

const Cross: React.FC = () => (
  <svg viewBox="0 0 24 24" width={44} height={44}>
    <path d="M6 6 L18 18 M18 6 L6 18" fill="none" stroke="#B0B0B0" strokeWidth={3} strokeLinecap="round" />
  </svg>
);

// 1 — Hook
const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={200}>
      <Kicker>Soalan paling kerap</Kicker>
      <Headline size={124}>
        “Coaching mahal la, Coach.”
      </Headline>
      <Headline size={124} style={{ marginTop: 30 }}>
        <Sage>Fair. Jom kira sama-sama.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 940, left: 104, right: 104, display: "flex", alignItems: "center", gap: 40 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={190} />
      </div>
      <Body size={36}>
        Saya tak marah soalan ni. Duit awak, <B>awak berhak tanya.</B>
      </Body>
    </div>
  </Slide>
);

// 2 — Worksheet: what has already been spent
const SPENT = ["Pil / teh kurus yang tak habis", "Yuran gym tapi jarang pergi", "Diet ikut trend, 2 minggu stop", "Baju saiz baru (lagi)"];
const S2: React.FC = () => (
  <Slide index={1} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Kira sendiri · screenshot slide ni</Kicker>
      <Headline size={96}>
        Dah berapa <Sage>habis setakat ni?</Sage>
      </Headline>
    </Pad>
    <Pad top={450}>
      <Box style={{ padding: "24px 32px 30px" }}>
        {SPENT.map((s) => (
          <div key={s} style={{ marginBottom: 34 }}>
            <div style={{ fontSize: 31, fontWeight: 600 }}>{s}</div>
            <WriteLine label="RM" />
          </div>
        ))}
        <div style={{ borderTop: `3px solid ${T.sage}`, marginTop: 12, paddingTop: 6 }}>
          <WriteLine label="JUMLAH  RM" />
        </div>
      </Box>
    </Pad>
    <Pad top={1195}>
      <Body size={30} style={{ color: T.textSoft }}>
        Ramai tak pernah kira. Bila kira, baru terkejut.
      </Body>
    </Pad>
  </Slide>
);

// 3 — The real cost: restarting
const LOOP = ["Isnin: start semangat", "Minggu 2: busy, lari sikit", "Rasa gagal, stop terus", "Bulan depan: “start Isnin” lagi"];
const S3: React.FC = () => (
  <Slide index={2} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Kos yang tak nampak</Kicker>
      <Headline size={96}>
        Yang paling mahal: <Sage>mula semula.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 470, left: 104, right: 104, display: "flex", flexDirection: "column", gap: 4 }}>
      {LOOP.map((l, i) => (
        <React.Fragment key={l}>
          {i > 0 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ArrowDown size={40} />
            </div>
          )}
          <Box on={i === LOOP.length - 1} style={{ padding: "20px 30px", fontSize: 36, fontWeight: 600 }}>
            {l}
          </Box>
        </React.Fragment>
      ))}
    </div>
    <Pad top={1110}>
      <Body size={34}>
        Duit, masa, dan <B sage>keyakinan diri</B> habis setiap kali ulang.
      </Body>
    </Pad>
  </Slide>
);

// 4 — What the fee actually covers
const S4: React.FC = () => (
  <Slide index={3} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Apa yang awak bayar sebenarnya</Kicker>
      <Headline size={96}>
        Bukan beli shake. <Sage>Beli sistem.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 480, left: 104, right: 104, display: "flex", flexDirection: "column", gap: 34 }}>
      <Callout icon={<CheckIcon />}>
        <B>Plan ikut rutin awak</B>: shift, kerja, family, makan luar.
      </Callout>
      <Callout icon={<CheckIcon />}>
        <B>Check-in mingguan.</B> Tersasar? Kita adjust, bukan mula semula.
      </Callout>
      <Callout icon={<CheckIcon />}>
        <B>Komuniti</B> yang sama-sama tengah berubah.
      </Callout>
      <Callout icon={<CheckIcon />}>
        <B>Mata pharmacist.</B> Ada ubat atau sakit tertentu? Saya nampak bila perlu rujuk doktor dulu.
      </Callout>
    </div>
  </Slide>
);

// 5 — Honest fit check
const NOT_FIT = ["Nak result segera dalam seminggu", "Cari pil ajaib", "Belum sedia ubah habit"];
const FIT = ["Dah cuba sendiri berkali-kali", "Perlukan struktur & orang check", "Sedia buat sikit-sikit, konsisten"];
const S5: React.FC = () => (
  <Slide index={4} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Jujur</Kicker>
      <Headline size={96}>
        Coaching <Sage>bukan untuk semua.</Sage>
      </Headline>
    </Pad>
    <Pad top={450}>
      <Box style={{ padding: "22px 30px" }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 3, color: "#9A9A9A", marginBottom: 12 }}>TAK SESUAI KALAU AWAK…</div>
        {NOT_FIT.map((x) => (
          <div key={x} style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, color: T.textSoft, padding: "6px 0" }}>
            <Cross /> {x}
          </div>
        ))}
      </Box>
      <Box on style={{ padding: "22px 30px", marginTop: 24 }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 3, color: T.sage, marginBottom: 12 }}>SESUAI KALAU AWAK…</div>
        {FIT.map((x) => (
          <div key={x} style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, fontWeight: 600, padding: "6px 0" }}>
            <CheckIcon size={44} /> {x}
          </div>
        ))}
      </Box>
    </Pad>
  </Slide>
);

// 6 — Reframe the question
const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={230}>
      <Kicker>Soalan sebenar</Kicker>
      <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 84, lineHeight: 1.05, textTransform: "uppercase", color: "#B0B0B0", textDecoration: "line-through" }}>
        “Mahal tak?”
      </div>
      <Headline size={124} style={{ marginTop: 40 }}>
        “Berapa lagi kos kalau <Sage>terus macam ni?</Sage>”
      </Headline>
    </Pad>
    <Pad top={1000}>
      <Body size={34} style={{ color: T.textSoft }}>
        Murah tapi ulang berkali-kali, atau tersusun sekali tapi jalan. Awak yang pilih.
      </Body>
    </Pad>
  </Slide>
);

// 7 — CTA
const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="KOMEN NAK">
    <div style={{ position: "absolute", top: 190, left: 104, right: 104, display: "flex", alignItems: "center", gap: 40 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={190} />
      </div>
      <div>
        <Headline size={80}>
          Nak tahu <Sage>sesuai tak?</Sage>
        </Headline>
        <Body size={28} style={{ color: T.textSoft, marginTop: 10 }}>
          Coach Nas · Clinical pharmacist
        </Body>
      </div>
    </div>
    <Pad top={500}>
      <Body size={38}>
        Saya explain pakej & harga <B>secara telus</B>, ikut keadaan awak.
      </Body>
      <Body size={34} style={{ marginTop: 22, color: T.textSoft }}>
        Tak sesuai? Saya bagitahu terus. Tak paksa.
      </Body>
    </Pad>
    <Pad top={860}>
      <CtaBox>
        <span style={{ fontSize: 46, fontWeight: 700 }}>
          Komen <span style={{ color: T.gold }}>NAK</span>
        </span>
        <br />
        saya DM detail.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const CHARGA_SLIDES = SLIDES.length;
export const CHargaCoaching: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
