import type { Metadata, Viewport } from 'next';
import { Inter, Cairo } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const SITE_URL = 'https://startsmartqa.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'StartSmart | Car Battery Delivery & Electrical Service Qatar',
    template: '%s | StartSmart Qatar',
  },
  description:
    "Qatar's fastest on-demand car battery replacement & electrical service. Delivered to your location in 30 minutes. Available 24/7. Pay after service.",
  keywords: [
    'battery delivery Qatar',
    'car battery replacement Qatar',
    'battery service Doha',
    'emergency battery Qatar',
    'jump start service Qatar',
    'car electrical repair Qatar',
    'بطارية سيارة قطر',
    'تغيير بطارية قطر',
    '24 hour battery service Doha',
  ],
  authors: [{ name: 'StartSmart Qatar' }],
  openGraph: {
    type: 'website',
    locale: 'en_QA',
    url: SITE_URL,
    siteName: 'StartSmart Qatar',
    title: 'StartSmart — Battery & Electrical Qatar',
    description: 'Car battery dead? We come to you in 30 min. 24/7 across Qatar.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'StartSmart Battery Service Qatar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StartSmart — Battery Qatar',
    description: 'On-demand battery & electrical service. 30 min. 24/7.',
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      ar: `${SITE_URL}/ar`,
      en: SITE_URL,
    },
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFD600',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'StartSmart Battery & Electrical',
  image: `${SITE_URL}/logo.png`,
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97400000000'}`,
  description:
    'On-demand car battery delivery and electrical repair service in Qatar. Available 24/7.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'QA',
    addressRegion: 'Doha',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.2854,
    longitude: 51.531,
  },
  areaServed: {
    '@type': 'Country',
    name: 'Qatar',
  },
  openingHours: 'Mo-Su 00:00-23:59',
  priceRange: 'QAR',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Car Battery & Electrical Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Battery Replacement Qatar' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Emergency Jump Start Qatar' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Car Electrical Repair Qatar' },
      },
    ],
  },
  sameAs: [
    `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97400000000'}`,
    'https://www.facebook.com/startsmartqa',
    'https://g.co/kgs/startsmartqa',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${cairo.variable}`}>
      <body>
        {children}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
