import { OrdersType } from "@/types/dashboardInfo";
import Link from "next/link";

const statusLabels: Record<string, string> = {
  pending: "در انتظار پرداخت",
  paid: "پرداخت شده",
  shipped: "در حال ارسال",
  delivered: "تحویل شده",
};

const statusClasses: Record<string, string> = {
  pending: "bg-warning/10 text-warning",
  paid: "bg-primary/10 text-primary",
  shipped: "bg-blue-500/10 text-blue-400",
  delivered: "bg-success/10 text-success",
};

export default function RecentOrders({ orders }: { orders: OrdersType[] }) {
  return (
    <section className="rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div>
          <h2 className="font-semibold">آخرین سفارش‌ها</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            آخرین سفارش‌های ثبت‌شده
          </p>
        </div>

        <a
          href="/admin/orders"
          className="flex items-center gap-1 text-sm text-primary transition-opacity hover:opacity-80"
        >
          مشاهده همه
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
        </a>
      </div>
      <div className="divide-y divide-border">
        {orders.map((order) => (
          <Link
            href={`/admin/orders/${order.id}`}
            key={order.id}
            className="flex items-center justify-between gap-4 p-5"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                <span className="material-symbols-outlined text-muted-foreground">
                  person
                </span>
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {order.customer_name}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">{order.id}</p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-2">
              <span className="text-sm font-semibold">
                {order.total_price} تومان
              </span>

              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  statusClasses[order.status]
                }`}
              >
                {statusLabels[order.status]}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
