// App.jsx
import React, { useEffect, useState } from 'react';
import TaskCard from './components/TaskCard'; 
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import "./style.css"

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  // Fetch tags
  useEffect(() => {
    fetch('http://127.0.0.1:3010/tags')
      .then(response => response.json())
      .then(data => setTags(data))
      .catch(error => console.error('Error fetching tags:', error));
  }, []);

  // Fetch tasks
  useEffect(() => {
    fetch('http://127.0.0.1:3010/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Fetch timestamps
  useEffect(() => {
    fetch('http://127.0.0.1:3010/timestamps')
      .then(response => response.json())
      .then(data => setTimestamps(data))
      .catch(error => console.error('Error fetching timestamps:', error));
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <h1>Tasks</h1>
        <div className="task-grid">
          {tasks.map(task => {
            // Get the associated timestamps for the current task
            const taskTimestamps = timestamps.filter(ts => ts.task === task.id);
            
            // Get the associated tags for the current task
            const taskTags = tags.filter(tag => task.tags.split(',').includes(tag.id.toString()));

            return (
              <TaskCard 
                key={task.id} 
                task={task} 
                tags={taskTags} 
                timestamps={taskTimestamps} 
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
