import { Order } from "@/types/orderTypes";
import { statusMap } from "./statusMap";
import { formatDate, formatPrice } from "@/lib/numbersFormat";

export default function OrderCard({order}:{order:Order}) {
  const status = statusMap[order.status] ?? {
    label: order.status,
    className: "bg-muted text-muted-foreground",
    icon: "info",
  };

  return (
    <div
      key={order.id}
      className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-border
                    bg-card
                    shadow-sm
                    transition-shadow
                    hover:shadow-md
                  "
    >
      {/* Order Header */}
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
            <span className="material-symbols-outlined">receipt_long</span>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">شماره سفارش</p>

            <p className="mt-1 font-mono text-sm font-semibold">
              {order.id.slice(0, 8).toUpperCase()}
            </p>
          </div>
        </div>

        {/* Status */}
        <div
          className={`inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}
        >
          <span className="material-symbols-outlined text-[16px]">
            {status.icon}
          </span>

          {status.label}
        </div>
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Price */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[20px]">
              payments
            </span>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">مبلغ سفارش</p>

            <p className="mt-1 font-bold">
              {formatPrice(order.total_price)} تومان
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
            <span className="material-symbols-outlined text-[20px]">
              calendar_month
            </span>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">تاریخ ثبت</p>

            <p className="mt-1 text-sm font-medium">
              {formatDate(order.created_at)}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3 sm:col-span-2 lg:col-span-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
            <span className="material-symbols-outlined text-[20px]">
              location_on
            </span>
          </div>

          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">آدرس ارسال</p>

            <p className="mt-1 truncate text-sm font-medium">
              {order.address_title}
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {order.address_province}، {order.address_city}
            </p>
          </div>
        </div>
      </div>

      {/* Address Detail */}
      <div className="mx-5 mb-5 rounded-xl bg-muted/50 p-4">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined mt-0.5 text-[20px] text-muted-foreground">
            home
          </span>

          <div>
            <p className="text-xs text-muted-foreground">جزئیات آدرس</p>

            <p className="mt-1 text-sm leading-6">{order.address_detail}</p>

            <p className="mt-1 text-xs text-muted-foreground">
              کد پستی: {order.address_postal_code}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border bg-muted/20 px-5 py-4">
        <span className="text-xs text-muted-foreground">هزینه ارسال</span>

        <span className="text-sm font-semibold">
          {order.shipping_cost === 0
            ? "رایگان"
            : `${formatPrice(order.shipping_cost)} تومان`}
        </span>
      </div>
    </div>
  );
}
