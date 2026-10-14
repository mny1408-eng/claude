// PM Carousel — Herbal Aloe: "air kosong bosan? patutlah tak cukup" (adapted from a brand aloe/hydration carousel).
// Product-forward per Coach Nas. Claims limited to what he specified: gut/digestive support, 0 kalori, 4 perisa
// (Original, Mango, Mandarin, Grape). Aloin-removal step attributed to the manufacturer. Cartoon art is generic
// (no copied label/trade dress). MY label: registered traditional medicine (MAL…TC) — see chat note on KKLIU.
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, CtaBox, Headline, Kicker, Pad, Sage, Slide, T } from "./template";

const TOTAL = 6;
const LEAF = "#5FA35A";
const LEAF_D = "#3E7D3B";

type Flavour = { name: string; fruit: string; band: string; liquid: string };
const FLAVOURS: Flavour[] = [
  { name: "Original", fruit: "🌿", band: "#5FA35A", liquid: "#CFE8B8" },
  { name: "Mango", fruit: "🥭", band: "#F2A93B", liquid: "#FBD98A" },
  { name: "Mandarin", fruit: "🍊", band: "#EE7B30", liquid: "#F9C08A" },
  { name: "Grape", fruit: "🍇", band: "#7E4FA0", liquid: "#D4BCE6" },
];

// Cartoon bottle with a happy face.
const Bottle: React.FC<{ f: Flavour; w?: number; face?: boolean }> = ({ f, w = 160, face = true }) => (
  <svg width={w} height={w * 2} viewBox="0 0 100 200">
    <rect x="34" y="4" width="32" height="24" rx="6" fill={f.band} stroke={T.ring} strokeWidth="3" />
    <path d="M30 28 H70 Q82 34 82 50 V182 Q82 194 70 194 H30 Q18 194 18 182 V50 Q18 34 30 28 Z" fill="#fff" stroke={T.ring} strokeWidth="3" />
    <rect x="18" y="58" width="64" height="16" fill={f.band} />
    <path d="M50 178 C40 150 44 120 58 98 C56 126 60 150 50 178 Z" fill={LEAF} stroke={LEAF_D} strokeWidth="2" />
    <path d="M44 180 C32 162 30 140 36 122 C40 142 44 160 44 180 Z" fill={LEAF} stroke={LEAF_D} strokeWidth="2" />
    {face && (
      <>
        <circle cx="38" cy="96" r="4" fill={T.ring} />
        <circle cx="62" cy="96" r="4" fill={T.ring} />
        <path d="M42 106 Q50 114 58 106" fill="none" stroke={T.ring} strokeWidth="3" strokeLinecap="round" />
        <circle cx="31" cy="106" r="5" fill="#F4A6A0" opacity="0.7" />
        <circle cx="69" cy="106" r="5" fill="#F4A6A0" opacity="0.7" />
      </>
    )}
  </svg>
);

// Glass with ice and an aloe-tinted drink.
const Glass: React.FC<{ liquid: string; w?: number }> = ({ liquid, w = 170 }) => (
  <svg width={w} height={w * 1.25} viewBox="0 0 100 125">
    <path d="M10 8 L90 8 L80 118 Q79 122 75 122 L25 122 Q21 122 20 118 Z" fill="#F5FAF8" stroke={T.ring} strokeWidth="3" />
    <path d="M14 40 L86 40 L80 118 Q79 122 75 122 L25 122 Q21 122 20 118 Z" fill={liquid} />
    <rect x="30" y="50" width="18" height="18" rx="4" fill="#fff" opacity="0.85" transform="rotate(-12 39 59)" />
    <rect x="54" y="62" width="18" height="18" rx="4" fill="#fff" opacity="0.85" transform="rotate(10 63 71)" />
    <circle cx="44" cy="96" r="3" fill="#fff" opacity="0.8" />
    <circle cx="60" cy="104" r="2.5" fill="#fff" opacity="0.8" />
    <path d="M10 8 L90 8 L80 118 Q79 122 75 122 L25 122 Q21 122 20 118 Z" fill="none" stroke={T.ring} strokeWidth="3" />
    <path d="M70 0 L62 60" stroke="#E86A5A" strokeWidth="5" strokeLinecap="round" />
  </svg>
);

