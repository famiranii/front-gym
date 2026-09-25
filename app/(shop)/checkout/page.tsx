"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAddresses } from "@/store/slices/addressSlice";
import { createOrderApi } from "@/store/slices/orderSlice";
import { getCartApi } from "@/store/slices/cartSlice";

import AddressList from "@/components/featchers/check-out/AddressList";
import OrderSummary from "@/components/featchers/check-out/OrderSummary";
import DiscountCode from "@/components/featchers/check-out/Discount";

import { CartSummary } from "@/types/cartTypes";
import { api } from "@/lib/api";
import { getImageUrl } from "@/lib/getImageUrl";

function formatPrice(price: number) {
  return price.toLocaleString("fa-IR") + " تومان";
}

type DiscountResult = {
  valid: boolean;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  discount_amount: number;
  final_subtotal: number;
};

export default function CheckoutPage() {
  const dispatch = useAppDispatch();

  const me = useAppSelector((state) => state.users.me);
  const cartItems = useAppSelector((state) => state.cart.items);

  const {
    addresses,
    loading: addressLoading,
  } = useAppSelector((state) => state.address);

  const {
    loading: orderLoading,
    error: orderError,
    currentOrder,
  } = useAppSelector((state) => state.order);

  const [appliedDiscount, setAppliedDiscount] =
    useState<DiscountResult | null>(null);

  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const defaultAddress = addresses.find((addr) => addr.is_default);

  const currentSelectedAddress =
    selectedAddress || defaultAddress?.id || "";

  /*
   * دریافت آدرس‌های کاربر
   */
  useEffect(() => {
    if (!me?.id) return;

    dispatch(fetchAddresses(me.id));
  }, [me?.id, dispatch]);

  /*
   * دریافت سبد خرید و هزینه ارسال
   */
  useEffect(() => {
    const getCartAndShippingCost = async () => {
      try {
        const shippingResponse = await api.get<{ cost: number }>(
          "/shipping-cost",
        );

        await dispatch(getCartApi());

        setShippingCost(shippingResponse.cost);
      } catch (error) {
        console.error(
          "Failed to get cart or shipping cost:",
          error,
        );
      }
    };

    getCartAndShippingCost();
  }, [dispatch]);

  /*
   * بعد از ساخته شدن Order،
   * پرداخت زرین‌پال را شروع می‌کنیم.
   *
   * اگر payment API شما بعداً redirect مستقیم بدهد،
   * این بخش باید بر اساس response همان API تنظیم شود.
   */
  useEffect(() => {
    if (!currentOrder?.id || !paymentLoading) {
      return;
    }

    const createPayment = async () => {
      try {
        setPaymentError(null);

        const response = await api.post<{
          payment_url?: string;
          url?: string;
        }>("/api/payment/zarinpal/request", {
          order_id: currentOrder.id,
        });

        const paymentUrl =
          response.payment_url ?? response.url;

        if (!paymentUrl) {
          throw new Error(
            "آدرس پرداخت از سرور دریافت نشد.",
          );
        }

        window.location.href = paymentUrl;
      } catch (error) {
        console.error("Payment creation failed:", error);

        setPaymentError(
          "خطا در ایجاد پرداخت. لطفاً دوباره تلاش کنید.",
        );

        setPaymentLoading(false);
      }
    };

    createPayment();
  }, [currentOrder, paymentLoading]);

  /*
   * مبلغ کالاها بعد از تخفیف خود محصول
   */
  const itemsTotal = cartItems.reduce(
    (sum, item) =>
      sum + item.final_price * item.quantity,
    0,
  );

  /*
   * مبلغ تخفیف کد تخفیف
   */
  const discountAmount =
    appliedDiscount?.discount_amount ?? 0;

  /*
   * مبلغ کالاها بعد از تخفیف محصول + کد تخفیف
   */
  const finalItemsTotal = Math.max(
    itemsTotal - discountAmount,
    0,
  );

  const summary: CartSummary = {
    /*
     * قیمت اصلی کالاها
     */
    total: cartItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0,
    ),

    /*
     * تخفیف خود محصولات
     */
    discount: cartItems.reduce(
      (sum, item) =>
        sum +
        (item.price - item.final_price) *
          item.quantity,
      0,
    ),

    /*
     * مبلغ قابل پرداخت کالاها
     */
    payable: finalItemsTotal,

    /*
     * تعداد کل کالاها
     */
    count: cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0,
    ),
  };

  const handleDiscountValidated = (
    result: DiscountResult | null,
  ) => {
    setAppliedDiscount(result);
  };

  const handleSubmit = () => {
    if (!currentSelectedAddress) {
      return;
    }

    if (orderLoading || paymentLoading) {
      return;
    }

    if (!me?.id) {
      setPaymentError(
        "ابتدا وارد حساب کاربری خود شوید.",
      );
      return;
    }

    setPaymentError(null);
    setPaymentLoading(true);

    /*
     * فقط Order را ایجاد می‌کنیم.
     *
     * بعد از موفقیت createOrderApi،
     * currentOrder پر می‌شود و useEffect بالا
     * درخواست پرداخت زرین‌پال را ارسال می‌کند.
     */
    dispatch(
      createOrderApi({
        address_id: currentSelectedAddress,
        discount_code:
          appliedDiscount?.code ?? "",
      }),
    );
  };

  /*
   * سبد خالی
   */
  if (cartItems.length === 0) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        dir="rtl"
      >
        <p className="text-muted-foreground">
          سبد خرید شما خالی است
        </p>
      </div>
    );
  }

  return (
    <div
      className="mx-auto max-w-4xl px-4 py-8"
      dir="rtl"
    >
      <h1 className="mb-8 text-2xl font-bold text-foreground">
        تکمیل سفارش
      </h1>

      {paymentError && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {paymentError}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          {/* کالاها */}
          <section className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
            <h2 className="border-b border-border pb-2 text-lg font-extrabold text-foreground">
              کالاها
            </h2>

            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4"
              >
                {item.image_url && (
                  <img
                    src={getImageUrl(item.image_url)}
                    alt={item.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                )}

                <div className="flex-1">
                  <p className="font-semibold text-foreground">
                    {item.name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    سایز: {item.label} | تعداد:{" "}
                    {item.quantity}
                  </p>
                </div>

                <p className="text-sm font-bold text-primary">
                  {formatPrice(
                    item.final_price *
                      item.quantity,
                  )}
                </p>
              </div>
            ))}
          </section>

          {/* کد تخفیف */}
          <DiscountCode
            subtotal={itemsTotal}
            onValidated={handleDiscountValidated}
          />

          {/* آدرس */}
          {addressLoading ? (
            <p className="text-sm text-muted-foreground">
              در حال بارگذاری آدرس‌ها...
            </p>
          ) : (
            <AddressList
              addresses={addresses}
              selectedId={currentSelectedAddress}
              id={me?.id ?? ""}
              onSelect={setSelectedAddress}
            />
          )}
        </div>

        {/* خلاصه سفارش */}
        <OrderSummary
          summary={summary}
          shippingCost={shippingCost}
          selectedAddressId={currentSelectedAddress}
          loading={
            orderLoading || paymentLoading
          }
          error={orderError}
          discountAmount={discountAmount}
          discountCode={appliedDiscount?.code}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
