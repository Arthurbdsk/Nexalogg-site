import { ImageResponse } from 'next/og';
import { getPost } from '@/lib/blog';
import { notFound } from 'next/navigation';

export const alt = 'Análise NEXALLOG sobre transporte e logística';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '60px 70px', background: '#111111', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', fontSize: 32, fontWeight: 700, color: '#ffbc14', letterSpacing: 5 }}>NEXALLOG</div>
      <div style={{ display: 'flex', fontSize: 58, fontWeight: 700, lineHeight: 1.12, maxWidth: 1040 }}>{post.title}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 24, borderTop: '2px solid #ffbc14', fontSize: 23 }}><span>{post.category}</span><span>nexallog.com.br/blog</span></div>
    </div>,
    size,
  );
}
