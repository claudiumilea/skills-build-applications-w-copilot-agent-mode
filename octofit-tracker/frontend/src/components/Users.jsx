import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const usersApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await fetch(usersApiUrl);
      const data = await response.json();
      setUsers(Array.isArray(data) ? data : data.results ?? []);
    };

    loadUsers();
  }, []);

  return <div>{users.length} users loaded</div>;
}
