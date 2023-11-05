import React from 'react';

const ActivityList = ({ activities }) => {
  return (
    <div>
      <h3>Recorded Activities</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>
            {activity.name} - {activity.startTime.toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;