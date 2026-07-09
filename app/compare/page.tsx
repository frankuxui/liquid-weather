import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { CompareView } from "@/components/compare/compare-view";
import { OG_IMAGE, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Comparador de ciudades",
  description: "Compara el clima de dos ciudades lado a lado: temperatura, sensación térmica, humedad, viento, UV, precipitación y calidad del aire.",
  alternates: {
    canonical: "/compare"
  },
  openGraph: {
    title: "Comparador de ciudades | Liquid Weather",
    description: "Enfrenta dos ciudades y analiza en profundidad las diferencias de su clima en tiempo real.",
    url: "/compare",
    siteName: SITE_NAME,
    images: [OG_IMAGE],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Comparador de ciudades | Liquid Weather",
    description: "Enfrenta dos ciudades y analiza en profundidad las diferencias de su clima.",
    images: [OG_IMAGE]
  }
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-10 py-12">
      <header className="mb-8 animate-fade-in">
        <Badge tone="primary" className="mb-3">
          Comparador
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Ciudad contra ciudad</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">Elige dos ciudades y compáralas lado a lado con una analítica profunda de su clima en tiempo real.</p>
      </header>

      <CompareView />
    </div>
  );
}
