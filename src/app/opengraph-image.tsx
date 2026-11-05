import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — Boas experiências começam com boas perguntas.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Imagem Open Graph tipográfica (sem a ilustração, até que a logo oficial
 * seja adicionada). Depois, substitua por src/app/opengraph-image.png
 * (cópia de public/brand/og-image.png).
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#3f3f3f",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", color: "#ccff7b", fontSize: 40, fontWeight: 700, letterSpacing: "-0.04em" }}>
          fiapo de manga
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            color: "#cfcfcf",
            fontSize: 86,
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
            fontWeight: 500,
            maxWidth: 1000,
          }}
        >
          Boas experiências começam com&nbsp;<span style={{ color: "#ccff7b" }}>boas perguntas.</span>
        </div>
        <div style={{ display: "flex", color: "#ffffff", fontSize: 26, letterSpacing: "0.06em" }}>
          CONSULTORIA DE DESIGN · PESQUISA · ESTRATÉGIA · UX/UI
        </div>
      </div>
    ),
    size,
  );
}
