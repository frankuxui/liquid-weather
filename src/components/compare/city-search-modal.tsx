"use client";

import { useEffect, useRef, useState } from "react";
import { X, Plus, Loader2 } from "lucide-react";
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { SearchInput } from "@/components/ui/search-input";
import { FlagAvatar } from "@/components/ui/flag-avatar";
import { searchLocations } from "@/lib/geocoding";
import { customCitySlug } from "@/lib/cities";
import { continentFromCountryCode } from "@/lib/continents";
import type { City, GeocodingResult } from "@/lib/types";

/**
 * City picker used by the comparator. Reuses the SearchInput + geocoding search.
 * `excludeSlug` hides the city already chosen in the other panel so the same
 * city can't be compared with itself.
 */
export function CitySearchModal({
  open,
  onOpenChange,
  onSelect,
  excludeSlug
}: {
  open: boolean;
  onOpenChange: (_open: boolean) => void;
  onSelect: (_city: City) => void;
  excludeSlug?: string | null;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const requestId = useRef(0);

  const { refs, context } = useFloating({ open, onOpenChange });
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "dialog" });
  const { getFloatingProps } = useInteractions([dismiss, role]);

  const close = () => onOpenChange(false);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setError(null);
      setLoading(false);
      requestAnimationFrame(() => searchInputRef.current?.focus());
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

  const handleSelect = (r: GeocodingResult) => {
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
    onSelect(city);
    close();
  };

  const visible = results.filter((r) => customCitySlug(r.name, r.latitude, r.longitude) !== excludeSlug);

  return (
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

            <FloatingFocusManager context={context} initialFocus={searchInputRef}>
              <motion.div
                ref={refs.setFloating}
                aria-label="Buscar ciudad"
                layout
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="glass-strong relative flex max-h-[80vh] w-full max-w-lg flex-col gap-5 overflow-hidden rounded-3xl p-6"
                {...getFloatingProps()}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Buscar ciudad</h2>
                  <button type="button" onClick={close} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="Cerrar">
                    <X size={18} />
                  </button>
                </div>

                <div className="relative">
                  <SearchInput
                    inputRef={searchInputRef}
                    value={query}
                    onValueChange={setQuery}
                    onClear={() => setQuery("")}
                    placeholder="Ciudad o país, p. ej. Madrid, Barcelona…"
                    visibleIconSearch
                  />
                  {loading && <Loader2 size={16} className="absolute right-11 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground" />}
                </div>

                {error && <p className="px-1 text-sm text-muted-foreground">{error}</p>}

                {visible.length > 0 && (
                  <ul className="flex flex-col gap-1.5 overflow-y-auto no-scrollbar">
                    {visible.map((r) => (
                      <li key={r.id}>
                        <button
                          type="button"
                          onClick={() => handleSelect(r)}
                          className="glass glass-hover flex w-full items-center gap-3 rounded-2xl p-3 text-left"
                        >
                          <FlagAvatar countryCode={r.countryCode} label={`Bandera de ${r.country}`} />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium">{r.name}</span>
                            <span className="block truncate text-xs text-muted-foreground">
                              {r.admin1 ? `${r.admin1}, ` : ""}
                              {r.country}
                            </span>
                          </span>
                          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-primary">
                            <Plus size={16} />
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </AnimatePresence>
    </FloatingPortal>
  );
}
