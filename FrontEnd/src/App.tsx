// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "./features/login/login"
import Signin from "./features/signUp/signup"
import Home from './features/home/home';

const App: React.FC = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
