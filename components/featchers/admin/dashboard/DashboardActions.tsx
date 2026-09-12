const actions = [
  {
    title: "پرداخت‌های در انتظار",
    count: 8,
    href: "/admin/orders?status=pending",
    icon: "credit_card",
  },
  {
    title: "سفارش‌های آماده ارسال",
    count: 13,
    href: "/admin/orders?status=paid",
    icon: "package_2",
  },
  {
    title: "سفارش‌های در حال ارسال",
    count: 5,
    href: "/admin/orders?status=shipped",
    icon: "local_shipping",
  },
];

export default function DashboardActions() {
  return (
    <section className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-5">
        <h2 className="font-semibold">نیاز به اقدام</h2>

        <p className="mt-1 text-xs text-muted-foreground">
          مواردی که نیاز به بررسی دارند
        </p>
      </div>

      <div className="space-y-3">
        {actions.map((action) => (
          <a
            key={action.title}
            href={action.href}
            className="group flex items-center justify-between rounded-xl border border-border bg-muted/40 p-4 transition-colors hover:bg-muted"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background">
                <span className="material-symbols-outlined text-primary">
                  {action.icon}
                </span>
              </div>

              <span className="text-sm font-medium">{action.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-7 min-w-7 items-center justify-center rounded-full bg-primary px-2 text-xs font-bold text-primary-foreground">
                {action.count}
              </span>

              <span className="material-symbols-outlined text-[18px] text-muted-foreground transition-transform group-hover:-translate-x-1">
                arrow_back
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
