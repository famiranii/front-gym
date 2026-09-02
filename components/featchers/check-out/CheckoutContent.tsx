// components/checkout/CheckoutContent.tsx

"use client";

import { useEffect, useState } from "react";
import { Address } from "@/types/addressType";
import CartStepper from "./CartStepper";
import AddressList from "./AddressList";
import { CartItemType, CartSummary } from "@/types/cartTypes";
import OrderSummary from "./OrderSummary";
import { api } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAddresses } from "@/store/slices/addressSlice";

function calcSummary(items: CartItemType[]): CartSummary {
  let total = 0;
  let discount = 0;
  let count = 0;

  for (const item of items) {
    const originalPrice = item.price * item.quantity;
    const discountAmount = ((item.price * item.discount) / 100) * item.quantity;
    total += originalPrice;
    discount += discountAmount;
    count += item.quantity;
  }

  return { total, discount, payable: total - discount, count };
}

type Props = {
  token: string;
  userId: string;
};

export default function CheckoutContent({ token, userId }: Props) {
  const dispatch = useAppDispatch();
  const addresses = useAppSelector((state) => state.address.addresses);
  const [items, setItems] = useState<CartItemType[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const [cartRes] = await Promise.all([api.get<CartItemType[]>("/cart")]);
        dispatch(fetchAddresses(userId));
        console.log(cartRes);

        setItems(cartRes);

        const def = addresses.find((a) => a.is_default) ?? addresses[0];

        if (def) {
          setSelectedAddress(def.id);
        }
      } catch (error) {
        console.error("Error fetching cart and addresses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="material-symbols-outlined animate-spin text-muted-foreground text-3xl">
          progress_activity
        </span>
      </div>
    );
  }

  const summary = calcSummary(items);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 flex flex-col gap-6">
        <CartStepper active={0} />
        <AddressList
          addresses={addresses}
          selectedId={selectedAddress}
          onSelect={setSelectedAddress}
          id={userId}
        />
      </div>

      <div className="lg:col-span-4">
        <OrderSummary
          summary={summary}
          selectedAddressId={selectedAddress}
          token={token}
        />
      </div>
    </div>
  );
}
