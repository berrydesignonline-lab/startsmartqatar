import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CityBatteryPage from '@/components/templates/CityBatteryPage';
import { CITIES, getCity } from '@/lib/cities-data';

const SITE_URL = 'https://startsmartqatar.com';

interface Params {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return CITIES.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) return {};
  return {
    title: `تبديل بطارية السيارة ${city.nameAr} — وصول ${city.responseMin} دقيقة | ستارت سمارت قطر`,
    description: `تبديل بطارية السيارة في مكانك بـ${city.nameAr}، قطر. بطاريات إنفنتي، بوش، كيو باور، وإكسايد. فني يصل خلال ${city.responseMin} دقايق داخل مناطق الخدمة. ضمان ١٢ شهر. ادفع بعد الخدمة. ٢٤/٧.`,
    alternates: {
      canonical: `${SITE_URL}/ar/services/battery-replacement/${slug}`,
      languages: {
        en: `${SITE_URL}/services/battery-replacement/${slug}`,
        'x-default': `${SITE_URL}/services/battery-replacement/${slug}`,
      },
    },
    openGraph: { url: `${SITE_URL}/ar/services/battery-replacement/${slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  return <CityBatteryPage city={city} lang="ar" />;
}
