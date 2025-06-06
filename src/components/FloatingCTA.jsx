// Create this file: src/components/FloatingCTA.jsx

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../utils/modalContext';
import './FloatingCTA.css';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { openModal } = useModal();

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 300px down
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBookNow = () => {
    openModal();
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsDismissed(true);
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className="floating-cta">
      <button className="floating-cta__button" onClick={handleBookNow}>
        <FontAwesomeIcon icon={faCalendarCheck} />
        <span>Book 2025</span>
      </button>
      <button className="floating-cta__dismiss" onClick={handleDismiss}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default FloatingCTA;