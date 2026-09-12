import DashboardHeader from "@/components/featchers/admin/dashboard/DashboardHeader";
import DashboardStats from "@/components/featchers/admin/dashboard/DashboardStats";
import RecentOrders from "@/components/featchers/admin/dashboard/RecentOrders";
import DashboardActions from "@/components/featchers/admin/dashboard/DashboardActions";
import LowStockProducts from "@/components/featchers/admin/dashboard/LowStockProducts";
import TopProducts from "@/components/featchers/admin/dashboard/TopProducts";
import DashboardSalesChart from "@/components/featchers/admin/dashboard/DashobardSalesChart";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { DashboardInfoType } from "@/types/dashboardInfo";
import ShippingCost from "@/components/featchers/admin/dashboard/ShippingCost";

export default async function Page() {
  const cookieStore = await cookies();

  const info: DashboardInfoType = await api.get(
    "/admin/dashboard",
    cookieStore.toString(),
  );
  console.log(info);
  return (
    <main className="min-h-screen bg-background" dir="rtl">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader />
        <ShippingCost initialCost={info.shipping_cost}/>
        <DashboardStats stateValues={info.stats} />

        <div className="mt-6">
          <DashboardSalesChart sales={info.sales} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentOrders orders={info.recent_orders} />
          </div>

          {/* <DashboardActions /> */}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <LowStockProducts products={info.low_stock_products} />
          <TopProducts products={info.top_products} />
        </div>
      </div>
    </main>
  );
}
