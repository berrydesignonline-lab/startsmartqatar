import type { Metadata } from 'next';
import ServicePageTemplate from '@/components/templates/ServicePageTemplate';
import { jumpStartData } from '@/lib/services-data';

const SITE_URL = 'https://startsmartqatar.com';

export const metadata: Metadata = {
  title: jumpStartData.en.metaTitle,
  description: jumpStartData.en.metaDescription,
  alternates: {
    canonical: `${SITE_URL}/services/jump-start`,
    languages: { ar: `${SITE_URL}/ar/services/jump-start` },
  },
};

export default function Page() {
  return <ServicePageTemplate data={jumpStartData} lang="en" />;
}
