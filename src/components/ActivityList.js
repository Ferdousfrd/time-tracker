import React from 'react';

const ActivityList = ({ activities, onDeleteActivity }) => {
  // Define a function to handle activity deletion
  const handleDeleteClick = (index) => {
    onDeleteActivity(index);
  };

  return (
    <div>
      <h3>Recorded Activities</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.name} - {activity.startTime.toLocaleTimeString()}
            <button onClick={() => handleDeleteClick(index)}>Delete</button> {/* Add Delete button */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;