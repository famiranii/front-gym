"use client";

import { useAppSelector } from "@/store/hook";
import Link from "next/link";

export default function CartButton() {
  const count = useAppSelector((state) => state.users.me?.cart_length ?? 0);

  return (
    <Link
      href="/cart"
      aria-label="سبد خرید"
      className="group relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
    >
      <span className="material-symbols-outlined text-[19px]">
        shopping_bag
      </span>

      <span className="pointer-events-none absolute right-1/2 top-full z-50 mt-2 translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100">
        سبد خرید
      </span>

      {count > 0 && (
        <span className="absolute -left-1.5 -top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full border-2 border-card bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}
