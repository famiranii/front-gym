"use client";

import { getImageUrl } from "@/lib/getImageUrl";
import { Product } from "@/types/product";

export default function ProductCardMobile({ product }: { product: Product }) {
  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const formattedPrice = new Intl.NumberFormat("fa-IR").format(discountedPrice);
  const formattedOriginalPrice = new Intl.NumberFormat("fa-IR").format(
    product.price,
  );

  return (
    <div className="flex items-center gap-3 bg-card rounded-2xl border border-border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer">
      {/* عکس — سمت راست */}
      <div className="relative w-28 h-28 shrink-0 bg-muted overflow-hidden rounded-r-2xl">
        {product.primary_image ? (
          <img
            src={getImageUrl(product.primary_image)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="material-symbols-outlined text-4xl">image</span>
          </div>
        )}

        {product.discount > 0 && (
          <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-destructive text-white text-[10px] font-bold">
            {product.discount}%
          </span>
        )}

        {!product.is_active && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-medium">ناموجود</span>
          </div>
        )}
      </div>

      {/* مشخصات — سمت چپ */}
      <div className="flex-1 min-w-0 py-3 pl-3 flex flex-col justify-between gap-2">
        <div>
          <p className="text-[11px] text-tertiary font-medium">
            {product.category_name}
          </p>
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mt-0.5">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            {product.discount > 0 && (
              <span className="text-[11px] text-muted-foreground line-through">
                {formattedOriginalPrice}
              </span>
            )}
            <span className="text-sm font-bold text-foreground">
              {formattedPrice}
              <span className="text-xs font-normal mr-0.5">تومان</span>
            </span>
          </div>

          <button
            type="button"
            disabled={!product.is_active}
            aria-label={
              product.is_active
                ? `افزودن ${product.name} به سبد`
                : `${product.name} ناموجود`
            }
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground hover:border-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px]">
              {product.is_active ? "add" : "remove"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
