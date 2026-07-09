import { Droplets, Wind } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { describeWeather } from "@/lib/weather-codes";
import { formatWeekday, formatDayMonth, isToday } from "@/lib/utils";
import type { DailyForecast as DailyType } from "@/lib/types";

export function DailyForecast({ daily }: { daily: DailyType[] }) {
  // Overall range for the mini temperature bars.
  const min = Math.min(...daily.map((d) => d.tempMin));
  const max = Math.max(...daily.map((d) => d.tempMax));
  const span = max - min || 1;

  return (
    <GlassCard className="p-5">
      <h2 className="mb-4 text-lg font-semibold">Pronóstico de 7 días</h2>
      <ul className="flex flex-col divide-y divide-white/8">
        {daily.map((d) => {
          const left = ((d.tempMin - min) / span) * 100;
          const width = ((d.tempMax - d.tempMin) / span) * 100;
          return (
            <li key={d.date} className="grid grid-cols-[1fr_auto_2fr] items-center gap-3 py-3 sm:grid-cols-[1.2fr_auto_auto_2fr]">
              <div className="flex flex-col">
                <span className="text-sm font-medium capitalize">
                  {isToday(d.date) ? "Hoy" : formatWeekday(d.date)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDayMonth(d.date)}
                </span>
              </div>

              <WeatherIcon
                code={d.weatherCode}
                className="h-6 w-6 text-primary"
              />

              <div className="hidden items-center gap-3 text-xs text-muted-foreground sm:flex">
                <span className="flex items-center gap-1">
                  <Droplets size={11} className="text-sky-300" />
                  {Math.round(d.precipitationProbabilityMax)}%
                </span>
                <span className="flex items-center gap-1">
                  <Wind size={11} className="text-emerald-300" />
                  {Math.round(d.windSpeedMax)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-8 text-right text-sm text-sky-300">
                  {Math.round(d.tempMin)}°
                </span>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="absolute h-full rounded-full bg-gradient-to-r from-sky-400 to-rose-400"
                    style={{ left: `${left}%`, width: `${Math.max(width, 8)}%` }}
                  />
                </div>
                <span className="w-8 text-sm text-rose-300">
                  {Math.round(d.tempMax)}°
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
}
