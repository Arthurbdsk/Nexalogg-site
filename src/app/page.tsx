import { ScrollDepthTracker } from '@/components/layout/ScrollDepthTracker';
import { AboutSection } from '@/components/sections/AboutSection';
import { AdvisorSection } from '@/components/sections/AdvisorSection';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { Hero } from '@/components/sections/Hero';
import { MethodologySection } from '@/components/sections/MethodologySection';
import { ProblemsSection } from '@/components/sections/ProblemsSection';
import { ResultsSection } from '@/components/sections/ResultsSection';
import { JsonLd } from '@/components/ui/JsonLd';
import { graph, personSchema, serviceSchema, webPageSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

const title = `${siteConfig.name} | ${siteConfig.tagline}`;
const description =
  'Consultoria para empresas de Transportes e Logística. Diagnóstico financeiro e operacional, identificação de causas estruturais, plano de ação de 90 dias e suporte direto na execução.';

export const metadata = {
  ...buildMetadata({ title, description, path: '/' }),
  title,
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ path: '/', name: title, description }),
          serviceSchema({
            name: 'Programa D90',
            description:
              'Programa de diagnóstico financeiro e operacional, identificação de causas estruturais, plano de ação de 90 dias e suporte na execução para empresas de Transportes e Logística.',
            path: '/metodologia',
          }),
          personSchema({ path: '/a-nexallog' }),
        ])}
      />
      <ScrollDepthTracker />

      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <AboutSection />
        <ProblemsSection />
        <MethodologySection />
        <EcosystemSection />
        <ResultsSection />
        <AdvisorSection />
        <FinalCta />
      </main>
    </>
  );
}
