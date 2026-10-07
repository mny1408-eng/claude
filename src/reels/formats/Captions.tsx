// Auto-captions for talking-head reels: short chunks (up to `max` words, broken at punctuation or pauses)
// shown one at a time, with the word being spoken highlighted. Words carry their start/end in seconds.
import React from "react";
import { useCurrentFrame } from "remotion";
import { C, FPS } from "../../theme";

export type Word = [start: number, end: number, text: string];

const chunk = (words: Word[], max: number, gap: number): Word[][] => {
  const out: Word[][] = [];
  let cur: Word[] = [];
  words.forEach((w, i) => {
    cur.push(w);
    const next = words[i + 1];
    const breakHere = !next || cur.length >= max || /[.,?!]$/.test(w[2]) || next[0] - w[1] > gap;
    if (breakHere) {
      out.push(cur);
      cur = [];
    }
  });
  return out;
};

export const Captions: React.FC<{ words: Word[]; top?: number; size?: number; max?: number; gap?: number }> = ({ words, top = 1300, size = 66, max = 3, gap = 0.35 }) => {
  const t = useCurrentFrame() / FPS;
  const chunks = chunk(words, max, gap);
  // a chunk stays up from its first word until the next chunk starts (or 0.4s after its last word)
  const i = chunks.findIndex((c, k) => t >= c[0][0] - 0.05 && t < (chunks[k + 1]?.[0][0] ?? c[c.length - 1][1] + 0.4) - 0.05);
  if (i < 0) return null;
  // exactly one word lit: the latest one that has started, while it is still being said
  const lit = chunks[i].reduce((a, w, k) => (t >= w[0] - 0.05 ? k : a), -1);
  const litOn = lit >= 0 && t < chunks[i][lit][1] + 0.25;
  return (
    <div style={{ position: "absolute", top, left: 50, right: 50, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 16px" }}>
      {chunks[i].map(([, , text], k) => {
        const on = litOn && k === lit;
        return (
          <span
            key={k}
            style={{
              fontSize: size,
              fontWeight: 800,
              lineHeight: 1.15,
              padding: "2px 14px",
              borderRadius: 12,
              color: on ? C.ink : "#FFFFFF",
              background: on ? C.gold : "transparent",
              textShadow: on ? "none" : "0 3px 0 rgba(0,0,0,0.55), 0 0 14px rgba(0,0,0,0.5)",
              WebkitTextStroke: on ? "0" : "2px rgba(0,0,0,0.35)",
            }}
          >
            {text.replace(/[.,]$/, "")}
          </span>
        );
      })}
    </div>
  );
};
