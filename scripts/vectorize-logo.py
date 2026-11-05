#!/usr/bin/env python3
"""
Vetorização da logo da Fiapo de Manga (traçado real com potrace, sem imagem embutida).

Uso:
  python3 scripts/vectorize-logo.py public/brand/logo-original.png /tmp/saida

Requisitos: potrace (apt install potrace), Pillow, numpy.
Depois: otimize com `npx svgo --multipass` mantendo o viewBox (removeViewBox: false).

Etapas:
  1. Isola o verde do fundo grafite (canal G normalizado).
  2. Amplia 4x (Lanczos) e suaviza (Gaussian) para eliminar artefatos de compressão
     e obter curvas contínuas.
  3. Limiariza e traça símbolo e lettering separadamente (potrace).
  4. Gera a versão de tamanho óptico do símbolo (traço engrossado por dilatação
     morfológica e micro-detalhes removidos) para favicon e usos abaixo de ~48 px.
  5. Compõe os SVGs finais nas cores oficiais (#CCFF7B / #52751E).
"""
import re
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

SCALE = 4
# Caixas (px) medidas na arte original de 2000x667
SYMBOL_BOX = (162, 137, 543, 535)
TEXT_BOX = (609, 249, 1849, 415)
GREEN, GREEN_LIGHT, GRAPHITE = "#CCFF7B", "#52751E", "#3F3F3F"


def trace(src, box, out, pad, blur, grow=0, turd=40, opt=0.3):
    x0, y0, x1, y1 = box
    crop = (x0 - pad, y0 - pad, x1 + pad, y1 + pad)
    im = Image.open(src).convert("RGB").crop(crop)
    g = np.asarray(im.getchannel("G")).astype(float)
    a = np.clip((g - 54) / (250 - 54) * 255, 0, 255).astype("uint8")
    g = Image.fromarray(a).resize((im.width * SCALE, im.height * SCALE), Image.LANCZOS)
    g = g.filter(ImageFilter.GaussianBlur(blur))
    if grow:
        g = g.filter(ImageFilter.MaxFilter(grow))
    g.point(lambda v: 0 if v >= 128 else 255, "1").save(out.with_suffix(".pbm"))
    subprocess.run(
        ["potrace", str(out.with_suffix(".pbm")), "-s", "-o", str(out), "-t", str(turd),
         "-a", "1.0", "-O", str(opt), "--flat", "-u", "10"],
        check=True,
    )
    s = out.read_text()
    transform = re.search(r'<g transform="([^"]+)"', s).group(1)
    d = re.sub(r"\s+", " ", " ".join(re.findall(r'<path d="([^"]+)"', s)))
    return crop[0], crop[1], transform, d


def group(part, ox, oy):
    cx, cy, transform, d = part
    return (f'<g transform="translate({cx - ox} {cy - oy}) scale({1 / SCALE})">'
            f'<g transform="{transform}"><path d="{d}"/></g></g>')


def svg(w, h, body, fill, title, bg=None, rx=0):
    rect = f'<rect width="{w}" height="{h}" rx="{rx}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
            f'role="img" aria-labelledby="t"><title id="t">{title}</title>{rect}<g fill="{fill}">{body}</g></svg>\n')


def main(src, outdir):
    out = Path(outdir)
    out.mkdir(parents=True, exist_ok=True)
    sym = trace(src, SYMBOL_BOX, out / "_symbol.svg", 12, 1.6)
    txt = trace(src, TEXT_BOX, out / "_text.svg", 12, 1.2)
    small = trace(src, SYMBOL_BOX, out / "_small.svg", 40, 3.0, grow=21, turd=400, opt=0.6)

    h = group(sym, 160, 135) + group(txt, 160, 135)
    s = group(sym, 160, 135)
    sm = group(small, 155, 130)
    files = {
        "logo-horizontal-dark.svg": svg(1692, 403, h, GREEN, "Fiapo de Manga"),
        "logo-horizontal-light.svg": svg(1692, 403, h, GREEN_LIGHT, "Fiapo de Manga"),
        "logo-horizontal-mono.svg": svg(1692, 403, h, "#000000", "Fiapo de Manga"),
        "logo-symbol-dark.svg": svg(386, 403, s, GREEN, "Fiapo de Manga — Luli"),
        "logo-symbol-light.svg": svg(386, 403, s, GREEN_LIGHT, "Fiapo de Manga — Luli"),
        "logo-symbol-small.svg": svg(396, 413, sm, GREEN, "Fiapo de Manga — Luli"),
    }
    # Assinatura compacta (símbolo de tamanho óptico) para header/menu (< 56 px de altura)
    hc = group(small, 155, 130) + group(txt, 155, 130)
    files["logo-horizontal-compact.svg"] = svg(1697, 410, hc, GREEN, "Fiapo de Manga")
    size = 512
    sc = size * 0.78 / 413
    fav = f'<g transform="translate({(size - 396 * sc) / 2:.2f} {(size - 413 * sc) / 2:.2f}) scale({sc:.5f})">{sm}</g>'
    files["favicon.svg"] = svg(size, size, fav, GREEN, "Fiapo de Manga", bg=GRAPHITE, rx=112)
    pad = 120
    files["logo-horizontal-on-graphite.svg"] = svg(
        1692 + 2 * pad, 403 + 2 * pad, f'<g transform="translate({pad} {pad})">{h}</g>', GREEN, "Fiapo de Manga",
        bg=GRAPHITE,
    )
    for name, content in files.items():
        (out / name).write_text(content)
        print(name)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
