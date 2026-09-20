"use client";

import { getImageUrl } from "@/lib/getImageUrl";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const formattedPrice = new Intl.NumberFormat("fa-IR").format(
    discountedPrice,
  );

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
        group flex h-[315px] w-[190px] cursor-pointer flex-col
        overflow-hidden rounded-xl border border-border/60
        bg-card shadow-sm transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl

        sm:h-[430px] sm:w-[280px] sm:rounded-2xl
        md:w-[320px]
      "
    >
      {/* Image */}
      <div className="relative h-[155px] shrink-0 overflow-hidden bg-muted sm:h-64">
        {product.primary_image ? (
          <img
            src={getImageUrl(product.primary_image)}
            alt={product.name}
            className="
              h-full w-full object-cover
              transition-transform duration-700
              group-hover:scale-110
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <span className="material-symbols-outlined text-4xl sm:text-5xl">
              image
            </span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Discount */}
        {product.discount > 0 && (
          <span
            className="
              absolute right-2 top-2 rounded-full
              bg-destructive px-2 py-1
              text-[9px] font-bold text-destructive-foreground
              shadow-md
              sm:right-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-xs
            "
          >
            {product.discount}% تخفیف
          </span>
        )}

        {/* Inactive */}
        {!product.is_active && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-[2px]">
            <span className="rounded-lg bg-background px-3 py-1.5 text-xs font-semibold text-foreground shadow-lg sm:rounded-xl sm:px-4 sm:py-2 sm:text-sm">
              ناموجود
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-2.5 text-right sm:p-4">
        <div>
          {/* Category + Rating */}
          <div className="mb-1.5 flex items-center justify-between sm:mb-2">
            <span className="max-w-[100px] truncate text-[9px] font-medium text-muted-foreground sm:max-w-none sm:text-xs">
              {product.category_name}
            </span>

            <div className="flex shrink-0 items-center gap-0.5 text-[10px] sm:gap-1 sm:text-xs">
              <span className="material-symbols-outlined text-[13px] text-yellow-500 sm:text-[15px]">
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
              line-clamp-2
              text-xs font-bold leading-5 text-foreground
              transition-colors group-hover:text-primary

              sm:text-sm sm:leading-6
              md:text-base
            "
          >
            {product.name}
          </h3>
        </div>

        {/* Price */}
        <div className="mt-2 border-t border-border/60 pt-2 sm:mt-5 sm:pt-4">
          {product.discount > 0 && (
            <span className="mb-0.5 block text-[9px] text-muted-foreground line-through sm:mb-1 sm:text-xs">
              {formattedOriginalPrice} تومان
            </span>
          )}

          <div className="flex items-baseline gap-0.5">
            <span className="text-sm font-extrabold text-foreground sm:text-lg">
              {formattedPrice}
            </span>

            <span className="text-[8px] text-muted-foreground sm:text-[10px]">
              تومان
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}