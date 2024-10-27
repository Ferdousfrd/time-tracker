import React, { useState } from 'react';
import TaskCard from './TaskCard';

const Home = ({ tasks, tags, timestamps, setTasks, fetchTimestamps }) => {
  const [notify, setNotify] = useState("");

  const handleDelete = async (id) => {
    const response = await fetch(`http://127.0.0.1:3010/tasks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      setNotify(`Task with id ${id} deleted`);
      setTimeout(() => setNotify(""), 3000);
    } else {
      setNotify("Failed to delete task:", response.statusText);
      setTimeout(() => setNotify(""), 3000);
    }
  };

  return (
    <div className="container">
      {notify && (
        <div className="notification">
          {notify}
        </div>
      )}
      <h1>Tasks List</h1>
      <div className="task-grid">
        {tasks.map(task => {
          const taskTimestamps = timestamps.filter(ts => ts.task === task.id);
          const taskTags = tags.filter(tag => task.tags.split(',').includes(tag.id.toString()));

          return (
            <TaskCard
              key={task.id}
              task={task}
              tags={taskTags}
              timestamps={taskTimestamps}
              onDelete={handleDelete}
              fetchTimestamps={fetchTimestamps} // Passing fetchTimestamps to TaskCard
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;