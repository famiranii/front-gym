import OrderCard from "@/components/featchers/admin/orders/OrderCard";
import { api } from "@/lib/api";
import { Order } from "@/types/orderTypes";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CustomerOrdersPage({ params }: Props) {
  const { id } = await params;

  let orders: Order[] = [];
  try {
    orders = await api.get<Order[]>(`/admin/orders/${id}`);
  } catch {
    orders = [];
  }
  console.log(orders);
  return (
    <main dir="rtl" className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">
              receipt_long
            </span>
            <h1 className="text-xl font-bold text-foreground">سفارشات مشتری</h1>
          </div>
          <div className="rounded-xl border border-border bg-card px-4 py-2">
            <span className="text-sm text-muted-foreground">تعداد سفارشات</span>
            <span className="mr-2 font-semibold text-primary">
              {orders.length}
            </span>
          </div>
        </div>

        {/* Empty */}
        {orders.length === 0 && (
          <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
            <span className="material-symbols-outlined text-5xl text-muted-foreground/30">
              receipt_long
            </span>
            <h2 className="mt-4 font-semibold">سفارشی وجود ندارد</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              این مشتری هنوز سفارشی ثبت نکرده است.
            </p>
          </div>
        )}

        {/* Orders */}
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <Link href={`/admin/orders/${order.id}`} key={order.id}>
              <OrderCard order={order} />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
