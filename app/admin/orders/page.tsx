"use client";

import OrderCard from "@/components/featchers/admin/orders/OrderCard";
import OrderSearchBar from "@/components/featchers/admin/orders/OrderSearchBar";
import { api } from "@/lib/api";
import { getTodayJalali, jalaliInputToGregorian } from "@/lib/jalali";
import { Order } from "@/types/orderTypes";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type OrderStatus = "paid" | "shipped";

const LIMIT = 10;

export default function Page() {
  const [status, setStatus] = useState<OrderStatus>("paid");
  const [jalaliDate, setJalaliDate] = useState(getTodayJalali);
  const [showAllPaid, setShowAllPaid] = useState(false);
  const [search, setSearch] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const searchingBySerial = search.length > 0;
  const gregorianDate = jalaliInputToGregorian(jalaliDate);
  const dateIsRequired = status !== "paid" || !showAllPaid;
  const hasInvalidDate = dateIsRequired && !searchingBySerial && !gregorianDate;

  const getOrdersUrl = useCallback((nextOffset: number) => {
    const params = new URLSearchParams({
      limit: String(LIMIT),
      offset: String(nextOffset),
    });

    // Serial searches intentionally ignore the date so an admin can find an
    // old payment without first knowing its registration day.
    if (searchingBySerial) {
      params.set("search", search);
    } else if (!(status === "paid" && showAllPaid) && gregorianDate) {
      params.set("date", gregorianDate);
    }

    return `/admin/orders/status/${status}?${params.toString()}`;
  }, [gregorianDate, search, searchingBySerial, showAllPaid, status]);

  // وقتی تب عوض شد، لیست را از اول می‌گیریم
  useEffect(() => {
    const fetchOrders = async () => {
      if (hasInvalidDate) {
        setOrders([]);
        setHasMore(false);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const result = await api.get<Order[]>(
          getOrdersUrl(0),
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
  }, [getOrdersUrl, hasInvalidDate]);

  // گرفتن صفحه بعدی
  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore || hasInvalidDate) return;

    try {
      setLoadingMore(true);

      const result = await api.get<Order[]>(
        getOrdersUrl(offset),
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
  }, [getOrdersUrl, hasInvalidDate, hasMore, loadingMore, offset]);

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
  }, [loadMore]);

  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-xl font-bold text-foreground">سفارش‌ها</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              سفارش‌های ثبت‌شده در تاریخ انتخاب‌شده را بررسی کنید.
            </p>
          </div>

          <OrderSearchBar value={search} onSearch={setSearch} />
        </div>

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

        <div className="mb-6 rounded-2xl border bg-card p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <label className="block sm:max-w-55">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <span className="material-symbols-outlined text-[17px]">calendar_month</span>
                تاریخ ثبت سفارش (شمسی)
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={jalaliDate}
                disabled={status === "paid" && showAllPaid}
                onChange={(event) => setJalaliDate(event.target.value)}
                placeholder="۱۴۰۵/۰۱/۰۱"
                className="h-11 w-full rounded-xl border bg-background px-3 text-left text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
                dir="ltr"
              />
              {hasInvalidDate && (
                <span className="mt-1 block text-xs text-destructive">
                  تاریخ را به شکل ۱۴۰۵/۰۱/۰۱ وارد کنید.
                </span>
              )}
            </label>

            {status === "paid" && (
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  checked={showAllPaid}
                  onChange={(event) => setShowAllPaid(event.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                نمایش همهٔ پرداخت‌شده‌ها (بدون محدودیت تاریخ)
              </label>
            )}
          </div>

          {searchingBySerial && (
            <p className="mt-3 rounded-xl bg-primary/8 px-3 py-2 text-xs text-primary">
              جست‌وجوی سریال پرداخت مستقل از تاریخ انجام می‌شود.
            </p>
          )}
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
