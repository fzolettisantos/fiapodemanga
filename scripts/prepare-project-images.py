#!/usr/bin/env python3
"""
Prepara as imagens de projetos para o site.

Uso:
  python3 scripts/prepare-project-images.py <entrada> <saida.webp>

- Amplia 2x com reamostragem Lanczos (telas de alta densidade)
- Realce de nitidez moderado (unsharp mask com limiar, para não amplificar ruído/textura)
- Exporta WebP de alta qualidade; o next/image gera AVIF/WebP responsivos a partir dele
"""
import sys
from PIL import Image, ImageFilter

SCALE = 2


def main(src, out):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    big = im.resize((w * SCALE, h * SCALE), Image.LANCZOS)
    big = big.filter(ImageFilter.UnsharpMask(radius=1.6, percent=55, threshold=3))
    big.save(out, "WEBP", quality=90, method=6)
    print(out, big.size)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
