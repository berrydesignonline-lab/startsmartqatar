'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { PostCard } from '@/lib/types';
import { urlFor } from '@/lib/sanity';

export default function BlogCard({ post }: { post: PostCard }) {
  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(600).height(340).fit('crop').url()
    : null;

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-QA', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : null;

  return (
    <Link href={`/blog/${post.slug.current}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column' }}>
      <article
        style={{
          border: '1px solid #E5E5E5',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#FFD600';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,214,0,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#E5E5E5';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundColor: '#F5F5F5' }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.mainImage?.alt ?? post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              loading="lazy"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: '#1A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '2rem' }}>⚡</span>
            </div>
          )}
        </div>

        <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.625rem', flexGrow: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {post.category && (
              <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 600, fontSize: '0.6875rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: '#111111', backgroundColor: '#FFD600', borderRadius: '9999px', padding: '0.2rem 0.625rem' }}>
                {post.category}
              </span>
            )}
            {formattedDate && (
              <time dateTime={post.publishedAt} style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.8125rem', color: '#888888' }}>
                {formattedDate}
              </time>
            )}
          </div>

          <h2 style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 700, fontSize: '1.0625rem', color: '#111111', margin: 0, lineHeight: 1.4 }}>
            {post.title}
          </h2>

          {post.excerpt && (
            <p style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 400, fontSize: '0.9375rem', color: '#555555', margin: 0, lineHeight: 1.65, flexGrow: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {post.excerpt}
            </p>
          )}

          <span style={{ fontFamily: 'var(--font-inter), sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#111111', borderBottom: '2px solid #FFD600', paddingBottom: '1px', width: 'fit-content', marginTop: '0.25rem' }}>
            Read more →
          </span>
        </div>
      </article>
    </Link>
  );
}
