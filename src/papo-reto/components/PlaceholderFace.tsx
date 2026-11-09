import type { PlaceholderMood } from "@/papo-reto/lib/characters";
import { FACE_VIEWBOX, faceSvgInner } from "@/papo-reto/lib/face";

/** Placeholder ilustrado neutro (não retrata ninguém). Conteúdo SVG fixo, sem dados de usuário. */
export function PlaceholderFace({ mood, className }: { mood: PlaceholderMood; className?: string }) {
  return (
    <svg
      viewBox={FACE_VIEWBOX}
      className={className}
      aria-hidden
      focusable="false"
      dangerouslySetInnerHTML={{ __html: faceSvgInner(mood) }}
    />
  );
}
