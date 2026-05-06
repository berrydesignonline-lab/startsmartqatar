import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity';

interface ContactPayload {
  name: string;
  phone: string;
  carModel: string;
  service: string;
  area?: string;
  message?: string;
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, phone, carModel, service, area, message } = body;

  if (!name || !phone || !carModel || !service) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 422 });
  }

  try {
    await writeClient.create({
      _type: 'lead',
      name,
      phone,
      carModel,
      service,
      area: area ?? '',
      message: message ?? '',
      submittedAt: new Date().toISOString(),
      status: 'new',
    });

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('[contact/route] Sanity write error:', err);
    return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
  }
}
