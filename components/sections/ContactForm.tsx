'use client';

import { useState, useId } from 'react';

const SERVICES = [
  { value: '', label: 'Select a service | اختر الخدمة' },
  { value: 'Battery Replacement', label: 'Battery Replacement | تغيير البطارية' },
  { value: 'Emergency Jump Start', label: 'Emergency Jump Start | شحن طوارئ' },
  { value: 'Electrical Diagnostics', label: 'Electrical Diagnostics | فحص الكهرباء' },
  { value: 'Not Sure / Other', label: 'Not Sure / Other | غير متأكد' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How fast do you arrive?',
      acceptedAnswer: { '@type': 'Answer', text: '30 minutes or less anywhere in Qatar.' },
    },
    {
      '@type': 'Question',
      name: 'Do I pay before or after?',
      acceptedAnswer: { '@type': 'Answer', text: 'Always after the service is done.' },
    },
    {
      '@type': 'Question',
      name: 'What areas do you cover?',
      acceptedAnswer: { '@type': 'Answer', text: 'All areas across Qatar.' },
    },
    {
      '@type': 'Question',
      name: 'Do you work 24/7?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, including weekends and holidays.' },
    },
  ],
};

const FAQ_ITEMS = [
  { q: 'How fast do you arrive?', a: '30 minutes or less anywhere in Qatar.' },
  { q: 'Do I pay before or after?', a: 'Always after the service is done.' },
  { q: 'What areas do you cover?', a: 'All areas across Qatar.' },
  { q: 'Do you work 24/7?', a: 'Yes, including weekends and holidays.' },
];

