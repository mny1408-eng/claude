// Reusable slide components. Each is driven only by its SlideSpec + the brand.
import React from "react";
import { Img, staticFile } from "remotion";
import type { Brand, CoverSlide, CtaSlide, DiagramSlide, ProblemSlide, StepSlide } from "./types";
import { MARGIN, SIZE, STEP_PHOTO } from "./types";
import { VisualArt } from "./visuals";

export type Ctx = { brand: Brand; head: string; body: string; index: number; total: number };

// "**word**" → highlighted span. On dark slides the accent colours the text; on light slides the
// accent becomes a marker behind dark text, so contrast stays high with a light accent colour.
export const Rich: React.FC<{ text: string; hi: string; marker?: boolean }> = ({ text, hi, marker }) => (
  <>
    {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <span
          key={i}
          style={
            marker
              ? { background: `linear-gradient(transparent 52%, ${hi} 52%, ${hi} 92%, transparent 92%)`, padding: "0 0.08em", WebkitBoxDecorationBreak: "clone", boxDecorationBreak: "clone" }
              : { color: hi }
          }
        >
          {part.slice(2, -2)}
        </span>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      ),
    )}
  </>
);

// Frame: background, header, footer with automatic numbering.
const Frame: React.FC<{ ctx: Ctx; dark?: boolean; tint?: string; children: React.ReactNode }> = ({ ctx, dark, tint, children }) => {
  const c = ctx.brand.colors;
  const fg = dark ? c.cream : c.ink;
  const num = (n: number) => String(n).padStart(2, "0");
  return (
    <div style={{ position: "relative", width: SIZE.width, height: SIZE.height, overflow: "hidden", background: tint ?? (dark ? c.ink : c.cream), color: fg, fontFamily: ctx.body }}>
      <div style={{ position: "absolute", zIndex: 1, top: 56, left: MARGIN, right: MARGIN, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, fontWeight: 600, letterSpacing: 1 }}>
        <span>
          <span style={{ color: dark ? c.green : c.ink, fontFamily: ctx.head, fontWeight: 700 }}>{ctx.brand.name.toUpperCase()}</span>
          <span style={{ opacity: 0.6 }}> · {ctx.brand.role}</span>
        </span>
      </div>
      {children}
      <div style={{ position: "absolute", bottom: 52, left: MARGIN, right: MARGIN, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24, fontWeight: 600 }}>
        <span style={{ opacity: 0.7 }}>{ctx.brand.handle}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ display: "flex", gap: 6 }}>
            {Array.from({ length: ctx.total }).map((_, i) => (
              <span key={i} style={{ width: i === ctx.index ? 26 : 8, height: 8, borderRadius: 4, background: i === ctx.index ? c.orange : fg, opacity: i === ctx.index ? 1 : 0.25 }} />
            ))}
          </span>
          <span style={{ fontFamily: ctx.head, fontWeight: 700 }}>
            {num(ctx.index + 1)}/{num(ctx.total)}
          </span>
        </span>
      </div>
    </div>
  );
};

const Abs: React.FC<{ top: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ top, children, style }) => (
  <div data-fit style={{ position: "absolute", top, left: MARGIN, right: MARGIN, ...style }}>
    {children}
  </div>
);

const Head: React.FC<{ ctx: Ctx; size: number; hi: string; marker?: boolean; children: string; style?: React.CSSProperties }> = ({ ctx, size, hi, marker, children, style }) => (
  <div style={{ fontFamily: ctx.head, fontWeight: 800, fontSize: size, lineHeight: 1.08, letterSpacing: -size * 0.02, ...style }}>
    <Rich text={children} hi={hi} marker={marker} />
  </div>
);

const Kicker: React.FC<{ ctx: Ctx; color: string; children: string }> = ({ ctx, color, children }) => (
  <div style={{ display: "inline-block", fontFamily: ctx.head, fontWeight: 700, fontSize: 26, letterSpacing: 4, textTransform: "uppercase", color, marginBottom: 24 }}>{children}</div>
);

const Body: React.FC<{ lines: string[]; hi: string; marker?: boolean; size?: number; gap?: number; color?: string }> = ({ lines, hi, marker, size = 38, gap = 18, color }) => (
  <div style={{ display: "flex", flexDirection: "column", gap, color }}>
    {lines.map((l, i) => (
      <div key={i} style={{ fontSize: size, lineHeight: 1.36, fontWeight: 500 }}>
        <Rich text={l} hi={hi} marker={marker} />
      </div>
    ))}
  </div>
);

