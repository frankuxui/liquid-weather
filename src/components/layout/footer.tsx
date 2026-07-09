import Link from "next/link";
import { CloudSun, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 px-4 pb-10">
      <div className="glass mx-auto flex max-w-6xl flex-col items-center gap-4 rounded-[var(--radius)] px-6 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <CloudSun size={18} />
          </span>
          <div>
            <p className="text-gradient font-semibold">Liquid Weather</p>
            <p className="text-xs text-muted-foreground">
              Datos por Open-Meteo · Diseño Liquid Glass
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link href="/cities" className="hover:text-foreground">
            Ciudades
          </Link>
          <a
            href="https://open-meteo.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            API
          </a>
          <a
            href="https://github.com/frankuxui/liquid-weather"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground"
          >
            <Github size={15} /> GitHub
          </a>
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground/70">
        © {new Date().getFullYear()} Liquid Weather · Hecho con Next.js, Tailwind
        CSS y Recharts
      </p>
    </footer>
  );
}
