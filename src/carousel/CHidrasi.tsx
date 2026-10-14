// PM Carousel — "Hidrasi: habit wellness yang paling selalu dilupa" (adapted from a brand hydration/aloe carousel; own copy).
// Water first; aloe framed as an optional drink that helps people drink more, not a treatment.
// Deliberately NOT carried over from the source: "supports nutrient absorption", "zero calories", flavour list,
// "intestinal health" — US-market claims that may not match the Malaysian label. Process steps are attributed to the
// manufacturer. Water guide: Malaysian Dietary Guidelines (6–8 glasses/day, more in heat/exercise); fluid-restricted
// patients follow their doctor.
import React from "react";
import { useCurrentFrame } from "remotion";
import { B, Body, CtaBox, Headline, Kicker, Pad, Portrait, Sage, Slide, T } from "./template";
import { TipBox } from "./recipe";

const TOTAL = 7;
const WATER = "#5B8FB0";
const WATER_SOFT = "#E3EEF4";

const Card: React.FC<{ e: string; k: string; v: React.ReactNode; soft?: string }> = ({ e, k, v, soft = "#fff" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 22, background: soft, border: "3px solid #E6E5E0", borderRadius: 18, padding: "18px 24px" }}>
    <div style={{ fontSize: 50, flex: "none", width: 64, textAlign: "center" }}>{e}</div>
    <div>
      <div style={{ fontSize: 31, fontWeight: 700 }}>{k}</div>
      <div style={{ fontSize: 27, color: T.textSoft, lineHeight: 1.35, marginTop: 2 }}>{v}</div>
    </div>
  </div>
);

// Simple glass that fills to a level (0–1).
const Glass: React.FC<{ level: number; w?: number }> = ({ level, w = 120 }) => {
  const h = w * 1.35;
  return (
    <svg width={w} height={h} viewBox="0 0 100 135">
      <defs>
        <clipPath id={`g${level}`}>
          <path d="M8 4 L92 4 L82 128 Q81 132 77 132 L23 132 Q19 132 18 128 Z" />
        </clipPath>
      </defs>
      <rect x="0" y={4 + 128 * (1 - level)} width="100" height="135" fill={WATER} opacity="0.55" clipPath={`url(#g${level})`} />
      <path d="M8 4 L92 4 L82 128 Q81 132 77 132 L23 132 Q19 132 18 128 Z" fill="none" stroke={T.ring} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
};

// 1 — Hook
const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={190}>
      <Kicker>Bukan supplement. Bukan detox.</Kicker>
      <Headline size={112}>
        Habit wellness yang paling selalu dilupa: <span style={{ color: WATER }}>air.</span>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 760, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 26 }}>
      {[0.15, 0.35, 0.6, 0.85].map((l) => (
        <Glass key={l} level={l} w={130} />
      ))}
    </div>
    <div style={{ position: "absolute", top: 1030, left: 104, right: 104, display: "flex", alignItems: "center", gap: 32 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={130} />
      </div>
      <Body size={30} style={{ color: T.textSoft }}>
        Ramai busy fikir pasal diet, protein, supplement. Tapi <B>air kosong</B> pun tak cukup.
      </Body>
    </div>
  </Slide>
);

// 2 — Why it matters
const S2: React.FC = () => (
  <Slide index={1} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Kenapa air penting</Kicker>
      <Headline size={92}>
        Air kecil, tapi <Sage>kesan dia luas.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 450, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 14 }}>
      <Card e="🍽️" k="Pencernaan" v={<>Bantu proses hadam makanan & pergerakan usus lebih lancar.</>} />
      <Card e="🧠" k="Tenaga & fokus" v={<>Kurang minum boleh buat rasa penat, pening & susah fokus.</>} />
      <Card e="🤔" k="Lapar atau haus?" v={<>Kadang rasa nak snek sebenarnya haus. Minum dulu, tunggu sekejap.</>} />
      <Card e="🌡️" k="Cuaca Malaysia" v={<>Panas & lembap = lebih banyak berpeluh. Keperluan air naik.</>} />
    </div>
  </Slide>
);

// 3 — How much
const S3: React.FC = () => (
  <Slide index={2} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Berapa banyak?</Kicker>
      <Headline size={92}>
        Panduan umum: <span style={{ color: WATER }}>6–8 gelas</span> sehari.
      </Headline>
      <Body size={30} style={{ color: T.textSoft, marginTop: 14 }}>
        Lebih bila cuaca panas, bersenam atau banyak berpeluh.
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 560, left: 84, right: 84, background: "#fff", border: "3px solid #E6E5E0", borderRadius: 20, padding: "24px 28px" }}>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 4, color: T.sage, marginBottom: 14 }}>CARA MUDAH CHECK: WARNA AIR KENCING</div>
      <div style={{ display: "flex", gap: 10 }}>
        {[
          ["#F6F1C9", "Cukup"],
          ["#EFE08A", "OK"],
          ["#E2C44A", "Minum lagi"],
          ["#C99A2E", "Kurang air"],
        ].map(([c, l]) => (
          <div key={l} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ height: 90, borderRadius: 14, background: c, border: "2px solid rgba(0,0,0,0.06)" }} />
            <div style={{ fontSize: 24, fontWeight: 600, marginTop: 8 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 22, color: T.textSoft, marginTop: 12 }}>Sesetengah ubat & vitamin boleh ubah warna. Guna sebagai panduan kasar je.</div>
    </div>
    <div style={{ position: "absolute", top: 960, left: 84, right: 84, background: "#F6E3DC", borderRadius: 16, padding: "20px 26px", fontSize: 28, lineHeight: 1.35, color: "#5A2418" }}>
      <b>Nota pharmacist:</b> Ada sakit jantung atau buah pinggang dan doktor hadkan air? Ikut had yang doktor bagi.
    </div>
    <div style={{ position: "absolute", top: 1180, left: 84, fontSize: 21, color: T.textSoft }}>Rujukan: Panduan Diet Malaysia (KKM).</div>
  </Slide>
);

