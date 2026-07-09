"use client";

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AXIS_STYLE, GRID_COLOR, GlassTooltip } from "./chart-primitives";
import { formatHour } from "@/lib/utils";
import type { HourlyForecast } from "@/lib/types";

export function PrecipitationChart({ hourly }: { hourly: HourlyForecast[] }) {
  const data = hourly.map((h) => ({
    hora: formatHour(h.time),
    Probabilidad: Math.round(h.precipitationProbability)
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="hora" tick={AXIS_STYLE} tickLine={false} axisLine={false} interval={3} />
        <YAxis tick={AXIS_STYLE} tickLine={false} axisLine={false} width={40} unit="%" domain={[0, 100]} />
        <Tooltip content={<GlassTooltip unit="%" />} cursor={{ fill: "hsl(199 89% 58% / 0.08)" }} />
        <Bar dataKey="Probabilidad" radius={[6, 6, 0, 0]} maxBarSize={22}>
          {data.map((d, i) => (
            <Cell key={i} fill={`hsl(199 89% ${45 + (d.Probabilidad / 100) * 25}% / ${0.4 + (d.Probabilidad / 100) * 0.6})`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
