import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/app/models/User';
import { verifyRefreshToken, generateAccessToken, generateRefreshToken, setAuthCookies, getTokensFromCookies } from '@/lib/tokens';

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await getTokensFromCookies();
    
    if (!refreshToken) {
      return NextResponse.json(
        { error: 'No refresh token provided' },
        { status: 401 }
      );
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 }
      );
    }

    await connectDB();
    
    // Find user and check if refresh token exists in database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    const storedToken = user.refreshTokens.find(
        (      token: { token: string; expiresAt: Date; }) => token.token === refreshToken && token.expiresAt.getTime() > Date.now()
    );

    if (!storedToken) {
      return NextResponse.json(
        { error: 'Refresh token expired or revoked' },
        { status: 401 }
      );
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email
    });

    const newRefreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
      tokenVersion: decoded.tokenVersion + 1
    });

    // Update refresh token in database
    user.refreshTokens = user.refreshTokens.filter(
        (      token: { token: string; }) => token.token !== refreshToken
    );
    
    user.refreshTokens.push({
      token: newRefreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date()
    });
    
    await user.save();

    // Set new cookies
    await setAuthCookies(newAccessToken, newRefreshToken);

    return NextResponse.json({
      success: true,
      message: 'Tokens refreshed successfully'
    });

  } catch (error: any) {
    console.error('Token refresh error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}