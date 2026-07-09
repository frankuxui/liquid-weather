import type { City } from "./types";

/**
 * Curated set of cities shown on the dashboard. Coordinates are used to query
 * Open-Meteo directly (no geocoding round-trip needed for the default set).
 */
export const CITIES: City[] = [
  { slug: "madrid", name: "Madrid", country: "España", countryCode: "ES", admin: "Comunidad de Madrid", latitude: 40.4168, longitude: -3.7038, timezone: "Europe/Madrid" },
  { slug: "barcelona", name: "Barcelona", country: "España", countryCode: "ES", admin: "Cataluña", latitude: 41.3874, longitude: 2.1686, timezone: "Europe/Madrid" },
  { slug: "valencia", name: "Valencia", country: "España", countryCode: "ES", admin: "Comunidad Valenciana", latitude: 39.4699, longitude: -0.3763, timezone: "Europe/Madrid" },
  { slug: "sevilla", name: "Sevilla", country: "España", countryCode: "ES", admin: "Andalucía", latitude: 37.3891, longitude: -5.9845, timezone: "Europe/Madrid" },
  { slug: "bilbao", name: "Bilbao", country: "España", countryCode: "ES", admin: "País Vasco", latitude: 43.263, longitude: -2.935, timezone: "Europe/Madrid" },
  { slug: "santa-cruz-de-tenerife", name: "Santa Cruz de Tenerife", country: "España", countryCode: "ES", admin: "Canarias", latitude: 28.4636, longitude: -16.2518, timezone: "Atlantic/Canary" },
  { slug: "lisboa", name: "Lisboa", country: "Portugal", countryCode: "PT", latitude: 38.7223, longitude: -9.1393, timezone: "Europe/Lisbon" },
  { slug: "paris", name: "París", country: "Francia", countryCode: "FR", latitude: 48.8566, longitude: 2.3522, timezone: "Europe/Paris" },
  { slug: "londres", name: "Londres", country: "Reino Unido", countryCode: "GB", latitude: 51.5072, longitude: -0.1276, timezone: "Europe/London" },
  { slug: "roma", name: "Roma", country: "Italia", countryCode: "IT", latitude: 41.9028, longitude: 12.4964, timezone: "Europe/Rome" },
  { slug: "berlin", name: "Berlín", country: "Alemania", countryCode: "DE", latitude: 52.52, longitude: 13.405, timezone: "Europe/Berlin" },
  { slug: "amsterdam", name: "Ámsterdam", country: "Países Bajos", countryCode: "NL", latitude: 52.3676, longitude: 4.9041, timezone: "Europe/Amsterdam" },
  { slug: "zurich", name: "Zúrich", country: "Suiza", countryCode: "CH", latitude: 47.3769, longitude: 8.5417, timezone: "Europe/Zurich" },
  { slug: "reikiavik", name: "Reikiavik", country: "Islandia", countryCode: "IS", latitude: 64.1466, longitude: -21.9426, timezone: "Atlantic/Reykjavik" },
  { slug: "nueva-york", name: "Nueva York", country: "Estados Unidos", countryCode: "US", latitude: 40.7128, longitude: -74.006, timezone: "America/New_York" },
  { slug: "ciudad-de-mexico", name: "Ciudad de México", country: "México", countryCode: "MX", latitude: 19.4326, longitude: -99.1332, timezone: "America/Mexico_City" },
  { slug: "buenos-aires", name: "Buenos Aires", country: "Argentina", countryCode: "AR", latitude: -34.6037, longitude: -58.3816, timezone: "America/Argentina/Buenos_Aires" },
  { slug: "bogota", name: "Bogotá", country: "Colombia", countryCode: "CO", latitude: 4.711, longitude: -74.0721, timezone: "America/Bogota" },
  { slug: "santiago", name: "Santiago", country: "Chile", countryCode: "CL", latitude: -33.4489, longitude: -70.6693, timezone: "America/Santiago" },
  { slug: "sao-paulo", name: "São Paulo", country: "Brasil", countryCode: "BR", latitude: -23.5558, longitude: -46.6396, timezone: "America/Sao_Paulo" },
  { slug: "tokio", name: "Tokio", country: "Japón", countryCode: "JP", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo" },
  { slug: "singapur", name: "Singapur", country: "Singapur", countryCode: "SG", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore" },
  { slug: "dubai", name: "Dubái", country: "Emiratos Árabes Unidos", countryCode: "AE", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai" },
  { slug: "sidney", name: "Sídney", country: "Australia", countryCode: "AU", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney" },
];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}

/** Flag emoji from an ISO country code, e.g. "ES" -> 🇪🇸 */
export function flagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .replace(/./g, (ch) =>
      String.fromCodePoint(127397 + ch.charCodeAt(0)),
    );
}
