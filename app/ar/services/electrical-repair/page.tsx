import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=مرحبا%2C+أحتاج+إصلاح+كهرباء+سيارة`;
const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: 'إصلاح كهرباء السيارة قطر — خدمة متنقلة',
  description: 'إصلاح وتشخيص كهرباء السيارة في موقعك بقطر. دينامو، فيوزات، أسلاك، حساسات. فني يصل في 30 دقيقة. متاح 24/7.',
  alternates: {
    canonical: `${SITE_URL}/ar/services/electrical-repair`,
    languages: { en: `${SITE_URL}/services/electrical-repair` },
  },
};

export default function ElectricalRepairArPage() {
  return (
    <>
      <Navbar />
      <main dir="rtl" lang="ar" style={{ backgroundColor: 'var(--c-bg)', color: 'var(--c-text)', paddingTop: '80px', minHeight: '100vh', fontFamily: 'var(--font-cairo), sans-serif' }}>
        <section style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.5rem 2rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', border: '1px solid rgba(var(--c-accent-rgb),0.35)', borderRadius: '9999px', padding: '0.3rem 0.875rem', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--c-accent)', backgroundColor: 'rgba(var(--c-accent-rgb),0.06)', marginBottom: '1.5rem' }}>
            🔧 خدمة كهرباء متنقلة
          </div>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.2, marginBottom: '1rem' }}>
            إصلاح كهرباء السيارة <span style={{ color: 'var(--c-accent)' }}>قطر</span>
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'var(--c-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
            عندك عطل كهربائي؟ نشخص ونصلح في موقعك. دينامو، فيوزات، أسلاك، حساسات، وأكثر. <strong style={{ color: 'var(--c-text)' }}>نجي عندك في 30 دقيقة.</strong>
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#25D366', color: '#fff', fontWeight: 700, fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '0.625rem', textDecoration: 'none' }}>
            اطلب إصلاح الكهرباء
          </a>
        </section>
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
