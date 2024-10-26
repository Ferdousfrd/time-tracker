// TaskCard.jsx
import React, { useState } from 'react';

const TaskCard = ({ task, tags, timestamps, onDelete }) => {

  const [timer, setTimer] = useState(false)         // track the timeStamp button state

  function handleDelete() {
    onDelete(task.id)
  }

  function timerHandler(){
    setTimer(prev => prev === false ? true : false)
    console.log(timer)
  }

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
      <button onClick={timerHandler} className='timer--btn'>{timer === true? "Stop" : "Start-Timer"}</button>
    </div>
  );
};

export default TaskCard;