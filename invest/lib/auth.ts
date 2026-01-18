import { cookies, headers } from 'next/headers';
import { verifyAccessToken } from './tokens';
import { connectDB } from './db';
import { User } from '@/app/models/User';

export async function getCurrentUser() {
  try {
    // Try to get from headers first (for server components)
    const headersList = headers();
    const userId = headersList.get('x-user-id');
    
    if (userId) {
      await connectDB();
      const user = await User.findById(userId).select('-password -refreshTokens');
      return user;
    }

    // Fallback to cookies (for API routes)
    const cookieStore = cookies();
    const accessToken = cookieStore.get('access_token')?.value;
    
    if (accessToken) {
      const decoded = verifyAccessToken(accessToken);
      
      if (decoded) {
        await connectDB();
        const user = await User.findById(decoded.userId).select('-password -refreshTokens');
        return user;
      }
    }

    return null;
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}