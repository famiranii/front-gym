"use client";

import { CartSummary } from "@/types/cartTypes";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

type Props = {
  summary: CartSummary;
  shippingCost: number;
  selectedAddressId: string;
  loading: boolean;
  error: string | null;
  discountAmount?: number;
  discountCode?: string;
  onSubmit: () => void;
};

export default function OrderSummary({
  summary,
  shippingCost,
  selectedAddressId,
  loading,
  error,
  discountAmount = 0,
  discountCode,
  onSubmit,
}: Props) {
  const total = summary.payable + shippingCost;

  const handleSubmit = () => {
    if (!selectedAddressId) {
      alert("لطفاً آدرس را انتخاب کنید");
      return;
    }

    onSubmit();
  };

  return (
    <div className="space-y-4">
      <section className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <h2 className="border-b border-border pb-2 text-lg font-extrabold text-foreground">
          خلاصه سفارش
        </h2>

        {/* جمع کالاها */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            جمع کالاها
          </span>

          <span className="text-foreground">
            {formatPrice(summary.payable)} تومان
          </span>
        </div>

        {/* کد تخفیف */}
        {discountAmount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              تخفیف
              {discountCode && (
                <span className="mr-1 font-medium text-primary">
                  ({discountCode})
                </span>
              )}
            </span>

            <span className="font-semibold text-primary">
              - {formatPrice(discountAmount)} تومان
            </span>
          </div>
        )}

        {/* هزینه ارسال */}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            هزینه ارسال
          </span>

          <span className="text-foreground">
            {shippingCost === 0
              ? "رایگان"
              : `${formatPrice(shippingCost)} تومان`}
          </span>
        </div>

        {/* مبلغ نهایی */}
        <div className="flex justify-between border-t border-border pt-3 font-bold">
          <span className="text-foreground">
            مبلغ قابل پرداخت
          </span>

          <span className="text-lg text-primary">
            {formatPrice(total)} تومان
          </span>
        </div>
      </section>

      {error && (
        <p className="text-center text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={!selectedAddressId || loading}
        className="w-full rounded-2xl bg-primary py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90 disabled:bg-neutral disabled:text-muted-foreground"
      >
        {loading ? "در حال ثبت..." : "ثبت سفارش"}
      </button>
    </div>
  );
}