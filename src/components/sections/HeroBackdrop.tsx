import type { CSSProperties, ReactNode } from "react";

/**
 * Fundo do hero: wireframes de sites, apps e painéis em traço fino.
 * Cada peça se move numa velocidade diferente ao rolar (parallax com CSS scroll-driven
 * animations) e flutua de leve. Decorativo (aria-hidden); desligado com reduced-motion.
 */
type Piece = {
  key: string;
  style: CSSProperties;
  speed: number;
  rot: number;
  w: number;
  h: number;
  children: ReactNode;
};

const S = "var(--wf-line)";
const F = "var(--wf-fill)";
const A = "var(--wf-accent)";

function Browser() {
  return (
    <>
      <rect x="1" y="1" width="318" height="218" rx="12" fill={F} stroke={S} />
      <line x1="1" y1="26" x2="319" y2="26" stroke={S} />
      {[16, 30, 44].map((x) => (
        <circle key={x} cx={x} cy="14" r="4" stroke={S} fill="none" />
      ))}
      <rect x="70" y="8" width="180" height="12" rx="6" stroke={S} fill="none" />
      <rect x="20" y="44" width="170" height="14" rx="3" fill={S} opacity="0.5" />
      <rect x="20" y="66" width="120" height="8" rx="2" fill={S} opacity="0.35" />
      <rect x="20" y="86" width="64" height="20" rx="10" fill={A} stroke={S} />
      <rect x="206" y="40" width="94" height="72" rx="8" stroke={S} fill="none" />
      <path d="M206 112 L238 78 L262 96 L300 60" stroke={S} fill="none" />
      {[20, 120, 220].map((x) => (
        <g key={x}>
          <rect x={x} y="128" width="80" height="72" rx="8" stroke={S} fill="none" />
          <rect x={x + 10} y="138" width="60" height="30" rx="4" fill={S} opacity="0.25" />
          <rect x={x + 10} y="176" width="44" height="6" rx="2" fill={S} opacity="0.4" />
        </g>
      ))}
    </>
  );
}

function Phone() {
  return (
    <>
      <rect x="1" y="1" width="118" height="238" rx="20" fill={F} stroke={S} />
      <rect x="44" y="10" width="32" height="6" rx="3" fill={S} opacity="0.5" />
      <rect x="14" y="30" width="92" height="54" rx="10" fill={A} stroke={S} />
      {[100, 132, 164].map((y) => (
        <g key={y}>
          <circle cx="26" cy={y + 10} r="10" stroke={S} fill="none" />
          <rect x="44" y={y + 4} width="54" height="6" rx="2" fill={S} opacity="0.45" />
          <rect x="44" y={y + 14} width="36" height="5" rx="2" fill={S} opacity="0.3" />
        </g>
      ))}
      <rect x="14" y="204" width="92" height="22" rx="11" stroke={S} fill="none" />
    </>
  );
}

function Dashboard() {
  return (
    <>
      <rect x="1" y="1" width="278" height="178" rx="12" fill={F} stroke={S} />
      <rect x="1" y="1" width="56" height="178" rx="12" stroke={S} fill="none" />
      {[24, 44, 64, 84].map((y) => (
        <rect key={y} x="14" y={y} width="30" height="6" rx="2" fill={S} opacity="0.4" />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={72 + i * 66} y="16" width="56" height="34" rx="6" stroke={S} fill={i === 1 ? A : "none"} />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={78 + i * 30} y={160 - (30 + ((i * 37) % 70))} width="16" height={30 + ((i * 37) % 70)} rx="3" stroke={S} fill="none" />
      ))}
    </>
  );
}

function Components() {
  return (
    <>
      <rect x="1" y="1" width="178" height="98" rx="12" fill={F} stroke={S} />
      <rect x="16" y="16" width="86" height="28" rx="14" fill={A} stroke={S} />
      <rect x="116" y="20" width="44" height="22" rx="11" stroke={S} fill="none" />
      <circle cx="149" cy="31" r="8" fill={S} opacity="0.6" />
      <rect x="16" y="58" width="148" height="26" rx="6" stroke={S} fill="none" />
      <rect x="26" y="68" width="70" height="6" rx="2" fill={S} opacity="0.4" />
    </>
  );
}

function Chart() {
  return (
    <>
      <rect x="1" y="1" width="198" height="138" rx="12" fill={F} stroke={S} />
      <rect x="16" y="16" width="80" height="8" rx="2" fill={S} opacity="0.5" />
      <path d="M16 112 C 50 100, 60 60, 96 72 S 150 30, 184 40" stroke={S} fill="none" strokeWidth="1.5" />
      <path d="M16 112 C 50 100, 60 60, 96 72 S 150 30, 184 40 L184 124 L16 124 Z" fill={A} opacity="0.35" />
      <circle cx="96" cy="72" r="4" fill={A} stroke={S} />
    </>
  );
}

function Wireflow() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={1 + i * 88} y="1" width="62" height="88" rx="8" fill={F} stroke={S} />
      ))}
      <path d="M63 45 H89 M151 45 H177" stroke={S} strokeDasharray="4 4" />
      <path d="M84 40 L89 45 L84 50 M172 40 L177 45 L172 50" stroke={S} fill="none" />
    </>
  );
}

const pieces: Piece[] = [
  { key: "browser", style: { top: "6%", right: "-4%", width: "min(34rem, 46vw)" }, speed: 0.35, rot: -5, w: 320, h: 220, children: <Browser /> },
  { key: "phone", style: { top: "52%", right: "30%", width: "min(8.5rem, 22vw)" }, speed: 0.7, rot: 7, w: 120, h: 240, children: <Phone /> },
  { key: "dash", style: { bottom: "-6%", left: "-5%", width: "min(26rem, 60vw)" }, speed: 0.25, rot: 4, w: 280, h: 180, children: <Dashboard /> },
  { key: "comp", style: { top: "3%", left: "44%", width: "min(11rem, 30vw)" }, speed: 0.9, rot: -3, w: 180, h: 100, children: <Components /> },
  { key: "chart", style: { bottom: "4%", right: "2%", width: "min(15rem, 40vw)" }, speed: 0.55, rot: -7, w: 200, h: 140, children: <Chart /> },
  { key: "flow", style: { top: "40%", left: "-3%", width: "min(16rem, 42vw)" }, speed: 0.45, rot: 2, w: 240, h: 90, children: <Wireflow /> },
];

export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="hero-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="hero-grid absolute inset-0" />
      {pieces.map((p, i) => (
        <div
          key={p.key}
          className="hero-wf absolute"
          style={{ ...p.style, "--speed": p.speed, "--rot": `${p.rot}deg`, "--i": i } as CSSProperties}
        >
          <svg viewBox={`0 0 ${p.w} ${p.h}`} className="hero-wf__svg block h-auto w-full overflow-visible" fill="none" strokeWidth="1.2">
            {p.children}
          </svg>
        </div>
      ))}
    </div>
  );
}
