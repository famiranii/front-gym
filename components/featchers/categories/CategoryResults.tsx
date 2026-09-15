"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import ProductCardMobile from "@/components/ui/ProductCardMobile";

interface Props {
  categoryName: string;
  sort: string;
  initialProducts: Product[];
}

const LIMIT = 20;

export default function CategoryResults({
  categoryName,
  sort,
  initialProducts,
}: Props) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [offset, setOffset] = useState(initialProducts.length);
  const [hasMore, setHasMore] = useState(initialProducts.length === LIMIT);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const params = new URLSearchParams();

      params.set("limit", String(LIMIT));
      params.set("offset", String(offset));
      params.set("sort", sort);

      const result = await api.get<Product[]>(
        `/categories/${encodeURIComponent(categoryName)}/products?${params.toString()}`,
      );

      setProducts((prev) => [...prev, ...result]);
      setOffset((prev) => prev + result.length);
      setHasMore(result.length === LIMIT);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [categoryName, sort, offset, loading, hasMore]);

  useEffect(() => {
    const element = observerRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "300px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [loadMore]);

  if (products.length === 0 && !loading) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined mb-4 text-5xl text-muted-foreground">
          inventory_2
        </span>

        <h2 className="text-lg font-bold text-foreground">
          محصولی در این دسته‌بندی وجود ندارد
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          در حال حاضر محصولی برای نمایش در این دسته‌بندی موجود نیست.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* موبایل */}
      <div className="flex flex-col gap-3 sm:hidden">
        {products.map((product) => (
          <Link
            href={`/product/${product.name}?id=${product.id}`}
            key={product.id}
          >
            <ProductCardMobile product={product} />
          </Link>
        ))}
      </div>

      {/* دسکتاپ */}
      <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-24">
        {products.map((product) => (
          <Link
            href={`/product/${product.name}?id=${product.id}`}
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
