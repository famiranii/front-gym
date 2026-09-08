"use client";

import Link from "next/link";

const profileItems = [
  {
    label: "اطلاعات حساب",
    description: "ویرایش نام، شماره موبایل و رمز عبور",
    href: "/account/profile",
    icon: "person",
  },
  {
    label: "آدرس‌های من",
    description: "مدیریت آدرس‌های ارسال",
    href: "/account/addresses",
    icon: "location_on",
  },
  {
    label: "سفارش‌های من",
    description: "مشاهده و پیگیری سفارش‌ها",
    href: "/orders",
    icon: "inventory_2",
  },
  {
    label: "علاقه‌مندی‌ها",
    description: "محصولاتی که ذخیره کرده‌اید",
    href: "/account/favorites",
    icon: "favorite",
  },
  {
    label: "سبد خرید",
    description: "مشاهده محصولات داخل سبد",
    href: "/cart",
    icon: "shopping_bag",
  },
  {
    label: "خروج از حساب ",
    description: "با کلیک روی این دکمه از حسابت خارج شو",
    href: "/logout",
    icon: "logout",
  },
];

export default function ProfileMenu() {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      {profileItems.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-4 p-4 transition-colors hover:bg-muted ${
            index !== profileItems.length - 1 ? "border-b border-border" : ""
          }`}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[22px]">
              {item.icon}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground">{item.label}</p>

            <p className="mt-1 text-xs text-muted-foreground">
              {item.description}
            </p>
          </div>

          <span className="material-symbols-outlined text-muted-foreground">
            chevron_left
          </span>
        </Link>
      ))}
    </div>
  );
}
