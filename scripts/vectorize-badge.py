#!/usr/bin/env python3
"""
Vetorização da ilustração "Vamos conversar" (Luli com a caneca + lettering em arco).

Uso:
  python3 scripts/vectorize-badge.py public/brand/vamos-conversar-original.webp /tmp/vamos-conversar.svg
  npx svgo --multipass  (com removeViewBox, collapseGroups e moveGroupAttrsToElems desligados)
  → public/brand/vamos-conversar.svg

Requisitos: potrace, Pillow, numpy, scipy. Otimize depois com svgo (mantendo viewBox e ids/classes).

Cada cor vira uma camada traçada com potrace: contorno escuro, branco, cinza, verde e amarelo.
Cada letra é traçada separadamente, com o centro e a direção radial anotados em variáveis CSS,
para a animação de onda. As cores usam variáveis CSS, então o desenho acompanha o tema do site.
"""
import re
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage as nd

S = 3  # fator de ampliação para o traçado


def trace_mask(mask, blur=1.2, turd=30, opt=0.4):
    """Traça uma máscara booleana (resolução original) e retorna a string `d` no espaço original."""
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
    return f'<g transform="scale({1 / S})"><g transform="{transform}"><path d="{d}"/></g></g>'


def opening(mask, size=3):
    return nd.binary_opening(mask, structure=np.ones((size, size)))


def main(src, out):
    im = np.asarray(Image.open(src).convert("RGB")).astype(float)
    R, G, B = im[..., 0], im[..., 1], im[..., 2]
    lum = 0.2126 * R + 0.7152 * G + 0.0722 * B
    h, w = lum.shape
    light = lum > 120

    lab, n = nd.label(light)
    sizes = nd.sum(light, lab, range(1, n + 1))
    objs = nd.find_objects(lab)
    cy0, cx0 = h / 2, w / 2

    # O maior componente é a Luli; peças próximas a ele (caneca, pata, língua, vapor) também.
    main_id = int(np.argmax(sizes)) + 1
    my = objs[main_id - 1]
    dog_ids, letter_ids = [main_id], []
    for i, o in enumerate(objs, start=1):
        if i == main_id or sizes[i - 1] < 150:
            continue
        cy = (o[0].start + o[0].stop) / 2
        cx = (o[1].start + o[1].stop) / 2
        r = np.hypot(cx - cx0, cy - cy0)
        inside = my[0].start - 40 < cy < my[0].stop + 10 and my[1].start < cx < my[1].stop + 60
        (dog_ids if inside and r < 420 else letter_ids).append(i)

    dog = np.isin(lab, dog_ids)
    # Contorno/fundo escuro da ilustração: fecha os traços internos e preenche os vazios.
    ink = nd.binary_fill_holes(nd.binary_closing(dog, structure=np.ones((15, 15)), iterations=2))
    ink = nd.binary_dilation(ink, structure=np.ones((3, 3)), iterations=7)

    near_dog = nd.binary_dilation(dog, iterations=2)
    white = light & near_dog
    grey = opening((lum > 150) & (lum < 230) & (np.abs(R - B) < 22) & (np.abs(R - G) < 22) & near_dog, 3)
    green = opening((G - R > 25) & (G - B > 80) & near_dog, 3)
    yellow = opening((R - B > 110) & (R - G > -15) & (G > 150) & near_dog, 2)

    layers = [
        ("badge-ink", ink),
        ("badge-white", white),
        ("badge-grey", grey),
        ("badge-green", green),
        ("badge-yellow", yellow),
    ]
    # Cores padrão (o arquivo funciona sozinho); no site, o CSS sobrescreve via classes.
    colors = {"badge-ink": "#161616", "badge-white": "#FFFFFF", "badge-grey": "#CFCFCF",
              "badge-green": "#CCFF7B", "badge-yellow": "#FFF04A", "badge-letter": "#FFFFFF"}

    body = [f'<g class="{cls}" fill="{colors[cls]}">{trace_mask(m)}</g>' for cls, m in layers if cls != "badge-yellow"]

    # Amarelo: o vapor toca o topo da caneca; o restante é a língua.
    rows = np.argwhere(green & (np.arange(h)[:, None] > h * 0.5))[:, 0]
    cup_top = rows.min() if rows.size else h
    ylab, _ = nd.label(yellow)
    steam = np.zeros_like(yellow)
    tongue = np.zeros_like(yellow)
    for i, o in enumerate(nd.find_objects(ylab), start=1):
        target = steam if o[0].stop >= cup_top - 12 else tongue
        target |= ylab == i
    y = colors["badge-yellow"]
    body.append(f'<g class="badge-yellow" fill="{y}">{trace_mask(tongue)}</g>')
    body.append(f'<g class="badge-yellow badge-steam" fill="{y}">{trace_mask(steam, blur=1.0)}</g>')

    letters = []
    # ordena as letras: arco superior da esquerda para a direita, depois o inferior
    info = []
    for i in letter_ids:
        o = objs[i - 1]
        cy = (o[0].start + o[0].stop) / 2
        cx = (o[1].start + o[1].stop) / 2
        info.append((cy > cy0, cx, cy, i))
    info.sort()
    for k, (_, cx, cy, i) in enumerate(info):
        m = nd.binary_dilation(lab == i, iterations=1) & light
        dx, dy = cx - cx0, cy - cy0
        r = np.hypot(dx, dy) or 1
        letters.append(
            f'<g class="badge-letter" fill="{colors["badge-letter"]}" style="--i:{k};--dx:{dx / r:.3f};--dy:{dy / r:.3f}">'
            f'{trace_mask(m, turd=60)}</g>'
        )

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" class="badge-svg" role="img" '
        f'aria-labelledby="badge-title"><title id="badge-title">Vamos conversar</title>'
        f'<g class="badge-ring">{"".join(letters)}</g>'
        f'<g class="badge-dog">{"".join(body)}</g></svg>\n'
    )
    Path(out).parent.mkdir(parents=True, exist_ok=True)
    Path(out).write_text(svg)
    print("letras:", len(letters), "peças da Luli:", len(dog_ids), "→", out)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
