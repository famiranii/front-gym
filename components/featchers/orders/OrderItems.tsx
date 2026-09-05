import { OrderItem } from "@/types/orderTypes";

function formatPrice(n: number) {
  return n.toLocaleString("fa-IR") + " تومان";
}

type Props = {
  items: OrderItem[];
};

export default function OrderItems({ items }: Props) {
  return (
    <section className="bg-card rounded-2xl border border-border p-5 space-y-4">
      <h2 className="font-extrabold text-foreground border-b border-border pb-2">کالاها</h2>
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4">
          {item.image_url && (
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${item.image_url}`}
              alt={item.product_name}
              className="w-16 h-16 object-cover rounded-xl"
            />
          )}
          <div className="flex-1">
            <p className="font-semibold text-foreground">{item.product_name}</p>
            <p className="text-sm text-muted-foreground">
              سایز: {item.label} | تعداد: {item.quantity}
            </p>
          </div>
          <p className="text-sm font-bold text-primary">{formatPrice(item.total_price)}</p>
        </div>
      ))}
    </section>
  );
}