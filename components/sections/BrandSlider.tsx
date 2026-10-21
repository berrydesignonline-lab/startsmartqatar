import Image from 'next/image';
import Link from 'next/link';
import { BRANDS } from '@/lib/brands-data';

/**
 * Auto-scrolling "brands we stock" logo marquee for the homepage.
 * Pure CSS animation (no JS/library). Logos duplicated once for a seamless loop.
 * Each logo links to its brand page.
 */
export default function BrandSlider({ lang = 'en' }: { lang?: 'en' | 'ar' }) {
  const ar = lang === 'ar';
  const base = ar ? '/ar/batteries' : '/batteries';
  const loop = [...BRANDS, ...BRANDS]; // duplicate for seamless scroll

  return (
    <section
      aria-label={ar ? 'ماركات البطاريات' : 'Battery brands we stock'}
      style={{ backgroundColor: 'var(--c-surface, #f8f8f8)', padding: '2.5rem 0', overflow: 'hidden' }}
      dir={ar ? 'rtl' : 'ltr'}
    >
      <p style={{
        textAlign: 'center', margin: '0 0 1.5rem', color: 'var(--c-muted, #666)',
        fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontWeight: 600,
        fontSize: '0.8125rem', letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        {ar ? 'بطاريات أصلية من أفضل الماركات' : 'Genuine batteries from top brands'}
      </p>

      <div className="brand-marquee">
        <ul className="brand-track" style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: '3rem' }}>
          {loop.map((b, i) => (
            <li key={`${b.slug}-${i}`} style={{ flexShrink: 0 }}>
              <Link
                href={`${base}/${b.slug}`}
                aria-label={ar ? b.nameAr : b.nameEn}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  height: '64px', width: '150px', borderRadius: '0.5rem',
                  backgroundColor: b.logoBg ?? 'transparent', padding: b.logoBg ? '0.5rem 0.75rem' : 0,
                }}
              >
                <Image
                  src={b.logo}
                  alt={`${ar ? b.nameAr : b.nameEn} battery Qatar`}
                  width={130}
                  height={48}
                  style={{ objectFit: 'contain', maxHeight: '48px', width: 'auto' }}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <Link href={base} style={{
          color: 'var(--c-accent)', fontWeight: 600, textDecoration: 'none',
          fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '0.9375rem',
        }}>
          {ar ? 'شوف كل الماركات وجد بطارية سيارتك ←' : 'See all brands & find your battery →'}
        </Link>
      </div>

      <style>{`
        .brand-marquee { width: 100%; }
        .brand-track { width: max-content; animation: brand-scroll 28s linear infinite; }
        .brand-marquee:hover .brand-track { animation-play-state: paused; }
        @keyframes brand-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        [dir="rtl"] .brand-track { animation-name: brand-scroll-rtl; }
        @keyframes brand-scroll-rtl {
          from { transform: translateX(0); }
          to   { transform: translateX(50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .brand-track { animation: none; flex-wrap: wrap; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
