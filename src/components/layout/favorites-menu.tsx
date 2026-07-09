"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, X, MapPin } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites-store";
import { useCustomCitiesStore } from "@/store/custom-cities-store";
import { CITIES, cityHref, flagEmoji } from "@/lib/cities";
import { cn } from "@/lib/utils";

export function FavoritesMenu() {
  const [open, setOpen] = useState(false);
  const favorites = useFavoritesStore((s) => s.favorites);
  const hasHydrated = useFavoritesStore((s) => s.hasHydrated);
  const customCities = useCustomCitiesStore((s) => s.cities);

  // Curated favorites + every saved custom (searched/manual) location.
  const favoriteCities = [...customCities, ...CITIES.filter((c) => favorites.includes(c.slug))];
  const count = favorites.length + customCities.length;

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Ver favoritos"
      >
        <Heart size={20} className="text-foreground/80" />
        {hasHydrated && count > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[11px] font-semibold text-white">{count}</span>
        )}
      </button>

      {/* Drawer */}
      <div className={cn("fixed inset-0 z-50 transition-opacity duration-300", open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")} aria-hidden={!open}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <aside
          className={cn("glass-strong absolute right-0 top-0 flex h-full w-full max-w-sm flex-col p-6 transition-transform duration-400 ease-out", open ? "translate-x-0" : "translate-x-full")}
          role="dialog"
          aria-label="Ciudades favoritas"
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Heart size={18} className="fill-rose-500 text-rose-500" />
              Favoritas
            </h2>
            <button type="button" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="Cerrar">
              <X size={18} />
            </button>
          </div>

          {favoriteCities.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-muted-foreground">
              <Heart size={40} className="opacity-30" />
              <p className="max-w-[16rem] text-sm">Aún no tienes ciudades favoritas. Pulsa el corazón en cualquier ciudad para guardarla aquí.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2 overflow-y-auto no-scrollbar">
              {favoriteCities.map((c) => (
                <li key={c.slug}>
                  <Link href={cityHref(c)} onClick={() => setOpen(false)} className="glass glass-hover flex items-center gap-3 rounded-2xl p-3">
                    <span className="text-2xl">{flagEmoji(c.countryCode)}</span>
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
        </aside>
      </div>
    </>
  );
}
