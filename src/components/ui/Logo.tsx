import Image from 'next/image';
import { cx } from '@/lib/utils';

type MarkProps = {
  className?: string;
};

export function BrandMark({ className }: MarkProps) {
  return (
    <span className={cx('relative inline-block aspect-[1.074]', className)} aria-hidden="true">
      <Image
        src="/images/nexallog-simbolo-oficial.png"
        alt=""
        fill
        sizes="(max-width: 768px) 40vw, 32rem"
        className="object-contain"
      />
    </span>
  );
}

type LogoProps = {
  className?: string;
  markOnly?: boolean;
  withTagline?: boolean;
  surface?: 'auto' | 'light' | 'dark';
};

export function Logo({ className, markOnly = false, surface = 'auto' }: LogoProps) {
  if (markOnly) return <BrandMark className={className} />;

  const common = 'h-auto w-full object-contain object-left';

  return (
    <span className={cx('inline-block w-[12.5rem] max-w-full', className)}>
      {surface !== 'dark' ? (
        <Image
          src="/images/nexallog-logo-oficial-claro.png"
          alt="NEXALLOG. Conectando caminhos, gerando resultados."
          width={800}
          height={148}
          priority
          className={cx(common, surface === 'auto' && 'brand-logo-light')}
        />
      ) : null}
      {surface !== 'light' ? (
        <Image
          src="/images/nexallog-logo-oficial-escuro-transparente.png"
          alt="NEXALLOG. Conectando caminhos, gerando resultados."
          width={693}
          height={136}
          priority
          className={cx(common, surface === 'auto' && 'brand-logo-dark')}
        />
      ) : null}
    </span>
  );
}

export function NexacashLogo({ className }: { className?: string }) {
  return (
    <span className={cx('inline-flex flex-col leading-none', className)} aria-label="NEXACASH">
      <span className="text-[1.4rem] font-extrabold tracking-[0.12em]">
        <span className="text-accent">NEXA</span>
        <span className="text-content">CASH</span>
      </span>
      <span className="mt-1 text-[0.43rem] font-semibold uppercase tracking-[0.21em] text-content/55">
        Gestão financeira em tempo real
      </span>
    </span>
  );
}
