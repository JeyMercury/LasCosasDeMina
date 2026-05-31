import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return false;
  }
  if (record.count >= 3) return true;
  record.count++;
  return false;
}

const ALLOWED_TYPES = [
  'image/jpeg', 'image/png', 'image/gif', 'image/webp',
  'audio/mpeg', 'audio/wav', 'audio/ogg',
  'text/plain',
];
const MAX_SIZE = 2 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Espera un momento e inténtalo de nuevo.' },
      { status: 429 }
    );
  }

  const formData = await req.formData();

  const name       = formData.get('name') as string;
  const email      = formData.get('email') as string;
  const message    = formData.get('message') as string;
  const honeypot   = formData.get('website') as string;
  const attachment = formData.get('attachment') as File | null;

  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Todos los campos son obligatorios.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'El correo electrónico no es válido.' }, { status: 400 });
  }

  const clean = (s: string, max: number) => s.replace(/<[^>]*>/g, '').trim().slice(0, max);
  const safeName    = clean(name, 100);
  const safeEmail   = clean(email, 100);
  const safeMessage = clean(message, 2000);

  const attachments: { filename: string; content: Buffer }[] = [];
  if (attachment && attachment.size > 0) {
    if (!ALLOWED_TYPES.includes(attachment.type)) {
      return NextResponse.json(
        { error: 'Tipo de archivo no permitido. Solo imágenes, audio y texto.' },
        { status: 400 }
      );
    }
    if (attachment.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'El archivo supera el límite de 2 MB.' },
        { status: 400 }
      );
    }
    attachments.push({
      filename: attachment.name,
      content: Buffer.from(await attachment.arrayBuffer()),
    });
  }

  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'haijulikanix@gmail.com',
      replyTo: safeEmail,
      subject: `Nueva consulta de ${safeName}`,
      html: `
        <h2 style="color:#3a693a">Nueva consulta desde la web</h2>
        <p><strong>Nombre:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <hr/>
        <p><strong>Mensaje:</strong></p>
        <p>${safeMessage.replace(/\n/g, '<br>')}</p>
      `,
      attachments: attachments.map(a => ({
        filename: a.filename,
        content: a.content,
      })),
    });

    console.log('✅ Email enviado:', result);
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    return NextResponse.json(
      { error: 'Error al enviar el mensaje. Inténtalo de nuevo.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
