"use client";

import { Order } from "@/types/orderTypes";

function formatPrice(price: number) {
  return `${price.toLocaleString("fa-IR")} تومان`;
}

type Props = {
  order: Order;
};

export default function OrderPriceSummary({ order }: Props) {
  const discountAmount = Number(order.discount_amount ?? 0);
  const shippingCost = Number(order.shipping_cost ?? 0);
  const totalPrice = Number(order.total_price ?? 0);

  const finalAmount = Math.max(
    totalPrice - discountAmount + shippingCost,
    0,
  );

  return (
    <section
      className="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-sm"
      dir="rtl"
    >
      <h2 className="border-b border-border pb-2 text-lg font-extrabold text-foreground">
        خلاصه مبلغ سفارش
      </h2>

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">جمع کالاها</span>

        <span className="font-medium text-foreground">
          {formatPrice(totalPrice)}
        </span>
      </div>

      {discountAmount > 0 && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            تخفیف
            {order.discount_code && (
              <span className="mr-1 font-medium text-primary">
                ({order.discount_code})
              </span>
            )}
          </span>

          <span className="font-bold text-primary">
            - {formatPrice(discountAmount)}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">هزینه ارسال</span>

        <span className="font-medium text-foreground">
          {shippingCost === 0
            ? "رایگان"
            : formatPrice(shippingCost)}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-border pt-3">
        <span className="font-bold text-foreground">
          مبلغ نهایی
        </span>

        <span className="text-lg font-extrabold text-primary">
          {formatPrice(finalAmount)}
        </span>
      </div>
    </section>
  );
}