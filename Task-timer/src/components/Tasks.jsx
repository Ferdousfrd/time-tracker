import React, { useEffect, useState } from 'react';

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the tasks on component mount
  useEffect(() => {
    fetch('http://127.0.0.1:3010/tasks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error fetching tasks: {error}</div>;
  }

  return (
    <div>
      <h2>Tasks List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} (Tags: {task.tags})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;