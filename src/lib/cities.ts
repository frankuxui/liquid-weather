import type { City, Continent } from "./types";

export const CONTINENTS: Continent[] = ["Europa", "América del Norte", "América Central y Caribe", "América del Sur", "Asia", "África", "Oceanía"];

/**
 * Curated set of cities shown on the dashboard. Coordinates are used to query
 * Open-Meteo directly (no geocoding round-trip needed for the default set).
 */
export const CITIES: City[] = [
  // España
  { slug: "madrid", name: "Madrid", country: "España", countryCode: "ES", admin: "Comunidad de Madrid", latitude: 40.4168, longitude: -3.7038, timezone: "Europe/Madrid", continent: "Europa" },
  { slug: "barcelona", name: "Barcelona", country: "España", countryCode: "ES", admin: "Cataluña", latitude: 41.3874, longitude: 2.1686, timezone: "Europe/Madrid", continent: "Europa" },
  { slug: "valencia", name: "Valencia", country: "España", countryCode: "ES", admin: "Comunidad Valenciana", latitude: 39.4699, longitude: -0.3763, timezone: "Europe/Madrid", continent: "Europa" },
  { slug: "sevilla", name: "Sevilla", country: "España", countryCode: "ES", admin: "Andalucía", latitude: 37.3891, longitude: -5.9845, timezone: "Europe/Madrid", continent: "Europa" },
  { slug: "bilbao", name: "Bilbao", country: "España", countryCode: "ES", admin: "País Vasco", latitude: 43.263, longitude: -2.935, timezone: "Europe/Madrid", continent: "Europa" },
  {
    slug: "santa-cruz-de-tenerife",
    name: "Santa Cruz de Tenerife",
    country: "España",
    countryCode: "ES",
    admin: "Canarias",
    latitude: 28.4636,
    longitude: -16.2518,
    timezone: "Atlantic/Canary",
    continent: "Europa"
  },
  // Europa
  { slug: "lisboa", name: "Lisboa", country: "Portugal", countryCode: "PT", latitude: 38.7223, longitude: -9.1393, timezone: "Europe/Lisbon", continent: "Europa" },
  { slug: "paris", name: "París", country: "Francia", countryCode: "FR", latitude: 48.8566, longitude: 2.3522, timezone: "Europe/Paris", continent: "Europa" },
  { slug: "londres", name: "Londres", country: "Reino Unido", countryCode: "GB", latitude: 51.5072, longitude: -0.1276, timezone: "Europe/London", continent: "Europa" },
  { slug: "roma", name: "Roma", country: "Italia", countryCode: "IT", latitude: 41.9028, longitude: 12.4964, timezone: "Europe/Rome", continent: "Europa" },
  { slug: "berlin", name: "Berlín", country: "Alemania", countryCode: "DE", latitude: 52.52, longitude: 13.405, timezone: "Europe/Berlin", continent: "Europa" },
  { slug: "amsterdam", name: "Ámsterdam", country: "Países Bajos", countryCode: "NL", latitude: 52.3676, longitude: 4.9041, timezone: "Europe/Amsterdam", continent: "Europa" },
  { slug: "zurich", name: "Zúrich", country: "Suiza", countryCode: "CH", latitude: 47.3769, longitude: 8.5417, timezone: "Europe/Zurich", continent: "Europa" },
  { slug: "reikiavik", name: "Reikiavik", country: "Islandia", countryCode: "IS", latitude: 64.1466, longitude: -21.9426, timezone: "Atlantic/Reykjavik", continent: "Europa" },
  { slug: "dublin", name: "Dublín", country: "Irlanda", countryCode: "IE", latitude: 53.3498, longitude: -6.2603, timezone: "Europe/Dublin", continent: "Europa" },
  { slug: "bruselas", name: "Bruselas", country: "Bélgica", countryCode: "BE", latitude: 50.8503, longitude: 4.3517, timezone: "Europe/Brussels", continent: "Europa" },
  { slug: "viena", name: "Viena", country: "Austria", countryCode: "AT", latitude: 48.2082, longitude: 16.3738, timezone: "Europe/Vienna", continent: "Europa" },
  { slug: "estocolmo", name: "Estocolmo", country: "Suecia", countryCode: "SE", latitude: 59.3293, longitude: 18.0686, timezone: "Europe/Stockholm", continent: "Europa" },
  { slug: "oslo", name: "Oslo", country: "Noruega", countryCode: "NO", latitude: 59.9139, longitude: 10.7522, timezone: "Europe/Oslo", continent: "Europa" },
  { slug: "copenhague", name: "Copenhague", country: "Dinamarca", countryCode: "DK", latitude: 55.6761, longitude: 12.5683, timezone: "Europe/Copenhagen", continent: "Europa" },
  { slug: "helsinki", name: "Helsinki", country: "Finlandia", countryCode: "FI", latitude: 60.1699, longitude: 24.9384, timezone: "Europe/Helsinki", continent: "Europa" },
  { slug: "varsovia", name: "Varsovia", country: "Polonia", countryCode: "PL", latitude: 52.2297, longitude: 21.0122, timezone: "Europe/Warsaw", continent: "Europa" },
  { slug: "praga", name: "Praga", country: "Chequia", countryCode: "CZ", latitude: 50.0755, longitude: 14.4378, timezone: "Europe/Prague", continent: "Europa" },
  { slug: "budapest", name: "Budapest", country: "Hungría", countryCode: "HU", latitude: 47.4979, longitude: 19.0402, timezone: "Europe/Budapest", continent: "Europa" },
  { slug: "atenas", name: "Atenas", country: "Grecia", countryCode: "GR", latitude: 37.9838, longitude: 23.7275, timezone: "Europe/Athens", continent: "Europa" },
  { slug: "moscu", name: "Moscú", country: "Rusia", countryCode: "RU", latitude: 55.7558, longitude: 37.6173, timezone: "Europe/Moscow", continent: "Europa" },
  { slug: "kiev", name: "Kiev", country: "Ucrania", countryCode: "UA", latitude: 50.4501, longitude: 30.5234, timezone: "Europe/Kyiv", continent: "Europa" },
  { slug: "bucarest", name: "Bucarest", country: "Rumanía", countryCode: "RO", latitude: 44.4268, longitude: 26.1025, timezone: "Europe/Bucharest", continent: "Europa" },
  // América del Norte
  { slug: "nueva-york", name: "Nueva York", country: "Estados Unidos", countryCode: "US", latitude: 40.7128, longitude: -74.006, timezone: "America/New_York", continent: "América del Norte" },
  { slug: "ciudad-de-mexico", name: "Ciudad de México", country: "México", countryCode: "MX", latitude: 19.4326, longitude: -99.1332, timezone: "America/Mexico_City", continent: "América del Norte" },
  { slug: "toronto", name: "Toronto", country: "Canadá", countryCode: "CA", latitude: 43.6532, longitude: -79.3832, timezone: "America/Toronto", continent: "América del Norte" },
  // América Central y Caribe
  { slug: "san-jose", name: "San José", country: "Costa Rica", countryCode: "CR", latitude: 9.9281, longitude: -84.0907, timezone: "America/Costa_Rica", continent: "América Central y Caribe" },
  {
    slug: "ciudad-de-panama",
    name: "Ciudad de Panamá",
    country: "Panamá",
    countryCode: "PA",
    latitude: 8.9824,
    longitude: -79.5199,
    timezone: "America/Panama",
    continent: "América Central y Caribe"
  },
  { slug: "la-habana", name: "La Habana", country: "Cuba", countryCode: "CU", latitude: 23.1136, longitude: -82.3666, timezone: "America/Havana", continent: "América Central y Caribe" },
  {
    slug: "santo-domingo",
    name: "Santo Domingo",
    country: "República Dominicana",
    countryCode: "DO",
    latitude: 18.4861,
    longitude: -69.9312,
    timezone: "America/Santo_Domingo",
    continent: "América Central y Caribe"
  },
  {
    slug: "ciudad-de-guatemala",
    name: "Ciudad de Guatemala",
    country: "Guatemala",
    countryCode: "GT",
    latitude: 14.6349,
    longitude: -90.5069,
    timezone: "America/Guatemala",
    continent: "América Central y Caribe"
  },
  // América del Sur
  {
    slug: "buenos-aires",
    name: "Buenos Aires",
    country: "Argentina",
    countryCode: "AR",
    latitude: -34.6037,
    longitude: -58.3816,
    timezone: "America/Argentina/Buenos_Aires",
    continent: "América del Sur"
  },
  { slug: "bogota", name: "Bogotá", country: "Colombia", countryCode: "CO", latitude: 4.711, longitude: -74.0721, timezone: "America/Bogota", continent: "América del Sur" },
  { slug: "santiago", name: "Santiago", country: "Chile", countryCode: "CL", latitude: -33.4489, longitude: -70.6693, timezone: "America/Santiago", continent: "América del Sur" },
  { slug: "sao-paulo", name: "São Paulo", country: "Brasil", countryCode: "BR", latitude: -23.5558, longitude: -46.6396, timezone: "America/Sao_Paulo", continent: "América del Sur" },
  { slug: "lima", name: "Lima", country: "Perú", countryCode: "PE", latitude: -12.0464, longitude: -77.0428, timezone: "America/Lima", continent: "América del Sur" },
  { slug: "caracas", name: "Caracas", country: "Venezuela", countryCode: "VE", latitude: 10.4806, longitude: -66.9036, timezone: "America/Caracas", continent: "América del Sur" },
  { slug: "quito", name: "Quito", country: "Ecuador", countryCode: "EC", latitude: -0.1807, longitude: -78.4678, timezone: "America/Guayaquil", continent: "América del Sur" },
  { slug: "la-paz", name: "La Paz", country: "Bolivia", countryCode: "BO", latitude: -16.5, longitude: -68.15, timezone: "America/La_Paz", continent: "América del Sur" },
  { slug: "montevideo", name: "Montevideo", country: "Uruguay", countryCode: "UY", latitude: -34.9011, longitude: -56.1645, timezone: "America/Montevideo", continent: "América del Sur" },
  { slug: "asuncion", name: "Asunción", country: "Paraguay", countryCode: "PY", latitude: -25.2637, longitude: -57.5759, timezone: "America/Asuncion", continent: "América del Sur" },
  // Asia
  { slug: "tokio", name: "Tokio", country: "Japón", countryCode: "JP", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo", continent: "Asia" },
  { slug: "singapur", name: "Singapur", country: "Singapur", countryCode: "SG", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore", continent: "Asia" },
  { slug: "dubai", name: "Dubái", country: "Emiratos Árabes Unidos", countryCode: "AE", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai", continent: "Asia" },
  { slug: "pekin", name: "Pekín", country: "China", countryCode: "CN", latitude: 39.9042, longitude: 116.4074, timezone: "Asia/Shanghai", continent: "Asia" },
  { slug: "seul", name: "Seúl", country: "Corea del Sur", countryCode: "KR", latitude: 37.5665, longitude: 126.978, timezone: "Asia/Seoul", continent: "Asia" },
  { slug: "bangkok", name: "Bangkok", country: "Tailandia", countryCode: "TH", latitude: 13.7563, longitude: 100.5018, timezone: "Asia/Bangkok", continent: "Asia" },
  { slug: "yakarta", name: "Yakarta", country: "Indonesia", countryCode: "ID", latitude: -6.2088, longitude: 106.8456, timezone: "Asia/Jakarta", continent: "Asia" },
  { slug: "kuala-lumpur", name: "Kuala Lumpur", country: "Malasia", countryCode: "MY", latitude: 3.139, longitude: 101.6869, timezone: "Asia/Kuala_Lumpur", continent: "Asia" },
  { slug: "manila", name: "Manila", country: "Filipinas", countryCode: "PH", latitude: 14.5995, longitude: 120.9842, timezone: "Asia/Manila", continent: "Asia" },
  { slug: "nueva-delhi", name: "Nueva Delhi", country: "India", countryCode: "IN", latitude: 28.6139, longitude: 77.209, timezone: "Asia/Kolkata", continent: "Asia" },
  { slug: "karachi", name: "Karachi", country: "Pakistán", countryCode: "PK", latitude: 24.8607, longitude: 67.0011, timezone: "Asia/Karachi", continent: "Asia" },
  { slug: "tel-aviv", name: "Tel Aviv", country: "Israel", countryCode: "IL", latitude: 32.0853, longitude: 34.7818, timezone: "Asia/Jerusalem", continent: "Asia" },
  { slug: "riad", name: "Riad", country: "Arabia Saudita", countryCode: "SA", latitude: 24.7136, longitude: 46.6753, timezone: "Asia/Riyadh", continent: "Asia" },
  { slug: "teheran", name: "Teherán", country: "Irán", countryCode: "IR", latitude: 35.6892, longitude: 51.389, timezone: "Asia/Tehran", continent: "Asia" },
  { slug: "hanoi", name: "Hanói", country: "Vietnam", countryCode: "VN", latitude: 21.0278, longitude: 105.8342, timezone: "Asia/Ho_Chi_Minh", continent: "Asia" },
  { slug: "estambul", name: "Estambul", country: "Turquía", countryCode: "TR", latitude: 41.0082, longitude: 28.9784, timezone: "Europe/Istanbul", continent: "Asia" },
  // África
  { slug: "el-cairo", name: "El Cairo", country: "Egipto", countryCode: "EG", latitude: 30.0444, longitude: 31.2357, timezone: "Africa/Cairo", continent: "África" },
  { slug: "lagos", name: "Lagos", country: "Nigeria", countryCode: "NG", latitude: 6.5244, longitude: 3.3792, timezone: "Africa/Lagos", continent: "África" },
  { slug: "nairobi", name: "Nairobi", country: "Kenia", countryCode: "KE", latitude: -1.2921, longitude: 36.8219, timezone: "Africa/Nairobi", continent: "África" },
  { slug: "johannesburgo", name: "Johannesburgo", country: "Sudáfrica", countryCode: "ZA", latitude: -26.2041, longitude: 28.0473, timezone: "Africa/Johannesburg", continent: "África" },
  { slug: "casablanca", name: "Casablanca", country: "Marruecos", countryCode: "MA", latitude: 33.5731, longitude: -7.5898, timezone: "Africa/Casablanca", continent: "África" },
  { slug: "accra", name: "Accra", country: "Ghana", countryCode: "GH", latitude: 5.6037, longitude: -0.187, timezone: "Africa/Accra", continent: "África" },
  { slug: "adis-abeba", name: "Adís Abeba", country: "Etiopía", countryCode: "ET", latitude: 9.025, longitude: 38.7469, timezone: "Africa/Addis_Ababa", continent: "África" },
  { slug: "tunez", name: "Túnez", country: "Túnez", countryCode: "TN", latitude: 36.8065, longitude: 10.1815, timezone: "Africa/Tunis", continent: "África" },
  { slug: "argel", name: "Argel", country: "Argelia", countryCode: "DZ", latitude: 36.7538, longitude: 3.0588, timezone: "Africa/Algiers", continent: "África" },
  { slug: "dakar", name: "Dakar", country: "Senegal", countryCode: "SN", latitude: 14.7167, longitude: -17.4677, timezone: "Africa/Dakar", continent: "África" },
  // Oceanía
  { slug: "sidney", name: "Sídney", country: "Australia", countryCode: "AU", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney", continent: "Oceanía" },
  { slug: "auckland", name: "Auckland", country: "Nueva Zelanda", countryCode: "NZ", latitude: -36.8485, longitude: 174.7633, timezone: "Pacific/Auckland", continent: "Oceanía" },
  { slug: "suva", name: "Suva", country: "Fiyi", countryCode: "FJ", latitude: -18.1416, longitude: 178.4419, timezone: "Pacific/Fiji", continent: "Oceanía" }
];

export function getCityBySlug(slug: string): City | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getAllCitySlugs(): string[] {
  return CITIES.map((c) => c.slug);
}

/** URL-safe slug from a free-form name, e.g. "São Paulo" -> "sao-paulo" */
export function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Deterministic slug for a custom (searched or manual) location. */
export function customCitySlug(name: string, latitude: number, longitude: number): string {
  return `custom-${slugify(name)}-${latitude.toFixed(2)}-${longitude.toFixed(2)}`;
}

/**
 * Link to a city's detail page. Curated cities resolve by slug alone; custom
 * cities carry their full data as query params since the detail route is
 * server-rendered and has no access to the client-side custom-cities store.
 */
export function cityHref(city: City): string {
  if (!city.custom && getCityBySlug(city.slug)) {
    return `/city/${city.slug}`;
  }
  const params = new URLSearchParams({
    lat: String(city.latitude),
    lon: String(city.longitude),
    tz: city.timezone,
    name: city.name,
    country: city.country,
    countryCode: city.countryCode,
    continent: city.continent
  });
  if (city.admin) params.set("admin", city.admin);
  return `/city/${city.slug}?${params.toString()}`;
}

/** Reconstruct a custom City from the query params produced by cityHref(). */
export function buildCityFromParams(slug: string, params: Record<string, string | string[] | undefined>): City | undefined {
  const get = (key: string) => {
    const v = params[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const lat = Number(get("lat"));
  const lon = Number(get("lon"));
  const tz = get("tz");
  const name = get("name");
  const country = get("country");
  const countryCode = get("countryCode");
  const continent = get("continent") as City["continent"] | undefined;

  // countryCode may legitimately be "" for manual-coordinate entries with no
  // known ISO code. The UI shows a neutral fallback avatar in that case.
  if (!name || !country || countryCode === undefined || !tz || !continent || !Number.isFinite(lat) || !Number.isFinite(lon)) {
    return undefined;
  }

  return {
    slug,
    name,
    country,
    countryCode,
    admin: get("admin"),
    latitude: lat,
    longitude: lon,
    timezone: tz,
    continent,
    custom: true
  };
}
