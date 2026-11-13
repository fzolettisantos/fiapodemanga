import Image from "next/image";
import { siteConfig } from "@/config/site";

/** Logo MK Design. Versão PNG provisória; trocar por SVG vetorial quando produzido (ver docs/brand). */
export function BrandLogo({ className, priority = false }: { className?: string; priority?: boolean }) {
  const { src, alt, width, height } = siteConfig.logo;
  return <Image src={src} alt={alt} width={width} height={height} priority={priority} className={className} />;
}
