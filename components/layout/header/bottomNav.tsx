"use client";

import { useAppSelector } from "@/store/hook";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const count = useAppSelector(
    (state) => state.users.me?.cart_length ?? 0
  );

  const bottomNavItems = [
    { label: "خانه", href: "/", icon: "home" },
    { label: "فروشگاه", href: "/products", icon: "grid_view" },
    { label: "سبد", href: "/cart", icon: "shopping_bag", badge: count },
    { label: "سفارشات", href: "/orders", icon: "inventory_2" },
    { label: "پروفایل", href: "/account", icon: "person" },
  ];

  const isProductPage = pathname.startsWith("/product/");

  if (isProductPage) return null;

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="mx-2 mb-2 flex items-stretch overflow-hidden rounded-2xl border border-border bg-card px-1.5 py-1.5 shadow-lg">
        {bottomNavItems.map((item) => {
          const active = isActive(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`relative flex flex-1 flex-col items-center justify-center gap-[3px] rounded-xl py-1.5 text-[11px] transition-colors ${
                active
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <span className="material-symbols-outlined text-[21px]">
                {item.icon}
              </span>

              <span>{item.label}</span>

              {item.badge!==undefined && item.badge > 0 && (
                <span className="absolute left-1/2 top-0.5 ml-3 flex h-4 min-w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-card bg-destructive px-1 text-[10px] font-semibold text-destructive-foreground">
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