"use client";

import Link from "next/link";
import { CloudOff } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { Button } from "@/components/ui/button";

export default function CityError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <GlassCard strong className="flex flex-col items-center gap-5 p-12">
        <CloudOff size={48} className="text-amber-400/70" />
        <div>
          <h1 className="text-2xl font-semibold">Algo salió mal</h1>
          <p className="mt-2 text-muted-foreground">
            No pudimos cargar el tiempo de esta ciudad. Puede ser un problema
            temporal de red o del servicio meteorológico.
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={reset}>Reintentar</Button>
          <Button asChild variant="glass">
            <Link href="/cities">Ver ciudades</Link>
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
