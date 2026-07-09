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
import { formatWeekday } from "@/lib/utils";
import type { DailyForecast } from "@/lib/types";

export function WeeklyChart({ daily }: { daily: DailyForecast[] }) {
  const data = daily.map((d) => ({
    dia: formatWeekday(d.date),
    Máxima: Math.round(d.tempMax),
    Mínima: Math.round(d.tempMin),
  }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 10, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="dia" tick={AXIS_STYLE} tickLine={false} axisLine={false} />
        <YAxis tick={AXIS_STYLE} tickLine={false} axisLine={false} width={40} unit="°" />
        <Tooltip content={<GlassTooltip unit="°" />} />
        <Line
          type="monotone"
          dataKey="Máxima"
          stroke="hsl(0 84% 66%)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "hsl(0 84% 66%)" }}
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="Mínima"
          stroke="hsl(199 89% 62%)"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "hsl(199 89% 62%)" }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
