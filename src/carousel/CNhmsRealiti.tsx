// PM Carousel — "1 dalam 2 orang dewasa Malaysia dah overweight" (Coach Nas version of the 8-slide NHMS carousel format).
// Figures: NHMS 2023 fact sheet, Institut Kesihatan Umum, KKM (iku.moh.gov.my/images/nhms2023/fact-sheet-nhms-2023.pdf):
// overweight/obese 54.4%, abdominal obesity 54.5%, physically inactive 29.9%, inadequate fruit & veg 95.1%.
// Waist cut-offs (≥90 cm lelaki, ≥80 cm perempuan): Asian cut-offs used in the Malaysian CPG Management of Obesity.
import React from "react";
import { useCurrentFrame } from "remotion";
import { ArrowDown, B, Body, Callout, CheckIcon, CtaBox, HEAD, Headline, Kicker, Pad, Portrait, Sage, Slide, T } from "./template";

const TOTAL = 8;

const Source: React.FC<{ children?: React.ReactNode }> = ({ children = "Sumber: NHMS 2023, Institut Kesihatan Umum, KKM" }) => (
  <div style={{ display: "inline-block", fontSize: 24, fontWeight: 600, color: T.textSoft, background: T.footer, borderRadius: 999, padding: "12px 26px" }}>{children}</div>
);

const Card: React.FC<{ children: React.ReactNode; on?: boolean; style?: React.CSSProperties }> = ({ children, on, style }) => (
  <div style={{ background: on ? T.sageSoft : "#fff", border: `3px solid ${on ? T.sage : "#E6E5E0"}`, borderRadius: 22, padding: "26px 32px", ...style }}>{children}</div>
);

const Num: React.FC<{ n: number; size?: number }> = ({ n, size = 60 }) => (
  <div style={{ width: size, height: size, flex: "none", borderRadius: "50%", background: T.ring, color: T.page, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.46, fontWeight: 700 }}>{n}</div>
);

// 1 — Fear / hook
const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Data KKM · NHMS 2023</Kicker>
      <Headline size={128}>
        1 dalam 2 orang dewasa Malaysia <Sage>dah overweight.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 720, left: 104, right: 104, display: "flex", alignItems: "center", gap: 44 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={230} />
      </div>
      <Body size={40}>
        Yang scary? Ramai <B>tak perasan</B> dah masuk dalam statistik ni.
      </Body>
    </div>
    <Pad top={1040}>
      <Body size={34} style={{ color: T.textSoft }}>
        Naik sikit-sikit. Tak perasan. Tiba-tiba seluar dah ketat.
      </Body>
    </Pad>
  </Slide>
);

// 2 — Info / data
const STATS = [
  { n: "54.4%", t: "orang dewasa overweight atau obes" },
  { n: "54.5%", t: "ada obesiti abdomen (perut buncit)" },
  { n: "29.9%", t: "tak cukup aktif secara fizikal" },
  { n: "95.1%", t: "tak makan cukup buah & sayur" },
];
const S2: React.FC = () => (
  <Slide index={1} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Inilah realitinya</Kicker>
      <Headline size={96}>
        Nombor ni <Sage>bukan orang lain.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 460, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 18 }}>
      {STATS.map((s, i) => (
        <Card key={s.n} on={i === 0} style={{ display: "flex", alignItems: "center", gap: 36, padding: "22px 36px" }}>
          <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 112, lineHeight: 1, color: i === 0 ? T.ring : T.sage, width: 290, flex: "none" }}>{s.n}</div>
          <div style={{ fontSize: 36, lineHeight: 1.3, fontWeight: 500 }}>{s.t}</div>
        </Card>
      ))}
    </div>
    <Pad top={1180}>
      <Source />
    </Pad>
  </Slide>
);

