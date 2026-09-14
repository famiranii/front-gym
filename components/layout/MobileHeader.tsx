"use client";

import { useRouter } from "next/navigation";
import SearchBar from "../ui/SearchBar";
import CartButton from "./header/CartButton";
import { Vazirmatn } from "next/font/google";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "700", "900"],
});

export default function MobileHeader() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-40 flex h-[52px] w-full items-center justify-between border-b border-border bg-card px-4 md:hidden">
      {/* SearchBar overlays the header when open */}
      {/* Back */}
      <div className="w-9">
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
      <div className="flex items-center gap-1 w-68">
          <SearchBar />
      </div>
      <h1
        className={`${vazir.className} text-2xl font-black text-gray-400 tracking-tight`}
      >
        چهل<span className="text-[#FF9F0A]">تیکه</span>
      </h1>{" "}
    </header>
  );
}
