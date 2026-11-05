import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#3f3f3f",
    theme_color: "#212121",
    lang: "pt-BR",
    icons: [
      { src: "/brand/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/favicon.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
