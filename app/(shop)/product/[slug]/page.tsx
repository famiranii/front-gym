import type { Metadata } from "next";
import { cache } from "react";
import ProductGallery from "@/components/featchers/product/ProductGallery";
import PurchasePanel from "@/components/featchers/product/PurchasePanel";
import ProductTabs from "@/components/featchers/product/ProductTabs";
import MobileBuyBarWrapper from "@/components/featchers/product/MobileBuyBarWrapper";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { Product } from "@/types/product-detail";
import { cookies } from "next/headers";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tab?: string }>;
}

const getProduct = cache(async (slug: string) => {
  const cookieStore = await cookies();

  return api.get<Product>(`/products/${slug}`, cookieStore.toString());
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const product = await getProduct(slug);

    const description =
      product.description?.trim() || `خرید ${product.name} از فروشگاه چهلتیکه`;

    return {
      title: product.name,
      description,
      alternates: {
        canonical: `/product/${slug}`,
      },
      openGraph: {
        title: product.name,
        description,
        type: "website",
        url: `/product/${slug}`,
        images: product.images?.[0]?.url
          ? [
              {
                url: product.images[0].url,
                alt: product.name,
              },
            ]
          : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description,
        images: product.images?.[0]?.url ? [product.images[0].url] : undefined,
      },
    };
  } catch {
    return {
      title: "محصول پیدا نشد",
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function ProductPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { tab } = await searchParams;

  let product: Product;

  try {
    product = await getProduct(slug);
  } catch {
    notFound();
  }

  const totalStock = product.variants.reduce(
    (total, variant) => total + variant.stock,
    0,
  );

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.url),
    sku: product.id,
    brand: product.brand
      ? {
          "@type": "Brand",
          name: product.brand,
        }
      : undefined,
    category: product.category || undefined,
    offers: {
      "@type": "Offer",
      url: `https://cheheltike.com/product/${product.slug}`,
      price: product.final_price,
      availability:
        totalStock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
    ...(product.reviewCount > 0 && product.average_rating > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.average_rating,
            reviewCount: product.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
  };

  return (
    <>
      <main className="min-h-screen pb-24 md:pb-10">
        <div className="px-5 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            <ProductGallery images={product.images} />
            <PurchasePanel product={product} />
          </div>

          <div className="bg-card rounded-2xl border border-border p-5 shadow-sm">
            <ProductTabs product={product} activeTab={tab} />
          </div>
        </div>
      </main>

      <MobileBuyBarWrapper price={product.price} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />
    </>
  );
}
