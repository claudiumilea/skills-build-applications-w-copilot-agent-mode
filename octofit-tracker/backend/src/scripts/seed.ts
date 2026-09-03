import mongoose from 'mongoose'

import { Activity } from '../models/Activity.js'
import { Leaderboard } from '../models/Leaderboard.js'
import { Team } from '../models/Team.js'
import { User } from '../models/User.js'
import { Workout } from '../models/Workout.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)

    console.log('Connected to octofit_db')
    console.log('Seed the octofit_db database with test data')

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.insertMany([
      {
        name: 'Maya Chen',
        email: 'maya.chen@octofit.test',
        role: 'member',
        age: 31,
        fitnessGoal: 'Build endurance for a half marathon',
        joinedAt: new Date('2026-01-12T09:00:00Z'),
      },
      {
        name: 'Jordan Smith',
        email: 'jordan.smith@octofit.test',
        role: 'coach',
        age: 38,
        fitnessGoal: 'Maintain strength and coach team challenges',
        joinedAt: new Date('2025-11-03T14:30:00Z'),
      },
      {
        name: 'Avery Patel',
        email: 'avery.patel@octofit.test',
        role: 'member',
        age: 27,
        fitnessGoal: 'Improve mobility and core strength',
        joinedAt: new Date('2026-02-20T16:45:00Z'),
      },
    ])

    await Team.insertMany([
      {
        name: 'Trail Blazers',
        description: 'Outdoor runners building consistent weekly mileage.',
        captainEmail: users[0].email,
        memberEmails: [users[0].email, users[2].email],
        weeklyGoalMinutes: 300,
      },
      {
        name: 'Strength Studio',
        description: 'Functional strength workouts for busy professionals.',
        captainEmail: users[1].email,
        memberEmails: [users[1].email, users[2].email],
        weeklyGoalMinutes: 240,
      },
    ])

    await Activity.insertMany([
      {
        userEmail: users[0].email,
        activityType: 'Run',
        durationMinutes: 48,
        caloriesBurned: 430,
        completedAt: new Date('2026-09-01T12:15:00Z'),
      },
      {
        userEmail: users[1].email,
        activityType: 'Strength Training',
        durationMinutes: 55,
        caloriesBurned: 390,
        completedAt: new Date('2026-09-01T18:30:00Z'),
      },
      {
        userEmail: users[2].email,
        activityType: 'Yoga',
        durationMinutes: 40,
        caloriesBurned: 160,
        completedAt: new Date('2026-09-02T07:45:00Z'),
      },
    ])

    await Leaderboard.insertMany([
      { userEmail: users[0].email, rank: 1, score: 1280, activeMinutes: 215, period: '2026-W36' },
      { userEmail: users[1].email, rank: 2, score: 1160, activeMinutes: 190, period: '2026-W36' },
      { userEmail: users[2].email, rank: 3, score: 980, activeMinutes: 165, period: '2026-W36' },
    ])

    await Workout.insertMany([
      {
        title: 'Endurance Builder Intervals',
        focusArea: 'Cardio',
        difficulty: 'intermediate',
        durationMinutes: 45,
        recommendedForGoal: 'Build endurance for a half marathon',
        exercises: ['Warm-up jog', '6 x 3-minute tempo intervals', 'Cool-down walk'],
      },
      {
        title: 'Desk Reset Mobility Flow',
        focusArea: 'Mobility',
        difficulty: 'beginner',
        durationMinutes: 25,
        recommendedForGoal: 'Improve mobility and core strength',
        exercises: ['Cat-cow stretch', 'Hip openers', 'Dead bugs', 'Side planks'],
      },
      {
        title: 'Full-Body Strength Circuit',
        focusArea: 'Strength',
        difficulty: 'advanced',
        durationMinutes: 50,
        recommendedForGoal: 'Maintain strength and coach team challenges',
        exercises: ['Goblet squats', 'Push presses', 'Romanian deadlifts', 'Farmer carries'],
      },
    ])

    console.log('Database seeding complete')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
