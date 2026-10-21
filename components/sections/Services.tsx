'use client';

import Link from 'next/link';
import Script from 'next/script';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+battery+service`;
const TEL_URL = `tel:+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`;

interface Service {
  icon: React.ReactNode;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
  ctaEn: string;
  ctaAr: string;
  slug: string;
  schemaName: string;
  schemaDesc: string;
}

const SERVICES: Service[] = [
  {
    icon: <BatteryIcon />,
    titleEn: 'Battery Replacement',
    titleAr: 'تغيير البطارية',
    descEn: 'We deliver and install the right battery for your car on-site — all brands, all models.',
    descAr: 'نصل إليك ونقوم بتركيب البطارية المناسبة لسيارتك في مكانك',
    ctaEn: 'Learn More →',
    ctaAr: '← اعرف أكثر',
    slug: 'battery-replacement',
    schemaName: 'Car Battery Replacement Qatar',
    schemaDesc: 'On-site car battery delivery and installation service across Qatar. All brands and models.',
  },
  {
    icon: <BoltIcon />,
    titleEn: 'Emergency Jump Start',
    titleAr: 'شحن طوارئ',
    descEn: 'Battery flat? Our team reaches you in 10 minutes — within service areas.',
    descAr: 'بطاريتك فرغت؟ نوصلك في أسرع وقت — داخل كل مناطق الدوحة وكل مناطق قطر',
    ctaEn: 'Learn More →',
    ctaAr: '← اعرف أكثر',
    slug: 'jump-start',
    schemaName: 'Emergency Jump Start Qatar',
    schemaDesc: 'Emergency battery jump start service reaching customers within 10 minutes across Qatar.',
  },
  {
    icon: <WrenchIcon />,
    titleEn: 'Electrical Diagnostics',
    titleAr: 'فحص كهرباء السيارة',
    descEn: 'Alternator, wiring, fuses — full electrical check and repair at your location.',
    descAr: 'دينامو، أسلاك، فيوزات — فحص وإصلاح كامل في مكانك',
    ctaEn: 'Learn More →',
    ctaAr: '← اعرف أكثر',
    slug: 'electrical-repair',
    schemaName: 'Electrical Repair Qatar',
    schemaDesc: 'Full car electrical diagnostics and repair service — alternator, wiring, fuses — at customer location in Qatar.',
  },
];

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Car Battery & Electrical Services Qatar',
  itemListElement: SERVICES.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'Service',
      name: s.schemaName,
      description: s.schemaDesc,
      provider: {
        '@type': 'LocalBusiness',
        name: 'Start Smart Qatar',
        areaServed: 'Qatar',
      },
    },
  })),
};

interface ServicesProps {
  lang?: 'en' | 'ar';
}

export default function Services({ lang = 'en' }: ServicesProps) {
  const ar = lang === 'ar';

  return (
    <>
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <section
        id="services"
        aria-labelledby="services-heading"
        dir={ar ? 'rtl' : 'ltr'}
        style={{
          backgroundColor: '#FFFFFF',
          padding: '80px 24px',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 600,
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#888888',
                marginBottom: '0.75rem',
              }}
            >
              WHAT WE DO | خدماتنا
            </p>

            <h2
              id="services-heading"
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                lineHeight: 1.2,
                color: '#111111',
                margin: '0 0 0.5rem',
              }}
            >
              {ar
                ? 'كل ما تحتاجه سيارتك — في مكانك'
                : <>Everything Your Car Needs — <span style={{ color: 'var(--c-accent)' }}>At Your Location</span></>
              }
            </h2>

            {/* Hidden SEO keywords */}
            <p style={{ display: 'none' }}>
              car battery Qatar, electrical repair Qatar, battery replacement Qatar
            </p>

            <p
              style={{
                fontFamily: 'var(--font-cairo), var(--font-inter), sans-serif',
                fontWeight: 400,
                fontSize: '1rem',
                color: '#888888',
                margin: '0.5rem 0 0',
              }}
              lang="ar"
              dir="rtl"
            >
              خدمات متنقلة في كل أرجاء قطر — بدون انتظار
            </p>
          </div>

          {/* Cards grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.titleEn}
                service={service}
                ar={ar}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ service, ar }: { service: Service; ar: boolean }) {
  return (
    <article
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E5E5',
        borderRadius: '0.75rem',
        padding: '1.75rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--c-accent)';
        el.style.boxShadow = '0 8px 32px rgba(var(--c-accent-rgb),0.12)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = '#E5E5E5';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Icon */}
      <div
        aria-hidden="true"
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: 'var(--c-accent)',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-inter), sans-serif',
          fontWeight: 700,
          fontSize: '1.125rem',
          color: '#111111',
          margin: 0,
          lineHeight: 1.3,
        }}
      >
        {ar ? service.titleAr : service.titleEn}
        {/* Hidden EN title for SEO when in AR mode */}
        {ar && (
          <span style={{ display: 'none' }}>{service.titleEn}</span>
        )}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
          fontWeight: 400,
          fontSize: '0.9375rem',
          color: '#555555',
          margin: 0,
          lineHeight: 1.65,
          flexGrow: 1,
        }}
        lang={ar ? 'ar' : 'en'}
      >
        {ar ? service.descAr : service.descEn}
      </p>

      {/* CTA */}
      <Link
        href={ar ? `/ar/services/${service.slug}` : `/services/${service.slug}`}
        aria-label={`${ar ? service.ctaAr : service.ctaEn} — ${ar ? service.titleAr : service.titleEn}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          fontFamily: 'var(--font-inter), sans-serif',
          fontWeight: 700,
          fontSize: '0.9375rem',
          color: '#111111',
          textDecoration: 'none',
          borderBottom: '2px solid var(--c-accent)',
          paddingBottom: '1px',
          width: 'fit-content',
          transition: 'color 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#888888')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#111111')}
      >
        {ar ? service.ctaAr : service.ctaEn}
      </Link>
    </article>
  );
}

/* ── Icons ─────────────────────────────────────────────── */

function BatteryIcon() {
  return (
    <svg width="26" height="16" viewBox="0 0 26 16" fill="none" aria-hidden="true">
      <rect x="0.75" y="0.75" width="22.5" height="14.5" rx="2.25" stroke="#FFFFFF" strokeWidth="1.5" />
      <rect x="23.5" y="5.5" width="2.25" height="5" rx="1" fill="#FFFFFF" />
      <path d="M14.5 2L9 9h4L11 14 17 7h-4l1.5-5Z" fill="#FFFFFF" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="22" height="26" viewBox="0 0 22 26" fill="none" aria-hidden="true">
      <path
        d="M13 1L1 15h8.5L7 25 21 11h-9L13 1Z"
        fill="#FFFFFF"
        stroke="#FFFFFF"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.77z"
        stroke="#FFFFFF"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
