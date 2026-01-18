import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, verifyRefreshToken } from '@/lib/tokens';

// Public paths that don't require authentication
const publicPaths = ['/auth/login', '/auth/signup', '/'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for access token
  const accessToken = request.cookies.get('access_token')?.value;

  if (accessToken) {
    const decoded = verifyAccessToken(accessToken);
    
    if (decoded) {
      // Add user info to request headers for server components
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', decoded.userId);
      requestHeaders.set('x-user-email', decoded.email);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  // Try to refresh tokens if access token is invalid/expired
  const refreshToken = request.cookies.get('refresh_token')?.value;
  
  if (refreshToken && verifyRefreshToken(refreshToken)) {
    // Redirect to refresh endpoint
    const refreshUrl = new URL('/api/auth/refresh', request.url);
    return NextResponse.redirect(refreshUrl);
  }

  // No valid tokens, redirect to login
  const loginUrl = new URL('/auth/login', request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};