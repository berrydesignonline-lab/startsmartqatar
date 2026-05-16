import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { electricalRepairData } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: electricalRepairData.en.metaTitle,
  description: electricalRepairData.en.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/services/electrical-repair`,
    languages: { ar: `${SITE_URL}/ar/services/electrical-repair` },
  },
};

export default function Page() {
  return <ServicePageTemplate data={electricalRepairData} lang="en" />;
}
