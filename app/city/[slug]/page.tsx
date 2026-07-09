import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityDetail } from "@/components/city/city-detail";
import { buildCityFromParams, cityHref, getCityBySlug } from "@/lib/cities";
import { fetchCityWeather } from "@/lib/open-meteo";
import { OG_IMAGE, SITE_NAME } from "@/lib/seo";

// Rendered on demand: the weather API is queried at request time (cached at the
// fetch layer for 30 min) so pages always reflect live data without requiring
// network access at build time.
export const dynamic = "force-dynamic";

type SearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<SearchParams> }): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug) ?? buildCityFromParams(slug, await searchParams);
  if (!city) {
    return {
      title: "Ciudad no encontrada",
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const location = city.admin ? `${city.name}, ${city.admin}, ${city.country}` : `${city.name}, ${city.country}`;
  const title = `Tiempo en ${city.name}: previsión y clima actual`;
  const description = `Consulta el tiempo en ${location}: temperatura actual, lluvia, viento, humedad, índice UV, calidad del aire y previsión horaria y semanal.`;
  const canonical = city.custom ? undefined : cityHref(city);

  return {
    title,
    description,
    alternates: canonical
      ? {
          canonical
        }
      : undefined,
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "es_ES",
      images: [
        {
          ...OG_IMAGE,
          alt: `Previsión meteorológica para ${location} en Liquid Weather`
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [OG_IMAGE]
    },
    robots: city.custom
      ? {
          index: false,
          follow: false
        }
      : {
          index: true,
          follow: true
        }
  };
}

export default async function CityPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<SearchParams> }) {
  const { slug } = await params;
  const city = getCityBySlug(slug) ?? buildCityFromParams(slug, await searchParams);
  if (!city) notFound();

  const weather = await fetchCityWeather(city);
  return <CityDetail weather={weather} />;
}
