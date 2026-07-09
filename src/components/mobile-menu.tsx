"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { animate, AnimatePresence, motion, useMotionValue, useReducedMotion } from "motion/react";
import { useMobileMenuStore } from "@/store/mobile-menu";
import { cn } from "@/lib/utils";
import { Close } from "./ui";

type MobileMenuProps = {
  items: ReadonlyArray<{ href: string; label: string }>;
};

function getViewportHeight() {
  return Math.round(window.visualViewport?.height ?? window.innerHeight);
}

export function MobileMenu({ items }: MobileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();
  const open = useMobileMenuStore((state) => state.open);
  const close = useMobileMenuStore((state) => state.close);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const panelY = useMotionValue(0);
  const openingAnimationRef = useRef<{ stop: () => void } | null>(null);
  const dragStateRef = useRef<{ pointerId: number; pointerY: number; panelY: number } | null>(null);
  const closingRef = useRef(false);
  const closeAnimationRef = useRef<(_targetHref?: string) => Promise<void>>(async () => undefined);
  const previousPathnameRef = useRef(pathname);

  useLayoutEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(getViewportHeight());
    };

    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    window.visualViewport?.addEventListener("resize", updateViewportHeight);

    return () => {
      window.removeEventListener("resize", updateViewportHeight);
      window.visualViewport?.removeEventListener("resize", updateViewportHeight);
    };
  }, []);

  useLayoutEffect(() => {
    if (!open || viewportHeight === 0) return;

    openingAnimationRef.current?.stop();
    panelY.set(viewportHeight);

    if (shouldReduceMotion) {
      panelY.set(viewportHeight / 2);
      return;
    }

    const controls = animate(panelY, viewportHeight / 2, {
      type: "spring",
      stiffness: 360,
      damping: 28,
      mass: 0.9
    });
    openingAnimationRef.current = controls;

    return () => controls.stop();
  }, [open, panelY, shouldReduceMotion, viewportHeight]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") void closeAnimationRef.current();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (previousPathnameRef.current === pathname) return;

    previousPathnameRef.current = pathname;
    if (open) void closeAnimationRef.current();
  }, [open, pathname]);

  const handleClose = useCallback(
    async (targetHref?: string) => {
      if (closingRef.current) return;

      closingRef.current = true;
      setIsClosing(true);
      openingAnimationRef.current?.stop();
      dragStateRef.current = null;

      if (!shouldReduceMotion && viewportHeight > 0) {
        await animate(panelY, viewportHeight, {
          type: "spring",
          stiffness: 360,
          damping: 32,
          mass: 0.9
        });
      }

      close();
      closingRef.current = false;
      setIsClosing(false);

      if (targetHref) router.push(targetHref);
      window.setTimeout(() => document.querySelector<HTMLButtonElement>('[data-toggle="drawer-menu"]')?.focus(), 0);
    },
    [close, panelY, router, shouldReduceMotion, viewportHeight]
  );

  useEffect(() => {
    closeAnimationRef.current = handleClose;
  }, [handleClose]);

  const handleDragStart = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (shouldReduceMotion || viewportHeight === 0 || isClosing) return;

    openingAnimationRef.current?.stop();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStateRef.current = {
      pointerId: event.pointerId,
      pointerY: event.clientY,
      panelY: panelY.get()
    };
  };

  const handleDragMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) return;

    const nextPosition = dragState.panelY + event.clientY - dragState.pointerY;
    panelY.set(Math.min(viewportHeight / 2, Math.max(0, nextPosition)));
  };

  const handleDragEnd = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragStateRef.current?.pointerId !== event.pointerId) return;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = null;
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.24 }}
          role="presentation"
        >
          <motion.button
            className="absolute inset-0 h-full w-full bg-black/45 backdrop-blur-xs"
            type="button"
            aria-label="Cerrar menu"
            animate={{ opacity: isClosing ? 0 : 1 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.32 }}
          />

          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Menu principal"
            className="absolute inset-x-0 bottom-0 flex flex-col rounded-t-4xl border-t border-border bg-background px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-2xl will-change-transform"
            initial={false}
            style={{ height: viewportHeight || "100dvh", y: panelY }}
          >
            <button
              type="button"
              data-testid="drag-handle"
              aria-label="Redimensionar menu"
              className="mx-auto flex w-full touch-none cursor-ns-resize select-none items-center justify-center py-6"
              onPointerDown={handleDragStart}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
            >
              <span className="h-1.5 w-12 rounded-full bg-foreground/15" aria-hidden="true" />
            </button>

            <div className="flex items-center justify-between px-5">
              <p className="text-sm font-medium text-foreground/60">Navegacion</p>
              <Close
                ref={closeButtonRef}
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full bg-foreground/5 text-2xl leading-none transition-colors hover:bg-foreground/10"
                aria-label="Cerrar menu"
                onClick={() => void handleClose()}
              />
            </div>

            <nav className="mt-3 flex-1 overflow-y-auto" aria-label="Navegacion movil">
              <ul className="grid gap-1">
                {items.map((item) => {
                  const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={() => void handleClose(item.href)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex w-full items-center rounded-2xl px-5 py-3.5 text-left text-base font-medium transition-colors",
                          active ? "bg-white/12 text-foreground" : "text-foreground/70 hover:bg-white/8 hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
