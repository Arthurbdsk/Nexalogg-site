import { ScrollDepthTracker } from '@/components/layout/ScrollDepthTracker';
import { InterviewFeature } from '@/components/blog/InterviewFeature';
import { PodcastFeature } from '@/components/blog/PodcastFeature';
import { CompanyOverview } from '@/components/sections/CompanyOverview';
import { AboutSection } from '@/components/sections/AboutSection';
import { AdvisorSection } from '@/components/sections/AdvisorSection';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { Hero } from '@/components/sections/Hero';
import { KeywordMarquee } from '@/components/sections/KeywordMarquee';
import { MethodologySection } from '@/components/sections/MethodologySection';
import { ProblemsSection } from '@/components/sections/ProblemsSection';
import { JsonLd } from '@/components/ui/JsonLd';
import { graph, personSchema, serviceSchema, webPageSchema } from '@/lib/jsonld';
import { localizedMetadata } from '@/lib/seo';
import { getCopy } from '@/i18n/server';
import { siteConfig } from '@/lib/site';

const title = `${siteConfig.name} | ${siteConfig.tagline}`;
const description =
  'Uma empresa construída de dentro da Operação Logística que transforma dados em resultados. Diagnóstico financeiro e operacional, NEXACASH e suporte direto na execução.';

export async function generateMetadata() {
  const t = await getCopy();
  const localizedTitle = `${siteConfig.name} | ${t(siteConfig.tagline)}`;
  return localizedMetadata({
    title: localizedTitle,
    absoluteTitle: localizedTitle,
    description,
    path: '/',
  });
}

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
          personSchema({ path: '/' }),
        ])}
      />
      <ScrollDepthTracker />

      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <KeywordMarquee />
        <CompanyOverview />
        <AboutSection withLink={false} />
        <ProblemsSection />
        <MethodologySection />
        <EcosystemSection />
        <AdvisorSection />
        <PodcastFeature />
        <InterviewFeature />
        <FinalCta />
      </main>
    </>
  );
}
