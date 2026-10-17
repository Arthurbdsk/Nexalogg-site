import Link from 'next/link';
import { getCopy } from '@/i18n/server';
import { podcast, postPath } from '@/lib/blog';
import { InterviewVideo } from './InterviewVideo';

export async function PodcastFeature() {
  if (!podcast?.videoId) return null;
  const t = await getCopy();
  return (
    <section aria-labelledby="podcast-titulo" className="tone-muted bg-surface py-section text-content">
      <div className="shell grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 id="podcast-titulo" className="text-display-md">{t('O caixa no centro da conversa.')}</h2>
          <p className="mt-6 text-lead text-content/70">
            {t('Alexandre Felix no Algoritmo.Pro: gestão, caixa e os desafios de Transporte e Logística. Assista ao episódio completo sem sair do site.')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href={postPath(podcast)} className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">
              {t('Ver a entrevista no blog')} <span aria-hidden="true" className="ml-3">→</span>
            </Link>
            <a href="https://www.instagram.com/reel/DeOxvZszNnw/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-semibold text-accent underline underline-offset-4">
              {t('Ver recorte no Instagram')}
            </a>
          </div>
        </div>
        <InterviewVideo videoId={podcast.videoId} title={podcast.videoTitle} subtitle={podcast.videoSubtitle} source={podcast.videoSource} />
      </div>
    </section>
  );
}