// 3 — Myth-busting
const MYTHS = [
  { m: "Kena makan sikit je", f: "Makan cukup, tapi tersusun. Protein tiap hidangan bantu kenyang lebih lama." },
  { m: "Skip makan = cepat kurus", f: "Selalunya lapar melampau, last-last makan lebih waktu malam." },
  { m: "Kena exercise teruk dulu", f: "Pemakanan main peranan besar. Mula dengan jalan kaki pun ok." },
  { m: "Gemuk sebab malas", f: "Rutin, tidur, stress & persekitaran semua main peranan." },
];
const S3: React.FC = () => (
  <Slide index={2} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Mitos vs fakta</Kicker>
      <Headline size={96}>
        Bukan salah awak. <Sage>Salah info.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 460, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 16 }}>
      {MYTHS.map((x) => (
        <Card key={x.m} style={{ padding: "20px 32px" }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#9A9A9A", textDecoration: "line-through", marginBottom: 8 }}>✕ {x.m}</div>
          <div style={{ fontSize: 30, lineHeight: 1.33 }}>
            <B sage>✓</B> {x.f}
          </div>
        </Card>
      ))}
    </div>
  </Slide>
);

// 4 — Problem: the busy-worker loop
const LOOP = ["Skip sarapan, terus kerja", "Petang: teh tarik + kuih", "Lapar gila, dinner besar", "Tidur lewat, scroll phone", "Bangun penat, ulang balik"];
const S4: React.FC = () => (
  <Slide index={3} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Kitaran orang busy</Kicker>
      <Headline size={96}>
        Familiar tak <Sage>rutin ni?</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 410, left: 104, right: 104, display: "flex", flexDirection: "column", alignItems: "stretch", gap: 4 }}>
      {LOOP.map((l, i) => (
        <React.Fragment key={l}>
          {i > 0 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ArrowDown size={40} />
            </div>
          )}
          <Card on={i === LOOP.length - 1} style={{ display: "flex", alignItems: "center", gap: 26, padding: "18px 28px" }}>
            <Num n={i + 1} size={56} />
            <div style={{ fontSize: 36, fontWeight: 600 }}>{l}</div>
          </Card>
        </React.Fragment>
      ))}
    </div>
    <Pad top={1150}>
      <Body size={34}>
        Bukan isu willpower. <B sage>Rutin tu yang perlu disusun.</B>
      </Body>
    </Pad>
  </Slide>
);

// 5 — Pharmacist lens: risk beyond the scale
const RISKS = ["Diabetes jenis 2", "Darah tinggi", "Kolesterol tinggi", "Fatty liver", "Sleep apnea", "Sakit lutut & sendi"];
const S5: React.FC = () => (
  <Slide index={4} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Dari kaca mata pharmacist</Kicker>
      <Headline size={96}>
        Bukan sekadar <Sage>nombor timbang.</Sage>
      </Headline>
    </Pad>
    <Pad top={455}>
      <Card on style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <svg viewBox="0 0 48 48" width={84} height={84} style={{ flex: "none" }}>
          <rect x={4} y={16} width={40} height={16} rx={4} fill="none" stroke={T.ring} strokeWidth={3} />
          {[10, 16, 22, 28, 34, 40].map((x) => (
            <line key={x} x1={x} y1={16} x2={x} y2={x % 12 === 4 ? 26 : 22} stroke={T.ring} strokeWidth={2} />
          ))}
        </svg>
        <div style={{ fontSize: 33, lineHeight: 1.35 }}>
          Check lilit pinggang. Risiko naik bila <B>≥90 cm (lelaki)</B> atau <B>≥80 cm (perempuan)</B>.
        </div>
      </Card>
    </Pad>
    <Pad top={700}>
      <Body size={32} style={{ marginBottom: 20, color: T.textSoft }}>
        Lemak berlebihan, terutama di perut, meningkatkan risiko:
      </Body>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {RISKS.map((r) => (
          <div key={r} style={{ background: "#fff", border: `2px solid ${T.rule}`, borderRadius: 999, padding: "16px 26px", fontSize: 31, fontWeight: 600, textAlign: "center" }}>
            {r}
          </div>
        ))}
      </div>
    </Pad>
    <Pad top={1170}>
      <Source>Ini bukan diagnosis. Ada risiko? Buat saringan di klinik.</Source>
    </Pad>
  </Slide>
);

