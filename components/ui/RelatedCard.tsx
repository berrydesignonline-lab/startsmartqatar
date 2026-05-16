'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { PostCard } from '@/lib/types';
import { urlFor } from '@/lib/sanity';

interface RelatedCardProps {
  post: PostCard;
  lang?: 'en' | 'ar';
}

export default function RelatedCard({ post, lang = 'en' }: RelatedCardProps) {
  const ar = lang === 'ar';
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(400).height(220).fit('crop').url()
    : null;

  const title = ar ? (post.titleAr ?? post.title) : post.title;
  const href = ar ? `/ar/blog/${post.slug.current}` : `/blog/${post.slug.current}`;

  return (
    <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article
        dir={ar ? 'rtl' : 'ltr'}
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid #E5E5E5',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          transition: 'border-color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--c-accent)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#E5E5E5')}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#1A1A1A' }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt ?? post.title}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>⚡</span>
            </div>
          )}
        </div>
        <div style={{ padding: '1rem' }}>
          <h3 style={{ fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif', fontWeight: 600, fontSize: '0.9375rem', color: '#111111', margin: 0, lineHeight: 1.4 }}>
            {title}
          </h3>
        </div>
      </article>
    </Link>
  );
}
