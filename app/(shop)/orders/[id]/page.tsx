"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { OrderDetail } from "@/types/orderTypes";
import OrderStatus from "@/components/featchers/orders/OrderStatus";
import OrderItems from "@/components/featchers/orders/OrderItems";
import OrderAddress from "@/components/featchers/orders/OrderAddress";
import OrderPriceSummary from "@/components/featchers/orders/OrderPriceSummary";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [paying, setPaying] = useState(false);
  const [data, setData] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    setPaying(true);
    try {
      await api.patch(`/orders/${id}/status`, { status: "paid" });
      setData((prev) =>
        prev ? { ...prev, order: { ...prev.order, status: "paid" } } : prev,
      );
    } catch {
      setError("خطا در پرداخت");
    } finally {
      setPaying(false);
    }
  };
  useEffect(() => {
    api
      .get<OrderDetail>(`/orders/${id}`)
      .then(setData)
      .catch(() => setError("سفارش یافت نشد"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">در حال بارگذاری...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-destructive">{error ?? "سفارش یافت نشد"}</p>
      </div>
    );
  }

  const { order, items } = data;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" dir="rtl">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.back()}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <h1 className="text-xl font-bold text-foreground">جزئیات سفارش</h1>
      </div>

      <div className="space-y-4">
        <OrderStatus status={order.status} createdAt={order.created_at} />
        {data.order.status === "pending" && (
          <button
            onClick={handlePay}
            disabled={paying}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-neutral disabled:text-muted-foreground text-primary-foreground font-bold py-3 rounded-2xl transition-colors"
          >
            {paying ? "در حال پرداخت..." : "پرداخت"}
          </button>
        )}
        <OrderItems items={items} />
        <OrderAddress order={order} />
        <OrderPriceSummary order={order} />
      </div>
    </div>
  );
}
