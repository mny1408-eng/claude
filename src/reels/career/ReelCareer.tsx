// Reel: pharmacist career → preventive health → wellness coaching (soft recruitment, English speech).
// Clips: public/clips/career/pNN.mp4 (local only). data.json: durations, word times, captions.
// No sticky notes. No income claims. p01 starts mid-sentence in the source take, so the reel opens at "Alhamdulillah".
import React from "react";
import { G, Clip, Ov, TalkingReel, TopCard, reelLength } from "../talking/TalkingReel";
import { C } from "../../theme";
import DATA from "./data.json";

const CLIPS = DATA as Clip[];
export const CAREER_TOTAL = reelLength(CLIPS);

const OVERLAYS: Record<string, Ov[]> = {
  p01: [{ kind: "title", at: 4, text: <>Kenapa seorang pharmacist buat <G>wellness coaching?</G></> }],
  p02: [
    { kind: "name", at: 0 },
    { kind: "title", at: 9, text: <>Selalu jumpa pesakit <G>selepas</G> dah sakit.</> },
  ],
  p03: [{ kind: "title", at: 5, text: <>Kalau kita sampai <G>lebih awal?</G></> }],
  p04: [
    { kind: "title", at: 8, until: 18, text: <>Bukan ubat je. <G>Kaunseling & ubah habit.</G></> },
    { kind: "title", at: 18, text: <>Itulah <G>preventive health.</G></> },
  ],
  p05: [
    { kind: "title", at: 16, until: 23, text: <>Platform: <G>wellness coaching</G></> },
    { kind: "title", at: 23, text: <>Produk cuma alat. <G>Coaching</G> kerja sebenar.</> },
  ],
  p06: [
    { kind: "title", at: 6, until: 26, text: <>Bina budaya yang <G>lebih sihat.</G></> },
    {
      kind: "card",
      at: 26,
      sfx: "stamp",
      el: (
        <TopCard>
          <div style={{ fontWeight: 700, fontSize: 34 }}>Healthcare professional?</div>
          <div style={{ fontWeight: 800, fontSize: 56, marginTop: 4 }}>
            DM saya <span style={{ color: C.gold }}>“GROW”</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: 30, marginTop: 6 }}>Jom borak. Tiada tekanan.</div>
        </TopCard>
      ),
    },
  ],
};

export const ReelCareer: React.FC = () => <TalkingReel clips={CLIPS} folder="career" overlays={OVERLAYS} />;
