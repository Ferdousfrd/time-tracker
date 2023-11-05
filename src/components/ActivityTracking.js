import React from 'react';
import ActivityForm from './ActivityForm';


const ActivityTracking = ({ onActivityRecorded, activities }) => {
  return (
    <div>
      <h2>Activity Tracking</h2>
      <ActivityForm onActivityRecorded={onActivityRecorded} />
      <h3>Recorded Activities</h3>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.name}</td>
              <td>{activity.startTime.toLocaleTimeString()}</td>
              <td>{activity.endTime ? activity.endTime.toLocaleTimeString() : 'Recording...'}</td>
              <td>
                <button onClick={() => onActivityRecorded(activity)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTracking;