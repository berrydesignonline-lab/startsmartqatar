'use client';

import Image from 'next/image';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+battery+service`;
const PHONE_URL = `tel:+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`;
const STOCK_IMAGE = '/images/heroseacionimage.webp';

const FEATURES = [
  { icon: '🛡️', en: '24/7 Roadside', ar: 'خدمة على الطريق ٢٤/٧' },
  { icon: '🔋', en: 'Genuine + 12-month warranty', ar: 'بطاريات أصلية — ضمان ١٢ شهر' },
  { icon: '📍', en: 'All Qatar', ar: 'نوصلك وين ما كنت' },
];

interface HeroProps {
  lang?: 'en' | 'ar';
}

export default function Hero({ lang = 'en' }: HeroProps) {
  const ar = lang === 'ar';

  return (
    <section
      aria-label="Hero — Car Battery Service Qatar"
      style={{
        minHeight: '100svh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      dir={ar ? 'rtl' : 'ltr'}
    >
      {/* Background image */}
      <Image
        src={STOCK_IMAGE}
        alt="StartSmart battery technician servicing a car in Qatar"
        fill
        priority
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
        sizes="100vw"
      />

      {/* Overlay — dark at top and bottom, clear window in the middle */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.0) 32%, rgba(0,0,0,0.0) 65%, rgba(0,0,0,0.85) 100%)',
      }} />

      {/* ── TOP — text content, directly under navbar ── */}
      <div className="hero-top" style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        gap: '0.75rem',
        padding: '6.25rem 1.5rem 1.5rem',
        width: '100%',
      }}>
        {/* Service badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
          border: '1.5px solid rgba(224,92,0,0.65)', borderRadius: '9999px',
          padding: '0.28rem 0.875rem', fontSize: '0.72rem', fontWeight: 700,
          color: 'var(--c-accent)', backgroundColor: 'rgba(224,92,0,0.14)',
          letterSpacing: '0.06em', textTransform: 'uppercase', backdropFilter: 'blur(4px)',
        }}>
          ⚡ {ar ? 'قطر — خدمة ٢٤/٧' : 'Qatar — 24/7 Service'}
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(2.75rem, 11vw, 5.5rem)',
          lineHeight: 1.0, margin: 0, color: '#FFFFFF',
          letterSpacing: ar ? '0' : '-0.025em',
        }}>
          {ar ? (
            <><span>بطاريتك </span><span style={{ color: 'var(--c-accent)' }}>تعطلت؟</span></>
          ) : (
            <><span>Battery </span><span style={{ color: 'var(--c-accent)' }}>Dead?</span></>
          )}
        </h1>

        {/* H2 */}
        <p style={{
          fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(1.05rem, 3.5vw, 1.625rem)',
          color: 'var(--c-accent)', margin: 0, lineHeight: 1.25,
        }}>
          {ar ? 'ستارت سمارت... أسرع خدمة بطاريات في قطر' : 'StartSmart… Qatar’s fastest battery service'}
        </p>
        {/* H3 — description */}
        <p style={{
          fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(0.9rem, 2.4vw, 1rem)',
          color: '#FFFFFF', margin: 0, lineHeight: 1.6, maxWidth: '380px',
          textShadow: '0 2px 8px rgba(0,0,0,0.55)',
        }} lang={ar ? 'ar' : 'en'}>
          {ar
            ? 'نغيّر لك بطاريتك في مكانك، بسرعة وباحتراف'
            : 'On-demand battery replacement across Qatar. Fast, professional, pay after service.'}
        </p>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
          {FEATURES.map((f) => (
            <div key={f.en} style={{
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '0.4rem', padding: '0.35rem 0.7rem',
              fontSize: '0.775rem', fontWeight: 600, color: '#FFFFFF',
              whiteSpace: 'nowrap', backdropFilter: 'blur(6px)',
            }}>
              <span aria-hidden="true">{f.icon}</span>
              <span>{ar ? f.ar : f.en}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM — CTAs pinned to bottom of hero ── */}
      <div className="hero-bottom" style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '3rem 1.5rem 2.25rem',
        width: '100%',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%', maxWidth: '300px' }}>
          <a
            href={PHONE_URL}
            aria-label={ar ? 'اتصل بنا' : 'Call now'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              backgroundColor: 'var(--c-accent)', color: '#FFFFFF',
              fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
              fontWeight: 700, fontSize: '0.9375rem',
              padding: '0.65rem 1.25rem', borderRadius: '0.65rem',
              textDecoration: 'none', minHeight: '44px', width: '100%',
              boxShadow: '0 4px 20px rgba(224,92,0,0.4)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(224,92,0,0.55)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(224,92,0,0.4)'; }}
          >
            <PhoneIcon />
            <span>{ar ? 'اتصل بنا' : 'Call Now'}</span>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ar ? 'اطلب الخدمة على الواتساب' : 'Order via WhatsApp'}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
              backgroundColor: '#25D366', color: '#FFFFFF',
              fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
              fontWeight: 700, fontSize: '0.9375rem',
              padding: '0.65rem 1.25rem', borderRadius: '0.65rem',
              textDecoration: 'none', minHeight: '44px', width: '100%',
              boxShadow: '0 4px 16px rgba(37,211,102,0.32)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(37,211,102,0.45)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.32)'; }}
          >
            <WhatsAppIcon />
            <span>{ar ? 'اطلب خدمتك الآن' : 'Order via WhatsApp'}</span>
          </a>
        </div>

        <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.38)', margin: 0 }}>
          📍 {ar
            ? 'نغطّي كل قطر — الدوحة · الوكرة · الخور'
            : 'Covering all Qatar — Doha · Al Wakrah · Al Khor'}
        </p>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .hero-top { padding: 5.75rem 1.125rem 1.25rem !important; gap: 0.6rem !important; }
          .hero-bottom { padding: 2.5rem 1.125rem 2rem !important; }
        }
      `}</style>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
