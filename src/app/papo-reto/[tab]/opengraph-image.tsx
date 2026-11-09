import { CHARGES_COPY, RANKINGS } from "@/papo-reto/config/rankings";
import { renderOgImage, OG_SIZE } from "@/papo-reto/lib/og";
import { isRankingSlug } from "@/papo-reto/lib/validation";
import { TAB_SLUGS } from "@/papo-reto/types";

export const alt = "Papo Reto Ranking";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return TAB_SLUGS.map((tab) => ({ tab }));
}

export default async function Image({ params }: { params: Promise<{ tab: string }> }) {
  const { tab } = await params;
  if (isRankingSlug(tab)) {
    const copy = RANKINGS[tab];
    return renderOgImage({
      eyebrow:
        copy.mode === "static"
          ? "Ranking do programa · quem tá na mira?"
          : copy.kind === "positive"
            ? "Ranking positivo · vote agora"
            : "Ranking da vergonha · vote agora",
      title: copy.title,
      subtitle: copy.subtitle,
      accent: copy.kind === "positive" ? "#32D583" : "#F04438",
    });
  }
  return renderOgImage({ eyebrow: "Galeria", title: CHARGES_COPY.title, subtitle: CHARGES_COPY.subtitle, accent: "#FFD23F" });
}
