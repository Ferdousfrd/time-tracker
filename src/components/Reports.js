import React from 'react';
import Analytics from './Analytics';

const Reports = ({ activities }) => {
  return (
    <div>
      <h2>Reports</h2>
      <Analytics activities={activities} />
    </div>
  );
};

export default Reports;