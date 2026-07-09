import { Droplets, Wind, Thermometer, Sunrise } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { WeatherIcon } from "@/components/weather/weather-icon";

/**
 * Decorative, static "glass" weather card shown in the hero to showcase the
 * Liquid Glass aesthetic. Purely presentational (server component).
 */
export function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-6 -z-10 animate-float rounded-[3rem] bg-linear-to-br from-primary/30 to-accent/30 blur-3xl" />

      <GlassCard strong className="p-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Ahora en</p>
            <h3 className="text-2xl font-semibold">Barcelona</h3>
            <p className="text-sm text-muted-foreground">Parcialmente nublado</p>
          </div>
          <WeatherIcon code={2} className="h-16 w-16 text-primary" />
        </div>

        <div className="my-6 flex items-end gap-2">
          <span className="text-7xl font-light leading-none tracking-tighter">24°</span>
          <span className="mb-2 text-sm text-muted-foreground">Sensación 26°</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: Droplets, label: "Humedad", value: "62%" },
            { icon: Wind, label: "Viento", value: "12 km/h" },
            { icon: Thermometer, label: "Presión", value: "1014 hPa" },
            { icon: Sunrise, label: "Amanecer", value: "07:14" }
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5 rounded-2xl bg-white/5 px-3 py-2.5">
              <Icon size={18} className="text-primary" />
              <div className="leading-tight">
                <p className="text-[11px] text-muted-foreground">{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
