import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Packages from './pages/Packages.jsx';
import Navbar from './pages/Navbar.jsx';
import Gallery from './pages/Gallery';
import Modal from './pages/Modal.jsx';
import WeddingContactForm from './pages/Contact.jsx';
import MailButton from './pages/MailButton.jsx';
import { ModalProvider } from './utils/modalContext.js';



function App() {
  return (
    <Router>
      <ModalProvider>
      <Navbar />
      <Modal />
      <MailButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/gallery" element={<Gallery />} /> 
        <Route path="/contact" element={<WeddingContactForm />} /> 
      </Routes>
      </ModalProvider>
      </Router>
  );
}

export default App;
