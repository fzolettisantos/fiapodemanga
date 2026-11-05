import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { brandAssets } from "@/config/brand";

const publicDir = path.resolve(__dirname, "../public");
const brandDir = path.join(publicDir, "brand");

describe("arquivos de marca", () => {
  it("todos os caminhos de brandAssets existem", () => {
    const srcs = Object.values(brandAssets).flatMap((v) => (typeof v === "object" ? [v.src] : []));
    for (const src of srcs) expect(existsSync(path.join(publicDir, src)), src).toBe(true);
  });

  it("SVGs são vetores reais, com viewBox e sem imagem rasterizada embutida", () => {
    const svgs = readdirSync(brandDir).filter((f) => f.endsWith(".svg"));
    expect(svgs.length).toBeGreaterThanOrEqual(8);
    for (const file of svgs) {
      const content = readFileSync(path.join(brandDir, file), "utf8");
      expect(content, file).toMatch(/viewBox="/);
      expect(content, file).toMatch(/<path/);
      expect(content, file).not.toMatch(/<image|data:image/);
    }
  });
});
