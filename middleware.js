// Middleware for route protection
import { NextResponse } from 'next/server';

export function middleware(request) {
  // Get auth cookie
  const authCookie = request.cookies.get('isAuthenticated');
  const isAuthenticated = authCookie?.value === 'true';
  
  // Check if accessing protected route
  if (request.nextUrl.pathname.startsWith('/add-item')) {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('returnUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: '/add-item/:path*',
};
