"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AXIS_STYLE, GRID_COLOR, GlassTooltip } from "./chart-primitives";
import { formatHour } from "@/lib/utils";
import type { HourlyForecast } from "@/lib/types";

export function TemperatureChart({ hourly }: { hourly: HourlyForecast[] }) {
  const data = hourly.map((h) => ({
    hora: formatHour(h.time),
    Temperatura: Math.round(h.temperature),
    Sensación: Math.round(h.apparentTemperature),
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(199 89% 58%)" stopOpacity={0.5} />
            <stop offset="100%" stopColor="hsl(199 89% 58%)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="feelsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(250 84% 66%)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="hsl(250 84% 66%)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="hora" tick={AXIS_STYLE} tickLine={false} axisLine={false} interval={3} />
        <YAxis tick={AXIS_STYLE} tickLine={false} axisLine={false} width={40} unit="°" />
        <Tooltip content={<GlassTooltip unit="°" />} />
        <Area
          type="monotone"
          dataKey="Sensación"
          stroke="hsl(250 84% 72%)"
          strokeWidth={2}
          fill="url(#feelsGrad)"
        />
        <Area
          type="monotone"
          dataKey="Temperatura"
          stroke="hsl(199 89% 62%)"
          strokeWidth={2.5}
          fill="url(#tempGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
