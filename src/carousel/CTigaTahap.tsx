// PM Carousel — "3 tahap rawatan" (adapted from a doctor's "3 levels of doctor" carousel; pharmacist perspective, own copy).
// Scope: a pharmacist does not taper medicines; the message is "notice the signs, record, see your doctor for a dose
// review, never stop on your own". Clinical points: weight loss on antihypertensives → postural dizziness;
// on some diabetes medicines (e.g. insulin, sulfonylureas) → hypoglycaemia. No patient case is claimed.
import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { B, Body, CtaBox, HEAD, Headline, Kicker, Pad, Sage, Slide, T } from "./template";

const TOTAL = 10;
const WARN_SOFT = "#F6E3DC";
const WARN = "#5A2418";

// Isometric 3-step ladder. `hi` = highlighted step (1 top … 3 bottom). `order` flips numbering (bottom = 1).
const Stairs: React.FC<{ hi: 1 | 2 | 3; w?: number; bottomIsOne?: boolean; arrow?: boolean }> = ({ hi, w = 460, bottomIsOne, arrow }) => {
  const steps = [
    { x: 0, y: 150, h: 70 },
    { x: 90, y: 90, h: 130 },
    { x: 180, y: 30, h: 190 },
  ];
  const label = (i: number) => (bottomIsOne ? i + 1 : 3 - i);
  return (
    <svg width={w} height={w * 0.62} viewBox="-10 -40 330 270">
      {steps.map((s, i) => {
        const on = label(i) === hi;
        const top = on ? "#2E7A63" : "#F4F3EF";
        const front = on ? T.ring : "#E4E2DC";
        const side = on ? "#173C30" : "#D2D0C9";
        return (
          <g key={i}>
            <path d={`M${s.x} ${s.y} L${s.x + 30} ${s.y - 22} L${s.x + 120} ${s.y - 22} L${s.x + 90} ${s.y} Z`} fill={top} stroke="#BDBBB4" strokeWidth="1" />
            <rect x={s.x} y={s.y} width="90" height={s.h} fill={front} stroke="#BDBBB4" strokeWidth="1" />
            <path d={`M${s.x + 90} ${s.y} L${s.x + 120} ${s.y - 22} L${s.x + 120} ${s.y + s.h - 22} L${s.x + 90} ${s.y + s.h} Z`} fill={side} />
            <text x={s.x + 45} y={s.y + 50} textAnchor="middle" fontFamily={HEAD} fontWeight={700} fontSize="44" fill={on ? "#fff" : "#4A4A4A"}>
              {label(i)}
            </text>
          </g>
        );
      })}
      {arrow && <path d="M30 120 Q120 -40 260 -20" fill="none" stroke={T.ring} strokeWidth="6" strokeLinecap="round" markerEnd="url(#ah)" />}
      <defs>
        <marker id="ah" markerWidth="8" markerHeight="8" refX="5" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={T.ring} />
        </marker>
      </defs>
    </svg>
  );
};

const Photo: React.FC<{ top?: number; size?: number }> = ({ top = 520, size = 470 }) => (
  <div style={{ position: "absolute", top, right: 60, width: size, height: size * 1.2, borderRadius: 36, overflow: "hidden", border: `6px solid #fff`, boxShadow: "0 18px 40px rgba(0,0,0,0.15)" }}>
    <Img src={staticFile("img/coach-nas.jpeg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%" }} />
  </div>
);

const Row: React.FC<{ e: string; k: string; v?: React.ReactNode; warn?: boolean }> = ({ e, k, v, warn }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 22, background: warn ? WARN_SOFT : "#fff", border: "3px solid #E6E5E0", borderRadius: 18, padding: "18px 24px" }}>
    <div style={{ fontSize: 48, width: 62, textAlign: "center", flex: "none" }}>{e}</div>
    <div>
      <div style={{ fontSize: 32, fontWeight: 700, color: warn ? WARN : T.text }}>{k}</div>
      {v && <div style={{ fontSize: 26, color: warn ? WARN : T.textSoft, lineHeight: 1.35, marginTop: 2 }}>{v}</div>}
    </div>
  </div>
);

