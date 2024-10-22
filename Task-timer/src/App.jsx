// App.jsx
import React, { useEffect, useState } from 'react';
import TaskCard from './components/TaskCard'; 
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Form from './components/Form';
import "./style.css"

const App = () => {
  return(
    <>
      <Navbar />
      <Form />
      <Footer/>
    </>

  )
  
};

export default App;
