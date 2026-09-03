const codespaceName = import.meta.env.VITE_CODESPACE_NAME

const codespaceEndpoints = codespaceName
  ? {
      activities: `https://${codespaceName}-8000.app.github.dev/api/activities/`,
      leaderboard: `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`,
      teams: `https://${codespaceName}-8000.app.github.dev/api/teams/`,
      users: `https://${codespaceName}-8000.app.github.dev/api/users/`,
      workouts: `https://${codespaceName}-8000.app.github.dev/api/workouts/`,
    }
  : null

const localhostEndpoints = {
  activities: 'http://localhost:8000/api/activities/',
  leaderboard: 'http://localhost:8000/api/leaderboard/',
  teams: 'http://localhost:8000/api/teams/',
  users: 'http://localhost:8000/api/users/',
  workouts: 'http://localhost:8000/api/workouts/',
}

export const apiEndpoints = codespaceEndpoints ?? localhostEndpoints

function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  const candidates = [payload?.data, payload?.results, payload?.items, payload?.docs]
  const collection = candidates.find(Array.isArray)

  return collection ?? []
}

export async function fetchCollection(collectionName) {
  const endpoint = apiEndpoints[collectionName]

  if (!endpoint) {
    throw new Error(`Unknown API collection: ${collectionName}`)
  }

  const response = await fetch(endpoint)

  if (!response.ok) {
    throw new Error(`Request failed for ${collectionName}: ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollection(payload)
}