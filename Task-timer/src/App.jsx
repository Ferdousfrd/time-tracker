import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import TimestampsPage from './components/TimestampsPage'; 
import './style.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [theme, setTheme] = useState('light');

  // Fetch tags
  useEffect(() => {
    fetch('http://127.0.0.1:3010/tags')
      .then(response => response.json())
      .then(data => setTags(data))
      .catch(error => console.error('Error fetching tags:', error));
  }, []);

  // Fetch tasks
  const fetchTasks = async () => {
    const response = await fetch('http://127.0.0.1:3010/tasks');
    const data = await response.json();
    setTasks(data);
  };


  // instad of wrapping fetchTaks around with useEffect we seperately defining it above 
  // and calling it later in useEffect so we can use fetchTask in some other places too.
  // Or else it will get messy. 

  useEffect(() => {
    fetchTasks();         // Initial fetch of tasks
  }, []);

  // Fetch timestamps
  const fetchTimestamps = async () => {
    const response = await fetch('http://127.0.0.1:3010/timestamps');
    const data = await response.json();
    setTimestamps(data);
  };

  useEffect(() => {
    fetchTimestamps(); // Fetch timestamps on mount
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>

      <Navbar toggleTheme={toggleTheme} />

      <main className={theme}>
        <Routes>
          <Route path="/" element={<Home tasks={tasks} tags={tags} timestamps={timestamps} setTasks={setTasks} fetchTimestamps={fetchTimestamps} />} />
          <Route path="/create" element={<Form fetchTasks={fetchTasks} />} />
          <Route path="/About" element={<About />} />
          <Route path="/timestamps/:taskId" element={<TimestampsPage timestamps={timestamps} />} />
        </Routes>
      </main>

      <Footer />
      
    </Router>
  );
};

export default App;