import type { CSSProperties, ReactNode } from "react";

/**
 * Ilustrações isométricas das especialidades.
 * Linguagem própria da Fiapo de Manga: traço grafite fino sobre papel claro e as formas
 * geométricas dos ícones de "Nossa abordagem" (círculos sobrepostos, meias-luas, camadas,
 * cartões com check e barras) em tons de amarelo da marca.
 * SVG desenhado em código (projeção isométrica), decorativo (aria-hidden).
 * Animações em globals.css ("Ilustrações das especialidades"): entram uma vez quando o bloco
 * aparece na tela e mantêm um movimento leve; desligadas com prefers-reduced-motion.
 */

const INK = "#212121";
const LINE = "#BDB8AA";
const PAPER = "#FFFFFF";
const Y1 = "#FFF6B3";
const Y2 = "#FFF04A";
const Y3 = "#E8C91C";

const CX = 240;
const CY = 196;
const COS = 0.866;
const SIN = 0.5;

/** Ponto do plano isométrico (x, y no chão; z para cima) em coordenadas da tela. */
const P = (x: number, y: number, z = 0): [number, number] => [CX + (x - y) * COS, CY + (x + y) * SIN - z];
const pts = (list: [number, number][]) => list.map(([a, b]) => `${a.toFixed(1)},${b.toFixed(1)}`).join(" ");

/** Grupo desenhado no plano do chão, na altura z. */
function Plane({ z = 0, className, style, children }: { z?: number; className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <g className={className} style={style}>
      <g transform={`translate(${CX} ${CY - z}) matrix(${COS} ${SIN} ${-COS} ${SIN} 0 0)`}>{children}</g>
    </g>
  );
}

/** Plano vertical (em pé) ao longo do eixo x, na profundidade y. */
function Standing({ y, children }: { y: number; children: ReactNode }) {
  const [tx, ty] = P(0, y, 0);
  return <g transform={`translate(${tx} ${ty}) matrix(${COS} ${SIN} 0 -1 0 0)`}>{children}</g>;
}

/** Bloco isométrico (topo + duas faces visíveis). */
function Box({
  x,
  y,
  w,
  d,
  h,
  top = Y2,
  left = Y3,
  right = "#CFAF12",
  className,
  style,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  top?: string;
  left?: string;
  right?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <g className={className} style={style}>
      <polygon points={pts([P(x, y + d, 0), P(x + w, y + d, 0), P(x + w, y + d, h), P(x, y + d, h)])} fill={left} stroke={INK} />
      <polygon points={pts([P(x + w, y, 0), P(x + w, y + d, 0), P(x + w, y + d, h), P(x + w, y, h)])} fill={right} stroke={INK} />
      <polygon points={pts([P(x, y, h), P(x + w, y, h), P(x + w, y + d, h), P(x, y + d, h)])} fill={top} stroke={INK} />
    </g>
  );
}

/** Linha vertical tracejada entre o chão e uma altura (guia de projeção). */
function Guide({ x, y, z }: { x: number; y: number; z: number }) {
  const [a, b] = P(x, y, 0);
  const [, c] = P(x, y, z);
  return (
    <g>
      <line x1={a} y1={b} x2={a} y2={c} stroke={INK} strokeDasharray="3 4" />
      <Plane>
        <ellipse cx={x} cy={y} rx={5} ry={5} fill={PAPER} stroke={INK} />
      </Plane>
    </g>
  );
}

function Base({ lines = true, grid = false, dots = false }: { lines?: boolean; grid?: boolean; dots?: boolean }) {
  return (
    <Plane>
      <rect x={-150} y={-110} width={300} height={220} rx={18} fill={PAPER} stroke={INK} />
      {lines
        ? Array.from({ length: 7 }, (_, i) => (
            <line key={i} x1={-112} y1={-72 + i * 24} x2={112} y2={-72 + i * 24} stroke={LINE} />
          ))
        : null}
      {grid
        ? Array.from({ length: 9 }, (_, i) => (
            <g key={i}>
              <line x1={-120 + i * 30} y1={-95} x2={-120 + i * 30} y2={95} stroke={LINE} />
              {i < 7 ? <line x1={-135} y1={-90 + i * 30} x2={135} y2={-90 + i * 30} stroke={LINE} /> : null}
            </g>
          ))
        : null}
      {dots
        ? Array.from({ length: 63 }, (_, i) => (
            <circle key={i} cx={-120 + (i % 9) * 30} cy={-90 + Math.floor(i / 9) * 30} r={1.8} fill={LINE} />
          ))
        : null}
    </Plane>
  );
}

