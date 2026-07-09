import { CityHeader } from "./city-header";
import { HourlyForecast } from "./hourly-forecast";
import { DailyForecast } from "./daily-forecast";
import { ChartsSection } from "./charts-section";
import { WidgetBoard } from "@/components/widgets/widget-board";
import type { CityWeather } from "@/lib/types";

/**
 * Full weather dashboard for a single city. Server-rendered wrapper that lays
 * out the header, draggable widget board, charts and forecasts. Interactive
 * pieces (board, charts) are their own client components.
 */
export function CityDetail({ weather }: { weather: CityWeather }) {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-10 py-8">
      <div className="animate-fade-in">
        <CityHeader weather={weather} />
      </div>

      <div className="animate-fade-in -mx-10" style={{ animationDelay: "80ms" }}>
        <HourlyForecast hourly={weather.hourly} />
      </div>

      <div className="animate-fade-in" style={{ animationDelay: "120ms" }}>
        <WidgetBoard weather={weather} />
      </div>

      <div className="animate-fade-in" style={{ animationDelay: "160ms" }}>
        <ChartsSection weather={weather} />
      </div>

      <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <DailyForecast daily={weather.daily} />
      </div>
    </div>
  );
}
