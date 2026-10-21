import dynamic from 'next/dynamic';
import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import Services from '@/components/sections/Services';
import BrandSlider from '@/components/sections/BrandSlider';
import HowItWorks from '@/components/sections/HowItWorks';
import Areas from '@/components/sections/Areas';
import WhatsAppCTA from '@/components/sections/WhatsAppCTA';
import Testimonials from '@/components/sections/Testimonials';
import ContactForm from '@/components/sections/ContactForm';
import Footer from '@/components/ui/Footer';

// Floating sticky button is below the fold + client-only — load after main page renders
const FloatingCTA = dynamic(() => import('@/components/ui/FloatingCTA'));

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
      <BrandSlider />
      <HowItWorks />
      <Areas />
      <WhatsAppCTA />
      <Testimonials />
      <ContactForm />
      <Footer />
      <FloatingCTA />
    </>
  );
}
