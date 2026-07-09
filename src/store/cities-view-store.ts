"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CitiesViewMode = "relaxed" | "compact" | "list";

interface CitiesViewState {
  view: CitiesViewMode;
  hasHydrated: boolean;
  setView: (view: CitiesViewMode) => void;
  setHasHydrated: (v: boolean) => void;
}

export const useCitiesViewStore = create<CitiesViewState>()(
  persist(
    (set) => ({
      view: "relaxed",
      hasHydrated: false,
      setView: (view) => set({ view }),
      setHasHydrated: (v) => set({ hasHydrated: v })
    }),
    {
      name: "liquid-weather:cities-view",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      }
    }
  )
);
