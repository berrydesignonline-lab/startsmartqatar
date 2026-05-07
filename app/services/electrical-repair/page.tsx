import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+electrical+repair`;
const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: 'Mobile Car Electrical Repair Qatar — On-Site Diagnosis',
  description: 'Mobile car electrical repair and diagnosis anywhere in Qatar. Alternator, fuses, wiring, sensors. Technician arrives in 30 minutes. 24/7.',
  alternates: {
    canonical: `${SITE_URL}/services/electrical-repair`,
    languages: { ar: `${SITE_URL}/ar/services/electrical-repair` },
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Mobile Car Electrical Repair Qatar',
  description: 'On-site car electrical diagnosis and repair in Qatar. Alternator, fuses, wiring, sensors.',
  provider: { '@type': 'LocalBusiness', name: 'StartSmart Qatar', url: SITE_URL },
  areaServed: { '@type': 'Country', name: 'Qatar' },
  url: `${SITE_URL}/services/electrical-repair`,
};

export default function ElectricalRepairPage() {
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
            🔧 Mobile Electrical Service
          </div>
          <h1 style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
            Car Electrical Repair <span style={{ color: 'var(--c-accent)' }}>Qatar</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--c-muted)', marginBottom: '2rem', lineHeight: 1.7 }}>
            Electrical fault? Warning light on? We diagnose and repair on-site. Alternator, fuses, wiring, sensors, and more. <strong style={{ color: 'var(--c-text)' }}>We come to you in 30 minutes.</strong>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '0.625rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(37,211,102,0.25)' }}
          >
            Request Electrical Repair
          </a>
        </section>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem 4rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--c-text)' }}>
            What We <span style={{ color: 'var(--c-accent)' }}>Fix</span>
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
            {['Alternator failure', 'Dead battery', 'Blown fuses', 'Faulty wiring', 'Warning lights', 'Starter motor', 'Sensors & ECU', 'AC electrical faults'].map((item) => (
              <li key={item} style={{ padding: '0.875rem 1rem', backgroundColor: 'var(--c-surface)', borderRadius: '0.625rem', border: '1px solid var(--c-border)', color: 'var(--c-text)', fontSize: '0.9375rem' }}>
                ✓ {item}
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
