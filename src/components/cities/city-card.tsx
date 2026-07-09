"use client";

import Link from "next/link";
import { Droplets, Wind, Thermometer, MapPin } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { FavoriteButton } from "@/components/weather/favorite-button";
import { describeWeather, weatherGradient } from "@/lib/weather-codes";
import { cityHref, flagEmoji } from "@/lib/cities";
import { useCustomCitiesStore } from "@/store/custom-cities-store";
import type { CitySummary } from "@/lib/types";

export function CityCard({ summary }: { summary: CitySummary }) {
  const { city, current, tempMax, tempMin } = summary;
  const desc = describeWeather(current.weatherCode);
  const removeCustomCity = useCustomCitiesStore((s) => s.remove);

  return (
    <GlassCard hover as="article" className="group animate-fade-in">
      <Link href={cityHref(city)} className="block p-5">
        {/* condition-tinted glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: weatherGradient(current.weatherCode, current.isDay) }}
        />

        <div className="relative flex items-start justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xl">{flagEmoji(city.countryCode)}</span>
              <h3 className="truncate text-lg font-semibold">{city.name}</h3>
            </div>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin size={11} /> {city.country}
            </p>
          </div>
          {city.custom ? <FavoriteButton slug={city.slug} isActive onToggle={() => removeCustomCity(city.slug)} /> : <FavoriteButton slug={city.slug} />}
        </div>

        <div className="relative mt-4 flex items-center justify-between">
          <div>
            <p className="text-5xl font-light tracking-tighter">{Math.round(current.temperature)}°</p>
            <p className="text-sm text-muted-foreground">{desc.label}</p>
          </div>
          <WeatherIcon code={current.weatherCode} isDay={current.isDay} className="h-16 w-16 text-primary/90" />
        </div>

        <div className="relative mt-4 flex items-center gap-1.5 text-sm">
          <span className="font-medium text-rose-300">{tempMax}°</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium text-sky-300">{tempMin}°</span>
          <span className="ml-auto text-xs text-muted-foreground">Sensación {Math.round(current.apparentTemperature)}°</span>
        </div>

        <div className="relative mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
          <Metric icon={<Droplets size={15} />} value={`${Math.round(current.humidity)}%`} label="Humedad" />
          <Metric icon={<Wind size={15} />} value={`${Math.round(current.windSpeed)}`} label="km/h" />
          <Metric icon={<Thermometer size={15} />} value={`${Math.round(current.pressure)}`} label="hPa" />
        </div>
      </Link>
    </GlassCard>
  );
}

function Metric({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-primary/80">{icon}</span>
      <span className="text-sm font-medium leading-none">{value}</span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}
