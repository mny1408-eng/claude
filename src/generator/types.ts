// Carousel generator: content + brand schema. Content lives in content/carousels/*.json.
// Text fields accept **double asterisks** to highlight words in the accent colour.

export type FontName = "Poppins" | "Inter" | "Montserrat" | "DMSans" | "Manrope";

export type Brand = {
  name: string;
  role: string;
  handle: string;
  colors: { ink: string; cream: string; green: string; orange: string; muted: string; line: string };
  fonts: { heading: FontName; body: FontName };
};

export type Visual =
  | "rice-bowl"
  | "calorie-meter"
  | "balanced-plate"
  | "lifestyle"
  | "save"
  | "calcium-foods"
  | "walk-stairs"
  | "strength-balance"
  | "moon"
  | "pause"
  | "snack-options"
  | "tea"
  | "notepad"
  | "dessert";

// Photos live in public/ (gitignored for personal photos), e.g. "img/st-family.jpg".
// photoPos is a CSS object-position, e.g. "50% 20%".
export type Photo = { photo?: string; photoPos?: string };

export type CoverSlide = { type: "cover"; kicker?: string; title: string[]; sub?: string; small?: string; visual?: Visual } & Photo;
export type ProblemSlide = { type: "problem"; kicker?: string; title: string; body: string[]; chips?: string[]; after?: string; takeaway?: string };
export type StepSlide = { type: "step"; number: string; title: string; body: string[]; visual?: Visual } & Photo;
export type FlowItem = { label: string; note?: string; tone?: "green" | "orange" | "ink" };
export type DiagramSlide = { type: "diagram"; number?: string; title: string; body: string[]; flow: FlowItem[]; takeaway?: string };
export type CtaSlide = { type: "cta"; title: string[]; body: string[]; save?: string };

export type SlideSpec = CoverSlide | ProblemSlide | StepSlide | DiagramSlide | CtaSlide;

export type CarouselSpec = {
  id: string;
  title: string;
  brand?: Partial<Omit<Brand, "colors" | "fonts">> & { colors?: Partial<Brand["colors"]>; fonts?: Partial<Brand["fonts"]> };
  slides: SlideSpec[];
};

export type GeneratorProps = { brand: Brand; carousel: CarouselSpec };

export const SIZE = { width: 1080, height: 1350 };
// Everything with data-fit must stay inside this safe area (checked at render time).
export const SAFE = 64;
export const MARGIN = 96;
// Photo box on step slides (used by the resolution check in scripts/generate-carousel.mjs).
export const STEP_PHOTO = { width: SIZE.width - MARGIN * 2, height: 500 };
