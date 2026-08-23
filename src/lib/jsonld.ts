import { absoluteUrl, siteConfig } from './site';

type Json = Record<string, unknown>;

/** Remove chaves vazias para nunca publicar propriedades sem dado real. */
function clean<T extends Json>(input: T): T {
  const output: Json = {};
  for (const [key, value] of Object.entries(input)) {
    if (value === null || value === undefined || value === '') continue;
    if (Array.isArray(value) && value.length === 0) continue;
    if (typeof value === 'object' && !Array.isArray(value)) {
      const nested = clean(value as Json);
      if (Object.keys(nested).length === 0) continue;
      output[key] = nested;
      continue;
    }
    output[key] = value;
  }
  return output as T;
}

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;

export function organizationSchema() {
  const { address, contact, legal, social } = siteConfig;
  const hasAddress = Boolean(address.street && address.city);

  return clean({
    '@type': 'Organization',
    '@id': organizationId,
    name: siteConfig.name,
    legalName: siteConfig.legalName || undefined,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    logo: absoluteUrl('/images/nexallog-logo.svg'),
    image: absoluteUrl(siteConfig.ogImage),
    email: contact.email.value ?? undefined,
    telephone: contact.phone.value ?? undefined,
    taxID: legal.cnpj || undefined,
    areaServed: 'BR',
    knowsAbout: [
      'Transportes e Logística',
      'Diagnóstico financeiro e operacional',
      'Indicadores gerenciais',
      'Transformação logística',
      'WMS',
      'TMS',
    ],
    sameAs: social.map((item) => item.href),
    founder: { '@id': `${siteConfig.url}/a-nexallog#alexandre-felix` },
    contactPoint: contact.email.value
      ? {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: contact.email.value,
          telephone: contact.phone.value ?? undefined,
          areaServed: 'BR',
          availableLanguage: 'Portuguese',
        }
      : undefined,
    address: hasAddress
      ? {
          '@type': 'PostalAddress',
          streetAddress: address.street,
          addressLocality: address.city,
          addressRegion: address.state,
          postalCode: address.postalCode,
          addressCountry: address.country,
        }
      : undefined,
  });
}

export function websiteSchema() {
  return clean({
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: 'pt-BR',
    publisher: { '@id': organizationId },
  });
}

export function webPageSchema(input: { path: string; name: string; description: string }) {
  return clean({
    '@type': 'WebPage',
    '@id': `${absoluteUrl(input.path)}#webpage`,
    url: absoluteUrl(input.path),
    name: input.name,
    description: input.description,
    inLanguage: 'pt-BR',
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
  });
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(input: { name: string; description: string; path: string }) {
  return clean({
    '@type': 'Service',
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    serviceType: input.name,
    provider: { '@id': organizationId },
    areaServed: { '@type': 'Country', name: 'Brasil' },
    audience: {
      '@type': 'BusinessAudience',
      name: 'Empresas de Transportes e Logística',
    },
  });
}

const personId = `${siteConfig.url}/a-nexallog#alexandre-felix`;

/** Person montado a partir dos dados oficiais em siteConfig.advisor. */
export function personSchema(input: { path: string }) {
  const { advisor } = siteConfig;

  return clean({
    '@type': 'Person',
    '@id': personId,
    name: advisor.name,
    jobTitle: advisor.role,
    description: advisor.highlights.join('. '),
    image: advisor.photo ? absoluteUrl(advisor.photo) : undefined,
    url: absoluteUrl(input.path),
    worksFor: { '@id': organizationId },
    sameAs: advisor.linkedin ? [advisor.linkedin] : [],
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Fundação Getulio Vargas' },
      { '@type': 'CollegeOrUniversity', name: 'Stanford Graduate School of Business' },
    ],
    knowsAbout: [
      'Operações',
      'Logística',
      'Supply chain',
      'Redes logísticas',
      'Centros de distribuição',
      'Reconfiguração de malhas',
    ],
  });
}

/** Monta o grafo final pronto para injeção em uma tag script. */
export function graph(nodes: Json[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
