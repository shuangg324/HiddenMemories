import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Thumbnails = memo(({ images, currentIndex, onSelect }) => (
  <div className="lightbox-thumbnails">
    {images.map((image, index) => (
      <img
        key={image.id}
        src={image.src}
        alt={`Thumbnail ${index + 1}`}
        className={`lightbox-thumbnail ${index === currentIndex ? 'active' : ''}`}
        onClick={() => onSelect(index)}
      />
    ))}
  </div>
));
Thumbnails.displayName = 'Thumbnails';

const Lightbox = ({ images, isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imgLoaded, setImgLoaded]       = useState(false);
  const [showHint, setShowHint]         = useState(true);
  const preloadedRef                    = useRef(new Set());

  useEffect(() => { setCurrentIndex(initialIndex); }, [initialIndex]);

  // Aggressive preload — 5 ahead, 2 behind
  useEffect(() => {
    if (!isOpen || !images.length) return;
    const toPreload = [];
    for (let i = 1; i <= 5; i++) {
      toPreload.push(images[(currentIndex + i) % images.length]);
    }
    for (let i = 1; i <= 2; i++) {
      toPreload.push(images[(currentIndex - i + images.length) % images.length]);
    }
    toPreload.forEach(({ src }) => {
      if (preloadedRef.current.has(src)) return;
      preloadedRef.current.add(src);
      const img = new Image();
      img.src = src;
    });
  }, [currentIndex, images, isOpen]);

  // Hint auto-hide
  useEffect(() => {
    if (isOpen && showHint) {
      const t = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(t);
    }
  }, [isOpen, showHint]);

  // Reset imgLoaded when src changes so the fade plays
  useEffect(() => {
    setImgLoaded(false);
  }, [currentIndex]);

  const goToNext     = useCallback(() => setCurrentIndex(p => (p + 1) % images.length), [images.length]);
  const goToPrevious = useCallback(() => setCurrentIndex(p => (p - 1 + images.length) % images.length), [images.length]);

  const handleKeyPress = useCallback((e) => {
    if (!isOpen) return;
    if (e.key === 'Escape')     onClose();
    if (e.key === 'ArrowLeft')  goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  }, [isOpen, onClose, goToNext, goToPrevious]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !images.length) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      className="lightbox-overlay active"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      <div className="lightbox-container">
        {showHint && (
          <div className="lightbox-hint">Arrow keys to navigate · ESC to close</div>
        )}

        <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
          <FontAwesomeIcon icon={faTimes} />
        </button>

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

        <div className="lightbox-img-wrap">
          {!imgLoaded && <div className="lightbox-img-skeleton" aria-hidden="true" />}
          <img
            src={currentImage.src}
            alt={currentImage.alt}
            className={`lightbox-image${imgLoaded ? ' lightbox-image--loaded' : ''}`}
            decoding="async"
            onLoad={() => setImgLoaded(true)}
          />
        </div>

        <div className="lightbox-counter">{currentIndex + 1} / {images.length}</div>

        {images.length > 1 && (
          <Thumbnails images={images} currentIndex={currentIndex} onSelect={setCurrentIndex} />
        )}
      </div>
    </div>
  );
};

export default Lightbox;
