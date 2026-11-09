// Gera src/papo-reto/generated/character-manifest.json com as caricaturas de public/papo-reto/characters.
// Assim o site sabe, sem requisições extras, quais expressões já foram fornecidas e quais
// precisam do placeholder neutro. Roda sozinho antes de `dev` e `build`.
import { readdir, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const CHAR_DIR = join(ROOT, "public", "papo-reto", "characters");
const OUT = join(ROOT, "src", "papo-reto", "generated", "character-manifest.json");
const RANKINGS = ["falou-merda", "sabio", "bala-do-veio"];
const STATES = ["top", "middle", "bottom", "neutral"];
const EXTENSIONS = ["avif", "webp", "png"];

const manifest = {};
if (existsSync(CHAR_DIR)) {
  for (const character of (await readdir(CHAR_DIR, { withFileTypes: true })).filter((d) => d.isDirectory())) {
    for (const ranking of RANKINGS) {
      const dir = join(CHAR_DIR, character.name, ranking);
      if (!existsSync(dir)) continue;
      const files = await readdir(dir);
      for (const state of STATES) {
        const ext = EXTENSIONS.find((e) => files.includes(`${state}.${e}`));
        if (!ext) continue;
        manifest[character.name] ??= {};
        manifest[character.name][ranking] ??= {};
        manifest[character.name][ranking][state] = `/papo-reto/characters/${character.name}/${ranking}/${state}.${ext}`;
      }
    }
  }
}

// Ilustrações dos rankings (ao lado do título): public/papo-reto/rankings/<ranking>.<ext>
const RANKING_DIR = join(ROOT, "public", "papo-reto", "rankings");
const illustrations = {};
if (existsSync(RANKING_DIR)) {
  const files = await readdir(RANKING_DIR);
  for (const ranking of RANKINGS) {
    const ext = EXTENSIONS.find((e) => files.includes(`${ranking}.${e}`));
    if (ext) illustrations[ranking] = `/papo-reto/rankings/${ranking}.${ext}`;
  }
}
await writeFile(
  join(ROOT, "src", "papo-reto", "generated", "ranking-illustrations.json"),
  JSON.stringify(illustrations, null, 2) + "\n",
);

await mkdir(join(ROOT, "src", "papo-reto", "generated"), { recursive: true });
await writeFile(OUT, JSON.stringify(manifest, null, 2) + "\n");
const count = Object.values(manifest).flatMap((r) => Object.values(r).flatMap((s) => Object.keys(s))).length;
console.log(`[characters] ${count} caricatura(s) encontrada(s) em public/papo-reto/characters.`);
