import React from 'react';
import { useParams } from 'react-router-dom';

const TimestampsPage = ({ timestamps }) => {
  const { taskId } = useParams();

  // Filter timestamps to only include those for the specified task
  const taskTimestamps = timestamps.filter(timestamp => timestamp.task === parseInt(taskId, 10));

  return (
    <div className="form--container">
      <h2>Timestamps for Task ID: {taskId}</h2>
      <div className="timestamp-log">
        {taskTimestamps.length > 0 ? (
          taskTimestamps.map(timestamp => (
            <div key={timestamp.id} className="timestamp-entry">
              <p>{new Date(timestamp.timestamp).toLocaleString()} - {timestamp.type === 1 ? "Stopped" : "Started"}</p>
            </div>
          ))
        ) : (
          <p>No timestamps available for this task.</p>
        )}
      </div>
    </div>
  );
};

export default TimestampsPage;