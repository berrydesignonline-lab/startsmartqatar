import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+a+jump+start`;
const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: 'Emergency Jump Start Service Qatar — 30 Min Response',
  description: '24/7 emergency jump start service anywhere in Qatar. Technician arrives in 30 minutes. All car types. Pay after service.',
  alternates: {
    canonical: `${SITE_URL}/services/jump-start`,
    languages: { ar: `${SITE_URL}/ar/services/jump-start` },
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Emergency Jump Start Service Qatar',
  description: '24/7 emergency jump start service anywhere in Qatar in 30 minutes.',
  provider: { '@type': 'LocalBusiness', name: 'StartSmart Qatar', url: SITE_URL },
  areaServed: { '@type': 'Country', name: 'Qatar' },
  url: `${SITE_URL}/services/jump-start`,
};

export default function JumpStartPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <main style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)', paddingTop: '80px', minHeight: '100vh' }}>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', border: '1px solid rgba(var(--c-accent-rgb),0.35)', borderRadius: '9999px', padding: '0.3rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-accent)', backgroundColor: 'rgba(var(--c-accent-rgb),0.06)', marginBottom: '1.5rem' }}>
            ⚡ 24/7 Emergency Service
          </div>
          <h1 style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Jump Start Service <span style={{ color: 'var(--c-accent)' }}>Qatar</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--c-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Car won&apos;t start? Our technician comes to you in <strong style={{ color: 'var(--c-text)' }}>30 minutes</strong> with professional jump start equipment. If the battery is dead, we replace it on the spot.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,0.25)' }}
          >
            Request Jump Start Now
          </a>
        </section>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--c-text)' }}>
            How It <span style={{ color: 'var(--c-accent)' }}>Works</span>
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              ['1️⃣', 'Contact us on WhatsApp', 'Send your location on WhatsApp — takes 30 seconds.'],
              ['2️⃣', 'Technician dispatched', 'We dispatch the nearest technician immediately.'],
              ['3️⃣', 'Arrive in 30 minutes', 'Your car is running again — or we replace the battery on the spot.'],
              ['4️⃣', 'Pay after service', 'Only pay once you are satisfied with the service.'],
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
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
