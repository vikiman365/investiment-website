import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface RefreshTokenPayload extends TokenPayload {
  tokenVersion: number;
}

// Generate access token (short-lived)
export function generateAccessToken(payload: TokenPayload): string {
  const secret: jwt.Secret = process.env.JWT_ACCESS_SECRET!;
  return jwt.sign(
    payload,
    secret,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m' } as jwt.SignOptions
  );
}

// Generate refresh token (long-lived)
export function generateRefreshToken(payload: RefreshTokenPayload): string {
  const secret: jwt.Secret = process.env.JWT_REFRESH_SECRET!;
  return jwt.sign(
    payload,
    secret,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d' } as jwt.SignOptions
  );
}

// Verify access token
export function verifyAccessToken(token: string): TokenPayload | null {
  try {
    const secret: jwt.Secret = process.env.JWT_ACCESS_SECRET!;
    return jwt.verify(token, secret) as TokenPayload;
  } catch (error) {
    return null;
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): RefreshTokenPayload | null {
  try {
    const secret: jwt.Secret = process.env.JWT_REFRESH_SECRET!;
    return jwt.verify(token, secret) as RefreshTokenPayload;
  } catch (error) {
    return null;
  }
}

// Set tokens in HTTP-only cookies
export async function setAuthCookies(accessToken: string, refreshToken: string) {
  const cookieStore = cookies();
  
  cookieStore.set('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60, // 15 minutes in seconds
    path: '/'
  });

  cookieStore.set('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: '/api/auth/refresh'
  });
}

// Clear auth cookies
export async function clearAuthCookies() {
  const cookieStore = cookies();
  
  cookieStore.set('access_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/'
  });

  cookieStore.set('refresh_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/api/auth/refresh'
  });
}

// Get tokens from cookies
export async function getTokensFromCookies() {
  const cookieStore = cookies();
  return {
    accessToken: cookieStore.get('access_token')?.value,
    refreshToken: cookieStore.get('refresh_token')?.value
  };
}