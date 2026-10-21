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

export default function CityJumpStartPage({ city, lang }: Props) {
  const ar = lang === 'ar';
  const cityName = ar ? city.nameAr : city.nameEn;
  const landmarks = ar ? city.landmarksAr : city.landmarksEn;
  const intro = ar ? city.jumpStart.introAr : city.jumpStart.introEn;
  const responseReason = ar ? city.responseReasonAr : city.responseReasonEn;

  const t = ar
    ? {
        badge: `⚡ ${cityName} — متاحين ٢٤/٧`,
        h1Pre: 'تشغيل البطارية (إشتراك) للسيارات في',
        h1City: cityName,
        sub: `نصل إليك في ${cityName} في أسرع وقت داخل كل مناطق الدوحة وكل مناطق قطر`,
        coverageHeading: `مناطق التغطية في ${cityName}`,
        coverageNote: `نخدم كل مناطق ${cityName} بما فيها:`,
        mapHeading: `خريطة منطقة الخدمة في ${cityName}`,
        mapNote: `نغطي ${cityName} وكل المناطق المجاورة لها.`,
        ctaBtn: 'اطلب الخدمة الآن على الواتساب',
        whyHeading: `كيف تطلب الخدمة في ${cityName}؟`,
        why: [
          { icon: '💬', t: 'تواصل معنا على الواتساب', d: `أرسل مكانك في ${cityName} على الواتساب — ما تاخذ غير ٣٠ ثانية.` },
          { icon: '🚗', t: 'نرسل أقرب فني', d: 'نرسل لك أقرب فني فوراً.' },
          { icon: '⚡', t: `نصل إليك في ${cityName}`, d: 'سيارتك تشتغل، أو نبدل البطارية فوراً.' },
          { icon: '💳', t: 'تدفع بعد تقديم الخدمة', d: 'كاش أو بطاقة — تدفع بس بعد ما نخلّص.' },
        ],
        backLink: 'كل خدمات تشغيل البطارية',
        backHref: '/ar/services/jump-start',
      }
    : {
        badge: `⚡ ${cityName} — Available 24/7`,
        h1Pre: 'Emergency Jump Start in',
        h1City: cityName,
        sub: `We reach you anywhere in ${cityName} fast — across all of Doha and Qatar.`,
        coverageHeading: `Coverage Areas in ${cityName}`,
        coverageNote: `We serve every area of ${cityName} including:`,
        mapHeading: `${cityName} Service Area Map`,
        mapNote: `We cover ${cityName} and all its surrounding districts.`,
        ctaBtn: 'Request service on WhatsApp now',
        whyHeading: `How to Request Service in ${cityName}`,
        why: [
          { icon: '💬', t: 'Contact us on WhatsApp', d: `Send your location in ${cityName} — takes 30 seconds.` },
          { icon: '🚗', t: 'Nearest technician dispatched', d: 'We send the closest technician right away.' },
          { icon: '⚡', t: `We arrive in ${cityName}`, d: 'Your car starts — or we replace the battery on the spot.' },
          { icon: '💳', t: 'Pay after service', d: 'Cash or card — pay only once the job is done.' },
        ],
        backLink: 'All Jump Start Service',
        backHref: '/services/jump-start',
      };

  const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97477719819'}?text=${encodeURIComponent(ar ? `مرحبا، أحتاج تشغيل البطارية في ${cityName}` : `Hi, I need a jump start in ${cityName}`)}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${ar ? '/ar' : ''}/services/jump-start/${city.slug}#service`,
    name: ar ? `تشغيل البطارية (إشتراك) للسيارات في ${cityName}` : `Emergency Jump Start in ${cityName}`,
    serviceType: 'Emergency Battery Jump Start',
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
      { '@type': 'ListItem', position: 2, name: ar ? 'الخدمات' : 'Services', item: `${SITE_URL}${ar ? '/ar' : ''}/services/jump-start` },
      { '@type': 'ListItem', position: 3, name: ar ? `تشغيل البطارية في ${cityName}` : `Jump Start in ${cityName}` },
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
