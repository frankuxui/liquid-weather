import type { GeocodingResult } from "./types";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";

interface OpenMeteoGeocodingResponse {
  results?: {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    country_code?: string;
    admin1?: string;
    timezone?: string;
  }[];
}

/** Search worldwide locations by name via Open-Meteo's free geocoding API. */
export async function searchLocations(query: string): Promise<GeocodingResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];

  const url = `${GEOCODING_URL}?name=${encodeURIComponent(q)}&count=10&language=es&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Geocoding respondió ${res.status}`);
  const data = (await res.json()) as OpenMeteoGeocodingResponse;

  return (data.results ?? [])
    .filter((r) => r.country && r.country_code && r.timezone)
    .map((r) => ({
      id: r.id,
      name: r.name,
      country: r.country as string,
      countryCode: r.country_code as string,
      admin1: r.admin1,
      latitude: r.latitude,
      longitude: r.longitude,
      timezone: r.timezone as string
    }));
}
