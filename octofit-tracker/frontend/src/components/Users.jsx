import { useEffect, useState } from 'react'

import { fetchCollection } from '../api.js'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetchCollection('users')
      .then((data) => {
        if (!ignore) {
          setUsers(data)
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
        <p className="eyebrow">Members</p>
        <h2>Athlete profiles</h2>
      </div>
      {status === 'loading' && <p className="state-message">Loading users...</p>}
      {status === 'error' && <p className="state-message error">Unable to load users.</p>}
      {status === 'ready' && (
        <div className="card-grid">
          {users.map((user) => (
            <article className="metric-card" key={user._id ?? user.email}>
              <h3>{user.name}</h3>
              <p>{user.fitnessGoal}</p>
              <dl>
                <dt>Email</dt>
                <dd>{user.email}</dd>
                <dt>Role</dt>
                <dd>{user.role}</dd>
              </dl>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users