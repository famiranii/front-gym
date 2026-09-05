"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchMyOrdersApi } from "@/store/slices/orderSlice";
import Link from "next/link";
import { Order } from "@/types/orderTypes";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR") + " تومان";
}

const statusMap: Record<string, { label: string; color: string; icon: string }> = {
  pending: { label: "در انتظار پرداخت", color: "text-warning", icon: "schedule" },
  paid: { label: "پرداخت شده", color: "text-success", icon: "check_circle" },
  shipped: { label: "ارسال شده", color: "text-primary", icon: "local_shipping" },
  delivered: { label: "تحویل داده شده", color: "text-success", icon: "inventory" },
  cancelled: { label: "لغو شده", color: "text-destructive", icon: "cancel" },
};

function OrderCard({ order }: { order: Order }) {
  const status = statusMap[order.status] ?? { label: order.status, color: "text-foreground", icon: "info" };

  return (
    <Link href={`/orders/${order.id}`}>
      <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-4 hover:border-neutral transition-colors cursor-pointer">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0">
          <span className={`material-symbols-outlined text-xl ${status.color}`}>
            {status.icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground">
            {new Date(order.created_at).toLocaleDateString("fa-IR")}
          </p>
          <p className={`text-sm font-semibold ${status.color}`}>{status.label}</p>
        </div>
        <div className="text-left shrink-0">
          <p className="font-bold text-primary text-sm">{formatPrice(order.total_price)}</p>
        </div>
        <span className="material-symbols-outlined text-muted-foreground text-lg">
          chevron_left
        </span>
      </div>
    </Link>
  );
}

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const { orders, loading, error } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchMyOrdersApi());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-xl font-bold text-foreground mb-6">سفارش‌های من</h1>

      {error && <p className="text-destructive text-sm mb-4">{error}</p>}

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <span className="material-symbols-outlined text-5xl text-muted-foreground">
            shopping_bag
          </span>
          <p className="text-muted-foreground">هنوز سفارشی ثبت نکرده‌اید</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}