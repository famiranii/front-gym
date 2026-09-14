"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCardMobile from "@/components/ui/ProductCardMobile";
import ProductCard from "@/components/ui/ProductCard";

interface Props {
  q: string;
  sort: string;
  initialProducts: Product[];
}

const LIMIT = 20;

export default function SearchResults({ q, sort, initialProducts }: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [offset, setOffset] = useState(LIMIT);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialProducts.length === LIMIT);

  const loadMore = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const endpoint = q.trim()
        ? `/products/search?q=${encodeURIComponent(q)}&limit=${LIMIT}&offset=${offset}&sort=${encodeURIComponent(sort)}`
        : `/products?limit=${LIMIT}&offset=${offset}&sort=${encodeURIComponent(sort)}`;

      const data = await api.get<Product[]>(endpoint);

      const results = data ?? [];

      setProducts((prev) => [...prev, ...results]);
      setOffset((prev) => prev + results.length);
      setHasMore(results.length === LIMIT);
    } finally {
      setLoading(false);
    }
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-24 text-center">
        <span className="material-symbols-outlined text-6xl text-muted-foreground/30">
          search_off
        </span>
        <div>
          <p className="font-bold text-foreground">نتیجه‌ای یافت نشد</p>
          <p className="mt-1 text-sm text-muted-foreground">
            عبارت دیگری امتحان کنید
          </p>
        </div>
        <Link
          href="/products"
          className="mt-2 flex items-center gap-2 rounded-2xl bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground transition-all hover:opacity-90 active:scale-95"
        >
          <span className="material-symbols-outlined text-base leading-none">
            storefront
          </span>
          همه محصولات
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* موبایل */}
      <div className="flex flex-col gap-3 sm:hidden">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <ProductCardMobile product={product} />
          </Link>
        ))}
      </div>

      {/* دسکتاپ */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-24">
        {products.map((product) => (
          <Link
            href={`/product/${product.id}`}
            key={product.id}
            className="h-full"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>

      {/* Load more */}
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="flex items-center gap-2 rounded-2xl border border-border bg-card px-8 py-3 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-95 disabled:opacity-50"
          >
            <span
              className={`material-symbols-outlined text-base leading-none ${loading ? "animate-spin" : ""}`}
            >
              {loading ? "progress_activity" : "expand_more"}
            </span>
            نمایش بیشتر
          </button>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <p className="mt-10 text-center text-sm text-muted-foreground">
          همه نتایج نمایش داده شد
        </p>
      )}
    </>
  );
}
