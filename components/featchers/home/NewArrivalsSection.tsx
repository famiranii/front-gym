import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/product";
import { api } from "@/lib/api";

export default async function NewArrivalsSection({
  text,
  sort,
}: {
  text: string;
  sort: string;
}) {
  const products: Product[] = await api.get(
    `/products?limit=15&offset=0&sort=${sort}`,
  );

  return (
    <section className="bg-muted/30 px-3 py-6 sm:px-6 sm:py-10">
      <div className="mb-4 flex items-center justify-between sm:mb-8">
        <h2 className="text-base font-semibold text-foreground sm:text-xl">
          {text}
        </h2>

        <Link
          href={`/products?sort=${sort}`}
          className="flex items-center gap-0.5 text-xs text-tertiary transition-colors hover:text-foreground sm:gap-1 sm:text-sm"
        >
          مشاهده همه

          <span className="material-symbols-outlined text-[14px] sm:text-[16px] rotate-180">
            arrow_back
          </span>
        </Link>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide sm:gap-5 sm:pb-6">
        {products.map((product) => (
          <Link
            href={`/product/${product.name}?id=${product.id}`}
            key={product.id}
            className="shrink-0"
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}