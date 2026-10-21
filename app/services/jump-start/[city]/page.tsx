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
    title: `Emergency Jump Start ${city.nameEn} — 24/7 Mobile Service | StartSmart Qatar`,
    description: `Emergency jump-start service in ${city.nameEn}, Qatar. Professional equipment, fast arrival across all areas. If the battery is faulty we replace on the spot. 24/7. Pay after service.`,
    alternates: {
      canonical: `${SITE_URL}/services/jump-start/${slug}`,
      languages: {
        ar: `${SITE_URL}/ar/services/jump-start/${slug}`,
        'x-default': `${SITE_URL}/services/jump-start/${slug}`,
      },
    },
    openGraph: { url: `${SITE_URL}/services/jump-start/${slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  return <CityJumpStartPage city={city} lang="en" />;
}
