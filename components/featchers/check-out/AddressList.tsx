// components/checkout/AddressList.tsx

import { Address } from "@/types/addressType";
import AddressCard from "./AddressCard";
import Link from "next/link";

type Props = {
  addresses: Address[];
  selectedId: string;
  id: string;
  onSelect: (id: string) => void;
};

export default function AddressList({
  addresses,
  selectedId,
  id,
  onSelect,
}: Props) {
  return (
    <section className="bg-card rounded-2xl border border-border p-5 flex flex-col gap-4 shadow-sm">
      <h2 className="text-lg font-extrabold text-foreground">آدرس تحویل</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {addresses.map((addr) => (
          <AddressCard
            key={addr.id}
            address={addr}
            selected={selectedId === addr.id}
            onSelect={onSelect}
            id={id}
          />
        ))}
      </div>

      <Link
        href={"/checkout/address"}
        className="self-start flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:border-foreground transition-all"
      >
        <span className="material-symbols-outlined text-base leading-none">
          add
        </span>
        افزودن آدرس جدید
      </Link>
    </section>
  );
}
