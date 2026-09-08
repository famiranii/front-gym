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
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-foreground"
          >
            پولاد<span className="text-primary">.</span>
          </Link>
          <SearchBarWrapper />
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground active:bg-primary active:text-primary-foreground"
            aria-label="خانه"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
          </Link>
          <Link
            href="/account/profile"
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground active:bg-primary active:text-primary-foreground"
            aria-label="اطلاعات شخصی"
          >
            <span className="material-symbols-outlined text-[20px]">
              person
            </span>
          </Link>
          <CartButton />
        </div>
      </header>

      {/* Mobile top bar */}
      <MobileHeader />

      {/* Mobile bottom nav */}
      <BottomNav />
    </>
  );
}
