import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import WhatsAppCTA from '@/components/sections/WhatsAppCTA';
import FloatingCTA from '@/components/ui/FloatingCTA';
import CityMap from '@/components/ui/CityMap';
import type { CityData } from '@/lib/cities-data';

const SITE_URL = 'https://startsmartqatar.com';

interface Props {
  city: CityData;
  lang: 'en' | 'ar';
}

export default function CityBatteryPage({ city, lang }: Props) {
  const ar = lang === 'ar';
  const cityName = ar ? city.nameAr : city.nameEn;
  const landmarks = ar ? city.landmarksAr : city.landmarksEn;
  const responseMin = city.responseMin;
  const intro = ar ? city.battery.introAr : city.battery.introEn;
  const responseReason = ar ? city.responseReasonAr : city.responseReasonEn;

  const t = ar
    ? {
        badge: `⚡ ${cityName} — متاحين ٢٤/٧`,
        h1Pre: 'تبديل بطارية السيارة في',
        h1City: cityName,
        sub: `نصل إليك في ${cityName} خلال ${responseMin} دقايق — داخل مناطق الخدمة`,
        coverageHeading: `مناطق التغطية في ${cityName}`,
        coverageNote: `نخدم كل مناطق ${cityName} بما فيها:`,
        mapHeading: `خريطة منطقة الخدمة في ${cityName}`,
        mapNote: `نغطي ${cityName} وكل المناطق المجاورة لها.`,
        ctaBtn: 'اطلب الآن على الواتساب',
        whyHeading: `ليش تختار ستارت سمارت في ${cityName}؟`,
        why: [
          { icon: '⚡', t: `وصول ${responseMin} دقايق`, d: `أقرب فني يوصلك في ${cityName} خلال ${responseMin} دقايق داخل مناطق الخدمة.` },
          { icon: '🔋', t: 'بطاريات أصلية مع ضمان ١٢ شهر', d: 'إنفنتي، بوش، كيو باور، وإكسايد — كل البطاريات أصلية وعليها ضمان ١٢ شهر.' },
          { icon: '🧰', t: 'فحص الدينامو مجاناً', d: 'كل تبديل بطارية يشمل فحص الدينامو ونظام الشحن مجاناً.' },
          { icon: '💳', t: 'الدفع بعد الخدمة', d: 'كاش أو بطاقة — تدفع بس بعد ما نخلّص.' },
        ],
        relatedHeading: 'خدمات أخرى',
        backLink: 'كل خدمات البطارية',
        backHref: '/ar/services/battery-replacement',
      }
    : {
        badge: `⚡ ${cityName} — Available 24/7`,
        h1Pre: 'Car Battery Replacement in',
        h1City: cityName,
        sub: `We reach you in ${cityName} within ${responseMin} minutes — within service areas.`,
        coverageHeading: `Coverage Areas in ${cityName}`,
        coverageNote: `We serve every area of ${cityName} including:`,
        mapHeading: `${cityName} Service Area Map`,
        mapNote: `We cover ${cityName} and all its surrounding districts.`,
        ctaBtn: 'Order on WhatsApp now',
        whyHeading: `Why Choose StartSmart in ${cityName}?`,
        why: [
          { icon: '⚡', t: `${responseMin}-minute arrival`, d: `Our nearest technician reaches you anywhere in ${cityName} within ${responseMin} minutes (within service areas).` },
          { icon: '🔋', t: 'Genuine batteries + 12-month warranty', d: 'Infinity, Bosch, Q-Power, Exide — every battery is genuine and carries an 12-month replacement warranty.' },
          { icon: '🧰', t: 'Free charging-system check', d: 'Every battery replacement includes a free alternator and charging-system inspection.' },
          { icon: '💳', t: 'Pay after service', d: 'Cash or card — pay only after the work is done.' },
        ],
        relatedHeading: 'Other Services',
        backLink: 'All Battery Services',
        backHref: '/services/battery-replacement',
      };

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97477719819'}?text=${encodeURIComponent(ar ? `مرحبا، أحتاج تبديل بطارية في ${cityName}` : `Hi, I need battery replacement in ${cityName}`)}`;

  // City-specific Service schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${ar ? '/ar' : ''}/services/battery-replacement/${city.slug}#service`,
    name: ar ? `تبديل بطارية السيارة في ${cityName}` : `Car Battery Replacement in ${cityName}`,
    serviceType: 'Car Battery Replacement',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: city.nameEn, containedInPlace: { '@type': 'Country', name: 'Qatar' } },
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: whatsappUrl },
    offers: { '@type': 'Offer', priceCurrency: 'QAR', priceRange: 'QAR 150–500', availability: 'https://schema.org/InStock' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ar ? 'الرئيسية' : 'Home', item: `${SITE_URL}${ar ? '/ar' : ''}` },
      { '@type': 'ListItem', position: 2, name: ar ? 'الخدمات' : 'Services', item: `${SITE_URL}${ar ? '/ar' : ''}/services/battery-replacement` },
      { '@type': 'ListItem', position: 3, name: ar ? `تبديل بطارية في ${cityName}` : `Battery Replacement in ${cityName}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />

      <main dir={ar ? 'rtl' : 'ltr'} style={{ backgroundColor: 'var(--c-bg, #fff)', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ padding: '6.5rem 1.5rem 3rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1.5px solid rgba(224,92,0,0.65)', borderRadius: '9999px', padding: '0.3rem 0.95rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--c-accent)', backgroundColor: 'rgba(224,92,0,0.1)', letterSpacing: '0.06em', marginBottom: '1rem' }}>
            {t.badge}
          </div>
          <h1 style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontWeight: 900, fontSize: 'clamp(2rem, 6vw, 3.25rem)', lineHeight: 1.15, margin: '0 0 1rem', color: 'var(--c-text, #111)' }}>
            {t.h1Pre} <span style={{ color: 'var(--c-accent)' }}>{t.h1City}</span>
          </h1>
          <p style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)', fontWeight: 600, color: 'var(--c-accent)', margin: '0 0 1.5rem' }}>
            {t.sub}
          </p>
          <p style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '1rem', lineHeight: 1.7, color: 'var(--c-muted, #555)', maxWidth: '720px', margin: '0 auto 1.25rem' }}>
            {intro}
          </p>
          <p style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--c-muted, #555)', maxWidth: '720px', margin: '0 auto 2rem', fontStyle: 'italic' }}>
            📍 {responseReason}
          </p>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1rem', padding: '0.9rem 2rem', borderRadius: '0.6rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.35)' }}>
            {t.ctaBtn}
          </a>
        </section>

        {/* Coverage */}
        <section style={{ padding: '2rem 1.5rem', maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontWeight: 800, fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)', margin: '0 0 0.75rem', color: 'var(--c-text, #111)' }}>
            {t.coverageHeading}
          </h2>
          <p style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '0.95rem', color: 'var(--c-muted, #555)', margin: '0 0 1rem' }}>
            {t.coverageNote}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {landmarks.map((l) => (
              <span key={l} style={{ border: '1px solid var(--c-border, #ddd)', borderRadius: '9999px', padding: '0.4rem 0.95rem', fontSize: '0.875rem', color: 'var(--c-text, #111)', backgroundColor: 'var(--c-surface, #f9f9f9)' }}>
                {l}
              </span>
            ))}
          </div>
        </section>

        {/* Map */}
        <CityMap query={city.mapsQuery} title={`${t.mapHeading}`} heading={t.mapHeading} note={t.mapNote} rtl={ar} />

        {/* Why */}
        <section style={{ padding: '2.5rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontWeight: 800, fontSize: 'clamp(1.4rem, 3.5vw, 1.9rem)', margin: '0 0 1.5rem', color: 'var(--c-text, #111)', textAlign: 'center' }}>
            {t.whyHeading}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {t.why.map((b) => (
              <div key={b.t} style={{ backgroundColor: 'var(--c-surface, #f9f9f9)', border: '1px solid var(--c-border, #eee)', borderRadius: '0.75rem', padding: '1.25rem' }}>
                <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{b.icon}</div>
                <h3 style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontWeight: 700, fontSize: '1.05rem', margin: '0 0 0.4rem', color: 'var(--c-text, #111)' }}>
                  {b.t}
                </h3>
                <p style={{ fontFamily: ar ? 'var(--font-cairo)' : 'var(--font-inter)', fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--c-muted, #555)', margin: 0 }}>
                  {b.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div style={{ textAlign: 'center', padding: '1rem 1.5rem 2rem' }}>
          <Link href={t.backHref} style={{ color: 'var(--c-accent)', fontWeight: 600, textDecoration: 'none' }}>
            ← {t.backLink}
          </Link>
        </div>

        <WhatsAppCTA lang={lang} />
      </main>

      <Footer lang={lang} />
      <FloatingCTA />
    </>
  );
}
