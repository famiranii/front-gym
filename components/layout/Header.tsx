import Link from "next/link";
import MobileHeader from "./MobileHeader";
import BottomNav from "./header/bottomNav";
import SearchBarWrapper from "./header/SearchBarWrapper";
import CartButton from "./header/CartButton";
import Image from "next/image";
import { Vazirmatn } from "next/font/google";

const vazir = Vazirmatn({
  subsets: ["arabic"],
  weight: ["400", "700", "900"],
});

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
      <header className="sticky top-0 z-40 hidden h-[76px] w-full items-center justify-between border-b border-border bg-card px-8 md:flex">
        <div className="flex items-center gap-6 rounded-full">
          <div className="flex items-center">
            <div className="rounded-full bg-gray-50/10 p-2">
              <Link
                href="/"
                className="flex items-center justify-center w-10 h-10"
              >
                <Image
                  src="/images/logo/chehel.png"
                  alt="چهل تیکه"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </Link>
            </div>
            <h1
              className={`${vazir.className} text-2xl font-black text-gray-400 tracking-tight`}
            >
              چهل<span className="text-[#FF9F0A]">تیکه</span>
            </h1>{" "}
          </div>
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
