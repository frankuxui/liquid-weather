import { GripVertical } from "lucide-react";
import { GlassCard } from "@/components/glass/glass-card";
import { cn } from "@/lib/utils";

/**
 * Common frame for every draggable widget: glass surface, header with icon and
 * title, a subtle drag handle, and a content area.
 */
export function WidgetShell({
  title,
  icon,
  children,
  footer,
  accent,
  className
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <GlassCard hover className={cn("flex h-full flex-col p-5", className)}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="grid h-7 w-7 place-items-center rounded-lg" style={{ color: accent ?? "hsl(199 89% 62%)", background: "hsl(0 0% 100% / 0.06)" }}>
            {icon}
          </span>
          <span className="text-xs font-medium uppercase tracking-wide">{title}</span>
        </div>
        <GripVertical size={16} className="cursor-grab text-muted-foreground/40 transition-colors group-hover:text-muted-foreground/70" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col justify-center">{children}</div>
      {footer && <div className="mt-3 border-t border-white/10 pt-3 text-xs text-muted-foreground">{footer}</div>}
    </GlassCard>
  );
}

export function BigValue({ value, unit, sub }: { value: React.ReactNode; unit?: string; sub?: React.ReactNode }) {
  return (
    <div>
      <p className="flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight">{value}</span>
        {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
      </p>
      {sub && <p className="mt-1 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

/** Thin progress meter used across widgets. */
export function Meter({ value, max = 100, color = "hsl(199 89% 58%)" }: { value: number; max?: number; color?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/8">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}
