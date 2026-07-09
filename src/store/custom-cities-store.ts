"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { City } from "@/lib/types";

interface CustomCitiesState {
  cities: City[];
  hasHydrated: boolean;
  add: (city: City) => void;
  remove: (slug: string) => void;
  has: (slug: string) => boolean;
  setHasHydrated: (v: boolean) => void;
}

export const useCustomCitiesStore = create<CustomCitiesState>()(
  persist(
    (set, get) => ({
      cities: [],
      hasHydrated: false,
      add: (city) => set((state) => (state.cities.some((c) => c.slug === city.slug) ? state : { cities: [...state.cities, city] })),
      remove: (slug) => set((state) => ({ cities: state.cities.filter((c) => c.slug !== slug) })),
      has: (slug) => get().cities.some((c) => c.slug === slug),
      setHasHydrated: (v) => set({ hasHydrated: v })
    }),
    {
      name: "liquid-weather:custom-cities",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
