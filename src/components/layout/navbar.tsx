"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CloudSun } from "lucide-react";
import { FavoritesMenu } from "./favorites-menu";
import { ThemeSelector } from "./theme-selector";
import { MobileMenu } from "@/components/mobile-menu";
import { useMobileMenuStore } from "@/store/mobile-menu";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/cities", label: "Ciudades" },
  { href: "/compare", label: "Comparar" }
];

export function Navbar() {
  const pathname = usePathname();
  const toggleMobileMenu = useMobileMenuStore((s) => s.toggle);

  return (
    <header className="sticky top-0 z-40 pt-4">
      <div className="mx-auto max-w-7xl px-10">
        <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-2.5 backdrop-blur-lg">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-linear-to-br from-primary to-accent text-primary-foreground shadow-glass-sm">
              <CloudSun size={20} strokeWidth={2} />
            </span>
            <span className="text-gradient text-lg tracking-tight">Liquid Weather</span>
          </Link>

          <div className="flex items-center gap-1">
            <ul className="mr-1 hidden items-center gap-1 sm:flex">
              {LINKS.map((link) => {
                const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        active ? "bg-white/12 text-foreground" : "text-foreground/70 hover:bg-white/8 hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ThemeSelector />
            <FavoritesMenu />
            <button
              type="button"
              data-toggle="drawer-menu"
              onClick={toggleMobileMenu}
              className="size-10 inline-flex items-center justify-center place-items-center rounded-full transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:hidden"
              aria-label="Abrir menu"
              aria-controls="mobile-navigation"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="size-12" viewBox="0 0 24 24">
                <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2.6" d="M9.41 9.66H9.4m5.2 0h-.01m-5.28 4.7H9.3m5.3 0h-.01"></path>
              </svg>
            </button>
          </div>
        </nav>
      </div>

      <MobileMenu items={LINKS} />
    </header>
  );
}
