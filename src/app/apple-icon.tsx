import { ImageResponse } from 'next/og';

/**
 * Ícone de aplicativo gerado no build a partir do mesmo traçado do favicon:
 * X amarelo sobre quadrado preto. Manter o símbolo em código evita que o
 * arquivo binário saia de sincronia com a marca.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#111111',
        }}
      >
        <svg width="132" height="132" viewBox="0 0 100 100">
          <path
            d="M17 24 H33 L50 44 L67 24 H83 L58 50 L83 76 H67 L50 56 L33 76 H17 L42 50 Z"
            fill="#E0A800"
          />
        </svg>
      </div>
    ),
    size,
  );
}
