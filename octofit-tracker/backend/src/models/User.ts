import mongoose from 'mongoose'

export interface UserDocument {
  name: string
  email: string
  role: 'member' | 'coach' | 'admin'
  age: number
  fitnessGoal: string
  joinedAt: Date
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['member', 'coach', 'admin'], default: 'member' },
    age: { type: Number, required: true },
    fitnessGoal: { type: String, required: true },
    joinedAt: { type: Date, default: Date.now },
  },
  { collection: 'users' },
)

export const User = mongoose.model<UserDocument>('User', userSchema)