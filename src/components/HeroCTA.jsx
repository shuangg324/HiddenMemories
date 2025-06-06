// Create this file: src/components/HeroCTA.jsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faPhone, faStar } from '@fortawesome/free-solid-svg-icons';
import { useModal } from '../utils/modalContext';
import './HeroCTA.css';

const HeroCTA = () => {
  const { openModal } = useModal();

  const handleBookNow = () => {
    openModal();
  };

  const handleCallNow = () => {
    window.open('tel:+16263674586', '_self');
  };

  return (
    <div className="hero-cta" data-animate="fade-in-up" data-delay="3">
      <div className="hero-cta__content">
        <div className="hero-cta__urgency">
          <FontAwesomeIcon icon={faStar} className="urgency-icon" />
          <span className="urgency-text">Limited 2025 Dates Available</span>
          <FontAwesomeIcon icon={faStar} className="urgency-icon" />
        </div>
        
        <div className="hero-cta__buttons">
          <button className="cta-button cta-button--primary" onClick={handleBookNow}>
            <FontAwesomeIcon icon={faCalendarCheck} />
            <span>Book Your Date</span>
          </button>
          
          <button className="cta-button cta-button--secondary" onClick={handleCallNow}>
            <FontAwesomeIcon icon={faPhone} />
            <span>Call Now</span>
          </button>
        </div>
        
        <div className="hero-cta__guarantee">
          <span>✨ Free Consultation • Custom Menu • Professional Service</span>
        </div>
      </div>
    </div>
  );
};

export default HeroCTA;