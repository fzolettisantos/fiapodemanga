# Vídeos de demonstração dos cases

Cenas disponíveis: `ged-ai` (plataforma web) e `supergasbras-app-revenda` (app em celular, telas recortadas em `screens/`).

Cada case pode ter uma cena em HTML (`<slug>/scene.html`) montada com as telas reais do produto:
cursor, cliques, zoom e transições são definidos numa linha do tempo determinística (`window.render(t)`).

## Gerar o vídeo

```bash
mkdir -p /tmp/frames
node scripts/case-video/render.cjs "$PWD/scripts/case-video/ged-ai" 30   # grava os quadros em <pasta>/frames
ffmpeg -framerate 30 -i scripts/case-video/ged-ai/frames/%04d.png -c:v libx264 -preset slow -crf 24 \
  -pix_fmt yuv420p -movflags +faststart -an public/images/projetos/ged-ai/demo.mp4
ffmpeg -framerate 30 -i scripts/case-video/ged-ai/frames/%04d.png -c:v libvpx-vp9 -b:v 0 -crf 36 \
  -pix_fmt yuv420p -an public/images/projetos/ged-ai/demo.webm
```

Antes, crie a pasta `frames` dentro da pasta da cena. Requer Playwright (Chromium) e ffmpeg.
Os quadros não devem ir para o repositório (`frames/` está no .gitignore).
