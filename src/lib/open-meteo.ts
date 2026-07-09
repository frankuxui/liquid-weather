import type { AirQuality, City, CityWeather, CitySummary, CurrentWeather, DailyForecast, HourlyForecast } from "./types";
import { getMoonInfo } from "./moon";

const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

/** Cache windows (seconds). Weather is time-sensitive but not real-time. */
const CURRENT_REVALIDATE = 600; // 10 min
const FORECAST_REVALIDATE = 1800; // 30 min

const CURRENT_FIELDS = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "is_day",
  "precipitation",
  "rain",
  "weather_code",
  "cloud_cover",
  "pressure_msl",
  "wind_speed_10m",
  "wind_direction_10m",
  "wind_gusts_10m"
];

const HOURLY_FIELDS = [
  "temperature_2m",
  "relative_humidity_2m",
  "apparent_temperature",
  "precipitation_probability",
  "precipitation",
  "weather_code",
  "wind_speed_10m",
  "wind_direction_10m",
  "cloud_cover",
  "uv_index",
  "visibility",
  "dew_point_2m",
  "is_day"
];

const DAILY_FIELDS = [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "sunrise",
  "sunset",
  "uv_index_max",
  "precipitation_sum",
  "precipitation_probability_max",
  "wind_speed_10m_max",
  "wind_gusts_10m_max",
  "wind_direction_10m_dominant",
  "daylight_duration"
];

interface OpenMeteoForecastResponse {
  current: Record<string, number>;
  hourly: Record<string, (number | string)[]>;
  daily: Record<string, (number | string)[]>;
  timezone?: string;
}

async function fetchJson<T>(url: string, revalidate: number): Promise<T> {
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) {
    throw new Error(`Open-Meteo respondió ${res.status}`);
  }
  return (await res.json()) as T;
}

function num(v: number | string | undefined): number {
  const n = typeof v === "string" ? parseFloat(v) : v;
  return Number.isFinite(n) ? (n as number) : 0;
}

/** Full detail bundle for one city. */
export async function fetchCityWeather(city: City): Promise<CityWeather> {
  const forecastUrl =
    `${FORECAST_URL}?latitude=${city.latitude}&longitude=${city.longitude}` +
    `&current=${CURRENT_FIELDS.join(",")}` +
    `&hourly=${HOURLY_FIELDS.join(",")}` +
    `&daily=${DAILY_FIELDS.join(",")}` +
    `&timezone=${encodeURIComponent(city.timezone)}&forecast_days=7`;

  const forecast = await fetchJson<OpenMeteoForecastResponse>(forecastUrl, FORECAST_REVALIDATE);

  const current = parseCurrent(forecast, city);
  const hourly = parseHourly(forecast);
  const daily = parseDaily(forecast);
  const airQuality = await fetchAirQuality(city).catch(() => null);
  const moon = getMoonInfo();

  return {
    city,
    current,
    hourly,
    daily,
    airQuality,
    moon,
    fetchedAt: new Date().toISOString()
  };
}

/** Lightweight summary for the dashboard grid. */
export async function fetchCitySummary(city: City): Promise<CitySummary> {
  const url =
    `${FORECAST_URL}?latitude=${city.latitude}&longitude=${city.longitude}` +
    `&current=${CURRENT_FIELDS.join(",")}` +
    `&daily=temperature_2m_max,temperature_2m_min` +
    `&timezone=${encodeURIComponent(city.timezone)}&forecast_days=1`;

  const data = await fetchJson<OpenMeteoForecastResponse>(url, CURRENT_REVALIDATE);
  const current = parseCurrent(data, city);
  return {
    city,
    current,
    tempMax: Math.round(num(data.daily?.temperature_2m_max?.[0])),
    tempMin: Math.round(num(data.daily?.temperature_2m_min?.[0]))
  };
}

/** Fetch summaries for many cities, resilient to individual failures. */
export async function fetchCitySummaries(cities: City[]): Promise<CitySummary[]> {
  const settled = await Promise.allSettled(cities.map((c) => fetchCitySummary(c)));
  return settled.filter((r): r is PromiseFulfilledResult<CitySummary> => r.status === "fulfilled").map((r) => r.value);
}

/** Resolve "auto" (or any zone) to the real IANA timezone name for a coordinate pair. */
export async function resolveTimezone(latitude: number, longitude: number): Promise<string> {
  const url = `${FORECAST_URL}?latitude=${latitude}&longitude=${longitude}` + `&current=temperature_2m&timezone=auto&forecast_days=1`;
  const data = await fetchJson<OpenMeteoForecastResponse>(url, FORECAST_REVALIDATE);
  return data.timezone ?? "UTC";
}

