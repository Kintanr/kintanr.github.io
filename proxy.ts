import { NextResponse, NextRequest } from 'next/server';

const locales = ['en', 'id'];

const defaultLocale = 'id';

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get('accept-language');

  if (!acceptLanguage) {
    return defaultLocale;
  }

  const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];

  return locales.includes(preferredLocale) ? preferredLocale : defaultLocale;
}

export function proxy(request: any) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);

  if (locale === defaultLocale) {
    return;
  }

  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
