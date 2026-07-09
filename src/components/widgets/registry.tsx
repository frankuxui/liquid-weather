import { Thermometer, Droplets, Wind, Gauge, Sun, Eye, CloudRain, Cloud, Umbrella, Wind as WindIcon, ThermometerSun, Waves, Sunrise, Moon, Leaf, Navigation } from "lucide-react";
import { WidgetShell, BigValue, Meter } from "./widget-shell";
import { WindCompass } from "./wind-compass";
import { SunArc } from "./sun-arc";
import { windDirectionLabel, uvBand, aqiBand } from "@/lib/weather-codes";
import { formatDuration } from "@/lib/utils";
import type { CityWeather } from "@/lib/types";

export interface WidgetDef {
  id: string;
  render: (w: CityWeather) => React.ReactNode;
}

/**
 * The full catalogue of draggable metric widgets. Order here is the default
 * arrangement; the user's custom order is restored from LocalStorage.
 */
export const WIDGETS: WidgetDef[] = [
  {
    id: "feels-like",
    render: (w) => (
      <WidgetShell title="Sensación térmica" icon={<ThermometerSun size={16} />}>
        <BigValue value={`${Math.round(w.current.apparentTemperature)}°`} sub={`Real ${Math.round(w.current.temperature)}°`} />
      </WidgetShell>
    )
  },
  {
    id: "min-max",
    render: (w) => {
      const d = w.daily[0];
      return (
        <WidgetShell title="Máx / Mín" icon={<Thermometer size={16} />} accent="hsl(0 84% 66%)">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-rose-300">{Math.round(d.tempMax)}°</span>
            <span className="text-3xl font-semibold text-sky-300">{Math.round(d.tempMin)}°</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Máxima y mínima de hoy</p>
        </WidgetShell>
      );
    }
  },
  {
    id: "humidity",
    render: (w) => (
      <WidgetShell title="Humedad" icon={<Droplets size={16} />}>
        <BigValue value={`${Math.round(w.current.humidity)}`} unit="%" />
        <Meter value={w.current.humidity} />
      </WidgetShell>
    )
  },
  {
    id: "wind",
    render: (w) => (
      <WidgetShell title="Viento" icon={<Wind size={16} />} accent="hsl(160 84% 55%)" footer={`Rachas de ${Math.round(w.current.windGusts)} km/h`}>
        <BigValue value={`${Math.round(w.current.windSpeed)}`} unit="km/h" sub={`Dirección ${windDirectionLabel(w.current.windDirection)}`} />
      </WidgetShell>
    )
  },
  {
    id: "wind-direction",
    render: (w) => (
      <WidgetShell title="Dirección viento" icon={<Navigation size={16} />} accent="hsl(160 84% 55%)">
        <WindCompass direction={w.current.windDirection} />
      </WidgetShell>
    )
  },
  {
    id: "pressure",
    render: (w) => (
      <WidgetShell title="Presión" icon={<Gauge size={16} />} accent="hsl(48 96% 60%)">
        <BigValue value={`${Math.round(w.current.pressure)}`} unit="hPa" sub={w.current.pressure > 1013 ? "Presión alta" : w.current.pressure < 1009 ? "Presión baja" : "Presión normal"} />
      </WidgetShell>
    )
  },
  {
    id: "uv",
    render: (w) => {
      const band = uvBand(w.current.uvIndex);
      return (
        <WidgetShell title="Índice UV" icon={<Sun size={16} />} accent={band.color}>
          <BigValue value={Math.round(w.current.uvIndex)} sub={band.label} />
          <Meter value={w.current.uvIndex} max={11} color={band.color} />
        </WidgetShell>
      );
    }
  },
  {
    id: "visibility",
    render: (w) => (
      <WidgetShell title="Visibilidad" icon={<Eye size={16} />}>
        <BigValue value={`${(w.current.visibility / 1000).toFixed(1)}`} unit="km" sub={w.current.visibility >= 10000 ? "Excelente" : "Reducida"} />
      </WidgetShell>
    )
  },
  {
    id: "cloud-cover",
    render: (w) => (
      <WidgetShell title="Nubosidad" icon={<Cloud size={16} />} accent="hsl(215 20% 70%)">
        <BigValue value={`${Math.round(w.current.cloudCover)}`} unit="%" />
        <Meter value={w.current.cloudCover} color="hsl(215 20% 70%)" />
      </WidgetShell>
    )
  },
  {
    id: "precipitation",
    render: (w) => (
      <WidgetShell title="Precipitación" icon={<CloudRain size={16} />}>
        <BigValue value={w.current.precipitation.toFixed(1)} unit="mm" sub={`Lluvia ${w.current.rain.toFixed(1)} mm`} />
      </WidgetShell>
    )
  },
  {
    id: "rain-prob",
    render: (w) => {
      const prob = w.daily[0]?.precipitationProbabilityMax ?? 0;
      return (
        <WidgetShell title="Prob. de lluvia" icon={<Umbrella size={16} />}>
          <BigValue value={`${Math.round(prob)}`} unit="%" sub="Máxima de hoy" />
          <Meter value={prob} />
        </WidgetShell>
      );
    }
  },
  {
    id: "gusts",
    render: (w) => (
      <WidgetShell title="Rachas de viento" icon={<WindIcon size={16} />} accent="hsl(160 84% 55%)">
        <BigValue value={`${Math.round(w.current.windGusts)}`} unit="km/h" sub="Racha máxima actual" />
      </WidgetShell>
    )
  },
  {
    id: "dew-point",
    render: (w) => (
      <WidgetShell title="Punto de rocío" icon={<Waves size={16} />}>
        <BigValue value={`${Math.round(w.current.dewPoint)}°`} sub={w.current.dewPoint >= 20 ? "Ambiente bochornoso" : w.current.dewPoint >= 10 ? "Ambiente agradable" : "Ambiente seco"} />
      </WidgetShell>
    )
  },
  {
    id: "sun",
    render: (w) => {
      const d = w.daily[0];
      return (
        <WidgetShell title="Sol" icon={<Sunrise size={16} />} accent="hsl(38 92% 60%)" footer={`${formatDuration(d.daylightSeconds)} de luz`}>
          <SunArc sunrise={d.sunrise} sunset={d.sunset} now={w.fetchedAt} />
        </WidgetShell>
      );
    }
  },
  {
    id: "moon",
    render: (w) => (
      <WidgetShell title="Fase lunar" icon={<Moon size={16} />} accent="hsl(250 84% 72%)">
        <div className="flex items-center gap-4">
          <span className="text-5xl leading-none">{w.moon.emoji}</span>
          <div>
            <p className="font-semibold">{w.moon.phaseName}</p>
            <p className="text-xs text-muted-foreground">{w.moon.illumination}% iluminada</p>
          </div>
        </div>
      </WidgetShell>
    )
  },
  {
    id: "air-quality",
    render: (w) => {
      if (!w.airQuality) {
        return (
          <WidgetShell title="Calidad del aire" icon={<Leaf size={16} />} accent="hsl(142 71% 45%)">
            <p className="text-sm text-muted-foreground">Sin datos disponibles para esta ubicación.</p>
          </WidgetShell>
        );
      }
      const band = aqiBand(w.airQuality.usAqi);
      return (
        <WidgetShell title="Calidad del aire" icon={<Leaf size={16} />} accent={band.color} footer={`PM2.5 ${Math.round(w.airQuality.pm25)} · PM10 ${Math.round(w.airQuality.pm10)} µg/m³`}>
          <BigValue value={w.airQuality.usAqi} sub={band.label} />
          <Meter value={w.airQuality.usAqi} max={300} color={band.color} />
        </WidgetShell>
      );
    }
  }
];

export const WIDGET_MAP: Record<string, WidgetDef> = Object.fromEntries(WIDGETS.map((w) => [w.id, w]));
