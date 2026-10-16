// PM Carousel — "5 masakan sayur kampung yang lulus diet" (own copy; no source image supplied).
// Framing: no dish is "diet" by itself — it passes because of cooking method + portion (minyak, santan, sambal, garam).
// No calorie numbers quoted. Sodium note for budu/belacan/kicap (relevant for hypertension).
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, CtaBox, Headline, Kicker, Pad, Portrait, Sage, Slide, T } from "./template";
import { RecipeSlide, TipBox } from "./recipe";

const TOTAL = 8;
const WARN_SOFT = "#F6E3DC";
const WARN = "#5A2418";

type Bowl = { broth: string; leaf: string; leafD: string; extra?: "chili" | "lime" | "pumpkin" | "ulam" };

// Cartoon bowl of sayur kampung.
const SayurBowl: React.FC<{ b: Bowl; w?: number }> = ({ b, w = 420 }) => (
  <svg width={w} height={w * 0.72} viewBox="0 0 200 144">
    <ellipse cx="100" cy="132" rx="78" ry="9" fill="rgba(0,0,0,0.08)" />
    <path d="M14 58 Q100 70 186 58 Q182 120 120 128 L80 128 Q18 120 14 58 Z" fill="#F7F3EA" stroke={T.ring} strokeWidth="3" />
    <ellipse cx="100" cy="58" rx="86" ry="18" fill={b.broth} stroke={T.ring} strokeWidth="3" />
    {[
      [60, 52, -20],
      [92, 46, 10],
      [124, 52, -8],
      [76, 62, 25],
      [112, 64, -30],
      [142, 60, 15],
    ].map(([x, y, r], i) => (
      <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
        <path d="M-16 0 Q0 -12 16 0 Q0 12 -16 0 Z" fill={b.leaf} stroke={b.leafD} strokeWidth="1.5" />
        <path d="M-14 0 L14 0" stroke={b.leafD} strokeWidth="1" />
      </g>
    ))}
    {b.extra === "chili" && (
      <>
        <path d="M70 44 q14 -6 24 4" stroke="#C8382A" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M118 46 q12 -4 20 4" stroke="#C8382A" strokeWidth="5" fill="none" strokeLinecap="round" />
      </>
    )}
    {b.extra === "pumpkin" &&
      [
        [70, 56],
        [104, 50],
        [134, 58],
      ].map(([x, y], i) => <rect key={i} x={x} y={y} width="16" height="12" rx="3" fill="#E89A2E" stroke="#B86E14" strokeWidth="1.5" />)}
    {b.extra === "lime" && (
      <g transform="translate(150 40)">
        <circle r="13" fill="#B8D86A" stroke="#6E8F2A" strokeWidth="2" />
        <path d="M-9 0 H9 M0 -9 V9 M-6 -6 L6 6 M6 -6 L-6 6" stroke="#6E8F2A" strokeWidth="1.2" />
      </g>
    )}
    {b.extra === "ulam" && (
      <g transform="translate(160 36)">
        <circle r="14" fill="#5A2418" stroke={T.ring} strokeWidth="2" />
        <circle r="9" fill="#B5402E" />
      </g>
    )}
  </svg>
);

const Row: React.FC<{ k: string; v: React.ReactNode }> = ({ k, v }) => (
  <div style={{ display: "flex", gap: 18, alignItems: "flex-start", padding: "10px 0" }}>
    <div style={{ flex: "none", width: 150, fontSize: 22, fontWeight: 700, letterSpacing: 2, color: T.sage, paddingTop: 5 }}>{k}</div>
    <div style={{ fontSize: 28, lineHeight: 1.35 }}>{v}</div>
  </div>
);

const Warn: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ background: WARN_SOFT, borderRadius: 14, padding: "14px 22px", fontSize: 26, lineHeight: 1.35, color: WARN }}>
    <b>Jaga-jaga:</b> {children}
  </div>
);

