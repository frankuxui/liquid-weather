import * as React from "react";

/**
 * Minimal `asChild` Slot: merges the given props/ref onto its single child
 * element instead of rendering a wrapper. Enough for our `<Button asChild>`
 * around `<Link>` use-cases without pulling in @radix-ui/react-slot.
 */
export const Slot = React.forwardRef<HTMLElement, { children?: React.ReactNode } & Record<string, unknown>>(({ children, ...props }, ref) => {
  if (!React.isValidElement(children)) {
    return null;
  }
  const child = children as React.ReactElement<Record<string, unknown>>;
  return React.cloneElement(child, {
    ...props,
    ...child.props,
    className: [(props as { className?: string }).className, (child.props as { className?: string }).className].filter(Boolean).join(" "),
    ref
  });
});
Slot.displayName = "Slot";
