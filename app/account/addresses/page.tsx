"use client";
import AddressList from "@/components/featchers/check-out/AddressList";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchAddresses } from "@/store/slices/addressSlice";
import React, { useEffect, useState } from "react";

export default function Page() {
  const dispatch = useAppDispatch();

  const { addresses, loading: addressLoading } = useAppSelector(
    (state) => state.address,
  );

  const me = useAppSelector((state) => state.users.me);

  const [selectedAddress, setSelectedAddress] = useState<string>("");

  useEffect(() => {
    if (!me?.id) return;

    dispatch(fetchAddresses(me.id));
  }, [me?.id, dispatch]);
  return (
    <main
      className="min-h-screen bg-background px-4 py-6 sm:px-6  flex justify-center"
      dir="rtl"
    >
      <section className="rounded-2xl border border-border bg-card p-4 w-[550px]">
        {addressLoading ? (
          <p className="text-sm text-muted-foreground">
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
      </section>
    </main>
  );
}
