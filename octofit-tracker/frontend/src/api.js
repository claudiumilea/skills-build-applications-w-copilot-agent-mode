const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  const candidates = [payload?.data, payload?.results, payload?.items, payload?.docs]
  const collection = candidates.find(Array.isArray)

  return collection ?? []
}

export async function fetchCollection(collectionName) {
  const response = await fetch(`${apiBaseUrl}/${collectionName}/`)

  if (!response.ok) {
    throw new Error(`Request failed for ${collectionName}: ${response.status}`)
  }

  const payload = await response.json()

  return normalizeCollection(payload)
}