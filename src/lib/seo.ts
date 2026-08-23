import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from './site';

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** Quando true, a página não entra no índice (ex.: estados de erro). */
  noIndex?: boolean;
  /** Caminho de imagem específica de Open Graph. */
  image?: string;
  /** Substitui o título completo, ignorando o sufixo padrão do site. */
  absoluteTitle?: string;
  type?: 'website' | 'article' | 'profile';
};

/**
 * Constrói o metadata de uma página com canonical, Open Graph e Twitter Card
 * consistentes em todo o site.
 */
export function buildMetadata({
  title,
  description,
  path,
  noIndex = false,
  image = siteConfig.ogImage,
  absoluteTitle,
  type = 'website',
}: SeoInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: absoluteTitle ?? title,
      description,
      locale: 'pt_BR',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name}. ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: absoluteTitle ?? title,
      description,
      images: [imageUrl],
    },
  };
}
