/* eslint-disable @typescript-eslint/no-require-imports */
// Renderiza os quadros de uma cena: node scripts/case-video/render.cjs <pasta-da-cena> [fps]
const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const dir = process.argv[2]; const fps = +process.argv[3] || 30;
  const p = await b.newPage({ viewport: { width: 1600, height: 900 } });
  await p.goto('file://' + dir + '/scene.html'); await p.waitForTimeout(800);
  const T = await p.evaluate(() => window.T); const n = Math.round(T * fps);
  for (let i = 0; i < n; i++) {
    await p.evaluate(t => window.render(t), i / fps);
    await p.screenshot({ path: `${dir}/frames/${String(i).padStart(4, '0')}.png` });
  }
  console.log('frames', n); await b.close(); })();
