"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { api } from "@/lib/api";
import { OrderDetail } from "@/types/orderTypes";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fa-IR").format(price);

interface OrderInvoiceProps {
  showPrintButton?: boolean;
}

export default function OrderInvoice({
  showPrintButton = true,
}: OrderInvoiceProps) {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get<OrderDetail>(`/orders/${id}`);

        setData(response);
      } catch {
        setError("سفارش یافت نشد.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex items-center justify-center bg-muted/20"
      >
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">
            progress_activity
          </span>

          <p className="text-sm text-muted-foreground">
            در حال آماده‌سازی فاکتور...
          </p>
        </div>
      </div>
    );
  }

  // Error
  if (error || !data) {
    return (
      <div dir="rtl" className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-destructive">
            error
          </span>

          <p className="mt-4 font-semibold">{error ?? "سفارش یافت نشد."}</p>
        </div>
      </div>
    );
  }

  const { order, items } = data;

  // Only paid/shipped orders
  if (order.status !== "paid" && order.status !== "shipped") {
    return (
      <div dir="rtl" className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-5xl text-amber-500">
            payments
          </span>

          <p className="mt-4 font-semibold">این سفارش هنوز پرداخت نشده است.</p>

          <p className="mt-2 text-sm text-muted-foreground">
            پس از پرداخت سفارش، فاکتور قابل مشاهده خواهد بود.
          </p>
        </div>
      </div>
    );
  }

  const isShipped = order.status === "shipped";

  return (
    <div
      dir="rtl"
      className="invoice-container w-full bg-muted/20 py-6 sm:py-10"
    >
      {/* Invoice */}
      <div
        className="
          invoice
          mx-auto
          w-full
          max-w-4xl
          overflow-hidden
          rounded-2xl
          border
          border-border/60
          bg-background
          shadow-sm
          print:max-w-none
          print:rounded-none
          print:border-0
          print:shadow-none
        "
      >
        {/* ================= HEADER ================= */}
        <div className="border-b bg-gradient-to-l from-secondary/10 to-background px-5 py-6 sm:px-8">
          <div className="flex items-start justify-between gap-6">
            {/* Title */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl">
                  receipt_long
                </span>

                <h1 className="text-xl font-bold sm:text-2xl">فاکتور سفارش</h1>
              </div>

              <p className="text-sm text-muted-foreground">
                شماره سفارش:
                <span dir="ltr" className="mr-2 font-bold text-foreground">
                  {order.id.slice(0, 8).toUpperCase()}
                </span>
              </p>
            </div>

            {/* Logo */}
            <div className="text-left">
              <strong className="block text-xl font-black tracking-wider">
                BACK GYM
              </strong>

              <span className="text-xs text-muted-foreground">
                فروشگاه ورزشی
              </span>
            </div>
          </div>
        </div>

        {/* ================= CUSTOMER ================= */}
        <div className="section px-5 py-6 sm:px-8">
          <div className="mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">
              location_on
            </span>

            <h2 className="font-bold">مشخصات گیرنده</h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Full Address */}
            <div className="rounded-xl border bg-muted/20 p-4 sm:col-span-2">
              <div className="flex gap-5 items-center mb-2">
                <span className="block text-xs text-muted-foreground">
                  آدرس کامل
                </span>
                <strong className="block text-sm">{order.address_title}</strong>
              </div>

              <strong className="block text-sm leading-7">
                {order.address_province}، {order.address_city}،{" "}
                {order.address_detail}
              </strong>
            </div>

            {/* Postal Code */}
            <div className="rounded-xl border bg-muted/20 p-4 sm:max-w-xs">
              <span className="mb-1 block text-xs text-muted-foreground">
                کد پستی
              </span>

              <strong dir="ltr" className="block text-sm tracking-wider">
                {order.address_postal_code}
              </strong>
            </div>
            {/* Phone */}
            <div className="rounded-xl border bg-muted/20 p-4">
              <span className="mb-1 block text-xs text-muted-foreground">
                شماره تماس
              </span>

              <strong dir="ltr" className="block text-sm">
                {order.user_phone}
              </strong>
            </div>
          </div>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="section px-5 pb-6 sm:px-8">
          <div className="mb-5 flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">
              shopping_bag
            </span>

            <h2 className="font-bold">اقلام سفارش</h2>
          </div>

          {/* Desktop */}
          <div className="hidden overflow-hidden rounded-xl border sm:block">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="border-b">
                  <th className="px-4 py-4 text-right">#</th>
                  <th className="px-4 py-4 text-right">محصول</th>
                  <th className="px-4 py-4 text-right">مشخصات</th>
                  <th className="px-4 py-4 text-center">تعداد</th>
                  <th className="px-4 py-4 text-left">مبلغ</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id} className="border-b last:border-b-0">
                    <td className="px-4 py-4 text-muted-foreground">
                      {index + 1}
                    </td>

                    {/* Product */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <strong className="line-clamp-2">
                          {item.product_name}
                        </strong>
                      </div>
                    </td>

                    {/* Variant */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                        {item.label && (
                          <span>
                            سایز:
                            <strong className="mr-1 text-foreground">
                              {item.label}
                            </strong>
                          </span>
                        )}

                        {item.color && (
                          <span className="flex items-center gap-2">
                            رنگ:
                            <i
                              className="h-4 w-4 rounded-full border"
                              style={{
                                backgroundColor: item.color,
                              }}
                            />
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-4 text-center font-semibold">
                      {item.quantity}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4 text-left">
                      <strong>{formatPrice(item.total_price)}</strong>

                      <small className="mr-1 text-xs text-muted-foreground">
                        تومان
                      </small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile */}
          <div className="space-y-3 sm:hidden">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="rounded-xl border bg-background p-4"
              >
                <div className="flex gap-3">
                  {item.image_url ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-muted">
                      <Image
                        src={item.image_url}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border bg-muted">
                      <span className="material-symbols-outlined text-muted-foreground">
                        image
                      </span>
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <strong className="text-sm leading-6">
                        {item.product_name}
                      </strong>

                      <span className="shrink-0 text-xs text-muted-foreground">
                        #{index + 1}
                      </span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      {item.label && (
                        <span>
                          سایز:
                          <strong className="mr-1 text-foreground">
                            {item.label}
                          </strong>
                        </span>
                      )}

                      {item.color && (
                        <span className="flex items-center gap-1">
                          رنگ:
                          <i
                            className="h-3.5 w-3.5 rounded-full border"
                            style={{
                              backgroundColor: item.color,
                            }}
                          />
                        </span>
                      )}

                      <span>
                        تعداد:
                        <strong className="mr-1 text-foreground">
                          {item.quantity}
                        </strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-3">
                  <span className="text-xs text-muted-foreground">مبلغ</span>

                  <strong className="text-sm">
                    {formatPrice(item.total_price)} تومان
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= TOTAL ================= */}
        <div className="px-5 pb-6 sm:px-8">
          <div className="rounded-2xl border bg-muted/20 p-5 sm:p-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">هزینه ارسال</span>

              <strong>
                {order.shipping_cost === 0
                  ? "رایگان"
                  : `${formatPrice(order.shipping_cost)} تومان`}
              </strong>
            </div>

            <div className="my-4 border-t" />

            <div className="flex items-center justify-between">
              <span className="font-semibold">مبلغ کل سفارش</span>

              <strong className="text-lg sm:text-xl">
                {formatPrice(order.total_price)}

                <small className="mr-1 text-xs font-normal text-muted-foreground">
                  تومان
                </small>
              </strong>
            </div>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="border-t bg-muted/20 px-5 py-5 sm:px-8">
          <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              شماره سفارش:
              <span dir="ltr" className="mr-1 font-medium text-foreground">
                {order.id}
              </span>
            </span>

            <span>
              تاریخ ثبت:
              <span className="mr-1 font-medium text-foreground">
                {new Date(order.created_at).toLocaleDateString("fa-IR")}
              </span>
            </span>
          </div>

          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            از خرید شما از BACK GYM سپاسگزاریم ❤️
          </p>
        </div>
      </div>

      {/* ================= PRINT BUTTON ================= */}
      {showPrintButton && (
        <div className="mx-auto mt-5 max-w-4xl print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-secondary
              px-6
              py-3.5
              text-sm
              font-semibold
              text-secondary-foreground
              shadow-sm
              transition-all
              hover:opacity-90
              active:scale-[0.98]
            "
          >
            <span className="material-symbols-outlined text-[20px]">print</span>
            چاپ فاکتور
          </button>
        </div>
      )}
    </div>
  );
}
