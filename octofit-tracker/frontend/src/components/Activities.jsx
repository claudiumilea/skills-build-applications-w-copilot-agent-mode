import { useEffect, useState } from 'react'

const activitiesApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetch(activitiesApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch activities')
        }

        return response.json()
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.results ?? []

        if (!ignore) {
          setActivities(items)
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
        <p className="eyebrow">Activity log</p>
        <h2>Recent movement</h2>
      </div>
      {status === 'loading' && <p className="state-message">Loading activities...</p>}
      {status === 'error' && <p className="state-message error">Unable to load activities.</p>}
      {status === 'ready' && (
        <div className="table-responsive">
          <table className="table align-middle data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Activity</th>
                <th>Minutes</th>
                <th>Calories</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.userEmail}-${activity.completedAt}`}>
                  <td>{activity.userEmail}</td>
                  <td>{activity.activityType}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.caloriesBurned}</td>
                  <td>{new Date(activity.completedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities