import { Search } from "lucide-react";
import { Close } from "@/components/ui";
import type React from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onValueChange: (_value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  visibleIconSearch?: boolean;
};

export function SearchInput({ value, onValueChange, onClear, placeholder = "Buscar...", className, inputClassName, visibleIconSearch = false }: Props) {
  return (
    <div className={cn("relative", className)}>
      {visibleIconSearch && (
        <div className="absolute top-0 left-2 flex h-full items-center justify-start pl-3">
          <Search size={16} className="text-muted-foreground" />
        </div>
      )}
      <input
        placeholder={placeholder}
        className={
          inputClassName ??
          "h-11 w-full rounded-full border border-white/10 bg-white/5 pl-11 text-sm outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary/50 focus:bg-white/8 pr-10"
        }
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onValueChange(event.target.value);
        }}
      />
      <div className="absolute top-0 right-0 flex h-full items-center justify-end gap-1 pr-2">
        {value ? (
          <Close
            className="size-8"
            onClick={() => {
              onClear?.();
            }}
          />
        ) : null}
      </div>
    </div>
  );
}
