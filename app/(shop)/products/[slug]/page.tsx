import Link from "next/link";
import ProductGallery from "@/components/featchers/product/ProductGallery";
import PurchasePanel from "@/components/featchers/product/PurchasePanel";
import ProductTabs from "@/components/featchers/product/ProductTabs";
import MobileBuyBarWrapper from "@/components/featchers/product/MobileBuyBarWrapper";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { Product } from "@/types/product-detail";

export function generateStaticParams() {
  return [{ slug: "nike-air-zoom-pegasus-40" }];
}
interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
}
export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { tab } = await searchParams;
  let product: Product;
  try {
    product = await api.get<Product>(`/products/${slug}`);
    console.log(product);
  } catch {
    notFound();
  }

  return (
    <>
      <main className="min-h-screen pb-24 md:pb-10">
        {/* Breadcrumb */}
        <nav className="px-5 pt-5 pb-2 flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">
            خانه
          </Link>
          <span className="material-symbols-outlined text-sm">
            chevron_left
          </span>
          <Link
            href="/products"
            className="hover:text-foreground transition-colors"
          >
            محصولات
          </Link>
          <span className="material-symbols-outlined text-sm">
            chevron_left
          </span>
          <span className="text-foreground font-medium truncate max-w-[180px]">
            {product.name}
          </span>
        </nav>

        <div className="px-5 max-w-6xl mx-auto">
          {/* Hero grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            <ProductGallery images={product.images} />
            <PurchasePanel product={product} />
          </div>

          {/* Tags */}
          {/* <div className="flex gap-2 flex-wrap mt-2 mb-6">
            {product.tags.map((tag: string) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground border border-border"
              >
                #{tag}
              </span>
            ))}
          </div> */}

          {/* Tabs */}
          <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
            <ProductTabs product={product} activeTab={tab} />
          </div>
        </div>
      </main>

      <MobileBuyBarWrapper price={product.price} />
    </>
  );
}
