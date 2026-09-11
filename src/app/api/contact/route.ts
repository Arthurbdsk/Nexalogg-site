import { NextResponse } from 'next/server';
import { normalizeContact, validateContact, type ContactFields } from '@/lib/validation';
import { siteConfig } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Janela e limite do controle simples de abuso por endereço. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  entry.count += 1;
  if (entry.count > MAX_REQUESTS) return true;
  return false;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'desconhecido';
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function sendByEmail(contact: ContactFields): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_INBOX ?? siteConfig.contact.email.value;

  if (!apiKey || !from || !to) return false;

  const subject = `Nova solicitação pelo site: ${contact.company}`;
  const text = [
    `Nome: ${contact.name}`,
    `Empresa: ${contact.company}`,
    `E-mail: ${contact.email}`,
    `Telefone: ${contact.phone}`,
    `Segmento: ${contact.segment}`,
    '',
    'Mensagem:',
    contact.message,
  ].join('\n');
  const html = `
    <h1>Nova solicitação pelo site</h1>
    <p><strong>Nome:</strong> ${escapeHtml(contact.name)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(contact.company)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(contact.email)}</p>
    <p><strong>Telefone:</strong> ${escapeHtml(contact.phone)}</p>
    <p><strong>Segmento:</strong> ${escapeHtml(contact.segment)}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${escapeHtml(contact.message).replaceAll('\n', '<br>')}</p>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: contact.email,
      subject,
      text,
      html,
    }),
  });

  if (!response.ok) {
    console.error('[contato] serviço de e-mail respondeu com status', response.status);
    throw new Error('Falha no serviço de e-mail');
  }

  return true;
}

async function sendByWebhook(contact: ContactFields): Promise<boolean> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return false;

  const response = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...contact,
      destino: process.env.CONTACT_INBOX ?? siteConfig.contact.email.value,
      origem: 'site',
      recebidoEm: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    console.error('[contato] destino respondeu com status', response.status);
    throw new Error('Falha no webhook de contato');
  }

  return true;
}

export async function POST(request: Request) {
  if (request.headers.get('content-type')?.includes('application/json') !== true) {
    return NextResponse.json({ message: 'Formato de requisição inválido.' }, { status: 415 });
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json(
      { message: 'Muitas solicitações em sequência. Tente novamente em alguns minutos.' },
      { status: 429 },
    );
  }

  let payload: Partial<ContactFields>;
  try {
    payload = (await request.json()) as Partial<ContactFields>;
  } catch {
    return NextResponse.json({ message: 'Não foi possível ler os dados enviados.' }, { status: 400 });
  }

  // Honeypot: resposta de sucesso sem encaminhamento, para não sinalizar a regra.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return NextResponse.json({ received: true }, { status: 202 });
  }

  const fields: ContactFields = {
    name: String(payload.name ?? ''),
    company: String(payload.company ?? ''),
    email: String(payload.email ?? ''),
    phone: String(payload.phone ?? ''),
    segment: String(payload.segment ?? ''),
    message: String(payload.message ?? ''),
  };

  const errors = validateContact(fields);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { message: 'Revise os campos destacados e envie novamente.', errors },
      { status: 422 },
    );
  }

  const contact = normalizeContact(fields);
  try {
    const delivered = (await sendByEmail(contact)) || (await sendByWebhook(contact));
    if (!delivered) {
      console.error('[contato] nenhum serviço de envio configurado');
      return NextResponse.json(
        { message: 'O envio está temporariamente indisponível. Fale com a NEXALLOG pelos canais informados na página.' },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error('[contato] falha ao encaminhar a solicitação', error);
    return NextResponse.json(
      { message: 'Não foi possível enviar sua solicitação agora. Tente novamente em instantes.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ message: 'Método não suportado.' }, { status: 405 });
}
