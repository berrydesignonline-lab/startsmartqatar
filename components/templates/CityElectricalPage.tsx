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

export default function CityElectricalPage({ city, lang }: Props) {
  const ar = lang === 'ar';
  const cityName = ar ? city.nameAr : city.nameEn;
  const landmarks = ar ? city.landmarksAr : city.landmarksEn;
  const intro = ar ? city.electrical.introAr : city.electrical.introEn;
  const responseReason = ar ? city.responseReasonAr : city.responseReasonEn;

  const t = ar
    ? {
        badge: `🔧 ${cityName} — خدمة كهرباء متنقلة`,
        h1Pre: 'إصلاح كهرباء السيارة في',
        h1City: cityName,
        sub: `فريقنا المتخصص يصل إليك في ${cityName} للتشخيص والإصلاح في الموقع`,
        coverageHeading: `مناطق التغطية في ${cityName}`,
        coverageNote: `نخدم كل مناطق ${cityName} بما فيها:`,
        mapHeading: `خريطة منطقة الخدمة في ${cityName}`,
        mapNote: `نغطي ${cityName} وكل المناطق المجاورة لها.`,
        ctaBtn: 'اطلب إصلاح الكهرباء الآن',
        whyHeading: 'خدمات الصيانة الكهربائية',
        why: [
          { icon: '⚡', t: 'عطل الدينامو', d: 'تشخيص وإصلاح الدينامو المعطوب أو استبدالها في الموقع.' },
          { icon: '🛠️', t: 'الفيوزات والأسلاك', d: 'فيوزات معطوبة، أسلاك تالفة، دوائر قصر — نشخص العطل ونقوم بإصلاحه.' },
          { icon: '⚠️', t: 'أضواء التحذير', d: 'نقرأ أكواد الأعطال ونشخّص سبب أي ضوء تحذير في الطبلون.' },
          { icon: '⚙️', t: 'موتور البدائ (السيلف)', d: 'تشخيص وإصلاح موتور البدائ (السيلف) أو استبدالها في الموقع.' },
        ],
        backLink: 'كل خدمات الكهرباء',
        backHref: '/ar/services/electrical-repair',
      }
    : {
        badge: `🔧 ${cityName} — Mobile Electrical Service`,
        h1Pre: 'Car Electrical Repair in',
        h1City: cityName,
        sub: `Our specialized team reaches you in ${cityName} for on-site diagnosis and repair.`,
        coverageHeading: `Coverage Areas in ${cityName}`,
        coverageNote: `We serve every area of ${cityName} including:`,
        mapHeading: `${cityName} Service Area Map`,
        mapNote: `We cover ${cityName} and all its surrounding districts.`,
        ctaBtn: 'Request electrical repair now',
        whyHeading: 'Electrical Maintenance Services',
        why: [
          { icon: '⚡', t: 'Alternator failure', d: 'Diagnose and repair faulty alternator, or replace on-site.' },
          { icon: '🛠️', t: 'Fuses & wiring', d: 'Blown fuses, damaged wiring, short circuits — we trace and fix the fault.' },
          { icon: '⚠️', t: 'Warning lights', d: 'We read fault codes and diagnose the root cause of any dashboard warning light.' },
          { icon: '⚙️', t: 'Starter motor', d: "Starter motor diagnosis and repair, or replace on-site." },
        ],
        backLink: 'All Electrical Repair',
        backHref: '/services/electrical-repair',
      };

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97477719819'}?text=${encodeURIComponent(ar ? `مرحبا، أحتاج إصلاح كهرباء سيارة في ${cityName}` : `Hi, I need electrical repair in ${cityName}`)}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${ar ? '/ar' : ''}/services/electrical-repair/${city.slug}#service`,
    name: ar ? `إصلاح كهرباء السيارة في ${cityName}` : `Car Electrical Repair in ${cityName}`,
    serviceType: 'Auto Electrical Repair',
    provider: { '@id': `${SITE_URL}/#business` },
    areaServed: { '@type': 'City', name: city.nameEn, containedInPlace: { '@type': 'Country', name: 'Qatar' } },
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: whatsappUrl },
    offers: { '@type': 'Offer', priceCurrency: 'QAR', availability: 'https://schema.org/InStock' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ar ? 'الرئيسية' : 'Home', item: `${SITE_URL}${ar ? '/ar' : ''}` },
      { '@type': 'ListItem', position: 2, name: ar ? 'الخدمات' : 'Services', item: `${SITE_URL}${ar ? '/ar' : ''}/services/electrical-repair` },
      { '@type': 'ListItem', position: 3, name: ar ? `إصلاح كهرباء في ${cityName}` : `Electrical Repair in ${cityName}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main dir={ar ? 'rtl' : 'ltr'} style={{ backgroundColor: 'var(--c-bg, #fff)', minHeight: '100vh' }}>
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
