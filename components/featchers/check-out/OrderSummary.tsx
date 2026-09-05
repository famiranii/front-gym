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
  onSubmit: () => void;
};

export default function OrderSummary({
  summary,
  shippingCost,
  selectedAddressId,
  loading,
  error,
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
      <section className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-3">
        <h2 className="text-lg font-extrabold text-foreground border-b border-border pb-2">
          خلاصه سفارش
        </h2>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">جمع کالاها</span>
          <span className="text-foreground">
            {formatPrice(summary.payable)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">هزینه ارسال</span>
          <span className="text-foreground">
            {shippingCost === 0
              ? "رایگان"
              : formatPrice(shippingCost) + " تومان"}
          </span>
        </div>
        <div className="flex justify-between font-bold border-t border-border pt-3">
          <span className="text-foreground">مبلغ قابل پرداخت</span>
          <span className="text-primary">{formatPrice(total)} تومان</span>
        </div>
      </section>

      {error && <p className="text-destructive text-sm text-center">{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={!selectedAddressId || loading}
        className="w-full bg-primary hover:bg-primary/90 disabled:bg-neutral disabled:text-muted-foreground text-primary-foreground font-bold py-3 rounded-2xl transition-colors"
      >
        {loading ? "در حال ثبت..." : "ثبت سفارش"}
      </button>
    </div>
  );
}
