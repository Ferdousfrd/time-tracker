import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Form from './components/Form';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import About from './components/About';
import './style.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [tags, setTags] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [theme, setTheme] = useState('light')           // default theme


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

  useEffect(() => {
    fetchTasks();   // Initial fetch of tasks
  }, []);           // Only on mount

  // Fetch timestamps
  useEffect(() => {
    fetch('http://127.0.0.1:3010/timestamps')
      .then(response => response.json())
      .then(data => setTimestamps(data))
      .catch(error => console.error('Error fetching timestamps:', error));
  }, []);

  const toggleTheme = () => {           // toggling between theme function
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    console.log("Clicked Theme")
  };


  return (
    <Router>
      <Navbar toggleTheme={toggleTheme}/>
      <main className={theme}>            {/* changing the theme depending on our state*/}
      <Routes>
        <Route path="/" element={<Home tasks={tasks} tags={tags} timestamps={timestamps} setTasks={setTasks}/>} />
        <Route path="/create" element={<Form setTasks={setTasks} fetchTasks={fetchTasks}/>} />
        <Route path="/About" element={<About />} />
      </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;