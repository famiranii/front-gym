"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBar from "../ui/SearchBar";
import CartButton from "./header/CartButton";



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
        <CartButton/>
      </div>
    </header>
  );
}
