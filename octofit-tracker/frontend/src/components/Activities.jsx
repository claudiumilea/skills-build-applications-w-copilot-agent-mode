import { useEffect, useState } from 'react'

import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('activities')
      .then((data) => {
        if (!ignore) {
          setActivities(data)
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