import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '@/lib/sanity';
import { POST_BY_SLUG_QUERY, ALL_SLUGS_QUERY, LATEST_POSTS_QUERY } from '@/lib/queries';
import type { PostFull, PostCard, Category } from '@/lib/types';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import RelatedCard from '@/components/ui/RelatedCard';

export const revalidate = 60;

/* ── Static params ─────────────────────────────────────── */
export async function generateStaticParams() {
  try {
    const slugs: { slug: string }[] = await client.fetch(ALL_SLUGS_QUERY);
    return slugs.map((s) => ({ slug: s.slug }));
  } catch {
    // Dataset not yet created — return empty array so build doesn't fail
    return [];
  }
}

/* ── Metadata ──────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post: PostFull | null = await client.fetch(POST_BY_SLUG_QUERY, { slug });
  if (!post) return {};

  return {
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    keywords: post.seoKeywords,
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      ...(post.mainImage && {
        images: [{ url: urlFor(post.mainImage).width(1200).height(630).url() }],
      }),
    },
  };
}

/* ── Page ──────────────────────────────────────────────── */
export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const [post, related]: [PostFull | null, PostCard[]] = await Promise.all([
    client.fetch(POST_BY_SLUG_QUERY, { slug }),
    client.fetch(LATEST_POSTS_QUERY),
  ]);

  if (!post) notFound();

  const categoryObj = post.category as Category | undefined;
  const categoryTitle = typeof post.category === 'string' ? post.category : categoryObj?.title;
  const readingTime = estimateReadingTime(post.body);

  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-QA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit('crop').url()
    : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.seoDescription ?? post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'Start Smart Qatar' },
    publisher: {
      '@type': 'Organization',
      name: 'Start Smart Qatar',
      url: 'https://startsmartqatar.com',
    },
    ...(imageUrl && { image: imageUrl }),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://startsmartqatar.com/blog/${slug}` },
  };

  const relatedPosts = related.filter((p) => p._id !== post._id).slice(0, 3);

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '80px' }}>

        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{
            maxWidth: '780px',
            margin: '0 auto',
            padding: '1.25rem 24px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-inter), sans-serif',
            fontSize: '0.8125rem',
            color: '#888888',
            flexWrap: 'wrap',
          }}
        >
          <Link href="/" className="breadcrumb-link">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/blog" className="breadcrumb-link">Blog</Link>
          <span aria-hidden="true">›</span>
          <span style={{ color: '#111111' }}>{post.title}</span>
        </nav>

        {/* Article */}
        <article style={{ maxWidth: '780px', margin: '0 auto', padding: '2rem 24px 4rem' }}>

          {/* Meta row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {categoryTitle && (
              <span
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 600,
                  fontSize: '0.6875rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#111111',
                  backgroundColor: 'var(--c-accent)',
                  borderRadius: '9999px',
                  padding: '0.2rem 0.75rem',
                }}
              >
                {categoryTitle}
              </span>
            )}
            {formattedDate && (
              <time
                dateTime={post.publishedAt}
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#888888' }}
              >
                {formattedDate}
              </time>
            )}
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#888888' }}>
              · {readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-inter), sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              color: '#111111',
              lineHeight: 1.2,
              margin: '0 0 1rem',
            }}
          >
            {post.title}
          </h1>

          {/* Arabic title */}
          {post.titleAr && (
            <p
              lang="ar"
              dir="rtl"
              style={{
                fontFamily: 'var(--font-cairo), sans-serif',
                fontWeight: 600,
                fontSize: '1.25rem',
                color: '#888888',
                margin: '0 0 1.5rem',
                lineHeight: 1.5,
              }}
            >
              {post.titleAr}
            </p>
          )}

          {/* Hero image */}
          {imageUrl && (
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                marginBottom: '2rem',
              }}
            >
              <Image
                src={imageUrl}
                alt={post.mainImage?.alt ?? post.title}
                fill
                priority
                sizes="(max-width: 780px) 100vw, 780px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Body */}
          {post.body && (
            <div className="prose-content">
              <PortableText value={post.body} components={portableTextComponents} />
            </div>
          )}

          {/* Link to Arabic version */}
          {post.titleAr && (
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E5E5E5' }}>
              <Link
                href={`/ar/blog/${slug}`}
                style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '0.9375rem', color: '#888888', textDecoration: 'none' }}
              >
                🇶🇦 اقرأ هذا المقال بالعربية
              </Link>
            </div>
          )}

          {/* WhatsApp CTA */}
          <div
            style={{
              backgroundColor: '#111111',
              borderRadius: '0.75rem',
              padding: '2rem',
              marginTop: '3rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 700,
                fontSize: '1.25rem',
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              Need Battery Help? <span style={{ color: 'var(--c-accent)' }}>We Come to You.</span>
            </p>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hi%2C+I+need+battery+service`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp for battery service"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                fontFamily: 'var(--font-inter), sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                padding: '0.875rem 2rem',
                borderRadius: '0.625rem',
                textDecoration: 'none',
                minHeight: '52px',
              }}
            >
              <WhatsAppIcon />
              <span>Chat Now | تكلم معنا</span>
            </a>
          </div>
        </article>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div
            style={{
              backgroundColor: '#F8F8F8',
              padding: '4rem 24px',
            }}
          >
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-inter), sans-serif',
                  fontWeight: 700,
                  fontSize: '1.375rem',
                  color: '#111111',
                  marginBottom: '1.5rem',
                }}
              >
                More from the Blog
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {relatedPosts.map((p) => (
                  <RelatedCard key={p._id} post={p} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .prose-content { color: #333333; font-family: var(--font-inter), sans-serif; line-height: 1.75; }
        .prose-content p { margin: 0 0 1.25rem; font-size: 1.0625rem; }
        .prose-content h2 { font-size: 1.5rem; font-weight: 700; color: #111111; margin: 2rem 0 0.75rem; }
        .prose-content h3 { font-size: 1.25rem; font-weight: 700; color: #111111; margin: 1.75rem 0 0.625rem; }
        .prose-content ul, .prose-content ol { padding-left: 1.5rem; margin: 0 0 1.25rem; }
        .prose-content li { margin-bottom: 0.375rem; font-size: 1.0625rem; }
        .prose-content strong { font-weight: 700; color: #111111; }
        .prose-content a { color: #111111; text-decoration: underline; text-decoration-color: var(--c-accent); }
        .prose-content blockquote { border-left: 4px solid var(--c-accent); margin: 1.5rem 0; padding: 0.75rem 1.25rem; background: #FAFAFA; color: #555555; font-style: italic; }
        [dir="rtl"] .prose-content ul, [dir="rtl"] .prose-content ol { padding-left: 0; padding-right: 1.5rem; }
        [dir="rtl"] .prose-content blockquote { border-left: none; border-right: 4px solid var(--c-accent); }
        [dir="rtl"] .prose-content { font-family: var(--font-cairo), sans-serif; }
        .breadcrumb-link { color: #888888; text-decoration: none; transition: color 0.15s; }
        .breadcrumb-link:hover { color: var(--c-accent); }
      `}</style>
      <Footer />
      <FloatingCTA />
    </>
  );
}


/* ── Portable text components ──────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const portableTextComponents: any = {
  types: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: ({ value }: { value: any }) => {
      const url = urlFor(value).width(780).url();
      return (
        <figure style={{ margin: '2rem 0' }}>
          <Image
            src={url}
            alt={value.alt ?? ''}
            width={780}
            height={440}
            style={{ width: '100%', height: 'auto', borderRadius: '0.5rem' }}
          />
          {value.caption && (
            <figcaption style={{ textAlign: 'center', color: '#888888', fontSize: '0.875rem', marginTop: '0.5rem' }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

/* ── Helpers ───────────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function estimateReadingTime(body?: any[]): number {
  if (!body) return 1;
  const text = body
    .filter((b) => b._type === 'block')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .flatMap((b) => b.children?.map((c: any) => c.text ?? '') ?? [])
    .join(' ');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
