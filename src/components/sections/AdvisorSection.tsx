import Image from 'next/image';
import { Section } from '@/components/layout/Section';
import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/lib/site';

const { advisor } = siteConfig;

export function AdvisorSection() {
  return (
    <Section tone="light" id="alexandre-felix" labelledBy="advisor-titulo">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              {advisor.photo ? (
                <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden bg-ink lg:max-w-none">
                  <Image
                    src={advisor.photo}
                    alt={advisor.photoAlt || `Retrato de ${advisor.name}`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 34vw"
                    className="object-cover object-top transition-transform duration-[1400ms] ease-outexpo hover:scale-[1.03]"
                  />
                </div>
              ) : null}

              {advisor.linkedin && advisor.linkedinQr ? (
                <a
                  href={advisor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group absolute -bottom-5 right-[-1.25rem] hidden flex-col items-center gap-1.5 bg-brand-500 p-3 transition-transform duration-300 ease-outexpo hover:-translate-y-1 lg:flex"
                >
                  <Image
                    src={advisor.linkedinQr}
                    alt={`QR code para o perfil de ${advisor.name} no LinkedIn`}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px]"
                  />
                  <span className="text-[0.5625rem] font-bold uppercase tracking-[0.16em] text-ink">
                    LinkedIn
                  </span>
                </a>
              ) : null}
            </div>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 id="advisor-titulo" className="text-display-md">
                {advisor.name}
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-3 text-lead font-semibold text-brand-600">{advisor.role}</p>
            </Reveal>

            <Reveal delay={140}>
              <p className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="text-[3rem] font-bold leading-none tracking-tight">
                  <Counter value={advisor.experienceYears} suffix="+" />
                </span>
                <span className="text-[1.0625rem] leading-snug text-content/65">
                  {advisor.experienceLabel}
                </span>
              </p>
            </Reveal>

            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {advisor.highlights.map((item, index) => (
                <Reveal as="li" key={item} delay={180 + index * 60}>
                  <div className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-2 h-0.5 w-4 shrink-0 bg-brand-500" />
                    <span className="text-[0.9375rem] leading-snug text-content/70">{item}</span>
                  </div>
                </Reveal>
              ))}
            </ul>

            {advisor.linkedin ? (
              <Reveal delay={260}>
                <a
                  href={advisor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-9 inline-flex items-center gap-3 text-[0.9375rem] font-semibold transition-opacity duration-300 hover:opacity-70"
                >
                  Ver perfil no LinkedIn
                  <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform duration-300 ease-outexpo group-hover:translate-x-1" fill="none" aria-hidden="true">
                    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                  </svg>
                </a>
              </Reveal>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
