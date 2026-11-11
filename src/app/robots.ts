import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/proposta/", "/painel/", "/admin/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
