'use client';

import Image from 'next/image';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+battery+service`;
const STOCK_IMAGE = '/images/hero-car.webp';

const TRUST_BADGES = [
  { icon: '⏱', en: '10 Min', ar: '10 دقائق' },
  { icon: '🌍', en: 'All Qatar', ar: 'كل قطر' },
  { icon: '💳', en: 'Pay After', ar: 'ادفع بعدين' },
  { icon: '⭐', en: '24/7', ar: '24/7' },
];

interface HeroProps {
  lang?: 'en' | 'ar';
}

export default function Hero({ lang = 'en' }: HeroProps) {
  const ar = lang === 'ar';

  function scrollToServices(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = document.querySelector('#services');
    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
  }

  return (
    <section
      aria-label="Hero — Car Battery Service Qatar"
      style={{
        minHeight: '100svh',
        backgroundColor: 'var(--c-bg)',
        display: 'flex',
        alignItems: 'stretch',
        position: 'relative',
        overflow: 'hidden',
      }}
      dir={ar ? 'rtl' : 'ltr'}
    >
      {/* ── Background: dot grid ──────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(224,92,0,0.12) 1.5px, transparent 1.5px)',
          backgroundSize: '30px 30px',
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Background: large red radial — top right ─── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-120px',
          right: '-120px',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(224,92,0,0.10) 0%, transparent 65%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Background: soft red sweep — bottom left ─── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(224,92,0,0.06) 0%, transparent 65%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Left: Content ─────────────────────────────── */}
      <div
        className="hero-content-panel"
        style={{
          flex: '1 1 55%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: ar ? 'flex-end' : 'flex-start',
          justifyContent: 'center',
          /* 72px navbar + breathing room */
          padding: '7rem 3rem 4rem',
          gap: '1.25rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* 0 — Brand slogan */}
        <div
          className="animate-fade-in-up animation-delay-100"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 800,
            fontSize: '0.9375rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--c-text)',
          }}
        >
          <span>🔧 {ar ? 'نجي.' : 'WE COME.'}</span>
          <span style={{ color: 'var(--c-accent)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 1L1 15h8.5L7 25 21 11h-9L13 1Z"/></svg>
            {ar ? 'نصلح.' : 'WE FIX.'}
          </span>
          <span>🔋 {ar ? 'تروح.' : 'YOU GO.'}</span>
        </div>

        {/* 1 — Service badge */}
        <div
          className="animate-fade-in-up animation-delay-200"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            border: '1.5px solid rgba(224,92,0,0.3)',
            borderRadius: '9999px',
            padding: '0.35rem 1rem',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: 'var(--c-accent)',
            backgroundColor: 'rgba(224,92,0,0.06)',
            letterSpacing: '0.03em',
            textTransform: 'uppercase',
          }}
        >
          <span>⚡</span>
          <span>{ar ? 'قطر — خدمة 24/7' : 'Qatar — 24/7 Service'}</span>
        </div>

        {/* 2 — Warranty badge */}
        <div
          className="animate-fade-in-up animation-delay-300"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7EB',
            borderLeft: '3px solid var(--c-accent)',
            borderRadius: '0.5rem',
            padding: '0.35rem 0.875rem',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#333333',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}
        >
          <span>🛡️</span>
          <span>{ar ? 'ضمان البطارية 12 شهراً' : '12-Month Battery Warranty'}</span>
        </div>

        {/* 3 — H1 */}
        <div className="animate-fade-in-up animation-delay-300">
          <h1
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)',
              lineHeight: 1.05,
              margin: 0,
              color: 'var(--c-text)',
              letterSpacing: '-0.02em',
            }}
          >
            {ar ? (
              <>
                <span>بطاريتك </span>
                <span style={{ color: 'var(--c-accent)' }}>وقفت؟</span>
              </>
            ) : (
              <>
                <span>Battery </span>
                <span style={{ color: 'var(--c-accent)' }}>Dead?</span>
              </>
            )}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.1,
              margin: '0.2rem 0 0',
              color: 'var(--c-text)',
              letterSpacing: '-0.02em',
            }}
          >
            {ar ? (
              <>نجي <span style={{ color: 'var(--c-accent)' }}>عندك</span></>
            ) : (
              <>We Come <span style={{ color: 'var(--c-accent)' }}>To You</span></>
            )}
          </p>
        </div>

        {/* 4 — Body text */}
        <p
          className="animate-fade-in-up animation-delay-400"
          style={{
            fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
            fontWeight: 400,
            fontSize: '1.0625rem',
            color: 'var(--c-muted)',
            margin: 0,
            lineHeight: 1.7,
            maxWidth: '460px',
          }}
          lang={ar ? 'ar' : 'en'}
        >
          {ar
            ? 'خدمة بطارية سيارة متنقلة في كل قطر. نصل في 10 دقائق أو أقل. ادفع بعد الخدمة.'
            : 'On-demand battery replacement & electrical service across Qatar. 10 minutes or less. Pay after service.'}
        </p>

        {/* 5 — CTA Buttons */}
        <div
          className="animate-fade-in-up animation-delay-500 hero-cta-group"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.875rem',
            justifyContent: ar ? 'flex-end' : 'flex-start',
            width: '100%',
          }}
        >
          {/* Primary — WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order battery service via WhatsApp"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '0.9rem 1.875rem',
              borderRadius: '0.625rem',
              textDecoration: 'none',
              minHeight: '52px',
              transition: 'background-color 0.15s, transform 0.15s, box-shadow 0.15s',
              boxShadow: '0 4px 20px rgba(37,211,102,0.35)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1ebe5d';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(37,211,102,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#25D366';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.35)';
            }}
          >
            <WhatsAppIcon />
            <span>اطلب الخدمة | Order Now</span>
          </a>

          {/* Secondary — Services */}
          <a
            href="#services"
            onClick={scrollToServices}
            aria-label="View our services"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              backgroundColor: '#FFFFFF',
              color: 'var(--c-accent)',
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              padding: '0.9rem 1.875rem',
              borderRadius: '0.625rem',
              textDecoration: 'none',
              border: '2px solid var(--c-accent)',
              minHeight: '52px',
              transition: 'background-color 0.15s, color 0.15s, transform 0.15s, box-shadow 0.15s',
              boxShadow: '0 2px 8px rgba(224,92,0,0.12)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--c-accent)';
              e.currentTarget.style.color = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(224,92,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = 'var(--c-accent)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(224,92,0,0.12)';
            }}
          >
            <span>شوف خدماتنا | Our Services</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        {/* 6 — Trust badges */}
        <div
          className="animate-fade-in-up animation-delay-600"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: ar ? 'flex-end' : 'flex-start',
          }}
          aria-label="Service guarantees"
        >
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.en}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderTop: '2px solid var(--c-accent)',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.875rem',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--c-text)',
                whiteSpace: 'nowrap',
                boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              }}
            >
              <span aria-hidden="true" style={{ fontSize: '1rem' }}>{badge.icon}</span>
              <span>{ar ? badge.ar : badge.en}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Car Image ──────────────────────────── */}
      <div
        className="hero-image-panel"
        style={{
          flex: '1 1 45%',
          position: 'relative',
          minHeight: '400px',
        }}
      >
        <Image
          src={STOCK_IMAGE}
          alt="Premium car — StartSmart Qatar battery service"
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          sizes="(max-width: 900px) 0px, 45vw"
        />
        {/* Blend left edge into page bg */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: ar
              ? 'linear-gradient(to left, transparent 40%, var(--c-bg) 100%)'
              : 'linear-gradient(to right, var(--c-bg) 0%, transparent 45%)',
            zIndex: 1,
          }}
        />
        {/* Bottom fade */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(to top, var(--c-bg) 0%, transparent 100%)',
            zIndex: 1,
          }}
        />
        {/* Red accent corner glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-60px',
            right: ar ? 'auto' : '-60px',
            left: ar ? '-60px' : 'auto',
            width: '280px',
            height: '280px',
            background: 'radial-gradient(circle, rgba(224,92,0,0.18) 0%, transparent 70%)',
            zIndex: 2,
          }}
        />
        {/* Bold red stripe along image edge */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: ar ? 'auto' : 0,
            right: ar ? 0 : 'auto',
            width: '4px',
            background: 'linear-gradient(to bottom, transparent, var(--c-accent) 30%, var(--c-accent) 70%, transparent)',
            zIndex: 3,
            opacity: 0.6,
          }}
        />
      </div>

      {/* Scroll hint */}
      <div
        className="animate-fade-in-up animation-delay-600"
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
          opacity: 0.35,
          zIndex: 5,
        }}
      >
        <span style={{ fontSize: '0.625rem', color: 'var(--c-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>scroll</span>
        <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
          <rect x="1" y="1" width="14" height="22" rx="7" stroke="var(--c-muted)" strokeWidth="1.5"/>
          <circle cx="8" cy="7" r="2" fill="var(--c-accent)">
            <animate attributeName="cy" values="7;14;7" dur="1.8s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-image-panel { display: none !important; }
          .hero-content-panel {
            align-items: center !important;
            text-align: center !important;
            padding: 6.5rem 1.25rem 3rem !important;
            flex: 1 !important;
          }
          .hero-cta-group {
            justify-content: center !important;
          }
        }
        @media (max-width: 480px) {
          .hero-cta-group { flex-direction: column !important; }
          .hero-cta-group > a { width: 100% !important; }
        }
      `}</style>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
