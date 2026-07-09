"use client";

import type { TooltipProps } from "recharts";

/** Shared glassy tooltip for all Recharts charts. */
export function GlassTooltip({
  active,
  payload,
  label,
  unit = "",
}: TooltipProps<number, string> & { unit?: string }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="glass-strong rounded-xl px-3 py-2 text-xs shadow-glass">
      {label && <p className="mb-1 font-medium text-foreground">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} className="flex items-center gap-1.5 text-muted-foreground">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ background: entry.color as string }}
          />
          <span className="text-foreground">
            {entry.name}: {typeof entry.value === "number" ? Math.round(entry.value * 10) / 10 : entry.value}
            {unit}
          </span>
        </p>
      ))}
    </div>
  );
}

export const AXIS_STYLE = {
  fontSize: 11,
  fill: "hsl(215 20% 70%)",
} as const;

export const GRID_COLOR = "hsl(217 33% 24% / 0.5)";
