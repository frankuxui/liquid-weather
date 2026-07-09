/**
 * WMO weather interpretation codes used by Open-Meteo.
 * https://open-meteo.com/en/docs
 */

export interface WeatherDescriptor {
  label: string;
  /** lucide-react icon name */
  icon: string;
  /** short group used for gradients / theming */
  group: "clear" | "clouds" | "fog" | "drizzle" | "rain" | "snow" | "thunder";
}

const CODES: Record<number, WeatherDescriptor> = {
  0: { label: "Despejado", icon: "Sun", group: "clear" },
  1: { label: "Mayormente despejado", icon: "Sun", group: "clear" },
  2: { label: "Parcialmente nublado", icon: "CloudSun", group: "clouds" },
  3: { label: "Nublado", icon: "Cloud", group: "clouds" },
  45: { label: "Niebla", icon: "CloudFog", group: "fog" },
  48: { label: "Niebla con escarcha", icon: "CloudFog", group: "fog" },
  51: { label: "Llovizna ligera", icon: "CloudDrizzle", group: "drizzle" },
  53: { label: "Llovizna moderada", icon: "CloudDrizzle", group: "drizzle" },
  55: { label: "Llovizna intensa", icon: "CloudDrizzle", group: "drizzle" },
  56: { label: "Llovizna helada ligera", icon: "CloudDrizzle", group: "drizzle" },
  57: { label: "Llovizna helada intensa", icon: "CloudDrizzle", group: "drizzle" },
  61: { label: "Lluvia ligera", icon: "CloudRain", group: "rain" },
  63: { label: "Lluvia moderada", icon: "CloudRain", group: "rain" },
  65: { label: "Lluvia intensa", icon: "CloudRainWind", group: "rain" },
  66: { label: "Lluvia helada ligera", icon: "CloudRain", group: "rain" },
  67: { label: "Lluvia helada intensa", icon: "CloudRainWind", group: "rain" },
  71: { label: "Nevada ligera", icon: "CloudSnow", group: "snow" },
  73: { label: "Nevada moderada", icon: "CloudSnow", group: "snow" },
  75: { label: "Nevada intensa", icon: "CloudSnow", group: "snow" },
  77: { label: "Granos de nieve", icon: "CloudSnow", group: "snow" },
  80: { label: "Chubascos ligeros", icon: "CloudRain", group: "rain" },
  81: { label: "Chubascos moderados", icon: "CloudRain", group: "rain" },
  82: { label: "Chubascos violentos", icon: "CloudRainWind", group: "rain" },
  85: { label: "Chubascos de nieve ligeros", icon: "CloudSnow", group: "snow" },
  86: { label: "Chubascos de nieve intensos", icon: "CloudSnow", group: "snow" },
  95: { label: "Tormenta", icon: "CloudLightning", group: "thunder" },
  96: { label: "Tormenta con granizo ligero", icon: "CloudLightning", group: "thunder" },
  99: { label: "Tormenta con granizo intenso", icon: "CloudLightning", group: "thunder" }
};

const UNKNOWN: WeatherDescriptor = {
  label: "Desconocido",
  icon: "CloudOff",
  group: "clouds"
};

export function describeWeather(code: number): WeatherDescriptor {
  return CODES[code] ?? UNKNOWN;
}

/** Background gradient tuned to the condition + day/night. */
export function weatherGradient(code: number, isDay: boolean): string {
  const { group } = describeWeather(code);
  if (!isDay) {
    return "linear-gradient(135deg, hsl(222 47% 14%), hsl(250 40% 20%))";
  }
  switch (group) {
    case "clear":
      return "linear-gradient(135deg, hsl(205 90% 55%), hsl(199 95% 65%))";
    case "clouds":
      return "linear-gradient(135deg, hsl(210 30% 45%), hsl(215 25% 60%))";
    case "fog":
      return "linear-gradient(135deg, hsl(210 15% 55%), hsl(210 12% 68%))";
    case "drizzle":
    case "rain":
      return "linear-gradient(135deg, hsl(215 45% 40%), hsl(210 40% 52%))";
    case "snow":
      return "linear-gradient(135deg, hsl(205 30% 70%), hsl(210 25% 82%))";
    case "thunder":
      return "linear-gradient(135deg, hsl(250 35% 30%), hsl(260 40% 42%))";
    default:
      return "linear-gradient(135deg, hsl(210 30% 45%), hsl(215 25% 60%))";
  }
}

/** Compass label from wind direction degrees. */
export function windDirectionLabel(deg: number): string {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
  return dirs[Math.round(deg / 22.5) % 16];
}

/** Qualitative UV band. */
export function uvBand(uv: number): { label: string; color: string } {
  if (uv < 3) return { label: "Bajo", color: "hsl(142 71% 45%)" };
  if (uv < 6) return { label: "Moderado", color: "hsl(48 96% 53%)" };
  if (uv < 8) return { label: "Alto", color: "hsl(25 95% 53%)" };
  if (uv < 11) return { label: "Muy alto", color: "hsl(0 84% 60%)" };
  return { label: "Extremo", color: "hsl(280 84% 60%)" };
}

/** US AQI band. */
export function aqiBand(aqi: number): { label: string; color: string } {
  if (aqi <= 50) return { label: "Buena", color: "hsl(142 71% 45%)" };
  if (aqi <= 100) return { label: "Moderada", color: "hsl(48 96% 53%)" };
  if (aqi <= 150) return { label: "Dañina (grupos sensibles)", color: "hsl(25 95% 53%)" };
  if (aqi <= 200) return { label: "Dañina", color: "hsl(0 84% 60%)" };
  if (aqi <= 300) return { label: "Muy dañina", color: "hsl(280 84% 60%)" };
  return { label: "Peligrosa", color: "hsl(340 82% 42%)" };
}
