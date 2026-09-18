"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { getImageUrl } from "@/lib/getImageUrl";

interface ProductResult {
  id: string;
  name: string;
  primary_image: string;
  final_price: number;
  category_name: { String: string; Valid: boolean };
}


function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

  const [q, setQ] = useState("");
  const [results, setResults] = useState<ProductResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  // debounce fetch
  useEffect(() => {
    if (q.trim().length < 1) {
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);

      try {
        const data = await api.get<ProductResult[]>(
          `/products/search?q=${encodeURIComponent(q)}&limit=15&offset=0`,
        );

        setResults(data ?? []);
        setShowDropdown(true);
        setActiveIndex(-1);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [q]);

  // کلیک بیرون
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  function goToSearch() {
    const searchPath = isAdmin ? "/admin/products" : "/products";
    const value = q.trim();
    if (value) {
      router.push(`${searchPath}?q=${encodeURIComponent(value)}`);
    } else {
      router.push(searchPath);
    }
    setShowDropdown(false);
  }

  function goToProduct(id: string) {
    const productPath = isAdmin
      ? `/admin/product/new?id=${id}`
      : `/product/${id}`;

    router.push(productPath);

    setShowDropdown(false);
    setQ("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (activeIndex >= 0 && results[activeIndex]) {
      goToProduct(results[activeIndex].id);
    } else {
      goToSearch();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();

      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();

      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  }

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex h-10 items-center overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            placeholder="جستجو در محصولات..."
            dir="rtl"
            className="min-w-0 flex-1 bg-transparent px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />

          <button
            type="submit"
            className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="جستجو"
          >
            <span className="material-symbols-outlined text-[19px]">
              {loading ? "progress_activity" : "search"}
            </span>
          </button>
        </div>

        {showDropdown && (
          <div className="absolute right-0 left-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
            {results.length > 0 && (
              <ul>
                {results.map((p, i) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      onClick={() => goToProduct(p.id)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={[
                        "flex w-full items-center gap-3 px-3 py-2.5 text-right transition-colors",
                        i === activeIndex ? "bg-muted" : "hover:bg-muted/60",
                      ].join(" ")}
                    >
                      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {p.primary_image ? (
                          <img
                            src={getImageUrl(p.primary_image)}
                            alt={p.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <span className="material-symbols-outlined text-sm text-muted-foreground">
                              image
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {p.name}
                        </p>

                        {p.category_name?.Valid && (
                          <p className="text-xs text-muted-foreground">
                            {p.category_name.String}
                          </p>
                        )}
                      </div>

                      <span className="shrink-0 text-xs font-bold text-foreground">
                        {formatPrice(p.final_price)}
                        <span className="font-normal"> ت</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {!loading && results.length === 0 && (
              <p className="px-4 py-4 text-center text-sm text-muted-foreground">
                نتیجه‌ای برای «{q}» یافت نشد
              </p>
            )}

            {results.length > 0 && (
              <button
                type="button"
                onClick={goToSearch}
                className="flex w-full items-center justify-center gap-2 border-t border-border px-4 py-2.5 text-xs font-semibold text-accent transition-colors hover:bg-muted"
              >
                <span className="material-symbols-outlined text-sm leading-none">
                  search
                </span>
                مشاهده همه نتایج برای «{q}»
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
