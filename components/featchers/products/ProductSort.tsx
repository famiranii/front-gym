"use client";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import SelectDropdown, {
  SelectOption,
} from "@/components/ui/SelectDropdown";

const sortOptions: SelectOption[] = [
  { value: "newest", label: "جدیدترین" },
  { value: "price_asc", label: "ارزان‌ترین" },
  { value: "price_desc", label: "گران‌ترین" },
  { value: "discount", label: "پرتخفیف‌ترین" },
  { value: "best_selling", label: "پرفروش‌ترین" },
];

interface Props {
  sort?: string;
}

export default function ProductSort({
  sort = "newest",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    // pagination قبلی را ریست کن
    params.delete("offset");

    const query = params.toString();

    router.push(
      query
        ? `${pathname}?${query}`
        : pathname
    );
  };

  return (
    <SelectDropdown
      value={sort}
      options={sortOptions}
      onChange={handleSortChange}
    />
  );
}