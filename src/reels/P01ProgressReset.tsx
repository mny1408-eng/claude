// P01: first reel on the Progress bar reset template. Pattern only ("progress on-off"):
// no numbers about bodies or results, so no sourcing needed and safe for ads.
import { progressResetScenes } from "../templates/ProgressReset";

export const P01_SCENES = progressResetScenes({
  series: "RESET #01",
  hook: "Minggu ni confirm jadi!",
  barLabel: "Progress diet",
  days: [
    { day: "Isnin", pct: 25, note: "semangat gila" },
    { day: "Selasa", pct: 50, note: "masak sendiri" },
    { day: "Rabu", pct: 78, note: "on track!" },
  ],
  reset: { day: "Khamis", note: "makan luar… esok start balik la" },
  loop: "Minggu depan? Ulang semula.",
  insight: ["Masalahnya bukan malas.", "Masalahnya tak ada sistem."],
  fixTitle: "Sistem > semangat",
  fixes: ["Plan untuk hari makan luar", "1 hari terbabas ≠ reset semua", "Ada orang semak progress tiap minggu"],
  end: { lead: "Progress ko jenis on-off?" },
});
