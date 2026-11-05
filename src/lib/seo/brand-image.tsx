/**
 * Ícone PROVISÓRIO gerado por código (monograma tipográfico "f").
 * Quando o símbolo oficial da Luli estiver em /public/brand, substitua:
 *   - src/app/icon.tsx       → src/app/icon.png (cópia de favicon.png)
 *   - src/app/apple-icon.tsx → src/app/apple-icon.png (cópia de apple-touch-icon.png)
 */
export function ProvisionalMonogram({ size }: { size: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#3f3f3f",
        color: "#ccff7b",
        fontSize: size * 0.72,
        fontWeight: 700,
        letterSpacing: "-0.06em",
        borderRadius: size * 0.22,
        paddingBottom: size * 0.08,
      }}
    >
      f
    </div>
  );
}
