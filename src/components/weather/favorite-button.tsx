"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useFavoritesStore } from "@/store/favorites-store";
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

// Partículas grandes ("chispas" redondas) en 8 direcciones.
const SPARKS = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * 360) / 8;
  const rad = (angle * Math.PI) / 180;
  return {
    id: i,
    x: Math.cos(rad),
    y: Math.sin(rad),
    distance: 30 + (i % 2) * 8,
    size: 6 - (i % 3),
    color: ["#f43f5e", "#fb7185", "#fda4af", "#fecdd3"][i % 4],
    delay: (i % 4) * 0.012
  };
});

// Partículas pequeñas ("polvo") desfasadas para dar profundidad.
const DUST = Array.from({ length: 10 }, (_, i) => {
  const angle = (i * 360) / 10 + 18;
  const rad = (angle * Math.PI) / 180;
  return {
    id: i,
    x: Math.cos(rad),
    y: Math.sin(rad),
    distance: 18 + (i % 3) * 6,
    size: 2 + (i % 2),
    color: ["#fb7185", "#fda4af", "#fecdd3"][i % 3],
    delay: 0.02 + (i % 3) * 0.02
  };
});

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
  const reduceMotion = useReducedMotion();

  const [burstKey, setBurstKey] = useState(0);
  const wasFavorite = useRef(isFavorite);

  useEffect(() => {
    if (isFavorite && !wasFavorite.current) {
      setBurstKey((k) => k + 1);
    }
    wasFavorite.current = isFavorite;
  }, [isFavorite]);

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
      <AnimatePresence>
        {burstKey > 0 && !reduceMotion && (
          <motion.span
            key={burstKey}
            className="pointer-events-none absolute inset-0 grid place-items-center"
          >
            {/* Onda de choque (shockwave) */}
            <motion.span
              className="absolute rounded-full"
              style={{
                width: size * 1.6,
                height: size * 1.6,
                border: "2px solid rgba(244,63,94,0.55)"
              }}
              initial={{ scale: 0.2, opacity: 0.9 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Destello radial suave */}
            <motion.span
              className="absolute rounded-full"
              style={{
                width: size * 1.4,
                height: size * 1.4,
                background: "radial-gradient(circle, rgba(253,164,175,0.7) 0%, rgba(244,63,94,0) 70%)"
              }}
              initial={{ scale: 0, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />

            {/* Chispas grandes */}
            {SPARKS.map((p) => (
              <motion.span
                key={`spark-${p.id}`}
                className="absolute rounded-full"
                style={{ width: p.size, height: p.size, backgroundColor: p.color }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                animate={{
                  x: p.x * p.distance,
                  y: p.y * p.distance,
                  scale: [0, 1.15, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: p.delay }}
              />
            ))}

            {/* Polvo pequeño */}
            {DUST.map((p) => (
              <motion.span
                key={`dust-${p.id}`}
                className="absolute rounded-full"
                style={{ width: p.size, height: p.size, backgroundColor: p.color }}
                initial={{ x: 0, y: 0, scale: 0, opacity: 0.9 }}
                animate={{
                  x: p.x * p.distance,
                  y: p.y * p.distance,
                  scale: [0, 1, 0],
                  opacity: [0.9, 0.7, 0]
                }}
                transition={{ duration: 0.7, ease: "easeOut", delay: p.delay }}
              />
            ))}
          </motion.span>
        )}
      </AnimatePresence>

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
