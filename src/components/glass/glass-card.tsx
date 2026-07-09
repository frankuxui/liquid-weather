import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  strong?: boolean;
  hover?: boolean;
  as?: React.ElementType;
}

/**
 * The foundational Liquid Glass surface: translucent, blurred, with an inner
 * highlight and a soft depth shadow. Everything visual in the app is built on
 * top of this.
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(({ className, strong, hover, as: Comp = "div", children, ...props }, ref) => {
  return (
    <Comp ref={ref} className={cn("relative overflow-hidden rounded-xl glass", strong ? "glass-strong" : "shadow-glass", hover && "glass-hover", className)} {...props}>
      {/* specular sheen along the top edge */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
      {children}
    </Comp>
  );
});
GlassCard.displayName = "GlassCard";
