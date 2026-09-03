import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const leaderboardApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const loadLeaderboard = async () => {
      const response = await fetch(leaderboardApiUrl);
      const data = await response.json();
      setEntries(Array.isArray(data) ? data : data.results ?? []);
    };

    loadLeaderboard();
  }, []);

  return <div>{entries.length} leaderboard entries loaded</div>;
}
