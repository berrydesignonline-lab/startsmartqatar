import type { Metadata, Viewport } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { ThemeProvider } from '@/lib/theme';
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

const SITE_URL = 'https://startsmartqatar.com';

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
        url: '/opengraph-image',
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
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? '',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#FFD600' },
    { media: '(prefers-color-scheme: light)', color: '#E63030' },
  ],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'StartSmart Battery & Electrical',
  image: `${SITE_URL}/logo.png`,
  '@id': SITE_URL,
  url: SITE_URL,
  telephone: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97400000000'}`,
  description: 'On-demand car battery delivery and electrical repair service in Qatar. Available 24/7. We arrive in 30 minutes.',
  priceRange: 'QAR 150–500',
  currenciesAccepted: 'QAR',
  paymentAccepted: 'Cash, Credit Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Doha',
    addressLocality: 'Doha',
    addressCountry: 'QA',
    addressRegion: 'Ad Dawhah',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 25.2854,
    longitude: 51.531,
  },
  areaServed: [
    { '@type': 'City', name: 'Doha' },
    { '@type': 'City', name: 'Al Rayyan' },
    { '@type': 'City', name: 'Al Wakrah' },
    { '@type': 'City', name: 'Lusail' },
    { '@type': 'City', name: 'Al Khor' },
  ],
  openingHours: 'Mo-Su 00:00-23:59',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Car Battery & Electrical Services Qatar',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Car Battery Replacement Qatar',
          description: 'On-site car battery replacement anywhere in Qatar. We come to you in 30 minutes.',
          url: `${SITE_URL}/services/battery-replacement`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Emergency Jump Start Qatar',
          description: '24/7 emergency jump start service across all Qatar.',
          url: `${SITE_URL}/services/jump-start`,
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Car Electrical Repair Qatar',
          description: 'Mobile car electrical diagnosis and repair in Qatar.',
          url: `${SITE_URL}/services/electrical-repair`,
        },
      },
    ],
  },
  sameAs: [
    `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97400000000'}`,
    // Add real Facebook and Google Business URLs once profiles are live:
    // 'https://www.facebook.com/startsmartqa',
    // 'https://g.co/kgs/YOUR_REAL_ID',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" className={`${inter.variable} ${cairo.variable}`}>
      <head>
        {/* Prevent flash of unstyled theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme')||'dark';document.documentElement.setAttribute('data-theme',t);})();`,
          }}
        />
        {/* LocalBusiness structured data — in <head> for immediate crawlability */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
