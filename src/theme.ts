import { loadFont as loadPoppins } from "@remotion/google-fonts/Poppins";
import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";

// WDT visual DNA (Notion: "WDT Visual Content System"): cream/ivory base, dark green type,
// restrained gold + one muted accent. Max 2 accents per composition.
export const C = {
  paper: "#F7F5ED",
  ink: "#173C30",
  inkSoft: "#394A41",
  card: "#FFFFFF",
  gold: "#EAD49C", // highlighter (restrained gold)
  marker: "#C0613E", // hand-drawn marks (muted terracotta)
};

export const { fontFamily: POPPINS } = loadPoppins("normal", {
  weights: ["500", "600", "700", "800"],
  subsets: ["latin"],
});
export const { fontFamily: HAND } = loadCaveat("normal", {
  weights: ["700"],
  subsets: ["latin"],
});

export const FPS = 30;
