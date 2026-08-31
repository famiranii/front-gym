"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import StarRating from "./StarRating";
import { Product } from "@/types/product-detail";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import PriceComponent from "@/components/ui/PriceComponent";

type CartFormValues = {
  variant_id: string;
  quantity: number;
};

export default function PurchasePanel({ product }: { product: Product }) {
  const router = useRouter();

  const colors = Array.from(
    new Map(
      product.variants.filter((v) => v.color).map((v) => [v.color, v]),
    ).values(),
  );

  const [selectedColor, setSelectedColor] = useState<string>(
    colors[0]?.color ?? "",
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { setValue, watch, handleSubmit } = useForm<CartFormValues>({
    defaultValues: { quantity: 1 },
  });

  const qty = watch("quantity");

  const selectedVariant = product.variants.find(
    (v) => v.color === selectedColor && v.label === selectedSize,
  );

  const availableSizes = Array.from(
    new Map(
      product.variants
        .filter((v) => v.color === selectedColor)
        .map((v) => [v.label, v]),
    ).values(),
  );

  const outOfStock =
    selectedVariant?.stock !== undefined && selectedVariant.stock <= 0;

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setSelectedSize(null);
    setSizeError(false);
    setValue("quantity", 1);
    setValue("variant_id", "");
  };

  const handleSizeChange = (size: string, variantId: string) => {
    setSelectedSize(size);
    setSizeError(false);
    setValue("quantity", 1);
    setValue("variant_id", variantId);
  };

  const onSubmit = async (data: CartFormValues) => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    if (!selectedVariant || selectedVariant.stock <= 0) return;
    if (data.quantity > selectedVariant.stock) {
      setValue("quantity", selectedVariant.stock);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post(`/cart`, {
        variant_id: data.variant_id,
        quantity: data.quantity,
      });

      console.log(res);

      setAdded(true);
      setTimeout(() => setAdded(false), 2200);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("خطایی در افزودن محصول به سبد خرید رخ داد");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Name & brand */}
      <div>
        <p className="text-xs font-semibold text-accent uppercase tracking-widest mb-1">
          {product.brand} · {product.category}
        </p>
        <h1 className="text-xl md:text-2xl font-extrabold text-foreground leading-snug">
          {product.name}
        </h1>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <StarRating rating={product.average_rating} size="sm" />
        <span className="text-sm font-bold text-foreground">
          {product.average_rating}
        </span>
        <span className="text-sm text-muted-foreground">
          ({product.reviewCount} نظر)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <PriceComponent
          price={product.price}
          final_price={product.final_price}
          discount={product.discount}
        />
      </div>

      <hr className="border-border" />

      {/* Color */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-muted-foreground">
          رنگ:
          <span className="text-foreground mr-1">
            {selectedColor || "انتخاب نشده"}
          </span>
        </span>
        <div className="flex gap-2">
          {colors.map((variant) => {
            const color = variant.color;
            const active = selectedColor === color;
            return (
              <button
                key={color}
                type="button"
                aria-label={`رنگ ${color}`}
                title={color}
                onClick={() => handleColorChange(color)}
                style={{ backgroundColor: color }}
                className={[
                  "w-8 h-8 rounded-full transition-all border border-border",
                  active
                    ? "ring-2 ring-offset-2 ring-accent scale-110"
                    : "hover:scale-110",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>

      {/* Size */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span
            className={[
              "text-xs font-semibold",
              sizeError ? "text-destructive" : "text-muted-foreground",
            ].join(" ")}
          >
            {sizeError ? "لطفاً سایز را انتخاب کنید" : "سایز"}
          </span>
          <button type="button" className="text-xs text-accent hover:underline">
            راهنمای سایز
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableSizes.map(({ id, label, stock }) => {
            const oos = stock <= 0;
            const active = selectedSize === label;
            return (
              <button
                key={`${selectedColor}-${label}`}
                type="button"
                disabled={oos}
                onClick={() => handleSizeChange(label, id)}
                className={[
                  "min-w-[3rem] px-3 py-2 rounded-xl text-sm font-bold transition-all border",
                  oos
                    ? "border-border text-border line-through cursor-not-allowed opacity-40"
                    : active
                      ? "bg-secondary text-secondary-foreground border-secondary shadow-sm scale-105"
                      : "border-border text-foreground hover:border-accent",
                ].join(" ")}
              >
                {label}
              </button>
            );
          })}
        </div>
        {availableSizes.length === 0 && (
          <span className="text-xs text-destructive">
            برای این رنگ سایزی موجود نیست
          </span>
        )}
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold text-muted-foreground">
          تعداد
        </span>
        <div className="flex items-center gap-0 border border-border rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setValue("quantity", Math.max(1, qty - 1))}
            disabled={qty <= 1}
            className="px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-lg font-bold disabled:opacity-40"
          >
            −
          </button>
          <span className="px-4 py-2 text-sm font-bold text-foreground border-x border-border min-w-[2.5rem] text-center">
            {qty}
          </span>
          <button
            type="button"
            onClick={() =>
              setValue(
                "quantity",
                Math.min(selectedVariant?.stock ?? qty + 1, qty + 1),
              )
            }
            disabled={!!selectedVariant && qty >= selectedVariant.stock}
            className="px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors text-lg font-bold disabled:opacity-40"
          >
            +
          </button>
        </div>
        {selectedVariant &&
          selectedVariant.stock > 0 &&
          selectedVariant.stock <= 5 && (
            <span className="text-xs text-warning font-semibold">
              فقط {selectedVariant.stock} عدد باقی‌مانده
            </span>
          )}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {/* CTA */}
      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={outOfStock || loading}
          className={[
            "flex-1 flex items-center justify-center gap-2",
            "py-3.5 rounded-2xl text-sm font-bold transition-all active:scale-95",
            outOfStock
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : added
                ? "bg-success text-white"
                : "bg-secondary text-secondary-foreground hover:opacity-90 shadow-md",
          ].join(" ")}
        >
          <span className="material-symbols-outlined text-base leading-none">
            {added
              ? "check_circle"
              : outOfStock
                ? "remove_shopping_cart"
                : "shopping_bag"}
          </span>
          {outOfStock
            ? "ناموجود"
            : added
              ? "به سبد اضافه شد"
              : loading
                ? "در حال افزودن..."
                : "افزودن به سبد خرید"}
        </button>

        <button
          type="button"
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="p-3.5 rounded-2xl border border-border text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-all"
        >
          <span className="material-symbols-outlined text-base leading-none">
            favorite
          </span>
        </button>
      </div>

      {/* Trust signals */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        {[
          {
            icon: "local_shipping",
            label: "ارسال رایگان",
            sub: "بالای ۵۰۰ هزار",
          },
          { icon: "replay", label: "۷ روز مرجوعی", sub: "بدون سوال" },
          { icon: "verified", label: "اصالت کالا", sub: "تضمین‌شده" },
        ].map((item) => (
          <div
            key={item.icon}
            className="flex flex-col items-center gap-1 text-center p-2 rounded-xl bg-muted/50"
          >
            <span className="material-symbols-outlined text-lg text-accent">
              {item.icon}
            </span>
            <span className="text-[11px] font-bold text-foreground leading-tight">
              {item.label}
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              {item.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
