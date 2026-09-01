// components/checkout/CheckoutContent.tsx

"use client";

import { useEffect, useState } from "react";
import { Address } from "@/types/addressType";
import CartStepper from "./CartStepper";
import AddressList from "./AddressList";
import { CartItemType, CartSummary } from "@/types/cartTypes";
import OrderSummary from "./OrderSummary";

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
  const [items, setItems] = useState<CartItemType[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [cartRes, addrRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/addresses`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (cartRes.ok) setItems(await cartRes.json());
      if (addrRes.ok) {
        const addrs: Address[] = await addrRes.json();
        setAddresses(addrs);
        const def = addrs.find((a) => a.is_default) ?? addrs[0];
        if (def) setSelectedAddress(def.id);
      }

      setLoading(false);
    };

    fetchData();
  }, [token, userId]);

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
