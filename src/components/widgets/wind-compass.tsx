import { windDirectionLabel } from "@/lib/weather-codes";

/** Small SVG compass that points to the wind direction. */
export function WindCompass({ direction }: { direction: number }) {
  return (
    <div className="relative mx-auto grid h-24 w-24 place-items-center">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-0">
        <circle cx="50" cy="50" r="46" fill="none" stroke="hsl(0 0% 100% / 0.1)" strokeWidth="1.5" />
        {["N", "E", "S", "O"].map((dir, i) => {
          const angle = (i * 90 - 90) * (Math.PI / 180);
          const x = 50 + Math.cos(angle) * 38;
          const y = 50 + Math.sin(angle) * 38;
          return (
            <text key={dir} x={x} y={y + 3} textAnchor="middle" className="fill-muted-foreground" fontSize="9">
              {dir}
            </text>
          );
        })}
        <g transform={`rotate(${direction} 50 50)`} className="transition-transform duration-700">
          <path d="M50 18 L44 52 L50 46 L56 52 Z" fill="hsl(199 89% 62%)" />
          <path d="M50 82 L44 48 L50 54 L56 48 Z" fill="hsl(215 20% 55%)" />
        </g>
        <circle cx="50" cy="50" r="3" fill="hsl(210 40% 98%)" />
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <span className="mt-8 rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm">{windDirectionLabel(direction)}</span>
      </div>
    </div>
  );
}
