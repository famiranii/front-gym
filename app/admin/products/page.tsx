"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import ProductCard from "@/components/ui/ProductCard";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import Header from "@/components/featchers/admin/product/Header";

const LIMIT = 20;

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  async function getProducts(currentOffset: number) {
    try {
      const data: Product[] = await api.get(
        `/products?limit=${LIMIT}&offset=${currentOffset}`,
      );

      // محصولات جدید رو به قبلی‌ها اضافه کن
      setProducts((current) => [...current, ...data]);

      // اگر کمتر از 20 تا برگشت، یعنی دیگه محصولی باقی نمونده
      if (data.length < LIMIT) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function loadInitialProducts() {
      setLoading(true);

      try {
        const data: Product[] = await api.get(
          `/products?limit=${LIMIT}&offset=0`,
        );

        setProducts(data);
        setOffset(data.length);

        if (data.length < LIMIT) {
          setHasMore(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadInitialProducts();
  }, []);

  async function handleLoadMore() {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      await getProducts(offset);

      setOffset((current) => current + LIMIT);
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
    return <div className="p-6">در حال بارگذاری...</div>;
  }

  return (
    <div>
      <Header />
      <div className="flex flex-wrap gap-5 m-8 justify-center mt-20">
        {products.map((product) => (
          <div key={product.id} className="relative shrink-0">
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
      {hasMore && (
        <div className="mt-8 flex justify-center">
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