// 4 — Malaysian hacks
const S4: React.FC = () => (
  <Slide index={3} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Hydration hacks</Kicker>
      <Headline size={92}>
        Lekatkan air pada <Sage>rutin sedia ada.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 450, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 14 }}>
      <Card soft={WATER_SOFT} e="🌅" k="Bangun tidur" v={<>Satu gelas sebelum capai phone.</>} />
      <Card soft={WATER_SOFT} e="🕌" k="Lepas setiap solat" v={<>5 waktu = 5 gelas. Reminder dah siap ada.</>} />
      <Card soft={WATER_SOFT} e="🍶" k="Botol 1L atas meja" v={<>Habiskan 2 kali sebelum balik kerja.</>} />
      <Card soft={WATER_SOFT} e="☕" k="Teh / kopi" v={<>Setiap cawan, temankan dengan segelas air kosong.</>} />
    </div>
  </Slide>
);

// 5 — Aloe, pharmacist lens
const S5: React.FC = () => (
  <Slide index={4} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Satu lagi habit saya</Kicker>
      <Headline size={92}>
        Sedikit <Sage>aloe</Sage> dalam botol air.
      </Headline>
      <Body size={32} style={{ marginTop: 18 }}>
        Rasa lebih segar, jadi saya <B>minum lebih banyak</B>. Itu sebab utama.
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 640, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ background: "#fff", border: "3px solid #E6E5E0", borderRadius: 20, padding: "22px 28px" }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 4, color: T.sage, marginBottom: 8 }}>PHARMACIST CHECK: ALOIN</div>
        <div style={{ fontSize: 30, lineHeight: 1.4 }}>
          Kulit daun aloe ada <B>aloin</B>, bahan bersifat julap (laxative). Bila pilih produk aloe, tengok sama ada aloin dah dibuang.
        </div>
      </div>
      <TipBox title="JUJUR">
        Aloe ialah minuman sokongan, bukan ubat. Air kosong tetap yang utama.
      </TipBox>
    </div>
    <div style={{ position: "absolute", top: 1010, left: 84, right: 84, display: "flex", alignItems: "center", gap: 22, background: WATER_SOFT, borderRadius: 18, padding: "20px 26px" }}>
      <div style={{ fontSize: 52, flex: "none" }}>🍶</div>
      <div style={{ fontSize: 28, lineHeight: 1.35 }}>
        <b>Cara saya:</b> campur ikut sukatan pada label dalam botol air 1L, minum sedikit-sedikit sepanjang hari.
      </div>
    </div>
  </Slide>
);

// 6 — Process (manufacturer)
const STEPS = [
  "Daun aloe ditanam & dipetik di ladang.",
  "Dibasuh, dibersihkan & dikisar jadi jus.",
  "Ditapis dengan karbon aktif gred makanan untuk buang aloin.",
  "Ditapis lagi untuk buang bahan pepejal.",
  "pH dilaras, dipasteur & dipekatkan.",
];
const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Dari daun ke gelas</Kicker>
      <Headline size={88}>
        Kualiti bermula <Sage>sebelum sampai gelas.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 470, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 12 }}>
      {STEPS.map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", gap: 20, background: "#fff", border: "3px solid #E6E5E0", borderRadius: 16, padding: "16px 22px" }}>
          <div style={{ width: 52, height: 52, borderRadius: "50%", background: i === 2 ? T.ring : T.sageSoft, color: i === 2 ? "#fff" : T.ring, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 26, flex: "none" }}>{i + 1}</div>
          <div style={{ fontSize: 29, lineHeight: 1.3, fontWeight: i === 2 ? 700 : 500 }}>{s}</div>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", top: 1190, left: 84, fontSize: 21, color: T.textSoft }}>Sumber: maklumat proses daripada pengeluar.</div>
  </Slide>
);

// 7 — CTA
const S7: React.FC = () => (
  <Slide index={6} total={TOTAL} last lastLabel="KOMEN NAK">
    <Pad top={210}>
      <Kicker>Mula hari ni</Kicker>
      <Headline size={108}>
        Air dulu. <Sage>Yang lain menyusul.</Sage>
      </Headline>
      <Body size={36} style={{ marginTop: 28 }}>
        Sebelum fikir supplement atau diet baru, pastikan habit paling asas ni dah settle.
      </Body>
    </Pad>
    <Pad top={850}>
      <CtaBox>
        <span style={{ fontSize: 44, fontWeight: 700 }}>
          Komen <span style={{ color: T.gold }}>NAK</span>
        </span>
        <br />
        saya share rutin hidrasi & menu harian yang saya guna.
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7];
export const CHIDRASI_SLIDES = SLIDES.length;
export const CHidrasi: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
