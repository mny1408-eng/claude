// Reel: "Jaga kesihatan pun boleh kena kanser, jadi buat apa jaga?" — Coach Nas talking head, 11 teleprompter takes.
// Clips: public/clips/kanser/cNN.mp4 (local only). data.json: durations, word times, captions.
// Sticky notes only on the side-by-side comparison (c09: jaga vs tak jaga), per Coach Nas.
import React from "react";
import { G, Clip, Ov, TalkingReel, TopCard, reelLength } from "../talking/TalkingReel";
import { C } from "../../theme";
import DATA from "./data.json";

const CLIPS = DATA as Clip[];
export const KANSER_TOTAL = reelLength(CLIPS);

const OVERLAYS: Record<string, Ov[]> = {
  c01: [{ kind: "title", at: 0, text: <>“Jaga makan pun boleh kena <G>kanser.</G>”</> }],
  c02: [
    { kind: "title", at: 0, until: 13, text: <>“Merokok puluh tahun, sihat sampai <G>90.</G>”</> },
    { kind: "title", at: 13, text: <>Pernah dengar ayat ni?</> },
  ],
  c03: [{ kind: "name", at: 6 }],
  c04: [{ kind: "title", at: 7, text: <>Jaga makan, aktif, tak merokok… <G>tetap kena.</G></> }],
  c05: [{ kind: "title", at: 10, text: <>Jadi, buat apa <G>bersusah payah?</G></> }],
  c06: [
    { kind: "title", at: 4, text: <>Risiko <G>≠</G> jaminan</> },
  ],
  c07: [
    { kind: "title", at: 12, text: <>Bukan jaminan <G>100%</G></> },
  ],
  c08: [{ kind: "title", at: 0, text: <>Tapi boleh <G>kurangkan risiko.</G></> }],
  c09: [
    { kind: "sticky", at: 7, side: "left", y: 440, text: "Jaga, kena kanser?", small: "✓ Betul" },
    { kind: "sticky", at: 19, side: "right", y: 440, text: "Tak jaga, hidup 90?", small: "✓ Pun betul" },
    { kind: "title", at: 22, text: <>Jadi <G>tak penting?</G></> },
  ],
  c10: [
    { kind: "title", at: 1, text: <>Tujuan jaga kesihatan?</> },
  ],
  c11: [
    { kind: "title", at: 14, until: 23, text: <>Jangan tunggu <G>diagnosis.</G></> },
    {
      kind: "card",
      at: 23,
      el: (
        <TopCard>
          <div style={{ fontWeight: 800, fontSize: 54 }}>
            Komen <span style={{ color: C.gold }}>NAK</span>
          </div>
          <div style={{ fontWeight: 600, fontSize: 32, marginTop: 6 }}>Follow @coachnas.pharmacist</div>
        </TopCard>
      ),
    },
  ],
};

export const ReelKanser: React.FC = () => <TalkingReel clips={CLIPS} folder="kanser" overlays={OVERLAYS} />;
