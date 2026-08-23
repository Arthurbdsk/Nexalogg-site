'use client';

import { siteConfig } from './site';

/**
 * Eventos de conversão previstos para o site. Os nomes são estáveis e podem ser
 * mapeados diretamente em GA4 ou GTM sem alteração de código.
 */
export type AnalyticsEvent =
  | 'cta_principal_click'
  | 'cta_metodologia_click'
  | 'cta_solucoes_click'
  | 'whatsapp_click'
  | 'telefone_click'
  | 'email_click'
  | 'form_start'
  | 'form_submit'
  | 'form_success'
  | 'form_error'
  | 'scroll_depth';

type EventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const analyticsEnabled = () =>
  Boolean(siteConfig.analytics.ga4Id || siteConfig.analytics.gtmId);

/**
 * Registra um evento. Sem IDs configurados, a chamada é um no-op silencioso,
 * o que mantém o site funcional antes da configuração de analytics.
 */
export function track(event: AnalyticsEvent, payload: EventPayload = {}) {
  if (typeof window === 'undefined') return;
  const data = { event, ...payload };

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(data);
  }

  if (typeof window.gtag === 'function' && siteConfig.analytics.ga4Id) {
    window.gtag('event', event, payload);
  }

  if (!analyticsEnabled() && process.env.NODE_ENV === 'development') {
    // Facilita a validação do plano de medição antes de configurar os IDs.
    console.debug('[analytics]', data);
  }
}
