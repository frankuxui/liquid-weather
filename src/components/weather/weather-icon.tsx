import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudOff,
  CloudRain,
  CloudRainWind,
  CloudSnow,
  CloudSun,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";
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
  CloudOff,
};

export function WeatherIcon({
  code,
  isDay = true,
  className,
}: {
  code: number;
  isDay?: boolean;
  className?: string;
}) {
  const { icon, group } = describeWeather(code);
  let name = icon;
  // Swap the clear-sky sun for a moon at night.
  if (!isDay && group === "clear") name = "Moon";
  const Icon = ICONS[name] ?? Cloud;
  return <Icon className={cn("shrink-0", className)} strokeWidth={1.75} aria-hidden />;
}
