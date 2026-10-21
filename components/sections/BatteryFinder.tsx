'use client';

import { useMemo, useState } from 'react';
import { CAR_MAKES, modelsForMake, type Fitment } from '@/lib/fitment-data';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97477719819';

export default function BatteryFinder({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const ar = lang === 'ar';
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  const models = useMemo(() => (make ? modelsForMake(make) : []), [make]);
  const result: Fitment | undefined = useMemo(
    () => models.find((m) => m.model === model),
    [models, model],
  );

  const t = ar
    ? {
        heading: 'جد بطارية سيارتك',
        note: 'اختر نوع وموديل سيارتك ونقولك البطارية المناسبة — ونوصّلها ونركّبها لك.',
        makeLabel: 'نوع السيارة',
        makePlaceholder: '— اختر النوع —',
        modelLabel: 'الموديل',
        modelPlaceholder: '— اختر الموديل —',
        resultTitle: 'البطارية المناسبة',
        ah: 'السعة',
        type: 'النوع',
        cta: 'اطلب هذه البطارية على الواتساب',
        notListed: 'ما لقيت سيارتك؟ راسلنا على الواتساب ونساعدك',
      }
    : {
        heading: 'Find Your Car Battery',
        note: 'Pick your car make and model — we\'ll show the right battery and deliver & fit it.',
        makeLabel: 'Car make',
        makePlaceholder: '— Select make —',
        modelLabel: 'Model',
        modelPlaceholder: '— Select model —',
        resultTitle: 'Recommended battery',
        ah: 'Capacity',
        type: 'Type',
        cta: 'Order this battery on WhatsApp',
        notListed: "Car not listed? Message us on WhatsApp and we'll help.",
      };

  const waText = result
    ? ar
      ? `مرحبا، أبي بطارية لسيارتي ${make} ${model} (${result.battery}، ${result.ah}Ah)`
      : `Hi, I need a battery for my ${make} ${model} (${result.battery}, ${result.ah}Ah)`
    : ar
      ? 'مرحبا، أبي أعرف البطارية المناسبة لسيارتي'
      : 'Hi, I want to know the right battery for my car';
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  const selectStyle: React.CSSProperties = {
    width: '100%', padding: '0.8rem 1rem', fontSize: '1rem',
    borderRadius: '0.6rem', border: '1px solid var(--c-border, #ccc)',
    backgroundColor: 'var(--c-bg, #fff)', color: 'var(--c-text, #111)',
    fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)',
  };
  const labelStyle: React.CSSProperties = {
    display: 'block', fontWeight: 600, fontSize: '0.875rem',
    marginBottom: '0.4rem', color: 'var(--c-text, #111)',
    fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)',
  };

  return (
    <section
      dir={ar ? 'rtl' : 'ltr'}
      style={{
        maxWidth: '640px', margin: '0 auto', padding: '2rem',
        backgroundColor: 'var(--c-surface, #f9f9f9)', borderRadius: '1rem',
        border: '1px solid var(--c-border, #eee)',
      }}
    >
      <h2 style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontWeight: 800, fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)', margin: '0 0 0.5rem', color: 'var(--c-text, #111)', textAlign: 'center' }}>
        🔋 {t.heading}
      </h2>
      <p style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--c-muted, #555)', margin: '0 0 1.5rem', textAlign: 'center', lineHeight: 1.6 }}>
        {t.note}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle} htmlFor="bf-make">{t.makeLabel}</label>
          <select
            id="bf-make"
            value={make}
            onChange={(e) => { setMake(e.target.value); setModel(''); }}
            style={selectStyle}
          >
            <option value="">{t.makePlaceholder}</option>
            {CAR_MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle} htmlFor="bf-model">{t.modelLabel}</label>
          <select
            id="bf-model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            disabled={!make}
            style={{ ...selectStyle, opacity: make ? 1 : 0.5 }}
          >
            <option value="">{t.modelPlaceholder}</option>
            {models.map((m) => (
              <option key={`${m.model}-${m.spec}`} value={m.model}>
                {m.model}{m.spec && m.spec !== 'ALL' ? ` (${m.spec})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {result && (
        <div style={{
          marginTop: '1.5rem', padding: '1.25rem 1.5rem',
          backgroundColor: 'var(--c-bg, #fff)', borderRadius: '0.75rem',
          border: '2px solid var(--c-accent)',
        }}>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.8125rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--c-accent)', fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)' }}>
            {t.resultTitle}
          </p>
          <p style={{ margin: '0 0 0.75rem', fontSize: '1.5rem', fontWeight: 800, color: 'var(--c-text, #111)', fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)' }}>
            {result.battery}
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.95rem', color: 'var(--c-muted, #555)', fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)' }}>
              <strong style={{ color: 'var(--c-text, #111)' }}>{t.ah}:</strong> {result.ah} Ah
            </span>
            <span style={{ fontSize: '0.95rem', color: 'var(--c-muted, #555)', fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)' }}>
              <strong style={{ color: 'var(--c-text, #111)' }}>{t.type}:</strong> {result.type}
            </span>
          </div>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', backgroundColor: '#25D366', color: '#fff',
            fontWeight: 700, fontSize: '1rem', padding: '0.85rem 1.75rem',
            borderRadius: '0.6rem', textDecoration: 'none',
            fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)',
          }}>
            {t.cta}
          </a>
        </div>
      )}

      <p style={{ marginTop: '1.25rem', textAlign: 'center', fontSize: '0.875rem', fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)' }}>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ar ? 'مرحبا، أبي أعرف البطارية المناسبة لسيارتي' : 'Hi, I want to know the right battery for my car')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--c-accent)', textDecoration: 'none', fontWeight: 600 }}>
          {t.notListed}
        </a>
      </p>
    </section>
  );
}
