import { serialize, parse } from 'cookie'

export const setAuthCookies = (res: any, accessToken: string, refreshToken: string) => {
  const accessTokenCookie = serialize('access_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60, // 15 minutes in seconds
    path: '/',
  })

  const refreshTokenCookie = serialize('refresh_token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: '/',
  })

  res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie])
}

export const clearAuthCookies = (res: any) => {
  const clearAccessToken = serialize('access_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1, // Expire immediately
    path: '/',
  })

  const clearRefreshToken = serialize('refresh_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: -1,
    path: '/',
  })

  res.setHeader('Set-Cookie', [clearAccessToken, clearRefreshToken])
}