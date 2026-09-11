import OrderCard from "@/components/featchers/admin/orders/OrderCard";
import { api } from "@/lib/api";
import { Order } from "@/types/orderTypes";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const cookieStore = await cookies();

  const orders = await api.get<Order[]>("/orders/status/paid?offset=0&limit=10", cookieStore.toString());
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            سفارش‌های من
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            مشاهده و پیگیری سفارش‌های ثبت‌شده
          </p>
        </div>

        {/* Empty */}
        {orders.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-dashed bg-card px-6 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <span className="material-symbols-outlined text-4xl text-muted-foreground">
                shopping_bag
              </span>
            </div>

            <h2 className="text-xl font-semibold">هنوز سفارشی ثبت نکرده‌اید</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              سفارش‌های شما پس از ثبت در این قسمت نمایش داده می‌شوند.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link href={`/admin/orders/${order.id}`} key={order.id}>
                <OrderCard order={order} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
