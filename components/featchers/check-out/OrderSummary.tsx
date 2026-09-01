// components/checkout/OrderSummary.tsx

"use client";

import { CartSummary } from "@/types/cartTypes";


function formatPrice(n: number) {
  return n.toLocaleString("fa-IR");
}

type Props = {
  summary: CartSummary;
  selectedAddressId: string;
  token: string;
  onNext?: () => void;
};

export default function OrderSummary({
  summary,
  selectedAddressId,
  token,
  onNext,
}: Props) {
  const handleNext = () => {
    if (!selectedAddressId) {
      alert("لطفاً آدرس را انتخاب کنید");
      return;
    }
    onNext?.();
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-5 sticky top-32 flex flex-col gap-4 shadow-sm">
      <h3 className="text-lg font-extrabold text-foreground border-b border-border pb-3">
        خلاصه سفارش
      </h3>

      <div className="flex flex-col gap-3 py-1">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            مبلغ کل ({summary.count} کالا)
          </span>
          <span className="text-sm text-foreground">
            {formatPrice(summary.total)} تومان
          </span>
        </div>

        {summary.discount > 0 && (
          <div className="flex justify-between items-center text-destructive">
            <span className="text-sm">تخفیف کالاها</span>
            <span className="text-sm">
              - {formatPrice(summary.discount)} تومان
            </span>
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">هزینه ارسال</span>
          <span className="text-sm text-muted-foreground">وابسته به آدرس</span>
        </div>
      </div>

      <div className="flex justify-between items-center border-t border-border pt-3">
        <span className="text-sm font-bold text-foreground">
          مبلغ قابل پرداخت
        </span>
        <span className="text-xl font-extrabold text-foreground">
          {formatPrice(summary.payable)} تومان
        </span>
      </div>

      <button
        onClick={handleNext}
        disabled={!selectedAddressId}
        className="w-full py-3.5 rounded-xl bg-secondary text-secondary-foreground text-sm font-bold hover:opacity-90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ادامه به مرحله بعد
      </button>
    </div>
  );
}
