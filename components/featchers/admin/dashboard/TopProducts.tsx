import { Top_product } from "@/types/dashboardInfo";
import Link from "next/link";

export default function TopProducts({ products }: { products: Top_product[] }) {
  return (
    <section className="rounded-2xl border bg-card p-6 shadow-sm">
      <div>
        <h2 className="font-semibold">پرفروش‌ترین محصولات</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          محصولات بر اساس تعداد فروش
        </p>
      </div>
      <div className="mt-5 space-y-4">
        {products.map((product, index) => (
          <Link
            href={`/admin/product/new?id=${product.id}`}
            key={product.name}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                {index + 1}
              </span>

              <span className="text-sm">{product.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
