import { Suspense } from "react";
import { api } from "@/lib/api";
import { Product } from "@/types/product";
import SearchResults from "@/components/featchers/products/SearchResults";
import ProductSort from "@/components/featchers/products/ProductSort";

interface Props {
  searchParams: Promise<{
    q?: string;
    sort?: string;
  }>;
}

const LIMIT = 20;

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;

  return {
    title: q ? `جستجو: ${q} | پولاد` : "محصولات | پولاد",
    description: q
      ? `نتایج جستجو برای ${q} در فروشگاه تجهیزات ورزشی پولاد`
      : "مشاهده محصولات فروشگاه پولاد اسپرت",
  };
}

function SearchSkeleton() {
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

export default async function SearchPage({ searchParams }: Props) {
  const { q, sort = "newest" } = await searchParams;

  const search = q?.trim() ?? "";

  let initialProducts: Product[] = [];

  try {
    if (search) {
      initialProducts = await api.get<Product[]>(
        `/products/search?q=${encodeURIComponent(search)}&limit=20&offset=0&sort=${sort}`,
      );
    } else {
      initialProducts = await api.get<Product[]>(
        `/products?limit=20&offset=0&sort=${sort}`,
      );
    }
  } catch {
    initialProducts = [];
  }

  return (
    <main
      dir="rtl"
      className="mx-auto min-h-screen max-w-7xl bg-background px-5 py-8"
    >
      <ProductSort sort={sort} />
      <div className="mb-8">
        {search ? (
          <>
            <p className="mb-1 text-sm text-muted-foreground">
              نتایج جستجو برای
            </p>

            <h1 className="text-2xl font-extrabold text-foreground">
              «{search}»
            </h1>
          </>
        ) : (
          <h1 className="text-2xl font-extrabold text-foreground">
            همه محصولات
          </h1>
        )}

        <p className="mt-1 text-sm text-muted-foreground">
          {initialProducts.length} محصول نمایش داده شده
        </p>
      </div>

      <Suspense fallback={<SearchSkeleton />}>
        <SearchResults
          key={`${search}-${sort}`}
          q={search}
          sort={sort}
          initialProducts={initialProducts}
        />
      </Suspense>
    </main>
  );
}
