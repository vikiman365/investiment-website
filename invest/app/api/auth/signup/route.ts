import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@/app/models/User'
import {connectDB} from '@/lib/db'
import { generateAccessToken, generateRefreshToken } from '@/lib/jwt'
import { setAuthCookies } from '@/lib/cookies'
import bcrypt from 'bcryptjs'

type ResponseData = {
  success?: boolean
  message?: string
  user?: any
  error?: string
  details?: any[]
  accessToken?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Handle only POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ 
      error: `Method ${req.method} Not Allowed` 
    })
  }

  try {
    // Connect to database
    await connectDB()

    const { firstName, lastName, email, password } = req.body

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: [
          ...(!firstName ? [{ field: 'firstName', message: 'First name is required' }] : []),
          ...(!lastName ? [{ field: 'lastName', message: 'Last name is required' }] : []),
          ...(!email ? [{ field: 'email', message: 'Email is required' }] : []),
          ...(!password ? [{ field: 'password', message: 'Password is required' }] : []),
        ]
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists',
        message: 'A user with this email already exists'
      })
    }

    // Generate refresh token
    const refreshToken = generateRefreshToken({ userId: 'temp', email: email.toLowerCase() })
    
    // Hash the refresh token before storing
    const salt = await bcrypt.genSalt(10)
    const hashedRefreshToken = await bcrypt.hash(refreshToken, salt)

    // Calculate expiration (7 days from now)
    const refreshTokenExpires = new Date()
    refreshTokenExpires.setDate(refreshTokenExpires.getDate() + 7)

    // Create new user with initial refresh token
    const user = await User.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      password, // Will be hashed by the pre-save hook
      refreshTokens: [{
        token: hashedRefreshToken,
        expiresAt: refreshTokenExpires,
      }]
    })

    // Generate tokens with actual user ID
    const accessToken = generateAccessToken({ 
      userId: user._id.toString(), 
      email: user.email 
    })
    
    // Regenerate refresh token with actual user ID
    const newRefreshToken = generateRefreshToken({ 
      userId: user._id.toString(), 
      email: user.email 
    })
    
    // Hash the new refresh token
    const newHashedRefreshToken = await bcrypt.hash(newRefreshToken, salt)
    
    // Update user with new hashed refresh token
    await User.findByIdAndUpdate(user._id, {
      $set: {
        'refreshTokens.0.token': newHashedRefreshToken,
        'refreshTokens.0.expiresAt': refreshTokenExpires,
      }
    })

    // Set cookies
    setAuthCookies(res, accessToken, newRefreshToken)

    // Convert to JSON (password will be removed by the toJSON transform)
    const userResponse = user.toJSON()

    // Return response with user data and access token
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: userResponse._id || userResponse.id,
        firstName: userResponse.firstName,
        lastName: userResponse.lastName,
        email: userResponse.email,
        isVerified: userResponse.isVerified,
        createdAt: userResponse.createdAt,
        updatedAt: userResponse.updatedAt,
        fullName: userResponse.fullName,
      },
      accessToken // Also return in response for client-side storage if needed
    })

  } catch (error: any) {
    console.error('Signup error:', error)
    
    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => ({
        field: err.path,
        message: err.message
      }))
      
      return res.status(400).json({
        error: 'Validation failed',
        details: errors
      })
    }
    
    // Duplicate key error (unique constraint)
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Duplicate key error',
        message: 'A user with this email already exists'
      })
    }

    return res.status(500).json({
      error: 'Internal server error',
      message: error.message || 'Something went wrong'
    })
  }
}