// components/cart/AddressCard.tsx

"use client";

import { Address } from "@/types/addressType";


type Props = {
  address: Address;
  selected: boolean;
  onSelect: (id: string) => void;
};

export default function AddressCard({ address, selected, onSelect }: Props) {
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

      <div className="pr-7 flex flex-col gap-1.5">
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
