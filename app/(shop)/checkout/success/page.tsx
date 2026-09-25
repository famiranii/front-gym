"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();

  const refId = searchParams.get("ref_id");
  const paymentId = searchParams.get("payment_id");

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success/10 border border-success/20">
            <svg
              className="h-10 w-10 text-success"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="mb-3 text-2xl font-bold text-card-foreground">
            پرداخت با موفقیت انجام شد
          </h1>

          <p className="mb-8 text-sm leading-7 text-muted-foreground">
            پرداخت شما با موفقیت ثبت شد.
            <br />
            از خرید شما سپاسگزاریم.
          </p>
        </div>

        {/* Payment info */}
        <div className="space-y-3">
          {refId && (
            <div className="rounded-2xl border border-border bg-muted p-4">
              <div className="mb-1 text-xs text-muted-foreground">
                شماره پیگیری
              </div>

              <div
                dir="ltr"
                className="font-mono text-base font-semibold text-card-foreground"
              >
                {refId}
              </div>
            </div>
          )}

          {paymentId && (
            <div className="rounded-2xl border border-border bg-muted p-4">
              <div className="mb-1 text-xs text-muted-foreground">
                شناسه پرداخت
              </div>

              <div
                dir="ltr"
                className="font-mono text-base font-semibold text-card-foreground"
              >
                {paymentId}
              </div>
            </div>
          )}
        </div>

        {/* Action */}
        <Link
          href="/"
          className="mt-6 flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    </main>
  );
}
