"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getImageUrl } from "@/lib/getImageUrl";

type Banner = {
  id: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_url: string;
  image_url: string;
};

export default function HeroSlider({ banners }: { banners: Banner[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const banner = banners[current];

  return (
    <section className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden bg-black">
      <img
        src={getImageUrl(banner.image_url)}
        alt={banner.title}
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-700"
      />
      {/* گرادیان */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      {/* محتوا */}
      <div className="relative z-10 h-full flex flex-col justify-end items-start p-6 md:p-16 w-full md:w-2/3 lg:w-1/2 text-right">
        {banner.subtitle && (
          <span className="text-sm text-white/80 bg-white/10 border border-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-4 inline-block">
            {banner.subtitle}
          </span>
        )}

        {banner.title && (
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            {banner.title}
          </h1>
        )}

        {banner.button_text && banner.button_url && (
          <Link
            href={banner.button_url}
            className="mt-4 bg-white text-black text-sm font-bold px-8 py-3 rounded-xl hover:bg-white/90 transition-all active:scale-95 flex items-center gap-2"
          >
            {banner.button_text}
            <span className="material-symbols-outlined text-sm rotate-180">
              arrow_back
            </span>
          </Link>
        )}
      </div>
      {/* dots */}
      {banners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? "bg-white w-6" : "bg-white/40 w-2"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
