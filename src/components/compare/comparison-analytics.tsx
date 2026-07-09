"use client";

import { Thermometer, Droplets, Wind, Sun, CloudRain, Gauge } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { windDirectionLabel } from "@/lib/weather-codes";
import { cn } from "@/lib/utils";
import type { CityWeather } from "@/lib/types";

type Metric = {
  label: string;
  a: number;
  b: number;
  /** Human-readable formatting of each raw value. */
  format: (_v: number) => string;
  /** Show the diverging magnitude bar. Off for angles / clock times. */
  bar?: boolean;
  /** How to phrase the numeric gap in the middle column. */
  deltaUnit?: string;
};

type Section = {
  title: string;
  icon: React.ReactNode;
  metrics: Metric[];
};

const round = (v: number) => Math.round(v);
const time = (iso: string) => (iso.includes("T") ? iso.slice(11, 16) : iso);
const daylight = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.round((s % 3600) / 60);
  return `${h}h ${m.toString().padStart(2, "0")}m`;
};

export function ComparisonAnalytics({ a, b }: { a: CityWeather; b: CityWeather }) {
  const sections: Section[] = [
    {
      title: "Temperatura",
      icon: <Thermometer size={16} />,
      metrics: [
        { label: "Actual", a: a.current.temperature, b: b.current.temperature, format: (v) => `${round(v)}°`, bar: true, deltaUnit: "°" },
        { label: "Sensación térmica", a: a.current.apparentTemperature, b: b.current.apparentTemperature, format: (v) => `${round(v)}°`, bar: true, deltaUnit: "°" },
        { label: "Máxima hoy", a: a.daily[0]?.tempMax ?? 0, b: b.daily[0]?.tempMax ?? 0, format: (v) => `${round(v)}°`, bar: true, deltaUnit: "°" },
        { label: "Mínima hoy", a: a.daily[0]?.tempMin ?? 0, b: b.daily[0]?.tempMin ?? 0, format: (v) => `${round(v)}°`, bar: true, deltaUnit: "°" },
        { label: "Punto de rocío", a: a.current.dewPoint, b: b.current.dewPoint, format: (v) => `${round(v)}°`, bar: true, deltaUnit: "°" }
      ]
    },
    {
      title: "Humedad y presión",
      icon: <Droplets size={16} />,
      metrics: [
        { label: "Humedad", a: a.current.humidity, b: b.current.humidity, format: (v) => `${round(v)}%`, bar: true, deltaUnit: "%" },
        { label: "Presión", a: a.current.pressure, b: b.current.pressure, format: (v) => `${round(v)} hPa`, bar: true, deltaUnit: " hPa" },
        { label: "Nubosidad", a: a.current.cloudCover, b: b.current.cloudCover, format: (v) => `${round(v)}%`, bar: true, deltaUnit: "%" },
        { label: "Visibilidad", a: a.current.visibility, b: b.current.visibility, format: (v) => `${(v / 1000).toFixed(1)} km`, bar: true, deltaUnit: " km" }
      ]
    },
    {
      title: "Viento",
      icon: <Wind size={16} />,
      metrics: [
        { label: "Velocidad", a: a.current.windSpeed, b: b.current.windSpeed, format: (v) => `${round(v)} km/h`, bar: true, deltaUnit: " km/h" },
        { label: "Ráfagas", a: a.current.windGusts, b: b.current.windGusts, format: (v) => `${round(v)} km/h`, bar: true, deltaUnit: " km/h" },
        { label: "Ráfaga máx hoy", a: a.daily[0]?.windGustsMax ?? 0, b: b.daily[0]?.windGustsMax ?? 0, format: (v) => `${round(v)} km/h`, bar: true, deltaUnit: " km/h" },
        { label: "Dirección", a: a.current.windDirection, b: b.current.windDirection, format: (v) => `${windDirectionLabel(v)} (${round(v)}°)`, bar: false }
      ]
    },
    {
      title: "Sol y UV",
      icon: <Sun size={16} />,
      metrics: [
        { label: "Índice UV", a: a.current.uvIndex, b: b.current.uvIndex, format: (v) => `${v.toFixed(1)}`, bar: true },
        { label: "UV máx hoy", a: a.daily[0]?.uvIndexMax ?? 0, b: b.daily[0]?.uvIndexMax ?? 0, format: (v) => `${v.toFixed(1)}`, bar: true },
        { label: "Amanecer", a: 0, b: 0, format: () => "", bar: false, deltaUnit: "" },
        { label: "Atardecer", a: 0, b: 0, format: () => "", bar: false, deltaUnit: "" },
        { label: "Horas de luz", a: a.daily[0]?.daylightSeconds ?? 0, b: b.daily[0]?.daylightSeconds ?? 0, format: daylight, bar: true }
      ]
    },
    {
      title: "Precipitación",
      icon: <CloudRain size={16} />,
      metrics: [
        { label: "Actual", a: a.current.precipitation, b: b.current.precipitation, format: (v) => `${v.toFixed(1)} mm`, bar: true, deltaUnit: " mm" },
        { label: "Prob. máx hoy", a: a.daily[0]?.precipitationProbabilityMax ?? 0, b: b.daily[0]?.precipitationProbabilityMax ?? 0, format: (v) => `${round(v)}%`, bar: true, deltaUnit: "%" },
        { label: "Acumulada hoy", a: a.daily[0]?.precipitationSum ?? 0, b: b.daily[0]?.precipitationSum ?? 0, format: (v) => `${v.toFixed(1)} mm`, bar: true, deltaUnit: " mm" }
      ]
    }
  ];

  if (a.airQuality && b.airQuality) {
    sections.push({
      title: "Calidad del aire",
      icon: <Gauge size={16} />,
      metrics: [
        { label: "US AQI", a: a.airQuality.usAqi, b: b.airQuality.usAqi, format: (v) => `${round(v)}`, bar: true },
        { label: "PM2.5", a: a.airQuality.pm25, b: b.airQuality.pm25, format: (v) => `${v.toFixed(1)} µg/m³`, bar: true, deltaUnit: " µg/m³" },
        { label: "PM10", a: a.airQuality.pm10, b: b.airQuality.pm10, format: (v) => `${v.toFixed(1)} µg/m³`, bar: true, deltaUnit: " µg/m³" }
      ]
    });
  }

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold tracking-tight">Comparación detallada</h2>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-400" /> {a.city.name}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" /> {b.city.name}
          </span>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {sections.map((section) => (
          <GlassCard key={section.title} className="p-5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground/80">
              <span className="text-primary">{section.icon}</span>
              {section.title}
            </h3>
            <div className="flex flex-col divide-y divide-white/5">
              {section.metrics.map((m) => (
                <MetricRow key={m.label} metric={m} a={a} b={b} />
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

function MetricRow({ metric, a, b }: { metric: Metric; a: CityWeather; b: CityWeather }) {
  // Special-case clock times (sunrise / sunset) so the raw ISO strings format nicely.
  const isSun = metric.label === "Amanecer" || metric.label === "Atardecer";
  let fmtA: string;
  let fmtB: string;
  if (isSun) {
    const key = metric.label === "Amanecer" ? "sunrise" : "sunset";
    fmtA = time(a.daily[0]?.[key] ?? "");
    fmtB = time(b.daily[0]?.[key] ?? "");
  } else {
    fmtA = metric.format(metric.a);
    fmtB = metric.format(metric.b);
  }

  const aLeads = !isSun && metric.a > metric.b;
  const bLeads = !isSun && metric.b > metric.a;

  const total = Math.abs(metric.a) + Math.abs(metric.b);
  const shareA = total === 0 ? 50 : (Math.abs(metric.a) / total) * 100;
  const shareB = 100 - shareA;

  const diff = Math.abs(metric.a - metric.b);
  const delta = !isSun && metric.bar && diff > 0 && metric.deltaUnit !== undefined ? `Δ ${trimNum(diff)}${metric.deltaUnit}` : null;

  return (
    <div className="py-2.5">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <span className={cn("text-right text-sm font-semibold tabular-nums", aLeads ? "text-sky-300" : "text-foreground/70")}>{fmtA}</span>
        <span className="min-w-[92px] text-center text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{metric.label}</span>
        <span className={cn("text-left text-sm font-semibold tabular-nums", bLeads ? "text-rose-300" : "text-foreground/70")}>{fmtB}</span>
      </div>

      {metric.bar && (
        <div className="mt-1.5 flex items-center gap-1">
          <div className="flex h-1.5 flex-1 justify-end overflow-hidden rounded-full bg-white/5">
            <div className="h-full rounded-full bg-sky-400/70" style={{ width: `${shareA}%` }} />
          </div>
          <div className="h-full flex-1 overflow-hidden rounded-full bg-white/5">
            <div className="h-1.5 rounded-full bg-rose-400/70" style={{ width: `${shareB}%` }} />
          </div>
        </div>
      )}

      {delta && <p className="mt-1 text-center text-[10px] text-muted-foreground/70">{delta}</p>}
    </div>
  );
}

function trimNum(v: number): string {
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}
