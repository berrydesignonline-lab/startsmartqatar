import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+battery+replacement`;
const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: 'Car Battery Replacement Qatar — We Come to You in 30 Min',
  description: 'On-site car battery replacement anywhere in Qatar. Certified technician arrives in 30 minutes. All car brands. Pay after service. Call 24/7.',
  alternates: {
    canonical: `${SITE_URL}/services/battery-replacement`,
    languages: { ar: `${SITE_URL}/ar/services/battery-replacement` },
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Car Battery Replacement Qatar',
  description: 'On-site car battery replacement anywhere in Qatar in 30 minutes. Available 24/7.',
  provider: { '@type': 'LocalBusiness', name: 'StartSmart Qatar', url: SITE_URL },
  areaServed: { '@type': 'Country', name: 'Qatar' },
  url: `${SITE_URL}/services/battery-replacement`,
};

export default function BatteryReplacementPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)', paddingTop: '80px', minHeight: '100vh' }}>
        {/* Hero */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', border: '1px solid rgba(var(--c-accent-rgb),0.35)', borderRadius: '9999px', padding: '0.3rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-accent)', backgroundColor: 'rgba(var(--c-accent-rgb),0.06)', marginBottom: '1.5rem' }}>
            ⚡ Available 24/7 across Qatar
          </div>
          <h1 style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Car Battery Replacement <span style={{ color: 'var(--c-accent)' }}>Qatar</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--c-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Dead battery? Our certified technician arrives at your location — home, office, or roadside — in <strong style={{ color: 'var(--c-text)' }}>30 minutes or less</strong>. All car brands. Pay after service.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,0.25)' }}
          >
            Order Battery Replacement
          </a>
        </section>

        {/* Why Us */}
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
          <h2 style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 700, fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--c-text)' }}>
            Why Choose <span style={{ color: 'var(--c-accent)' }}>StartSmart</span>?
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              ['⚡', '30-minute arrival', 'We come to you anywhere in Qatar — Doha, Lusail, Al Rayyan, Al Wakrah, Al Khor.'],
              ['🔋', 'All battery brands', 'We carry batteries for all car brands and models. German, Japanese, American, Korean.'],
              ['💳', 'Pay after service', 'You only pay once the job is done and you are satisfied.'],
              ['🔧', 'Full system check', 'Every replacement includes a free charging system inspection.'],
              ['🌙', '24/7 availability', 'Day or night, weekday or weekend — we are always available.'],
            ].map(([icon, title, desc]) => (
              <li key={title as string} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', backgroundColor: 'var(--c-surface)', borderRadius: '0.75rem', border: '1px solid var(--c-border)' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{icon}</span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.25rem', color: 'var(--c-text)' }}>{title}</strong>
                  <span style={{ color: 'var(--c-muted)', fontSize: '0.9375rem' }}>{desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Areas */}
        <section style={{ backgroundColor: 'var(--c-surface)', padding: '3rem 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--c-text)' }}>
              Battery Replacement Coverage — <span style={{ color: 'var(--c-accent)' }}>All Qatar</span>
            </h2>
            <p style={{ color: 'var(--c-muted)', lineHeight: 1.7 }}>
              Doha · Lusail · Al Rayyan · Al Wakrah · Al Khor · Mesaieed · Al Shamal · Dukhan · Industrial Area · The Pearl · West Bay
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
