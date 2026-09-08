import Link from "next/link";
import MobileHeader from "./MobileHeader";
import BottomNav from "./header/bottomNav";
import SearchBarWrapper from "./header/SearchBarWrapper";
import CartButton from "./header/CartButton";

const headerItems = [
  {
    label: "خانه",
    href: "/",
    icon: "home",
  },
  {
    label: "حساب کاربری",
    href: "/account",
    icon: "person",
  },
  {
    label: "سفارش‌ها",
    href: "/orders",
    icon: "inventory_2",
  },
];

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-40 hidden h-[60px] w-full items-center justify-between border-b border-border bg-card px-8 md:flex">
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
          {headerItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className="group relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
            >
              <span className="material-symbols-outlined text-[20px]">
                {item.icon}
              </span>

              <span className="pointer-events-none absolute right-1/2 top-full z-50 mt-2 translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-xs font-medium text-background opacity-0 shadow-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
                {item.label}
              </span>
            </Link>
          ))}

          <CartButton />
        </div>
      </header>

      <MobileHeader />

      <BottomNav />
    </>
  );
}