// 6 — Solution / tips makanan
const STEPS = [
  { t: "Pinggan Suku-Suku-Separuh", d: "¼ nasi, ¼ protein, ½ sayur & buah." },
  { t: "Protein setiap hidangan", d: "Telur, ikan, ayam, tauhu, tempe." },
  { t: "Air manis → air kosong", d: "Mula dengan kurangkan satu gelas sehari." },
  { t: "Tidur 7 jam ke atas", d: "Kurang tidur, selera susah nak kawal." },
  { t: "Tambah langkah harian", d: "Jalan lepas makan, naik tangga." },
];
const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Berita baiknya</Kicker>
      <Headline size={96}>
        5 langkah kecil, <Sage>mula minggu ni.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 460, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 16 }}>
      {STEPS.map((s, i) => (
        <Card key={s.t} style={{ display: "flex", alignItems: "center", gap: 28, padding: "20px 30px" }}>
          <Num n={i + 1} />
          <div>
            <div style={{ fontSize: 36, fontWeight: 700 }}>{s.t}</div>
            <div style={{ fontSize: 29, color: T.textSoft, marginTop: 4 }}>{s.d}</div>
          </div>
        </Card>
      ))}
    </div>
  </Slide>
);

// 7 — Promote program: structure + accountability
const S7: React.FC = () => (
  <Slide index={6} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Kenapa ramai gagal</Kicker>
      <Headline size={104}>
        Tahu je <Sage>tak cukup.</Sage>
      </Headline>
      <Body size={38} style={{ marginTop: 26 }}>
        Yang buat beza: <B>struktur + accountability.</B>
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 520, left: 104, right: 104, display: "flex", flexDirection: "column", gap: 38 }}>
      <Callout icon={<CheckIcon />}>
        <B>Plan ikut rutin awak</B> — shift, kerja, family.
      </Callout>
      <Callout icon={<CheckIcon />}>
        <B>Check-in mingguan</B> dengan coach. Tersasar, kita adjust.
      </Callout>
      <Callout icon={<CheckIcon />}>
        <B>Komuniti</B> yang sama-sama nak berubah.
      </Callout>
      <Callout icon={<CheckIcon />}>
        <B>Sokongan nutrisi</B> bila sesuai. Bukan ubat, bukan magic.
      </Callout>
    </div>
  </Slide>
);

// 8 — CTA + Coach Nas identity
const S8: React.FC = () => (
  <Slide index={7} total={TOTAL} last lastLabel="KOMEN NAK">
    <div style={{ position: "absolute", top: 190, left: 104, right: 104, display: "flex", alignItems: "center", gap: 40 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={210} />
      </div>
      <div>
        <Headline size={84}>
          Saya <Sage>Coach Nas.</Sage>
        </Headline>
        <Body size={32} style={{ color: T.textSoft, marginTop: 10 }}>
          Clinical pharmacist + wellness coach
        </Body>
      </div>
    </div>
    <Pad top={500}>
      <Body size={40}>
        Saya bantu orang <B>busy</B> turunkan berat dengan cara <B sage>tersusun</B>: nutrisi, accountability & habit harian.
      </Body>
      <Body size={34} style={{ marginTop: 24, color: T.textSoft }}>
        Tak crash diet. Tak ikut trend. Step by step.
      </Body>
    </Pad>
    <Pad top={880}>
      <CtaBox>
        <span style={{ fontSize: 46, fontWeight: 700 }}>
          Komen <span style={{ color: T.gold }}>NAK</span>
        </span>
        <br />
        saya guide awak step by step.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8];
export const CNHMS_SLIDES = SLIDES.length;
export const CNhmsRealiti: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
