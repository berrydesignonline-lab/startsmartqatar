import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { batteryReplacementData } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqatar.com';

export const metadata: Metadata = {
  title: batteryReplacementData.ar.metaTitle,
  description: batteryReplacementData.ar.metaDescription,
  keywords: batteryReplacementData.ar.keywords,
  alternates: {
    canonical: `${SITE_URL}/ar/services/battery-replacement`,
    languages: { en: `${SITE_URL}/services/battery-replacement` },
  },
  openGraph: { url: `${SITE_URL}/ar/services/battery-replacement` },
};

export default function Page() {
  return <ServicePageTemplate data={batteryReplacementData} lang="ar" />;
}
