"use client";

import { useState } from "react";
import { Thermometer, Umbrella, Wind } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { TemperatureChart } from "@/components/charts/temperature-chart";
import { PrecipitationChart } from "@/components/charts/precipitation-chart";
import { WindChart } from "@/components/charts/wind-chart";
import { WeeklyChart } from "@/components/charts/weekly-chart";
import { cn } from "@/lib/utils";
import type { CityWeather } from "@/lib/types";

type Tab = "temp" | "rain" | "wind";

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "temp", label: "Temperatura", icon: <Thermometer size={15} /> },
  { key: "rain", label: "Lluvia", icon: <Umbrella size={15} /> },
  { key: "wind", label: "Viento", icon: <Wind size={15} /> },
];

export function ChartsSection({ weather }: { weather: CityWeather }) {
  const [tab, setTab] = useState<Tab>("temp");

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <GlassCard className="p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Evolución horaria</h2>
          <div className="flex gap-1 rounded-full bg-white/5 p-1">
            {TABS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  tab === t.key
                    ? "bg-white/12 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.icon}
                <span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
        {tab === "temp" && <TemperatureChart hourly={weather.hourly} />}
        {tab === "rain" && <PrecipitationChart hourly={weather.hourly} />}
        {tab === "wind" && <WindChart hourly={weather.hourly} />}
      </GlassCard>

      <GlassCard className="p-5">
        <h2 className="mb-4 text-lg font-semibold">Comparativa de 7 días</h2>
        <WeeklyChart daily={weather.daily} />
      </GlassCard>
    </div>
  );
}
