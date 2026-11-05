import Image from "next/image";
import { brandAssets } from "@/config/brand";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  /** horizontal = símbolo + lettering; symbol = somente a cabeça da Luli */
  variant?: "horizontal" | "symbol";
  /**
   * auto = troca conforme o tema ativo;
   * dark/light = força a versão para fundo escuro/claro.
   */
  tone?: "auto" | "dark" | "light";
  /** Altura em px — a largura segue a proporção original. */
  height?: number;
  className?: string;
  priority?: boolean;
};

/**
 * Logo oficial da Fiapo de Manga.
 *
 * Usa os arquivos aprovados de /public/brand. Enquanto eles não forem
 * adicionados (brandAssets.assetsReady = false), exibe somente o lettering
 * em texto como marcação provisória — a ilustração da Luli não é recriada.
 */
export function BrandLogo({
  variant = "horizontal",
  tone = "auto",
  height = 36,
  className,
  priority,
}: BrandLogoProps) {
  if (!brandAssets.assetsReady) {
    return (
      <span
        className={cn(
          "inline-flex items-baseline whitespace-nowrap font-semibold lowercase leading-none tracking-[-0.04em] text-accent",
          className,
        )}
        style={{ fontSize: Math.round(height * 0.62) }}
      >
        <span aria-hidden="true">fiapo de manga</span>
        <span className="sr-only">{brandAssets.alt}</span>
      </span>
    );
  }

  const asset = variant === "symbol" ? brandAssets.symbol : brandAssets.horizontal;
  const width = Math.round((asset.width / asset.height) * height);
  const common = {
    width,
    height,
    priority,
    sizes: `${width}px`,
    style: { width, height },
  } as const;

  if (tone !== "auto") {
    return (
      <Image
        {...common}
        src={tone === "dark" ? asset.dark : asset.light}
        alt={brandAssets.alt}
        className={cn("block object-contain", className)}
      />
    );
  }

  return (
    <span className={cn("relative inline-block", className)} style={{ width, height }}>
      <Image {...common} src={asset.dark} alt={brandAssets.alt} className="hidden object-contain dark:block" />
      <Image {...common} src={asset.light} alt={brandAssets.alt} className="block object-contain dark:hidden" />
    </span>
  );
}
