#!/usr/bin/env python3
"""
Prepara telas de produto para páginas de case.

Uso:
  python3 scripts/prepare-case-screens.py <entrada.png> <saida.webp>

- Remove o fundo branco externo (preenchimento a partir dos cantos), deixando a
  moldura da tela com fundo transparente
- Recorta a margem vazia
- Amplia 2x (Lanczos) com realce leve de nitidez
- Exporta WebP com transparência
"""
import sys
from PIL import Image, ImageDraw, ImageFilter


def main(src, out):
    im = Image.open(src).convert("RGBA")
    w, h = im.size
    # máscara do fundo externo: flood fill a partir dos 4 cantos sobre os pixels quase brancos
    rgb = im.convert("RGB")
    marker = (255, 0, 255)
    for corner in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        ImageDraw.floodfill(rgb, corner, marker, thresh=24)
    px_rgb, px = rgb.load(), im.load()
    for y in range(h):
        for x in range(w):
            if px_rgb[x, y] == marker:
                px[x, y] = (255, 255, 255, 0)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    # suaviza a borda do recorte
    alpha = im.getchannel("A").filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(alpha)
    big = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
    r, g, b, a = big.split()
    sharp = Image.merge("RGB", (r, g, b)).filter(ImageFilter.UnsharpMask(radius=1.4, percent=60, threshold=2))
    sharp.putalpha(a)
    sharp.save(out, "WEBP", quality=90, method=6)
    print(out, sharp.size)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
