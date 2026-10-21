import type { Metadata } from 'next';
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

const FloatingCTA = dynamic(() => import('@/components/ui/FloatingCTA'));

export const metadata: Metadata = {
  title: 'ستارت سمارت قطر — بطارية سيارة ميتة؟ نوصلك في ١٠ دقايق | مساعدة على الطريق قطر',
  description: 'بطارية سيارتك ميتة في قطر؟ ستارت سمارت يوصلك ويركب البطارية في مكانك خلال ١٠ دقايق. خدمة مساعدة على الطريق ٢٤/٧ في الدوحة، لوسيل، الريان، الوكرة، والخور. بطاريات إنفنتي، بوش، إكسايد. ادفع بعد الخدمة.',
  keywords: [
    'بطارية سيارة قطر',
    'مساعدة على الطريق قطر',
    'تغيير بطارية سيارة قطر',
    'توصيل بطارية سيارة قطر',
    'بطارية ميتة قطر',
    'استبدال بطارية السيارة الدوحة',
    'خدمة طوارئ سيارة قطر',
    'تشغيل بطارية سيارة قطر',
    'بوستر بطارية قطر',
    'أفضل بطارية سيارة قطر',
    'بطارية إنفنتي قطر',
    'بطارية بوش قطر',
    'بطارية إكسايد قطر',
    'بطارية أماريون قطر',
    'مساعدة سيارة قطر',
    'سيارتي ما تشتغل قطر',
    'إنقاذ سيارة قطر',
    'خدمة متنقلة للسيارة قطر',
    'ستارت سمارت قطر',
  ],
  alternates: {
    canonical: 'https://startsmartqatar.com/ar',
    languages: { en: 'https://startsmartqatar.com' },
  },
  openGraph: {
    url: 'https://startsmartqatar.com/ar',
  },
};

export default function HomePageAr() {
  return (
    <>
      <Navbar />
      <Hero lang="ar" />
      <StatsBar />
      <Services lang="ar" />
      <BrandSlider lang="ar" />
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
