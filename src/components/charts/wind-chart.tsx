"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AXIS_STYLE, GRID_COLOR, GlassTooltip } from "./chart-primitives";
import { formatHour } from "@/lib/utils";
import type { HourlyForecast } from "@/lib/types";

export function WindChart({ hourly }: { hourly: HourlyForecast[] }) {
  const data = hourly.map((h) => ({
    hora: formatHour(h.time),
    Viento: Math.round(h.windSpeed),
  }));

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="hora" tick={AXIS_STYLE} tickLine={false} axisLine={false} interval={3} />
        <YAxis tick={AXIS_STYLE} tickLine={false} axisLine={false} width={40} unit="" />
        <Tooltip content={<GlassTooltip unit=" km/h" />} />
        <Line
          type="monotone"
          dataKey="Viento"
          stroke="hsl(160 84% 55%)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, fill: "hsl(160 84% 55%)" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
