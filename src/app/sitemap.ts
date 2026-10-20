import type { MetadataRoute } from "next";
import { products, services, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/products",
    ...products.map((p) => `/products/${p.slug}`),
    "/work",
    "/about",
    "/insights",
    "/contact",
    "/privacy",
    "/terms",
  ];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : path.split("/").length > 2 ? 0.7 : 0.8,
  }));
}
