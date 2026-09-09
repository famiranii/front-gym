"use client";

import { useState } from "react";
import {
  addToWishlist,
} from "@/store/slices/wishlistSlice";
import { useAppDispatch } from "@/store/hook";

interface Props {
  productId: string;
  isSaved?: boolean;
}

export default function WishlistButton({ productId, isSaved = false }: Props) {
  const dispatch = useAppDispatch();
  const [saved, setSaved] = useState(isSaved);

  const toggle = () => {
    setSaved((prev) => !prev);

    dispatch(addToWishlist(productId)); 
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={saved ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      className={`p-3.5 pb-2 rounded-2xl border transition-all ${
        saved
          ? "text-destructive border-destructive/40"
          : "text-muted-foreground border-border hover:text-destructive hover:border-destructive/40"
      }`}
    >
      <span
        className="material-symbols-outlined text-base leading-none"
        style={{ fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0" }}
      >
        favorite
      </span>
    </button>
  );
}
