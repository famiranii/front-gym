// components/Header.tsx
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import BottomNav from "./header/bottomNav";
import SearchBarWrapper from "./header/SearchBarWrapper";

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
          <CartButton count={2} />
        </div>
      </header>

      {/* Mobile top bar */}
      <MobileHeader />

      {/* Mobile bottom nav */}
      <BottomNav />
    </>
  );
}

function CartButton({ count }: { count: number }) {
  return (
    <Link
      href="/cart"
      className="relative w-9 h-9 flex items-center justify-center rounded-md border border-border bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
    >
      <span className="material-symbols-outlined text-[18px]">
        shopping_bag
      </span>
      {count > 0 && (
        <span className="absolute -top-1.5 -left-1.5 min-w-[16px] h-4 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-full flex items-center justify-center px-1 border-2 border-card">
          {count}
        </span>
      )}
    </Link>
  );
}
