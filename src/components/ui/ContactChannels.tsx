'use client';

import { track, type AnalyticsEvent } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';
import { cx } from '@/lib/utils';

type ContactChannelsProps = {
  className?: string;
  /** Origem do clique, enviada junto ao evento de analytics. */
  local: string;
  variant?: 'stacked' | 'inline';
};

type Channel = {
  key: string;
  caption: string;
  label: string;
  href: string;
  event: AnalyticsEvent;
  /** Ação complementar, usada quando o mesmo número também é WhatsApp. */
  secondary?: { label: string; href: string; event: AnalyticsEvent };
};

const digits = (value: string) => value.replace(/\D/g, '');

/**
 * Exibe apenas os canais efetivamente configurados em src/lib/site.ts.
 * Quando telefone e WhatsApp são o mesmo número, os dois viram uma única
 * entrada, evitando repetição do mesmo dado no rodapé e na página de contato.
 */
export function ContactChannels({ className, local, variant = 'stacked' }: ContactChannelsProps) {
  const { email, phone, whatsapp } = siteConfig.contact;
  const channels: Channel[] = [];

  if (email.value) {
    channels.push({
      key: 'email',
      caption: 'E-mail',
      label: email.label ?? email.value,
      href: `mailto:${email.value}`,
      event: 'email_click',
    });
  }

  const sameNumber =
    Boolean(phone.value) && Boolean(whatsapp.value) && digits(phone.value!) === digits(whatsapp.value!);

  if (phone.value) {
    channels.push({
      key: 'phone',
      caption: sameNumber ? 'Telefone e WhatsApp' : 'Telefone',
      label: phone.label ?? phone.value,
      href: `tel:+${digits(phone.value)}`,
      event: 'telefone_click',
      secondary: sameNumber
        ? {
            label: 'Abrir no WhatsApp',
            href: `https://wa.me/${digits(whatsapp.value!)}`,
            event: 'whatsapp_click',
          }
        : undefined,
    });
  }

  if (whatsapp.value && !sameNumber) {
    channels.push({
      key: 'whatsapp',
      caption: 'WhatsApp',
      label: whatsapp.label ?? whatsapp.value,
      href: `https://wa.me/${digits(whatsapp.value)}`,
      event: 'whatsapp_click',
    });
  }

  if (channels.length === 0) return null;

  return (
    <ul
      className={cx(
        variant === 'inline' ? 'flex flex-wrap items-start gap-x-10 gap-y-5' : 'space-y-5',
        className,
      )}
    >
      {channels.map((channel) => (
        <li key={channel.key} className="flex flex-col items-start">
          <a
            href={channel.href}
            onClick={() => track(channel.event, { local })}
            target={channel.href.startsWith('https') ? '_blank' : undefined}
            rel={channel.href.startsWith('https') ? 'noopener noreferrer' : undefined}
            className="group inline-flex flex-col gap-1"
          >
            <span className="label">{channel.caption}</span>
            <span className="relative w-fit text-[1.0625rem] text-content/85 transition-colors duration-300 group-hover:text-brand-500">
              {channel.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand-500 transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
              />
            </span>
          </a>

          {channel.secondary ? (
            <a
              href={channel.secondary.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(channel.secondary!.event, { local })}
              className="group mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-500 transition-opacity duration-300 hover:opacity-75"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path
                  d="M2.6 13.4 3.4 10.6A5.4 5.4 0 1 1 5.4 12.6L2.6 13.4Z"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.2 6.1c.2-.5.4-.5.6-.5h.4c.2 0 .4 0 .5.4l.4 1c.1.2 0 .4-.1.5l-.3.3c-.1.1-.2.2-.1.4.2.4.6.9 1.1 1.2.2.1.3.1.4 0l.4-.4c.1-.2.3-.2.5-.1l1 .5c.2.1.3.3.3.5 0 .5-.4 1-.9 1.1-.4.1-.9.1-1.9-.3-1.2-.5-2.1-1.7-2.2-1.8-.1-.1-.6-.8-.6-1.6 0-.7.4-1.1.5-1.2Z"
                  fill="currentColor"
                />
              </svg>
              <span className="relative">
                {channel.secondary.label}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-brand-500 transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
                />
              </span>
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
