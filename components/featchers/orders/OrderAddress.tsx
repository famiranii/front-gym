import { Order } from "@/types/orderTypes";

type Props = {
  order: Order;
};

export default function OrderAddress({ order }: Props) {
  if (!order.address_city && !order.address_detail) return null;

  return (
    <section className="bg-card rounded-2xl border border-border p-5 space-y-2">
      <h2 className="font-extrabold text-foreground border-b border-border pb-2">آدرس تحویل</h2>
      {order.address_title && (
        <p className="text-sm font-semibold text-foreground">{order.address_title}</p>
      )}
      <p className="text-sm text-muted-foreground">
        {[order.address_province, order.address_city, order.address_detail]
          .filter(Boolean)
          .join("، ")}
      </p>
      {order.address_postal_code && (
        <p className="text-xs text-muted-foreground">کد پستی: {order.address_postal_code}</p>
      )}
    </section>
  );
}