/**
 * Ícones das etapas do processo (Entender, Descobrir, Desenhar, Validar, Evoluir).
 * SVG geométrico desenhado à mão, em três tons de amarelo (tokens --icon-1..3 por tema).
 * Animação pontual: roda uma vez quando a etapa entra na tela (ver "Ícones do processo" em globals.css).
 */
type IconProps = { index: number };

function Entender() {
  // Dois círculos que se sobrepõem: o encontro entre contexto e objetivos.
  return (
    <>
      <defs>
        <clipPath id="ps-venn-clip">
          <circle cx="34" cy="36" r="28" />
        </clipPath>
      </defs>
      <circle className="ic-1 ic-venn-a" cx="34" cy="36" r="28" />
      <circle className="ic-1 ic-venn-b" cx="62" cy="36" r="28" />
      <circle className="ic-2 ic-venn-overlap" cx="62" cy="36" r="28" clipPath="url(#ps-venn-clip)" />
    </>
  );
}

function Descobrir() {
  // Duas metades que se abrem.
  return (
    <>
      <path className="ic-2 ic-half-a" d="M16 8a28 28 0 0 1 0 56Z" />
      <path className="ic-1 ic-half-b" d="M52 8a28 28 0 0 1 0 56Z" />
    </>
  );
}

function Desenhar() {
  // Camadas empilhadas: jornadas, fluxos e interfaces.
  const layer = (y: number, cls: string, i: number) => (
    <path
      key={i}
      className={`${cls} ic-layer`}
      style={{ "--k": i } as React.CSSProperties}
      d={`M48 ${y}L80 ${y + 15}L48 ${y + 30}L16 ${y + 15}Z`}
      strokeWidth="7"
      strokeLinejoin="round"
    />
  );
  return <>{[layer(32, "ic-3", 2), layer(20, "ic-2", 1), layer(8, "ic-1", 0)]}</>;
}

function Validar() {
  // Protótipo + aprovação.
  return (
    <>
      <rect className="ic-1 ic-card-back" x="8" y="26" width="44" height="40" rx="8" />
      <rect className="ic-2 ic-card-front" x="34" y="6" width="46" height="44" rx="8" />
      <path
        className="ic-check"
        d="M47 28l8 8 14-15"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
    </>
  );
}

function Evoluir() {
  // Barras crescentes: melhoria contínua.
  return (
    <>
      <rect className="ic-2 ic-bar" style={{ "--k": 0 } as React.CSSProperties} x="10" y="46" width="18" height="20" rx="5" />
      <rect className="ic-3 ic-bar" style={{ "--k": 1 } as React.CSSProperties} x="38" y="30" width="18" height="36" rx="5" />
      <rect className="ic-3 ic-bar" style={{ "--k": 2 } as React.CSSProperties} x="66" y="8" width="18" height="58" rx="5" />
    </>
  );
}

const icons = [Entender, Descobrir, Desenhar, Validar, Evoluir];

export function ProcessIcon({ index }: IconProps) {
  const Icon = icons[index];
  if (!Icon) return null;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 96 72"
      className={`step-icon step-icon--${index + 1} h-16 w-auto overflow-visible md:h-[4.5rem]`}
    >
      <Icon />
    </svg>
  );
}
