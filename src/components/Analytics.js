import React from 'react';

const Analytics = ({ activities }) => {
  const activityTimes = {};

  activities.forEach((activity) => {
    if (!activityTimes[activity.name]) {
      activityTimes[activity.name] = 0;
    }
    const duration = activity.endTime - activity.startTime;
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
          {Object.entries(activityTimes).map(([activity, time], index) => (
            <tr key={index}>
              <td>{activity}</td>
              <td>{(time / 1000).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analytics;