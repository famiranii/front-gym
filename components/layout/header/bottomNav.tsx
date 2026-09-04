"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const bottomNavItems = [
  { label: "خانه", href: "/", icon: "home" },
  { label: "فروشگاه", href: "/shop", icon: "grid_view" },
  { label: "سبد", href: "/cart", icon: "shopping_bag", badge: 2 },
  { label: "سفارشات", href: "/orders", icon: "inventory_2" },
  { label: "پروفایل", href: "/profile", icon: "person" },
];

export default function BottomNav() {
  const pathname = usePathname();

  const isProductPage = pathname.startsWith("/product/");

  if (isProductPage) {
    return null;
  }

  const isActive = (href: string) => {
    // صفحه اصلی فقط روی / فعال باشد
    if (href === "/") {
      return pathname === "/";
    }

    // برای صفحات دیگر و زیرصفحه‌هایشان
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="md:hidden fixed bottom-0 right-0 left-0 z-40 px-3 pb-3">
      <div className="flex items-stretch bg-card border border-border rounded-2xl overflow-hidden px-2 py-1.5 gap-0">
        {bottomNavItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex-1 flex flex-col items-center justify-center gap-[3px] py-1.5 rounded-xl text-[11px] transition-colors ${
                active
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className="material-symbols-outlined text-[21px]">
                {item.icon}
              </span>

              {item.label}

              {item.badge && item.badge > 0 && (
                <span className="absolute top-0.5 left-4 min-w-[16px] h-4 bg-destructive text-destructive-foreground text-[10px] font-semibold rounded-full flex items-center justify-center px-1 border-2 border-card">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
