"use client";

import { useEffect, useRef } from "react";
import { Droplets } from "lucide-react";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { GlassCard } from "@/components/glass/glass-card";
import { WeatherIcon } from "@/components/weather/weather-icon";
import { formatHour } from "@/lib/utils";
import type { HourlyForecast as HourlyType } from "@/lib/types";

export function HourlyForecast({ hourly }: { hourly: HourlyType[] }) {
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination],
      slidesPerView: "auto",
      spaceBetween: 12,
      grabCursor: true,
      watchOverflow: true,
      navigation: {
        prevEl: prevRef.current,
        nextEl: nextRef.current
      },
      pagination: {
        el: paginationRef.current,
        clickable: true
      }
    });

    return () => {
      swiper.destroy(true, true);
    };
  }, [hourly]);

  return (
    <GlassCard className="p-5">
      <h2 className="mb-4 text-lg font-semibold">Próximas 24 horas</h2>
      <div
        ref={swiperRef}
        className="swiper no-scrollbar [--swiper-navigation-color:var(--primary)] [--swiper-navigation-size:18px] [--swiper-pagination-color:#facc15] [--swiper-pagination-bullet-inactive-color:rgba(255,255,255,0.35)]"
      >
        <div className="swiper-wrapper pb-8">
          {hourly.map((h, i) => (
            <div key={h.time} className="swiper-slide w-auto!">
              <div className="flex min-w-32 flex-col items-center gap-2 rounded-2xl bg-white/5 px-3 py-4 text-center">
                <span className="text-xs text-muted-foreground">{i === 0 ? "Ahora" : formatHour(h.time)}</span>
                <WeatherIcon code={h.weatherCode} isDay={h.isDay} className="h-7 w-7 text-primary" />
                <span className="text-sm font-semibold">{Math.round(h.temperature)}°</span>
                <span className="flex items-center gap-0.5 text-[11px] text-sky-300">
                  <Droplets size={10} />
                  {Math.round(h.precipitationProbability)}%
                </span>
              </div>
            </div>
          ))}
        </div>
        <button ref={prevRef} type="button" className="swiper-button-prev" aria-label="Horas anteriores" />
        <button ref={nextRef} type="button" className="swiper-button-next" aria-label="Horas siguientes" />
        <div ref={paginationRef} className="swiper-pagination" />
      </div>
    </GlassCard>
  );
}
