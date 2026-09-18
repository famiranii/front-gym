import type { MetadataRoute } from "next";

const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://85.198.48.18:3000";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/admin/",
        "/dashboard/",
        "/account/",
        "/cart/",
        "/checkout/",
        "/login/",
        "/register/",
        "/search",
      ],
    },
    sitemap: `${url}/sitemap.xml`,
  };
}