// Aloe mascot.
const Buddy: React.FC<{ w?: number }> = ({ w = 240 }) => (
  <svg width={w} height={w * 1.1} viewBox="0 0 100 110">
    <path d="M50 8 C68 30 78 60 70 96 Q50 104 30 96 C22 60 32 30 50 8 Z" fill={LEAF} stroke={LEAF_D} strokeWidth="3" />
    <path d="M22 70 C8 58 6 44 10 34 C18 46 22 56 28 64" fill={LEAF} stroke={LEAF_D} strokeWidth="3" />
    <path d="M78 70 C92 58 94 44 90 34 C82 46 78 56 72 64" fill={LEAF} stroke={LEAF_D} strokeWidth="3" />
    <circle cx="42" cy="58" r="4.5" fill={T.ring} />
    <circle cx="58" cy="58" r="4.5" fill={T.ring} />
    <circle cx="43.5" cy="56.5" r="1.5" fill="#fff" />
    <circle cx="59.5" cy="56.5" r="1.5" fill="#fff" />
    <path d="M42 70 Q50 78 58 70" fill="none" stroke={T.ring} strokeWidth="3" strokeLinecap="round" />
    <circle cx="35" cy="68" r="4" fill="#F4A6A0" opacity="0.8" />
    <circle cx="65" cy="68" r="4" fill="#F4A6A0" opacity="0.8" />
    <path d="M44 30 l2 6 M54 26 l-1 6 M50 40 l1 5" stroke="#CFE8B8" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const Tick: React.FC<{ k: string; v?: React.ReactNode }> = ({ k, v }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 18, background: "#fff", border: "3px solid #E6E5E0", borderRadius: 18, padding: "16px 22px" }}>
    <div style={{ width: 44, height: 44, borderRadius: "50%", background: LEAF, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, flex: "none" }}>✓</div>
    <div>
      <div style={{ fontSize: 31, fontWeight: 700 }}>{k}</div>
      {v && <div style={{ fontSize: 25, color: T.textSoft, marginTop: 2 }}>{v}</div>}
    </div>
  </div>
);

// 1 — Hook
const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={180}>
      <Kicker>Jujur je</Kicker>
      <Headline size={116}>
        Air kosong bosan? <Sage>Patutlah tak cukup.</Sage>
      </Headline>
      <Body size={34} style={{ marginTop: 22 }}>
        Bila air <B>sedap</B>, baru senang habis satu botol.
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 760, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 30 }}>
      <Buddy w={230} />
      <Bottle f={FLAVOURS[2]} w={150} />
      <Glass liquid={FLAVOURS[2].liquid} w={170} />
    </div>
  </Slide>
);

// 2 — Why I like it
const S2: React.FC = () => (
  <Slide index={1} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Kenapa saya suka</Kicker>
      <Headline size={96}>
        Herbal <Sage>Aloe</Sage> dalam botol air saya.
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 470, left: 84, right: 330, display: "flex", flexDirection: "column", gap: 14 }}>
      <Tick k="Sokong gut health" v="Bantu jaga kesihatan pencernaan." />
      <Tick k="0 kalori" v="Tak rasa bersalah minum banyak." />
      <Tick k="Sedap & segar" v="Senang cukupkan air harian." />
      <Tick k="Aloin dah dibuang" v="Pharmacist check ✔" />
    </div>
    <div style={{ position: "absolute", top: 520, right: 70, transform: "rotate(6deg)" }}>
      <Bottle f={FLAVOURS[0]} w={210} />
    </div>
  </Slide>
);

