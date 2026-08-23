'use client';

import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';
import { cx } from '@/lib/utils';

type ContactChannelsProps = {
  className?: string;
  /** Origem do clique, enviada junto ao evento de analytics. */
  local: string;
  variant?: 'stacked' | 'inline';
};

/**
 * Exibe apenas os canais efetivamente configurados em src/lib/site.ts.
 * Enquanto os dados oficiais não existirem, nada é renderizado, o que evita
 * qualquer placeholder visível para o usuário final.
 */
export function ContactChannels({ className, local, variant = 'stacked' }: ContactChannelsProps) {
  const { email, phone, whatsapp } = siteConfig.contact;
  const channels: { href: string; label: string; caption: string; event: 'email_click' | 'telefone_click' | 'whatsapp_click' }[] = [];

  if (email.value) {
    channels.push({
      href: `mailto:${email.value}`,
      label: email.label ?? email.value,
      caption: 'E-mail',
      event: 'email_click',
    });
  }
  if (phone.value) {
    channels.push({
      href: `tel:${phone.value.replace(/[^\d+]/g, '')}`,
      label: phone.label ?? phone.value,
      caption: 'Telefone',
      event: 'telefone_click',
    });
  }
  if (whatsapp.value) {
    channels.push({
      href: `https://wa.me/${whatsapp.value.replace(/\D/g, '')}`,
      label: whatsapp.label ?? 'WhatsApp',
      caption: 'WhatsApp',
      event: 'whatsapp_click',
    });
  }

  if (channels.length === 0) return null;

  return (
    <ul
      className={cx(
        variant === 'inline' ? 'flex flex-wrap items-center gap-x-8 gap-y-4' : 'space-y-4',
        className,
      )}
    >
      {channels.map((channel) => (
        <li key={channel.href}>
          <a
            href={channel.href}
            onClick={() => track(channel.event, { local })}
            target={channel.event === 'whatsapp_click' ? '_blank' : undefined}
            rel={channel.event === 'whatsapp_click' ? 'noopener noreferrer' : undefined}
            className="group inline-flex flex-col gap-1"
          >
            <span className="label-muted">{channel.caption}</span>
            <span className="relative w-fit text-[1.0625rem] text-paper/85 transition-colors duration-300 group-hover:text-copper-200">
              {channel.label}
              <span
                aria-hidden="true"
                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-copper-400 transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
              />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
