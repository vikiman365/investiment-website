import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/app/models/User';
import { generateAccessToken, generateRefreshToken, setAuthCookies } from '@/lib/tokens';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { email, password } = body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      email: user.email
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      email: user.email,
      tokenVersion: user.refreshTokens.length + 1
    });

    // Store new refresh token
    user.refreshTokens.push({
      token: refreshToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });
    
    // Limit to 5 refresh tokens per user
    if (user.refreshTokens.length > 5) {
      user.refreshTokens = user.refreshTokens.slice(-5);
    }
    
    await user.save();

    // Set cookies
    await setAuthCookies(accessToken, refreshToken);

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    });

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}