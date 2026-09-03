import mongoose from 'mongoose'

export interface WorkoutDocument {
  title: string
  focusArea: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  durationMinutes: number
  recommendedForGoal: string
  exercises: string[]
}

const workoutSchema = new mongoose.Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true },
    recommendedForGoal: { type: String, required: true },
    exercises: [{ type: String, required: true }],
  },
  { collection: 'workouts' },
)

export const Workout = mongoose.model<WorkoutDocument>('Workout', workoutSchema)