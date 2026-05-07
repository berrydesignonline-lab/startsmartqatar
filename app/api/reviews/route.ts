import { NextResponse } from 'next/server';

export interface GoogleReview {
  authorName: string;
  rating: number;
  text: string;
  relativeTimeDescription: string;
  profilePhotoUrl: string;
}

export interface ReviewsResponse {
  reviews: GoogleReview[];
  totalRating: number;
  totalReviews: number;
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json<ReviewsResponse>({ reviews: [], totalRating: 0, totalReviews: 0 });
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating,user_ratings_total&key=${apiKey}`,
      { next: { revalidate: 3600 } }
    );
    const data = await res.json();

    if (data.status !== 'OK' || !data.result) {
      return NextResponse.json<ReviewsResponse>({ reviews: [], totalRating: 0, totalReviews: 0 });
    }

    const reviews: GoogleReview[] = (data.result.reviews ?? [])
      .filter((r: any) => r.rating >= 4)
      .slice(0, 6)
      .map((r: any) => ({
        authorName: r.author_name,
        rating: r.rating,
        text: r.text,
        relativeTimeDescription: r.relative_time_description,
        profilePhotoUrl: r.profile_photo_url,
      }));

    return NextResponse.json<ReviewsResponse>({
      reviews,
      totalRating: data.result.rating ?? 0,
      totalReviews: data.result.user_ratings_total ?? 0,
    });
  } catch {
    return NextResponse.json<ReviewsResponse>({ reviews: [], totalRating: 0, totalReviews: 0 });
  }
}
