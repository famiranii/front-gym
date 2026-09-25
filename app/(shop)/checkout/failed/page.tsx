"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();

  const message = searchParams.get("message");

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background text-foreground flex items-center justify-center px-4 py-8"
    >
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20">
            <svg
              className="h-10 w-10 text-destructive"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6l12 12M18 6L6 18"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center">
          <h1 className="mb-3 text-2xl font-bold text-card-foreground">
            پرداخت انجام نشد
          </h1>

          <p className="mb-8 text-sm leading-7 text-muted-foreground">
            پرداخت شما تکمیل نشد یا توسط شما لغو شد.
            <br />
            می‌توانید دوباره برای پرداخت اقدام کنید.
          </p>
        </div>

        {/* Error message */}
        {message && (
          <div className="mb-6 rounded-2xl border border-destructive/20 bg-destructive/10 p-4">
            <div className="mb-1 text-xs text-destructive">
              توضیحات
            </div>

            <div className="text-sm leading-6 text-card-foreground">
              {message}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/checkout"
            className="flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-3.5 text-sm font-bold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
          >
            تلاش مجدد برای پرداخت
          </Link>

          <Link
            href="/"
            className="flex w-full items-center justify-center rounded-2xl border border-border bg-secondary px-5 py-3.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-muted"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </div>
    </main>
  );
}
