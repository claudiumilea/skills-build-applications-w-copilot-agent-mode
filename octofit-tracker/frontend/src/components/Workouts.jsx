import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const workoutsApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      const response = await fetch(workoutsApiUrl);
      const data = await response.json();
      setWorkouts(Array.isArray(data) ? data : data.results ?? []);
    };

    loadWorkouts();
  }, []);

  return <div>{workouts.length} workouts loaded</div>;
}
