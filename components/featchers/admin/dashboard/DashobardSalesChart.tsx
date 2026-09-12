import { sale } from "@/types/dashboardInfo";

type Props = {
  sales: sale[];
};

const formatPrice = (value: number) => {
  return new Intl.NumberFormat("fa-IR").format(value);
};

export default function DashboardSalesChart({ sales }: Props) {
  const maxAmount = Math.max(...sales.map((item) => item.amount), 0);

  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-semibold">فروش ۷ روز اخیر</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            میزان فروش روزانه
          </p>
        </div>

        <button className="rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted">
          ۷ روز اخیر
        </button>
      </div>

      <div className="mt-8 flex h-64 w-full items-end gap-2 sm:gap-3">
        {sales.map((item) => {
          const height = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;

          return (
            <div
              key={item.date}
              className="flex min-w-0 flex-1 flex-col items-center gap-2"
            >
              <div className="group relative flex h-52 w-full items-end">
                {/* Tooltip */}
                <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-foreground px-3 py-2 text-xs text-background opacity-0 transition-opacity group-hover:opacity-100">
                  {formatPrice(item.amount)} تومان
                </div>

                {/* Bar */}
                <div
                  className="w-full rounded-t-lg bg-primary/80 transition-all duration-300 hover:bg-primary"
                  style={{
                    height: `${height}%`,
                    minHeight: item.amount > 0 ? "4px" : "0",
                  }}
                />
              </div>

              <span className="max-w-full truncate text-[10px] text-muted-foreground sm:text-xs">
                {item.date}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
