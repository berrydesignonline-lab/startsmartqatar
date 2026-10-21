import type { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { ALL_POSTS_QUERY } from '@/lib/queries';
import type { PostCard } from '@/lib/types';
import BlogCard from '@/components/ui/BlogCard';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

const SITE_URL = 'https://startsmartqatar.com';

export const metadata: Metadata = {
  title: 'Battery & Car Tips — StartSmart Qatar Blog',
  description: 'Expert tips on car batteries, electrical issues, and vehicle care in Qatar.',
  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: { ar: `${SITE_URL}/ar/blog` },
  },
  openGraph: {
    title: 'Battery & Car Tips — StartSmart Qatar Blog',
    description: 'Expert tips on car batteries, electrical issues, and vehicle care in Qatar.',
    url: `${SITE_URL}/blog`,
  },
};

export const revalidate = 60;

export default async function BlogPage() {
  let posts: PostCard[] = [];
  try {
    posts = await client.fetch(ALL_POSTS_QUERY);
  } catch {
    // Dataset not yet created — render empty state
  }

  return (
    <>
    <Navbar />
    <main style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div
        style={{
          backgroundColor: '#111111',
          padding: '60px 24px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#888888',
            marginBottom: '0.75rem',
          }}
        >
          BLOG | المدونة
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
            color: '#FFFFFF',
            margin: '0 0 0.75rem',
            lineHeight: 1.2,
          }}
        >
          Car Battery Tips &amp; Guides —{' '}
          <span style={{ color: 'var(--c-accent)' }}>Qatar</span>
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter), sans-serif',
            fontWeight: 400,
            fontSize: '1rem',
            color: '#888888',
            margin: 0,
          }}
        >
          Expert tips on car batteries, electrical issues, and vehicle care in Qatar.
        </p>
      </div>

      {/* Posts grid */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '60px 24px',
        }}
      >
        {posts.length === 0 ? (
          <p
            style={{
              textAlign: 'center',
              color: '#888888',
              fontFamily: 'var(--font-inter), sans-serif',
              fontSize: '1rem',
            }}
          >
            No posts yet — check back soon.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.75rem',
            }}
          >
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
    <Footer />
    <FloatingCTA />
    </>
  );
}
