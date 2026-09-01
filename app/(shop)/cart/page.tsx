"use client";

import { useEffect, useMemo } from "react";
import {
  clearCartApi,
  getCartApi,
  removeFromCart,
} from "@/store/slices/cartSlice";
import { CartItemType } from "@/types/cartTypes";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import CartItem from "@/components/featchers/cart/CartItem";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Link from "next/link";

export default function Page() {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cart.items);
  const loading = useAppSelector((state) => state.cart.loading);

  useEffect(() => {
    dispatch(getCartApi());
  }, [dispatch]);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const totalPriceWithDiscount = useMemo(
    () =>
      items.reduce((sum, item) => sum + item.final_price * item.quantity, 0),
    [items],
  );
  const handleClearCart = async () => {
    const confirmed = window.confirm(
      "آیا مطمئن هستید که می‌خواهید تمام محصولات سبد خرید را حذف کنید؟",
    );

    if (!confirmed) return;

    try {
      await dispatch(clearCartApi()).unwrap();

      // toast.success("سبد خرید با موفقیت خالی شد");
    } catch (error) {
      // toast.error(String(error));
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-3xl">
          progress_activity
        </span>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">سبد خرید</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            {totalItems.toLocaleString("fa-IR")} کالا در سبد خرید شما
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={handleClearCart}
            className="group flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-sm font-bold text-destructive transition-all hover:border-destructive/30 hover:bg-destructive/10 active:scale-[0.97]"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110">
              delete_sweep
            </span>

            <span>حذف همه</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl border border-border bg-muted/20">
          <span className="material-symbols-outlined mb-4 text-6xl text-muted-foreground">
            shopping_cart
          </span>

          <h2 className="text-lg font-bold text-foreground">
            سبد خرید شما خالی است
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            هنوز محصولی به سبد خرید اضافه نکرده‌اید.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Products */}
          <div className="space-y-3 lg:col-span-2">
            {items.map((item: CartItemType) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Summary */}
          <div className="h-fit rounded-2xl border border-border bg-card p-5 lg:sticky lg:top-6">
            <h2 className="mb-5 text-lg font-bold">خلاصه سفارش</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">تعداد کالا</span>

                <span className="font-semibold">
                  {totalItems.toLocaleString("fa-IR")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">قیمت کالاها</span>

                <span className="font-semibold">
                  {totalPrice.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  قیمت کالاها بعد از تخفیف
                </span>

                <span className="font-semibold">
                  {totalPriceWithDiscount.toLocaleString("fa-IR")} تومان
                </span>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold">مبلغ قابل پرداخت</span>

                  <span className="text-xl font-extrabold">
                    {totalPriceWithDiscount.toLocaleString("fa-IR")}
                    <span className="mr-1 text-xs font-normal">تومان</span>
                  </span>
                </div>
              </div>
            </div>

            <Link className="mt-4" href={"/checkout"}>
              <PrimaryButton>
                <div className="material-symbols-outlined p-0 m-0">
                  shopping_cart_checkout
                </div>
                <p> ادامه و پرداخت</p>
              </PrimaryButton>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
