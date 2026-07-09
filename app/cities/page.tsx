import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { CitiesView } from "@/components/cities/cities-view";
import { GlassCard } from "@/components/glass/glass-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CITIES } from "@/lib/cities";
import { fetchCitySummaries } from "@/lib/open-meteo";

export const metadata: Metadata = {
  title: "Ciudades",
  description: "Explora el tiempo en tiempo real de decenas de ciudades. Filtra y ordena por temperatura, humedad, viento, condición o favoritas."
};

// Rendered on demand so the dashboard reflects live weather without requiring
// network access at build time. Individual fetches are cached for 10 minutes.
export const dynamic = "force-dynamic";

export default async function CitiesPage() {
  const summaries = await fetchCitySummaries(CITIES);

  return (
    <div className="mx-auto max-w-7xl px-10 py-12">
      <header className="mb-8 animate-fade-in">
        <Badge tone="primary" className="mb-3">
          Dashboard
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">El tiempo en tus ciudades</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Datos en tiempo real de {CITIES.length} ciudades. Filtra y ordena para encontrar exactamente lo que buscas.</p>
      </header>

      {summaries.length === 0 ? (
        <GlassCard className="flex flex-col items-center gap-4 py-20 text-center">
          <AlertTriangle size={44} className="text-amber-400/70" />
          <div>
            <h2 className="text-lg font-semibold">No pudimos cargar los datos</h2>
            <p className="mt-1 text-sm text-muted-foreground">Hubo un problema al contactar con el servicio meteorológico. Inténtalo de nuevo en unos instantes.</p>
          </div>
          <Button asChild variant="glass">
            <Link href="/cities">Reintentar</Link>
          </Button>
        </GlassCard>
      ) : (
        <CitiesView summaries={summaries} />
      )}
    </div>
  );
}
