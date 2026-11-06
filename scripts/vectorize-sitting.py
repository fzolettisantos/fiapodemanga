#!/usr/bin/env python3
"""
Vetorização da ilustração "Vamos conversar" com a Luli sentada.

Uso:
  python3 scripts/vectorize-sitting.py public/brand/vamos-conversar-sentada-original.webp /tmp/sentada.svg
  npx svgo --multipass (removeViewBox, collapseGroups e moveGroupAttrsToElems desligados)
  → public/brand/vamos-conversar-sentada.svg

  Com --mascot, gera só a Luli (sem letreiro e traços), para o mascote do hero:
  python3 scripts/vectorize-sitting.py --mascot <entrada> /tmp/mascote.svg → public/brand/luli-mascote.svg

Requisitos: potrace, Pillow, numpy, scipy.

Camadas (traçadas separadamente com potrace):
  - cauda (contorno + branco + cinza), separada do corpo para poder abanar
  - corpo: contorno escuro, branco, cinza, verde (orelhas, caneca), língua e vapor
  - 14 letras (cada uma com centro e direção anotados em variáveis CSS)
  - 12 traços de "brilho" verdes, em 4 grupos
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as nd

S = 3
COLORS = {
    "ink": "#161616",
    "white": "#FFFFFF",
    "grey": "#CFCFCF",
    "green": "#E1FF00",
    "letter": "#FFFFFF",
}


def trace_mask(mask, blur=1.2, turd=30, opt=0.4):
    h, w = mask.shape
    img = Image.fromarray((mask * 255).astype("uint8")).resize((w * S, h * S), Image.LANCZOS)
    img = img.filter(ImageFilter.GaussianBlur(blur * S / 2))
    bw = img.point(lambda v: 0 if v >= 128 else 255, "1")
    with tempfile.TemporaryDirectory() as tmp:
        pbm, svg = Path(tmp) / "m.pbm", Path(tmp) / "m.svg"
        bw.save(pbm)
        subprocess.run(["potrace", str(pbm), "-s", "-o", str(svg), "-t", str(turd), "-a", "1.0",
                        "-O", str(opt), "--flat", "-u", "10"], check=True)
        s = svg.read_text()
    transform = re.search(r'<g transform="([^"]+)"', s).group(1)
    d = re.sub(r"\s+", " ", " ".join(re.findall(r'<path d="([^"]+)"', s)))
    if not d.strip():
        return ""
    return f'<g transform="scale({1 / S})"><g transform="{transform}"><path d="{d}"/></g></g>'


def layer(cls, mask, color, **kw):
    body = trace_mask(mask, **kw)
    return f'<g class="{cls}" fill="{color}">{body}</g>' if body else ""


def main(src, out, mascot=False):
    im = np.asarray(Image.open(src).convert("RGB")).astype(float)
    R, G, B = im[..., 0], im[..., 1], im[..., 2]
    lum = 0.2126 * R + 0.7152 * G + 0.0722 * B
    h, w = lum.shape
    light = lum > 120
    green_px = (G - B > 120) & (G > 150) & (R < G - 15)
    grey_px = (lum > 150) & (lum < 230) & (np.abs(R - B) < 22) & (np.abs(R - G) < 22)

    lab, n = nd.label(light)
    objs = nd.find_objects(lab)
    sizes = nd.sum(light, lab, range(1, n + 1))
    main_id = int(np.argmax(sizes)) + 1
    my, mx = objs[main_id - 1]
    # Região da Luli (corpo + peças vizinhas: cauda, caneca, pata, vapor, língua)
    x0, x1 = mx.start - 70, mx.stop + 70
    y0, y1 = my.start - 10, my.stop + 10

    dog_ids, letter_ids, ray_ids = [main_id], [], []
    info = {}
    for i, o in enumerate(objs, start=1):
        if i == main_id or sizes[i - 1] < 150:
            continue
        comp = lab == i
        cy, cx = (o[0].start + o[0].stop) / 2, (o[1].start + o[1].stop) / 2
        green_ratio = (comp & green_px).sum() / comp.sum()
        info[i] = (cx, cy, green_ratio, o)
        inside = x0 < cx < x1 and y0 < cy < y1
        if inside:
            dog_ids.append(i)
        elif green_ratio > 0.5:
            ray_ids.append(i)
        else:
            letter_ids.append(i)

    # Cauda: peça branca separada, à esquerda do corpo
    tail_id = min(
        (i for i in dog_ids if i != main_id and info[i][2] < 0.3),
        key=lambda i: info[i][0],
    )
    # Vapor: peça verde alta sobre a caneca; língua: peça verde pequena perto do rosto
    green_parts = [i for i in dog_ids if i != main_id and info[i][2] > 0.5]
    cup_id = max(green_parts, key=lambda i: sizes[i - 1])
    rest = [i for i in green_parts if i != cup_id]
    tongue_id = min(rest, key=lambda i: info[i][1]) if rest else None
    steam_ids = [i for i in rest if i != tongue_id]

    tail = nd.binary_dilation(lab == tail_id, iterations=1)
    body_ids = [i for i in dog_ids if i != tail_id]
    body = np.isin(lab, body_ids)

    def ink_of(mask, close=15):
        m = nd.binary_fill_holes(nd.binary_closing(mask, structure=np.ones((close, close)), iterations=2))
        return nd.binary_dilation(m, structure=np.ones((3, 3)), iterations=7)

    near_body = nd.binary_dilation(body, iterations=2)
    near_tail = nd.binary_dilation(lab == tail_id, iterations=2)
    steam = np.isin(lab, steam_ids)
    tongue = lab == tongue_id if tongue_id else np.zeros_like(light)

    tail_group = "".join([
        layer("badge-ink", ink_of(lab == tail_id, 9), COLORS["ink"]),
        layer("badge-white", light & near_tail & ~near_body, COLORS["white"]),
        layer("badge-grey", nd.binary_opening(grey_px & near_tail & ~near_body, np.ones((3, 3))), COLORS["grey"]),
    ])
    body_group = "".join([
        layer("badge-ink", ink_of(body), COLORS["ink"]),
        layer("badge-white", light & near_body & ~steam, COLORS["white"]),
        layer("badge-grey", nd.binary_opening(grey_px & near_body, np.ones((3, 3))), COLORS["grey"]),
        layer("badge-green", nd.binary_opening(green_px & near_body & ~steam & ~nd.binary_dilation(tongue, iterations=2), np.ones((3, 3))), COLORS["green"]),
        layer("badge-green", tongue, COLORS["green"]),
    ])
    steam_group = layer("badge-green", steam, COLORS["green"], blur=1.0)

    cy0, cx0 = (my.start + my.stop) / 2, (mx.start + mx.stop) / 2
    # Letras: linha de cima da esquerda para a direita, depois a de baixo
    letters = sorted(letter_ids, key=lambda i: (info[i][1] > cy0, info[i][0]))
    letter_svg = []
    for k, i in enumerate(letters):
        m = nd.binary_dilation(lab == i, iterations=1) & light
        letter_svg.append(
            f'<g class="badge-letter" fill="{COLORS["letter"]}" style="--i:{k};--row:{int(info[i][1] > cy0)}">'
            f"{trace_mask(m, turd=60)}</g>"
        )

    # Traços de brilho: agrupados por quadrante, com a direção para fora do centro
    rays_svg = []
    for k, i in enumerate(sorted(ray_ids, key=lambda i: (info[i][1] > cy0, info[i][0] > cx0, info[i][1]))):
        cx, cy = info[i][0], info[i][1]
        dx, dy = cx - cx0, cy - cy0
        r = np.hypot(dx, dy) or 1
        group = 2 * int(cy > cy0) + int(cx > cx0)
        m = nd.binary_dilation(lab == i, iterations=1) & green_px | (lab == i)
        rays_svg.append(
            f'<g class="badge-ray" fill="{COLORS["green"]}" style="--g:{group};--k:{k % 3};--dx:{dx / r:.3f};--dy:{dy / r:.3f}">'
            f"{trace_mask(m, blur=1.0)}</g>"
        )

    # viewBox recortado no conteúdo (quadrado, com respiro)
    region = np.isin(lab, dog_ids) if mascot else light
    ys, xs = np.where(region)
    cx, cy = (xs.min() + xs.max()) / 2, (ys.min() + ys.max()) / 2
    side = max(xs.max() - xs.min(), ys.max() - ys.min()) + (40 if mascot else 60)
    vb = f"{cx - side / 2:.0f} {cy - side / 2:.0f} {side:.0f} {side:.0f}"
    if mascot:
        # Mascote: só a Luli (sem letreiro e sem traços de brilho)
        letter_svg, rays_svg = [], []

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" class="badge-svg badge-sitting" role="img" '
        f'aria-labelledby="badge-sitting-title"><title id="badge-sitting-title">Vamos conversar</title>'
        f'<g class="badge-rays">{"".join(rays_svg)}</g>'
        f'<g class="badge-tail">{tail_group}</g>'
        f'<g class="badge-dog">{body_group}<g class="badge-steam">{steam_group}</g></g>'
        f'<g class="badge-ring">{"".join(letter_svg)}</g></svg>\n'
    )
    Path(out).write_text(svg)
    print(f"letras: {len(letters)}, traços: {len(ray_ids)}, cauda: {tail_id}, caneca: {cup_id}, "
          f"língua: {tongue_id}, vapor: {steam_ids} → {out}")


if __name__ == "__main__":
    args = [a for a in sys.argv[1:] if a != "--mascot"]
    if len(args) != 2:
        sys.exit(__doc__)
    main(args[0], args[1], mascot="--mascot" in sys.argv)
