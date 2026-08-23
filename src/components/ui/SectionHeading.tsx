import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { cx } from '@/lib/utils';

type SectionHeadingProps = {
  /** Número técnico da seção, no padrão da grade do site. */
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  className?: string;
  size?: 'md' | 'lg';
};

export function SectionHeading({
  index,
  title,
  description,
  as: Tag = 'h2',
  align = 'left',
  className,
  size = 'md',
}: SectionHeadingProps) {
  return (
    <div
      className={cx(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {index ? (
        <Reveal>
          <span className="label-muted mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-copper-500/70" aria-hidden="true" />
            {index}
          </span>
        </Reveal>
      ) : null}
      <Reveal delay={index ? 60 : 0}>
        <Tag className={size === 'lg' ? 'text-display-lg' : 'text-display-md'}>{title}</Tag>
      </Reveal>
      {description ? (
        <Reveal delay={140}>
          <div
            className={cx(
              'mt-6 max-w-prose text-lead text-paper/65',
              align === 'center' && 'mx-auto',
            )}
          >
            {description}
          </div>
        </Reveal>
      ) : null}
    </div>
  );
}
