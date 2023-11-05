import React from 'react';

const ActivityList = ({ activities, onDeleteActivity }) => {
  // Function to handle the delete button click
  const handleDeleteClick = (index) => {
    onDeleteActivity(index); // Call the onDeleteActivity function with the index of the activity
  };

  return (
    <div>
      <h3>Recorded Activities</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.name} - {activity.startTime.toLocaleTimeString()} to {activity.endTime.toLocaleTimeString()}
            <button onClick={() => handleDeleteClick(index)}>Delete</button> {/* Add a delete button */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;