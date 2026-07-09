import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "Liquid Weather — El tiempo con estilo Liquid Glass",
    template: "%s · Liquid Weather"
  },
  description: "Dashboard meteorológico profesional en tiempo real con pronósticos, gráficas y widgets reorganizables. Diseño iOS Liquid Glass, datos de Open-Meteo.",
  keywords: ["tiempo", "clima", "meteorología", "pronóstico", "weather", "dashboard", "Open-Meteo"],
  authors: [{ name: "Liquid Weather" }],
  openGraph: {
    title: "Liquid Weather",
    description: "El tiempo en tiempo real con un diseño premium inspirado en iOS Liquid Glass.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#0b1120",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.variable}>
      <body className="font-sans antialiased">
        <Navbar />
        <main className="relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
