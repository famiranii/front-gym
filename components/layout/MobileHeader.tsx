"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBar from "../ui/SearchBar";

function CartButton({ count }: { count: number }) {
  return (
    <Link
      href="/cart"
      className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground active:bg-primary active:text-primary-foreground"
      aria-label="سبد خرید"
    >
      <span className="material-symbols-outlined text-[19px]">
        shopping_bag
      </span>

      {count > 0 && (
        <span className="absolute -top-1.5 -left-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full border-2 border-card bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
          {count}
        </span>
      )}
    </Link>
  );
}

export default function MobileHeader() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 flex h-[52px] w-full items-center justify-between border-b border-border bg-card px-4 md:hidden">
      {/* SearchBar overlays the header when open */}

      {/* Back */}
      <div className="w-9">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors active:bg-muted"
          aria-label="بازگشت"
        >
          <span className="material-symbols-outlined text-[20px]">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Brand */}
      <div className="absolute left-1/2 -translate-x-1/2 text-base font-bold tracking-tight text-foreground">
        پولاد<span className="text-primary">.</span>
      </div>

      {/* Search + Profile + Cart */}
      <div className="flex items-center gap-1">
        {/* Search */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors active:bg-muted"
            aria-label="جستجو"
          >
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </button>
          <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
        </div>

        {/* Profile */}
        <Link
          href="/profile"
          className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors active:bg-muted"
          aria-label="اطلاعات شخصی"
        >
          <span className="material-symbols-outlined text-[20px]">person</span>
        </Link>

        {/* Cart */}
        <CartButton count={2} />
      </div>
    </header>
  );
}