async function fetchAirQuality(city: City): Promise<AirQuality> {
  const url =
    `${AIR_QUALITY_URL}?latitude=${city.latitude}&longitude=${city.longitude}` +
    `&current=us_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone` +
    `&timezone=${encodeURIComponent(city.timezone)}`;
  const data = await fetchJson<{ current: Record<string, number | string> }>(url, FORECAST_REVALIDATE);
  const c = data.current;
  return {
    time: String(c.time ?? new Date().toISOString()),
    usAqi: Math.round(num(c.us_aqi)),
    pm10: num(c.pm10),
    pm25: num(c.pm2_5),
    carbonMonoxide: num(c.carbon_monoxide),
    nitrogenDioxide: num(c.nitrogen_dioxide),
    sulphurDioxide: num(c.sulphur_dioxide),
    ozone: num(c.ozone)
  };
}

function parseCurrent(res: OpenMeteoForecastResponse, _city: City): CurrentWeather {
  const c = res.current ?? {};
  // Visibility / UV / dew point live in hourly — pick the nearest hour.
  const idx = nearestHourIndex(res);
  const hourlyVal = (key: string) => num(res.hourly?.[key]?.[idx]);
  return {
    time: String((c as Record<string, unknown>).time ?? new Date().toISOString()),
    temperature: num(c.temperature_2m),
    apparentTemperature: num(c.apparent_temperature),
    humidity: num(c.relative_humidity_2m),
    precipitation: num(c.precipitation),
    rain: num(c.rain),
    weatherCode: num(c.weather_code),
    cloudCover: num(c.cloud_cover),
    pressure: num(c.pressure_msl),
    windSpeed: num(c.wind_speed_10m),
    windDirection: num(c.wind_direction_10m),
    windGusts: num(c.wind_gusts_10m),
    isDay: num(c.is_day) === 1,
    uvIndex: hourlyVal("uv_index"),
    visibility: hourlyVal("visibility"),
    dewPoint: hourlyVal("dew_point_2m")
  };
}

function nearestHourIndex(res: OpenMeteoForecastResponse): number {
  const times = (res.hourly?.time ?? []) as string[];
  if (times.length === 0) return 0;
  const now = Date.now();
  let best = 0;
  let bestDiff = Infinity;
  for (let i = 0; i < times.length; i++) {
    const diff = Math.abs(new Date(times[i]).getTime() - now);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = i;
    }
  }
  return best;
}

function parseHourly(res: OpenMeteoForecastResponse): HourlyForecast[] {
  const h = res.hourly ?? {};
  const times = (h.time ?? []) as string[];
  const start = nearestHourIndex(res);
  const end = Math.min(times.length, start + 24);
  const out: HourlyForecast[] = [];
  for (let i = start; i < end; i++) {
    out.push({
      time: String(times[i]),
      temperature: num(h.temperature_2m?.[i]),
      apparentTemperature: num(h.apparent_temperature?.[i]),
      humidity: num(h.relative_humidity_2m?.[i]),
      precipitationProbability: num(h.precipitation_probability?.[i]),
      precipitation: num(h.precipitation?.[i]),
      weatherCode: num(h.weather_code?.[i]),
      windSpeed: num(h.wind_speed_10m?.[i]),
      windDirection: num(h.wind_direction_10m?.[i]),
      cloudCover: num(h.cloud_cover?.[i]),
      uvIndex: num(h.uv_index?.[i]),
      isDay: num(h.is_day?.[i]) === 1
    });
  }
  return out;
}

function parseDaily(res: OpenMeteoForecastResponse): DailyForecast[] {
  const d = res.daily ?? {};
  const dates = (d.time ?? []) as string[];
  return dates.map((date, i) => ({
    date: String(date),
    weatherCode: num(d.weather_code?.[i]),
    tempMax: num(d.temperature_2m_max?.[i]),
    tempMin: num(d.temperature_2m_min?.[i]),
    sunrise: String(d.sunrise?.[i] ?? ""),
    sunset: String(d.sunset?.[i] ?? ""),
    uvIndexMax: num(d.uv_index_max?.[i]),
    precipitationSum: num(d.precipitation_sum?.[i]),
    precipitationProbabilityMax: num(d.precipitation_probability_max?.[i]),
    windSpeedMax: num(d.wind_speed_10m_max?.[i]),
    windGustsMax: num(d.wind_gusts_10m_max?.[i]),
    windDirectionDominant: num(d.wind_direction_10m_dominant?.[i]),
    daylightSeconds: num(d.daylight_duration?.[i])
  }));
}
