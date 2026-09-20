"use client";

import { useEffect, useState } from "react";

import DashboardHeader from "@/components/featchers/admin/dashboard/DashboardHeader";
import DashboardStats from "@/components/featchers/admin/dashboard/DashboardStats";
import RecentOrders from "@/components/featchers/admin/dashboard/RecentOrders";
import LowStockProducts from "@/components/featchers/admin/dashboard/LowStockProducts";
import TopProducts from "@/components/featchers/admin/dashboard/TopProducts";
import DashboardSalesChart from "@/components/featchers/admin/dashboard/DashobardSalesChart";
import ShippingCost from "@/components/featchers/admin/dashboard/ShippingCost";

import { api } from "@/lib/api";
import type { DashboardInfoType } from "@/types/dashboardInfo";

export default function Page() {
  const [info, setInfo] = useState<DashboardInfoType | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await api.get<DashboardInfoType>(
          "/admin/dashboard",
        );

        setInfo(response);
      } catch (error) {
        console.error("Failed to load admin dashboard:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard data.",
        );
      }
    }

    loadDashboard();
  }, []);

  if (error) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center p-6"
      >
        <p className="text-destructive">{error}</p>
      </main>
    );
  }

  if (!info) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center p-6"
      >
        <p>Loading dashboard...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />

        <ShippingCost initialCost={info.shipping_cost} />

        <DashboardStats stateValues={info.stats} />

        <div className="mt-6">
          <DashboardSalesChart sales={info.sales} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentOrders orders={info.recent_orders} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <LowStockProducts products={info.low_stock_products} />

          <TopProducts products={info.top_products} />
        </div>
      </div>
    </main>
  );
}