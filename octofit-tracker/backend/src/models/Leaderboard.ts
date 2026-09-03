import mongoose from 'mongoose'

export interface LeaderboardDocument {
  userEmail: string
  rank: number
  score: number
  activeMinutes: number
  period: string
}

const leaderboardSchema = new mongoose.Schema<LeaderboardDocument>(
  {
    userEmail: { type: String, required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    activeMinutes: { type: Number, required: true },
    period: { type: String, required: true },
  },
  { collection: 'leaderboard' },
)

export const Leaderboard = mongoose.model<LeaderboardDocument>('Leaderboard', leaderboardSchema)