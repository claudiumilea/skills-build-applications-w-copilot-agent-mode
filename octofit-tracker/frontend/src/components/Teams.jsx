import { useEffect, useState } from 'react'

const teamsApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetch(teamsApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch teams')
        }

        return response.json()
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.data ?? data.results ?? []

        if (!ignore) {
          setTeams(items)
          setStatus('ready')
        }
      })
      .catch(() => {
        if (!ignore) {
          setStatus('error')
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <section className="data-view">
      <div className="section-heading">
        <p className="eyebrow">Teams</p>
        <h2>Training groups</h2>
      </div>
      {status === 'loading' && <p className="state-message">Loading teams...</p>}
      {status === 'error' && <p className="state-message error">Unable to load teams.</p>}
      {status === 'ready' && (
        <div className="card-grid">
          {teams.map((team) => (
            <article className="metric-card" key={team._id ?? team.name}>
              <h3>{team.name}</h3>
              <p>{team.description}</p>
              <dl>
                <dt>Captain</dt>
                <dd>{team.captainEmail}</dd>
                <dt>Weekly goal</dt>
                <dd>{team.weeklyGoalMinutes} min</dd>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams