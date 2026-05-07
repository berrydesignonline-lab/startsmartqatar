import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=مرحبا%2C+أحتاج+تبديل+بطارية`;
const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: 'تبديل بطارية السيارة قطر — نصل إليك في 30 دقيقة',
  description: 'خدمة تبديل بطارية السيارة في موقعك في قطر. فني متخصص يصل خلال 30 دقيقة. جميع أنواع السيارات. ادفع بعد الخدمة. متاح 24/7.',
  alternates: {
    canonical: `${SITE_URL}/ar/services/battery-replacement`,
    languages: { en: `${SITE_URL}/services/battery-replacement` },
  },
};

export default function BatteryReplacementArPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'تبديل بطارية السيارة قطر',
          description: 'خدمة تبديل بطارية السيارة في موقعك في قطر خلال 30 دقيقة. متاح 24/7.',
          provider: { '@type': 'LocalBusiness', name: 'StartSmart Qatar', url: 'https://startsmartqa.com' },
          areaServed: { '@type': 'Country', name: 'Qatar' },
          url: 'https://startsmartqa.com/ar/services/battery-replacement',
        }) }}
      />
      <main dir="rtl" lang="ar" style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)', paddingTop: '80px', minHeight: '100vh', fontFamily: 'var(--font-cairo), sans-serif' }}>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', border: '1px solid rgba(var(--c-accent-rgb),0.35)', borderRadius: '9999px', padding: '0.3rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-accent)', backgroundColor: 'rgba(var(--c-accent-rgb),0.06)', marginBottom: '1.5rem' }}>
            ⚡ متاح 24/7 في كل قطر
          </div>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2, marginBottom: '1rem' }}>
            تبديل بطارية السيارة <span style={{ color: 'var(--c-accent)' }}>قطر</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--c-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
            بطاريتك وقفت؟ فنينا يجي عندك في البيت أو الشغل أو الطريق خلال <strong style={{ color: 'var(--c-text)' }}>30 دقيقة</strong>. جميع أنواع السيارات. ادفع بعد الخدمة.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '0.625rem', textDecoration: 'none' }}>
            اطلب تبديل البطارية الآن
          </a>
        </section>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.75rem', marginBottom: '1.5rem' }}>
            ليش تختار <span style={{ color: 'var(--c-accent)' }}>ستارت سمارت</span>؟
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              ['⚡', 'نصل في 30 دقيقة', 'نجي عندك في أي مكان في قطر — الدوحة، لوسيل، الريان، الوكرة، الخور.'],
              ['🔋', 'جميع أنواع البطاريات', 'عندنا بطاريات لجميع أنواع وموديلات السيارات.'],
              ['💳', 'الدفع بعد الخدمة', 'تدفع بس لما تكون راضي عن الخدمة.'],
              ['🔧', 'فحص شامل مجاني', 'كل تبديل بطارية يشمل فحص نظام الشحن بالمجان.'],
            ].map(([icon, title, desc]) => (
              <li key={title as string} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', backgroundColor: 'var(--c-surface)', borderRadius: '0.75rem', border: '1px solid var(--c-border)' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem' }}>{title}</strong>
                  <span style={{ color: 'var(--c-muted)', fontSize: '0.9375rem' }}>{desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
