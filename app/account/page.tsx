"use client";

import ProfileMenu from "@/components/featchers/profile/ProfileMenu";

export default function Page() {
  return (
    <main
      className="min-h-screen bg-background px-4 py-6 sm:px-6  flex justify-center"
      dir="rtl"
    >
      <div className="w-[480px]">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            پروفایل
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            مدیریت حساب کاربری و سفارش‌های شما
          </p>
        </div>

        <div className="space-y-6">
          <ProfileMenu />
        </div>
      </div>
    </main>
  );
}
