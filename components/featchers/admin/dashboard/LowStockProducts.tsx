import { Low_stock_product } from "@/types/dashboardInfo";
import Link from "next/link";

type Props = {
  products: Low_stock_product[];
};

export default function LowStockProducts({ products }: Props) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div>
        <h2 className="font-semibold">محصولات کم‌موجودی</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          محصولاتی که موجودی کمی دارند
        </p>
      </div>
      <div className="mt-5 space-y-4">
        {products?.length > 0 ? (
          products.map((product) => (
            <Link
              href={`/admin/product/new?id=${product.id}`}
              key={product.id}
              className="flex items-center justify-between gap-4"
            >
              <span className="truncate text-sm">{product.name}</span>

              <span className="shrink-0 rounded-lg bg-destructive/10 px-3 py-1 text-xs text-destructive">
                {product.stock} عدد
              </span>
            </Link>
          ))
        ) : (
          <div className="py-8 text-center text-sm text-muted-foreground">
            محصول کم‌موجودی وجود ندارد
          </div>
        )}
      </div>
    </section>
  );
}
