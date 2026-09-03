import { useEffect, useState } from 'react'

import { fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('workouts')
      .then((data) => {
        if (!ignore) {
          setWorkouts(data)
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
        <p className="eyebrow">Workouts</p>
        <h2>Recommended plans</h2>
      </div>
      {status === 'loading' && <p className="state-message">Loading workouts...</p>}
      {status === 'error' && <p className="state-message error">Unable to load workouts.</p>}
      {status === 'ready' && (
        <div className="card-grid">
          {workouts.map((workout) => (
            <article className="metric-card" key={workout._id ?? workout.title}>
              <h3>{workout.title}</h3>
              <p>{workout.recommendedForGoal}</p>
              <dl>
                <dt>Focus</dt>
                <dd>{workout.focusArea}</dd>
                <dt>Duration</dt>
                <dd>{workout.durationMinutes} min</dd>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts