'use client';

import { useEffect, useRef, useState } from 'react';
import { ContactForm } from '@/components/sections/ContactForm';
import { track } from '@/lib/analytics';

export function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  if (!open) {
    return (
      <div className="whatsapp-attention fixed bottom-6 right-6 z-[60] rounded-full">
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            track('whatsapp_click', { local: 'floating_button' });
          }}
          aria-label="Iniciar conversa pelo WhatsApp"
          aria-expanded="false"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_32px_-12px_rgb(17_17_17/0.55)] transition-transform duration-300 ease-outexpo hover:scale-105 focus-visible:scale-105"
        >
          <WhatsAppIcon />
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Acesso rápido ao WhatsApp"
      className="tone-dark fixed bottom-5 right-5 z-[60] w-[min(24rem,calc(100vw-2.5rem))] border border-line/25 bg-surface p-6 text-content shadow-[0_24px_70px_rgb(0_0_0/0.35)]"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-lg font-bold">Falar pelo WhatsApp</p>
          <p className="mt-2 text-sm leading-relaxed text-content/65">
            Informe seu nome e sua empresa para iniciar a conversa.
          </p>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fechar acesso ao WhatsApp"
          className="flex h-9 w-9 shrink-0 items-center justify-center border border-line/25 text-xl leading-none transition-colors hover:border-line"
        >
          ×
        </button>
      </div>
      <div className="mt-6">
        <ContactForm compact idPrefix="whatsapp-flutuante" local="floating_panel" onComplete={() => setOpen(false)} />
      </div>
    </aside>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
      <path d="M12 2a9.8 9.8 0 0 0-8.47 14.72L2 22l5.4-1.42A9.98 9.98 0 1 0 12 2Zm0 17.98a8 8 0 0 1-4.08-1.12l-.3-.18-3.2.84.86-3.12-.2-.32A7.98 7.98 0 1 1 12 19.98Zm4.38-5.98c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.2-1.42-1.34-1.66-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}
