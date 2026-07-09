import type { MoonInfo } from "./types";

/**
 * Approximate moon phase from a date using the classic synodic-month
 * calculation. Open-Meteo doesn't expose moon phase, so we derive it locally.
 */
const SYNODIC_MONTH = 29.530588853;
// Known new moon reference: 2000-01-06 18:14 UTC
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0);

export function getMoonInfo(date: Date = new Date()): MoonInfo {
  const daysSince = (date.getTime() - REFERENCE_NEW_MOON) / 86_400_000;
  let phase = (daysSince % SYNODIC_MONTH) / SYNODIC_MONTH;
  if (phase < 0) phase += 1;

  // Illuminated fraction (0 new -> 1 full -> 0 new)
  const illumination = Math.round((1 - Math.cos(phase * 2 * Math.PI)) / 2 * 100);

  const { phaseName, emoji } = classifyPhase(phase);
  return { phase, phaseName, illumination, emoji };
}

function classifyPhase(phase: number): { phaseName: string; emoji: string } {
  const p = phase * 8;
  if (p < 0.5 || p >= 7.5) return { phaseName: "Luna nueva", emoji: "🌑" };
  if (p < 1.5) return { phaseName: "Luna creciente", emoji: "🌒" };
  if (p < 2.5) return { phaseName: "Cuarto creciente", emoji: "🌓" };
  if (p < 3.5) return { phaseName: "Gibosa creciente", emoji: "🌔" };
  if (p < 4.5) return { phaseName: "Luna llena", emoji: "🌕" };
  if (p < 5.5) return { phaseName: "Gibosa menguante", emoji: "🌖" };
  if (p < 6.5) return { phaseName: "Cuarto menguante", emoji: "🌗" };
  return { phaseName: "Luna menguante", emoji: "🌘" };
}
