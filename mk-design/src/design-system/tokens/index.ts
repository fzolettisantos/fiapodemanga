/**
 * Espelho em TypeScript dos tokens de `tokens.css`.
 * Use para testes (contraste), gráficos e metadados (ex.: themeColor). Em estilos, prefira as
 * variáveis CSS / utilitários Tailwind. Mantenha os dois arquivos sincronizados (há teste).
 */
export const colors = {
  brandPrimary: "#E4F000",
  brandPrimaryHover: "#CDD900",
  brandInk: "#171717",
  surface: "#FFFFFF",
  surfaceMuted: "#F5F5F2",
  border: "#E3E3DF",
  textSecondary: "#5B5B59",
  neutralMid: "#737373",
  success: "#166534",
  error: "#B42318",
  focus: "#2456D3",
} as const;

export const radii = { input: 8, button: 10, card: 12, modal: 16 } as const;
export const spacing = [4, 8, 12, 16, 24, 32, 48, 64, 96] as const;
export const layout = { container: 1200, gutterMobile: 20, gutterDesktop: 32, tapMin: 44, controlHeight: 48 } as const;
export const motion = { fast: 150, base: 250 } as const;

export type ColorToken = keyof typeof colors;
