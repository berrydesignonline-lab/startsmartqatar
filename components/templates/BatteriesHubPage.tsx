import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import WhatsAppCTA from '@/components/sections/WhatsAppCTA';
import BatteryFinder from '@/components/sections/BatteryFinder';
import { BRANDS } from '@/lib/brands-data';

const SITE_URL = 'https://startsmartqatar.com';

export default function BatteriesHubPage({ lang }: { lang: 'en' | 'ar' }) {
  const ar = lang === 'ar';

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: ar ? 'بطاريات السيارات في قطر' : 'Car Batteries in Qatar',
    url: `${SITE_URL}${ar ? '/ar' : ''}/batteries`,
    about: BRANDS.map((b) => ({ '@type': 'Brand', name: b.nameEn })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <Navbar />
      <main dir={ar ? 'rtl' : 'ltr'} style={{ backgroundColor: 'var(--c-bg, #fff)', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Hero */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem 1.5rem', textAlign: 'center' }}>
          <h1 style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontWeight: 900, fontSize: 'clamp(1.9rem, 5vw, 3rem)', lineHeight: 1.15, margin: '0 0 1rem', color: 'var(--c-text, #111)' }}>
            {ar ? 'بطاريات السيارات في ' : 'Car Batteries in '}<span style={{ color: 'var(--c-accent)' }}>{ar ? 'قطر' : 'Qatar'}</span>
          </h1>
          <p style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', lineHeight: 1.75, color: 'var(--c-muted, #555)', maxWidth: '700px', margin: '0 auto' }}>
            {ar
              ? 'نوفّر بطاريات أصلية من بوش، إنفنتي، كيو باور وإكسايد — نوصّلها ونركّبها لك في مكانك بأي منطقة بقطر، مع ضمان وفحص مجاني للدينمو. ادفع بعد الخدمة.'
              : 'We stock genuine Bosch, Infinity, Q-Power and Exide batteries — delivered and fitted at your location anywhere in Qatar, with a warranty and a free alternator check. Pay after service.'}
          </p>
        </section>

        {/* Brand cards */}
        <section style={{ maxWidth: '960px', margin: '0 auto', padding: '1rem 1.5rem 2.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {BRANDS.map((b) => (
              <Link key={b.slug} href={`${ar ? '/ar' : ''}/batteries/${b.slug}`} style={{
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                padding: '1.5rem', backgroundColor: 'var(--c-surface, #f9f9f9)',
                border: '1px solid var(--c-border, #eee)', borderRadius: '0.85rem',
                textDecoration: 'none',
              }}>
                <div style={{ height: '56px', display: 'flex', alignItems: 'center', justifyContent: ar ? 'flex-end' : 'flex-start', backgroundColor: b.logoBg ?? 'transparent', borderRadius: '0.4rem', padding: b.logoBg ? '0.4rem 0.6rem' : 0 }}>
                  <Image src={b.logo} alt={`${ar ? b.nameAr : b.nameEn} battery Qatar`} width={130} height={44} style={{ objectFit: 'contain', maxHeight: '44px', width: 'auto' }} />
                </div>
                <strong style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '1.1rem', color: 'var(--c-text, #111)' }}>
                  {ar ? `بطارية ${b.nameAr}` : `${b.nameEn} Battery`}
                </strong>
                <span style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--c-muted, #555)' }}>
                  {ar ? b.taglineAr : b.taglineEn}
                </span>
                <span style={{ color: 'var(--c-accent)', fontSize: '0.875rem', fontWeight: 600, fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)' }}>
                  {ar ? 'اعرف أكثر ←' : 'Learn more →'}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Battery Finder */}
        <section style={{ padding: '1rem 1.5rem 3rem' }}>
          <BatteryFinder lang={lang} />
        </section>

        <WhatsAppCTA lang={lang} />
      </main>
      <Footer lang={lang} />
      <FloatingCTA />
    </>
  );
}
