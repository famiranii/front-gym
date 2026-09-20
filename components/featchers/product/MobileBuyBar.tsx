"use client";

import { useAppSelector } from "@/store/hook";
import Link from "next/link";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

export default function MobileBuyBar({
  price,
  onBuy,
}: {
  price: number;
  onBuy: () => void;
}) {
  const count = useAppSelector(
    (state) => state.users.me?.cart_length ?? 0
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 border-t border-border bg-card px-3 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.07)] md:hidden">
      {/* Price */}
      <div className="flex min-w-0 flex-col">
        <span className="text-[10px] text-muted-foreground">قیمت</span>

        <span className="text-sm font-extrabold text-foreground">
          {formatPrice(price)}
          <span className="mr-1 text-[9px] font-normal text-muted-foreground">
            تومان
          </span>
        </span>
      </div>

      {/* Buy */}
      <button
        onClick={onBuy}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-secondary px-3 py-2.5 text-sm font-bold text-secondary-foreground transition-all hover:opacity-90 active:scale-[0.97]"
      >
        <span className="material-symbols-outlined text-[18px] leading-none">
          shopping_bag
        </span>

        خرید
      </button>

      {/* Cart */}
      <Link
        href="/cart"
        aria-label="سبد خرید"
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
      >
        <span className="material-symbols-outlined text-[20px] leading-none">
          shopping_bag
        </span>

        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full border-2 border-card bg-destructive px-1 text-[9px] font-bold leading-none text-destructive-foreground">
            {count}
          </span>
        )}
      </Link>
    </div>
  );
}