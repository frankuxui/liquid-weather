"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MapPin, Plus, Search, X } from "lucide-react";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cityHref, customCitySlug, flagEmoji } from "@/lib/cities";
import { continentFromCountryCode, continentFromTimezone } from "@/lib/continents";
import { searchLocations } from "@/lib/geocoding";
import { resolveTimezone } from "@/lib/open-meteo";
import { AUTO_TIMEZONE, TIMEZONE_OPTIONS } from "@/lib/timezones";
import { useCustomCitiesStore } from "@/store/custom-cities-store";
import type { City, GeocodingResult } from "@/lib/types";

type Tab = "search" | "coords";

export function AddLocationPanel() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("search");
  const router = useRouter();
  const addCustomCity = useCustomCitiesStore((s) => s.add);

  const close = () => setOpen(false);

  const handleAdd = (city: City) => {
    addCustomCity(city);
    close();
    router.push(cityHref(city));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/8"
      >
        <Plus size={16} /> Añadir ubicación
      </button>

      <div
        className={cn("fixed inset-0 z-50 grid place-items-center p-4 transition-opacity duration-300", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />
        <div
          role="dialog"
          aria-label="Añadir ubicación"
          className={cn("glass-strong relative flex w-full max-w-lg flex-col gap-5 rounded-3xl p-6 transition-all duration-300", open ? "translate-y-0 scale-100" : "translate-y-4 scale-95")}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Añadir ubicación</h2>
            <button type="button" onClick={close} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="Cerrar">
              <X size={18} />
            </button>
          </div>

          <div className="flex gap-2">
            <TabButton active={tab === "search"} onClick={() => setTab("search")} icon={<Search size={14} />}>
              Buscar
            </TabButton>
            <TabButton active={tab === "coords"} onClick={() => setTab("coords")} icon={<MapPin size={14} />}>
              Coordenadas
            </TabButton>
          </div>

          {tab === "search" ? <SearchTab onAdd={handleAdd} /> : <CoordsTab onAdd={handleAdd} />}
        </div>
      </div>
    </>
  );
}

function TabButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-1 items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active ? "border-primary/40 bg-primary/20 text-primary" : "border-white/10 bg-white/5 text-foreground/70 hover:bg-white/8"
      )}
    >
      {icon}
      {children}
    </button>
  );
}

function SearchTab({ onAdd }: { onAdd: (city: City) => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    const id = ++requestId.current;
    const timer = setTimeout(async () => {
      try {
        const found = await searchLocations(q);
        if (id === requestId.current) {
          setResults(found);
          setError(found.length === 0 ? "Sin resultados. Prueba con otro nombre." : null);
        }
      } catch {
        if (id === requestId.current) setError("No pudimos buscar ubicaciones ahora mismo.");
      } finally {
        if (id === requestId.current) setLoading(false);
      }
    }, 350);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          autoFocus
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ciudad o país, p. ej. Kioto, Marrakech…"
          className="h-11 w-full rounded-full border border-white/10 bg-white/5 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/50 focus:bg-white/8"
        />
        {loading && <Loader2 size={16} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground" />}
      </div>

      {error && <p className="px-1 text-sm text-muted-foreground">{error}</p>}

      {results.length > 0 && (
        <ul className="flex max-h-72 flex-col gap-1.5 overflow-y-auto no-scrollbar">
          {results.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() =>
                  onAdd({
                    slug: customCitySlug(r.name, r.latitude, r.longitude),
                    name: r.name,
                    country: r.country,
                    countryCode: r.countryCode,
                    admin: r.admin1,
                    latitude: r.latitude,
                    longitude: r.longitude,
                    timezone: r.timezone,
                    continent: continentFromCountryCode(r.countryCode),
                    custom: true
                  })
                }
                className="glass glass-hover flex w-full items-center gap-3 rounded-2xl p-3 text-left"
              >
                <span className="text-xl">{flagEmoji(r.countryCode)}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{r.name}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {r.admin1 ? `${r.admin1}, ` : ""}
                    {r.country}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CoordsTab({ onAdd }: { onAdd: (city: City) => void }) {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [timezone, setTimezone] = useState(AUTO_TIMEZONE);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const lat = Number(latitude.replace(",", "."));
    const lon = Number(longitude.replace(",", "."));

    if (!name.trim()) return setError("Introduce un nombre para la ubicación.");
    if (!Number.isFinite(lat) || lat < -90 || lat > 90) return setError("Latitud inválida (-90 a 90).");
    if (!Number.isFinite(lon) || lon < -180 || lon > 180) return setError("Longitud inválida (-180 a 180).");

    setError(null);
    setSubmitting(true);
    try {
      const tz = timezone === AUTO_TIMEZONE ? await resolveTimezone(lat, lon) : timezone;
      onAdd({
        slug: customCitySlug(name, lat, lon),
        name: name.trim(),
        country: country.trim() || "Ubicación personalizada",
        countryCode: "",
        latitude: lat,
        longitude: lon,
        timezone: tz,
        continent: continentFromTimezone(tz),
        custom: true
      });
    } catch {
      setError("No pudimos resolver la zona horaria. Elige una manualmente.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <Field label="Nombre">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Mi ubicación"
          className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm outline-none focus:border-primary/50"
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Latitud">
          <input
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="40,4168"
            inputMode="decimal"
            className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm outline-none focus:border-primary/50"
          />
        </Field>
        <Field label="Longitud">
          <input
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="-3,7038"
            inputMode="decimal"
            className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm outline-none focus:border-primary/50"
          />
        </Field>
      </div>

      <Field label="País (opcional)">
        <input
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="España"
          className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm outline-none focus:border-primary/50"
        />
      </Field>

      <Field label="Zona horaria">
        <Select options={TIMEZONE_OPTIONS} value={timezone} onChange={setTimezone} label="Zona horaria" className="w-full" />
      </Field>

      {error && <p className="text-sm text-rose-300">{error}</p>}

      <Button type="submit" disabled={submitting} className="mt-1">
        {submitting ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
        Añadir
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="px-1 text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
