'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+battery+service`;

const NAV_LINKS = [
  { en: 'Services',      ar: 'الخدمات',   anchor: '#services',  scroll: true },
  { en: 'Batteries',     ar: 'البطاريات', anchor: '/batteries', scroll: false },
  { en: 'How it Works',  ar: 'كيف نشتغل',  anchor: '#how',       scroll: true },
  { en: 'Areas Covered', ar: 'المناطق',   anchor: '#areas',     scroll: true },
  { en: 'Blog',          ar: 'المدونة',   anchor: '/blog',      scroll: false },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {open ? (
        <>
          <line x1="5" y1="5" x2="19" y2="19" stroke="var(--c-text)" strokeWidth="2" strokeLinecap="round" />
          <line x1="19" y1="5" x2="5" y2="19" stroke="var(--c-text)" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="6"  x2="21" y2="6"  stroke="var(--c-text)" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="12" x2="21" y2="12" stroke="var(--c-text)" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="18" x2="21" y2="18" stroke="var(--c-text)" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isAr = pathname.startsWith('/ar');
  const isHome = pathname === '/' || pathname === '/ar';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  function getLinkHref(anchor: string) {
    // Section anchor on home page (e.g. "#services"): use plain anchor in-place
    if (anchor.startsWith('#')) {
      return isHome ? anchor : `${isAr ? '/ar' : '/'}${anchor}`;
    }
    // Non-anchor internal route (e.g. "/blog"): prefix with current locale
    if (anchor.startsWith('/')) {
      return isAr ? `/ar${anchor === '/' ? '' : anchor}` : anchor;
    }
    return anchor;
  }

  function handleAnchor(e: React.MouseEvent<HTMLAnchorElement>, anchor: string) {
    setMenuOpen(false);
    if (isHome) {
      const el = document.querySelector(anchor);
      if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
    }
  }

  const langToggleHref = isAr
    ? (pathname === '/ar' ? '/' : pathname.slice('/ar'.length) || '/')
    : ('/ar' + (pathname === '/' ? '' : pathname));
  const langToggleLabel = isAr ? 'EN' : 'عربي';

  function setLangCookie(lang: 'en' | 'ar') {
    document.cookie = `lang-pref=${lang}; path=/; max-age=${60 * 60 * 24 * 30}`;
  }

  const linkStyle: React.CSSProperties = {
    color: 'var(--c-text)',
    fontFamily: 'var(--font-inter), sans-serif',
    fontWeight: 500,
    fontSize: '0.9375rem',
    textDecoration: 'none',
    transition: 'color 0.15s',
    whiteSpace: 'nowrap',
  };

  return (
    <>
      {/* ── Main Navbar ──────────────────────────────── */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: scrolled ? 'rgba(248,249,250,0.92)' : 'rgba(248,249,250,0.98)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--c-border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
          transition: 'background-color 0.25s, backdrop-filter 0.25s, border-color 0.25s, box-shadow 0.25s',
        }}
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.25rem',
            height: "80px",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Logo */}
          <Link href={isAr ? '/ar' : '/'} className="navbar-logo" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
            <Image
              src="/logo1.webp"
              alt="StartSmart Qatar Logo"
              width={190}
              height={52}
              style={{ objectFit: 'contain', maxHeight: "52px" }}
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
            {NAV_LINKS.map((link) => {
              const href = getLinkHref(link.anchor);
              return link.scroll ? (
                <a
                  key={link.anchor}
                  href={href}
                  onClick={(e) => handleAnchor(e, link.anchor)}
                  style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-text)')}
                >
                  {isAr ? link.ar : link.en}
                </a>
              ) : (
                <Link
                  key={link.anchor}
                  href={href}
                  style={linkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--c-accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--c-text)')}
                >
                  {isAr ? link.ar : link.en}
                </Link>
              );
            })}
          </nav>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Language toggle */}
            <Link
              href={langToggleHref}
              onClick={() => setLangCookie(isAr ? 'en' : 'ar')}
              style={{
                color: 'var(--c-accent)',
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none',
                border: '1.5px solid var(--c-accent)',
                borderRadius: '0.375rem',
                padding: '0.25rem 0.625rem',
                transition: 'background-color 0.15s, color 0.15s',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--c-accent)'; e.currentTarget.style.color = '#FFFFFF'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--c-accent)'; }}
            >
              {langToggleLabel}
            </Link>

            {/* WhatsApp CTA — desktop only */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-whatsapp-btn"
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
                transition: 'background-color 0.15s, transform 0.1s',
                boxShadow: '0 2px 8px rgba(37,211,102,0.3)',
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1ebe5d'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#25D366'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>واتساب | WhatsApp</span>
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className="hamburger-btn"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          aria-hidden={!menuOpen}
          style={{
            backgroundColor: 'rgba(248,249,250,0.97)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            overflow: 'hidden',
            maxHeight: menuOpen ? '400px' : '0px',
            transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            borderTop: menuOpen ? '1px solid var(--c-border)' : 'none',
          }}
        >
          <nav
            aria-label="Mobile navigation"
            style={{ display: 'flex', flexDirection: 'column', padding: '0.75rem 1.25rem 1.25rem', gap: '0.25rem' }}
          >
            {NAV_LINKS.map((link) => {
              const href = getLinkHref(link.anchor);
              return link.scroll ? (
                <a
                  key={link.anchor}
                  href={href}
                  onClick={(e) => handleAnchor(e, link.anchor)}
                  style={{ color: 'var(--c-text)', fontFamily: 'var(--font-inter), sans-serif', fontWeight: 500, fontSize: '1rem', textDecoration: 'none', padding: '0.625rem 0', borderBottom: '1px solid var(--c-border)', transition: 'color 0.15s' }}
                >
                  <span style={{ color: 'var(--c-accent)', marginRight: isAr ? 0 : '0.5rem', marginLeft: isAr ? '0.5rem' : 0, fontSize: '0.75rem' }}>→</span>
                  {isAr ? link.ar : link.en}
                </a>
              ) : (
                <Link
                  key={link.anchor}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{ color: 'var(--c-text)', fontFamily: 'var(--font-inter), sans-serif', fontWeight: 500, fontSize: '1rem', textDecoration: 'none', padding: '0.625rem 0', borderBottom: '1px solid var(--c-border)', transition: 'color 0.15s' }}
                >
                  <span style={{ color: 'var(--c-accent)', marginRight: isAr ? 0 : '0.5rem', marginLeft: isAr ? '0.5rem' : 0, fontSize: '0.75rem' }}>→</span>
                  {isAr ? link.ar : link.en}
                </Link>
              );
            })}
            {/* Language toggle in mobile menu */}
            <Link
              href={langToggleHref}
              onClick={() => { setLangCookie(isAr ? 'en' : 'ar'); setMenuOpen(false); }}
              style={{ color: 'var(--c-accent)', fontFamily: 'var(--font-inter), sans-serif', fontWeight: 700, fontSize: '1rem', textDecoration: 'none', padding: '0.625rem 0', marginTop: '0.25rem' }}
            >
              <span style={{ color: 'var(--c-accent)', marginRight: isAr ? 0 : '0.5rem', marginLeft: isAr ? '0.5rem' : 0, fontSize: '0.75rem' }}>🌐</span>
              {isAr ? 'Switch to English' : 'التبديل للعربية'}
            </Link>
          </nav>
        </div>
      </header>

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav { display: flex !important; }
          .hamburger-btn { display: none !important; }
        }
        @media (max-width: 767px) {
          .nav-whatsapp-btn { display: none !important; }
        }
        @media (max-width: 400px) {
          .navbar-logo img { width: 140px !important; height: 38px !important; }
        }
      `}</style>
    </>
  );
}
