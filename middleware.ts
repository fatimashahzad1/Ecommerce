import { NextRequest, NextResponse } from 'next/server';
import { AUTH_PAGES, ROUTE_LINKS } from './constants/routes';

// Helper to check if the path is an auth page
function isAuthPage(path: string) {
  return AUTH_PAGES.some((route) => path.startsWith(route));
}

// Helper to check if the path is the wishlist page
function isWishlistPage(path: string) {
  return path.startsWith(ROUTE_LINKS.wishlist);
}

// Helper to check if the path is an admin page
function isAdminPage(path: string) {
  return path.startsWith(ROUTE_LINKS.adminDashboard);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('firebaseToken')?.value;

  if (token && isAuthPage(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  if (!token && (isWishlistPage(pathname) || isAdminPage(pathname))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

// Specify which paths to run the middleware on
export const config = {
  matcher: [Object.values(ROUTE_LINKS)],
};
