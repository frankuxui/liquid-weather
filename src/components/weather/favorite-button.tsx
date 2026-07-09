"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites-store";
import { cn } from "@/lib/utils";

const BURST_ANGLES = [0, 60, 120, 180, 240, 300];

export function FavoriteButton({
  slug,
  className,
  size = 20,
  isActive,
  onToggle
}: {
  slug: string;
  className?: string;
  size?: number;
  /** Override the favorites-store lookup, e.g. to drive a custom-cities store instead. */
  isActive?: boolean;
  onToggle?: () => void;
}) {
  const favoritesStoreActive = useFavoritesStore((s) => s.favorites.includes(slug));
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const isFavorite = isActive ?? favoritesStoreActive;

  const [burstKey, setBurstKey] = useState(0);
  const wasFavorite = useRef(isFavorite);

  useEffect(() => {
    if (isFavorite && !wasFavorite.current) {
      setBurstKey((k) => k + 1);
    }
    wasFavorite.current = isFavorite;
  }, [isFavorite]);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onToggle) {
          onToggle();
        } else {
          toggleFavorite(slug);
        }
      }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      className={cn(
        "group/fav relative grid place-items-center rounded-full p-2 transition-colors duration-300",
        "hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      {/* Radial spark burst, played once whenever a city becomes a favorite */}
      <AnimatePresence>
        {burstKey > 0 && (
          <motion.span key={burstKey} className="pointer-events-none absolute inset-0">
            {BURST_ANGLES.map((angle) => {
              const rad = (angle * Math.PI) / 180;
              return (
                <motion.span
                  key={angle}
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-rose-400"
                  initial={{ opacity: 1, x: "-50%", y: "-50%", scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: `calc(-50% + ${Math.cos(rad) * 26}px)`,
                    y: `calc(-50% + ${Math.sin(rad) * 26}px)`,
                    scale: 0
                  }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                />
              );
            })}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.span
        key={isFavorite ? "on" : "off"}
        initial={{ scale: 0.6, rotate: isFavorite ? -25 : 0 }}
        animate={{ scale: 1, rotate: 0 }}
        whileTap={{ scale: 0.82 }}
        transition={{ type: "spring", stiffness: 450, damping: 15 }}
        className="grid place-items-center"
      >
        <Heart
          size={size}
          strokeWidth={2}
          className={cn("transition-colors duration-300", isFavorite ? "fill-rose-500 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" : "text-foreground/60 group-hover/fav:text-rose-400")}
        />
      </motion.span>
    </button>
  );
}
