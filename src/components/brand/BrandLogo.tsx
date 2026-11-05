import type { CSSProperties } from "react";
import { brandAssets } from "@/config/brand";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  /** horizontal = Luli + lettering; symbol = somente a Luli */
  variant?: "horizontal" | "symbol";
  /** Altura em px — a largura segue a proporção original. */
  height?: number;
  className?: string;
};

/**
 * Logo oficial da Fiapo de Manga (SVG vetorial).
 *
 * O SVG é aplicado como máscara CSS e preenchido com a cor de destaque do
 * tema (`bg-accent`): #CCFF7B no dark e #52751E no light. Assim há um único
 * arquivo em cache, sem troca de imagem nem fundo retangular.
 * Em tamanhos pequenos é usada a versão de tamanho óptico (traço reforçado).
 */
export function BrandLogo({ variant = "horizontal", height = 36, className }: BrandLogoProps) {
  const asset =
    variant === "symbol"
      ? height < 48
        ? brandAssets.symbolSmall
        : brandAssets.symbol
      : height < 56
        ? brandAssets.horizontalCompact
        : brandAssets.horizontal;
  const width = Math.round((asset.width / asset.height) * height);
  const mask = `url(${asset.src}) center / contain no-repeat`;

  return (
    <span
      role="img"
      aria-label={brandAssets.alt}
      className={cn("inline-block shrink-0 bg-accent transition-colors duration-300", className)}
      style={{ width, height, mask, WebkitMask: mask } as CSSProperties}
    />
  );
}
