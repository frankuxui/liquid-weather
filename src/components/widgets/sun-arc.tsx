import { formatHour } from "@/lib/utils";

/**
 * Sun path arc showing progress between sunrise and sunset, with the sun marker
 * positioned by the current time.
 */
export function SunArc({ sunrise, sunset }: { sunrise: string; sunset: string }) {
  const rise = new Date(sunrise).getTime();
  const set = new Date(sunset).getTime();
  const now = Date.now();
  const progress = Math.max(0, Math.min(1, (now - rise) / (set - rise)));

  // Position along a semicircle
  const angle = Math.PI * (1 - progress);
  const cx = 50 + Math.cos(angle) * 42;
  const cy = 54 - Math.sin(angle) * 42;

  return (
    <div>
      <svg viewBox="0 0 100 60" className="w-full">
        <path d="M8 54 A42 42 0 0 1 92 54" fill="none" stroke="hsl(0 0% 100% / 0.12)" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M8 54 A42 42 0 0 1 92 54" fill="none" stroke="url(#sunGrad)" strokeWidth="2.5" strokeDasharray={`${progress * 132} 132`} strokeLinecap="round" />
        <defs>
          <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(38 92% 60%)" />
            <stop offset="100%" stopColor="hsl(199 89% 62%)" />
          </linearGradient>
        </defs>
        {progress > 0 && progress < 1 && <circle cx={cx} cy={cy} r="5" fill="hsl(45 96% 60%)" className="drop-shadow-[0_0_6px_rgba(250,204,21,0.7)]" />}
      </svg>
      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
        <span>↑ {formatHour(sunrise)}</span>
        <span>↓ {formatHour(sunset)}</span>
      </div>
    </div>
  );
}
