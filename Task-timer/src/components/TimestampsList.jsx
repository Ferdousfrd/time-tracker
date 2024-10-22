import React, { useEffect, useState } from 'react';

const TimestampList = () => {
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    fetchTimestamps();
  }, []);

  const fetchTimestamps = () => {
    fetch('http://127.0.0.1:3010/timestamps')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setTimestamps(data))
      .catch(error => console.error('Error fetching timestamps:', error));
  };

  return (
    <div>
      <h2>Timestamps</h2>
      <ul>
        {timestamps.map(timestamp => (
          <li key={timestamp.id}>
            ID: {timestamp.id}, 
            Timestamp: {timestamp.timestamp}, 
            Task ID: {timestamp.task}, 
            Type: {timestamp.type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimestampList;