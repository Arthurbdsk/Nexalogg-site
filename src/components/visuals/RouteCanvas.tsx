'use client';

import { useReveal } from '@/hooks/useReveal';
import { usePointerOffset } from '@/hooks/usePointerOffset';
import { cx } from '@/lib/utils';

type Waypoint = {
  x: number;
  y: number;
  code: string;
  label: string;
};

/**
 * Percurso do Programa D90 desenhado como rota operacional.
 * Os pontos representam as quatro etapas da metodologia, do dado bruto
 * até o plano em execução.
 */
const WAYPOINTS: Waypoint[] = [
  { x: 70, y: 372, code: 'D+0', label: 'Diagnóstico' },
  { x: 236, y: 296, code: 'D+30', label: 'Identificação' },
  { x: 404, y: 214, code: 'D+60', label: 'Plano de Ação' },
  { x: 566, y: 106, code: 'D+90', label: 'Execução' },
];

const PATH = WAYPOINTS.map((point, index) =>
  index === 0 ? `M${point.x} ${point.y}` : `L${point.x} ${point.y}`,
).join(' ');

/** Conexões secundárias que sugerem a malha em torno do percurso principal. */
const MESH: [number, number, number, number][] = [
  [70, 372, 152, 456],
  [236, 296, 152, 456],
  [236, 296, 300, 400],
  [404, 214, 300, 400],
  [404, 214, 480, 318],
  [566, 106, 480, 318],
  [566, 106, 636, 216],
  [152, 456, 300, 400],
];

const SATELLITES: [number, number][] = [
  [152, 456],
  [300, 400],
  [480, 318],
  [636, 216],
];

export function RouteCanvas({ className }: { className?: string }) {
  const { ref: revealRef, visible } = useReveal<HTMLDivElement>({ threshold: 0.25 });
  const { ref: pointerRef, offset } = usePointerOffset<HTMLDivElement>(1);

  return (
    <div
      ref={pointerRef}
      className={cx('relative isolate w-full', className)}
      aria-hidden="true"
    >
      <div
        ref={revealRef}
        className="relative w-full"
        style={{
          transform: `translate3d(${offset.x * 8}px, ${offset.y * 8}px, 0)`,
          transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg
          viewBox="0 0 720 520"
          className="h-auto w-full overflow-visible"
          role="presentation"
          data-visible={visible}
        >
          <defs>
            <linearGradient id="route-line" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#C4682B" stopOpacity="0.35" />
              <stop offset="55%" stopColor="#D98A4C" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#E7A874" />
            </linearGradient>
            <radialGradient id="route-glow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#C4682B" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#C4682B" stopOpacity="0" />
            </radialGradient>
            <pattern id="route-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M60 0H0v60" fill="none" stroke="#F4F3EF" strokeOpacity="0.06" strokeWidth="1" />
            </pattern>
          </defs>

          <rect x="0" y="0" width="720" height="520" fill="url(#route-grid)" />

          <circle cx="566" cy="106" r="150" fill="url(#route-glow)" opacity={visible ? 1 : 0}
            style={{ transition: 'opacity 1.6s ease-out 600ms' }} />

          {MESH.map(([x1, y1, x2, y2], index) => (
            <line
              key={`mesh-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#F4F3EF"
              strokeOpacity="0.14"
              strokeWidth="1"
              strokeDasharray="3 5"
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 900ms ease-out ${500 + index * 70}ms`,
              }}
            />
          ))}

          {SATELLITES.map(([x, y], index) => (
            <g key={`satellite-${x}-${y}`}>
              <circle
                cx={x}
                cy={y}
                r="3.5"
                fill="#F4F3EF"
                fillOpacity="0.35"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 700ms ease-out ${700 + index * 90}ms`,
                }}
              />
            </g>
          ))}

          <path
            d={PATH}
            fill="none"
            stroke="url(#route-line)"
            strokeWidth="2"
            strokeLinecap="square"
            strokeDasharray="900"
            strokeDashoffset={visible ? 0 : 900}
            style={{ transition: 'stroke-dashoffset 2200ms cubic-bezier(0.16, 1, 0.3, 1) 200ms' }}
          />

          <path
            d={PATH}
            fill="none"
            stroke="#E7A874"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="14 886"
            className="motion-safe:animate-travel"
            opacity={visible ? 0.9 : 0}
          />

          {WAYPOINTS.map((point, index) => {
            const isLast = index === WAYPOINTS.length - 1;
            return (
              <g
                key={point.code}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'none' : 'translateY(10px)',
                  transformOrigin: `${point.x}px ${point.y}px`,
                  transition: `opacity 700ms ease-out ${600 + index * 260}ms, transform 700ms cubic-bezier(0.16,1,0.3,1) ${600 + index * 260}ms`,
                }}
              >
                {isLast ? (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="16"
                    fill="none"
                    stroke="#D98A4C"
                    strokeOpacity="0.4"
                    strokeWidth="1"
                    className="motion-safe:animate-pulseline"
                  />
                ) : null}
                <circle cx={point.x} cy={point.y} r="7" fill="#05080D" stroke="#D98A4C" strokeWidth="2" />
                <circle cx={point.x} cy={point.y} r="2.5" fill="#E7A874" />
                <text
                  x={point.x}
                  y={point.y - 26}
                  fill="#E7A874"
                  fontSize="11"
                  letterSpacing="1.8"
                  fontFamily="var(--font-mono), monospace"
                >
                  {point.code}
                </text>
                <text
                  x={point.x}
                  y={point.y + 32}
                  fill="#F4F3EF"
                  fillOpacity="0.6"
                  fontSize="13"
                  fontFamily="var(--font-sans), sans-serif"
                >
                  {point.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
