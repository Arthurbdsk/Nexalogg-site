import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site';
import { Reveal } from '@/components/ui/Reveal';

const { advisor } = siteConfig;

/** Iniciais usadas na composição gráfica enquanto não houver retrato oficial. */
const initials = advisor.name
  .split(' ')
  .map((part) => part[0])
  .slice(0, 2)
  .join('');

export function AdvisorSection() {
  return (
    <section
      id="alexandre-felix"
      aria-labelledby="advisor-titulo"
      className="relative scroll-mt-24 border-t border-paper/10 bg-ink-900 py-section"
    >
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden border border-paper/12 bg-ink-800">
              {advisor.photo ? (
                <Image
                  src={advisor.photo}
                  alt={advisor.photoAlt || `Retrato de ${advisor.name}`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 34vw"
                  className="object-cover transition-transform duration-[1200ms] ease-outexpo hover:scale-[1.03]"
                />
              ) : (
                <div className="absolute inset-0" aria-hidden="true">
                  <svg viewBox="0 0 400 500" className="h-full w-full" role="presentation">
                    <defs>
                      <pattern id="advisor-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M40 0H0v40" fill="none" stroke="#F4F3EF" strokeOpacity="0.05" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="400" height="500" fill="url(#advisor-grid)" />
                    <circle cx="200" cy="250" r="150" fill="none" stroke="#F4F3EF" strokeOpacity="0.08" strokeWidth="1" />
                    <circle cx="200" cy="250" r="108" fill="none" stroke="#C4682B" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 7" />
                    <path d="M0 392 L120 340 L268 372 L400 300" fill="none" stroke="#C4682B" strokeOpacity="0.5" strokeWidth="1.5" />
                    <circle cx="120" cy="340" r="4" fill="#D98A4C" />
                    <circle cx="268" cy="372" r="4" fill="#D98A4C" />
                    <text
                      x="200"
                      y="272"
                      textAnchor="middle"
                      fontSize="96"
                      fontFamily="var(--font-display), sans-serif"
                      fontWeight="700"
                      fill="#F4F3EF"
                      fillOpacity="0.12"
                      letterSpacing="6"
                    >
                      {initials}
                    </text>
                  </svg>
                </div>
              )}
            </div>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal>
              <span className="label-muted flex items-center gap-3">
                <span className="h-px w-8 bg-copper-500/70" aria-hidden="true" />
                Liderança
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="advisor-titulo" className="mt-6 text-display-md">
                {advisor.name}
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-lead text-copper-300">{advisor.role}</p>
            </Reveal>

            {advisor.bio.length > 0 ? (
              <Reveal delay={180}>
                <div className="mt-8 space-y-5">
                  {advisor.bio.map((paragraph) => (
                    <p key={paragraph} className="text-[1.0625rem] leading-[1.75] text-paper/65">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={200}>
              <div className="mt-10 border-t border-paper/12 pt-8">
                <Link
                  href="/metodologia"
                  className="group inline-flex items-center gap-3 text-[0.9375rem] text-copper-300 transition-colors duration-300 hover:text-copper-200"
                >
                  <span className="relative">
                    Conhecer o Programa D90
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-copper-400 transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
                    />
                  </span>
                  <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform duration-300 ease-outexpo group-hover:translate-x-1" fill="none" aria-hidden="true">
                    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </Link>
              </div>
            </Reveal>

            {advisor.linkedin ? (
              <Reveal delay={240}>
                <a
                  href={advisor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 text-[0.9375rem] text-copper-300 transition-colors duration-300 hover:text-copper-200"
                >
                  <span className="relative">
                    Perfil no LinkedIn
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-copper-400 transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
                    />
                  </span>
                </a>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
