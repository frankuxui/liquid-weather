import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityDetail } from "@/components/city/city-detail";
import { buildCityFromParams, getCityBySlug } from "@/lib/cities";
import { fetchCityWeather } from "@/lib/open-meteo";

// Rendered on demand: the weather API is queried at request time (cached at the
// fetch layer for 30 min) so pages always reflect live data without requiring
// network access at build time.
export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug) ?? buildCityFromParams(slug, await searchParams);
  if (!city) return { title: "Ciudad no encontrada" };
  return {
    title: `${city.name} — El tiempo`,
    description: `Pronóstico meteorológico completo de ${city.name}, ${city.country}: temperatura, humedad, viento, índice UV, calidad del aire y más.`
  };
}

export default async function CityPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<SearchParams> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug) ?? buildCityFromParams(slug, await searchParams);
  if (!city) notFound();

  const weather = await fetchCityWeather(city);
  return <CityDetail weather={weather} />;
}
