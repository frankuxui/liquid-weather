"use server";

import { CITIES, getCityBySlug } from "./cities";
import { fetchCitySummaries, fetchCityWeather } from "./open-meteo";
import type { CitySummary, CityWeather, WeatherResult } from "./types";

/**
 * Server Action: fetch weather summaries for the dashboard, optionally
 * filtered by a free-text search over city / country names.
 */
export async function getCitySummariesAction(query?: string): Promise<WeatherResult<CitySummary[]>> {
  try {
    const normalized = (query ?? "").trim().toLowerCase();
    const cities = normalized
      ? CITIES.filter((c) => c.name.toLowerCase().includes(normalized) || c.country.toLowerCase().includes(normalized) || (c.admin?.toLowerCase().includes(normalized) ?? false))
      : CITIES;

    const data = await fetchCitySummaries(cities);
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "No se pudieron cargar los datos meteorológicos."
    };
  }
}

/** Server Action: full weather bundle for a single city by slug. */
export async function getCityWeatherAction(slug: string): Promise<WeatherResult<CityWeather>> {
  try {
    const city = getCityBySlug(slug);
    if (!city) {
      return { data: null, error: "Ciudad no encontrada." };
    }
    const data = await fetchCityWeather(city);
    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "No se pudo cargar la información de la ciudad."
    };
  }
}
