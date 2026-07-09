"use client";

import { Check, Palette, X } from "lucide-react";
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useClick, useDismiss, useFloating, useInteractions, useRole } from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { COLOR_THEMES, useThemeStore } from "@/store/theme-store";
import { cn } from "@/lib/utils";

export function ThemeSelector() {
  const themeId = useThemeStore((s) => s.themeId);
  const setTheme = useThemeStore((s) => s.setTheme);
  const open = useThemeStore((s) => s.pickerOpen);
  const setOpen = useThemeStore((s) => s.setPickerOpen);

  const { refs, context } = useFloating({ open, onOpenChange: setOpen });

  const click = useClick(context);
  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Elegir tema de color"
        {...getReferenceProps()}
      >
        <Palette size={20} className="text-foreground/80" />
      </button>

      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <FloatingOverlay lockScroll className="z-50 grid place-items-center p-4">
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onClick={close}
              />

              <FloatingFocusManager context={context}>
                <motion.div
                  ref={refs.setFloating}
                  aria-label="Tema de color"
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 16 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  className="glass-strong relative flex w-full max-w-sm flex-col gap-5 overflow-hidden rounded-3xl p-6"
                  {...getFloatingProps()}
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Tema de color</h2>
                    <button type="button" onClick={close} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="Cerrar">
                      <X size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {COLOR_THEMES.map((theme) => {
                      const active = theme.id === themeId;
                      return (
                        <button
                          key={theme.id}
                          type="button"
                          onClick={() => setTheme(theme.id)}
                          aria-pressed={active}
                          className={cn(
                            "glass glass-hover flex flex-col items-center gap-2 rounded-2xl p-3 transition-colors",
                            active ? "border-white/30" : "border-transparent"
                          )}
                        >
                          <span className="relative grid h-10 w-10 place-items-center rounded-full shadow-glass-sm" style={{ background: `hsl(${theme.primary})` }}>
                            {active && <Check size={16} className="text-primary-foreground" />}
                          </span>
                          <span className="text-xs font-medium text-foreground/80">{theme.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}
