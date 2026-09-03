import { useEffect, useState } from 'react'

import { fetchCollection } from '../api.js'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('leaderboard')
      .then((data) => {
        if (!ignore) {
          setLeaders(data)
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