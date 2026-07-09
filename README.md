# 🌤️ Liquid Weather

Dashboard meteorológico profesional en tiempo real con una interfaz premium
inspirada en el lenguaje de diseño **iOS Liquid Glass**: transparencias, blur,
profundidad y una estética minimalista.

Construido con **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**,
**Zustand**, **Server Actions** y datos de la API gratuita **[Open-Meteo](https://open-meteo.com)**
(sin API key ni registro).

---

## ✨ Características

- **Landing moderna** con hero, funcionalidades y llamadas a la acción.
- **Dashboard de ciudades** con tarjetas resumidas y **filtros/ordenación combinables**:
  nombre, temperatura, humedad, viento, sensación térmica, condición y favoritas.
  Los resultados se actualizan al instante.
- **Detalle por ciudad** (ruta dinámica por *slug*) con un panel completo:
  temperatura, máx/mín, sensación, humedad, presión, viento y dirección, índice UV,
  probabilidad de lluvia, precipitaciones, visibilidad, nubosidad, punto de rocío,
  amanecer/atardecer, calidad del aire y fase lunar.
- **Widgets reorganizables** mediante **[Swapy](https://swapy.tahazsh.com/)**:
  arrástralos y colócalos a tu gusto. La disposición se **persiste en LocalStorage**
  por ciudad.
- **Gráficas interactivas** con **Recharts**: evolución horaria de temperatura,
  lluvia y viento, y comparativa de 7 días.
- **Favoritos** gestionados con **Zustand** (persistidos en LocalStorage) y accesibles
  desde un panel lateral en cualquier página.
- **Pronóstico horario (24 h)** y **extendido (7 días)**.
- Estados de **carga**, **vacío** y **error** cuidados. Responsive y accesible.

## 🧱 Arquitectura

Prioriza **Server Components** y **Server Actions**, usando componentes cliente solo
cuando son estrictamente necesarios (interactividad: filtros, Swapy, gráficas, favoritos).

```
src/
├── app/
│   ├── layout.tsx            # Layout raíz (navbar + footer + fuente)
│   ├── page.tsx              # Landing (Server Component)
│   ├── cities/               # Dashboard de ciudades
│   └── city/[slug]/          # Detalle dinámico + loading/error/not-found
├── components/
│   ├── glass/                # GlassCard (superficie Liquid Glass base)
│   ├── ui/                   # Primitivos estilo shadcn (button, badge, skeleton…)
│   ├── layout/               # Navbar, footer, panel de favoritos
│   ├── landing/              # Secciones de la landing
│   ├── cities/               # Tarjeta de ciudad + vista con filtros
│   ├── city/                 # Cabecera, pronósticos, sección de gráficas
│   ├── charts/               # Gráficas Recharts
│   └── widgets/              # Widgets métricos + tablero Swapy
├── lib/
│   ├── open-meteo.ts         # Fetchers tipados de la API (con caché)
│   ├── actions.ts            # Server Actions
│   ├── cities.ts             # Catálogo de ciudades + slugs
│   ├── weather-codes.ts      # Códigos WMO, gradientes, bandas UV/AQI
│   ├── moon.ts               # Cálculo de fase lunar
│   ├── types.ts              # Tipado estricto del dominio
│   └── utils.ts              # Helpers (cn, formato de fechas…)
└── store/                    # Zustand: favoritos y layout de widgets
```

## 🚀 Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:3000
```

Scripts disponibles:

| Script          | Descripción                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Servidor de desarrollo             |
| `npm run build` | Build de producción                |
| `npm start`     | Sirve el build de producción       |
| `npm run lint`  | Linter                             |

> **Nota de red:** las páginas de datos (`/cities` y `/city/[slug]`) se renderizan
> bajo demanda y consultan Open-Meteo en tiempo de petición. Necesitan salida a
> `api.open-meteo.com` y `air-quality-api.open-meteo.com`. En entornos con la salida
> restringida verás los estados de error/reintento; funcionan con normalidad al
> desplegar (p. ej. en Vercel).

## 🛠️ Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS · Zustand · Recharts · Swapy ·
lucide-react · Open-Meteo.

## 📄 Licencia

MIT.
