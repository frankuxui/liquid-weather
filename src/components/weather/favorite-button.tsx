"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useFavoritesStore } from "@/store/favorites-store";
import { HeartBurst } from "./heart-burst";
import { cn } from "@/lib/utils";

/** Corazón base (SVG provisto). El color de relleno se controla vía prop para
 *  poder animarlo durante la explosión. */
function HeartGlyph({ size, fill }: { size: number; fill: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 36 36" aria-hidden>
      <path d="M0 0h36v36H0z" fill="none" />
      <path
        fill={fill}
        d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868c-3.308 0-6.227 1.633-8.018 4.129c-1.791-2.496-4.71-4.129-8.017-4.129c-5.45 0-9.868 4.417-9.868 9.868c0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959c.17-.721.268-1.469.268-2.242"
      />
    </svg>
  );
}

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
  const hasHydrated = useFavoritesStore((s) => s.hasHydrated);
  const toggleFavorite = useFavoritesStore((s) => s.toggle);
  const [mounted, setMounted] = useState(false);
  const isFavorite = isActive ?? (mounted && hasHydrated ? favoritesStoreActive : false);
  const reduceMotion = useReducedMotion();

  const [burstKey, setBurstKey] = useState(0);
  const wasFavorite = useRef(isFavorite);
  const ready = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!ready.current) {
      ready.current = mounted;
      wasFavorite.current = isFavorite;
      return;
    }
    if (isFavorite && !wasFavorite.current) {
      setBurstKey((k) => k + 1);
    }
    wasFavorite.current = isFavorite;
  }, [isFavorite, mounted]);

  const fill = isFavorite ? "#f43f5e" : "#99aab5";

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
      {/* --- Explosión, se reproduce una vez cuando la ciudad pasa a favorita --- */}
      <HeartBurst burstKey={burstKey} size={size} />

      {/* --- Corazón --- */}
      <motion.span
        key={isFavorite ? "on" : "off"}
        className="relative grid place-items-center"
        initial={{ scale: 0.6, rotate: isFavorite ? -18 : 0 }}
        animate={
          isFavorite && !reduceMotion
            ? {
                // secuencia squash & pop sincronizada con la explosión
                scale: [0.6, 0.82, 1.35, 0.92, 1],
                rotate: [-18, -10, 6, -3, 0]
              }
            : { scale: 1, rotate: 0 }
        }
        whileTap={{ scale: 0.82 }}
        transition={
          isFavorite && !reduceMotion
            ? { duration: 0.55, ease: [0.34, 1.56, 0.64, 1], times: [0, 0.18, 0.45, 0.72, 1] }
            : { type: "spring", stiffness: 450, damping: 15 }
        }
        style={{
          filter: isFavorite ? "drop-shadow(0 0 8px rgba(244,63,94,0.6))" : "none"
        }}
      >
        <HeartGlyph size={size} fill={fill} />
      </motion.span>
    </button>
  );
}
