'use client';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+battery+service`;
const DISPLAY_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
  ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`
  : '+974 0000 0000';

interface WhatsAppCTAProps {
  lang?: 'en' | 'ar';
}

export default function WhatsAppCTA({ lang = 'en' }: WhatsAppCTAProps) {
  const ar = lang === 'ar';

  return (
    <section
      aria-label={ar ? 'تواصل معنا عبر واتساب' : 'Contact us on WhatsApp'}
      dir={ar ? 'rtl' : 'ltr'}
      style={{
        backgroundColor: '#25D366',
        padding: '60px 24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '640px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        {/* Pulsing WhatsApp icon */}
        <div style={{ position: 'relative', display: 'inline-flex' }}>
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: '-8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.25)',
              animation: 'whatsapp-pulse 2s ease-out infinite',
            }}
          />
          <WhatsAppIcon size={48} />
        </div>

        {/* H2 */}
        <h2
          style={{
            fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
            color: '#FFFFFF',
            margin: 0,
            lineHeight: 1.2,
          }}
        >
          {ar ? 'بطاريتك وقفت؟ لا تنتظر.' : "Battery Dead? Don't Wait."}
        </h2>

        {/* Subtext */}
        <p
          style={{
            fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif',
            fontWeight: 400,
            fontSize: '1.0625rem',
            color: 'rgba(255,255,255,0.88)',
            margin: 0,
            lineHeight: 1.6,
          }}
          lang={ar ? 'ar' : 'en'}
        >
          {ar
            ? 'تكلم معنا الحين — نرد في دقائق ونوصل في 10 دقائق'
            : 'Chat with us now — we respond in minutes, arrive in 10.'}
        </p>

        {/* Button */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={ar ? 'افتح واتساب | Open WhatsApp' : 'Open WhatsApp | افتح واتساب'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            backgroundColor: '#FFFFFF',
            color: '#25D366',
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 700,
            fontSize: '1.0625rem',
            padding: '0.9375rem 2.5rem',
            borderRadius: '0.625rem',
            textDecoration: 'none',
            minHeight: '56px',
            width: '100%',
            maxWidth: '360px',
            transition: 'transform 0.15s, box-shadow 0.15s',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
          }}
        >
          <WhatsAppIcon size={20} color="#25D366" />
          <span>Open WhatsApp | افتح واتساب</span>
        </a>

        {/* Number + availability */}
        <p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 500,
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.75)',
            margin: 0,
            letterSpacing: '0.01em',
          }}
        >
          {DISPLAY_NUMBER} — Available 24/7
        </p>
      </div>

      <style>{`
        @keyframes whatsapp-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          70%  { transform: scale(1.6); opacity: 0;   }
          100% { transform: scale(1.6); opacity: 0;   }
        }
      `}</style>
    </section>
  );
}

function WhatsAppIcon({ size = 24, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      aria-hidden="true"
      style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
