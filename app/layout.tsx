import type { Metadata, Viewport } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ThemeProvider } from '@/lib/theme';
import WhatsAppConversionTracker from '@/components/analytics/WhatsAppConversionTracker';
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
    default: 'StartSmart Qatar | Car Battery Delivery Qatar — 10 Min',
    template: '%s | StartSmart Qatar',
  },
  description:
    "Battery dead in Qatar? StartSmart comes to you in 10 minutes. On-demand car battery replacement & electrical repair — 24/7 across Doha, Al Wakrah, Al Khor & all Qatar. Pay after service.",
  keywords: [
    // English — battery
    'car battery Qatar',
    'battery delivery Qatar',
    'car battery replacement Qatar',
    'battery service Doha',
    'emergency battery Qatar',
    'jump start Qatar',
    'jump start service Doha',
    'car electrical repair Qatar',
    'mobile battery service Qatar',
    'battery dead Qatar',
    'battery replacement near me Qatar',
    'roadside assistance Qatar',
    'best car battery Qatar',
    'Infinity battery Qatar',
    'Bosch battery Qatar',
    'Amaron battery Qatar',
    'Exide battery Qatar',
    '24 hour battery service Qatar',
    'StartSmart Qatar',
    // Arabic — battery
    'بطارية سيارة قطر',
    'تغيير بطارية سيارة قطر',
    'استبدال بطارية السيارة قطر',
    'توصيل بطارية سيارة قطر',
    'بطارية ميتة قطر',
    'بطارية ميت قطر',
    'أفضل بطارية سيارة قطر',
    'خدمة بطارية الدوحة',
    'تبديل بطارية قطر',
    'شحن بطارية سيارة قطر',
    'أنواع بطاريات السيارات قطر',
    // Arabic — roadside assistance
    'مساعدة على الطريق قطر',
    'مساعدة على الطريق الدوحة',
    'خدمة طوارئ سيارة قطر',
    'مساعدة سيارة قطر',
    'إنقاذ سيارة قطر',
    'خدمة متنقلة للسيارة قطر',
    // Arabic — jump start
    'تشغيل بطارية سيارة قطر',
    'بوستر بطارية قطر',
    'جمب ستارت قطر',
    'سيارتي ما تشتغل قطر',
    // Arabic — battery brands
    'بطارية إنفنتي قطر',
    'بطارية بوش قطر',
    'بطارية أماريون قطر',
    'بطارية إكسايد قطر',
    'بطارية فارتا قطر',
  ],
  authors: [{ name: 'StartSmart Qatar' }],
  creator: 'StartSmart Qatar',
  publisher: 'StartSmart Qatar',
  category: 'Automotive Services',
  openGraph: {
    type: 'website',
    locale: 'en_QA',
    alternateLocale: 'ar_QA',
    url: SITE_URL,
    siteName: 'StartSmart Qatar',
    title: 'StartSmart | Battery Dead? We Come To You in 10 Min — Qatar',
    description: 'On-demand car battery replacement across Qatar. 10 minutes. 24/7. Pay after service.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'StartSmart Qatar — Car Battery Service Qatar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StartSmart | Battery Dead? We Come in 10 Min — Qatar',
    description: 'On-demand battery replacement & electrical service. 24/7 across Qatar.',
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: '/',
    languages: {
      ar: `${SITE_URL}/ar`,
      'en-QA': SITE_URL,
      'x-default': SITE_URL,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? '',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E05C00',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'StartSmart Qatar',
  alternateName: 'StartSmart Battery Assist',
  image: `${SITE_URL}/logo1.png`,
  logo: `${SITE_URL}/logo1.png`,
  '@id': `${SITE_URL}/#business`,
  url: SITE_URL,
  telephone: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '97400000000'}`,
  description: 'On-demand car battery delivery and electrical repair service in Qatar. Available 24/7. We arrive in 10 minutes.',
  priceRange: 'QAR 150–500',
  currenciesAccepted: 'QAR',
  paymentAccepted: 'Cash, Credit Card',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'QA',
    addressRegion: 'Ad Dawhah',
  },
  areaServed: [
    { '@type': 'City', name: 'Doha' },
    { '@type': 'City', name: 'Al Rayyan' },
    { '@type': 'City', name: 'Al Wakrah' },
    { '@type': 'City', name: 'Lusail' },
    { '@type': 'City', name: 'Al Khor' },
    { '@type': 'AdministrativeArea', name: 'Qatar' },
  ],
  openingHours: 'Mo-Su 00:00-23:59',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Car Battery & Electrical Services Qatar',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Car Battery Replacement Qatar',
          description: 'On-site car battery replacement anywhere in Qatar. We come to you in 10 minutes.',
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
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" className={`${inter.variable} ${cairo.variable}`}>
      <head>
        {/* Google tag (gtag.js) — exact code from Google, immediately after <head> */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18181500536" />
        <script
          dangerouslySetInnerHTML={{ __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-18181500536');
          ` }}
        />
        <link rel="preload" href="/logo1.webp" as="image" type="image/webp" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <WhatsAppConversionTracker />
      </body>
      <GoogleAnalytics gaId="G-X12WLF3MFF" />
    </html>
  );
}
