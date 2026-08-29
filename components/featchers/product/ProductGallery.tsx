"use client";

import { useEffect, useRef, useState } from "react";
import { ProductImage } from "@/types/product-detail";

export default function ProductGallery({ images }: { images: ProductImage[] }) {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const switchTo = (i: number) => {
    if (i === active || !images[i]) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setFading(true);

    timeoutRef.current = setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!images?.length) return null;

  const imageUrl = (url: string) => `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3 w-full">
      {/* Thumbnails */}
      <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible scrollbar-hide md:w-20 shrink-0">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            onClick={() => switchTo(i)}
            aria-label={`نمایش تصویر ${i + 1}`}
            className={[
              "relative shrink-0 w-16 h-16 md:w-full md:aspect-square",
              "rounded-xl overflow-hidden border-2 transition-all duration-200",
              i === active
                ? "border-foreground scale-[1.04]"
                : "border-border hover:border-muted-foreground opacity-60 hover:opacity-100",
            ].join(" ")}
          >
            <img
              src={imageUrl(img.url)}
              alt={`تصویر محصول ${i + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative h-[50vh] rounded-2xl bg-muted md:flex-1">
        <img
          key={images[active].url}
          src={imageUrl(images[active].url)}
          alt="product"
          className={[
            "absolute inset-0 w-full h-full object-cover object-center",
            "transition-opacity duration-200",
            fading ? "opacity-0" : "opacity-100",
          ].join(" ")}
        />

        {/* Badge */}
        <span className="absolute top-3 right-3 bg-destructive text-white text-xs font-bold px-2.5 py-1 rounded-full">
          ۲۲٪ تخفیف
        </span>

        {/* Navigation dots */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => switchTo(i)}
              aria-label={`رفتن به تصویر ${i + 1}`}
              className={[
                "h-1.5 rounded-full transition-all duration-200",
                i === active
                  ? "w-5 bg-foreground"
                  : "w-1.5 bg-foreground/30 hover:bg-foreground/50",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
