import React from 'react';
import ActivityForm from './ActivityForm';
import ActivityList from './ActivityList';

const ActivityTracking = ({ onActivityRecorded, activities }) => {
  return (
    <div>
      <h2>Activity Tracking</h2>
      <ActivityForm onActivityRecorded={onActivityRecorded} />
      <ActivityList activities={activities} />
    </div>
  );
};

export default ActivityTracking;