"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBarWrapper() {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setQuery("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 h-9 w-56 rounded-xl border border-border bg-muted px-3 transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20"
    >
      <button
        type="submit"
        className="shrink-0 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
        aria-label="جستجو"
      >
        <span className="material-symbols-outlined text-[18px]">search</span>
      </button>

      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="جستجو..."
        dir="rtl"
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
      />
    </form>
  );
}
