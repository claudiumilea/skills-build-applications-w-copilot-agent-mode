import { useEffect, useState } from 'react'

const leaderboardApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetch(leaderboardApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard')
        }

        return response.json()
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.data ?? data.results ?? []

        if (!ignore) {
          setLeaders(items)
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
        <p className="eyebrow">Leaderboard</p>
        <h2>Weekly standings</h2>
      </div>
      {status === 'loading' && <p className="state-message">Loading leaderboard...</p>}
      {status === 'error' && <p className="state-message error">Unable to load leaderboard.</p>}
      {status === 'ready' && (
        <div className="leader-list">
          {leaders.map((leader) => (
            <article className="leader-card" key={leader._id ?? leader.userEmail}>
              <span className="rank">#{leader.rank}</span>
              <div>
                <h3>{leader.userEmail}</h3>
                <p>{leader.activeMinutes} active minutes</p>
              </div>
              <strong>{leader.score}</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard