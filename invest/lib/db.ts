import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local')
}

let isConnected = false
let connectionPromise: Promise<typeof mongoose> | null = null

export async function connectDB(): Promise<typeof mongoose> {
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('✅ Using existing MongoDB connection')
    return mongoose
  }

  if (connectionPromise) {
    console.log('⏳ Waiting for existing connection...')
    return connectionPromise
  }

  console.log('🔄 Establishing new MongoDB connection...')
  
  connectionPromise = mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
  })
    .then((conn) => {
      isConnected = true
      console.log('✅ MongoDB connected successfully')
      return conn
    })
    .catch((error) => {
      console.error('❌ MongoDB connection failed:', error)
      connectionPromise = null
      throw error
    })

  return connectionPromise
}