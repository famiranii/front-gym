const sales = [
  { day: "شنبه", value: 45 },
  { day: "یکشنبه", value: 70 },
  { day: "دوشنبه", value: 55 },
  { day: "سه‌شنبه", value: 90 },
  { day: "چهارشنبه", value: 65 },
  { day: "پنجشنبه", value: 80 },
  { day: "جمعه", value: 100 },
];

export default function DashboardSalesChart() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-semibold">فروش ۷ روز اخیر</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            میزان فروش روزانه
          </p>
        </div>

        <span className="material-symbols-outlined text-muted-foreground">
          monitoring
        </span>
      </div>

      <div className="flex h-64 items-end gap-2 sm:gap-4">
        {sales.map((item) => (
          <div
            key={item.day}
            className="flex h-full flex-1 flex-col items-center justify-end gap-3"
          >
            <div className="flex h-full w-full items-end">
              <div
                className="w-full rounded-t-lg bg-primary transition-all hover:opacity-80"
                style={{ height: `${item.value}%` }}
              />
            </div>

            <span className="text-[11px] text-muted-foreground sm:text-xs">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
