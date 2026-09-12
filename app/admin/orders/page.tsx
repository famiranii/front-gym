"use client";

import OrderCard from "@/components/featchers/admin/orders/OrderCard";
import { api } from "@/lib/api";
import { Order } from "@/types/orderTypes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type OrderStatus = "paid" | "shipped";

const LIMIT = 10;

export default function Page() {
  const [status, setStatus] = useState<OrderStatus>("paid");

  const [orders, setOrders] = useState<Order[]>([]);
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // وقتی تب عوض شد، لیست را از اول می‌گیریم
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const result = await api.get<Order[]>(
          `/orders/status/${status}?offset=0&limit=${LIMIT}`,
        );

        setOrders(result);
        setOffset(LIMIT);

        // اگر کمتر از limit برگشت، یعنی دیگه چیزی نداریم
        setHasMore(result.length === LIMIT);
      } catch (error) {
        console.error(error);
        setOrders([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [status]);

  // گرفتن صفحه بعدی
  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      const result = await api.get<Order[]>(
        `/orders/status/${status}?offset=${offset}&limit=${LIMIT}`,
      );

      setOrders((prev) => [...prev, ...result]);

      setOffset((prev) => prev + result.length);

      // اگر کمتر از 10 تا برگشت یعنی آخر لیست
      if (result.length < LIMIT) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingMore(false);
    }
  };

  // تشخیص رسیدن به انتهای لیست
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
      },
    );

    const element = observerRef.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [offset, status, loadingMore, hasMore]);

  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
          <h2 className="m-6">
            مشاهده و پیگیری سفارش‌های ثبت‌شده
          </h2>

        {/* Tabs */}
        <div className="mb-6 flex gap-2 rounded-2xl border bg-card p-2">
          <button
            type="button"
            onClick={() => setStatus("paid")}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              status === "paid"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            پرداخت شده
          </button>

          <button
            type="button"
            onClick={() => setStatus("shipped")}
            className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              status === "shipped"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            ارسال شده
          </button>
        </div>

        {/* Loading first page */}
        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <span className="material-symbols-outlined animate-spin text-4xl">
                progress_activity
              </span>

              <p className="text-sm text-muted-foreground">
                در حال دریافت سفارش‌ها...
              </p>
            </div>
          </div>
        ) : orders.length === 0 ? (
          /* Empty */
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed bg-card px-6 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <span className="material-symbols-outlined text-4xl text-muted-foreground">
                shopping_bag
              </span>
            </div>

            <h2 className="text-xl font-semibold">
              {status === "paid"
                ? "سفارش پرداخت‌شده‌ای ندارید"
                : "سفارش ارسال‌شده‌ای ندارید"}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              سفارش‌های شما در این قسمت نمایش داده می‌شوند.
            </p>
          </div>
        ) : (
          <>
            {/* Orders */}
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  href={`/admin/orders/${order.id}`}
                  key={order.id}
                  className="block"
                >
                  <OrderCard order={order} />
                </Link>
              ))}
            </div>

            {/* Scroll sentinel */}
            <div
              ref={observerRef}
              className="flex min-h-24 items-center justify-center"
            >
              {loadingMore && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="material-symbols-outlined animate-spin">
                    progress_activity
                  </span>
                  در حال دریافت سفارش‌های بیشتر...
                </div>
              )}

              {!hasMore && (
                <span className="text-xs text-muted-foreground">
                  همه سفارش‌ها نمایش داده شدند.
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