interface FormState {
  name: string;
  phone: string;
  carModel: string;
  service: string;
  area: string;
  message: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

interface ContactFormProps {
  lang?: 'en' | 'ar';
}

export default function ContactForm({ lang = 'en' }: ContactFormProps) {
  const ar = lang === 'ar';
  const formId = useId();
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [form, setForm] = useState<FormState>({
    name: '', phone: '', carModel: '', service: '', area: '', message: '',
  });

  function update(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section
        id="contact"
        aria-labelledby="contact-heading"
        dir={ar ? 'rtl' : 'ltr'}
        style={{ backgroundColor: 'var(--c-bg)', padding: '80px 24px' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>

          {/* Header */}
          <div style={{ textAlign: 'center' }}>
            <p style={labelStyle}>CONTACT US | تواصل معنا</p>
            <h2 id="contact-heading" style={h2Style}>
              {ar ? (
                <>اطلب الخدمة — <span style={{ color: 'var(--c-accent)' }}>بدون اتصال</span></>
              ) : (
                <>Request Service — <span style={{ color: 'var(--c-accent)' }}>No Call Needed</span></>
              )}
            </h2>
            <p style={subtitleStyle}>
              {ar
                ? 'أرسل تفاصيلك وسنتواصل معك على واتساب في دقائق.'
                : "Fill in your details and we'll WhatsApp you in minutes."}
            </p>
          </div>

          <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: '1fr' }} className="contact-grid">

            {/* Form card */}
            <div style={cardStyle}>
              {status === 'success' ? (
                <SuccessBanner />
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>

                  <div style={rowStyle}>
                    <Field
                      id={`${formId}-name`}
                      label={ar ? 'الاسم *' : 'Name *'}
                      type="text"
                      placeholder="Your Name | اسمك"
                      value={form.name}
                      onChange={update('name')}
                      required
                    />
                    <Field
                      id={`${formId}-phone`}
                      label={ar ? 'الهاتف *' : 'Phone *'}
                      type="tel"
                      placeholder="+974 XXXX XXXX"
                      value={form.phone}
                      onChange={update('phone')}
                      required
                    />
                  </div>

                  <Field
                    id={`${formId}-car`}
                    label={ar ? 'نوع السيارة *' : 'Car Make & Model *'}
                    type="text"
                    placeholder="e.g. Toyota Camry 2020"
                    value={form.carModel}
                    onChange={update('carModel')}
                    required
                  />

                  {/* Service select */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label htmlFor={`${formId}-service`} style={fieldLabelStyle}>
                      {ar ? 'الخدمة المطلوبة *' : 'Service Needed *'}
                    </label>
                    <select
                      id={`${formId}-service`}
                      value={form.service}
                      onChange={update('service')}
                      required
                      style={inputStyle}
                    >
                      {SERVICES.map((s) => (
                        <option key={s.value} value={s.value} disabled={s.value === ''}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field
                    id={`${formId}-area`}
                    label={ar ? 'الموقع / المنطقة' : 'Location / Area'}
                    type="text"
                    placeholder="e.g. West Bay, The Pearl"
                    value={form.area}
                    onChange={update('area')}
                  />

                  {/* Message textarea */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label htmlFor={`${formId}-message`} style={fieldLabelStyle}>
                      {ar ? 'ملاحظات إضافية' : 'Message (optional)'}
                    </label>
                    <textarea
                      id={`${formId}-message`}
                      rows={3}
                      placeholder="Any extra details..."
                      value={form.message}
                      onChange={update('message')}
                      style={{ ...inputStyle, resize: 'vertical', minHeight: '88px' }}
                    />
                  </div>

                  {status === 'error' && (
                    <p role="alert" style={{ color: '#CC0000', fontSize: '0.9rem', margin: 0, fontFamily: 'var(--font-inter), sans-serif' }}>
                      ❌ Something went wrong. Please{' '}
                      <a
                        href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#25D366', fontWeight: 600 }}
                      >
                        WhatsApp us directly
                      </a>
                      .
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    style={{
                      backgroundColor: status === 'loading' ? 'var(--c-accent-hover)' : 'var(--c-accent)',
                      color: '#111111',
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      padding: '0.9375rem 2rem',
                      borderRadius: '0.625rem',
                      border: 'none',
                      cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                      width: '100%',
                      minHeight: '52px',
                      transition: 'background-color 0.15s, transform 0.1s',
                      marginTop: '0.25rem',
                    }}
                    onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    {status === 'loading' ? 'Sending…' : 'Send Request | أرسل الطلب'}
                  </button>
                </form>
              )}
            </div>

            {/* FAQ */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 700,
                  fontSize: '1.125rem',
                  color: 'var(--c-text)',
                  margin: '0 0 0.25rem',
                }}
              >
                {ar ? 'أسئلة شائعة' : 'Common Questions'}
              </h3>
              {FAQ_ITEMS.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 860px) {
          .contact-grid { grid-template-columns: 3fr 2fr !important; align-items: start; }
        }
        select option[value=""] { color: #888888; }
      `}</style>
    </>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function Field({
  id, label, type, placeholder, value, onChange, required,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', flex: 1 }}>
      <label htmlFor={id} style={fieldLabelStyle}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={type === 'tel' ? 'tel' : 'off'}
        style={inputStyle}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--c-accent)'; e.currentTarget.style.outline = 'none'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E5E5'; }}
      />
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--c-surface)',
        border: '1px solid var(--c-border)',
        borderRadius: '0.625rem',
        padding: '1rem 1.25rem',
      }}
    >
      <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--c-text)', margin: '0 0 0.375rem' }}>
        <span style={{ color: 'var(--c-accent)', marginRight: '0.375rem' }}>Q.</span>{q}
      </p>
      <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 400, fontSize: '0.9rem', color: 'var(--c-muted)', margin: 0, lineHeight: 1.55 }}>
        {a}
      </p>
    </div>
  );
}

function SuccessBanner() {
  return (
    <div
      role="alert"
      style={{
        backgroundColor: '#F0FFF4',
        border: '1px solid #25D366',
        borderRadius: '0.75rem',
        padding: '2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <span style={{ fontSize: '2.5rem' }}>✅</span>
      <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 700, fontSize: '1.125rem', color: '#111111', margin: 0 }}>
        We received your request!
      </p>
      <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 400, fontSize: '1rem', color: '#555555', margin: 0 }}>
        We&apos;ll WhatsApp you in minutes.
      </p>
    </div>
  );
}

/* ── Shared styles ─────────────────────────────────────── */

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 600,
  fontSize: '0.75rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--c-muted)',
  marginBottom: '0.75rem',
};

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 800,
  fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
  color: 'var(--c-text)',
  margin: '0 0 0.75rem',
  lineHeight: 1.2,
};

const subtitleStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 400,
  fontSize: '1rem',
  color: 'var(--c-muted)',
  margin: 0,
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'var(--c-surface)',
  border: '1px solid var(--c-border)',
  borderRadius: '0.75rem',
  padding: 'clamp(1rem, 4vw, 2rem)',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.75rem',
  flexWrap: 'wrap',
};

const fieldLabelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter), sans-serif',
  fontWeight: 600,
  fontSize: '0.8125rem',
  color: 'var(--c-text)',
};

const inputStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter), sans-serif',
  fontSize: '0.9375rem',
  color: 'var(--c-text)',
  backgroundColor: 'var(--c-bg)',
  border: '1px solid var(--c-border)',
  borderRadius: '0.5rem',
  padding: '0.6875rem 0.875rem',
  width: '100%',
  transition: 'border-color 0.15s',
  outline: 'none',
  appearance: 'none',
};
