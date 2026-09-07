"use client";
import { useAppSelector } from "@/store/hook";
import Link from "next/link";

export default function CartButton() {
  const count = useAppSelector((state) => state.users.me?.cart_length);
  return (
    <Link
      href="/cart"
      className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground active:bg-primary active:text-primary-foreground"
      aria-label="سبد خرید"
    >
      <span className="material-symbols-outlined text-[19px]">
        shopping_bag
      </span>

      {count ? (
        <span className="absolute -top-1.5 -left-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full border-2 border-card bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
          {count}
        </span>
      ) : (
        <></>
      )}
    </Link>
  );
}
