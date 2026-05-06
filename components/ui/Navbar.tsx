'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+battery+service`;

const NAV_LINKS = [
  { en: 'Services',      ar: 'الخدمات',   href: '#services', scroll: true },
  { en: 'How it Works',  ar: 'كيف يعمل',  href: '#how',      scroll: true },
  { en: 'Areas Covered', ar: 'المناطق',   href: '#areas',    scroll: true },
  { en: 'Blog',          ar: 'المدونة',   href: '/blog',     scroll: false },
];

function BatteryLogo() {
  return (
    <svg
      width="36"
      height="22"
      viewBox="0 0 36 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Body */}
      <rect x="0.75" y="0.75" width="30.5" height="20.5" rx="3.25" fill="#111111" stroke="#FFD600" strokeWidth="1.5" />
      {/* Terminal nub */}
      <rect x="31.5" y="7.5" width="4" height="7" rx="1.5" fill="#FFD600" />
      {/* Lightning bolt */}
      <path d="M19.5 3.5L12 12h5.5L14 18.5 22 10h-5.5L19.5 3.5Z" fill="#FFD600" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        /* X icon */
        <>
          <line x1="5" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="19" y1="5" x2="5" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        /* Hamburger */
        <>
          <line x1="3" y1="6"  x2="21" y2="6"  stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="12" x2="21" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="18" x2="21" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

interface NavbarProps {
  lang?: 'en' | 'ar';
}

export default function Navbar({ lang = 'en' }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const ar = lang === 'ar';

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Smooth scroll for anchor links
  function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: '#111111',
        borderBottom: '1px solid #1A1A1A',
      }}
      dir={ar ? 'rtl' : 'ltr'}
    >
      {/* Main bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.25rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
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
            <span style={{ color: '#FFD600' }}>Smart</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav
          aria-label="Main navigation"
          style={{
            display: 'none',
            gap: '2rem',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((link) => (
            link.scroll ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD600')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              >
                {ar ? link.ar : link.en}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFD600')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              >
                {ar ? link.ar : link.en}
              </Link>
            )
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* WhatsApp CTA — always visible */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.375rem',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 600,
              fontSize: '0.875rem',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background-color 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1ebe5d')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
          >
            {/* WhatsApp SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>واتساب | WhatsApp</span>
          </a>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="hamburger-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile menu — slides down */}
      <div
        aria-hidden={!menuOpen}
        style={{
          backgroundColor: '#111111',
          overflow: 'hidden',
          maxHeight: menuOpen ? '320px' : '0px',
          transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderTop: menuOpen ? '1px solid #1A1A1A' : 'none',
        }}
      >
        <nav
          aria-label="Mobile navigation"
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0.75rem 1.25rem 1.25rem',
            gap: '0.25rem',
          }}
        >
          {NAV_LINKS.map((link) =>
            link.scroll ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchor(e, link.href)}
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 500,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  padding: '0.625rem 0',
                  borderBottom: '1px solid #1A1A1A',
                  transition: 'color 0.15s',
                }}
              >
                <span style={{ color: '#888888', marginRight: ar ? 0 : '0.5rem', marginLeft: ar ? '0.5rem' : 0, fontSize: '0.75rem' }}>→</span>
                {ar ? link.ar : link.en}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 500,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  padding: '0.625rem 0',
                  transition: 'color 0.15s',
                }}
              >
                <span style={{ color: '#888888', marginRight: ar ? 0 : '0.5rem', marginLeft: ar ? '0.5rem' : 0, fontSize: '0.75rem' }}>→</span>
                {ar ? link.ar : link.en}
              </Link>
            )
          )}
        </nav>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          header > div:first-child { height: 56px !important; }
        }
      `}</style>
    </header>
  );
}
