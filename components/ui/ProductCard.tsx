"use client";

import { Product } from "@/types/product";

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const formattedPrice = new Intl.NumberFormat("fa-IR").format(
    discountedPrice
  );

  const formattedOriginalPrice = new Intl.NumberFormat("fa-IR").format(
    product.price
  );

  const formattedCreatedAt = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(product.created_at));

  return (
    <div
      data-product-id={product.id}
      className="min-w-[280px] md:min-w-[320px] bg-card rounded-xl overflow-hidden border border-border shadow-sm group hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative h-72 bg-muted overflow-hidden">
        {product.primary_image ? (
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${product.primary_image}`}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <span className="material-symbols-outlined text-5xl">
              image
            </span>
          </div>
        )}

        {/* Discount */}
        {product.discount > 0 && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-destructive text-destructive-foreground text-xs font-semibold">
            {product.discount}% تخفیف
          </span>
        )}

        {/* Active status */}
        {!product.is_active && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-lg bg-background text-foreground text-sm font-medium">
              ناموجود
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col justify-between text-right">
        <div>
          {/* Category */}
          <div className="text-xs text-tertiary mb-1">
            {product.category_name}
          </div>

          {/* Name */}
          <h3 className="text-sm font-semibold text-foreground mb-2">
            {product.name}
          </h3>
        </div>

        {/* Bottom */}
        <div className="flex justify-between items-center mt-4">
          {/* Price */}
          <div className="flex flex-col items-start">
            {product.discount > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formattedOriginalPrice}
              </span>
            )}

            <span className="text-sm font-bold text-foreground">
              {formattedPrice} تومان
            </span>
          </div>

          {/* Add button */}
          <button
            type="button"
            disabled={!product.is_active}
            aria-label={
              product.is_active
                ? `افزودن ${product.name} به سبد خرید`
                : `${product.name} ناموجود است`
            }
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center
              group-hover:bg-secondary group-hover:text-secondary-foreground
              group-hover:border-secondary transition-colors
              disabled:opacity-40 disabled:cursor-not-allowed"
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