import { NextRequest, NextResponse } from 'next/server';

const apiUrl = process.env.NEXT_PUBLIC_PROD_API_URL || process.env.NEXT_PUBLIC_DEV_API_URL;

export async function middleware(request: NextRequest) {
  if (!apiUrl) return NextResponse.next();
  try {
    const response = await fetch(`${apiUrl}/api/v1/seo/redirect?path=${encodeURIComponent(request.nextUrl.pathname)}`);
    if (response.ok) {
      const result = await response.json();
      if (result.data?.destination) {
        return NextResponse.redirect(new URL(result.data.destination, request.url), 301);
      }
    }
  } catch {
    // A redirect lookup outage must not make public pages unavailable.
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};