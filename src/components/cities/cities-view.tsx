"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, Star, X } from "lucide-react";
import { CityCard } from "./city-card";
import { GlassCard } from "@/components/glass/glass-card";
import { Badge } from "@/components/ui/badge";
import { useFavoritesStore } from "@/store/favorites-store";
import { describeWeather } from "@/lib/weather-codes";
import { cn } from "@/lib/utils";
import type { CitySummary } from "@/lib/types";

type SortKey =
  | "favorites"
  | "name-asc"
  | "name-desc"
  | "temp-desc"
  | "temp-asc"
  | "humidity-desc"
  | "humidity-asc"
  | "wind-desc"
  | "wind-asc"
  | "feels-desc"
  | "feels-asc";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "favorites", label: "Favoritas primero" },
  { key: "name-asc", label: "Nombre (A–Z)" },
  { key: "name-desc", label: "Nombre (Z–A)" },
  { key: "temp-desc", label: "Mayor temperatura" },
  { key: "temp-asc", label: "Menor temperatura" },
  { key: "humidity-desc", label: "Mayor humedad" },
  { key: "humidity-asc", label: "Menor humedad" },
  { key: "wind-desc", label: "Mayor viento" },
  { key: "wind-asc", label: "Menor viento" },
  { key: "feels-desc", label: "Mejor sensación" },
  { key: "feels-asc", label: "Peor sensación" },
];

const CONDITIONS: { key: string; label: string }[] = [
  { key: "clear", label: "Despejado" },
  { key: "clouds", label: "Nubes" },
  { key: "fog", label: "Niebla" },
  { key: "drizzle", label: "Llovizna" },
  { key: "rain", label: "Lluvia" },
  { key: "snow", label: "Nieve" },
  { key: "thunder", label: "Tormenta" },
];

export function CitiesView({ summaries }: { summaries: CitySummary[] }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("favorites");
  const [conditions, setConditions] = useState<string[]>([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const favorites = useFavoritesStore((s) => s.favorites);

  const toggleCondition = (key: string) =>
    setConditions((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key],
    );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = summaries.filter((s) => {
      if (q) {
        const hay =
          s.city.name.toLowerCase() +
          " " +
          s.city.country.toLowerCase() +
          " " +
          (s.city.admin?.toLowerCase() ?? "");
        if (!hay.includes(q)) return false;
      }
      if (conditions.length > 0) {
        const group = describeWeather(s.current.weatherCode).group;
        if (!conditions.includes(group)) return false;
      }
      if (onlyFavorites && !favorites.includes(s.city.slug)) return false;
      return true;
    });

    list = [...list].sort((a, b) => byKey(a, b, sort));

    // Favorites always float to the top unless the user explicitly picked a
    // different primary ordering that isn't "favorites".
    if (sort === "favorites") {
      list.sort((a, b) => {
        const fa = favorites.includes(a.city.slug) ? 1 : 0;
        const fb = favorites.includes(b.city.slug) ? 1 : 0;
        if (fa !== fb) return fb - fa;
        return a.city.name.localeCompare(b.city.name, "es");
      });
    }
    return list;
  }, [summaries, search, sort, conditions, onlyFavorites, favorites]);

  const activeFilters =
    (search ? 1 : 0) + conditions.length + (onlyFavorites ? 1 : 0);

  return (
    <div>
      {/* Controls */}
      <GlassCard className="mb-8 p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar ciudad o país…"
              className="h-11 w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/50 focus:bg-white/8"
            />
          </div>

          {/* Sort */}
          <div className="relative flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-11 cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 text-sm outline-none transition-colors focus:border-primary/50 [&>option]:bg-card [&>option]:text-foreground"
              aria-label="Ordenar por"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setOnlyFavorites((v) => !v)}
              aria-pressed={onlyFavorites}
              className={cn(
                "flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors",
                onlyFavorites
                  ? "border-rose-400/40 bg-rose-500/15 text-rose-300"
                  : "border-white/10 bg-white/5 text-foreground/80 hover:bg-white/8",
              )}
            >
              <Star
                size={15}
                className={onlyFavorites ? "fill-rose-400" : ""}
              />
              Favoritas
            </button>
          </div>
        </div>

        {/* Condition chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {CONDITIONS.map((c) => {
            const active = conditions.includes(c.key);
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => toggleCondition(c.key)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  active
                    ? "border-primary/40 bg-primary/20 text-primary"
                    : "border-white/10 bg-white/5 text-foreground/70 hover:bg-white/8",
                )}
              >
                {c.label}
              </button>
            );
          })}
          {activeFilters > 0 && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setConditions([]);
                setOnlyFavorites(false);
              }}
              className="ml-auto flex items-center gap-1 rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <X size={13} /> Limpiar filtros
            </button>
          )}
        </div>
      </GlassCard>

      {/* Results count */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filtered.length}{" "}
          {filtered.length === 1 ? "ciudad" : "ciudades"}
          {activeFilters > 0 && (
            <Badge tone="primary" className="ml-2">
              {activeFilters} {activeFilters === 1 ? "filtro" : "filtros"}
            </Badge>
          )}
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <EmptyState onReset={() => { setSearch(""); setConditions([]); setOnlyFavorites(false); }} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <CityCard key={s.city.slug} summary={s} />
          ))}
        </div>
      )}
    </div>
  );
}

function byKey(a: CitySummary, b: CitySummary, sort: SortKey): number {
  switch (sort) {
    case "name-asc":
      return a.city.name.localeCompare(b.city.name, "es");
    case "name-desc":
      return b.city.name.localeCompare(a.city.name, "es");
    case "temp-desc":
      return b.current.temperature - a.current.temperature;
    case "temp-asc":
      return a.current.temperature - b.current.temperature;
    case "humidity-desc":
      return b.current.humidity - a.current.humidity;
    case "humidity-asc":
      return a.current.humidity - b.current.humidity;
    case "wind-desc":
      return b.current.windSpeed - a.current.windSpeed;
    case "wind-asc":
      return a.current.windSpeed - b.current.windSpeed;
    case "feels-desc":
      return b.current.apparentTemperature - a.current.apparentTemperature;
    case "feels-asc":
      return a.current.apparentTemperature - b.current.apparentTemperature;
    default:
      return 0;
  }
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <GlassCard className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <Search size={44} className="text-muted-foreground/40" />
      <div>
        <h3 className="text-lg font-semibold">Sin resultados</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          No encontramos ciudades con esos filtros. Prueba a ajustarlos.
        </p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium hover:bg-white/15"
      >
        Limpiar filtros
      </button>
    </GlassCard>
  );
}