/* ---------- 01 Pesquisa e Discovery: lente (círculos sobrepostos) sobre os dados ---------- */
function Discovery() {
  return (
    <>
      <Base />
      <Guide x={-45} y={45} z={78} />
      <Guide x={55} y={-35} z={78} />
      <Plane>
        <circle cx={-10} cy={10} r={14} fill="none" stroke={INK} strokeDasharray="2 3" className="svc-ping" />
      </Plane>
      <g className="svc-float">
        <Plane z={78}>
          <defs>
            <clipPath id="svc-discovery-clip">
              <circle cx={-28} cy={0} r={62} />
            </clipPath>
          </defs>
          <circle cx={-28} cy={0} r={62} fill={Y1} stroke={INK} className="svc-slide-a" />
          <g className="svc-slide-b">
            <circle cx={28} cy={0} r={62} fill={Y2} fillOpacity={0.9} stroke={INK} />
            <circle cx={28} cy={0} r={62} fill={Y3} clipPath="url(#svc-discovery-clip)" stroke={INK} />
          </g>
        </Plane>
      </g>
    </>
  );
}

/* ---------- 02 Estratégia de Produto: caminho com marcos crescentes ---------- */
function Strategy() {
  const [fx, fy] = P(100, -60, 92);
  return (
    <>
      <Base lines={false} grid />
      <Plane>
        <polyline
          points="-120,80 -60,40 -15,52 40,-10 100,-60"
          fill="none"
          stroke={INK}
          strokeWidth={1.6}
          strokeDasharray="7 5"
          className="svc-march"
        />
        <circle cx={-120} cy={80} r={9} fill={Y1} stroke={INK} />
      </Plane>
      <Box x={-75} y={25} w={30} d={30} h={30} top={Y1} left={Y2} right={Y3} className="svc-rise" style={{ "--k": 0 } as CSSProperties} />
      <Box x={25} y={-25} w={30} d={30} h={58} top={Y2} left={Y3} className="svc-rise" style={{ "--k": 1 } as CSSProperties} />
      <g className="svc-rise" style={{ "--k": 2 } as CSSProperties}>
        <Box x={85} y={-75} w={30} d={30} h={92} top={Y2} left={Y3} />
        <line x1={fx} y1={fy - 2} x2={fx} y2={fy - 52} stroke={INK} strokeWidth={1.4} />
        {/* meia-lua: a forma de "Descobrir" usada como bandeira */}
        <path d={`M${fx} ${fy - 52} a 15 15 0 0 1 0 30 Z`} fill={Y3} stroke={INK} className="svc-flag" />
      </g>
    </>
  );
}

/* ---------- 03 Product Design e UX/UI: camadas da interface ---------- */
function ProductDesign() {
  const corners: [number, number][] = [
    [-120, 90],
    [120, 90],
    [120, -90],
  ];
  return (
    <>
      {corners.map(([x, y]) => {
        const [a, b] = P(x, y, 0);
        const [, c] = P(x, y, 100);
        return <line key={`${x}${y}`} x1={a} y1={b} x2={a} y2={c} stroke={LINE} strokeDasharray="3 4" />;
      })}
      <Plane className="svc-layer" style={{ "--k": 0 } as CSSProperties}>
        <rect x={-120} y={-90} width={240} height={180} rx={16} fill={PAPER} stroke={INK} />
        {Array.from({ length: 5 }, (_, i) => (
          <line key={i} x1={-95} y1={-55 + i * 26} x2={95} y2={-55 + i * 26} stroke={LINE} />
        ))}
      </Plane>
      <Plane z={50} className="svc-layer" style={{ "--k": 1 } as CSSProperties}>
        <rect x={-120} y={-90} width={240} height={180} rx={16} fill={Y1} stroke={INK} />
        <rect x={-95} y={-65} width={190} height={40} rx={8} fill="none" stroke={INK} strokeDasharray="4 4" />
        <rect x={-95} y={-10} width={90} height={75} rx={8} fill="none" stroke={INK} strokeDasharray="4 4" />
        <rect x={5} y={-10} width={90} height={75} rx={8} fill="none" stroke={INK} strokeDasharray="4 4" />
      </Plane>
      <Plane z={100} className="svc-layer svc-float" style={{ "--k": 2 } as CSSProperties}>
        <rect x={-120} y={-90} width={240} height={180} rx={16} fill={Y2} stroke={INK} />
        <rect x={-95} y={-65} width={190} height={40} rx={8} fill={PAPER} stroke={INK} />
        <rect x={-95} y={-10} width={90} height={75} rx={8} fill={Y3} stroke={INK} />
        <rect x={5} y={-10} width={90} height={75} rx={8} fill={PAPER} stroke={INK} />
        <line x1={20} y1={12} x2={80} y2={12} stroke={INK} />
        <line x1={20} y1={30} x2={64} y2={30} stroke={INK} />
      </Plane>
    </>
  );
}

