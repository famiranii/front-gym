"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
  selectIsInWishlist,
} from "@/store/slices/wishlistSlice";
import { useAppDispatch } from "@/store/hook";

interface Props {
  productId: string;
  className?: string;
}

export default function WishlistButton({ productId, className = "" }: Props) {
  const dispatch = useAppDispatch();
  const active = useSelector(selectIsInWishlist(productId));
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (active) {
        await dispatch(removeFromWishlist(productId));
      } else {
        await dispatch(addToWishlist(productId));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-label={active ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}
      className={[
        "flex items-center justify-center transition-all active:scale-90 disabled:opacity-50",
        className,
      ].join(" ")}
    >
      <span
        className={[
          "material-symbols-outlined text-xl leading-none transition-colors",
          active
            ? "text-destructive"
            : "text-muted-foreground hover:text-destructive",
        ].join(" ")}
        style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
      >
        favorite
      </span>
    </button>
  );
}
