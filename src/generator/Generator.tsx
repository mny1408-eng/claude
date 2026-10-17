// Carousel generator composition: one frame = one slide. Content arrives as inputProps
// (see scripts/generate-carousel.mjs), so new carousels need only a new JSON file.
// After fonts load, every [data-fit] block is measured; problems are logged as CAROUSEL_CHECK lines
// which the generator script collects and reports.
import React, { useEffect, useRef, useState } from "react";
import { continueRender, delayRender, useCurrentFrame } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { font } from "./fonts";
import { Cover, Cta, Diagram, Problem, Step } from "./slides";
import type { Ctx } from "./slides";
import type { GeneratorProps } from "./types";
import { SAFE, SIZE } from "./types";
import brandJson from "../../content/carousels/brand.json";
import sampleJson from "../../content/carousels/nak-lose-fat.json";

export const GENERATOR_DEFAULTS = { brand: brandJson, carousel: sampleJson } as unknown as GeneratorProps;

export const calcGeneratorMetadata: CalculateMetadataFunction<GeneratorProps> = ({ props }) => ({
  durationInFrames: Math.max(1, props.carousel.slides.length),
  width: SIZE.width,
  height: SIZE.height,
});

const useFitCheck = (index: number, families: string[]) => {
  const ref = useRef<HTMLDivElement>(null);
  const [handle] = useState(() => delayRender(`fit-check-${index}`));
  useEffect(() => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      continueRender(handle);
    };
    // Wait for the exact brand fonts (not just document.fonts.ready, which can resolve before
    // Remotion's font loaders register them) so we measure the final layout.
    const primary = families.map((f) => f.split(",")[0].trim());
    Promise.all(primary.flatMap((f) => ["500", "700", "800"].map((w) => document.fonts.load(`${w} 40px ${f}`))))
      .catch(() => undefined)
      .then(() => document.fonts.ready)
      // Font swaps can reflow a moment after load resolves: wait until the layout is stable
      // (two identical measurements 100 ms apart, max ~3 s) before checking.
      .then(async () => {
        const sig = () =>
          Array.from(ref.current?.querySelectorAll<HTMLElement>("[data-fit]") ?? [])
            .map((el) => {
              const r = el.getBoundingClientRect();
              return `${Math.round(r.top)},${Math.round(r.bottom)},${Math.round(r.width)}`;
            })
            .join("|");
        let prev = "";
        for (let n = 0; n < 30; n++) {
          await new Promise((r) => setTimeout(r, 100));
          const cur = sig();
          if (cur === prev) break;
          prev = cur;
        }
      })
      .then(() =>
      requestAnimationFrame(() => {
        const root = ref.current;
        if (root) {
          const r0 = root.getBoundingClientRect();
          const k = r0.width / SIZE.width || 1; // Studio preview scales the canvas
          const issues: string[] = [];
          root.querySelectorAll<HTMLElement>("[data-fit]").forEach((el) => {
            const r = el.getBoundingClientRect();
            const label = (el.textContent ?? "").trim().slice(0, 40) || "(visual)";
            const m = SAFE * k;
            if (r.left - r0.left < m || r.top - r0.top < m || r0.right - r.right < m || r0.bottom - r.bottom < m)
              issues.push(`outside safe area: "${label}" (top ${Math.round((r.top - r0.top) / k)}, bottom ${Math.round((r.bottom - r0.top) / k)})`);
            if (el.scrollWidth > el.clientWidth + 2) issues.push(`text wider than its box: "${label}"`);
            // Only boxes that clip (overflow ≠ visible) can actually cut text off; auto-height blocks grow
            // and are covered by the safe-area / overlap checks instead.
            if (getComputedStyle(el).overflowY !== "visible" && el.scrollHeight > el.clientHeight + 2) issues.push(`content taller than its box (${el.scrollHeight - el.clientHeight}px cut off): "${label}"`);
          });
          // overlap between separately positioned blocks
          const blocks = Array.from(root.querySelectorAll<HTMLElement>("[data-fit]")).map((el) => ({ el, r: el.getBoundingClientRect() }));
          for (let i = 0; i < blocks.length; i++)
            for (let j = i + 1; j < blocks.length; j++) {
              const a = blocks[i].r;
              const b = blocks[j].r;
              if (a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom)
                issues.push(
                  `blocks overlap: "${(blocks[i].el.textContent ?? "").trim().slice(0, 24) || "(visual)"}" [y ${Math.round((a.top - r0.top) / k)}–${Math.round((a.bottom - r0.top) / k)}] / "${(blocks[j].el.textContent ?? "").trim().slice(0, 24) || "(visual)"}" [y ${Math.round((b.top - r0.top) / k)}–${Math.round((b.bottom - r0.top) / k)}]`,
                );
            }
          primary.forEach((f) => !document.fonts.check(`700 40px ${f}`) && issues.push(`font not loaded: ${f}`));
          issues.forEach((m) => console.log(`CAROUSEL_CHECK slide ${index + 1}: ${m}`));
          console.log(`CAROUSEL_DONE slide ${index + 1}: ${issues.length} issue(s)`);
        }
        finish();
      }),
    );
  }, [handle, index, families.join("|")]);
  return ref;
};

export const CarouselGenerator: React.FC<GeneratorProps> = ({ brand, carousel }) => {
  const frame = useCurrentFrame();
  const index = Math.min(frame, carousel.slides.length - 1);
  const merged = {
    ...brand,
    ...carousel.brand,
    colors: { ...brand.colors, ...carousel.brand?.colors },
    fonts: { ...brand.fonts, ...carousel.brand?.fonts },
  } as GeneratorProps["brand"];
  const ctx: Ctx = { brand: merged, head: font(merged.fonts.heading), body: font(merged.fonts.body), index, total: carousel.slides.length };
  const ref = useFitCheck(index, [ctx.head, ctx.body]);
  const s = carousel.slides[index];
  let slide: React.ReactNode;
  switch (s.type) {
    case "cover":
      slide = <Cover ctx={ctx} s={s} />;
      break;
    case "problem":
      slide = <Problem ctx={ctx} s={s} />;
      break;
    case "step":
      slide = <Step ctx={ctx} s={s} />;
      break;
    case "diagram":
      slide = <Diagram ctx={ctx} s={s} />;
      break;
    case "cta":
      slide = <Cta ctx={ctx} s={s} />;
      break;
    default:
      throw new Error(`Unknown slide type "${(s as { type: string }).type}" on slide ${index + 1}`);
  }
  return (
    <div ref={ref} style={{ width: SIZE.width, height: SIZE.height, fontFamily: ctx.body }}>
      {slide}
    </div>
  );
};
