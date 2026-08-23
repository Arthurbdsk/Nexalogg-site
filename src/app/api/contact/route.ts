import { NextResponse } from 'next/server';
import { normalizeContact, validateContact, type ContactFields } from '@/lib/validation';

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
  const webhook = process.env.CONTACT_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contact,
          destino: process.env.CONTACT_INBOX ?? null,
          origem: 'site',
          recebidoEm: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error('[contato] destino respondeu com status', response.status);
        return NextResponse.json(
          { message: 'Não foi possível registrar sua solicitação agora. Tente novamente em instantes.' },
          { status: 502 },
        );
      }
    } catch (error) {
      console.error('[contato] falha ao encaminhar a solicitação', error);
      return NextResponse.json(
        { message: 'Não foi possível registrar sua solicitação agora. Tente novamente em instantes.' },
        { status: 502 },
      );
    }
  } else {
    // Sem destino configurado a solicitação é apenas registrada no servidor.
    // Configure CONTACT_WEBHOOK_URL para encaminhar ao destino oficial.
    console.warn('[contato] recebido sem CONTACT_WEBHOOK_URL configurado', {
      empresa: contact.company,
      segmento: contact.segment,
    });
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ message: 'Método não suportado.' }, { status: 405 });
}
