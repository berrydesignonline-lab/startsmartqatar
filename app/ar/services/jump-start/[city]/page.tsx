import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CityJumpStartPage from '@/components/templates/CityJumpStartPage';
import { CITIES, getCity } from '@/lib/cities-data';

const SITE_URL = 'https://startsmartqatar.com';

interface Params { params: Promise<{ city: string }>; }

export async function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return {
    title: `تشغيل البطارية (إشتراك) للسيارات في ${city.nameAr} — خدمة طوارئ ٢٤/٧ | ستارت سمارت قطر`,
    description: `خدمة تشغيل بطارية السيارة الطارئة في ${city.nameAr}، قطر. معدات احترافية، وصول سريع في كل مناطق ${city.nameAr}. إذا البطارية معطوبة، يتم استبدالها فوراً في الموقع. ٢٤/٧. تدفع بعد تقديم الخدمة.`,
    alternates: {
      canonical: `${SITE_URL}/ar/services/jump-start/${slug}`,
      languages: {
        en: `${SITE_URL}/services/jump-start/${slug}`,
        'x-default': `${SITE_URL}/services/jump-start/${slug}`,
      },
    },
    openGraph: { url: `${SITE_URL}/ar/services/jump-start/${slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  return <CityJumpStartPage city={city} lang="ar" />;
}
