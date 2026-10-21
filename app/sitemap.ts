import type { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';
import { CITIES } from '@/lib/cities-data';
import { BRANDS } from '@/lib/brands-data';

const SITE_URL = 'https://startsmartqatar.com';

// Real content-change date for static pages — update when pages are actually edited
const STATIC_LASTMOD = new Date('2026-06-16');

export const revalidate = 3600;

/**
 * Build an EN + AR pair of sitemap entries, each carrying hreflang alternates
 * (en, ar, x-default) so Google understands the bilingual relationship.
 */
function langPair(
  enPath: string,
  arPath: string,
  lastModified: Date,
): MetadataRoute.Sitemap {
  const languages = {
    en: `${SITE_URL}${enPath}`,
    ar: `${SITE_URL}${arPath}`,
    'x-default': `${SITE_URL}${enPath}`,
  };
  return [
    { url: `${SITE_URL}${enPath}`, lastModified, alternates: { languages } },
    { url: `${SITE_URL}${arPath}`, lastModified, alternates: { languages } },
  ];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let posts: { slug: { current: string }; publishedAt: string }[] = [];
  try {
    posts = await client.fetch(`*[_type == "post"]{ slug, publishedAt }`);
  } catch {
    // Dataset not yet created — skip blog URLs
  }

  // Static + section pages (each as an EN/AR pair)
  const staticPairs: [string, string][] = [
    ['', '/ar'],
    ['/blog', '/ar/blog'],
    ['/batteries', '/ar/batteries'],
    ['/services/battery-replacement', '/ar/services/battery-replacement'],
    ['/services/jump-start', '/ar/services/jump-start'],
    ['/services/electrical-repair', '/ar/services/electrical-repair'],
  ];
  const staticUrls = staticPairs.flatMap(([en, ar]) =>
    langPair(en, ar, STATIC_LASTMOD),
  );

  // Battery brand pages (EN/AR pair per brand)
  const brandUrls = BRANDS.flatMap((b) =>
    langPair(`/batteries/${b.slug}`, `/ar/batteries/${b.slug}`, STATIC_LASTMOD),
  );

  // City service pages (5 cities × 3 services), each as an EN/AR pair
  const services = ['battery-replacement', 'jump-start', 'electrical-repair'];
  const cityUrls = CITIES.flatMap((c) =>
    services.flatMap((svc) =>
      langPair(
        `/services/${svc}/${c.slug}`,
        `/ar/services/${svc}/${c.slug}`,
        STATIC_LASTMOD,
      ),
    ),
  );

  // Blog posts (EN/AR pair per post, using real publish date)
  const blogUrls = posts.flatMap((post) =>
    langPair(
      `/blog/${post.slug.current}`,
      `/ar/blog/${post.slug.current}`,
      post.publishedAt ? new Date(post.publishedAt) : STATIC_LASTMOD,
    ),
  );

  return [...staticUrls, ...brandUrls, ...cityUrls, ...blogUrls];
}
