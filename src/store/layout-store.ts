"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Persists the user's custom widget order per city (Swapy slot→item map).
 * Keyed by city slug so each dashboard remembers its own arrangement.
 */
interface LayoutState {
  layouts: Record<string, Record<string, string>>;
  hasHydrated: boolean;
  getLayout: (slug: string) => Record<string, string> | undefined;
  setLayout: (slug: string, map: Record<string, string>) => void;
  resetLayout: (slug: string) => void;
  setHasHydrated: (v: boolean) => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set, get) => ({
      layouts: {},
      hasHydrated: false,
      getLayout: (slug) => get().layouts[slug],
      setLayout: (slug, map) =>
        set((state) => ({ layouts: { ...state.layouts, [slug]: map } })),
      resetLayout: (slug) =>
        set((state) => {
          const next = { ...state.layouts };
          delete next[slug];
          return { layouts: next };
        }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: "liquid-weather:layouts",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
