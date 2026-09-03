import express from 'express'
import mongoose from 'mongoose'
import type { Model } from 'mongoose'

import { Activity } from './models/Activity.js'
import { Leaderboard } from './models/Leaderboard.js'
import { Team } from './models/Team.js'
import { User } from './models/User.js'
import { Workout } from './models/Workout.js'

const app = express()
const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db'
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', apiBaseUrl })
})

function registerCollectionRoute<DocumentType>(resource: string, model: Model<DocumentType>) {
  app.get(`/api/${resource}/`, async (_request, response, next) => {
    try {
      const data = await model.find().lean()
      response.json({ resource, data })
    } catch (error) {
      next(error)
    }
  })
}

registerCollectionRoute('users', User)
registerCollectionRoute('teams', Team)
registerCollectionRoute('activities', Activity)
registerCollectionRoute('leaderboard', Leaderboard)
registerCollectionRoute('workouts', Workout)

async function startServer() {
  await mongoose.connect(mongoUri)
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`)
  })
}

startServer().catch((error: unknown) => {
  console.error('Unable to connect to MongoDB', error)
  process.exit(1)
})