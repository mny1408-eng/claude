// PM Carousel — "Learner" version: what Coach Nas learned from his own IG numbers (attention vs evidence).
// Concept adapted from a doctor-communication carousel; own copy. Influencer quotes are generic myth examples.
// Real data (Metricool IG reels 13 Sep–13 Oct 2026 + Notion weekly audits): "Sape boleh relate?" #pharmacist
// reel 7,146 views / 159 likes / 89 shares; median reel ~40 views; "system / sustainable" monologues 11–51 views.
import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { B, Body, CtaBox, HEAD, Headline, Kicker, Pad, Portrait, Sage, Slide, T } from "./template";

const TOTAL = 6;
const RED = "#A8452F";
const RED_SOFT = "#F6E3DC";

// Phone mockup: either an emoji "influencer" screen or Coach Nas's photo.
const Phone: React.FC<{ w?: number; kind: "inf" | "nas"; badge?: string }> = ({ w = 300, kind, badge }) => {
  const h = w * 1.78;
  return (
    <div style={{ width: w, height: h, borderRadius: w * 0.13, background: "#1E1E1E", padding: w * 0.035, boxShadow: "0 18px 40px rgba(0,0,0,0.18)", flex: "none" }}>
      <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: w * 0.1, overflow: "hidden", background: kind === "inf" ? "linear-gradient(160deg,#F4D1C4,#E6A890)" : "#ddd" }}>
        {kind === "nas" ? (
          <Img src={staticFile("img/coach-nas.jpeg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%" }} />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: w * 0.04 }}>
            <div style={{ fontSize: w * 0.3 }}>😂💊</div>
            <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: w * 0.12, lineHeight: 1.1, textAlign: "center", color: "#fff", letterSpacing: 1, textShadow: "0 2px 8px rgba(0,0,0,0.25)" }}>
              SAPE BOLEH
              <br />
              RELATE?
            </div>
          </div>
        )}
        <div style={{ position: "absolute", top: w * 0.06, left: w * 0.08, right: w * 0.08, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.45)" }}>
          <div style={{ width: "35%", height: "100%", borderRadius: 3, background: "#fff" }} />
        </div>
        {badge && (
          <div style={{ position: "absolute", bottom: w * 0.07, left: w * 0.07, background: kind === "inf" ? RED : T.ring, color: "#fff", fontSize: w * 0.075, fontWeight: 700, padding: `${w * 0.02}px ${w * 0.05}px`, borderRadius: 999 }}>{badge}</div>
        )}
      </div>
    </div>
  );
};

const Quote: React.FC<{ children: React.ReactNode; red?: boolean; small?: boolean }> = ({ children, red, small }) => (
  <div
    style={{
      background: red ? RED_SOFT : T.sageSoft,
      borderRadius: 16,
      padding: "16px 22px",
      fontSize: small ? 27 : 30,
      lineHeight: 1.28,
      fontWeight: red ? 800 : 500,
      fontFamily: red ? HEAD : undefined,
      textTransform: red ? "uppercase" : undefined,
      letterSpacing: red ? 0.5 : undefined,
      color: red ? "#5A2418" : T.text,
    }}
  >
    {children}
  </div>
);

const Mark: React.FC<{ ok: boolean; children: React.ReactNode }> = ({ ok, children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 29, padding: "5px 0" }}>
    <div style={{ width: 38, height: 38, borderRadius: "50%", background: ok ? RED : "#B9B5AC", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 800, flex: "none" }}>{ok ? "✓" : "✕"}</div>
    {children}
  </div>
);

const Label: React.FC<{ children: React.ReactNode; red?: boolean }> = ({ children, red }) => (
  <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: 3, color: red ? RED : T.sage, marginBottom: 14, textTransform: "uppercase" }}>{children}</div>
);

// 1 — Hook (real numbers)
const S1: React.FC = () => (
  <Slide index={0} total={TOTAL}>
    <Pad top={170}>
      <Kicker>Data IG saya sendiri</Kicker>
      <Headline size={96}>
        Reel paling ramai tengok <span style={{ color: RED }}>bukan</span> yang paling scientific.
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 600, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 70 }}>
      <div style={{ transform: "rotate(-4deg)" }}>
        <Phone kind="inf" w={250} badge="7,146 views" />
      </div>
      <div style={{ transform: "rotate(4deg)" }}>
        <Phone kind="nas" w={250} badge="±40 views" />
      </div>
    </div>
    <Pad top={1090}>
      <Body size={32}>
        Reel lawak pharmacist <B>vs</B> reel penuh fakta.
      </Body>
      <Body size={30} style={{ color: T.textSoft, marginTop: 6 }}>
        Ni apa saya belajar. 👉
      </Body>
    </Pad>
  </Slide>
);

