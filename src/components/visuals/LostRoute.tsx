'use client';

import { useState } from 'react';

/**
 * Rota interrompida da página 404. Ao apontar para a composição, o traçado
 * alternativo é desenhado até o ponto de retorno, reforçando a ideia de
 * recalcular caminho sem recorrer a ilustração decorativa.
 */
export function LostRoute() {
  const [rerouted, setRerouted] = useState(false);

  return (
    <div
      className="relative w-full max-w-xl"
      onMouseEnter={() => setRerouted(true)}
      onMouseLeave={() => setRerouted(false)}
      onFocus={() => setRerouted(true)}
      onBlur={() => setRerouted(false)}
      aria-hidden="true"
    >
      <svg viewBox="0 0 520 260" className="h-auto w-full" role="presentation">
        <defs>
          <pattern id="lost-grid" width="52" height="52" patternUnits="userSpaceOnUse">
            <path d="M52 0H0v52" fill="none" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="520" height="260" fill="url(#lost-grid)" />

        {/* Trajeto interrompido */}
        <path
          d="M40 208 L150 208 L214 132"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.35"
          strokeWidth="2"
          strokeLinecap="square"
        />
        <path
          d="M214 132 L268 68"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.2"
          strokeWidth="2"
          strokeDasharray="5 7"
        />
        <g>
          <circle cx="268" cy="68" r="9" fill="none" stroke="#FFFFFF" strokeOpacity="0.25" strokeWidth="2" />
          <path d="M263 63 l10 10 M273 63 l-10 10" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.6" />
        </g>

        {/* Trajeto alternativo */}
        <path
          d="M214 132 L318 168 L420 92 L480 92"
          fill="none"
          stroke="#E0A800"
          strokeWidth="2"
          strokeLinecap="square"
          strokeDasharray="360"
          strokeDashoffset={rerouted ? 0 : 360}
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
        <circle
          cx="480"
          cy="92"
          r="7"
          fill="#111111"
          stroke="#E0A800"
          strokeWidth="2"
          style={{ opacity: rerouted ? 1 : 0.25, transition: 'opacity 600ms ease 300ms' }}
        />
        <circle cx="40" cy="208" r="5" fill="#FFFFFF" fillOpacity="0.5" />
        <circle cx="214" cy="132" r="5" fill="#E0A800" />
        <text
          x="480"
          y="66"
          textAnchor="middle"
          fill="#E0A800"
          fontSize="11"
          letterSpacing="1.8"
          fontFamily="var(--font-sans), sans-serif"
          style={{ opacity: rerouted ? 1 : 0.35, transition: 'opacity 600ms ease 300ms' }}
        >
          INÍCIO
        </text>
      </svg>
    </div>
  );
}
