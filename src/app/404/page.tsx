import NotFound from '@/app/not-found';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Página não encontrada',
  description: 'O endereço acessado não existe no site da NEXALLOG.',
  path: '/404',
  noIndex: true,
});

export default NotFound;
