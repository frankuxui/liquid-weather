"use client";

import { useState } from "react";
import { Plus, X, RefreshCw, Loader2, MapPin, AlertTriangle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { GlassCard } from "@/components/glass/glass-card";
import { FlagAvatar } from "@/components/ui/flag-avatar";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { CitySearchModal } from "./city-search-modal";
import { ComparisonAnalytics } from "./comparison-analytics";
import { getCityWeatherForCityAction } from "@/lib/actions";
import { describeWeather, weatherGradient } from "@/lib/weather-codes";
import { cn } from "@/lib/utils";
import type { City, CityWeather } from "@/lib/types";

type Side = "a" | "b";

interface SlotState {
  city: City | null;
  weather: CityWeather | null;
  loading: boolean;
  error: string | null;
}

const EMPTY: SlotState = { city: null, weather: null, loading: false, error: null };

export function CompareView() {
  const [a, setA] = useState<SlotState>(EMPTY);
  const [b, setB] = useState<SlotState>(EMPTY);
  const [modalSide, setModalSide] = useState<Side | null>(null);

  const setter = (side: Side) => (side === "a" ? setA : setB);
  const otherCity = (side: Side) => (side === "a" ? b.city : a.city);

  const select = async (side: Side, city: City) => {
    const set = setter(side);
    set({ city, weather: null, loading: true, error: null });
    const res = await getCityWeatherForCityAction(city);
    set({ city, weather: res.data, loading: false, error: res.error });
  };

  const clear = (side: Side) => setter(side)(EMPTY);

  return (
    <div>
      <div className="relative grid gap-5 md:grid-cols-2">
        <CitySlot side="a" accent="sky" state={a} onOpen={() => setModalSide("a")} onClear={() => clear("a")} onRetry={(c) => select("a", c)} />
        <CitySlot side="b" accent="rose" state={b} onOpen={() => setModalSide("b")} onClear={() => clear("b")} onRetry={(c) => select("b", c)} />

        {/* VS badge centred on the gap between the two cards */}
        <span className="glass-strong pointer-events-none absolute left-1/2 top-1/2 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-sm font-bold text-primary md:grid">
          VS
        </span>
      </div>

      <AnimatePresence mode="wait">
        {a.weather && b.weather ? (
          <motion.div key="analytics" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <ComparisonAnalytics a={a.weather} b={b.weather} />
          </motion.div>
        ) : (
          <motion.div key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <GlassCard className="mt-8 flex flex-col items-center gap-2 py-12 text-center">
              <p className="text-sm text-muted-foreground">
                {a.city || b.city ? "Elige una segunda ciudad para ver la comparación detallada." : "Selecciona dos ciudades para comparar su clima en profundidad."}
              </p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <CitySearchModal
        open={modalSide !== null}
        onOpenChange={(o) => !o && setModalSide(null)}
        excludeSlug={modalSide ? (otherCity(modalSide)?.slug ?? null) : null}
        onSelect={(city) => {
          if (modalSide) select(modalSide, city);
        }}
      />
    </div>
  );
}

function CitySlot({
  side,
  accent,
  state,
  onOpen,
  onClear,
  onRetry
}: {
  side: Side;
  accent: "sky" | "rose";
  state: SlotState;
  onOpen: () => void;
  onClear: () => void;
  onRetry: (_city: City) => void;
}) {
  const ring = accent === "sky" ? "hover:border-sky-400/40" : "hover:border-rose-400/40";
  const dot = accent === "sky" ? "bg-sky-400" : "bg-rose-400";

  // Empty state — clickable box that opens the search.
  if (!state.city) {
    return (
      <button
        type="button"
        onClick={onOpen}
        className={cn(
          "group flex min-h-50 flex-col items-center justify-center gap-3 rounded-3xl border-2 cursor-pointer border-dashed border-white/15 bg-white/3 p-6 text-center transition-colors",
          ring
        )}
      >
        <span className="grid h-14 w-14 place-items-center rounded-full bg-white/5 text-muted-foreground transition-colors group-hover:bg-primary/15 group-hover:text-primary">
          <Plus size={24} />
        </span>
        <div className="flex flex-col items-center gap-1">
          <span className="text-base text-foreground/80">{side === "a" ? "Primera ciudad" : "Segunda ciudad"}</span>
          <span className="text-xs text-muted-foreground">Pulsa para buscar</span>
        </div>
      </button>
    );
  }

  const { city, weather, loading, error } = state;
  const desc = weather ? describeWeather(weather.current.weatherCode) : null;

  return (
    <GlassCard className="relative min-h-50 overflow-hidden p-5">
      {weather && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-40 blur-2xl"
          style={{ background: weatherGradient(weather.current.weatherCode, weather.current.isDay) }}
        />
      )}

      <div className="relative flex items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className={cn("h-2.5 w-2.5 shrink-0 rounded-full", dot)} />
          <FlagAvatar countryCode={city.countryCode} label={`Bandera de ${city.country}`} />
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold leading-tight">{city.name}</h2>
            <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
              <MapPin size={11} /> {city.country}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={onOpen} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10" aria-label="Cambiar ciudad">
            <RefreshCw size={15} />
          </button>
          <button type="button" onClick={onClear} className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10" aria-label="Quitar ciudad">
            <X size={16} />
          </button>
        </div>
      </div>

      {loading && (
        <div className="relative mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 size={16} className="animate-spin" /> Cargando clima…
        </div>
      )}

      {error && !loading && (
        <div className="relative mt-6 flex flex-col items-start gap-2">
          <p className="flex items-center gap-2 text-sm text-amber-300">
            <AlertTriangle size={15} /> {error}
          </p>
          <button type="button" onClick={() => onRetry(city)} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/15">
            Reintentar
          </button>
        </div>
      )}

      {weather && desc && !loading && (
        <div className="relative mt-4 flex items-center justify-between">
          <div>
            <p className="text-5xl font-light tracking-tighter">{Math.round(weather.current.temperature)}°</p>
            <p className="text-sm text-muted-foreground">{desc.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">Sensación {Math.round(weather.current.apparentTemperature)}°</p>
          </div>
          <WeatherIcon code={weather.current.weatherCode} isDay={weather.current.isDay} className="h-16 w-16 text-primary/90" />
        </div>
      )}
    </GlassCard>
  );
}
