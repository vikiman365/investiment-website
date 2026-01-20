import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/app/models/User'
import { connectDB } from '@/lib/db' // Updated import
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from '@/lib/jwt'
import { setAuthCookies, clearAuthCookies } from '@/lib/cookies'
import bcrypt from 'bcryptjs'

// Define the refresh token type based on your User model
interface IRefreshToken {
  token: string
  expiresAt: Date
  createdAt: Date
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  try {
    await connectDB()

    // Get refresh token from cookies
    const refreshToken = req.cookies.refresh_token
    if (!refreshToken) {
      return res.status(401).json({ error: 'No refresh token provided' })
    }

    // Verify refresh token
    let payload
    try {
      payload = verifyRefreshToken(refreshToken)
    } catch (error) {
      clearAuthCookies(res)
      return res.status(401).json({ error: 'Invalid or expired refresh token' })
    }

    // Find user
    const user = await User.findById(payload.userId)
    if (!user) {
      clearAuthCookies(res)
      return res.status(401).json({ error: 'User not found' })
    }

    // Find the matching refresh token in database using a for loop
    let storedToken: IRefreshToken | null = null
    
    // Use for...of loop instead of find with async
    for (const token of user.refreshTokens) {
      if (await bcrypt.compare(refreshToken, token.token)) {
        storedToken = token
        break
      }
    }

    // Check if token exists and is not expired
    if (!storedToken || new Date() > new Date(storedToken.expiresAt)) {
      // Remove expired/invalid token from database
      if (storedToken) {
        user.refreshTokens = user.refreshTokens.filter(
          (t: IRefreshToken) => t.token !== storedToken!.token
        )
        await user.save()
      }
      clearAuthCookies(res)
      return res.status(401).json({ error: 'Refresh token expired or invalid' })
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken({ 
      userId: user._id.toString(), 
      email: user.email 
    })
    const newRefreshToken = generateRefreshToken({ 
      userId: user._id.toString(), 
      email: user.email 
    })

    // Hash and store new refresh token
    const salt = await bcrypt.genSalt(10)
    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, salt)
    
    const refreshTokenExpires = new Date()
    refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 7)

    // Update user's refresh tokens
    const updatedRefreshTokens = user.refreshTokens.map((t: IRefreshToken) => 
      t.token === storedToken.token 
        ? { 
            token: hashedRefreshToken, 
            expiresAt: refreshTokenExpires,
            createdAt: new Date()
          }
        : t
    )
    
    user.refreshTokens = updatedRefreshTokens
    await user.save()

    // Set new cookies
    setAuthCookies(res, newAccessToken, newRefreshToken)

    return res.status(200).json({
      success: true,
      accessToken: newAccessToken,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    })

  } catch (error: any) {
    console.error('Refresh token error:', error)
    
    // Clear cookies on any error
    clearAuthCookies(res)
    
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    })
  }
}