export const ALL_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) {
    _id, title, titleAr, slug, excerpt, excerptAr,
    mainImage, publishedAt, "category": category->title
  }
`;

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    _id, title, titleAr, slug, excerpt, excerptAr,
    mainImage, body, bodyAr, publishedAt,
    seoTitle, seoDescription, seoKeywords,
    "category": category->{ title, slug }
  }
`;

export const ALL_SLUGS_QUERY = `
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`;

export const LATEST_POSTS_QUERY = `
  *[_type == "post"] | order(publishedAt desc) [0...3] {
    _id, title, titleAr, slug, excerpt, mainImage, publishedAt, "category": category->title
  }
`;
