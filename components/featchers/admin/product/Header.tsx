"use client";

import Link from "next/link";
import { useState } from "react";

import SearchBar from "@/components/ui/SearchBar";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-card px-4 pr-20 md:pr-80">
      {/* Search */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="جستجو"
        >
          <span className="material-symbols-outlined text-[20px]">search</span>
        </button>

        <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>

      {/* Add Product */}
      <Link
        href="/admin/product/new"
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        <span className="material-symbols-outlined text-[19px]">add</span>

        <span>افزودن محصول</span>
      </Link>
    </header>
  );
}
