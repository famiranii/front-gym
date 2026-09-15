import type { MetadataRoute } from "next";
import { api } from "@/lib/api";

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
interface SitemapProduct {
  id: string;
  name: string;
  updated_at?: string;
}

interface SitemapCategory {
  name: string;
  updated_at?: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: url,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${url}/products`,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  let products: SitemapProduct[] = [];
  let categories: SitemapCategory[] = [];

  try {
    products = await api.get<SitemapProduct[]>(
      "/products?limit=10000&offset=0&sort=newest",
      undefined,
      true,
    );
  } catch {}

  try {
    categories = await api.get<SitemapCategory[]>(
      "/categories",
      undefined,
      true,
    );
  } catch {}

  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${url}/product/${encodeURIComponent(product.name)}?id=${product.id}`,
    lastModified: product.updated_at ? new Date(product.updated_at) : undefined,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryUrls: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${url}/category/${encodeURIComponent(category.name)}`,
    lastModified: category.updated_at
      ? new Date(category.updated_at)
      : undefined,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...categoryUrls, ...productUrls];
}
