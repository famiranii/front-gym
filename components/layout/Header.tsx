// components/Header.tsx
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import BottomNav from "./header/bottomNav";
import SearchBarWrapper from "./header/SearchBarWrapper";
import CartButton from "./header/CartButton";

export default function Header() {
  return (
    <>
      {/* Desktop */}
      <header className="hidden md:flex items-center justify-between px-8 h-[60px] bg-card border-b border-border sticky top-0 z-40 w-full">
        <div className="flex items-center gap-6">
          <div className="text-lg font-bold tracking-tight text-foreground">
            پولاد<span className="text-primary">.</span>
          </div>
          <SearchBarWrapper />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/account/profile"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors active:bg-muted"
            aria-label="اطلاعات شخصی"
          >
            <span className="material-symbols-outlined text-[20px]">
              person
            </span>
          </Link>
          <CartButton/>
        </div>
      </header>

      {/* Mobile top bar */}
      <MobileHeader />

      {/* Mobile bottom nav */}
      <BottomNav />
    </>
  );
}


