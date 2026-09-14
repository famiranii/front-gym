"use client";

import Link from "next/link";

import SearchBar from "@/components/ui/SearchBar";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-card px-4 pr-20 md:pr-80">
      {/* Search */}
      <div className="w-58 sm:min-w-68">
        <SearchBar />
      </div>

      {/* Add Product */}
      <Link
        href="/admin/product/new"
        className="flex items-center gap-2 rounded-lg bg-primary px-2 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        <span className="material-symbols-outlined text-[19px]">add</span>

        <span>افزودن محصول</span>
      </Link>
    </header>
  );
}
