'use client';

export function BrandPanel() {
  return (
    <div
      className="pointer-events-none absolute bottom-0 right-4 w-[68%] opacity-10 sm:right-6 sm:w-[46%] sm:opacity-90 lg:inset-y-0 lg:right-0 lg:h-full lg:w-auto"
      aria-hidden="true"
    >
      <div className="relative aspect-[2048/1838] w-full lg:h-full lg:w-auto">
        <div className="brand-mark-settle h-full w-full">
          <svg
            viewBox="0 62 2048 1838"
            className="block h-full w-full lg:w-auto lg:max-w-none"
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
