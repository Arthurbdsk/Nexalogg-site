import { useCopy } from '@/i18n/useCopy';
import Image from 'next/image';
import { cx } from '@/lib/utils';

type MarkProps = {
  className?: string;
};

export function BrandMark({ className }: MarkProps) {
  const t = useCopy();
  return (
    <span className={cx('relative inline-block aspect-[1.074]', className)} aria-hidden="true">
      <Image
        src="/images/nexallog-simbolo-oficial.png"
        alt={t('')}
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
  const t = useCopy();
  if (markOnly) return <BrandMark className={className} />;

  const common = 'h-auto w-full object-contain object-left';

  return (
    <span className={cx('inline-block w-[12.5rem] max-w-full', className)}>
      {surface !== 'dark' ? (
        <Image
          src="/images/nexallog-logo-oficial-claro.png"
          alt={t('NEXALLOG. Conectando caminhos, gerando resultados.')}
          width={800}
          height={148}
          priority
          className={cx(common, surface === 'auto' && 'brand-logo-light')}
        />
      ) : null}
      {surface !== 'light' ? (
        <Image
          src="/images/nexallog-logo-oficial-escuro-transparente.png"
          alt={t('NEXALLOG. Conectando caminhos, gerando resultados.')}
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
  const t = useCopy();
  const common = 'h-auto w-full object-contain object-left';

  return (
    <span
      className={cx('inline-block w-[13.5rem] max-w-full', className)}
      role="img"
      aria-label={t('NEXACASH. Mais visibilidade. Mais controle. Mais previsibilidade.')}
    >
      <Image
        src="/images/nexacash/nexacash-logo-claro.svg"
        alt={t('')}
        width={1600}
        height={257}
        priority
        className={cx(common, 'brand-logo-light')}
      />
      <Image
        src="/images/nexacash/nexacash-logo-escuro.svg"
        alt={t('')}
        width={1600}
        height={257}
        priority
        className={cx(common, 'brand-logo-dark')}
      />
    </span>
  );
}
