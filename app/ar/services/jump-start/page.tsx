import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { jumpStartData } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  title: jumpStartData.ar.metaTitle,
  description: jumpStartData.ar.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/ar/services/jump-start`,
    languages: { en: `${SITE_URL}/services/jump-start` },
  },
};

export default function Page() {
  return <ServicePageTemplate data={jumpStartData} lang="ar" />;
}
