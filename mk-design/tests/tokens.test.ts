import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { colors } from "@/design-system/tokens";
import { contrastRatio } from "@/design-system/tokens/contrast";

const AA_TEXT = 4.5;
const AA_UI = 3;

describe("contraste WCAG AA", () => {
  it("texto escuro sobre amarelo da marca (CTA) e hover", () => {
    expect(contrastRatio(colors.brandInk, colors.brandPrimary)).toBeGreaterThanOrEqual(AA_TEXT);
    expect(contrastRatio(colors.brandInk, colors.brandPrimaryHover)).toBeGreaterThanOrEqual(AA_TEXT);
  });
  it("branco sobre amarelo NÃO é permitido (guia §3)", () => {
    expect(contrastRatio(colors.surface, colors.brandPrimary)).toBeLessThan(AA_UI);
  });
  it("texto principal e secundário sobre as superfícies", () => {
    for (const bg of [colors.surface, colors.surfaceMuted]) {
      expect(contrastRatio(colors.brandInk, bg)).toBeGreaterThanOrEqual(AA_TEXT);
      expect(contrastRatio(colors.textSecondary, bg)).toBeGreaterThanOrEqual(AA_TEXT);
    }
  });
  it("status e foco legíveis sobre branco", () => {
    expect(contrastRatio(colors.success, colors.surface)).toBeGreaterThanOrEqual(AA_TEXT);
    expect(contrastRatio(colors.error, colors.surface)).toBeGreaterThanOrEqual(AA_TEXT);
    expect(contrastRatio(colors.focus, colors.surface)).toBeGreaterThanOrEqual(AA_UI);
  });
  it("neutral-mid só passa AA sobre branco, não sobre surface-muted", () => {
    expect(contrastRatio(colors.neutralMid, colors.surface)).toBeGreaterThanOrEqual(AA_TEXT);
    expect(contrastRatio(colors.neutralMid, colors.surfaceMuted)).toBeLessThan(AA_TEXT);
  });
});

describe("tokens.css espelha tokens/index.ts", () => {
  const css = readFileSync("src/design-system/tokens/tokens.css", "utf8").toLowerCase();
  it.each([
    ["--mk-brand-primary", colors.brandPrimary],
    ["--mk-brand-primary-hover", colors.brandPrimaryHover],
    ["--mk-brand-ink", colors.brandInk],
    ["--mk-surface", colors.surface],
    ["--mk-surface-muted", colors.surfaceMuted],
    ["--mk-border", colors.border],
    ["--mk-text-secondary", colors.textSecondary],
    ["--mk-neutral-mid", colors.neutralMid],
    ["--mk-success", colors.success],
    ["--mk-error", colors.error],
    ["--mk-focus", colors.focus],
  ])("%s = %s", (name, hex) => {
    expect(css).toContain(`${name}: ${hex.toLowerCase()}`);
  });
});
