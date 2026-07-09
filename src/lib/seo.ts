export const SITE_NAME = "Liquid Weather";

export const SITE_DESCRIPTION = "Consulta el tiempo actual, previsión horaria y pronóstico de 7 días con gráficas, calidad del aire y widgets en un dashboard Liquid Glass.";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://liquid-weather-beta.vercel.app";

export const SITE_BASE_URL = new URL(SITE_URL);

export const OG_IMAGE = {
  url: new URL("/og-image.jpg", SITE_BASE_URL).toString(),
  width: 928,
  height: 484,
  alt: "Liquid Weather, dashboard meteorológico con diseño Liquid Glass"
};
