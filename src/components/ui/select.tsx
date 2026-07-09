"use client";

import * as React from "react";
import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead
} from "@floating-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface SelectProps<T extends string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  icon?: React.ReactNode;
  className?: string;
  menuClassName?: string;
}

/**
 * Accessible, floating-ui powered replacement for a native <select>.
 * Keeps the Liquid Glass visual language and works as a drop-in for any
 * "pick one of N options" control across the app.
 */
export function Select<T extends string>({ options, value, onChange, label, icon, className, menuClassName }: SelectProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value)
  );

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        padding: 8,
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxHeight: `${Math.min(availableHeight, 320)}px`
          });
        }
      })
    ]
  });

  const listRef = React.useRef<Array<HTMLElement | null>>([]);
  const labelsRef = React.useRef<Array<string | null>>(options.map((o) => o.label));
  labelsRef.current = options.map((o) => o.label);

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "listbox" });
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    selectedIndex,
    onNavigate: setActiveIndex,
    loop: true
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: open ? setActiveIndex : undefined
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([click, dismiss, role, listNav, typeahead]);

  const selected = options[selectedIndex];

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        aria-label={label}
        className={cn(
          "flex h-11 cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-sm outline-none transition-colors hover:bg-white/8 focus-visible:border-primary/50",
          className
        )}
        {...getReferenceProps()}
      >
        {icon}
        <span className="truncate">{selected?.label}</span>
        <ChevronDown size={15} className={cn("shrink-0 text-muted-foreground transition-transform duration-300", open && "rotate-180")} />
      </button>

      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <FloatingFocusManager context={context} modal={false}>
              <div ref={refs.setFloating} style={floatingStyles} className={cn("glass-strong no-scrollbar z-50 overflow-auto rounded-2xl", menuClassName)} {...getFloatingProps()}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -6 }}
                  transition={{ duration: 0.16, ease: [0.2, 0.8, 0.2, 1] }}
                  className="p-1.5"
                >
                  {options.map((option, index) => {
                    const isSelected = option.value === value;
                    return (
                      <div
                        key={option.value}
                        ref={(node) => {
                          listRef.current[index] = node;
                        }}
                        role="option"
                        aria-selected={isSelected}
                        tabIndex={activeIndex === index ? 0 : -1}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm outline-none transition-colors",
                          activeIndex === index && "bg-white/10",
                          isSelected ? "text-primary" : "text-foreground/85"
                        )}
                        {...getItemProps({
                          onClick() {
                            onChange(option.value);
                            setOpen(false);
                          },
                          onKeyDown(event) {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              onChange(option.value);
                              setOpen(false);
                            }
                          }
                        })}
                      >
                        {option.icon}
                        <span className="flex-1 truncate">{option.label}</span>
                        {isSelected && <Check size={15} className="shrink-0" />}
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </FloatingFocusManager>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}
