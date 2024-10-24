// TaskCard.jsx
import React from 'react';

const TaskCard = ({ task, tags, timestamps }) => {
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
    </div>
  );
};

export default TaskCard;