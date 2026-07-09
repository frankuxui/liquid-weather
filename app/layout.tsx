import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { OG_IMAGE, SITE_BASE_URL, SITE_DESCRIPTION, SITE_NAME } from "@/lib/seo";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: SITE_BASE_URL,
  applicationName: SITE_NAME,
  title: {
    default: "Liquid Weather | El tiempo actual y previsión meteorológica",
    template: `%s | ${SITE_NAME}`
  },
  description: SITE_DESCRIPTION,
  keywords: ["tiempo actual", "previsión meteorológica", "pronóstico del tiempo", "clima por ciudad", "weather dashboard", "Open-Meteo", "calidad del aire", "previsión horaria"],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "weather",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Liquid Weather | El tiempo actual y previsión meteorológica",
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    locale: "es_ES",
    images: [OG_IMAGE],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Liquid Weather | El tiempo actual y previsión meteorológica",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
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
