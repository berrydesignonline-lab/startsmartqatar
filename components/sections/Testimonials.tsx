interface TestimonialsProps {
  lang?: 'en' | 'ar';
}

interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  profilePhotoUrl: string;
}

interface ReviewsResponse {
  reviews: GoogleReview[];
  totalRating: number;
  totalReviews: number;
}

async function fetchReviews(): Promise<ReviewsResponse> {
  const empty: ReviewsResponse = { reviews: [], totalRating: 0, totalReviews: 0 };
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://startsmartqatar.com';
    const res = await fetch(`${baseUrl}/api/reviews`, { next: { revalidate: 3600 } });
    if (!res.ok) return empty;
    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) return empty;
    return await res.json();
  } catch {
    return empty;
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div aria-label={`${rating} out of 5 stars`} style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? 'var(--c-accent)' : 'var(--c-border)', fontSize: '1rem' }}>★</span>
      ))}
    </div>
  );
}

export default async function Testimonials({ lang = 'en' }: TestimonialsProps) {
  const ar = lang === 'ar';
  const { reviews, totalRating, totalReviews } = await fetchReviews();
  const reviewUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ?? 'https://g.co/kgs/startsmartqa';

  return (
    <section
      id="reviews"
      dir={ar ? 'rtl' : 'ltr'}
      style={{ backgroundColor: 'var(--c-bg)', padding: '5rem 1.25rem', borderTop: '1px solid var(--c-border)' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: ar ? 'var(--font-cairo), sans-serif' : 'var(--font-inter), sans-serif', fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'var(--c-text)', marginBottom: '0.75rem' }}>
            {ar ? (
              <><span style={{ color: 'var(--c-accent)' }}>آراء</span> عملاءنا على Google</>
            ) : (
              <>What Clients Say on <span style={{ color: 'var(--c-accent)' }}>Google</span></>
            )}
          </h2>
          {totalReviews > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--c-text)' }}>{totalRating.toFixed(1)}</span>
              <StarRating rating={Math.round(totalRating)} />
              <span style={{ color: 'var(--c-muted)', fontSize: '0.9375rem' }}>
                {ar ? `${totalReviews} تقييم على Google` : `${totalReviews} reviews on Google`}
              </span>
            </div>
          )}
        </div>

        {/* Reviews grid or empty state */}
        {reviews.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
            {reviews.map((review, i) => (
              <article key={i} style={{ backgroundColor: 'var(--c-surface)', border: '1px solid var(--c-border)', borderRadius: '0.875rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {review.profilePhotoUrl ? (
                    <img src={review.profilePhotoUrl} alt={review.authorName} width={40} height={40} style={{ borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--c-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-accent)', fontWeight: 700, fontSize: '1rem' }}>
                      {review.authorName[0]}
                    </div>
                  )}
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--c-text)', fontSize: '0.9375rem' }}>{review.authorName}</div>
                    <div style={{ color: 'var(--c-muted)', fontSize: '0.8125rem' }}>{review.relativeTimeDescription}</div>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                <p style={{ color: 'var(--c-muted)', fontSize: '0.9375rem', lineHeight: 1.6, margin: 0 }}>
                  &ldquo;{review.text}&rdquo;
                </p>
              </article>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', backgroundColor: 'var(--c-surface)', borderRadius: '1rem', border: '1px dashed var(--c-border)', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
            <p style={{ color: 'var(--c-text)', fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.5rem' }}>
              {ar ? 'كن أول من يقيّمنا على Google' : 'Be the first to review us on Google'}
            </p>
            <p style={{ color: 'var(--c-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
              {ar ? 'جرّبت خدمتنا؟ رأيك يساعدنا ويساعد عملاء ثانيين.' : 'Used our service? Your review helps others find us.'}
            </p>
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--c-accent)', color: '#111111', fontWeight: 700, fontSize: '0.9375rem', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none' }}
            >
              {ar ? 'اكتب تقييم على Google' : 'Leave a Google Review'}
            </a>
          </div>
        )}

        {reviews.length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <a
              href={reviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '2px solid var(--c-accent)', color: 'var(--c-accent)', fontWeight: 600, fontSize: '0.9375rem', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', textDecoration: 'none' }}
            >
              {ar ? '← اقرأ كل التقييمات على Google' : 'Read all reviews on Google →'}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
