"use client";

import { useEffect, useState } from "react";
import { LayoutGrid, Grid3x3, List } from "lucide-react";
import { motion } from "motion/react";
import { useCitiesViewStore, type CitiesViewMode } from "@/store/cities-view-store";
import { cn } from "@/lib/utils";

const VIEWS: { key: CitiesViewMode; label: string; icon: React.ReactNode }[] = [
  { key: "relaxed", label: "Cómoda", icon: <LayoutGrid size={16} /> },
  { key: "compact", label: "Compacta", icon: <Grid3x3 size={16} /> },
  { key: "list", label: "Lista", icon: <List size={16} /> }
];

export function ViewSelector() {
  const view = useCitiesViewStore((s) => s.view);
  const hasHydrated = useCitiesViewStore((s) => s.hasHydrated);
  const setView = useCitiesViewStore((s) => s.setView);
  const [mounted, setMounted] = useState(false);
  const activeView = mounted && hasHydrated ? view : "relaxed";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1" role="tablist" aria-label="Vista de ciudades">
      {VIEWS.map((v) => {
        const active = activeView === v.key;
        return (
          <button
            key={v.key}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={v.label}
            title={v.label}
            onClick={() => setView(v.key)}
            className={cn(
              "relative isolate flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              active ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active && (
              <motion.span
                layoutId="cities-view-active"
                className="absolute inset-0 -z-10 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10 flex items-center">{v.icon}</span>
            <span className="relative z-10 hidden sm:inline">{v.label}</span>
          </button>
        );
      })}
    </div>
  );
}
