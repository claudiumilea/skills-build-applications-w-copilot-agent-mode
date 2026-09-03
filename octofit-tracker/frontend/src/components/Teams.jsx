import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const teamsApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

export default function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const loadTeams = async () => {
      const response = await fetch(teamsApiUrl);
      const data = await response.json();
      setTeams(Array.isArray(data) ? data : data.results ?? []);
    };

    loadTeams();
  }, []);

  return <div>{teams.length} teams loaded</div>;
}
