"use client";

import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites-store";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  slug,
  className,
  size = 20,
}: {
  slug: string;
  className?: string;
  size?: number;
}) {
  const isFavorite = useFavoritesStore((s) => s.favorites.includes(slug));
  const toggle = useFavoritesStore((s) => s.toggle);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
      className={cn(
        "group/fav grid place-items-center rounded-full p-2 transition-all duration-300",
        "hover:bg-white/10 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <Heart
        size={size}
        strokeWidth={2}
        className={cn(
          "transition-all duration-300",
          isFavorite
            ? "fill-rose-500 text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]"
            : "text-foreground/60 group-hover/fav:text-rose-400",
        )}
      />
    </button>
  );
}
