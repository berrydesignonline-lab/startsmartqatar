import type { Metadata } from 'next';
import { client } from '@/lib/sanity';
import { ALL_POSTS_QUERY } from '@/lib/queries';
import type { PostCard } from '@/lib/types';
import BlogCard from '@/components/ui/BlogCard';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';

export const metadata: Metadata = {
  title: 'نصائح البطارية والسيارة — مدونة ستارت سمارت قطر',
  description: 'نصائح الخبراء حول بطاريات السيارات والمشاكل الكهربائية وصيانة المركبات في قطر.',
  openGraph: {
    title: 'نصائح البطارية والسيارة — مدونة ستارت سمارت قطر',
    description: 'نصائح الخبراء حول بطاريات السيارات والمشاكل الكهربائية وصيانة المركبات في قطر.',
    url: 'https://startsmartqatar.com/ar/blog',
  },
  alternates: {
    canonical: 'https://startsmartqatar.com/ar/blog',
    languages: { en: 'https://startsmartqatar.com/blog' },
  },
};

export const revalidate = 60;

export default async function ArBlogPage() {
  let posts: PostCard[] = [];
  try {
    posts = await client.fetch(ALL_POSTS_QUERY);
  } catch {
    // Dataset not reachable — render empty state
  }

  return (
    <>
      <Navbar />
      <main dir="rtl" style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '80px' }}>
        {/* Header */}
        <div style={{ backgroundColor: '#111111', padding: '60px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-cairo), sans-serif', fontWeight: 600, fontSize: '0.875rem', letterSpacing: '0.08em', color: '#888888', marginBottom: '0.75rem' }}>
            المدونة | BLOG
          </p>
          <h1 style={{ fontFamily: 'var(--font-cairo), sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: '#FFFFFF', margin: '0 0 0.75rem', lineHeight: 1.3 }}>
            نصائح وأدلة بطاريات السيارات —{' '}
            <span style={{ color: 'var(--c-accent)' }}>قطر</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-cairo), sans-serif', fontWeight: 400, fontSize: '1rem', color: '#888888', margin: 0 }}>
            نصائح الخبراء حول بطاريات السيارات، المشاكل الكهربائية، وصيانة المركبات في قطر.
          </p>
        </div>

        {/* Posts grid */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px' }}>
          {posts.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888888', fontFamily: 'var(--font-cairo), sans-serif', fontSize: '1rem' }}>
              ما عندنا مقالات لحد الحين — تابعنا قريب.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem' }}>
              {posts.map((post) => (
                <BlogCard key={post._id} post={post} lang="ar" />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer lang="ar" />
      <FloatingCTA />
    </>
  );
}
