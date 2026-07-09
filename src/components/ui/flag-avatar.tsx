import { Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";

type FlagAvatarProps = {
  countryCode?: string | null;
  label?: string;
  className?: string;
};

export function FlagAvatar({ countryCode, label, className }: FlagAvatarProps) {
  const code = countryCode?.trim().toLowerCase() ?? "";
  const validCode = /^[a-z]{2}$/.test(code);
  const title = label ?? (validCode ? `Bandera de ${code.toUpperCase()}` : "País sin bandera");

  if (validCode) {
    return <span role="img" aria-label={title} title={title} className={cn("fib fis inline-block size-8 shrink-0 overflow-hidden rounded-full bg-cover! bg-center", `fi-${code}`, className)} />;
  }

  return (
    <span role="img" aria-label={title} title={title} className={cn("inline-grid size-8 shrink-0 place-items-center rounded-full bg-white/10 ring-1 ring-white/15", className)}>
      <Globe2 aria-hidden size={16} className="text-muted-foreground" />
    </span>
  );
}
