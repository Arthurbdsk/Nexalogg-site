import Script from 'next/script';
import { siteConfig } from '@/lib/site';

/**
 * Carrega GA4 ou GTM apenas quando um ID estiver configurado.
 * A estratégia afterInteractive mantém o script fora do caminho crítico
 * de renderização, preservando LCP e INP.
 */
export function Analytics() {
  const { ga4Id, gtmId } = siteConfig.analytics;

  if (!ga4Id && !gtmId) return null;

  return (
    <>
      {gtmId ? (
        <Script id="gtm-loader" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}

      {ga4Id ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-config" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${ga4Id}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}
    </>
  );
}
