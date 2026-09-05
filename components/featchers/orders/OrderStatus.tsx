type Status = {
  label: string;
  color: string;
  icon: string;
};

const statusMap: Record<string, Status> = {
  pending: { label: "در انتظار پرداخت", color: "text-warning", icon: "schedule" },
  paid: { label: "پرداخت شده", color: "text-success", icon: "check_circle" },
  shipped: { label: "ارسال شده", color: "text-primary", icon: "local_shipping" },
  delivered: { label: "تحویل داده شده", color: "text-success", icon: "inventory" },
  cancelled: { label: "لغو شده", color: "text-destructive", icon: "cancel" },
};

type Props = {
  status: string;
  createdAt: string;
};

export default function OrderStatus({ status, createdAt }: Props) {
  const s = statusMap[status] ?? { label: status, color: "text-foreground", icon: "info" };

  return (
    <section className="bg-card rounded-2xl border border-border p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        <span className={`material-symbols-outlined text-2xl ${s.color}`}>
          {s.icon}
        </span>
      </div>
      <div>
        <p className="text-xs text-muted-foreground">وضعیت سفارش</p>
        <p className={`font-bold ${s.color}`}>{s.label}</p>
      </div>
      <p className="mr-auto text-xs text-muted-foreground">
        {new Date(createdAt).toLocaleDateString("fa-IR")}
      </p>
    </section>
  );
}