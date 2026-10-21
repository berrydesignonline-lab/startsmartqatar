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
    title: `Car Electrical Repair ${city.nameEn} — Mobile On-Site Service | StartSmart Qatar`,
    description: `Mobile car electrical repair in ${city.nameEn}, Qatar. Alternator, fuses, wiring, sensors, ECU. Diagnose-first approach. We come to you anywhere in ${city.nameEn}. 24/7. Pay after service.`,
    alternates: {
      canonical: `${SITE_URL}/services/electrical-repair/${slug}`,
      languages: {
        ar: `${SITE_URL}/ar/services/electrical-repair/${slug}`,
        'x-default': `${SITE_URL}/services/electrical-repair/${slug}`,
      },
    },
    openGraph: { url: `${SITE_URL}/services/electrical-repair/${slug}` },
  };
}

export default async function Page({ params }: Params) {
  const { city: slug } = await params;
  const city = getCity(slug);
  if (!city) notFound();
  return <CityElectricalPage city={city} lang="en" />;
}
