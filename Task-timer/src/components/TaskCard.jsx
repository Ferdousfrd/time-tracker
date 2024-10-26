// TaskCard.jsx
import React, { useState, useEffect } from 'react';

const TaskCard = ({ task, tags, timestamps, onDelete, fetchTimestamps }) => {
  const [timer, setTimer] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Function to send the timestamp to the server
  const sendTimestampToServer = async (type) => {
    const newTimestamp = {
      timestamp: new Date().toISOString(),
      task: task.id,
      type: type,
    };

    try {
      const response = await fetch('http://127.0.0.1:3010/timestamps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTimestamp),
      });

      if (response.ok) {
        console.log("Timestamp saved:", newTimestamp);
        fetchTimestamps(); // Refetch timestamps after saving
      } else {
        console.error("Error saving timestamp:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving timestamp:", error);
    }
  };

  const timerHandler = () => {
    if (timer) {
      // Stop timer
      clearInterval(intervalId);
      setIntervalId(null);
      sendTimestampToServer(1); // Send stop timestamp to server
    } else {
      // Start timer
      sendTimestampToServer(0); // Send start timestamp to server
      const id = setInterval(() => {}, 1000); // Replace with actual timer logic if needed
      setIntervalId(id);
    }
    setTimer(!timer); // Toggle the timer state
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  return (
    <div className="task-card">
      <h1>{task.name}</h1>
      <div className="tags">
        {tags.map(tag => (
          <span key={tag.id} className="tag">
            {tag.name}
          </span>
        ))}
      </div>
      <div className="timestamps">
        <h4>Timestamps:</h4>
        {timestamps.map(timestamp => (
          <p key={timestamp.id}>
            {new Date(timestamp.timestamp).toLocaleString()} (Type: {timestamp.type})
          </p>
        ))}
      </div>
      <button onClick={handleDelete} className='form--btn'>Delete Task</button>
      <button onClick={timerHandler} className='timer--btn'>{timer ? "Stop" : "Start"}</button>
    </div>
  );
};

export default TaskCard;