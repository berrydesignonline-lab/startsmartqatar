export interface SanitySlug {
  current: string;
}

export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface Category {
  title: string;
  slug?: SanitySlug;
}

export interface PostBase {
  _id: string;
  title: string;
  titleAr?: string;
  slug: SanitySlug;
  excerpt?: string;
  excerptAr?: string;
  mainImage?: SanityImage;
  publishedAt?: string;
}

export interface PostCard extends PostBase {
  category?: string;
}

export interface PostFull extends PostBase {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  bodyAr?: any[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  category?: Category | string;
}
