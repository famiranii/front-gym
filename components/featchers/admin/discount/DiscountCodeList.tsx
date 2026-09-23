"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type DiscountCode = {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  min_order_amount: number;
  max_discount_amount: number | null;
  usage_limit: number | null;
  used_count: number;
  starts_at: string | null;
  expires_at: string | null;
  is_active: boolean;
};

type DiscountCodeListProps = {
  refreshKey: number;
};

function formatPrice(value: number) {
  return `${value.toLocaleString("fa-IR")} تومان`;
}

function formatDate(value: string | null) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("fa-IR");
}

export default function DiscountCodeList({
  refreshKey,
}: DiscountCodeListProps) {
  const [items, setItems] = useState<DiscountCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchDiscountCodes = async () => {
    try {
      setLoading(true);

      const response = await api.get<DiscountCode[]>("/discount-codes");

      setItems(response);
    } catch (error) {
      console.error("Failed to fetch discount codes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscountCodes();
  }, [refreshKey]);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("آیا از حذف این کد تخفیف مطمئن هستید؟");

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await api.delete(`/discount-codes/${id}`);

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete discount code:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-sm text-muted-foreground">
        در حال بارگذاری کدهای تخفیف...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <p className="text-sm text-muted-foreground">
          هنوز کد تخفیفی ایجاد نشده است.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <h2 className="text-lg font-bold text-foreground">کدهای تخفیف</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-right">
              <th className="px-5 py-4 font-semibold">کد</th>

              <th className="px-5 py-4 font-semibold">تخفیف</th>

              <th className="px-5 py-4 font-semibold">حداقل سفارش</th>

              <th className="px-5 py-4 font-semibold">استفاده</th>

              <th className="px-5 py-4 font-semibold">شروع</th>

              <th className="px-5 py-4 font-semibold">پایان</th>

              <th className="px-5 py-4 font-semibold">وضعیت</th>

              <th className="px-5 py-4 font-semibold">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border last:border-0"
              >
                <td className="px-5 py-4">
                  <span className="rounded-lg bg-muted px-3 py-1.5 font-mono font-bold">
                    {item.code}
                  </span>
                </td>

                <td className="px-5 py-4 font-semibold">
                  {item.discount_type === "percentage"
                    ? `${item.discount_value.toLocaleString("fa-IR")}%`
                    : formatPrice(item.discount_value)}
                </td>

                <td className="px-5 py-4">
                  {formatPrice(item.min_order_amount)}
                </td>

                <td className="px-5 py-4">
                  {item.used_count.toLocaleString("fa-IR")}
                  {" / "}
                  {item.usage_limit === null
                    ? "∞"
                    : item.usage_limit.toLocaleString("fa-IR")}
                </td>

                <td className="px-5 py-4">{formatDate(item.starts_at)}</td>

                <td className="px-5 py-4">{formatDate(item.expires_at)}</td>

                <td className="px-5 py-4">
                  {item.is_active ? (
                    <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">
                      فعال
                    </span>
                  ) : (
                    <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                      غیرفعال
                    </span>
                  )}
                </td>

                <td className="px-5 py-4">
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="rounded-lg px-3 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
                  >
                    {deletingId === item.id ? "در حال حذف..." : "حذف"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
