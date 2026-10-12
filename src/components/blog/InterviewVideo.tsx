'use client';

import { useState } from 'react';
import { track } from '@/lib/analytics';

export function InterviewVideo({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="my-10">
      <div className="relative aspect-video w-full bg-ink text-paper">
        {playing ? (
          <iframe title="Entrevista de Alexandre Felix no Logística do Futuro 2026" src={'https://www.youtube-nocookie.com/embed/' + videoId + '?rel=0&playsinline=1&autoplay=1'} className="absolute inset-0 h-full w-full border-0" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        ) : (
          <button type="button" className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-5 p-5 text-center focus-visible:outline focus-visible:outline-4 focus-visible:outline-brand-500" onClick={() => { setPlaying(true); track('blog_video_play', { video: videoId }); }}>
            <svg viewBox="0 0 48 48" className="h-14 w-14 text-brand-500" fill="currentColor" aria-hidden="true"><path d="M14 7v34l28-17z" /></svg>
            <span className="text-lg font-semibold sm:text-2xl">Assistir à entrevista completa</span>
            <span className="text-sm text-paper/65">Logística do Futuro 2026 · Alexandre Felix</span>
          </button>
        )}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-content/60">Vídeo da MundoLogística. Ao iniciar a reprodução, você carrega o player do YouTube. A entrevista pode ser assistida nesta página.</p>
    </div>
  );
}
