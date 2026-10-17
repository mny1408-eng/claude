// Fonts the brand config can pick from. latin + latin-ext covers English and Bahasa Melayu.
import { loadFont as poppins } from "@remotion/google-fonts/Poppins";
import { loadFont as inter } from "@remotion/google-fonts/Inter";
import { loadFont as montserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as dmSans } from "@remotion/google-fonts/DMSans";
import { loadFont as manrope } from "@remotion/google-fonts/Manrope";
import type { FontName } from "./types";

const LOADERS: Record<FontName, () => { fontFamily: string }> = {
  Poppins: () => poppins("normal", { weights: ["500", "600", "700", "800"], subsets: ["latin", "latin-ext"] }),
  Inter: () => inter("normal", { weights: ["400", "500", "600", "700"], subsets: ["latin", "latin-ext"] }),
  Montserrat: () => montserrat("normal", { weights: ["500", "600", "700", "800"], subsets: ["latin", "latin-ext"] }),
  DMSans: () => dmSans("normal", { weights: ["400", "500", "700"], subsets: ["latin", "latin-ext"] }),
  Manrope: () => manrope("normal", { weights: ["400", "500", "700", "800"], subsets: ["latin", "latin-ext"] }),
};

const cache = new Map<FontName, string>();
export const font = (name: FontName): string => {
  if (!cache.has(name)) {
    const load = LOADERS[name];
    if (!load) throw new Error(`Unsupported font "${name}". Use one of: ${Object.keys(LOADERS).join(", ")}`);
    cache.set(name, `${load().fontFamily}, "Noto Color Emoji", sans-serif`);
  }
  return cache.get(name)!;
};
