import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { RANKINGS } from "@/config/rankings";
import { site } from "@/config/site";
import { placeholderMood, resolveCharacterImage } from "@/lib/characters";
import { faceSvgDataUri } from "@/lib/face";
import { formatNumber, formatPercent } from "@/lib/ranking";
import { participantHeadline } from "@/lib/share";
import { isParticipantId, isRankingSlug } from "@/lib/validation";
import { getRankingResults } from "@/lib/server/data";
import type { RankedEntry, RankingSlug } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const fonts = Promise.all([
  readFile(join(process.cwd(), "src/assets/fonts/anton-400.woff")),
  readFile(join(process.cwd(), "src/assets/fonts/barlow-700.woff")),
]);

/** Caricatura PNG/JPEG (o gerador de imagens não lê WebP/AVIF); senão, o placeholder ilustrado. */
async function avatarSource(slug: RankingSlug, entry: RankedEntry) {
  const src = resolveCharacterImage(entry.participant.slug, slug, entry.state, entry.participant.avatarPaths);
  if (src && /\.(png|jpe?g)(\?.*)?$/i.test(src)) {
    if (/^https:\/\//.test(src)) return src;
    if (src.startsWith("/characters/")) {
      try {
        const file = await readFile(join(process.cwd(), "public", src));
        return `data:image/${src.endsWith(".png") ? "png" : "jpeg"};base64,${file.toString("base64")}`;
      } catch {
        /* usa o placeholder */
      }
    }
  }
  return faceSvgDataUri(placeholderMood(slug, entry.state));
}

export async function GET(request: NextRequest) {
  const ranking = request.nextUrl.searchParams.get("ranking");
  const participant = request.nextUrl.searchParams.get("participant");
  if (!isRankingSlug(ranking) || (participant !== null && !isParticipantId(participant))) {
    return new Response("Parâmetros inválidos.", { status: 400 });
  }

  // Os números vêm sempre do banco — nunca da URL — para impedir cards falsos.
  const [results] = await getRankingResults([ranking]);
  const entry = participant ? results?.entries.find((e) => e.participant.id === participant) : results?.entries[0];
  if (!results || !entry) return new Response("Participante não encontrado.", { status: 404 });

  const copy = RANKINGS[ranking];
  const accent = copy.kind === "positive" ? "#32D583" : "#F04438";
  const [anton, barlow] = await fonts;
  const avatar = await avatarSource(ranking, entry);
  const host = site.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#111318", color: "#fff", fontFamily: "Barlow", padding: 64, position: "relative" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", fontFamily: "Anton", fontSize: 44, letterSpacing: 1 }}>
            <span style={{ color: "#FFD23F" }}>PAPO RETO</span>
            <span style={{ marginLeft: 14 }}>RANKING</span>
          </div>
          {results.isDemo ? (
            <div style={{ display: "flex", background: "#FFD23F", color: "#111318", fontSize: 26, padding: "8px 18px", borderRadius: 10 }}>
              DADOS SIMULADOS
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", marginTop: 48, height: 10, width: 180, background: accent, borderRadius: 6 }} />
        <div style={{ display: "flex", fontFamily: "Anton", fontSize: 84, lineHeight: 1.02, marginTop: 24, textTransform: "uppercase" }}>
          {copy.title}
        </div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 56 }}>
          <div style={{ display: "flex", fontFamily: "Anton", fontSize: 220, color: "#FFD23F", lineHeight: 1, width: 300 }}>
            {`${entry.position}º`}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} width={380} height={380} alt="" style={{ borderRadius: 190, background: "#1D222B", border: `8px solid ${entry.position === 1 ? "#FFD23F" : "#3A3F4B"}` }} />
        </div>
        <div style={{ display: "flex", fontFamily: "Anton", fontSize: 92, marginTop: 40, textTransform: "uppercase" }}>
          {entry.participant.name}
        </div>
        <div style={{ display: "flex", fontSize: 44, color: "#C9CED8", marginTop: 4 }}>
          {`${formatNumber(entry.votes)} ${entry.votes === 1 ? "voto" : "votos"} · ${formatPercent(entry.percent)}`}
        </div>
        <div style={{ display: "flex", fontSize: 46, lineHeight: 1.2, marginTop: 36, color: "#FFD23F" }}>
          {`“${participantHeadline(ranking, entry, results)}”`}
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", fontSize: 28, color: "#9AA3B2" }}>
          <span style={{ color: "#fff" }}>{`Vote também: ${host}/${ranking}`}</span>
          <span>{results.isDemo ? "Modo demonstração — números simulados, não são votos reais." : site.disclaimer}</span>
        </div>
      </div>
    ),
    {
      width: 1080,
      height: 1350,
      fonts: [
        { name: "Anton", data: anton, weight: 400, style: "normal" },
        { name: "Barlow", data: barlow, weight: 700, style: "normal" },
      ],
      headers: { "Cache-Control": "public, max-age=60, s-maxage=60" },
    },
  );
}
