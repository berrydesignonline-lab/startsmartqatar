import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BrandPageTemplate from '@/components/templates/BrandPageTemplate';
import { BRANDS, getBrand } from '@/lib/brands-data';

const SITE_URL = 'https://startsmartqatar.com';

interface Params { params: Promise<{ brand: string }>; }

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  return {
    title: brand.metaTitleAr,
    description: brand.metaDescAr,
    keywords: [`بطارية ${brand.nameAr} قطر`, `بطارية ${brand.nameAr}`, 'بطارية سيارة قطر', 'توصيل بطارية قطر'],
    alternates: {
      canonical: `${SITE_URL}/ar/batteries/${slug}`,
      languages: { en: `${SITE_URL}/batteries/${slug}`, 'x-default': `${SITE_URL}/batteries/${slug}` },
    },
    openGraph: { url: `${SITE_URL}/ar/batteries/${slug}`, title: brand.metaTitleAr, description: brand.metaDescAr, images: [{ url: brand.logo }] },
  };
}

export default async function Page({ params }: Params) {
  const { brand: slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();
  return <BrandPageTemplate brand={brand} lang="ar" />;
}
