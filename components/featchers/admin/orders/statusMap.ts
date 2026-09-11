export const statusMap: Record<
  string,
  {
    label: string;
    className: string;
    icon: string;
  }
> = {
  pending: {
    label: "در انتظار پرداخت",
    className: "bg-yellow-500/10 text-yellow-600",
    icon: "schedule",
  },
  paid: {
    label: "پرداخت شده",
    className: "bg-blue-500/10 text-blue-600",
    icon: "payments",
  },
  processing: {
    label: "در حال پردازش",
    className: "bg-purple-500/10 text-purple-600",
    icon: "inventory_2",
  },
  shipped: {
    label: "ارسال شده",
    className: "bg-orange-500/10 text-orange-600",
    icon: "local_shipping",
  },
  delivered: {
    label: "تحویل داده شده",
    className: "bg-green-500/10 text-green-600",
    icon: "check_circle",
  },
  cancelled: {
    label: "لغو شده",
    className: "bg-destructive/10 text-destructive",
    icon: "cancel",
  },
};
