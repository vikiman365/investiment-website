import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/app/models/User';
import { verifyRefreshToken, clearAuthCookies, getTokensFromCookies } from '@/lib/tokens';

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await getTokensFromCookies();
    
    if (refreshToken) {
      const decoded = verifyRefreshToken(refreshToken);
      
      if (decoded) {
        await connectDB();
        
        // Remove refresh token from database
        await User.findByIdAndUpdate(decoded.userId, {
          $pull: { refreshTokens: { token: refreshToken } }
        });
      }
    }

    // Clear cookies
    await clearAuthCookies();

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}