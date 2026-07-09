import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "primary" | "success";
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  const tones = {
    neutral: "bg-white/10 text-foreground/90 border-white/15",
    primary: "bg-primary/20 text-primary border-primary/30",
    success: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-md",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
