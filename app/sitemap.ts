import type { MetadataRoute } from "next";
import { serviceDetails, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/services", ...serviceDetails.map((s) => `/services/${s.slug}`), "/about", "/contact"];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.8 }));
}