/* ---------- 04 Sites e Experiências Web: página no navegador + cursor ---------- */
function Websites() {
  const [cx, cy] = P(55, -25, 80);
  return (
    <>
      <Plane>
        <rect x={-150} y={-110} width={300} height={220} rx={14} fill={PAPER} stroke={INK} />
        <line x1={-150} y1={-84} x2={150} y2={-84} stroke={INK} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={-132 + i * 14} cy={-97} r={4} fill={i === 0 ? Y3 : "none"} stroke={INK} />
        ))}
        <rect x={-125} y={-68} width={250} height={74} rx={8} fill={Y2} stroke={INK} className="svc-glow" />
        <line x1={-108} y1={-46} x2={10} y2={-46} stroke={INK} strokeWidth={2.4} />
        <line x1={-108} y1={-28} x2={-20} y2={-28} stroke={INK} />
        {[-125, -37, 50].map((x, i) => (
          <g key={x}>
            <rect x={x} y={20} width={75} height={62} rx={7} fill={i === 1 ? Y1 : PAPER} stroke={INK} />
            <line x1={x + 12} y1={60} x2={x + 55} y2={60} stroke={LINE} />
            <line x1={x + 12} y1={70} x2={x + 40} y2={70} stroke={LINE} />
          </g>
        ))}
        <circle cx={55} cy={-25} r={12} fill="none" stroke={INK} className="svc-ping" />
      </Plane>
      <g className="svc-float">
        <line x1={cx} y1={cy + 2} x2={cx} y2={P(55, -25, 0)[1]} stroke={INK} strokeDasharray="3 4" />
        <path
          d={`M${cx} ${cy} l0 30 l8 -8 l6 13 l6 -3 l-6 -12 l11 0 Z`}
          fill={INK}
          stroke={INK}
          strokeLinejoin="round"
        />
      </g>
    </>
  );
}

/* ---------- 05 Aplicativos, Sistemas e Plataformas: painel com barras + celular ---------- */
function Apps() {
  return (
    <>
      <Base lines={false} grid />
      <Plane>
        <polyline points="-125,-70 -90,-52 -55,-78 -20,-58" fill="none" stroke={INK} strokeWidth={1.6} />
        {[
          [-125, -70],
          [-90, -52],
          [-55, -78],
          [-20, -58],
        ].map(([x, y]) => (
          <circle key={`${x}`} cx={x} cy={y} r={4} fill={Y2} stroke={INK} />
        ))}
      </Plane>
      <Box x={-118} y={25} w={26} d={26} h={34} top={Y1} left={Y2} right={Y3} className="svc-rise" style={{ "--k": 0 } as CSSProperties} />
      <Box x={-78} y={25} w={26} d={26} h={62} top={Y2} left={Y3} className="svc-rise" style={{ "--k": 1 } as CSSProperties} />
      <Box x={-38} y={25} w={26} d={26} h={96} top={Y2} left={Y3} className="svc-rise" style={{ "--k": 2 } as CSSProperties} />
      <g className="svc-float">
        <Standing y={-10}>
          <rect x={40} y={0} width={70} height={128} rx={10} fill={PAPER} stroke={INK} />
          <rect x={47} y={14} width={56} height={100} rx={5} fill={Y1} stroke={INK} />
          <rect x={54} y={22} width={42} height={26} rx={3} fill={Y2} stroke={INK} />
          <line x1={54} y1={60} x2={92} y2={60} stroke={INK} />
          <line x1={54} y1={72} x2={84} y2={72} stroke={INK} />
          <line x1={54} y1={84} x2={88} y2={84} stroke={INK} />
        </Standing>
      </g>
    </>
  );
}

