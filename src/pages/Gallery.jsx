// Updated Gallery.jsx with automatic image loading

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassMartini, faCocktail, faWineGlass, faBeer, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../App.css';
import moveBackground from '../utils/moveBackground';
import { useModal } from '../utils/modalContext';
import Lightbox from '../components/Lightbox';

// Ultra-fast Image Component - minimal overhead
const OptimizedImage = React.memo(({ src, alt, title, onClick, priority = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <div className="gallery__wrapper" onClick={handleClick}>
      {!imageLoaded && (
        <div className="image-loading-placeholder" aria-label="Loading image">
          <FontAwesomeIcon icon={faSpinner} spin aria-hidden="true" />
        </div>
      )}
      <img 
        src={src} 
        className={`gallery__img ${imageLoaded ? 'loaded' : 'loading'}`}
        alt={alt} 
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setImageLoaded(true)}
        decoding="async"
        sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
      />
      <div className="gallery__overlay">
        <h3 className="gallery__title">{title}</h3>
      </div>
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

// Function to automatically import all images from assets folder
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

// Automatically load all .jpg, .jpeg, .png images from assets folder
const images = importAll(
  require.context('../assets', false, /\.(png|jpe?g|svg)$/)
);

// Function to generate title from filename
const generateTitle = (filename) => {
  // Remove file extension and replace underscores/hyphens with spaces
  return filename
    .replace(/\.(jpg|jpeg|png|svg)$/i, '')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase()) // Capitalize first letter of each word
    .trim();
};

// Function to generate alt text from filename
const generateAlt = (filename) => {
  const title = generateTitle(filename);
  return `Gallery image: ${title}`;
};

// Function to check if image should be excluded
const shouldExcludeImage = (filename) => {
  const excludeFiles = [
    '368kkk.png',
    'logo.png',
    'logo2.png',
    'LogoHM.png'
  ];
  return excludeFiles.includes(filename);
};

const Gallery = () => {
  const { toggleModal } = useModal();
  const [visibleImages, setVisibleImages] = useState(6);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const loadMoreRef = useRef(null);
  const containerRef = useRef(null);

  // Automatically generate gallery images from imported assets
  const galleryImages = useMemo(() => {
    const imageEntries = Object.entries(images);
    
    return imageEntries
      .filter(([filename]) => !shouldExcludeImage(filename)) // Filter out unwanted images
      .map(([filename, src], index) => ({
        id: index + 1,
        src: src.default || src, // Handle both default exports and direct imports
        alt: generateAlt(filename),
        title: generateTitle(filename)
      }));
  }, []);

  // Handle lightbox opening - use batch update to prevent flash
  const openLightbox = useCallback((index) => {
    React.startTransition(() => {
      setLightboxIndex(index);
      setLightboxOpen(true);
    });
  }, []);

  // Handle lightbox closing
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  // Use the exact same animation system as Contact/Home pages
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationType = element.dataset.animate;
          const delay = element.dataset.delay || '';
          
          if (animationType) {
            const delayMs = delay ? parseInt(delay) * 100 : 0;
            
            setTimeout(() => {
              element.classList.add(`animate-${animationType}`);
              if (delay) {
                element.classList.add(`animate-delay-${delay}`);
              }
              
              element.style.opacity = '';
              element.style.visibility = '';
            }, delayMs);
          }
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    setTimeout(() => {
      const animatedElements = document.querySelectorAll('[data-animate]');
      console.log(`🎬 Found ${animatedElements.length} elements to animate`);
      
      animatedElements.forEach(el => {
        if (!el.classList.contains('animate-fade-in-up') && 
            !el.classList.contains('animate-fade-in-left') && 
            !el.classList.contains('animate-fade-in-right')) {
          el.style.opacity = '0';
          el.style.visibility = 'hidden';
        }
        observer.observe(el);
      });
    }, 50);

    return () => observer.disconnect();
  }, [visibleImages]);

  // Instant loading
  useEffect(() => {
    setLoading(false);
  }, []);

  // Optimized intersection observer for load more functionality
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && visibleImages < galleryImages.length && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisibleImages(prev => Math.min(prev + 4, galleryImages.length));
            setLoading(false);
          }, 100);
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [visibleImages, loading, galleryImages.length]);

  // Mouse move handler
  const handleMouseMove = useCallback((event) => {
    if (typeof moveBackground === 'function') {
      moveBackground(event);
    }
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleModal();
    }
  }, [toggleModal]);

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <section id="gallery-page" ref={containerRef}>
        <div className="container">
          <div className="row dark-mode-white">
            <header>
              <h1 className="section__title dark-mode-title" data-animate="fade-in-up">
                Our Gallery
              </h1>
              <p className="gallery__header" role="doc-subtitle" data-animate="fade-in-up" data-delay="2">
                Explore our past events and signature cocktails
              </p>
            </header>

            <main>
              <div 
                className="gallery__grid" 
                role="grid" 
                aria-label="Gallery of cocktail and event photos"
              >
                {galleryImages.slice(0, visibleImages).map((image, index) => (
                  <article 
                    key={image.id} 
                    className="gallery__item hover-lift"
                    role="gridcell"
                    aria-label={`Gallery item ${index + 1} of ${galleryImages.length}`}
                  >
                    <OptimizedImage
                      src={image.src}
                      alt={image.alt}
                      title={image.title}
                      onClick={() => openLightbox(index)}
                      priority={index < 3}
                    />
                  </article>
                ))}
              </div>

              <div 
                ref={loadMoreRef} 
                style={{ height: '20px', width: '100%' }}
                aria-hidden="true"
              />

              {loading && (
                <div className="loading-indicator" role="status" aria-live="polite">
                  <FontAwesomeIcon icon={faSpinner} spin aria-hidden="true" />
                  <span className="sr-only">Loading more images...</span>
                </div>
              )}
            </main>

            <aside className="contact__cta">
              <p className="gallery__footer">Want us to create memorable moments at your next event?</p>
              <button
                onClick={toggleModal}
                onKeyDown={handleKeyDown}
                className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black gallery__contact-btn btn-animated hover-glow"
                aria-label="Contact us about your event"
                type="button"
              >
                <span className="italic gallery__contact text-glow">Contact Us Today!</span>
              </button>
            </aside>
          </div>
        </div>

        <div aria-hidden="true">
          {[faGlassMartini, faCocktail, faWineGlass, faBeer].flatMap((icon, index) => [
            <FontAwesomeIcon 
              key={`${index}-1`} 
              icon={icon} 
              className={`shape shape--${index * 2}`}
              aria-hidden="true"
            />,
            <FontAwesomeIcon 
              key={`${index}-2`} 
              icon={icon} 
              className={`shape shape--${index * 2 + 1}`}
              aria-hidden="true"
            />
          ]).concat([
            <FontAwesomeIcon 
              key="9" 
              icon={faGlassMartini} 
              className="shape shape--9"
              aria-hidden="true"
            />
          ])}
        </div>
      </section>

      <Lightbox
        images={galleryImages}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        initialIndex={lightboxIndex}
      />
    </div>
  );
};

export default React.memo(Gallery);