import { useEffect, useState } from 'react'

const usersApiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [users, setUsers] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let ignore = false

    fetch(usersApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }

        return response.json()
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.data ?? data.results ?? []

        if (!ignore) {
          setUsers(items)
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