// 3 — Flavours
const S3: React.FC = () => (
  <Slide index={2} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Ada 4 perisa</Kicker>
      <Headline size={100}>
        Yang mana <Sage>favourite</Sage> awak?
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 480, left: 60, right: 60, display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10 }}>
      {FLAVOURS.map((f) => (
        <div key={f.name} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 72, lineHeight: 1 }}>{f.fruit}</div>
          <div style={{ marginTop: 6 }}>
            <Bottle f={f} w={150} />
          </div>
          <div style={{ marginTop: 10, background: f.band, color: "#fff", borderRadius: 999, padding: "8px 22px", fontSize: 28, fontWeight: 700 }}>{f.name}</div>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", top: 1110, left: 84, right: 84, background: T.sageSoft, borderRadius: 18, padding: "18px 26px", fontSize: 30, lineHeight: 1.35 }}>
      Komen perisa favourite awak 👇 <span style={{ color: T.textSoft }}>Saya team Mandarin 🍊</span>
    </div>
  </Slide>
);

// 4 — How I drink it
const HOW = [
  ["🥄", "Tuang ikut sukatan label"],
  ["🧊", "Tambah air sejuk + ais"],
  ["🍶", "Bawa satu botol, sip sepanjang hari"],
];
const S4: React.FC = () => (
  <Slide index={3} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Cara saya minum</Kicker>
      <Headline size={96}>
        3 langkah, <Sage>siap.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 440, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 16 }}>
      {HOW.map(([e, t], i) => (
        <div key={t} style={{ display: "flex", alignItems: "center", gap: 22, background: "#fff", border: "3px solid #E6E5E0", borderRadius: 18, padding: "18px 24px" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: T.ring, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 28, flex: "none" }}>{i + 1}</div>
          <div style={{ fontSize: 46, flex: "none" }}>{e}</div>
          <div style={{ fontSize: 32, fontWeight: 600 }}>{t}</div>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", top: 860, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 24 }}>
      <Glass liquid={FLAVOURS[1].liquid} w={150} />
      <Glass liquid={FLAVOURS[3].liquid} w={150} />
      <Glass liquid={FLAVOURS[0].liquid} w={150} />
    </div>
  </Slide>
);

// 5 — Pharmacist check: process
const STEPS = ["Daun aloe dipetik & dibasuh", "Dikisar jadi jus", "Ditapis karbon aktif: buang aloin", "Ditapis lagi, dipasteur & dipekatkan"];
const S5: React.FC = () => (
  <Slide index={4} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Pharmacist check</Kicker>
      <Headline size={88}>
        Kenapa saya tengok <Sage>aloin?</Sage>
      </Headline>
      <Body size={30} style={{ marginTop: 16 }}>
        Aloin ada dalam kulit daun aloe dan bersifat <B>julap (laxative)</B>. Produk aloe yang baik, aloin dah dibuang.
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 640, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 12 }}>
      {STEPS.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 20, background: i === 2 ? T.ring : "#fff", color: i === 2 ? "#fff" : T.text, border: "3px solid #E6E5E0", borderRadius: 16, padding: "16px 22px" }}>
          <div style={{ fontSize: 30, fontWeight: 800, width: 36, color: i === 2 ? T.gold : T.sage }}>{i + 1}</div>
          <div style={{ fontSize: 30, fontWeight: i === 2 ? 700 : 500 }}>{s}</div>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", top: 1130, left: 84, fontSize: 21, color: T.textSoft }}>Sumber: maklumat proses daripada pengeluar.</div>
  </Slide>
);

// 6 — CTA
const S6: React.FC = () => (
  <Slide index={5} total={TOTAL} last lastLabel="KOMEN ALOE">
    <Pad top={200}>
      <Kicker>Habit kecil, kesan besar</Kicker>
      <Headline size={104}>
        Air yang sedap, <Sage>senang konsisten.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 560, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 20 }}>
      {FLAVOURS.map((f) => (
        <Bottle key={f.name} f={f} w={120} />
      ))}
    </div>
    <Pad top={900}>
      <CtaBox>
        <span style={{ fontSize: 44, fontWeight: 700 }}>
          Komen <span style={{ color: T.gold }}>ALOE</span>
        </span>
        <br />
        saya share perisa, harga & cara saya minum.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6];
export const CHIDRASI_SLIDES = SLIDES.length;
export const CHidrasi: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
