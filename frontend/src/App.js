import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import SignUp from './Signup';
import Piano from './piano';
import Recordings from './Recordings';
// import other pages/components as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path ="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path ="/myhome" element = {<Piano/>} />
        <Route path ="/recordings" element = {<Recordings/>} />
      </Routes>
    </Router>
  );
}

export default App;