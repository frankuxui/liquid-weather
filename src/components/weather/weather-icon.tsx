import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudOff, CloudRain, CloudRainWind, CloudSnow, CloudSun, Moon, Sun, type LucideIcon } from "lucide-react";
import { describeWeather } from "@/lib/weather-codes";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  Sun,
  Moon,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudLightning,
  CloudOff
};

/**
 * Custom PNG icon set (public/icons). Only covers a subset of conditions today —
 * anything not listed here falls back to the lucide-react outline icon above.
 */
const PNG_ICONS: Record<string, string> = {
  Sun: "/icons/icon-sun.png",
  CloudSun: "/icons/icon-cloud-sun.png",
  Cloud: "/icons/icon-cloud.png",
  Moon: "/icons/icon-moon.png",
  CloudRain: "/icons/icon-rain.png",
  CloudDrizzle: "/icons/icon-cloud-drizzle.png",
  CloudLightning: "/icons/icon-thunderstorm.png"
};

export function WeatherIcon({ code, isDay = true, className }: { code: number; isDay?: boolean; className?: string }) {
  const { icon, group } = describeWeather(code);
  let name = icon;
  // Swap the clear-sky sun for a moon at night.
  if (!isDay && group === "clear") name = "Moon";

  const png = PNG_ICONS[name];
  if (png) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={png} alt="" className={cn("shrink-0 object-contain", className)} aria-hidden />
    );
  }

  const Icon = ICONS[name] ?? Cloud;
  return <Icon className={cn("shrink-0", className)} strokeWidth={1.5} aria-hidden />;
}
