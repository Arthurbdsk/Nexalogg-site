/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Domínios temporários de deploy não devem ser indexados. Quando o
        // domínio oficial for conectado, esta regra deixa de ser aplicada.
        source: '/:path*',
        has: [{ type: 'host', value: '(?<sub>.*)\\.vercel\\.app' }],
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/fonts/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
      { source: '/sobre', destination: '/a-nexallog', permanent: true },
      { source: '/quem-somos', destination: '/a-nexallog', permanent: true },
      { source: '/d90', destination: '/metodologia', permanent: true },
      { source: '/programa-d90', destination: '/metodologia', permanent: true },
      { source: '/servicos', destination: '/solucoes', permanent: true },
      { source: '/contato-nexallog', destination: '/contato', permanent: true },
      { source: '/privacidade', destination: '/politica-de-privacidade', permanent: true },
      { source: '/termos', destination: '/termos-de-uso', permanent: true },
    ];
  },
};

export default nextConfig;
