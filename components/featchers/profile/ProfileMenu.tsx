"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/store/hook";
import { api } from "@/lib/api";

import ConfirmModal from "@/components/ui/ConfirmModal";
import { clearMe } from "@/store/slices/getMeSlice";

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
    href: "/wishlist",
    icon: "favorite",
  },
  {
    label: "سبد خرید",
    description: "مشاهده محصولات داخل سبد",
    href: "/cart",
    icon: "shopping_bag",
  },
];

export default function ProfileMenu() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await api.post("/logout");

      dispatch(clearMe());

      setShowLogoutModal(false);

      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
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

        {/* Logout */}
        <button
          type="button"
          onClick={() => setShowLogoutModal(true)}
          className="flex w-full items-center gap-4 p-4 text-right transition-colors hover:bg-destructive/5"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
            <span className="material-symbols-outlined text-[22px]">
              logout
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-semibold text-destructive">خروج از حساب</p>

            <p className="mt-1 text-xs text-muted-foreground">
              با کلیک روی این دکمه از حساب کاربری خود خارج شوید
            </p>
          </div>

          <span className="material-symbols-outlined text-destructive/60">
            chevron_left
          </span>
        </button>
      </div>

      <ConfirmModal
        open={showLogoutModal}
        title="خروج از حساب"
        description="آیا از خروج از حساب کاربری خود مطمئن هستید؟"
        confirmText="خروج"
        cancelText="انصراف"
        variant="danger"
        icon="logout"
        loading={logoutLoading}
        onConfirm={handleLogout}
        onCancel={() => {
          if (!logoutLoading) {
            setShowLogoutModal(false);
          }
        }}
      />
    </>
  );
}
