"use client";

import Link from "next/link";
import { GlassCard } from "@/components/glass/glass-card";
import { FlagAvatar } from "@/components/ui/flag-avatar";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { FavoriteButton } from "@/components/weather/favorite-button";
import { weatherGradient } from "@/lib/weather-codes";
import { cityHref } from "@/lib/cities";
import { useCustomCitiesStore } from "@/store/custom-cities-store";
import type { CitySummary } from "@/lib/types";

export function CompactCityCard({ summary, layout = "compact" }: { summary: CitySummary; layout?: "compact" | "list" }) {
  const { city, current } = summary;
  const removeCustomCity = useCustomCitiesStore((s) => s.remove);

  const favorite = city.custom ? (
    <FavoriteButton slug={city.slug} isActive onToggle={() => removeCustomCity(city.slug)} size={18} />
  ) : (
    <FavoriteButton slug={city.slug} size={18} />
  );

  if (layout === "list") {
    return (
      <GlassCard hover as="article" className="group animate-fade-in">
        <Link href={cityHref(city)} className="flex items-center gap-3 p-3.5">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-6 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
            style={{ background: weatherGradient(current.weatherCode, current.isDay) }}
          />
          <FlagAvatar countryCode={city.countryCode} label={`Bandera de ${city.country}`} className="relative size-8" />
          <div className="relative min-w-0 flex-1">
            <h3 className="truncate font-semibold leading-tight">{city.name}</h3>
            <p className="truncate text-xs text-muted-foreground">{city.country}</p>
          </div>
          <WeatherIcon code={current.weatherCode} isDay={current.isDay} className="relative h-9 w-9 shrink-0 text-primary/90" />
          <span className="relative text-2xl font-light tracking-tight tabular-nums">{Math.round(current.temperature)}°</span>
          <span className="relative -mr-1 shrink-0">{favorite}</span>
        </Link>
      </GlassCard>
    );
  }

  return (
    <GlassCard hover as="article" className="group animate-fade-in">
      <Link href={cityHref(city)} className="block p-4">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
          style={{ background: weatherGradient(current.weatherCode, current.isDay) }}
        />
        <div className="relative flex items-start justify-between">
          <FlagAvatar countryCode={city.countryCode} label={`Bandera de ${city.country}`} className="size-7" />
          <span className="-mr-1 -mt-1 shrink-0">{favorite}</span>
        </div>
        <div className="relative mt-3 flex items-end justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate font-semibold leading-tight">{city.name}</h3>
            <p className="text-3xl font-light tracking-tighter">{Math.round(current.temperature)}°</p>
          </div>
          <WeatherIcon code={current.weatherCode} isDay={current.isDay} className="h-11 w-11 shrink-0 text-primary/90" />
        </div>
      </Link>
    </GlassCard>
  );
}
