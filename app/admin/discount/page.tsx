"use client";

import { useState } from "react";

import DiscountCodeList from "@/components/featchers/admin/discount/DiscountCodeList";
import CreateDiscountCodeForm from "@/components/featchers/admin/discount/CreateDiscountCode";

export default function DiscountCodesPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          مدیریت کدهای تخفیف
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          ایجاد و مدیریت کدهای تخفیف فروشگاه
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card">
        <CreateDiscountCodeForm
          onCreated={() => setRefreshKey((prev) => prev + 1)}
        />
      </div>

      <DiscountCodeList refreshKey={refreshKey} />
    </div>
  );
}
