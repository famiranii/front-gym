import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/product";
import { api } from "@/lib/api";

export default async function NewArrivalsSection() {
  const products: Product[] = await api.get(
    `/products?limit=${15}&offset=${0}`,
  );

  return (
    <section className="py-10 px-6 bg-muted/30">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-foreground">
          تازه‌های فروشگاه
        </h2>
        <Link
          href="/products"
          className="text-sm text-tertiary hover:text-foreground transition-colors flex items-center gap-1"
        >
          مشاهده همه
          <span className="material-symbols-outlined text-[16px] rotate-180">
            arrow_back
          </span>
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-5 pb-6 scrollbar-hide">
        {products.map((product) => (
          <Link href={`product/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}
