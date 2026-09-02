"use client";

import Link from "next/link";
import { Address } from "@/types/addressType";
import { useAppDispatch } from "@/store/hook";
import { deleteAddress } from "@/store/slices/addressSlice";

type Props = {
  address: Address;
  selected: boolean;
  id: string;
  onSelect: (id: string) => void;
};

export default function AddressCard({
  address,
  selected,
  id,
  onSelect,
}: Props) {
  const dispatch = useAppDispatch();
  const onDelete = async (addr_id: string) => {
    await dispatch(deleteAddress({ id, addr_id }));
  };
  return (
    <div
      onClick={() => onSelect(address.id)}
      className={[
        "relative rounded-2xl p-4 cursor-pointer transition-all border-2",
        selected
          ? "border-foreground bg-card shadow-sm"
          : "border-border bg-background hover:shadow-sm hover:bg-card",
      ].join(" ")}
    >
      {/* actions */}
      <div
        className="absolute top-3 left-3 flex items-center gap-1"
        onClick={(e) => e.stopPropagation()}
      >
        <Link
          href={`/checkout/address/${address.id}`}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
          title="ویرایش"
        >
          <span className="material-symbols-outlined text-lg">edit</span>
        </Link>

        <button
          type="button"
          onClick={() => onDelete(address.id)}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition"
          title="حذف"
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </button>
      </div>

      {/* selected */}
      <div className="absolute top-4 right-4">
        <span
          className="material-symbols-outlined text-lg leading-none"
          style={{
            fontVariationSettings: selected ? "'FILL' 1" : "'FILL' 0",
            color: selected ? "var(--foreground)" : "var(--muted-foreground)",
          }}
        >
          {selected ? "radio_button_checked" : "radio_button_unchecked"}
        </span>
      </div>

      <div className="pr-7 pl-20 flex flex-col gap-1.5">
        {address.title && (
          <h3 className="text-sm font-bold text-foreground">{address.title}</h3>
        )}

        {address.address && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {address.city && `${address.province}، ${address.city}، `}
            {address.address}
          </p>
        )}

        {address.postal_code && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <span className="material-symbols-outlined text-base leading-none">
              location_on
            </span>

            <span className="text-xs" dir="ltr">
              {address.postal_code}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
