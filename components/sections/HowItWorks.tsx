'use client';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+battery+service`;

interface Step {
  number: string;
  titleEn: string;
  titleAr: string;
  descEn: string;
  descAr: string;
}

const STEPS: Step[] = [
  {
    number: '01',
    titleEn: 'Contact Us on WhatsApp',
    titleAr: 'تواصل معنا على واتساب',
    descEn: 'Tell us your car model and location. Takes 30 seconds.',
    descAr: 'قولنا نوع سيارتك وموقعك. ما تاخذ إلا 30 ثانية.',
  },
  {
    number: '02',
    titleEn: 'We Come to You',
    titleAr: 'نجي عندك',
    descEn: 'Our team arrives at your location in 10 minutes or less — anywhere in Qatar.',
    descAr: 'فريقنا يوصلك خلال 10 دقائق أو أقل — أي مكان في قطر',
  },
  {
    number: '03',
    titleEn: 'Pay After Service',
    titleAr: 'تدفع بعد الخدمة',
    descEn: 'Job done, car running. Pay by cash or card only after we finish.',
    descAr: 'الشغل خلص، السيارة اشتغلت. ادفع كاش أو بطاقة بعد الانتهاء فقط.',
  },
];

interface HowItWorksProps {
  lang?: 'en' | 'ar';
}

export default function HowItWorks({ lang = 'en' }: HowItWorksProps) {
  const ar = lang === 'ar';

  return (
    <section
      id="how"
      aria-labelledby="how-heading"
      dir={ar ? 'rtl' : 'ltr'}
      style={{
        backgroundColor: '#111111',
        padding: '80px 24px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#AAAAAA',
              marginBottom: '0.75rem',
            }}
          >
            HOW IT WORKS | كيف يعمل
          </p>
          <h2
            id="how-heading"
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              color: '#FFFFFF',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {ar ? (
              <>٣ خطوات. <span style={{ color: 'var(--c-accent)' }}>بدون تعقيد.</span></>
            ) : (
              <>3 Steps. <span style={{ color: 'var(--c-accent)' }}>No Hassle.</span></>
            )}
          </h2>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Desktop connector line — sits behind the step cards */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '28px',
              left: 'calc(16.67% + 12px)',
              right: 'calc(16.67% + 12px)',
              height: '2px',
              backgroundImage: 'repeating-linear-gradient(to right, var(--c-accent) 0, var(--c-accent) 10px, transparent 10px, transparent 20px)',
              display: 'none', // shown via media query below
            }}
            className="connector-line"
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2.5rem',
            }}
          >
            {STEPS.map((step, i) => (
              <StepCard key={step.number} step={step} ar={ar} isLast={i === STEPS.length - 1} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Start now — order battery service on WhatsApp | ابدأ دلوقتي"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              backgroundColor: '#25D366',
              color: '#FFFFFF',
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 700,
              fontSize: '1.0625rem',
              padding: '0.9375rem 2.5rem',
              borderRadius: '0.625rem',
              textDecoration: 'none',
              minHeight: '56px',
              transition: 'background-color 0.15s, transform 0.1s',
              boxShadow: '0 4px 24px rgba(37,211,102,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1ebe5d';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#25D366';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <WhatsAppIcon />
            <span>ابدأ دلوقتي | Start Now</span>
          </a>
        </div>
      </div>

      {/* Show connector line on desktop */}
      <style>{`
        @media (min-width: 860px) {
          .connector-line { display: block !important; }
        }
      `}</style>
    </section>
  );
}

function StepCard({ step, ar, isLast }: { step: Step; ar: boolean; isLast: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1rem',
        position: 'relative',
      }}
    >
      {/* Number circle */}
      <div
        aria-hidden="true"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          border: '2px solid var(--c-accent)',
          backgroundColor: 'var(--c-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 800,
            fontSize: '1.125rem',
            color: '#FFFFFF',
            lineHeight: 1,
          }}
        >
          {step.number}
        </span>
      </div>

      {/* Mobile vertical connector (between steps, not after last) */}
      {!isLast && (
        <div
          aria-hidden="true"
          style={{
            width: '2px',
            height: '32px',
            backgroundImage: 'repeating-linear-gradient(to bottom, var(--c-accent) 0, var(--c-accent) 6px, transparent 6px, transparent 12px)',
          }}
          className="mobile-connector"
        />
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <h3
          style={{
            fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
            fontWeight: 700,
            fontSize: '1.125rem',
            color: '#FFFFFF',
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {ar ? step.titleAr : step.titleEn}
        </h3>

        <p
          style={{
            fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
            fontWeight: 400,
            fontSize: '0.9375rem',
            color: '#BBBBBB',
            margin: 0,
            lineHeight: 1.65,
          }}
          lang={ar ? 'ar' : 'en'}
        >
          {ar ? step.descAr : step.descEn}
        </p>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
