"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { api } from "@/lib/api";
import { OrderDetail } from "@/types/orderTypes";

import OrderStatus from "@/components/featchers/orders/OrderStatus";
import OrderItems from "@/components/featchers/orders/OrderItems";
import OrderAddress from "@/components/featchers/orders/OrderAddress";
import OrderPriceSummary from "@/components/featchers/orders/OrderPriceSummary";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [shipping, setShipping] = useState(false);
  const [data, setData] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleShip = async () => {
    setShipping(true);
    setError(null);

    try {
      await api.patch(`/orders/${id}/status`, {
        status: "shipped",
      });

      setData((prev) =>
        prev
          ? {
              ...prev,
              order: {
                ...prev.order,
                status: "shipped",
              },
            }
          : prev,
      );
    } catch {
      setError("خطا در ثبت ارسال سفارش");
    } finally {
      setShipping(false);
    }
  };

  const handlePrintInvoice = () => {
    router.push(`/invoice/${id}`);
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

  const isPaid = order.status === "paid";
  const isShipped = order.status === "shipped";

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-8 print:max-w-none print:px-0 print:py-0"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 print:hidden">
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

        {/* Actions */}
        {(isPaid || isShipped) && (
          <div className="space-y-3 print:hidden">
            {/* چاپ فاکتور */}
            <PrimaryButton
              type="button"
              icon="print"
              onClick={handlePrintInvoice}
            >
              چاپ فاکتور
            </PrimaryButton>

            {/* ارسال سفارش */}
            {isPaid && (
              <PrimaryButton
                type="button"
                icon="local_shipping"
                loading={shipping}
                onClick={handleShip}
              >
                ثبت به عنوان ارسال شده
              </PrimaryButton>
            )}
          </div>
        )}

        <OrderItems items={items} />

        <OrderAddress order={order} />

        <OrderPriceSummary order={order} />
      </div>
    </div>
  );
}
