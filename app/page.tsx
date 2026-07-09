import Link from "next/link";
import { ArrowRight, LayoutGrid, LineChart, Heart, Move, Gauge, Sparkles, MapPin, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/glass/glass-card";
import { HeroPreview } from "@/components/landing/hero-preview";
import { CITIES } from "@/lib/cities";

const FEATURES = [
  {
    icon: Gauge,
    title: "Datos en tiempo real",
    description: "Temperatura, humedad, viento, presión, índice UV, calidad del aire y mucho más, actualizado al instante."
  },
  {
    icon: LineChart,
    title: "Gráficas interactivas",
    description: "Visualiza la evolución de la temperatura, la lluvia y el viento con gráficas elegantes construidas con Recharts."
  },
  {
    icon: Move,
    title: "Widgets reorganizables",
    description: "Arrastra y coloca cada widget donde prefieras. Tu disposición se guarda automáticamente en el navegador."
  },
  {
    icon: Heart,
    title: "Ciudades favoritas",
    description: "Marca tus ciudades favoritas y accede a ellas al instante desde cualquier parte de la aplicación."
  },
  {
    icon: LayoutGrid,
    title: "Filtros combinables",
    description: "Ordena y filtra por temperatura, humedad, viento, condición o favoritas. Los resultados se actualizan al momento."
  },
  {
    icon: Sparkles,
    title: "Diseño Liquid Glass",
    description: "Una interfaz premium con transparencias, blur y profundidad inspirada en las últimas versiones de iOS."
  }
];

const HIGHLIGHTS = [
  { icon: Zap, label: "Rendimiento", value: "Server Components" },
  { icon: ShieldCheck, label: "Sin API key", value: "Open-Meteo gratis" },
  { icon: MapPin, label: "Ciudades", value: `${CITIES.length}+ disponibles` }
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-10">
      {/* Hero */}
      <section className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div className="animate-fade-in">
          <Badge tone="primary" className="mb-5">
            <Sparkles size={13} /> El tiempo, reinventado
          </Badge>
          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            El tiempo con estilo <span className="text-gradient">Liquid Glass</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Un dashboard meteorológico profesional con pronósticos en tiempo real, gráficas interactivas y widgets que reorganizas a tu gusto. Rápido, elegante y siempre actualizado.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/cities">
                Consultar el tiempo <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="#features">Descubre más</Link>
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-6">
            {HIGHLIGHTS.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2.5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white/8">
                  <Icon size={18} className="text-primary" />
                </span>
                <div className="leading-tight">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-sm font-medium">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-in-scale">
          <HeroPreview />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4">Funcionalidades</Badge>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">Todo lo que necesitas para seguir el clima</h2>
          <p className="mt-4 text-muted-foreground">Diseñado como un producto premium: cada detalle cuida el rendimiento, la accesibilidad y la experiencia de usuario.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, i) => (
            <GlassCard key={title} hover className="animate-fade-in p-6" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br from-primary/25 to-accent/25">
                <Icon size={22} className="text-primary" />
              </span>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <GlassCard strong className="overflow-hidden p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <Badge tone="primary" className="mb-4">
                Cómo funciona
              </Badge>
              <h2 className="text-3xl font-semibold tracking-tight">De un vistazo o al detalle</h2>
              <ol className="mt-6 space-y-5">
                {[
                  {
                    step: "01",
                    title: "Explora las ciudades",
                    text: "Un dashboard con tarjetas resumidas y filtros combinables para encontrar justo lo que buscas."
                  },
                  {
                    step: "02",
                    title: "Entra al detalle",
                    text: "Cada ciudad abre un panel completo con decenas de métricas, pronósticos horarios y de varios días."
                  },
                  {
                    step: "03",
                    title: "Personaliza tu panel",
                    text: "Reorganiza los widgets arrastrándolos y guarda tus ciudades favoritas para acceder al instante."
                  }
                ].map(({ step, title, text }) => (
                  <li key={step} className="flex gap-4">
                    <span className="text-gradient text-2xl font-bold">{step}</span>
                    <div>
                      <h3 className="font-semibold">{title}</h3>
                      <p className="text-sm text-muted-foreground">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Métricas por ciudad", value: "20+" },
                { label: "Pronóstico horario", value: "24h" },
                { label: "Pronóstico extendido", value: "7 días" },
                { label: "Coste de la API", value: "0 €" }
              ].map(({ label, value }) => (
                <GlassCard key={label} className="p-6 text-center">
                  <p className="text-gradient text-4xl font-bold tracking-tight">{value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{label}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>

      {/* CTA */}
      <section className="py-16">
        <GlassCard strong className="relative overflow-hidden px-8 py-16 text-center">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
          <h2 className="mx-auto max-w-xl text-balance text-3xl font-semibold tracking-tight md:text-4xl">¿Listo para ver el tiempo como nunca antes?</h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">Empieza ahora, sin registros ni claves de API. Solo tú y el clima, con un diseño que enamora.</p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/cities">
              Consultar el tiempo <ArrowRight size={18} />
            </Link>
          </Button>
        </GlassCard>
      </section>
    </div>
  );
}
