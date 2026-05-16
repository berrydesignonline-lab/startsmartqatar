import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import Services from '@/components/sections/Services';
import HowItWorks from '@/components/sections/HowItWorks';
import Areas from '@/components/sections/Areas';
import WhatsAppCTA from '@/components/sections/WhatsAppCTA';
import Testimonials from '@/components/sections/Testimonials';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

export const metadata: Metadata = {
  title: 'ستارت سمارت قطر — توصيل وتركيب بطاريات السيارات في قطر',
  description: 'خدمة توصيل وتركيب بطاريات السيارات في قطر. نصل إليك في أي مكان خلال 30 دقيقة. تغطي الخدمة الدوحة، الريان، لوسيل والمناطق المجاورة.',
  alternates: { canonical: 'https://startsmartqatar.com/ar' },
};

export default function HomePageAr() {
  return (
    <>
      <Navbar />
      <Hero lang="ar" />
      <StatsBar />
      <Services lang="ar" />
      <HowItWorks lang="ar" />
      <Areas lang="ar" />
      <WhatsAppCTA lang="ar" />
      <Testimonials lang="ar" />
      <ContactForm lang="ar" />
      <Footer lang="ar" />
      <FloatingCTA />
    </>
  );
}
