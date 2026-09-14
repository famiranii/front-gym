"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import ProductCard from "@/components/ui/ProductCard";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import Header from "@/components/featchers/admin/product/Header";

const LIMIT = 20;

export default function Page() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q")?.trim() ?? "";

  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      setProducts([]);
      setOffset(0);
      setHasMore(true);

      try {
        const endpoint = q
          ? `/products/search?q=${encodeURIComponent(q)}&limit=${LIMIT}&offset=0`
          : `/products?limit=${LIMIT}&offset=0`;

        const data: Product[] = await api.get(endpoint);

        setProducts(data);
        setOffset(data.length);

        if (data.length < LIMIT) {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error);
        setProducts([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [q]);

  async function handleLoadMore() {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      const endpoint = q
        ? `/products/search?q=${encodeURIComponent(q)}&limit=${LIMIT}&offset=${offset}`
        : `/products?limit=${LIMIT}&offset=${offset}`;

      const data: Product[] = await api.get(endpoint);

      setProducts((current) => [...current, ...data]);

      setOffset((current) => current + data.length);

      if (data.length < LIMIT) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  }

  async function handleDelete(productId: string) {
    const confirmed = window.confirm("آیا از حذف این محصول مطمئن هستید؟");

    if (!confirmed) return;

    try {
      await api.delete(`/products/${productId}`);

      setProducts((current) =>
        current.filter((product) => product.id !== productId),
      );
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div>
        <Header />

        <div className="p-6 mt-20">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      {q && (
        <div className="mx-8 mt-20">
          <p className="text-sm text-muted-foreground">نتایج جستجو برای:</p>

          <h1 className="mt-1 text-xl font-bold text-foreground">«{q}»</h1>
        </div>
      )}

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <span className="material-symbols-outlined text-6xl text-muted-foreground/30">
            search_off
          </span>

          <p className="mt-4 font-bold text-foreground">
            {q ? `محصولی برای «${q}» پیدا نشد` : "محصولی وجود ندارد"}
          </p>
        </div>
      ) : (
        <div className="mt-20 flex flex-wrap justify-center gap-5 m-8">
          {products.map((product) => (
            <div key={product.id} className="relative shrink-0 max-w-76 mx-5">
              <Link href={`/admin/product/new?id=${product.id}`}>
                <ProductCard product={product} />
              </Link>

              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                className="absolute left-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-xl bg-destructive text-destructive-foreground shadow-md transition-opacity hover:opacity-90"
                aria-label="حذف محصول"
              >
                <span className="material-symbols-outlined text-[19px]">
                  delete
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      {hasMore && products.length > 0 && (
        <div className="mt-8 flex justify-center pb-10">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loadingMore ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">
                  progress_activity
                </span>
                در حال بارگذاری...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">
                  expand_more
                </span>
                نمایش محصولات بیشتر
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