// 1 — Cover
const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Diet tak semestinya salad</Kicker>
      <Headline size={118}>
        5 masakan sayur kampung <Sage>lulus diet.</Sage>
      </Headline>
      <Body size={36} style={{ marginTop: 24 }}>
        Menu mak-mak kita pun boleh. Yang penting <B>cara masak</B> & portion.
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 760, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 10, transform: "rotate(-2deg)" }}>
      <SayurBowl b={{ broth: "#F3E2A8", leaf: "#6FA65A", leafD: "#3E7D3B", extra: "pumpkin" }} w={330} />
      <SayurBowl b={{ broth: "#E8E3C8", leaf: "#4E8E3A", leafD: "#2F5E22", extra: "chili" }} w={330} />
    </div>
    <div style={{ position: "absolute", top: 1060, left: 104, right: 104, display: "flex", alignItems: "center", gap: 30 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={120} />
      </div>
      <Body size={29} style={{ color: T.textSoft }}>
        Tak perlu tinggal masakan kampung untuk turun berat.
      </Body>
    </div>
  </Slide>
);

const DISHES: { b: Bowl; title: React.ReactNode; sub: string; bahan: string; cara: React.ReactNode; tip: React.ReactNode; warn?: React.ReactNode }[] = [
  {
    b: { broth: "#E6EEDB", leaf: "#5E9E4A", leafD: "#356B28" },
    title: <>Sayur <Sage>bening</Sage></>,
    sub: "Paling ringan, paling senang.",
    bahan: "Bayam / labu air / sawi, bawang merah, bawang putih, ikan bilis",
    cara: <>Rebus bawang & ikan bilis, masuk sayur, <B>tak perlu minyak langsung.</B></>,
    tip: <>Tambah jagung muda atau udang kecil. Kuah dia boleh jadi “sup” makan tengah hari.</>,
  },
  {
    b: { broth: "#C9C2A0", leaf: "#3F8433", leafD: "#25541D", extra: "chili" },
    title: <>Kangkung <Sage>belacan</Sage></>,
    sub: "Classic gerai, versi rumah.",
    bahan: "Kangkung, belacan, cili, bawang putih, bawang merah",
    cara: <>Tumis dengan <B>1 sudu besar minyak je</B>, api besar, masak cepat supaya sayur masih rangup.</>,
    tip: <>Kat kedai biasanya minyak banyak. Masak sendiri, awak yang kawal minyak.</>,
    warn: <>Belacan masin. Ada darah tinggi? Kurangkan, jangan tambah garam lagi.</>,
  },
  {
    b: { broth: "#EFE6C4", leaf: "#6B9E3A", leafD: "#3F6A1E", extra: "lime" },
    title: <>Kerabu <Sage>pucuk paku</Sage></>,
    sub: "Segar, masam, pedas.",
    bahan: "Pucuk paku, bawang merah, cili, limau kasturi, sedikit kerisik",
    cara: <>Celur pucuk paku, gaul dengan bawang, cili & perahan limau.</>,
    tip: <>Kerisik bagi rasa, tapi <B>1 sudu kecil dah cukup.</B> Tambah udang kering atau telur rebus untuk protein.</>,
  },
  {
    b: { broth: "#F3D98A", leaf: "#7BAA52", leafD: "#4A7A2C", extra: "pumpkin" },
    title: <>Masak lemak <Sage>labu</Sage></>,
    sub: "Boleh, dengan sedikit tweak.",
    bahan: "Labu, pucuk paku / kacang panjang, kunyit, cili padi, santan",
    cara: <>Guna <B>santan cair</B> atau separuh santan + air. Masak sekali, jangan reneh lama-lama.</>,
    tip: <>Labu tu karbo. Kalau dah ambil labu, <B>kurangkan sikit nasi</B>.</>,
  },
  {
    b: { broth: "#E3EED0", leaf: "#5FA04C", leafD: "#36702A", extra: "ulam" },
    title: <>Ulam + <Sage>sambal</Sage></>,
    sub: "Zero masak, zero minyak.",
    bahan: "Pegaga, ulam raja, timun, kacang botol, petai, sambal belacan / budu",
    cara: <>Basuh, potong, hidang. <B>Isi separuh pinggan</B> dengan ulam.</>,
    tip: <>Ulam yang banyak buat kenyang, dan makan pun jadi perlahan.</>,
    warn: <>Sambal & budu tinggi garam. Cicah sikit je, bukan siram.</>,
  },
];

const DishSlides = DISHES.map((d, i) => {
  const D: React.FC = () => (
    <RecipeSlide index={i + 1} total={TOTAL} kicker={`Sayur ${String(i + 1).padStart(2, "0")} / 05`} title={d.title} sub={d.sub}>
      <div style={{ display: "flex", justifyContent: "center", marginTop: -20, marginBottom: -10 }}>
        <SayurBowl b={d.b} w={370} />
      </div>
      <div style={{ background: "#fff", border: "3px solid #E6E5E0", borderRadius: 20, padding: "6px 26px" }}>
        <Row k="BAHAN" v={d.bahan} />
        <div style={{ borderTop: `2px dashed ${T.rule}` }} />
        <Row k="CARA" v={d.cara} />
      </div>
      <TipBox>{d.tip}</TipBox>
      {d.warn && <Warn>{d.warn}</Warn>}
    </RecipeSlide>
  );
  return D;
});

// 7 — Rules
const RULES: [string, string, React.ReactNode][] = [
  ["🫗", "Minyak", <>Ukur pakai sudu, jangan tuang terus dari botol.</>],
  ["🥥", "Santan", <>Santan cair atau separuh santan + air.</>],
  ["🧂", "Garam", <>Belacan, budu, kicap, kiub perasa: pilih satu je.</>],
  ["🐟", "Protein", <>Tambah ikan bilis, udang, telur atau tauhu.</>],
  ["🍚", "Pinggan", <>½ sayur, ¼ nasi, ¼ protein.</>],
];
const S7: React.FC = () => (
  <Slide index={6} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Rahsia lulus diet</Kicker>
      <Headline size={92}>
        Bukan sayur yang salah. <Sage>Cara masak.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 460, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 12 }}>
      {RULES.map(([e, k, v]) => (
        <div key={k} style={{ display: "flex", alignItems: "center", gap: 20, background: "#fff", border: "3px solid #E6E5E0", borderRadius: 16, padding: "16px 22px" }}>
          <div style={{ fontSize: 44, width: 56, textAlign: "center", flex: "none" }}>{e}</div>
          <div>
            <div style={{ fontSize: 30, fontWeight: 700 }}>{k}</div>
            <div style={{ fontSize: 26, color: T.textSoft, lineHeight: 1.3 }}>{v}</div>
          </div>
        </div>
      ))}
    </div>
  </Slide>
);

// 8 — CTA
const S8: React.FC = () => (
  <Slide index={7} total={TOTAL} last lastLabel="KOMEN NAK">
    <Pad top={210}>
      <Kicker>Simpan & cuba minggu ni</Kicker>
      <Headline size={108}>
        Makan macam kat kampung, <Sage>tapi lebih bijak.</Sage>
      </Headline>
      <Body size={34} style={{ marginTop: 26 }}>
        Sayur mana favourite awak? Komen kat bawah 👇
      </Body>
    </Pad>
    <Pad top={900}>
      <CtaBox>
        <span style={{ fontSize: 44, fontWeight: 700 }}>
          Komen <span style={{ color: T.gold }}>NAK</span>
        </span>
        <br />
        saya bantu susun menu ikut lauk rumah awak.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, ...DishSlides, S7, S8];
export const CSAYUR_SLIDES = SLIDES.length;
export const CSayurKampung: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
