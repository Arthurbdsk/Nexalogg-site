import type { Metadata, Viewport } from 'next';
import { Analytics } from '@/components/layout/Analytics';
import { BackToTop } from '@/components/layout/BackToTop';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ScrollProgress } from '@/components/layout/ScrollProgress';
import { SkipLink } from '@/components/layout/SkipLink';
import { JsonLd } from '@/components/ui/JsonLd';
import { montserrat } from '@/lib/fonts';
import { graph, organizationSchema, websiteSchema } from '@/lib/jsonld';
import { siteConfig } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'Consultoria em Transportes e Logística',
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: '/' },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: '#111111',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <head>
        {/* Sem JavaScript, o conteúdo com entrada progressiva permanece visível. */}
        <noscript>
          <style>{'.reveal{opacity:1 !important;transform:none !important}'}</style>
        </noscript>
      </head>
      <body>
        <JsonLd data={graph([organizationSchema(), websiteSchema()])} />
        <SkipLink />
        <ScrollProgress />
        <Header />
        {children}
        <Footer />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
