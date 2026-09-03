import mongoose from 'mongoose'

export interface TeamDocument {
  name: string
  description: string
  captainEmail: string
  memberEmails: string[]
  weeklyGoalMinutes: number
}

const teamSchema = new mongoose.Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    captainEmail: { type: String, required: true },
    memberEmails: [{ type: String, required: true }],
    weeklyGoalMinutes: { type: Number, required: true },
  },
  { collection: 'teams' },
)

export const Team = mongoose.model<TeamDocument>('Team', teamSchema)