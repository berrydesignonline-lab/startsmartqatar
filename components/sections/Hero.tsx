'use client';

import Image from 'next/image';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+battery+service`;

const STOCK_IMAGE = '/images/hero-car.webp';

const TRUST_BADGES = [
  { icon: '⏱', en: '30 Min', ar: '30 دقيقة' },
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
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
        transition: 'background-color 0.2s',
      }}
      dir={ar ? 'rtl' : 'ltr'}
    >
      {/* ── Left: Content ───────────────────────────── */}
      <div
        className="hero-content-panel"
        style={{
          flex: '1 1 55%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: ar ? 'flex-end' : 'flex-start',
          justifyContent: 'center',
          padding: '6rem 3rem 4rem',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Subtle radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '40%',
            left: ar ? 'auto' : '30%',
            right: ar ? '30%' : 'auto',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(var(--c-accent-rgb),0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* 1 — Badge pill */}
        <div
          className="animate-fade-in-up animation-delay-100"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
            border: '1px solid rgba(var(--c-accent-rgb),0.35)',
            borderRadius: '9999px',
            padding: '0.3rem 0.875rem',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--c-accent)',
            backgroundColor: 'rgba(var(--c-accent-rgb),0.06)',
            letterSpacing: '0.02em',
          }}
        >
          <span>⚡</span>
          <span>Qatar — 24/7 Service</span>
        </div>

        {/* 2 — H1 */}
        <div className="animate-fade-in-up animation-delay-200" style={{ position: 'relative', zIndex: 1 }}>
          <h1
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 1.1,
              margin: 0,
              color: 'var(--c-text)',
            }}
          >
            {ar ? (
              <>
                <span style={{ color: 'var(--c-text)' }}>بطاريتك </span>
                <span style={{ color: 'var(--c-accent)' }}>وقفت؟</span>
              </>
            ) : (
              <>
                <span style={{ color: 'var(--c-text)' }}>Battery </span>
                <span style={{ color: 'var(--c-accent)' }}>Dead?</span>
              </>
            )}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)',
              lineHeight: 1.15,
              margin: '0.25rem 0 0',
              color: 'var(--c-accent)',
            }}
          >
            {ar ? 'نجي عندك' : 'We Come to You'}
          </p>
        </div>

        {/* 3 — Subtitle */}
        <p
          className="animate-fade-in-up animation-delay-300"
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'var(--font-cairo), sans-serif',
            fontWeight: 500,
            fontSize: '1.125rem',
            color: 'var(--c-muted)',
            margin: 0,
            lineHeight: 1.6,
          }}
          lang="ar"
          dir="rtl"
        >
          بطاريتك وقفت؟ نجي عندك في 30 دقيقة
        </p>

        {/* 4 — Body text EN */}
        <p
          className="animate-fade-in-up animation-delay-300"
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            color: 'var(--c-muted)',
            margin: 0,
            lineHeight: 1.7,
            maxWidth: '440px',
          }}
        >
          On-demand battery replacement &amp; electrical service across Qatar.
          30 minutes or less. Pay after service.
        </p>

        {/* 5 — CTA Buttons */}
        <div
          className="animate-fade-in-up animation-delay-400 hero-cta-group"
          style={{
            position: 'relative',
            zIndex: 1,
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
              padding: '0.875rem 1.75rem',
              borderRadius: '0.625rem',
              textDecoration: 'none',
              minHeight: '52px',
              transition: 'background-color 0.15s, transform 0.1s',
              boxShadow: '0 4px 20px rgba(37,211,102,0.25)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1ebe5d';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#25D366';
              e.currentTarget.style.transform = 'translateY(0)';
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
              backgroundColor: 'transparent',
              color: 'var(--c-accent)',
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 600,
              fontSize: '1rem',
              padding: '0.875rem 1.75rem',
              borderRadius: '0.625rem',
              textDecoration: 'none',
              border: '2px solid var(--c-accent)',
              minHeight: '52px',
              transition: 'background-color 0.15s, color 0.15s, transform 0.1s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--c-accent)';
              e.currentTarget.style.color = '#111111';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--c-accent)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>شوف خدماتنا | Our Services</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        {/* 6 — Trust badges */}
        <div
          className="animate-fade-in-up animation-delay-500"
          style={{
            position: 'relative',
            zIndex: 1,
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
                backgroundColor: 'var(--c-surface)',
                border: '1px solid var(--c-border)',
                borderRadius: '0.5rem',
                padding: '0.5rem 0.875rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--c-text)',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
              }}
            >
              <span aria-hidden="true">{badge.icon}</span>
              <span>{ar ? badge.ar : badge.en}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right: Stock Image ───────────────────────── */}
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
        {/* Gradient blend: left edge fades into page bg */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: ar
              ? 'linear-gradient(to left, transparent 50%, var(--c-bg) 100%)'
              : 'linear-gradient(to right, var(--c-bg) 0%, transparent 50%)',
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
        {/* Subtle yellow accent top-right corner */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-40px',
            right: ar ? 'auto' : '-40px',
            left: ar ? '-40px' : 'auto',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(var(--c-accent-rgb),0.15) 0%, transparent 70%)',
            zIndex: 2,
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
          opacity: 0.4,
          zIndex: 5,
        }}
      >
        <span style={{ fontSize: '0.6875rem', color: 'var(--c-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          scroll
        </span>
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
            padding: 5.5rem 1.25rem 3rem !important;
            flex: 1 !important;
          }
          .hero-content-panel > div:last-child,
          .hero-content-panel > div[aria-label] {
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