// 2 — The numbers
const Stat: React.FC<{ n: string; label: string; red?: boolean }> = ({ n, label, red }) => (
  <div style={{ flex: 1, background: red ? RED_SOFT : T.sageSoft, borderRadius: 18, padding: "20px 22px" }}>
    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 76, lineHeight: 1, color: red ? RED : T.ring }}>{n}</div>
    <div style={{ fontSize: 25, fontWeight: 600, marginTop: 8, lineHeight: 1.25 }}>{label}</div>
  </div>
);
const SN: React.FC = () => (
  <Slide index={1} total={TOTAL}>
    <Pad top={160}>
      <Kicker>Sebulan, ±77 reel</Kicker>
      <Headline size={84}>
        Nombor tak <Sage>tipu.</Sage>
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 420, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 16 }}>
      <Label red>Reel “Sape boleh relate?” #pharmacist</Label>
      <div style={{ display: "flex", gap: 14 }}>
        <Stat red n="7,146" label="views" />
        <Stat red n="159" label="likes" />
        <Stat red n="89" label="shares" />
      </div>
      <div style={{ height: 10 }} />
      <Label>Reel biasa saya</Label>
      <div style={{ display: "flex", gap: 14 }}>
        <Stat n="±40" label="views (median)" />
        <Stat n="11–51" label="views, reel “system / konsisten”" />
      </div>
    </div>
    <div style={{ position: "absolute", top: 950, left: 84, right: 84, background: T.ring, color: T.page, borderRadius: 18, padding: "22px 30px", fontSize: 32, lineHeight: 1.3 }}>
      Satu reel relatable = <span style={{ color: T.gold, fontWeight: 800 }}>lebih 100×</span> reel biasa.
    </div>
    <div style={{ position: "absolute", top: 1100, left: 84, fontSize: 21, color: T.textSoft }}>Sumber: Metricool, reel IG 13 Sep–13 Okt 2026.</div>
  </Slide>
);

// 3 — What each one says
const S2: React.FC = () => (
  <Slide index={2} total={TOTAL}>
    <div style={{ position: "absolute", top: 160, left: 70, right: 70, display: "flex", gap: 30 }}>
      <div style={{ flex: 1 }}>
        <Label red>Influencer cakap:</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Quote red>“Teh ni buang toksin dalam 7 hari!”</Quote>
          <Quote red>“Stop makan nasi sekarang!”</Quote>
          <Quote red>“Satu benda ni rosakkan hormon awak.”</Quote>
        </div>
        <div style={{ marginTop: 26 }}>
          <Mark ok>Jelas.</Mark>
          <Mark ok>Emotional.</Mark>
          <Mark ok>Senang ulang.</Mark>
          <Mark ok>Senang ingat.</Mark>
        </div>
      </div>
      <div style={{ width: 3, background: "#E6E5E0" }} />
      <div style={{ flex: 1 }}>
        <Label>Pharmacist cakap:</Label>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Quote>“It depends…”</Quote>
          <Quote>“Ada banyak factor ni…”</Quote>
          <Quote>“More studies needed.”</Quote>
        </div>
        <div style={{ marginTop: 26 }}>
          <Mark ok={false}>Tak jelas.</Mark>
          <Mark ok={false}>Tak emotional.</Mark>
          <Mark ok={false}>Susah ulang.</Mark>
          <Mark ok={false}>Senang lupa.</Mark>
        </div>
      </div>
    </div>
    <div style={{ position: "absolute", top: 1010, left: 70, right: 70, background: RED_SOFT, borderRadius: 20, padding: "26px 34px" }}>
      <Headline size={64} style={{ color: "#5A2418" }}>
        Yang mana lagi orang nak klik?
      </Headline>
      <Body size={30} style={{ marginTop: 6 }}>
        Jujur, saya pun selalu jadi yang kanan. 😅
      </Body>
    </div>
  </Slide>
);

