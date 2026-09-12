'use client';

import { usePointerOffset } from '@/hooks/usePointerOffset';

export function BrandPanel() {
  const { ref: pointerRef, offset } = usePointerOffset<HTMLDivElement>(1);

  return (
    <div
      ref={pointerRef}
      className="pointer-events-none absolute inset-y-0 right-[-82%] flex w-[150%] items-center opacity-20 sm:right-[-22%] sm:w-[70%] sm:opacity-90 lg:right-[-12%] lg:w-[54%]"
      aria-hidden="true"
    >
      <div
        className="relative aspect-[1.074] w-full transition-transform duration-700 ease-outexpo"
        style={{
          transform: `translate3d(${offset.x * 10}px, ${offset.y * 10}px, 0)`,
        }}
      >
        <div className="brand-mark-settle h-full w-full">
          <svg
            viewBox="0 0 2048 1907"
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
            focusable="false"
          >
            <defs>
              <mask
                id="brand-panel-reveal"
                x="0"
                y="0"
                width="2048"
                height="1907"
                maskUnits="userSpaceOnUse"
              >
                <rect width="2048" height="1907" fill="black" />
                <path
                  className="brand-draw-primary"
                  d="M 20 20 L 2028 1887"
                  pathLength={1}
                  fill="none"
                  stroke="white"
                  strokeWidth="520"
                  strokeLinecap="round"
                />
                <path
                  className="brand-draw-secondary"
                  d="M 2028 20 L 20 1887"
                  pathLength={1}
                  fill="none"
                  stroke="white"
                  strokeWidth="520"
                  strokeLinecap="round"
                />
              </mask>
            </defs>

            <image
              href="/images/nexallog-simbolo-oficial.png"
              width="2048"
              height="1907"
              preserveAspectRatio="xMidYMid meet"
              mask="url(#brand-panel-reveal)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
