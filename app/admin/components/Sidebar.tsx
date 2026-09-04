"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "داشبورد", icon: "dashboard", href: "/admin" },
  { label: "مدیریت محصولات", icon: "inventory_2", href: "/admin/products" },
  { label: "سفارشات جدید", icon: "pending_actions", href: "/admin/orders" },
  { label: "گزارشات مالی", icon: "analytics", href: "/admin/reports" },
  { label: "تنظیمات", icon: "settings", href: "/admin/settings" },
  { label: "دسته بندی ", icon: "folder", href: "/admin/categories" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="fixed top-2 right-4 z-[60] md:hidden w-11 h-11 rounded-xl bg-card border border-border shadow-lg flex items-center justify-center text-foreground"
        aria-label="باز کردن منو"
      >
        <span className="material-symbols-outlined">
          {open ? "close" : "menu"}
        </span>
      </button>

      {/* Overlay */}
      {open && (
        <button
          type="button"
          aria-label="بستن منو"
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <nav
        className={[
          "fixed right-0 top-0 z-50",
          "flex flex-col gap-1",
          "h-screen w-72",
          "bg-card border-l border-border shadow-xl",
          "pt-10",
          "transition-transform duration-300",
          "md:translate-x-0",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Profile */}
        <div className="px-4 pb-4 mb-2 border-b border-border">
          <h2 className="text-lg font-bold text-foreground mb-3">
            پنل مدیریت آریا
          </h2>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-base">
              م
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                خوش آمدید
              </p>
              <p className="text-xs text-muted-foreground">
                مدیر ارشد
              </p>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto py-2 px-2 flex flex-col gap-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin/products"
                ? pathname.startsWith("/admin/products")
                : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={[
                  "flex items-center gap-3 rounded-xl px-4 py-3",
                  "text-sm font-semibold",
                  "transition-all duration-150 active:scale-95",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Close Button */}
        <div className="p-3 border-t border-border md:hidden">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3 bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              close
            </span>
            بستن منو
          </button>
        </div>
      </nav>
    </>
  );
}