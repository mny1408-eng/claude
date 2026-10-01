// M01: first reel on the Mitos vs Fakta template (follow-up to T3 Coffee Day).
// Numbers are approximate, from secondary sources (not MyFCD): MalaysianCalorie (kopi O kosong
// ~5 kcal), Homage Malaysia (teh tarik ~26 g / ~4.5 tsp sugar). Swap for MyFCD values if available.
import { mitosFaktaScenes } from "../templates/MitosFakta";

export const M01_SCENES = mitosFaktaScenes({
  no: 1,
  hook: "Ramai percaya…",
  mitos: "Minum kopi buat berat naik.",
  fakta: ["Kopi O kosong ≈ 5 kcal, hampir 0 gula.", "Yang tambah kalori: gula + susu pekat.", "Teh tarik ≈ 4.5 sudu gula segelas."],
  source: "MalaysianCalorie; Homage Malaysia (anggaran)",
  takeawayTitle: "Jadi, tak payah stop kopi.",
  takeaways: ["Turun level: manis → kurang manis → kosong", "Kopi + protein, bukan kopi + kuih"],
  end: { lead: "Nak tahu tabiat mana yang paling bagi kesan?" },
});
