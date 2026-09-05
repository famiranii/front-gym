import { Order } from "@/types/orderTypes";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR") + " تومان";
}

type Props = {
  order: Order;
};

export default function OrderPriceSummary({ order }: Props) {
  return (
    <section className="bg-card rounded-2xl border border-border p-5 space-y-3">
      <h2 className="font-extrabold text-foreground border-b border-border pb-2">خلاصه مالی</h2>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">هزینه ارسال</span>
        <span className="text-foreground">
          {order.shipping_cost === 0 ? "رایگان" : formatPrice(order.shipping_cost)}
        </span>
      </div>
      <div className="flex justify-between font-bold border-t border-border pt-3">
        <span className="text-foreground">مبلغ کل</span>
        <span className="text-primary">{formatPrice(order.total_price)}</span>
      </div>
    </section>
  );
}