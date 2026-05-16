import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import { type ServiceData, ALL_SERVICES } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqatar.com';

const AREAS_EN = [
  'West Bay', 'The Pearl', 'Lusail', 'Al Rayyan',
  'Madinat Khalifa', 'Al Wakrah', 'Al Duhail', 'Al Khor',
  'Muaither', 'Old Airport', 'Industrial Area', 'All Qatar ✓',
];

const AREAS_AR = [
  'ويست باي', 'اللؤلؤة', 'لوسيل', 'الريان',
  'مدينة خليفة', 'الوكرة', 'الدحيل', 'الخور',
  'مويثر', 'المطار القديم', 'المنطقة الصناعية', 'كل قطر ✓',
];

interface Props {
  data: ServiceData;
  lang: 'en' | 'ar';
}

export default function ServicePageTemplate({ data, lang }: Props) {
  const ar = lang === 'ar';
  const t = ar ? data.ar : data.en;
  const areas = ar ? AREAS_AR : AREAS_EN;
  const related = ALL_SERVICES.filter((s) => s.slug !== data.slug);

  const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappText)}`;
  const pageUrl = `${SITE_URL}${ar ? '/ar' : ''}/services/${data.slug}`;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${t.h1} ${t.h1Accent}`,
    description: t.metaDescription,
    provider: { '@type': 'LocalBusiness', name: 'StartSmart Qatar', url: SITE_URL },
    areaServed: { '@type': 'Country', name: 'Qatar' },
    url: pageUrl,
    ...(t.warranty && {
      hasWarrantyScope: {
        '@type': 'WarrantyScope',
        name: t.warranty.title,
        durationOfWarranty: {
          '@type': 'QuantitativeValue',
          value: t.warranty.months,
          unitCode: 'MON',
        },
      },
    }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: ar ? 'الرئيسية' : 'Home',
        item: ar ? `${SITE_URL}/ar` : SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: `${t.h1} ${t.h1Accent}`,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <main
        dir={ar ? 'rtl' : 'ltr'}
        lang={lang}
        style={{
          backgroundColor: 'var(--c-bg)',
          color: 'var(--c-text)',
          paddingTop: '80px',
          minHeight: '100vh',
          fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
        }}
      >
        {/* ── Breadcrumb ── */}
        <nav
          aria-label={ar ? 'مسار التنقل' : 'Breadcrumb'}
          style={{ maxWidth: '860px', margin: '0 auto', padding: '1rem 1.5rem 0', fontSize: '0.875rem' }}
        >
          <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <li>
              <a href={ar ? '/ar' : '/'} style={{ color: 'var(--c-muted)', textDecoration: 'none' }}>
                {ar ? 'الرئيسية' : 'Home'}
              </a>
            </li>
            <li aria-hidden="true" style={{ color: 'var(--c-border)', padding: '0 0.125rem' }}>
              {ar ? '←' : '→'}
            </li>
            <li style={{ color: 'var(--c-text)', fontWeight: 500 }}>
              {t.h1} <span style={{ color: 'var(--c-accent)' }}>{t.h1Accent}</span>
            </li>
          </ol>
        </nav>

        {/* ── Hero ── */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
            border: '1px solid rgba(var(--c-accent-rgb),0.35)', borderRadius: '9999px',
            padding: '0.3rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600,
            color: 'var(--c-accent)', backgroundColor: 'rgba(var(--c-accent-rgb),0.06)',
            marginBottom: '1.25rem',
          }}>
            {t.badge}
          </div>
          <h1 style={{
            fontWeight: 800,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: 1.1,
            marginBottom: '1rem',
            color: 'var(--c-text)',
          }}>
            {t.h1} <span style={{ color: 'var(--c-accent)' }}>{t.h1Accent}</span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
            color: 'var(--c-muted)',
            lineHeight: 1.75,
            maxWidth: '600px',
            margin: '0 auto 2rem',
          }}>
            {t.description}
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="svc-cta-btn"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.5rem', backgroundColor: '#25D366', color: '#fff',
              fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem',
              borderRadius: '0.625rem', textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(37,211,102,0.25)',
            }}
          >
            <WhatsAppIcon />
            {t.ctaLabel}
          </a>
        </section>

        {/* ── Warranty ── */}
        {t.warranty && (
          <section style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem 2rem' }}>
            <div style={{
              border: '2px solid var(--c-accent)',
              borderRadius: '1rem',
              padding: 'clamp(1.25rem, 4vw, 2rem)',
              backgroundColor: 'rgba(var(--c-accent-rgb), 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '2rem', lineHeight: 1 }}>🛡️</span>
                <div>
                  <h2 style={{
                    margin: 0, fontWeight: 800,
                    fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
                    color: 'var(--c-accent)', lineHeight: 1.15,
                  }}>
                    {t.warranty.title}
                  </h2>
                  <p style={{ margin: '0.25rem 0 0', color: 'var(--c-muted)', fontSize: '0.875rem' }}>
                    {t.warranty.months} {ar ? 'شهراً من تاريخ التركيب' : 'months from installation date'}
                  </p>
                </div>
              </div>
              <p style={{ margin: 0, color: 'var(--c-text)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                {t.warranty.description}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {t.warranty.conditions.map((c) => (
                  <li key={c} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', fontSize: '0.9375rem', color: 'var(--c-text)' }}>
                    <span style={{ color: 'var(--c-accent)', fontWeight: 700, flexShrink: 0, marginTop: '0.1rem' }}>✓</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── Benefits ── */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '2rem 1.5rem' }}>
          <h2 style={{
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
            marginBottom: '1.5rem',
            color: 'var(--c-text)',
          }}>
            {t.benefitsHeading}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {t.benefits.map((b) => (
              <li key={b.title} style={{
                display: 'flex', gap: '1rem', padding: '1.25rem',
                backgroundColor: 'var(--c-surface)', borderRadius: '0.75rem',
                border: '1px solid var(--c-border)',
              }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0, lineHeight: 1.2 }}>{b.icon}</span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--c-text)', fontSize: '1rem' }}>
                    {b.title}
                  </strong>
                  <span style={{ color: 'var(--c-muted)', fontSize: '0.9375rem', lineHeight: 1.55 }}>
                    {b.desc}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Coverage Areas ── */}
        <section style={{ backgroundColor: 'var(--c-surface)', padding: '3rem 1.5rem', marginTop: '1rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
              marginBottom: '0.75rem',
              color: 'var(--c-text)',
              textAlign: 'center',
            }}>
              {t.areasHeading}
            </h2>
            <p style={{ color: 'var(--c-muted)', textAlign: 'center', marginBottom: '1.75rem', lineHeight: 1.65 }}>
              {t.areasNote}
            </p>
            <ul
              className="svc-areas-grid"
              style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}
            >
              {areas.map((area, i) => (
                <li key={area} style={{
                  padding: '0.625rem 1rem', textAlign: 'center',
                  backgroundColor: i === areas.length - 1 ? 'rgba(var(--c-accent-rgb),0.08)' : 'var(--c-bg)',
                  border: `1px solid ${i === areas.length - 1 ? 'var(--c-accent)' : 'var(--c-border)'}`,
                  borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500,
                  color: 'var(--c-text)',
                }}>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem' }}>
          <h2 style={{
            fontWeight: 700,
            fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
            marginBottom: '1.5rem',
            color: 'var(--c-text)',
          }}>
            {t.faqHeading}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {t.faq.map(({ q, a }) => (
              <div key={q} style={{
                backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)',
                borderRadius: '0.75rem', padding: '1.25rem 1.5rem',
              }}>
                <p style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--c-text)', margin: '0 0 0.5rem' }}>
                  <span style={{
                    color: 'var(--c-accent)',
                    marginRight: ar ? 0 : '0.375rem',
                    marginLeft: ar ? '0.375rem' : 0,
                  }}>
                    Q.
                  </span>
                  {q}
                </p>
                <p style={{ color: 'var(--c-muted)', margin: 0, lineHeight: 1.65, fontSize: '0.9375rem' }}>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Services ── */}
        <section style={{ backgroundColor: 'var(--c-surface)', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '860px', margin: '0 auto' }}>
            <h2 style={{
              fontWeight: 700,
              fontSize: 'clamp(1.5rem, 3vw, 1.875rem)',
              marginBottom: '1.5rem',
              color: 'var(--c-text)',
              textAlign: 'center',
            }}>
              {t.relatedHeading}
            </h2>
            <div className="svc-related-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {related.map((s) => {
                const rt = ar ? s.ar : s.en;
                const href = `${ar ? '/ar' : ''}/services/${s.slug}`;
                return (
                  <a key={s.slug} href={href} style={{
                    display: 'flex', flexDirection: 'column', gap: '0.5rem',
                    padding: '1.5rem', backgroundColor: 'var(--c-bg)',
                    border: '1px solid var(--c-border)', borderRadius: '0.75rem',
                    textDecoration: 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{rt.cardIcon}</span>
                      <strong style={{ fontSize: '1.0625rem', color: 'var(--c-text)' }}>{rt.cardTitle}</strong>
                    </div>
                    <p style={{ color: 'var(--c-muted)', margin: 0, fontSize: '0.9375rem', lineHeight: 1.55 }}>
                      {rt.cardDesc}
                    </p>
                    <span style={{ color: 'var(--c-accent)', fontSize: '0.875rem', fontWeight: 600, marginTop: '0.25rem' }}>
                      {ar ? 'اعرف أكثر ←' : 'Learn more →'}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <style>{`
          @media (min-width: 640px) {
            .svc-areas-grid { grid-template-columns: repeat(4, 1fr) !important; }
            .svc-related-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .svc-cta-btn { width: 100% !important; }
          }
        `}</style>
      </main>
      <Footer lang={lang} />
      <FloatingCTA />
    </>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
