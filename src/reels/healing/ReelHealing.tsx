// Reel: "Tiba-tiba semua jadi accountant" — healthy spending vs healing spending (Notion REEL IDEA, 10/10/2026).
// Clips: public/clips/healing/hNN.mp4 (local only). data.json: durations, word times, captions.
// No sticky notes. RM12 follows the Notion plan (RM12 × 30 = RM360); Whisper could not make out the amount.
import React from "react";
import { G, Clip, Ov, TalkingReel, TopCard, reelLength, usePop } from "../talking/TalkingReel";
import { C, POPPINS } from "../../theme";
import DATA from "./data.json";

const CLIPS = DATA as Clip[];
export const HEALING_TOTAL = reelLength(CLIPS);

// Calculator display card for the "RM12 × 30" moment.
const Calc: React.FC = () => {
  const p = usePop();
  return (
    <div style={{ position: "absolute", top: 120, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
      <div style={{ transform: `scale(${0.8 + 0.2 * p}) rotate(${(1 - p) * -6}deg)`, opacity: p, background: "#2B2F2C", borderRadius: 30, padding: "22px 24px 26px", boxShadow: "0 14px 40px rgba(0,0,0,0.4)", width: 640 }}>
        <div style={{ background: "#C9D6B5", borderRadius: 16, padding: "18px 26px", textAlign: "right", fontFamily: POPPINS, color: "#1E2A1F" }}>
          <div style={{ fontSize: 40, fontWeight: 600, opacity: 0.75 }}>RM12 × 30</div>
          <div style={{ fontSize: 86, fontWeight: 800, lineHeight: 1.05 }}>= RM360 😱</div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
          {["7", "8", "9", "×"].map((k) => (
            <div key={k} style={{ flex: 1, height: 56, borderRadius: 12, background: k === "×" ? C.gold : "#454B47", color: k === "×" ? C.ink : "#eee", fontFamily: POPPINS, fontWeight: 700, fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {k}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OVERLAYS: Record<string, Ov[]> = {
  h01: [{ kind: "title", at: 8, text: <>Tiba-tiba semua jadi <G>accountant!</G> 🧮</> }],
  h02: [
    { kind: "card", at: 5, until: 10, el: <Calc />, sfx: "tick" },
  ],
  h03: [
    { kind: "title", at: 0, text: <>Mod <G>healing</G> 💸</> },
  ],
  h04: [
    { kind: "title", at: 0, until: 8, text: <>Eh, kalkulator <G>hilang</G> ke mana? 🤔</> },
    { kind: "title", at: 8, text: <>Bukan salah nak <G>healing.</G></> },
  ],
  h05: [{ kind: "title", at: 11, text: <>Setiap ringgit <G>dipersoalkan?</G></> }],
  h06: [
    { kind: "title", at: 0, until: 13, text: <>Bukan soal harga. Soal <G>prioriti.</G></> },
    {
      kind: "card",
      at: 13,
      sfx: "stamp",
      el: (
        <TopCard>
          <div style={{ fontWeight: 800, fontSize: 48, lineHeight: 1.2 }}>
            Healing penting.
            <br />
            <span style={{ color: C.gold }}>Kesihatan pun penting.</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: 32, marginTop: 10 }}>Setuju tak? Komen 👇</div>
        </TopCard>
      ),
    },
  ],
};

export const ReelHealing: React.FC = () => <TalkingReel clips={CLIPS} folder="healing" overlays={OVERLAYS} />;
