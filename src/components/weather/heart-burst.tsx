"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";

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

/**
 * Explosión reutilizable de corazón: onda de choque + destello + chispas + polvo.
 * Se reproduce cada vez que `burstKey` cambia a un valor mayor que 0.
 * Debe montarse dentro de un contenedor `relative`.
 */
export function HeartBurst({ burstKey, size = 20 }: { burstKey: number; size?: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {burstKey > 0 && !reduceMotion && (
        <motion.span key={burstKey} className="pointer-events-none absolute inset-0 grid place-items-center">
          {/* Onda de choque (shockwave) */}
          <motion.span
            className="absolute rounded-full"
            style={{ width: size * 1.6, height: size * 1.6, border: "2px solid rgba(244,63,94,0.55)" }}
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Destello radial suave */}
          <motion.span
            className="absolute rounded-full"
            style={{ width: size * 1.4, height: size * 1.4, background: "radial-gradient(circle, rgba(253,164,175,0.7) 0%, rgba(244,63,94,0) 70%)" }}
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
              animate={{ x: p.x * p.distance, y: p.y * p.distance, scale: [0, 1.15, 0], opacity: [1, 1, 0] }}
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
              animate={{ x: p.x * p.distance, y: p.y * p.distance, scale: [0, 1, 0], opacity: [0.9, 0.7, 0] }}
              transition={{ duration: 0.7, ease: "easeOut", delay: p.delay }}
            />
          ))}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
