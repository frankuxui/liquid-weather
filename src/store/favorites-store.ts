"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  favorites: string[]; // city slugs
  hasHydrated: boolean;
  toggle: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  clear: () => void;
  setHasHydrated: (v: boolean) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      hasHydrated: false,
      toggle: (slug) =>
        set((state) => ({
          favorites: state.favorites.includes(slug)
            ? state.favorites.filter((s) => s !== slug)
            : [...state.favorites, slug],
        })),
      isFavorite: (slug) => get().favorites.includes(slug),
      clear: () => set({ favorites: [] }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "liquid-weather:favorites",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
