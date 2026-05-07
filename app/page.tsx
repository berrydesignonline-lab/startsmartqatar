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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <Services />
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
