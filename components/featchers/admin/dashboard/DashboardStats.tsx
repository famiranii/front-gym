type stateProps = {
  stateValues: {
    paid_orders: number;
    pending_orders: number;
    today_orders: number;
    today_sales: number;
  };
};
export default function DashboardStats({ stateValues }: stateProps) {
  const stats = [
    {
      title: "سفارش‌های امروز",
      value: stateValues?.today_orders ?? 0,
      description: "در ۲۴ ساعت گذشته",
      icon: "shopping_bag",
    },
    {
      title: "فروش امروز",
      value: stateValues?.today_sales ?? 0,
      description: "تومان",
      icon: "payments",
    },
    {
      title: "در انتظار پرداخت",
      value: stateValues?.pending_orders ?? 0,
      description: "نیاز به پیگیری",
      icon: "credit_card",
    },
    {
      title: "آماده ارسال",
      value: stateValues?.paid_orders ?? 0,
      description: "در انتظار تحویل به پست",
      icon: "local_shipping",
    },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>

              <p className="mt-3 text-2xl font-bold tracking-tight">
                {stat.value}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>

            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <span className="material-symbols-outlined text-[24px]">
                {stat.icon}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
