"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { OrderDetail } from "@/types/orderTypes";

import OrderStatus from "@/components/featchers/orders/OrderStatus";
import OrderItems from "@/components/featchers/orders/OrderItems";
import OrderAddress from "@/components/featchers/orders/OrderAddress";
import OrderPriceSummary from "@/components/featchers/orders/OrderPriceSummary";

type PaymentResponse = {
  payment_url?: string;
  authority?: string;
  url?: string;
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [data, setData] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*
   * Initial fetch
   *
   * این تابع فقط در callback مربوط به Promise
   * state را تغییر می‌دهد.
   */
  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    api
      .get<OrderDetail>(`/orders/${id}`)
      .then((result) => {
        if (cancelled) return;

        setData(result);
        setError(null);
      })
      .catch(() => {
        if (cancelled) return;

        setError("سفارش یافت نشد");
      })
      .finally(() => {
        if (cancelled) return;

        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  /*
   * Retry
   *
   * این تابع از button اجرا می‌شود، نه از useEffect.
   */
  const handleRetry = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const result = await api.get<OrderDetail>(`/orders/${id}`);

      setData(result);
    } catch {
      setError("سفارش یافت نشد");
    } finally {
      setLoading(false);
    }
  }, [id]);

  /*
   * Payment
   */
  const handlePay = async () => {
    if (!id || !data || paying) return;

    setPaying(true);
    setError(null);

    try {
      const response = await api.post<PaymentResponse>(
        "/api/payment/zarinpal/request",
        {
          order_id: id,
        },
      );

      const paymentUrl =
        response.payment_url ??
        response.url ??
        (response.authority
          ? `https://sandbox.zarinpal.com/pg/StartPay/${response.authority}`
          : null);

      if (!paymentUrl) {
        throw new Error("آدرس پرداخت دریافت نشد");
      }

      window.location.href = paymentUrl;
    } catch (err) {
      console.error("Payment error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "خطا در ایجاد پرداخت. لطفاً دوباره تلاش کنید.",
      );

      setPaying(false);
    }
  };

  /*
   * Loading
   */
  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-background text-foreground"
      >
        <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-4">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-primary" />

            <p className="text-sm text-muted-foreground">
              در حال بارگذاری سفارش...
            </p>
          </div>
        </div>
      </main>
    );
  }

  /*
   * Error / Not found
   */
  if (error || !data) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-background text-foreground"
      >
        <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center justify-center px-4">
          <div className="w-full rounded-3xl border border-border bg-card p-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <span className="material-symbols-outlined text-3xl text-destructive">
                error
              </span>
            </div>

            <h1 className="mb-2 text-lg font-bold text-card-foreground">
              خطایی رخ داد
            </h1>

            <p className="mb-6 text-sm text-muted-foreground">
              {error ?? "سفارش یافت نشد"}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleRetry}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:brightness-110"
              >
                <span className="material-symbols-outlined text-lg">
                  refresh
                </span>

                تلاش مجدد
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-5 py-3 text-sm font-medium text-secondary-foreground transition hover:bg-muted"
              >
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>

                بازگشت
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const { order, items } = data;

  const isPending = order.status === "pending";

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background text-foreground"
    >
      <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            aria-label="بازگشت"
          >
            <span className="material-symbols-outlined">
              arrow_forward
            </span>
          </button>

          <div className="min-w-0">
            <h1 className="text-xl font-bold text-foreground">
              جزئیات سفارش
            </h1>

            <p
              dir="ltr"
              className="mt-1 truncate text-right font-mono text-xs text-muted-foreground"
            >
              #{order.id}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-4">
            <span className="material-symbols-outlined shrink-0 text-xl text-destructive">
              error
            </span>

            <p className="text-sm leading-6 text-card-foreground">
              {error}
            </p>
          </div>
        )}

        <div className="space-y-4">
          {/* Status */}
          <OrderStatus
            status={order.status}
            createdAt={order.created_at}
          />

          {/* Pending Payment */}
          {isPending && (
            <div className="rounded-2xl border border-warning/20 bg-warning/10 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-warning/10">
                  <span className="material-symbols-outlined text-warning">
                    payments
                  </span>
                </div>

                <div className="flex-1">
                  <h2 className="text-sm font-bold text-card-foreground">
                    سفارش در انتظار پرداخت است
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    برای تکمیل سفارش، پرداخت را انجام دهید.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePay}
                disabled={paying}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-neutral disabled:text-muted-foreground"
              >
                {paying ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                    در حال انتقال به درگاه...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">
                      payments
                    </span>
                    پرداخت سفارش
                  </>
                )}
              </button>
            </div>
          )}

          {/* Paid */}
          {order.status === "paid" && (
            <div className="flex items-center gap-3 rounded-2xl border border-success/20 bg-success/10 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success/10">
                <span className="material-symbols-outlined text-success">
                  check_circle
                </span>
              </div>

              <div>
                <p className="text-sm font-bold text-card-foreground">
                  پرداخت با موفقیت انجام شده است
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  سفارش شما در حال پردازش است.
                </p>
              </div>
            </div>
          )}

          {/* Items */}
          <OrderItems items={items} />

          {/* Address */}
          <OrderAddress order={order} />

          {/* Price */}
          <OrderPriceSummary order={order} />
        </div>
      </div>
    </main>
  );
}

