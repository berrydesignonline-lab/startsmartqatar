import { NextRequest, NextResponse } from 'next/server';

const LANG_COOKIE = 'lang-pref';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function middleware(request: NextRequest) {
  const cookieLang = request.cookies.get(LANG_COOKIE)?.value;

  // User has an explicit preference — enforce it
  if (cookieLang === 'ar') {
    const url = request.nextUrl.clone();
    url.pathname = '/ar';
    return NextResponse.redirect(url);
  }

  if (cookieLang === 'en') {
    return NextResponse.next();
  }

  // No preference yet — detect from browser Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? '';
  const prefersArabic = /\bar\b/i.test(acceptLang);

  if (prefersArabic) {
    const url = request.nextUrl.clone();
    url.pathname = '/ar';
    const response = NextResponse.redirect(url);
    response.cookies.set(LANG_COOKIE, 'ar', { maxAge: COOKIE_MAX_AGE, path: '/' });
    return response;
  }

  // English browser — set cookie so we don't re-check on next visit
  const response = NextResponse.next();
  response.cookies.set(LANG_COOKIE, 'en', { maxAge: COOKIE_MAX_AGE, path: '/' });
  return response;
}

// Only run on the root homepage — safe, no risk of 404 on AR-only pages
export const config = {
  matcher: ['/'],
};
