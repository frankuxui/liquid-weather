"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Heart, X, MapPin, Plus, Loader2 } from "lucide-react";
import { FloatingFocusManager, FloatingNode, FloatingOverlay, FloatingPortal, FloatingTree, useClick, useDismiss, useFloating, useFloatingNodeId, useInteractions, useRole } from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { SearchInput } from "@/components/ui/search-input";
import { FlagAvatar } from "@/components/ui/flag-avatar";
import { HeartBurst } from "@/components/weather/heart-burst";
import { useFavoritesStore } from "@/store/favorites-store";
import { useCustomCitiesStore } from "@/store/custom-cities-store";
import { CITIES, cityHref, customCitySlug } from "@/lib/cities";
import { continentFromCountryCode } from "@/lib/continents";
import { searchLocations } from "@/lib/geocoding";
import type { City, GeocodingResult } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FavoritesMenu() {
  return (
    <FloatingTree>
      <FavoritesMenuInner />
    </FloatingTree>
  );
}

function FavoritesMenuInner() {
  const [open, setOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const favorites = useFavoritesStore((s) => s.favorites);
  const favoritesHydrated = useFavoritesStore((s) => s.hasHydrated);
  const customCities = useCustomCitiesStore((s) => s.cities);
  const customCitiesHydrated = useCustomCitiesStore((s) => s.hasHydrated);
  const canShowSavedCities = mounted && favoritesHydrated && customCitiesHydrated;
  const activeFavorites = canShowSavedCities ? favorites : [];
  const activeCustomCities = canShowSavedCities ? customCities : [];

  // Curated favorites + every saved custom (searched/manual) location.
  const favoriteCities = [...activeCustomCities, ...CITIES.filter((c) => activeFavorites.includes(c.slug))];
  const count = activeFavorites.length + activeCustomCities.length;

  // Explosión del corazón: una por cada ciudad añadida a favoritos.
  const [burstKey, setBurstKey] = useState(0);
  const prevCount = useRef(0);
  const burstReady = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!canShowSavedCities) return;
    // Sincroniza el conteo inicial tras la hidratación sin lanzar explosión.
    if (!burstReady.current) {
      burstReady.current = true;
      prevCount.current = count;
      return;
    }
    if (count > prevCount.current) setBurstKey((k) => k + 1);
    prevCount.current = count;
  }, [count, canShowSavedCities]);

  const nodeId = useFloatingNodeId();
  const { refs, context } = useFloating({
    nodeId,
    open,
    onOpenChange: setOpen
  });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Ver favoritos"
        {...getReferenceProps()}
      >
        <HeartBurst burstKey={burstKey} size={20} />
        <motion.span
          key={burstKey}
          animate={burstKey > 0 ? { scale: [1, 0.82, 1.3, 0.94, 1] } : undefined}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], times: [0, 0.18, 0.45, 0.72, 1] }}
          className="relative grid place-items-center"
        >
          <Heart size={20} className={cn("transition-colors", canShowSavedCities && count > 0 ? "fill-rose-500 text-rose-500" : "text-foreground/80")} />
        </motion.span>
        {canShowSavedCities && count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-semibold text-white">{count}</span>
        )}
      </button>

      <FloatingNode id={nodeId}>
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
                    aria-label="Ciudades favoritas"
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 16 }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="glass-strong relative flex max-h-[80vh] w-full max-w-lg flex-col gap-5 overflow-hidden rounded-3xl p-6"
                    {...getFloatingProps()}
                  >
                    <div className="flex items-center justify-between">
                      <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <Heart size={18} className="fill-rose-500 text-rose-500" />
                        Favoritas
                      </h2>
                      <button type="button" onClick={close} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="Cerrar">
                        <X size={18} />
                      </button>
                    </div>

                    {favoriteCities.length === 0 ? (
                      <div className="flex flex-col items-center justify-center gap-3 py-10 text-center text-muted-foreground">
                        <Heart size={40} className="opacity-30" />
                        <p className="max-w-[16rem] text-sm">Aún no tienes ciudades favoritas. Pulsa el corazón en cualquier ciudad para guardarla aquí.</p>
                      </div>
                    ) : (
                      <ul className="flex flex-col gap-2 overflow-y-auto no-scrollbar">
                        {favoriteCities.map((c) => (
                          <li key={c.slug}>
                            <Link href={cityHref(c)} onClick={close} className="glass glass-hover flex items-center gap-3 rounded-2xl p-3">
                              <FlagAvatar countryCode={c.countryCode} label={`Bandera de ${c.country}`} />
                              <span className="flex flex-col">
                                <span className="font-medium">{c.name}</span>
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <MapPin size={11} /> {c.country}
                                </span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    <button
                      type="button"
                      onClick={() => setAddOpen(true)}
                      className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      <Plus size={16} /> Agregar ciudades
                    </button>
                  </motion.div>
                </FloatingFocusManager>
              </FloatingOverlay>
            )}
          </AnimatePresence>
        </FloatingPortal>

        <AddCitiesModal open={addOpen} onOpenChange={setAddOpen} />
      </FloatingNode>
    </>
  );
}

function AddCitiesModal({ open, onOpenChange }: { open: boolean; onOpenChange: (_open: boolean) => void }) {
  const addCustomCity = useCustomCitiesStore((s) => s.add);
  const savedCities = useCustomCitiesStore((s) => s.cities);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const nodeId = useFloatingNodeId();
  const { refs, context } = useFloating({ nodeId, open, onOpenChange });
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "dialog" });
  const { getFloatingProps } = useInteractions([dismiss, role]);

  const close = () => onOpenChange(false);

  // Reset search state whenever the modal opens.
  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setError(null);
      setLoading(false);
    }
  }, [open]);

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

  const savedSlugs = new Set(savedCities.map((c) => c.slug));

  const handleAdd = (r: GeocodingResult) => {
    const city: City = {
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
    };
    addCustomCity(city);
  };

  return (
    <FloatingNode id={nodeId}>
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <FloatingOverlay lockScroll className="z-[60] grid place-items-center p-4">
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
                  aria-label="Agregar ciudades"
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 16 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="glass-strong relative flex max-h-[80vh] w-full max-w-lg flex-col gap-5 overflow-hidden rounded-3xl p-6"
                  {...getFloatingProps()}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Agregar ciudades</h2>
                    <button type="button" onClick={close} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="Cerrar">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="relative">
                    <SearchInput value={query} onValueChange={setQuery} onClear={() => setQuery("")} placeholder="Ciudad o país, p. ej. Kioto, Marrakech…" visibleIconSearch />
                    {loading && <Loader2 size={16} className="absolute right-11 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground" />}
                  </div>

                  {error && <p className="px-1 text-sm text-muted-foreground">{error}</p>}

                  {results.length > 0 && (
                    <ul className="flex flex-col gap-1.5 overflow-y-auto no-scrollbar">
                      {results.map((r) => {
                        const added = savedSlugs.has(customCitySlug(r.name, r.latitude, r.longitude));
                        return (
                          <li key={r.id}>
                            <button
                              type="button"
                              onClick={() => handleAdd(r)}
                              disabled={added}
                              className="glass glass-hover flex w-full items-center gap-3 rounded-2xl p-3 text-left disabled:cursor-default disabled:opacity-60"
                            >
                              <FlagAvatar countryCode={r.countryCode} label={`Bandera de ${r.country}`} />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate font-medium">{r.name}</span>
                                <span className="block truncate text-xs text-muted-foreground">
                                  {r.admin1 ? `${r.admin1}, ` : ""}
                                  {r.country}
                                </span>
                              </span>
                              <span className={added ? "text-xs text-muted-foreground" : "grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-primary"}>
                                {added ? "Añadida" : <Plus size={16} />}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </motion.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </FloatingNode>
  );
}
