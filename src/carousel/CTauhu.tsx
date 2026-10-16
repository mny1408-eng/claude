// PM Carousel — "5 resepi tauhu best lulus diet" (own copy; no source image supplied).
// Framing: tauhu = affordable plant protein; it "passes" when not deep-fried and sauces are controlled.
// No calorie/protein gram figures quoted (vary by brand/type). Sodium note on kicap/sos.
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, CtaBox, Headline, Kicker, Pad, Portrait, Sage, Slide, T } from "./template";
import { RecipeSlide, TipBox } from "./recipe";

const TOTAL = 8;
const WARN_SOFT = "#F6E3DC";
const WARN = "#5A2418";

type Plate = { tofu: string; tofuD: string; sauce?: string; style: "cube" | "sumbat" | "soup" | "silken"; garnish?: boolean; grill?: boolean };

// Cartoon tauhu dish.
const TofuDish: React.FC<{ p: Plate; w?: number }> = ({ p, w = 380 }) => {
  const soup = p.style === "soup";
  return (
    <svg width={w} height={w * 0.72} viewBox="0 0 200 144">
      <ellipse cx="100" cy="132" rx="80" ry="9" fill="rgba(0,0,0,0.08)" />
      {soup ? (
        <>
          <path d="M14 58 Q100 70 186 58 Q182 120 120 128 L80 128 Q18 120 14 58 Z" fill="#F7F3EA" stroke={T.ring} strokeWidth="3" />
          <ellipse cx="100" cy="58" rx="86" ry="18" fill={p.sauce ?? "#EDE6C8"} stroke={T.ring} strokeWidth="3" />
        </>
      ) : (
        <>
          <ellipse cx="100" cy="98" rx="90" ry="30" fill="#F7F3EA" stroke={T.ring} strokeWidth="3" />
          <ellipse cx="100" cy="94" rx="70" ry="20" fill={p.sauce ?? "#F7F3EA"} opacity={p.sauce ? 0.9 : 1} />
        </>
      )}
      {p.style === "cube" &&
        [
          [62, 74],
          [92, 66],
          [122, 74],
          [78, 88],
          [108, 88],
        ].map(([x, y], i) => (
          <g key={i}>
            <path d={`M${x} ${y} l18 -6 l14 6 l-18 6 z`} fill={p.tofu} stroke={p.tofuD} strokeWidth="1.5" />
            <path d={`M${x} ${y} v12 l18 6 v-12 z`} fill={p.tofuD} opacity="0.55" />
            <path d={`M${x + 18} ${y + 6} v12 l14 -6 v-12 z`} fill={p.tofuD} opacity="0.8" />
            {p.grill && <path d={`M${x + 6} ${y - 1} l10 4 M${x + 12} ${y - 3} l10 4`} stroke="#6B3A1E" strokeWidth="1.6" />}
          </g>
        ))}
      {p.style === "sumbat" &&
        [
          [58, 70],
          [100, 64],
          [138, 70],
        ].map(([x, y], i) => (
          <g key={i}>
            <path d={`M${x - 20} ${y + 24} L${x} ${y - 6} L${x + 20} ${y + 24} Z`} fill={p.tofu} stroke={p.tofuD} strokeWidth="2" />
            <path d={`M${x - 8} ${y + 4} q8 -10 16 0`} stroke="#7FB55A" strokeWidth="5" fill="none" strokeLinecap="round" />
            <path d={`M${x - 6} ${y + 2} l-3 -8 M${x + 2} ${y} l0 -9 M${x + 8} ${y + 2} l3 -8`} stroke="#F3EFD9" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        ))}
      {p.style === "silken" && (
        <>
          <rect x="62" y="70" width="76" height="30" rx="8" fill={p.tofu} stroke={p.tofuD} strokeWidth="2" />
          <path d="M70 72 q30 10 60 0" stroke="#5B3A22" strokeWidth="5" fill="none" opacity="0.7" />
        </>
      )}
      {soup &&
        [
          [70, 54],
          [100, 50],
          [128, 56],
        ].map(([x, y], i) => <rect key={i} x={x} y={y} width="16" height="12" rx="2" fill={p.tofu} stroke={p.tofuD} strokeWidth="1.5" />)}
      {soup &&
        [
          [86, 62, -20],
          [116, 60, 20],
        ].map(([x, y, r], i) => (
          <path key={i} transform={`translate(${x} ${y}) rotate(${r})`} d="M-14 0 Q0 -10 14 0 Q0 10 -14 0 Z" fill="#6FA65A" stroke="#3E7D3B" strokeWidth="1.5" />
        ))}
      {p.garnish &&
        [
          [80, 66],
          [96, 62],
          [112, 68],
          [126, 64],
        ].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.2" fill="#7FB55A" stroke="#3E7D3B" strokeWidth="1" />)}
    </svg>
  );
};

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

const TOFU = "#F4E7C2";
const TOFU_D = "#C9B47E";
const TOFU_GOLD = "#E8C27A";
const TOFU_GOLD_D = "#B88A3E";

// 1 — Cover
const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Protein murah, tapi selalu digoreng</Kicker>
      <Headline size={118}>
        5 resepi tauhu best <Sage>lulus diet.</Sage>
      </Headline>
      <Body size={36} style={{ marginTop: 24 }}>
        Tauhu tak salah. Yang selalu buat dia “tak lulus” ialah <B>minyak & sos.</B>
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 780, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 10, transform: "rotate(-2deg)" }}>
      <TofuDish p={{ tofu: TOFU_GOLD, tofuD: TOFU_GOLD_D, style: "sumbat" }} w={320} />
      <TofuDish p={{ tofu: TOFU, tofuD: TOFU_D, style: "cube", sauce: "#C98E58", garnish: true }} w={320} />
    </div>
    <div style={{ position: "absolute", top: 1070, left: 104, right: 104, display: "flex", alignItems: "center", gap: 30 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={120} />
      </div>
      <Body size={29} style={{ color: T.textSoft }}>
        Sesuai untuk yang nak jimat bajet tapi still cukup protein.
      </Body>
    </div>
  </Slide>
);

const RECIPES: { p: Plate; title: React.ReactNode; sub: string; bahan: string; cara: React.ReactNode; tip: React.ReactNode; warn?: React.ReactNode }[] = [
  {
    p: { tofu: TOFU_GOLD, tofuD: TOFU_GOLD_D, style: "sumbat" },
    title: <>Tauhu sumbat <Sage>air fryer</Sage></>,
    sub: "Rangup tanpa goreng celup.",
    bahan: "Tauhu keras, taugeh, timun, lobak merah, sos cili",
    cara: <>Sapu sikit minyak, air fryer sampai garing. Belah & sumbat sayur.</>,
    tip: <>Sayur yang penuh buat dia kenyang. Sos cili <B>cicah sikit</B>, jangan tuang.</>,
    warn: <>Sos kacang sedap tapi tinggi gula & kalori. Kalau nak, satu sudu kecil je.</>,
  },
  {
    p: { tofu: "#FBF4DE", tofuD: "#D8C796", style: "silken", sauce: "#E9DDB8", garnish: true },
    title: <>Tauhu <Sage>kukus kicap</Sage></>,
    sub: "Lembut, siap 10 minit.",
    bahan: "Tauhu sutera / tauhu telur, kicap rendah garam, bawang putih, daun bawang",
    cara: <>Kukus 8–10 minit. Siram kicap & sikit minyak bijan, tabur daun bawang.</>,
    tip: <>Sesuai untuk dinner ringan. Makan dengan sayur bening, dah cukup satu set.</>,
  },
  {
    p: { tofu: TOFU, tofuD: TOFU_D, style: "cube", sauce: "#9A5E3A", garnish: true },
    title: <>Tauhu <Sage>masak kicap</Sage></>,
    sub: "Rasa rumah, versi ringan.",
    bahan: "Tauhu keras, bawang besar, bawang putih, cili, kicap, sedikit air",
    cara: <>Bakar atau air fryer tauhu dulu, baru masuk kuah kicap. <B>Tak perlu goreng.</B></>,
    tip: <>Tambah kacang panjang atau kubis dalam kuah, jadi satu lauk lengkap.</>,
    warn: <>Kicap manis ada gula & garam. Ada kencing manis atau darah tinggi? Kurangkan.</>,
  },
  {
    p: { tofu: TOFU_GOLD, tofuD: TOFU_GOLD_D, style: "cube", grill: true },
    title: <>Tauhu <Sage>bakar</Sage></>,
    sub: "Snek petang yang mengenyangkan.",
    bahan: "Tauhu keras, serbuk kunyit, garam sikit, lada hitam",
    cara: <>Perap ringkas, air fryer atau grill pan sampai keperangan.</>,
    tip: <>Ganti keropok atau kuih petang. <B>Protein buat kenyang lebih lama.</B></>,
  },
  {
    p: { tofu: TOFU, tofuD: TOFU_D, style: "soup", sauce: "#EDE6C8" },
    title: <>Sup <Sage>tauhu sayur</Sage></>,
    sub: "Ringan, sesuai bila tak selera.",
    bahan: "Tauhu sutera / keras, sawi, lobak merah, ikan bilis, bawang putih",
    cara: <>Rebus ikan bilis & bawang, masuk sayur, akhir sekali tauhu.</>,
    tip: <>Masak satu periuk, boleh makan 2 kali. Tambah telur kalau nak lebih protein.</>,
  },
];

const RecipeSlides = RECIPES.map((r, i) => {
  const R: React.FC = () => (
    <RecipeSlide index={i + 1} total={TOTAL} kicker={`Resepi ${String(i + 1).padStart(2, "0")} / 05`} title={r.title} sub={r.sub}>
      <div style={{ display: "flex", justifyContent: "center", marginTop: -20, marginBottom: -10 }}>
        <TofuDish p={r.p} w={360} />
      </div>
      <div style={{ background: "#fff", border: "3px solid #E6E5E0", borderRadius: 20, padding: "6px 26px" }}>
        <Row k="BAHAN" v={r.bahan} />
        <div style={{ borderTop: `2px dashed ${T.rule}` }} />
        <Row k="CARA" v={r.cara} />
      </div>
      <TipBox>{r.tip}</TipBox>
      {r.warn && <Warn>{r.warn}</Warn>}
    </RecipeSlide>
  );
  return R;
});

// 7 — Rules
const RULES: [string, string, React.ReactNode][] = [
  ["🧊", "Pilih tauhu keras / sutera", <>Tauhu pok (yang dah digoreng) serap banyak minyak.</>],
  ["🔥", "Air fryer, kukus, bakar", <>Elak goreng celup minyak banyak.</>],
  ["🥣", "Kawal sos", <>Sos kacang, kicap manis & sos tiram: cicah, jangan siram.</>],
  ["🥬", "Padankan dengan sayur", <>Tauhu + sayur = lauk lengkap.</>],
  ["🍚", "Pinggan", <>½ sayur, ¼ nasi, ¼ tauhu atau protein lain.</>],
];
const S7: React.FC = () => (
  <Slide index={6} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Rahsia lulus diet</Kicker>
      <Headline size={92}>
        Bukan tauhu yang salah. <Sage>Cara masak.</Sage>
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
        Protein jimat, <Sage>perut kenyang.</Sage>
      </Headline>
      <Body size={34} style={{ marginTop: 26 }}>
        Team tauhu sumbat atau tauhu kukus? Komen kat bawah 👇
      </Body>
    </Pad>
    <Pad top={880}>
      <CtaBox>
        <span style={{ fontSize: 44, fontWeight: 700 }}>
          Komen <span style={{ color: T.gold }}>NAK</span>
        </span>
        <br />
        saya bantu susun menu protein ikut bajet awak.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, ...RecipeSlides, S7, S8];
export const CTAUHU_SLIDES = SLIDES.length;
export const CTauhu: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
