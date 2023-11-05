import React from 'react';

const Analytics = ({ activities }) => {
  // Creating an object to store the total time spent on each activity
  const activityTimes = {};

  // Looping through the recorded activities
  activities.forEach((activity) => {
    // If the activity name is not in the activityTimes object, initialize it to 0
    if (!activityTimes[activity.name]) {
      activityTimes[activity.name] = 0;
    }
    // Calculating the duration for the activity
    const duration = activity.endTime - activity.startTime;
    // Adding the duration to the total time spent for that activity
    activityTimes[activity.name] += duration;
  });

  return (
    <div>
      <h3>Activity Analytics</h3>
      <table>
        <thead>
          <tr>
            <th>Activity</th>
            <th>Time Spent (seconds)</th>
          </tr>
        </thead>
        <tbody>
          {/* Creating a table row for each activity and its total time spent */}
          {Object.entries(activityTimes).map(([activity, time], index) => (
            <tr key={index}>
              <td>{activity}</td> {/* Displaying the activity name */}
              <td>{(time / 1000).toFixed(2)}</td> {/* Converting time to seconds and display with 2 decimal places */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analytics;