import { Droplets } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { formatHour } from "@/lib/utils";
import type { HourlyForecast as HourlyType } from "@/lib/types";

export function HourlyForecast({ hourly }: { hourly: HourlyType[] }) {
  return (
    <GlassCard className="p-5">
      <h2 className="mb-4 text-lg font-semibold">Próximas 24 horas</h2>
      <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
        {hourly.map((h, i) => (
          <div key={h.time} className="flex min-w-17 flex-col items-center gap-2 rounded-2xl bg-white/5 px-3 py-4 text-center">
            <span className="text-xs text-muted-foreground">{i === 0 ? "Ahora" : formatHour(h.time)}</span>
            <WeatherIcon code={h.weatherCode} isDay={h.isDay} className="h-7 w-7 text-primary" />
            <span className="text-sm font-semibold">{Math.round(h.temperature)}°</span>
            <span className="flex items-center gap-0.5 text-[11px] text-sky-300">
              <Droplets size={10} />
              {Math.round(h.precipitationProbability)}%
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
