import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const activitiesApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

export default function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadActivities = async () => {
      const response = await fetch(activitiesApiUrl);
      const data = await response.json();
      setActivities(Array.isArray(data) ? data : data.results ?? []);
    };

    loadActivities();
  }, []);

  return <div>{activities.length} activities loaded</div>;
}
