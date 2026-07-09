export interface City {
  slug: string;
  name: string;
  country: string;
  countryCode: string;
  admin?: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  rain: number;
  weatherCode: number;
  cloudCover: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  isDay: boolean;
  uvIndex: number;
  visibility: number;
  dewPoint: number;
}

export interface DailyForecast {
  date: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  windSpeedMax: number;
  windGustsMax: number;
  windDirectionDominant: number;
  daylightSeconds: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  cloudCover: number;
  uvIndex: number;
  isDay: boolean;
}

export interface AirQuality {
  time: string;
  usAqi: number;
  pm10: number;
  pm25: number;
  carbonMonoxide: number;
  nitrogenDioxide: number;
  sulphurDioxide: number;
  ozone: number;
}

export interface MoonInfo {
  phase: number; // 0..1
  phaseName: string;
  illumination: number; // 0..100 %
  emoji: string;
}

/** Full weather bundle for the detail page. */
export interface CityWeather {
  city: City;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  airQuality: AirQuality | null;
  moon: MoonInfo;
  fetchedAt: string;
}

/** Lightweight summary used on the cities dashboard. */
export interface CitySummary {
  city: City;
  current: CurrentWeather;
  tempMax: number;
  tempMin: number;
}

export interface WeatherResult<T> {
  data: T | null;
  error: string | null;
}
