import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { batteryReplacementData } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: batteryReplacementData.en.metaTitle,
  description: batteryReplacementData.en.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/services/battery-replacement`,
    languages: { ar: `${SITE_URL}/ar/services/battery-replacement` },
  },
};

export default function Page() {
  return <ServicePageTemplate data={batteryReplacementData} lang="en" />;
}
