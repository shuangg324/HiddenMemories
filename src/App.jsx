import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Packages from './pages/Packages.jsx';
import Navbar from './pages/Navbar.jsx';
import { ModalProvider } from './utils/modalContext.js';



function App() {
  return (
    <Router>
      <ModalProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
      </ModalProvider>
      </Router>
  );
}

export default App;
