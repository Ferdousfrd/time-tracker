import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ task, tags, timestamps, onDelete, fetchTimestamps }) => {
  const [timer, setTimer] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lastSpentTime, setLastSpentTime] = useState(null); // Track last spent time for display
  const navigate = useNavigate();

  const sendTimestampToServer = async (type) => {       // Function to send the timestamp to the server
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
        console.log("Timestamp saved:", newTimestamp);  // just for testing bugs
        fetchTimestamps();                              // Refetch timestamps after saving
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
      sendTimestampToServer(1);         // Send stop timestamp to server

      setLastSpentTime(elapsedTime);    // Save the last spent time

    } else {
      // Start timer
      sendTimestampToServer(0);         // Send start timestamp to server
      setElapsedTime(0);                // Reset elapsed time to 0

      const id = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);                         // Increment every 1 second
      setIntervalId(id);
    }
    setTimer(!timer);                   // Toggle the timer state
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const viewTimestamps = () => {
    navigate(`/timestamps/${task.id}`);
  };

  // Format elapsed time as minutes and seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}m ${seconds}s`;
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
      
      <button onClick={handleDelete} className="form--btn">Delete Task</button>
      <button onClick={timerHandler} className="timer--btn">
        {timer ? "Stop" : "Start"}
      </button>
      <button onClick={viewTimestamps} className="timer--btn">
        View Timestamps
      </button>

      {/* Timer Display */}
      <div className={timer? "timer-display" : ""}>
        {timer ? (
          <>
            <div className='timer--status'>Active</div>
            <p>Time Tracker: {formatTime(elapsedTime)}</p>
          </>
        ) : (
          lastSpentTime !== null && (
            <p>Last time you spent on this task: {formatTime(lastSpentTime)}</p>
          )
        )}
      </div>

    </div>
  );
};

export default TaskCard;