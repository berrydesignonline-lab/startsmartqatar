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
    title: `Car Battery Replacement ${city.nameEn} — ${city.responseMin} Min On-Site | StartSmart Qatar`,
    description: `On-site car battery replacement in ${city.nameEn}, Qatar. Infinity, Bosch, Q-Power & Exide batteries. ${city.responseMin}-minute arrival within service areas. 12-month warranty. Pay after service. 24/7.`,
    alternates: {
      canonical: `${SITE_URL}/services/battery-replacement/${slug}`,
      languages: {
        ar: `${SITE_URL}/ar/services/battery-replacement/${slug}`,
        'x-default': `${SITE_URL}/services/battery-replacement/${slug}`,
      },
    },
    openGraph: { url: `${SITE_URL}/services/battery-replacement/${slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  return <CityBatteryPage city={city} lang="en" />;
}
