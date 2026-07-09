"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, MapPin, RefreshCw } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { FlagAvatar } from "@/components/ui/flag-avatar";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { FavoriteButton } from "@/components/weather/favorite-button";
import { describeWeather, weatherGradient } from "@/lib/weather-codes";
import { formatHour } from "@/lib/utils";
import { useCustomCitiesStore } from "@/store/custom-cities-store";
import type { CityWeather } from "@/lib/types";

export function CityHeader({ weather }: { weather: CityWeather }) {
  const { city, current } = weather;
  const desc = describeWeather(current.weatherCode);
  const router = useRouter();
  const removeCustomCity = useCustomCitiesStore((s) => s.remove);

  return (
    <GlassCard strong className="relative overflow-hidden p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full opacity-50 blur-3xl"
        style={{ background: weatherGradient(current.weatherCode, current.isDay) }}
      />

      <div className="relative flex items-center justify-between">
        <Link href="/cities" className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft size={16} /> Ciudades
        </Link>
        {city.custom ? (
          <FavoriteButton
            slug={city.slug}
            size={22}
            isActive
            onToggle={() => {
              removeCustomCity(city.slug);
              router.push("/cities");
            }}
          />
        ) : (
          <FavoriteButton slug={city.slug} size={22} />
        )}
      </div>

      <div className="relative mt-6 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <FlagAvatar countryCode={city.countryCode} label={`Bandera de ${city.country}`} className="size-9" />
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{city.name}</h1>
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin size={13} />
            {city.admin ? `${city.admin}, ` : ""}
            {city.country}
          </p>

          <div className="mt-6 flex items-end gap-4">
            <span className="text-7xl font-extralight leading-none tracking-tighter sm:text-8xl">{Math.round(current.temperature)}°</span>
            <div className="mb-2">
              <p className="text-lg font-medium">{desc.label}</p>
              <p className="text-sm text-muted-foreground">Sensación de {Math.round(current.apparentTemperature)}°</p>
            </div>
          </div>
        </div>

        <WeatherIcon code={current.weatherCode} isDay={current.isDay} className="h-28 w-28 text-primary drop-shadow-[0_8px_24px_rgba(56,189,248,0.35)] sm:h-32 sm:w-32" />
      </div>

      <p className="relative mt-6 flex items-center gap-1.5 text-xs text-muted-foreground/70">
        <RefreshCw size={11} />
        Actualizado a las {formatHour(weather.fetchedAt, city.timezone)}
      </p>
    </GlassCard>
  );
}
