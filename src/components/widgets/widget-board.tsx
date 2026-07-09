"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createSwapy, type Swapy } from "swapy";
import { RotateCcw } from "lucide-react";
import { WIDGETS, WIDGET_MAP } from "./registry";
import { useLayoutStore } from "@/store/layout-store";
import type { CityWeather } from "@/lib/types";

/**
 * Draggable grid of metric widgets powered by Swapy. Slots are fixed grid
 * positions ("slot-0"..."slot-n"); items are widgets that move between slots.
 * The slot→item map is persisted to LocalStorage per city via the layout store.
 */
export function WidgetBoard({ weather }: { weather: CityWeather }) {
  const slug = weather.city.slug;
  const containerRef = useRef<HTMLDivElement>(null);
  const swapyRef = useRef<Swapy | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const hasHydrated = useLayoutStore((s) => s.hasHydrated);

  const slotIds = useMemo(() => WIDGETS.map((_, i) => `slot-${i}`), []);
  const defaultMap = useMemo(() => Object.fromEntries(WIDGETS.map((w, i) => [`slot-${i}`, w.id])), []);
  const canUseSavedLayout = mounted && hasHydrated;

  // Read the saved arrangement imperatively so store updates don't fight Swapy.
  const slotItemMap = useMemo(() => {
    if (!canUseSavedLayout) return defaultMap;
    const saved = useLayoutStore.getState().getLayout(slug);
    if (!saved) return defaultMap;
    // Guard against stale/partial saves: ensure every slot maps to a known item
    // and every widget appears exactly once.
    const usedItems = new Set(Object.values(saved));
    const missing = WIDGETS.filter((w) => !usedItems.has(w.id)).map((w) => w.id);
    const map: Record<string, string> = {};
    let missingIdx = 0;
    for (const slotId of slotIds) {
      const item = saved[slotId];
      if (item && WIDGET_MAP[item] && usedItems.has(item)) {
        map[slotId] = item;
        usedItems.delete(item); // prevent duplicates
      } else {
        map[slotId] = missing[missingIdx++] ?? defaultMap[slotId];
      }
    }
    return map;
    // resetKey forces a recompute after a reset.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, defaultMap, slotIds, resetKey, canUseSavedLayout]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const swapy = createSwapy(containerRef.current, {
      animation: "dynamic",
      autoScrollOnDrag: true
    });
    swapy.onSwap((event) => {
      useLayoutStore.getState().setLayout(slug, event.newSlotItemMap.asObject);
    });
    swapyRef.current = swapy;
    return () => swapy.destroy();
  }, [slug, resetKey, canUseSavedLayout]);

  const handleReset = () => {
    useLayoutStore.getState().resetLayout(slug);
    setResetKey((k) => k + 1);
  };

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex-1 flex flex-col gap-1">
          <h2 className="flex items-center gap-2 text-lg font-semibold">Panel de widgets</h2>
          <p className="mb-4">Arrastra los widgets para reorganizarlos. Tu disposición se guarda automáticamente.</p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          <RotateCcw size={13} /> Restablecer orden
        </button>
      </div>

      <div ref={containerRef} key={resetKey} className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {slotIds.map((slotId) => {
          const itemId = slotItemMap[slotId];
          const widget = WIDGET_MAP[itemId];
          if (!widget) return null;
          return (
            <div key={slotId} data-swapy-slot={slotId}>
              <div data-swapy-item={itemId} className="group h-full cursor-grab active:cursor-grabbing">
                {widget.render(weather)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
