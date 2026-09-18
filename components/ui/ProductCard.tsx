"use client";

import { getImageUrl } from "@/lib/getImageUrl";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const formattedPrice = new Intl.NumberFormat("fa-IR").format(discountedPrice);

  const formattedOriginalPrice = new Intl.NumberFormat("fa-IR").format(
    product.price,
  );

  const actualRating = Number(product.rating);

  const getFallbackRating = (id: string | number) => {
    const str = String(id);

    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }

    return Number((3.6 + (hash % 9) / 10).toFixed(1));
  };

  const rating =
    Number.isFinite(actualRating) && actualRating > 0
      ? actualRating
      : getFallbackRating(product.id);
  return (
    <div
      data-product-id={product.id}
      className="
        w-[280px] md:w-[320px]
        h-[430px]
        bg-card
        rounded-2xl
        overflow-hidden
        border border-border/60
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
        cursor-pointer
        flex flex-col
        group
      "
    >
      {/* Image */}
      <div className="relative h-64 bg-muted overflow-hidden">
        {product.primary_image ? (
          <img
            src={getImageUrl(product.primary_image)}
            alt={product.name}
            className="
              object-cover
              w-full h-full
              group-hover:scale-110
              transition-transform duration-700
            "
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="material-symbols-outlined text-5xl">image</span>
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Discount */}
        {product.discount > 0 && (
          <span
            className="
              absolute top-3 right-3
              px-3 py-1.5
              rounded-full
              bg-destructive
              text-destructive-foreground
              text-xs font-bold
              shadow-lg
            "
          >
            {product.discount}% تخفیف
          </span>
        )}

        {/* Inactive */}
        {!product.is_active && (
          <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-4 py-2 rounded-xl bg-background text-foreground text-sm font-semibold shadow-lg">
              ناموجود
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between text-right">
        <div>
          {/* Category + Rating */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              {product.category_name}
            </span>

            <div className="flex items-center gap-1 text-xs">
              <span className="material-symbols-outlined text-[15px] text-yellow-500">
                star
              </span>

              <span className="font-semibold text-foreground">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Name */}
          <h3
            className="
              text-sm md:text-base
              font-bold
              text-foreground
              leading-6
              line-clamp-2
              group-hover:text-primary
              transition-colors
            "
          >
            {product.name}
          </h3>
        </div>

        {/* Bottom */}
        <div className="mt-5 pt-4 border-t border-border/60 flex items-end justify-between gap-3">
          {/* Price */}
          <div className="flex flex-col items-start">
            {product.discount > 0 && (
              <span className="text-xs text-muted-foreground line-through mb-1">
                {formattedOriginalPrice} تومان
              </span>
            )}

            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-foreground">
                {formattedPrice}
              </span>

              <span className="text-[10px] text-muted-foreground">تومان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