/* ---------- 06 E-commerce: produtos + cartão de checkout com check ---------- */
function Ecommerce() {
  const [checkX, checkY] = P(73, -17, 92);
  return (
    <>
      <Base />
      <Plane>
        <polyline points="-60,40 -10,0 40,-15" fill="none" stroke={INK} strokeDasharray="6 5" className="svc-march" />
      </Plane>
      <Box x={-118} y={20} w={46} d={46} h={46} top={Y2} left={Y3} className="svc-rise" style={{ "--k": 0 } as CSSProperties} />
      <Box x={-62} y={48} w={34} d={34} h={34} top={Y1} left={Y2} right={Y3} className="svc-rise" style={{ "--k": 1 } as CSSProperties} />
      <Box x={-110} y={-42} w={30} d={30} h={30} top={PAPER} left={Y1} right={Y2} className="svc-rise" style={{ "--k": 2 } as CSSProperties} />
      <Guide x={20} y={-70} z={70} />
      <g className="svc-float">
        <Plane z={70}>
          <rect x={0} y={-70} width={100} height={72} rx={10} fill={Y1} stroke={INK} />
        </Plane>
        <Plane z={92}>
          <rect x={18} y={-56} width={110} height={78} rx={10} fill={Y2} stroke={INK} />
        </Plane>
        {/* check desenhado de frente (como no ícone "Validar"), sobre o cartão */}
        <path
          d={`M${checkX - 16} ${checkY} l11 11 l22 -24`}
          fill="none"
          stroke={INK}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          className="svc-check"
        />
      </g>
    </>
  );
}

/* ---------- 07 Design, Tecnologia e IA: rede de nós + faísca ---------- */
function AI() {
  const nodes: [number, number][] = [
    [-95, -45],
    [-30, -80],
    [55, -60],
    [95, 5],
    [-75, 40],
    [10, 70],
    [75, 60],
  ];
  const [sx, sy] = P(0, 0, 150);
  return (
    <>
      <Base lines={false} dots />
      <Plane>
        <ellipse cx={0} cy={0} rx={34} ry={34} fill={Y1} stroke={INK} strokeDasharray="3 4" />
      </Plane>
      <Guide x={0} y={0} z={80} />
      <g className="svc-float">
        <Plane z={80}>
          {nodes.map(([x, y]) => (
            <line key={`l${x}`} x1={0} y1={0} x2={x} y2={y} stroke={INK} />
          ))}
          <line x1={-95} y1={-45} x2={-30} y2={-80} stroke={LINE} />
          <line x1={55} y1={-60} x2={95} y2={5} stroke={LINE} />
          <line x1={-75} y1={40} x2={10} y2={70} stroke={LINE} />
          <line x1={10} y1={70} x2={75} y2={60} stroke={LINE} />
          {nodes.map(([x, y], i) => (
            <circle
              key={`n${x}`}
              cx={x}
              cy={y}
              r={10}
              fill={i % 2 ? Y1 : Y2}
              stroke={INK}
              className="svc-node"
              style={{ "--k": i } as CSSProperties}
            />
          ))}
          <circle cx={0} cy={0} r={24} fill={Y3} stroke={INK} />
        </Plane>
        <path
          d={`M${sx} ${sy - 22} Q ${sx + 3} ${sy - 3} ${sx + 22} ${sy} Q ${sx + 3} ${sy + 3} ${sx} ${sy + 22} Q ${sx - 3} ${sy + 3} ${sx - 22} ${sy} Q ${sx - 3} ${sy - 3} ${sx} ${sy - 22} Z`}
          fill={Y2}
          stroke={INK}
          className="svc-spark"
        />
      </g>
    </>
  );
}

/** Ajuste fino de enquadramento por cena (translate x y, escala). */
const framing: Record<string, string> = {
  "product-design-ux-ui": "translate(24 46) scale(0.9)",
  "design-tecnologia-ia": "translate(0 18)",
  "criacao-de-sites": "translate(0 8)",
};

const scenes: Record<string, () => ReactNode> = {
  "pesquisa-ux-discovery": Discovery,
  "estrategia-de-produto": Strategy,
  "product-design-ux-ui": ProductDesign,
  "criacao-de-sites": Websites,
  "aplicativos-sistemas-plataformas": Apps,
  ecommerce: Ecommerce,
  "design-tecnologia-ia": AI,
};

export function ServiceIllustration({ slug, className }: { slug: string; className?: string }) {
  const Scene = scenes[slug];
  if (!Scene) return null;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 480 360"
      className={`svc-illu block h-auto w-full ${className ?? ""}`}
      fill="none"
      strokeWidth={1.2}
      strokeLinejoin="round"
    >
      <g transform={framing[slug]}>
        <Scene />
      </g>
    </svg>
  );
}
