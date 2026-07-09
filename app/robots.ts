import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/"
      },
      {
        userAgent: ["Googlebot", "Bingbot", "GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "anthropic-ai"],
        allow: "/"
      }
    ],
    sitemap: new URL("/sitemap.xml", SITE_BASE_URL).toString(),
    host: SITE_BASE_URL.origin
  };
}
