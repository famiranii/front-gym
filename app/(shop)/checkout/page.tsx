"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAddresses } from "@/store/slices/addressSlice";
import { createOrderApi } from "@/store/slices/orderSlice";
import { useRouter } from "next/navigation";
import AddressList from "@/components/featchers/check-out/AddressList";
import OrderSummary from "@/components/featchers/check-out/OrderSummary";
import { CartSummary } from "@/types/cartTypes";
import { api } from "@/lib/api";
import { getCartApi } from "@/store/slices/cartSlice";

function formatPrice(price: number) {
  return price.toLocaleString("fa-IR") + " تومان";
}

export default function CheckoutPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const me = useAppSelector((state) => state.users.me);
  const cartItems = useAppSelector((state) => state.cart.items);
  const { addresses, loading: addressLoading } = useAppSelector(
    (state) => state.address,
  );
  const {
    loading: orderLoading,
    error: orderError,
    currentOrder,
  } = useAppSelector((state) => state.order);

  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [shippingCost, setShippingCost] = useState<number>(0);

  useEffect(() => {
    if (me?.id) dispatch(fetchAddresses(me.id));
  }, [me, dispatch]);

  useEffect(() => {
    const getCartAndCost = async () => {
      const shippingCost: { cost: number } = await api.get("/shipping-cost");
      await dispatch(getCartApi());
      console.log(shippingCost);
      setShippingCost(shippingCost.cost);
    };
    getCartAndCost();
  }, []);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const def = addresses.find((a) => a.is_default) ?? addresses[0];
      setSelectedAddress(def.id);
    }
  }, [addresses]);

  useEffect(() => {
    if (currentOrder) router.push(`/orders/${currentOrder.id}`);
  }, [currentOrder]);

  const itemsTotal = cartItems.reduce(
    (sum, item) => sum + item.final_price * item.quantity,
    0,
  );
  const summary: CartSummary = {
    total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    discount: cartItems.reduce(
      (sum, item) => sum + (item.price - item.final_price) * item.quantity,
      0,
    ),
    payable: cartItems.reduce(
      (sum, item) => sum + item.final_price * item.quantity,
      0,
    ),
    count: cartItems.reduce((sum, item) => sum + item.quantity, 0),
  };

  const handleSubmit = () => {
    if (!selectedAddress) return;
    dispatch(createOrderApi({ address_id: selectedAddress }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">سبد خرید شما خالی است</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-8 text-foreground">تکمیل سفارش</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {/* آیتم‌های سبد */}
          <section className="bg-card rounded-2xl border border-border p-5 shadow-sm space-y-4">
            <h2 className="text-lg font-extrabold text-foreground border-b border-border pb-2">
              کالاها
            </h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                {item.image_url && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${item.image_url}`}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                )}
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    سایز: {item.label} | تعداد: {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-sm text-primary">
                  {formatPrice(item.final_price * item.quantity)}
                </p>
              </div>
            ))}
          </section>

          {/* آدرس */}
          {addressLoading ? (
            <p className="text-muted-foreground text-sm">
              در حال بارگذاری آدرس‌ها...
            </p>
          ) : (
            <AddressList
              addresses={addresses}
              selectedId={selectedAddress}
              id={me?.id ?? ""}
              onSelect={setSelectedAddress}
            />
          )}
        </div>

        {/* خلاصه سفارش */}
        <OrderSummary
          summary={summary}
          shippingCost={shippingCost}
          selectedAddressId={selectedAddress}
          loading={orderLoading}
          error={orderError}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
