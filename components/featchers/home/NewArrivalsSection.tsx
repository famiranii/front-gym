import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/types/product";

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function NewArrivalsSection() {
  const products = await getProducts();
  console.log(products);

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
          <Link href={`products/${product.id}`} key={product.id}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </section>
  );
}
