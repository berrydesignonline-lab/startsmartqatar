'use client';

import Link from 'next/link';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97400000000';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C+I+need+battery+service`;
const DISPLAY_NUMBER = `+${WHATSAPP_NUMBER.slice(0, 3)} ${WHATSAPP_NUMBER.slice(3, 7)} ${WHATSAPP_NUMBER.slice(7)}`;

const QUICK_LINKS = [
  { label: 'Services', labelAr: 'الخدمات', href: '#services' },
  { label: 'How It Works', labelAr: 'كيف يعمل', href: '#how' },
  { label: 'Areas We Cover', labelAr: 'المناطق', href: '#areas' },
  { label: 'Blog', labelAr: 'المدونة', href: '/blog' },
  { label: 'Contact', labelAr: 'تواصل معنا', href: '#contact' },
];

interface FooterProps {
  lang?: 'en' | 'ar';
}

export default function Footer({ lang = 'en' }: FooterProps) {
  const ar = lang === 'ar';

  return (
    <footer
      dir={ar ? 'rtl' : 'ltr'}
      style={{ backgroundColor: '#111111', color: '#CCCCCC' }}
    >
      {/* Main grid */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '60px 24px 40px',
          display: 'grid',
          gap: '2.5rem',
          gridTemplateColumns: '1fr',
        }}
        className="footer-grid"
      >
        {/* Col 1 — Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
            <BatteryLogo />
            <span
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              <span style={{ color: '#FFFFFF' }}>Start</span>
              <span style={{ color: 'var(--c-accent)' }}>Smart</span>
            </span>
          </Link>

          {/* Tagline */}
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9375rem', color: '#CCCCCC', margin: 0, lineHeight: 1.55 }}>
            {ar ? 'بطارية وكهرباء — نجي عندك' : 'Battery & Electrical — Delivered to You'}
          </p>

          {/* City coverage — SEO */}
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8125rem', color: '#999999', margin: 0, lineHeight: 1.6 }}>
            Serving Doha, Al Rayyan, Lusail, The Pearl, West Bay &amp; all Qatar
          </p>

          {/* Copyright */}
          <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8125rem', color: '#999999', margin: 0 }}>
            © {new Date().getFullYear()} StartSmart Qatar. All rights reserved.
          </p>
        </div>

        {/* Col 2 — Quick Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              margin: '0 0 0.5rem',
            }}
          >
            {ar ? 'روابط سريعة' : 'Quick Links'}
          </h3>
          <nav aria-label={ar ? 'روابط التذييل' : 'Footer navigation'}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      fontFamily: 'var(--font-inter), sans-serif',
                      fontSize: '0.9375rem',
                      color: '#CCCCCC',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-accent)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#CCCCCC')}
                  >
                    <span aria-hidden="true" style={{ color: '#999999', fontSize: '0.75rem' }}>→</span>
                    {ar ? link.labelAr : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Col 3 — Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h3
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              margin: '0 0 0.5rem',
            }}
          >
            {ar ? 'تواصل معنا' : 'Get In Touch'}
          </h3>

          {/* WhatsApp */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.9375rem',
              color: '#25D366',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <WhatsAppIcon />
            <span>{DISPLAY_NUMBER}</span>
          </a>

          {/* Hours */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span aria-hidden="true" style={{ color: 'var(--c-accent)', fontSize: '0.9rem' }}>⏱</span>
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9375rem', color: '#CCCCCC' }}>
              {ar ? 'متاح 24/7 — كل يوم' : '24/7 — Every Day'}
            </span>
          </div>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span aria-hidden="true" style={{ color: 'var(--c-accent)', fontSize: '0.9rem' }}>📍</span>
            <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9375rem', color: '#CCCCCC' }}>
              {ar ? 'قطر — جميع المناطق' : 'Qatar — All Areas'}
            </span>
          </div>

          {/* Google Business */}
          <a
            href="https://g.co/kgs/startsmartqa"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.875rem',
              color: '#CCCCCC',
              textDecoration: 'none',
              marginTop: '0.25rem',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-accent)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#CCCCCC')}
          >
            <GoogleIcon />
            <span>{ar ? 'تقييمنا على جوجل' : 'Find us on Google'}</span>
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #1A1A1A' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '1rem 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8125rem', color: '#999999' }}>
            Built by{' '}
            <a
              href="https://berrydesign.online"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#CCCCCC', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-accent)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#CCCCCC')}
            >
              Berry Design 🍓
            </a>
          </span>
          <a
            href="/privacy"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.8125rem',
              color: '#999999',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#CCCCCC')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#999999')}
          >
            Privacy Policy
          </a>
        </div>
      </div>

      {/* Desktop 3-col grid */}
      <style>{`
        @media (min-width: 768px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1.5fr !important; align-items: start; }
        }
      `}</style>
    </footer>
  );
}

/* ── Icons ─────────────────────────────────────────────── */

function BatteryLogo() {
  return (
    <svg width="32" height="20" viewBox="0 0 36 22" fill="none" aria-hidden="true">
      <rect x="0.75" y="0.75" width="30.5" height="20.5" rx="3.25" fill="#111111" stroke="var(--c-accent)" strokeWidth="1.5" />
      <rect x="31.5" y="7.5" width="4" height="7" rx="1.5" fill="var(--c-accent)" />
      <path d="M19.5 3.5L12 12h5.5L14 18.5 22 10h-5.5L19.5 3.5Z" fill="var(--c-accent)" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
