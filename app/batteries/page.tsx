import type { Metadata } from 'next';
import BatteriesHubPage from '@/components/templates/BatteriesHubPage';

const SITE_URL = 'https://startsmartqatar.com';

export const metadata: Metadata = {
  title: 'Car Batteries Qatar — Bosch, Infinity, Q-Power, Exide | StartSmart',
  description: 'Genuine car batteries in Qatar — Bosch, Infinity, Q-Power & Exide. Find the right battery for your car, delivered and fitted on-site in minutes. Warranty. Pay after service. 24/7.',
  keywords: ['car battery Qatar', 'battery brands Qatar', 'Bosch battery Qatar', 'Infinity battery Qatar', 'Q-Power battery Qatar', 'Exide battery Qatar', 'find car battery Qatar'],
  alternates: {
    canonical: `${SITE_URL}/batteries`,
    languages: { ar: `${SITE_URL}/ar/batteries`, 'x-default': `${SITE_URL}/batteries` },
  },
  openGraph: { url: `${SITE_URL}/batteries`, title: 'Car Batteries Qatar — Bosch, Infinity, Q-Power, Exide', description: 'Find the right battery for your car. Delivered & fitted anywhere in Qatar.' },
};

export default function Page() {
  return <BatteriesHubPage lang="en" />;
}
