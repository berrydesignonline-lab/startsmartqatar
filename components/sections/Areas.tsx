'use client';

const AREAS = [
  'West Bay',
  'The Pearl',
  'Al Rayyan',
  'Lusail',
  'Madinat Khalifa',
  'Al Wakra',
  'Al Duhail',
  'Al Khor',
  'Muaither',
  'Old Airport',
  'Industrial Area',
  'All Other Areas ✓',
];

const AREAS_AR = [
  'ويست باي',
  'اللؤلؤة',
  'الريان',
  'لوسيل',
  'مدينة خليفة',
  'الوكرة',
  'الدحيل',
  'الخور',
  'مويثر',
  'المطار القديم',
  'المنطقة الصناعية',
  'كل المناطق الأخرى ✓',
];

interface AreasProps {
  lang?: 'en' | 'ar';
}

export default function Areas({ lang = 'en' }: AreasProps) {
  const ar = lang === 'ar';
  const areas = ar ? AREAS_AR : AREAS;
  const mapsUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED;

  return (
    <section
      id="areas"
      aria-labelledby="areas-heading"
      dir={ar ? 'rtl' : 'ltr'}
      style={{
        backgroundColor: '#FFFFFF',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

        {/* Header */}
        <div style={{ textAlign: 'center' }}>
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
            COVERAGE | التغطية
          </p>

          <h2
            id="areas-heading"
            style={{
              fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              color: '#111111',
              margin: '0 0 0.75rem',
              lineHeight: 1.2,
            }}
          >
            {ar ? (
              <>نغطي <span style={{ color: '#FFD600' }}>كل قطر</span></>
            ) : (
              <>We Cover <span style={{ color: '#FFD600' }}>All of Qatar</span></>
            )}
          </h2>

          <p
            style={{
              fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
              fontWeight: 400,
              fontSize: '1rem',
              color: '#888888',
              margin: 0,
              lineHeight: 1.65,
            }}
          >
            {ar
              ? 'من ويست باي إلى الوكرة — إذا كنت في قطر، نجي عندك.'
              : 'From West Bay to Al Wakra — if you\'re in Qatar, we come to you.'}
          </p>
        </div>

        {/* Areas grid */}
        <div
          aria-label={ar ? 'المناطق المشمولة بالخدمة' : 'Service coverage areas'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.625rem',
          }}
          className="areas-grid"
        >
          {areas.map((area, i) => (
            <AreaChip key={AREAS[i]} label={area} isLast={i === areas.length - 1} />
          ))}
        </div>

        {/* Hidden EN area names for SEO when in AR mode */}
        {ar && (
          <div style={{ display: 'none' }} aria-hidden="true">
            {AREAS.join(', ')}
          </div>
        )}

        {/* Google Maps embed */}
        <figure style={{ margin: 0 }}>
          {mapsUrl ? (
            <iframe
              src={mapsUrl}
              width="100%"
              height="400"
              style={{
                border: 'none',
                borderRadius: '0.75rem',
                display: 'block',
                width: '100%',
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google Maps showing StartSmart service areas in Qatar"
              title="StartSmart Qatar service coverage map"
            />
          ) : (
            /* Placeholder when env var not set */
            <div
              aria-label="Google Maps showing StartSmart service areas in Qatar"
              style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#F5F5F5',
                borderRadius: '0.75rem',
                border: '2px dashed #E5E5E5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                color: '#888888',
                fontFamily: 'var(--font-inter), sans-serif',
                fontSize: '0.875rem',
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#FFD600"/>
              </svg>
              <span>Map embed — set NEXT_PUBLIC_GOOGLE_MAPS_EMBED in .env.local</span>
            </div>
          )}
          <figcaption
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '0.8125rem',
              color: '#888888',
              textAlign: 'center',
              marginTop: '0.75rem',
            }}
          >
            {ar
              ? 'تغطي StartSmart جميع المناطق الموضحة على الخريطة'
              : 'StartSmart covers all areas shown on the map'}
          </figcaption>
        </figure>
      </div>

      {/* 4-col grid on desktop */}
      <style>{`
        @media (min-width: 640px) {
          .areas-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
        @media (max-width: 639px) {
          iframe[title*="StartSmart"] { height: 280px !important; }
          div[aria-label*="Map embed"] { height: 280px !important; }
        }
      `}</style>
    </section>
  );
}

function AreaChip({ label, isLast }: { label: string; isLast: boolean }) {
  return (
    <div
      role="listitem"
      style={{
        border: '1px solid #E5E5E5',
        borderRadius: '9999px',
        padding: '0.5rem 1rem',
        textAlign: 'center',
        fontFamily: 'var(--font-inter), sans-serif',
        fontWeight: 500,
        fontSize: '0.875rem',
        color: '#111111',
        cursor: 'default',
        transition: 'background-color 0.15s, border-color 0.15s',
        backgroundColor: isLast ? 'rgba(255,214,0,0.08)' : '#FFFFFF',
        borderColor: isLast ? '#FFD600' : '#E5E5E5',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#FFD600';
        e.currentTarget.style.borderColor = '#FFD600';
        e.currentTarget.style.color = '#111111';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = isLast ? 'rgba(255,214,0,0.08)' : '#FFFFFF';
        e.currentTarget.style.borderColor = isLast ? '#FFD600' : '#E5E5E5';
        e.currentTarget.style.color = '#111111';
      }}
    >
      {label}
    </div>
  );
}