// Full-bleed photo, darkened towards the text so white type stays readable.
const PhotoBg: React.FC<{ src: string; pos?: string; ink: string }> = ({ src, pos, ink }) => (
  <>
    <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos ?? "50% 30%" }} />
    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${ink}D9 0%, ${ink}33 14%, ${ink}14 22%, ${ink}0A 40%, ${ink}B3 62%, ${ink}F2 80%)` }} />
  </>
);

// Cover titles shrink to fit the longest line (Poppins ExtraBold caps ≈ 0.66em per character).
const coverSize = (lines: string[]) => Math.min(172, Math.floor((SIZE.width - MARGIN * 2) / (Math.max(...lines.map((l) => l.replace(/\*\*/g, "").length)) * 0.66)));

// ── Cover ──────────────────────────────────────────────────────────────
export const Cover: React.FC<{ ctx: Ctx; s: CoverSlide }> = ({ ctx, s }) => {
  const c = ctx.brand.colors;
  const size = coverSize(s.title);
  return (
    <Frame ctx={ctx} dark>
      {s.photo ? (
        <PhotoBg src={s.photo} pos={s.photoPos} ink={c.ink} />
      ) : (
        <div style={{ position: "absolute", right: -160, top: 250, width: 640, height: 640, borderRadius: "50%", background: c.green, opacity: 0.12 }} />
      )}
      {/* With a photo the text sits low so faces in the upper half stay visible. */}
      <Abs top={s.photo ? SIZE.height - 420 - s.title.length * size * 1.08 - (s.sub ? 110 : 0) : 190}>
        {s.kicker && <Kicker ctx={ctx} color={c.orange}>{s.kicker}</Kicker>}
        {s.title.map((t, i) => (
          <Head key={i} ctx={ctx} size={size} hi={c.green} style={{ color: c.cream }}>
            {t}
          </Head>
        ))}
        {s.sub && (
          <div style={{ marginTop: 34, fontFamily: ctx.head, fontWeight: 700, fontSize: 62, lineHeight: 1.15, color: c.cream }}>
            <Rich text={s.sub} hi={c.green} />
          </div>
        )}
      </Abs>
      {s.visual && (
        <div data-fit style={{ position: "absolute", right: MARGIN - 10, bottom: 150 }}>
          <VisualArt v={s.visual} c={c} w={430} />
        </div>
      )}
      {s.small && (
        <div data-fit style={{ position: "absolute", left: MARGIN, bottom: 170, width: 420, fontSize: 34, lineHeight: 1.3, fontWeight: 600, color: c.cream }}>
          {s.small}
          <div style={{ marginTop: 22, width: "fit-content", display: "flex", alignItems: "center", gap: 12, background: c.orange, color: c.ink, borderRadius: 999, padding: "12px 26px", fontFamily: ctx.head, fontWeight: 700, fontSize: 26, letterSpacing: 2 }}>SWIPE →</div>
        </div>
      )}
    </Frame>
  );
};

// ── Problem ────────────────────────────────────────────────────────────
export const Problem: React.FC<{ ctx: Ctx; s: ProblemSlide }> = ({ ctx, s }) => {
  const c = ctx.brand.colors;
  return (
    <Frame ctx={ctx}>
      <Abs top={170}>
        {s.kicker && <Kicker ctx={ctx} color={c.orange}>{s.kicker}</Kicker>}
        <Head ctx={ctx} size={104} hi={c.orange} marker>
          {s.title}
        </Head>
        <div style={{ marginTop: 40 }}>
          <Body lines={s.body} hi={c.orange} marker />
        </div>
        {s.chips && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 28 }}>
            {s.chips.map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, background: "#FFFFFF", border: `3px solid ${c.line}`, borderRadius: 999, padding: "12px 24px", fontSize: 32, fontWeight: 600 }}>
                <span style={{ color: c.orange, fontWeight: 800 }}>✕</span>
                <span style={{ textDecoration: "line-through", textDecorationColor: c.orange, textDecorationThickness: 3 }}>{t}</span>
              </div>
            ))}
          </div>
        )}
        {s.after && (
          <div style={{ marginTop: 30 }}>
            <Body lines={[s.after]} hi={c.orange} marker />
          </div>
        )}
      </Abs>
      {s.takeaway && (
        <div data-fit style={{ position: "absolute", left: MARGIN, right: MARGIN, bottom: 150, background: c.ink, color: c.cream, borderRadius: 28, padding: "34px 40px", fontFamily: ctx.head, fontWeight: 700, fontSize: 44, lineHeight: 1.2 }}>
          <Rich text={s.takeaway} hi={c.green} />
        </div>
      )}
    </Frame>
  );
};

// ── Step (alternates layout by slide index to vary composition) ───────
const NumBadge: React.FC<{ ctx: Ctx; n: string }> = ({ ctx, n }) => {
  const c = ctx.brand.colors;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 26 }}>
      <div style={{ width: 92, height: 92, borderRadius: 28, background: c.ink, color: c.green, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: ctx.head, fontWeight: 800, fontSize: 46 }}>{n}</div>
      <div style={{ width: 120, height: 6, borderRadius: 3, background: c.orange }} />
    </div>
  );
};

export const Step: React.FC<{ ctx: Ctx; s: StepSlide }> = ({ ctx, s }) => {
  const c = ctx.brand.colors;
  const visualTop = ctx.index % 2 === 1;
  const wide = s.visual === "lifestyle";
  const art = s.photo ? (
    <div style={{ flexShrink: 0, height: STEP_PHOTO.height, borderRadius: 32, overflow: "hidden" }}>
      <Img src={staticFile(s.photo)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: s.photoPos ?? "50% 30%" }} />
    </div>
  ) : (
    s.visual && (
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
        <VisualArt v={s.visual} c={c} w={wide ? SIZE.width - MARGIN * 2 : 540} />
      </div>
    )
  );
  const text = (
    <div>
      <NumBadge ctx={ctx} n={s.number} />
      <Head ctx={ctx} size={92} hi={c.orange} marker>
        {s.title}
      </Head>
      <div style={{ marginTop: 30 }}>
        <Body lines={s.body} hi={c.orange} marker size={36} />
      </div>
    </div>
  );
  return (
    <Frame ctx={ctx}>
      <div data-fit style={{ position: "absolute", top: 150, bottom: 140, left: MARGIN, right: MARGIN, display: "flex", flexDirection: "column", gap: 36, overflow: "hidden" }}>
        {visualTop ? (
          <>
            {art}
            {text}
          </>
        ) : (
          <>
            {text}
            {art}
          </>
        )}
      </div>
    </Frame>
  );
};

// ── Diagram (fallback flow) ────────────────────────────────────────────
export const Diagram: React.FC<{ ctx: Ctx; s: DiagramSlide }> = ({ ctx, s }) => {
  const c = ctx.brand.colors;
  const tone = (t?: string) => (t === "orange" ? c.orange : t === "ink" ? c.ink : c.green);
  return (
    <Frame ctx={ctx} tint="#EEF3E2">
      <Abs top={150}>
        {s.number && <NumBadge ctx={ctx} n={s.number} />}
        <Head ctx={ctx} size={92} hi={c.orange} marker>
          {s.title}
        </Head>
        <div style={{ marginTop: 26 }}>
          <Body lines={s.body} hi={c.orange} marker size={34} gap={10} />
        </div>
        <div style={{ marginTop: 34, display: "flex", flexDirection: "column", alignItems: "stretch" }}>
          {s.flow.map((f, i) => (
            <React.Fragment key={f.label}>
              {i > 0 && <div style={{ alignSelf: "center", width: 4, height: 30, background: c.ink, opacity: 0.35 }} />}
              <div style={{ display: "flex", alignItems: "center", gap: 20, background: "#FFFFFF", borderRadius: 22, padding: "22px 26px", borderLeft: `12px solid ${tone(f.tone)}` }}>
                <div style={{ fontFamily: ctx.head, fontWeight: 800, fontSize: 32, minWidth: 230 }}>{f.label}</div>
                {f.note && <div style={{ fontSize: 28, color: c.muted, lineHeight: 1.25 }}>{f.note}</div>}
              </div>
            </React.Fragment>
          ))}
        </div>
      </Abs>
      {s.takeaway && (
        <div data-fit style={{ position: "absolute", left: MARGIN, right: MARGIN, bottom: 140, fontFamily: ctx.head, fontWeight: 700, fontSize: 34, lineHeight: 1.25 }}>
          <Rich text={s.takeaway} hi={c.orange} marker />
        </div>
      )}
    </Frame>
  );
};

// ── CTA ────────────────────────────────────────────────────────────────
export const Cta: React.FC<{ ctx: Ctx; s: CtaSlide }> = ({ ctx, s }) => {
  const c = ctx.brand.colors;
  return (
    <Frame ctx={ctx} dark>
      <Abs top={190}>
        {s.title.map((t, i) => (
          <Head key={i} ctx={ctx} size={96} hi={c.green} style={{ color: c.cream }}>
            {t}
          </Head>
        ))}
        <div style={{ marginTop: 40 }}>
          <Body lines={s.body} hi={c.green} size={36} color={c.cream} />
        </div>
      </Abs>
      {s.save && (
        <div data-fit style={{ position: "absolute", left: MARGIN, right: MARGIN, bottom: 160, display: "flex", alignItems: "center", gap: 34, background: c.cream, color: c.ink, borderRadius: 32, padding: "30px 36px" }}>
          <VisualArt v="save" c={c} w={128} />
          <div style={{ fontFamily: ctx.head, fontWeight: 800, fontSize: 52, lineHeight: 1.05, letterSpacing: -1 }}>{s.save}</div>
        </div>
      )}
    </Frame>
  );
};
