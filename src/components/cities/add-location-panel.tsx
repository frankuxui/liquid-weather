"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MapPin, Plus, Search, X } from "lucide-react";
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
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

const TABS: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "search", label: "Buscar", icon: <Search size={14} /> },
  { key: "coords", label: "Coordenadas", icon: <MapPin size={14} /> }
];

export function AddLocationPanel() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("search");
  const router = useRouter();
  const addCustomCity = useCustomCitiesStore((s) => s.add);

  const { refs, context } = useFloating({
    open,
    onOpenChange: setOpen
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const close = () => setOpen(false);

  // Reset to the first tab every time the modal is reopened.
  useEffect(() => {
    if (open) setTab("search");
  }, [open]);

  const handleAdd = (city: City) => {
    addCustomCity(city);
    close();
    router.push(cityHref(city));
  };

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        className="flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm font-medium text-foreground/80 transition-colors hover:bg-white/8"
        {...getReferenceProps()}
      >
        <Plus size={16} /> Añadir ubicación
      </button>

      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <FloatingOverlay lockScroll className="z-50 grid place-items-center p-4">
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={close}
              />

              <FloatingFocusManager context={context}>
                <motion.div
                  ref={refs.setFloating}
                  aria-label="Añadir ubicación"
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 16 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="glass-strong relative flex w-full max-w-lg flex-col gap-5 overflow-hidden rounded-3xl p-6"
                  {...getFloatingProps()}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Añadir ubicación</h2>
                    <button type="button" onClick={close} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="Cerrar">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="flex gap-1 rounded-full bg-white/5 p-1">
                    {TABS.map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setTab(t.key)}
                        aria-pressed={tab === t.key}
                        className={cn(
                          "relative isolate flex flex-1 items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                          tab === t.key ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {tab === t.key && (
                          <motion.span
                            layoutId="add-location-active-tab"
                            className="absolute inset-0 -z-10 rounded-full bg-primary"
                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                          />
                        )}
                        <span className="relative z-10 flex items-center">{t.icon}</span>
                        <span className="relative z-10">{t.label}</span>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, x: tab === "search" ? -12 : 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: tab === "search" ? 12 : -12 }}
                      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      {tab === "search" ? <SearchTab onAdd={handleAdd} /> : <CoordsTab onAdd={handleAdd} />}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
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
