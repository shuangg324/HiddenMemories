// Ultra-fast Lightbox - uses already loaded images

import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Lightbox = ({ images, isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showHint, setShowHint] = useState(true);

  // Update current index when initialIndex changes
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Hide hint after 3 seconds
  useEffect(() => {
    if (isOpen && showHint) {
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, showHint]);
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  const handleKeyPress = useCallback((e) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        goToPrevious();
        break;
      case 'ArrowRight':
        goToNext();
        break;
      default:
        break;
    }
  }, [isOpen, onClose, goToNext, goToPrevious]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !images.length) return null;

  const currentImage = images[currentIndex];

  return (
    <div 
      className={`lightbox-overlay ${isOpen ? 'active' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      <div className="lightbox-container">
        {/* Keyboard hint */}
        {showHint && (
          <div className="lightbox-hint">
            Use arrow keys to navigate • ESC to close
          </div>
        )}

        {/* Close button */}
        <button 
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close lightbox"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Navigation arrows */}
        <button 
          className="lightbox-nav lightbox-prev"
          onClick={goToPrevious}
          disabled={images.length <= 1}
          aria-label="Previous image"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <button 
          className="lightbox-nav lightbox-next"
          onClick={goToNext}
          disabled={images.length <= 1}
          aria-label="Next image"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        {/* Main image - uses the same source as gallery for instant display */}
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="lightbox-image"
          style={{ 
            display: 'block',
            opacity: 1
          }}
        />

        {/* Image title */}
        <h3 className="lightbox-title">{currentImage.title}</h3>

        {/* Image counter */}
        <div className="lightbox-counter">
          {currentIndex + 1} of {images.length}
        </div>

        {/* Thumbnail navigation */}
        {images.length > 1 && (
          <div className="lightbox-thumbnails">
            {images.map((image, index) => (
              <img
                key={image.id}
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                className={`lightbox-thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => goToImage(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;