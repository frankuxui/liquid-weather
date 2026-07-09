"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ColorTheme {
  id: string;
  label: string;
  /** HSL triplet (no hsl() wrapper) — matches the format of --primary in globals.css. */
  primary: string;
  /** Same format as --ring, kept in sync with primary. */
  ring: string;
}

// Hues reused from the app's existing palette (default primary/accent + the
// UV/AQI band colors in weather-codes.ts) so new themes stay on-brand.
export const COLOR_THEMES: ColorTheme[] = [
  { id: "blue", label: "Azul", primary: "199 89% 58%", ring: "199 89% 58%" },
  { id: "violet", label: "Violeta", primary: "250 84% 66%", ring: "250 84% 66%" },
  { id: "emerald", label: "Esmeralda", primary: "142 71% 45%", ring: "142 71% 45%" },
  { id: "amber", label: "Ámbar", primary: "48 96% 53%", ring: "48 96% 53%" },
  { id: "coral", label: "Coral", primary: "0 84% 60%", ring: "0 84% 60%" },
  { id: "rose", label: "Rosa", primary: "340 82% 58%", ring: "340 82% 58%" }
];

const DEFAULT_THEME = COLOR_THEMES[0];

function applyTheme(theme: ColorTheme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement.style;
  root.setProperty("--primary", theme.primary);
  root.setProperty("--ring", theme.ring);
}

interface ThemeState {
  themeId: string;
  hasHydrated: boolean;
  /** Whether the color-theme picker modal is open — driven entirely from zustand. */
  pickerOpen: boolean;
  setTheme: (id: string) => void;
  setPickerOpen: (open: boolean) => void;
  setHasHydrated: (v: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeId: DEFAULT_THEME.id,
      hasHydrated: false,
      pickerOpen: false,
      setTheme: (id) => {
        const theme = COLOR_THEMES.find((t) => t.id === id) ?? DEFAULT_THEME;
        applyTheme(theme);
        set({ themeId: theme.id });
      },
      setPickerOpen: (pickerOpen) => set({ pickerOpen }),
      setHasHydrated: (v) => set({ hasHydrated: v })
    }),
    {
      name: "liquid-weather:theme",
      // Only persist the chosen theme — the modal's open state is session-only.
      partialize: (state) => ({ themeId: state.themeId }),
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const theme = COLOR_THEMES.find((t) => t.id === state.themeId) ?? DEFAULT_THEME;
        applyTheme(theme);
        state.setHasHydrated(true);
      }
    }
  )
);
