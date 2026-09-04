import mongoose from 'mongoose'

export interface ActivityDocument {
  userEmail: string
  activityType: string
  durationMinutes: number
  caloriesBurned: number
  completedAt: Date
}

const activitySchema = new mongoose.Schema<ActivityDocument>(
  {
    userEmail: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { collection: 'activities' },
)

export const Activity = mongoose.model<ActivityDocument>('Activity', activitySchema)