import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { electricalRepairData } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqatar.com';

export const metadata: Metadata = {
  title: electricalRepairData.ar.metaTitle,
  description: electricalRepairData.ar.metaDescription,
  keywords: electricalRepairData.ar.keywords,
  alternates: {
    canonical: `${SITE_URL}/ar/services/electrical-repair`,
    languages: { en: `${SITE_URL}/services/electrical-repair` },
  },
  openGraph: { url: `${SITE_URL}/ar/services/electrical-repair` },
};

export default function Page() {
  return <ServicePageTemplate data={electricalRepairData} lang="ar" />;
}
