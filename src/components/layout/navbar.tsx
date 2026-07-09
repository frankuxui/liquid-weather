"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloudSun } from "lucide-react";
import { FavoritesMenu } from "./favorites-menu";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/cities", label: "Ciudades" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-2.5">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glass-sm">
            <CloudSun size={20} strokeWidth={2} />
          </span>
          <span className="text-gradient text-lg tracking-tight">
            Liquid Weather
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <ul className="mr-1 hidden items-center gap-1 sm:flex">
            {LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-white/12 text-foreground"
                        : "text-foreground/70 hover:bg-white/8 hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <FavoritesMenu />
        </div>
      </nav>
    </header>
  );
}
