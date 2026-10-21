import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import WhatsAppCTA from '@/components/sections/WhatsAppCTA';
import { BRANDS, type BrandData } from '@/lib/brands-data';

const SITE_URL = 'https://startsmartqatar.com';

interface Props {
  brand: BrandData;
  lang: 'en' | 'ar';
}

export default function BrandPageTemplate({ brand, lang }: Props) {
  const ar = lang === 'ar';
  const name = ar ? brand.nameAr : brand.nameEn;
  const tagline = ar ? brand.taglineAr : brand.taglineEn;
  const intro = ar ? brand.introAr : brand.introEn;
  const strengths = ar ? brand.strengthsAr : brand.strengthsEn;
  const bestFor = ar ? brand.bestForAr : brand.bestForEn;
  const others = BRANDS.filter((b) => b.slug !== brand.slug);
  const hubHref = ar ? '/ar/batteries' : '/batteries';

  const waText = ar ? `مرحبا، أبي بطارية ${name} لسيارتي` : `Hi, I need a ${name} battery for my car`;
  const waUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97477719819'}?text=${encodeURIComponent(waText)}`;

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: ar ? `بطارية ${name}` : `${name} Car Battery`,
    image: `${SITE_URL}${brand.logo}`,
    brand: { '@type': 'Brand', name: brand.nameEn },
    description: ar ? brand.metaDescAr : brand.metaDescEn,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'QAR',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'LocalBusiness', name: 'StartSmart Qatar', url: SITE_URL },
      url: `${SITE_URL}${ar ? '/ar' : ''}/batteries/${brand.slug}`,
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ar ? 'الرئيسية' : 'Home', item: `${SITE_URL}${ar ? '/ar' : ''}` },
      { '@type': 'ListItem', position: 2, name: ar ? 'البطاريات' : 'Batteries', item: `${SITE_URL}${hubHref}` },
      { '@type': 'ListItem', position: 3, name },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main dir={ar ? 'rtl' : 'ltr'} style={{ backgroundColor: 'var(--c-bg, #fff)', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Hero */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            height: '90px', minWidth: '180px', padding: '1rem 1.5rem', marginBottom: '1.5rem',
            backgroundColor: brand.logoBg ?? 'transparent', borderRadius: '0.75rem',
            border: '1px solid var(--c-border, #eee)',
          }}>
            <Image src={brand.logo} alt={`${name} battery Qatar`} width={180} height={64} style={{ objectFit: 'contain', maxHeight: '64px', width: 'auto' }} priority />
          </div>
          <h1 style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontWeight: 900, fontSize: 'clamp(1.9rem, 5vw, 3rem)', lineHeight: 1.15, margin: '0 0 0.75rem', color: 'var(--c-text, #111)' }}>
            {ar ? `بطارية ${name} في ` : `${name} Battery `}<span style={{ color: 'var(--c-accent)' }}>{ar ? 'قطر' : 'Qatar'}</span>
          </h1>
          <p style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', fontWeight: 600, color: 'var(--c-accent)', margin: '0 0 1.5rem' }}>
            {tagline}
          </p>
          <p style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '1rem', lineHeight: 1.75, color: 'var(--c-muted, #555)', maxWidth: '700px', margin: '0 auto 2rem' }}>
            {intro}
          </p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1rem', padding: '0.9rem 2rem', borderRadius: '0.6rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.35)' }}>
            {ar ? `اطلب بطارية ${name} الآن` : `Order ${name} now`}
          </a>
        </section>

        {/* Strengths */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '1.5rem' }}>
          <h2 style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontWeight: 800, fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)', margin: '0 0 1.25rem', color: 'var(--c-text, #111)', textAlign: 'center' }}>
            {ar ? `ليش ${name}؟` : `Why ${name}?`}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {strengths.map((s) => (
              <div key={s} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', padding: '1rem 1.25rem', backgroundColor: 'var(--c-surface, #f9f9f9)', border: '1px solid var(--c-border, #eee)', borderRadius: '0.75rem' }}>
                <span style={{ color: 'var(--c-accent)', fontWeight: 800, flexShrink: 0 }}>✓</span>
                <span style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '0.95rem', lineHeight: 1.5, color: 'var(--c-text, #111)' }}>{s}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Best for */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '1.5rem' }}>
          <div style={{ padding: '1.5rem', backgroundColor: 'rgba(224,92,0,0.06)', border: '1px solid var(--c-accent)', borderRadius: '0.75rem' }}>
            <h3 style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontWeight: 700, fontSize: '1.05rem', margin: '0 0 0.5rem', color: 'var(--c-text, #111)' }}>
              {ar ? 'الأنسب لـ' : 'Best for'}
            </h3>
            <p style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--c-muted, #555)', margin: 0 }}>
              {bestFor}
            </p>
          </div>
        </section>

        {/* Find your battery CTA */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '1.5rem', textAlign: 'center' }}>
          <Link href={hubHref} style={{ display: 'inline-block', color: 'var(--c-accent)', fontWeight: 600, textDecoration: 'none', fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '1rem' }}>
            {ar ? '🔋 جد البطارية المناسبة لسيارتك ←' : '🔋 Find the right battery for your car →'}
          </Link>
        </section>

        {/* Other brands */}
        <section style={{ backgroundColor: 'var(--c-surface, #f8f8f8)', padding: '2.5rem 1.5rem', marginTop: '1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontWeight: 700, fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', margin: '0 0 1.25rem', color: 'var(--c-text, #111)', textAlign: 'center' }}>
              {ar ? 'ماركات أخرى نوفرها' : 'Other brands we stock'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
              {others.map((b) => (
                <Link key={b.slug} href={`${ar ? '/ar' : ''}/batteries/${b.slug}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '72px', backgroundColor: b.logoBg ?? 'var(--c-bg, #fff)', borderRadius: '0.6rem', border: '1px solid var(--c-border, #eee)', padding: '0.75rem' }}>
                  <Image src={b.logo} alt={`${ar ? b.nameAr : b.nameEn} battery`} width={120} height={40} style={{ objectFit: 'contain', maxHeight: '40px', width: 'auto' }} />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <WhatsAppCTA lang={lang} />
      </main>
      <Footer lang={lang} />
      <FloatingCTA />
    </>
  );
}