// 4 — The internet doesn't see credentials first
const STEPS = [
  ["🎣", "Nampak hook dulu."],
  ["🙂", "Lepas tu muka."],
  ["💬", "Lepas tu confidence."],
  ["📄", "Baru explanation."],
];
const S3: React.FC = () => (
  <Slide index={3} total={TOTAL}>
    <Pad top={160}>
      <Headline size={92}>
        Orang tak nampak <Sage>title kita</Sage> dulu.
      </Headline>
    </Pad>
    <div style={{ position: "absolute", top: 400, left: 104, right: 104, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {STEPS.map(([e, t], i) => (
        <div key={t} style={{ display: "flex", alignItems: "center", gap: 14, background: T.sageSoft, borderRadius: 14, padding: "14px 18px" }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.ring, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 22, flex: "none" }}>{i + 1}</div>
          <div style={{ fontSize: 28 }}>
            {e} {t}
          </div>
        </div>
      ))}
    </div>
    <div style={{ position: "absolute", top: 600, left: 70, right: 70, display: "flex", gap: 30 }}>
      <div style={{ flex: 1 }}>
        <Label>Pharmacist buka dengan:</Label>
        <Quote small>“Hari ni kita bincang pharmacokinetics metformin…”</Quote>
      </div>
      <div style={{ width: 3, background: "#E6E5E0" }} />
      <div style={{ flex: 1 }}>
        <Label red>Influencer buka dengan:</Label>
        <Quote red small>“Penat walaupun tidur 8 jam? Mungkin bukan pasal tidur.”</Quote>
      </div>
    </div>
    <div style={{ position: "absolute", top: 860, left: 70, right: 70, background: RED_SOFT, borderRadius: 18, padding: "20px 30px", fontSize: 34, fontWeight: 700, color: "#5A2418" }}>
      ⏱️ Teka siapa dapat 10 saat seterusnya?
    </div>
    <div style={{ position: "absolute", top: 990, left: 70, right: 70, background: T.ring, color: T.page, borderRadius: 18, padding: "22px 30px", fontSize: 34, lineHeight: 1.3 }}>
      Fakta betul <span style={{ color: T.gold, fontWeight: 800 }}>≠</span> orang nak tengok.
    </div>
  </Slide>
);

// 5 — What I'm trying now (no results claimed)
const TIPS = [
  ["🚀", "Mula dengan situasi yang orang relate."],
  ["🗣️", "Cakap macam manusia, bukan textbook."],
  ["👥", "Guna bahasa patient, bukan jargon."],
  ["✅", "Bagi jawapan dulu, baru explain."],
  ["💡", "Buat nuance jadi menarik."],
  ["🛡️", "Explain uncertainty, tapi tetap confident."],
];
const S5: React.FC = () => (
  <Slide index={4} total={TOTAL}>
    <Pad top={160}>
      <Headline size={84}>
        Saya tak nak tiru <span style={{ color: RED }}>info salah.</span>
      </Headline>
      <div style={{ display: "inline-block", marginTop: 16, background: T.sageSoft, borderRadius: 12, padding: "10px 22px", fontFamily: HEAD, fontWeight: 700, fontSize: 40, textTransform: "uppercase", color: T.ring }}>
        Yang saya cuba sekarang:
      </div>
    </Pad>
    <div style={{ position: "absolute", top: 520, left: 84, right: 84, display: "flex", flexDirection: "column", gap: 12 }}>
      {TIPS.map(([e, t], i) => (
        <div key={t} style={{ display: "flex", alignItems: "center", gap: 18, background: "#fff", border: "3px solid #E6E5E0", borderRadius: 16, padding: "14px 22px" }}>
          <div style={{ width: 44, height: 44, borderRadius: "50%", background: T.ring, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 24, flex: "none" }}>{i + 1}</div>
          <div style={{ fontSize: 34 }}>{e}</div>
          <div style={{ fontSize: 31, fontWeight: 600 }}>{t}</div>
        </div>
      ))}
    </div>
  </Slide>
);

// 6 — Why it matters + CTA
const S6: React.FC = () => (
  <Slide index={5} total={TOTAL} last lastLabel="KOMEN GROW">
    <div style={{ position: "absolute", top: 180, left: 104, right: 104, display: "flex", alignItems: "center", gap: 36 }}>
      <div style={{ flex: "none" }}>
        <Portrait size={170} />
      </div>
      <Body size={30} style={{ color: T.textSoft }}>
        Coach Nas · Clinical pharmacist, ±960 followers. Masih belajar, kongsi data sebenar.
      </Body>
    </div>
    <Pad top={440}>
      <Headline size={92}>
        Kalau pharmacist diam, <span style={{ color: RED }}>suara yang lebih kuat</span> akan isi ruang tu.
      </Headline>
      <Body size={34} style={{ marginTop: 26 }}>
        Ilmu kita tak bantu sesiapa kalau <B>patient tak sempat dengar</B>.
      </Body>
    </Pad>
    <Pad top={980}>
      <CtaBox>
        <span style={{ fontSize: 40, fontWeight: 700 }}>
          Healthcare professional? Komen <span style={{ color: T.gold }}>GROW</span>
        </span>
        <br />
        <span style={{ fontSize: 32 }}>Jom belajar sama-sama. Saya kongsi apa yang jalan & apa yang flop.</span>
      </CtaBox>
    </Pad>
  </Slide>
);

const SLIDES = [S1, SN, S2, S3, S5, S6];
export const CINFVSPHARM_SLIDES = SLIDES.length;
export const CInfluencerVsPharmacist: React.FC = () => {
  const S = SLIDES[Math.min(SLIDES.length - 1, useCurrentFrame())];
  return <S />;
};
