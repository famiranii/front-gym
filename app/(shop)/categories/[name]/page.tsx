import { Suspense } from "react";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import CategoryResults from "@/components/featchers/categories/CategoryResults";
import ProductSort from "@/components/featchers/products/ProductSort";

interface Props {
  params: Promise<{
    name: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { name } = await params;
  const categoryName = decodeURIComponent(name);

  return {
    title: categoryName,
    description: `مشاهده محصولات دسته‌بندی ${categoryName} در فروشگاه چهلتیکه`,
  };
}

function CategorySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="h-[27rem] animate-pulse rounded-xl border border-border bg-card"
        />
      ))}
    </div>
  );
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { name } = await params;
  const { sort = "newest" } = await searchParams;

  const categoryName = decodeURIComponent(name);

  let initialProducts: Product[] = [];

  try {
    initialProducts = await api.get<Product[]>(
      `/categories/${encodeURIComponent(categoryName)}/products?limit=20&offset=0&sort=${sort}`,
    );
    console.log(initialProducts)
  } catch {
    initialProducts = [];
  }

  return (
    <main
      dir="rtl"
      className="mx-auto min-h-screen max-w-7xl bg-background px-5 py-8"
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-foreground">
          {categoryName}
        </h1>

        <ProductSort sort={sort} />
      </div>

      <Suspense fallback={<CategorySkeleton />}>
        <CategoryResults
          key={`${categoryName}-${sort}`}
          categoryName={categoryName}
          sort={sort}
          initialProducts={initialProducts}
        />
      </Suspense>
    </main>
  );
}
