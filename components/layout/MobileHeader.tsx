"use client";

import { useRouter } from "next/navigation";
import SearchBar from "../ui/SearchBar";
import { Vazirmatn } from "next/font/google";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "700", "900"],
});

export default function MobileHeader() {
  const router = useRouter();

  return (
    <header
      className="
        sticky top-0 z-40
        flex h-[52px] w-full
        items-center justify-between
        border-b border-border
        bg-card
        px-2
        md:hidden
      "
    >
      {/* Back */}
      <div className="w-9 shrink-0">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors active:bg-muted"
          aria-label="بازگشت"
        >
          <span className="material-symbols-outlined text-[20px]">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Search */}
      <div className="mx-2 flex min-w-0 flex-1 justify-center">
        <SearchBar />
      </div>

      {/* Logo */}
      <h1
        className={`${vazir.className} shrink-0 text-xl font-black tracking-tight text-gray-400`}
      >
        چهل<span className="text-[#FF9F0A]">تیکه</span>
      </h1>
    </header>
  );
}