// 1 — Hook
const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Pepatah lama perubatan Cina</Kicker>
      <Headline size={112}>
        Ada <Sage>3 tahap</Sage> rawatan.
      </Headline>
      <Body size={36} style={{ marginTop: 20 }}>
        Kebanyakan orang mula di <B>tahap 3.</B>
      </Body>
    </Pad>
    <Photo top={560} size={420} />
    <div style={{ position: "absolute", top: 760, left: 50 }}>
      <Stairs hi={3} w={500} />
    </div>
  </Slide>
);

// 2 — The three levels
const S2: React.FC = () => (
  <Slide index={1} total={TOTAL}>
    <Pad top={160}>
      <div style={{ fontFamily: "WenQuanYi Zen Hei", fontWeight: 700, fontSize: 60, color: T.ring, lineHeight: 1.15 }}>上医治未病，<br />中医治欲病，<br />下医治已病</div>
      <Body size={26} style={{ color: T.textSoft, marginTop: 10 }}>
        “Tabib terbaik rawat sebelum sakit, tabib pertengahan rawat ketika hampir sakit, tabib biasa rawat bila dah sakit.”
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 640, left: 84, right: 480, display: "flex", flexDirection: "column", gap: 26 }}>
      {[
        ["Tahap 1", "Cegah dari awal."],
        ["Tahap 2", "Kesan awal: gula atau tekanan darah dah mula naik."],
        ["Tahap 3", "Rawat bila penyakit dah datang."],
      ].map(([k, v]) => (
        <div key={k} style={{ fontSize: 33, lineHeight: 1.35 }}>
          <b>{k}</b> — {v}
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", top: 820, right: 50 }}>
      <Stairs hi={3} w={440} />
    </div>
  </Slide>
);

// 3 — No shaming
const S3: React.FC = () => (
  <Slide index={2} total={TOTAL}>
    <Pad top={190}>
      <Headline size={120}>
        Bukan nak <Sage>shame.</Sage>
      </Headline>
      <Body size={38} style={{ marginTop: 26 }}>
        Tahap 3 selamatkan nyawa. Saya nampak sendiri setiap hari di hospital, ubat memang <B>penting.</B>
      </Body>
      <Body size={38} style={{ marginTop: 26, color: T.ring, fontWeight: 700 }}>
        Tapi ada satu benda yang saya selalu pegang.
      </Body>
    </Pad>
    <Photo top={800} size={360} />
  </Slide>
);

// 4 — Foundation
const S4: React.FC = () => (
  <Slide index={3} total={TOTAL}>
    <Pad top={240}>
      <Headline size={136}>
        Ubat tak boleh ganti <Sage>asas yang rosak.</Sage>
      </Headline>
    </Pad>
    <Pad top={960}>
      <Body size={36}>
        Ubat boleh <B>turunkan nombor.</B> Asas yang buat badan betul-betul berubah.
      </Body>
    </Pad>
  </Slide>
);

// 5 — Your foundation
const S5: React.FC = () => (
  <Slide index={4} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Asas awak</Kicker>
      <Headline size={96}>
        4 benda yang <Sage>ubat tak boleh bina.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 480, left: 84, right: 84, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {[
        ["😴", "Tidur"],
        ["💪", "Otot"],
        ["🍽️", "Apa yang dimakan"],
        ["📏", "Lilit pinggang"],
      ].map(([e, k]) => (
        <div key={k} style={{ background: T.sageSoft, borderRadius: 22, padding: "30px 26px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 72 }}>{e}</div>
          <div style={{ fontSize: 36, fontWeight: 700 }}>{k}</div>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", top: 1000, left: 84, right: 84, background: T.ring, color: T.page, borderRadius: 18, padding: "22px 28px", fontSize: 32, lineHeight: 1.3 }}>
      Ubat jaga nombor. <span style={{ color: T.gold, fontWeight: 800 }}>Awak</span> yang bina asas.
    </div>
  </Slide>
);

// 6 — Level 1 isn't only for healthy people
const S6: React.FC = () => (
  <Slide index={5} total={TOTAL}>
    <Pad top={170}>
      <Headline size={96}>
        Tahap 1 bukan untuk orang sihat <Sage>je.</Sage>
      </Headline>
      <Body size={36} style={{ marginTop: 24 }}>
        Dah makan ubat pun, awak masih boleh <B>bina balik asas</B> dan naik tangga semula.
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 720, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <Stairs hi={3} w={600} arrow />
    </div>
  </Slide>
);

// 7 — What I keep seeing
const S7: React.FC = () => (
  <Slide index={6} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Yang pharmacist selalu nampak</Kicker>
      <Headline size={96}>
        Berat dah turun. <Sage>Dos ubat masih sama.</Sage>
      </Headline>
      <Body size={34} style={{ marginTop: 24 }}>
        Badan dah berubah, tapi tak ada siapa semak semula ubat.
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 760, left: 84, right: 84, display: "flex", justifyContent: "space-around", fontSize: 120 }}>
      <span>👟</span>
      <span>⚖️</span>
      <span>💊</span>
    </div>
  </Slide>
);

// 8 — Signs
const S8: React.FC = () => (
  <Slide index={7} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Tanda yang ramai abaikan</Kicker>
      <Headline size={92}>
        Ingat badan lemah. <Sage>Rupanya dos dah lebih.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 520, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 14 }}>
      <Row warn e="😵‍💫" k="Pening bila bangun berdiri" v="Boleh jadi tanda tekanan darah dah terlalu rendah dengan dos sekarang." />
      <Row warn e="🥶" k="Menggeletar, berpeluh, lapar sangat" v="Boleh jadi tanda gula rendah, terutama ubat kencing manis tertentu." />
      <Row warn e="🥱" k="Rasa lemah & letih luar biasa" v="Jangan terus anggap “biasalah diet”." />
    </div>
  </Slide>
);

// 9 — What to do
const S9: React.FC = () => (
  <Slide index={8} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Apa patut buat</Kicker>
      <Headline size={96}>
        Langkah <Sage>selamat.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 440, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 14 }}>
      <Row e="📝" k="Rekod bacaan di rumah" v="Tekanan darah atau gula, berserta simptom & masa." />
      <Row e="🩺" k="Bawa rekod jumpa doktor" v="Minta semak dos bila berat & gaya hidup dah berubah." />
      <Row e="💬" k="Tanya pharmacist" v="Kami boleh bantu kenal pasti ubat mana yang perlu disemak." />
    </div>
    <div style={{ position: "absolute", top: 1010, left: 84, right: 84, display: "flex", alignItems: "center", gap: 20, border: `4px solid ${T.ring}`, background: T.sageSoft, borderRadius: 20, padding: "22px 28px" }}>
      <div style={{ width: 54, height: 54, borderRadius: "50%", background: T.ring, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, fontWeight: 800, flex: "none" }}>!</div>
      <div style={{ fontSize: 31, fontWeight: 700, color: T.ring, lineHeight: 1.3 }}>Jangan sesekali berhenti atau ubah dos ubat sendiri.</div>
    </div>
  </Slide>
);

// 10 — CTA
const S10: React.FC = () => (
  <Slide index={9} total={TOTAL} last lastLabel="KOMEN 1, 2 ATAU 3">
    <Pad top={170}>
      <Headline size={104}>
        Kurang ubat, <Sage>bukan tambah.</Sage>
      </Headline>
      <Body size={34} style={{ marginTop: 20 }}>
        Dengan asas yang kuat, dan doktor yang pantau.
      </Body>
    </Pad>
    <div style={{ position: "absolute", top: 560, left: 40 }}>
      <Stairs hi={3} w={460} arrow />
    </div>
    <Photo top={540} size={380} />
    <Pad top={1040}>
      <CtaBox>
        <span style={{ fontSize: 38, fontWeight: 700 }}>
          Awak di tahap mana sekarang? Komen <span style={{ color: T.gold }}>1, 2 atau 3</span>
        </span>
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10];
export const CTIGATAHAP_SLIDES = SLIDES.length;
export const CTigaTahap: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
