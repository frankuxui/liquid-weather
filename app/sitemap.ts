import type { MetadataRoute } from "next";
import { CITIES, cityHref } from "@/lib/cities";
import { SITE_BASE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: SITE_BASE_URL.toString(),
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: new URL("/cities", SITE_BASE_URL).toString(),
      lastModified,
      changeFrequency: "daily",
      priority: 0.9
    },
    ...CITIES.map((city) => ({
      url: new URL(cityHref(city), SITE_BASE_URL).toString(),
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.8
    }))
  ];
}
