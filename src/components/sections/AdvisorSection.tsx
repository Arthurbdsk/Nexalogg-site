import Image from 'next/image';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/lib/site';

const { advisor } = siteConfig;

/** Iniciais usadas na composição gráfica caso não haja retrato disponível. */
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
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden border border-paper/12 bg-ink-800">
                {advisor.photo ? (
                  <Image
                    src={advisor.photo}
                    alt={advisor.photoAlt || `Retrato de ${advisor.name}`}
                    fill
                    priority={false}
                    sizes="(max-width: 1024px) 90vw, 34vw"
                    className="object-cover object-top brightness-95 contrast-[1.04] saturate-[0.9] transition-transform duration-[1400ms] ease-outexpo hover:scale-[1.04]"
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

                {/* Integra o retrato ao fundo da seção, sem alterar o rosto */}
                {advisor.photo ? (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink-900 via-ink-900/45 to-transparent"
                  />
                ) : null}
              </div>

              {advisor.linkedin && advisor.linkedinQr ? (
                <a
                  href={advisor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group absolute -bottom-7 right-[-1.75rem] hidden flex-col items-center gap-2 border border-paper/12 bg-ink-800 p-3 transition-colors duration-300 hover:border-copper-400/60 lg:flex"
                >
                  <Image
                    src={advisor.linkedinQr}
                    alt={`QR code para o perfil de ${advisor.name} no LinkedIn`}
                    width={76}
                    height={76}
                    className="h-[76px] w-[76px]"
                  />
                  <span className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-slateink-400 transition-colors duration-300 group-hover:text-copper-300">
                    LinkedIn
                  </span>
                </a>
              ) : null}
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
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
              <p className="mt-4 text-lead text-copper-300">{advisor.role}</p>
            </Reveal>

            {advisor.summary.length > 0 ? (
              <Reveal delay={150}>
                <div className="mt-8 space-y-5">
                  {advisor.summary.map((paragraph) => (
                    <p key={paragraph} className="text-[1.0625rem] leading-[1.75] text-paper/65">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ) : null}

            <Reveal delay={160}>
              <p className="mt-9 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-paper/12 pt-8">
                <span className="font-display text-[3.25rem] font-semibold leading-none tracking-tight text-paper">
                  <Counter value={advisor.experienceYears} suffix="+" />
                </span>
                <span className="text-[1.0625rem] leading-snug text-paper/65">
                  {advisor.experienceLabel}
                </span>
              </p>
            </Reveal>

            <ul className="mt-8 border-t border-paper/12">
              {advisor.highlights.map((item, index) => (
                <Reveal as="li" key={item} delay={200 + index * 70}>
                  <div className="flex items-start gap-5 border-b border-paper/12 py-4">
                    <span className="mt-2 h-px w-6 shrink-0 bg-copper-500" aria-hidden="true" />
                    <span className="text-[0.9375rem] leading-[1.7] text-paper/75">{item}</span>
                  </div>
                </Reveal>
              ))}
            </ul>

            {advisor.education.length > 0 ? (
              <Reveal delay={260}>
                <div className="mt-8">
                  <h3 className="label-muted">Formação</h3>
                  <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                    {advisor.education.map((item) => (
                      <li
                        key={item}
                        className="border border-paper/12 px-4 py-2 text-sm text-paper/70"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}

            {advisor.linkedin ? (
              <Reveal delay={300}>
                <a
                  href={advisor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-9 inline-flex h-12 items-center gap-3 rounded-full border border-paper/20 px-6 text-[0.9375rem] text-paper transition-colors duration-300 ease-outexpo hover:border-copper-400/70 hover:text-copper-200"
                >
                  Ver perfil no LinkedIn
                  <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform duration-300 ease-outexpo group-hover:translate-x-1" fill="none" aria-hidden="true">
                    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                  </svg>
                </a>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
