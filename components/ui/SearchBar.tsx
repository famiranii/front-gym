"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchBar({ open, onClose }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const q = inputRef.current?.value.trim();

    if (!q) return;

    router.push(`/search?q=${encodeURIComponent(q)}`);
    onClose();
  }

  return (
    <div
      className={[
        "absolute left-0 top-1/2 z-50 w-[280px] -translate-y-1/2",
        "transition-all duration-200 ease-out",
        open
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "translate-x-4 opacity-0 pointer-events-none",
      ].join(" ")}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex h-10 items-center overflow-hidden rounded-xl border border-border bg-card shadow-lg">
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="بستن"
          >
            <span className="material-symbols-outlined text-[19px]">close</span>
          </button>

          {/* Input */}
          <input
            ref={inputRef}
            type="search"
            placeholder="جستجو در محصولات..."
            dir="rtl"
            className="min-w-0 flex-1 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />

          {/* Search */}
          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="جستجو"
          >
            <span className="material-symbols-outlined text-[19px]">
              search
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
