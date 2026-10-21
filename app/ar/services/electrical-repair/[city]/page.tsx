import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CityElectricalPage from '@/components/templates/CityElectricalPage';
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
    title: `إصلاح كهرباء السيارة في ${city.nameAr} — خدمة متنقلة | ستارت سمارت قطر`,
    description: `إصلاح كهرباء السيارة المتنقلة في ${city.nameAr}، قطر. دينامو، فيوزات، أسلاك، حساسات، ECU. نشخّص أولاً ثم نقوم بالإصلاح. نصل إليك في كل مناطق ${city.nameAr}. ٢٤/٧. تدفع بعد الخدمة.`,
    alternates: {
      canonical: `${SITE_URL}/ar/services/electrical-repair/${slug}`,
      languages: {
        en: `${SITE_URL}/services/electrical-repair/${slug}`,
        'x-default': `${SITE_URL}/services/electrical-repair/${slug}`,
      },
    },
    openGraph: { url: `${SITE_URL}/ar/services/electrical-repair/${slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  return <CityElectricalPage city={city} lang="ar" />;
}
