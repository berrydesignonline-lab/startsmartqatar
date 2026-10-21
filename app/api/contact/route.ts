import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/lib/sanity';
import { Resend } from 'resend';

interface ContactPayload {
  name: string;
  phone: string;
  carModel: string;
  service: string;
  area?: string;
  message?: string;
}

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'startsmartqatar2026@gmail.com';
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? 'StartSmart Qatar <onboarding@resend.dev>';

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

  // 1. Save lead to Sanity (best-effort — don't fail the whole request if Sanity is down)
  let sanityOk = true;
  try {
    await writeClient.create({
      _type: 'lead',
      name, phone, carModel, service,
      area: area ?? '',
      message: message ?? '',
      submittedAt: new Date().toISOString(),
      status: 'new',
    });
  } catch (err) {
    sanityOk = false;
    console.error('[contact] sanity write failed:', err);
  }

  // 2. Send email via Resend
  const apiKey = process.env.RESEND_API_KEY;
  let emailOk = true;
  let emailErr: string | undefined;
  if (apiKey) {
    const resend = new Resend(apiKey);
    const html = `
      <h2 style="font-family:sans-serif">New StartSmart Lead</h2>
      <table style="font-family:sans-serif;border-collapse:collapse">
        <tr><td><b>Name</b></td><td>${escapeHtml(name)}</td></tr>
        <tr><td><b>Phone</b></td><td>${escapeHtml(phone)}</td></tr>
        <tr><td><b>Car</b></td><td>${escapeHtml(carModel)}</td></tr>
        <tr><td><b>Service</b></td><td>${escapeHtml(service)}</td></tr>
        <tr><td><b>Area</b></td><td>${escapeHtml(area ?? '—')}</td></tr>
        <tr><td><b>Message</b></td><td>${escapeHtml(message ?? '—')}</td></tr>
        <tr><td><b>Time</b></td><td>${new Date().toLocaleString('en-QA')}</td></tr>
      </table>
      <p style="font-family:sans-serif;color:#666;font-size:12px;margin-top:20px">
        Reply directly to this email, or contact the customer at <a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a>
        / <a href="https://wa.me/${digitsOnly(phone)}">WhatsApp</a>.
      </p>
    `;
    try {
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `🚗 New lead: ${name} — ${service} (${carModel})`,
        html,
      });
      if (error) {
        emailOk = false;
        emailErr = error.message;
        console.error('[contact] resend error:', error);
      }
    } catch (err) {
      emailOk = false;
      emailErr = (err as Error).message;
      console.error('[contact] resend threw:', err);
    }
  } else {
    emailOk = false;
    emailErr = 'RESEND_API_KEY not set';
    console.error('[contact] RESEND_API_KEY missing');
  }

  // Succeed if EITHER saved or emailed — only fail if BOTH paths failed
  if (!sanityOk && !emailOk) {
    return NextResponse.json(
      { error: 'Failed to save lead and send email', emailErr },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true, sanityOk, emailOk }, { status: 200 });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function digitsOnly(s: string): string {
  return s.replace(/\D/g, '');
}
