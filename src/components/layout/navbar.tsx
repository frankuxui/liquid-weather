"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    <header className="sticky top-0 z-40 pt-[calc(env(safe-area-inset-top)+1rem)]">
      <div className="mx-auto max-w-7xl px-10">
        <nav className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-2 py-2 backdrop-blur-lg">
          <Link href="/" className="flex items-center gap-2.5 font-semibold">
            <span className="size-11 inline-flex items-center justify-center flex-none rounded-full bg-linear-to-br from-primary to-accent text-white shadow-glass-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5" viewBox="0 0 15 9" fill="none">
                <path d="M0 8.72727V0H1.84517V7.20597H5.58665V8.72727H0Z" fill="currentColor" />
                <path
                  d="M5.49716 8.72727L3 0H5.01562L6.46023 6.06392H6.53267L8.12642 0H9.85227L11.4418 6.0767H11.5185L12.9631 0H14.9787L12.4815 8.72727H10.6832L9.02131 3.02131H8.95313L7.29545 8.72727H5.49716Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <span className="home-liquid-gradient text-lg tracking-tight">Liquid Weather</span>
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
