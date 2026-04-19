import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home.jsx';
import Packages from './pages/Packages.jsx';
import Navbar from './pages/Navbar.jsx';
import Gallery from './pages/Gallery';
import QuoteCalculator from './pages/QuoteCalculator.jsx';
import Modal from './pages/Modal.jsx';
import WeddingContactForm from './pages/Contact.jsx';
import MailButton from './pages/MailButton.jsx';
import NotFound from './pages/NotFound.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './utils/ScrollToTop.js';
import useRipple from './utils/useRipple.js';
import { ModalProvider } from './utils/modalContext.js';

function App() {
  useRipple();
  return (
    <Router>
      <ModalProvider>
        <ScrollToTop />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <Modal />
        <MailButton />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/quote" element={<QuoteCalculator />} />
            <Route path="/contact" element={<WeddingContactForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </ModalProvider>
    </Router>
  );
}

export default App;
