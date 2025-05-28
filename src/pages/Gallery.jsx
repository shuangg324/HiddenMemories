import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassMartini, faCocktail, faWineGlass, faBeer, faSpinner } from '@fortawesome/free-solid-svg-icons';
import drink_stations from '../assets/drink_stations.jpg';
import marshmallow from '../assets/marshmallow.jpg';
import tray_service from '../assets/tray_service.jpg';
import OF from '../assets/OF.jpg';
import margs from '../assets/margs.jpg';
import lychee from '../assets/lychee.jpg';
import glasses from '../assets/glasses.jpg';
import flower_drinks from '../assets/flower_drinks.jpg';
import egg_top from '../assets/egg_top.jpg';
import lemony from '../assets/lemony.jpg';
import garnish from '../assets/garnish.jpg';
import marshmallow2 from '../assets/marshmallow2.jpg';
import marg from '../assets/marg.jpg';
import clase from '../assets/Clase.jpg';
import rimmed_cups from '../assets/rimmed_cups.jpg';
import trio from '../assets/HMTrio.jpg';
import grats from '../assets/Congrats.jpg';
import '../App.css';
import moveBackground from '../utils/moveBackground';
import { useModal } from '../utils/modalContext';

// Optimized Image Component
const OptimizedImage = React.memo(({ src, alt, title, onImageLoad }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    if (onImageLoad) onImageLoad();
  }, [onImageLoad]);

  const handleImageError = useCallback(() => {
    setImageError(true);
    console.warn(`Failed to load image: ${src}`);
  }, [src]);

  return (
    <div className="gallery__wrapper">
      {!imageLoaded && !imageError && (
        <div className="image-loading-placeholder" aria-label="Loading image">
          <FontAwesomeIcon icon={faSpinner} spin aria-hidden="true" />
        </div>
      )}
      {imageError ? (
        <div className="image-error-placeholder" role="img" aria-label="Failed to load image">
          <span>Failed to load image</span>
        </div>
      ) : (
        <img 
          src={src} 
          className={`gallery__img ${imageLoaded ? 'loaded' : 'loading'}`}
          alt={alt} 
          loading="lazy"
          onLoad={handleImageLoad}
          onError={handleImageError}
          decoding="async"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      )}
      <div className="gallery__overlay">
        <h3 className="gallery__title">{title}</h3>
      </div>
    </div>
  );
});

OptimizedImage.displayName = 'OptimizedImage';

const Gallery = () => {
  const { toggleModal } = useModal();
  const [visibleImages, setVisibleImages] = useState(6);
  const [loading, setLoading] = useState(true);
  const loadMoreRef = useRef(null);
  const containerRef = useRef(null);

  // Memoized gallery images configuration
  const galleryImages = useMemo(() => [
    { id: 1, src: drink_stations, alt: 'Professional drink stations setup for events', title: 'Drink Stations' },
    { id: 2, src: marshmallow, alt: 'Corporate event bar setup with professional service', title: 'Corporate Bar' },
    { id: 3, src: tray_service, alt: 'Elegant tray service for wedding reception', title: 'Tray Service' },
    { id: 4, src: trio, alt: 'A trio of martinis', title: 'Espresso, Matcha, and Lychee Martinis' },
    { id: 5, src: grats, alt: 'Congrats celebration', title: 'Celebratory Shots' },
    { id: 6, src: clase, alt: 'Row of Clase Azul', title: 'Clase Azul' },
    { id: 7, src: OF, alt: 'Classic old fashioned cocktail with garnish', title: 'Old Fashioned' },
    { id: 8, src: margs, alt: 'Triple margaritas with salt rim and lime', title: 'Triple Margaritas' },
    { id: 9, src: lychee, alt: 'Lychee cocktail setup with Asian-inspired garnish', title: 'Lychee Cocktails' },
    { id: 10, src: glasses, alt: 'Premium cocktail glassware collection', title: 'Cocktail Glasses' },
    { id: 11, src: flower_drinks, alt: 'Hibiscus spritz and floral infused vodka tonic', title: 'Hibiscus Spritz | Floral Infused Vodka Tonic' },
    { id: 12, src: egg_top, alt: 'Raspberry gin sour with egg white foam', title: 'Raspberry Gin Sour' },
    { id: 13, src: lemony, alt: 'Fresh citrus cocktails with lemon garnish', title: 'Citrus Cocktails' },
    { id: 14, src: garnish, alt: 'Artistic cocktail garnish preparation', title: 'Garnish Art' },
    { id: 15, src: marshmallow2, alt: 'Marshmallow and lychee specialty cocktails', title: 'Marshmallow Specialties' },
    { id: 16, src: marg, alt: 'Signature margarita with premium ingredients', title: 'Signature Margarita' },
    { id: 17, src: rimmed_cups, alt: 'Artfully rimmed cocktail cups with specialty salts', title: 'Rimmed Cocktails' }
  ], []);

  // Preload the first batch of images
  useEffect(() => {
    const preloadInitialImages = () => {
      const initialImages = galleryImages.slice(0, visibleImages);
      let loadedCount = 0;
      
      initialImages.forEach(image => {
        const img = new Image();
        img.src = image.src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === initialImages.length) {
            setLoading(false);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === initialImages.length) {
            setLoading(false);
          }
        };
      });
    };

    preloadInitialImages();
  }, [galleryImages, visibleImages]);

  // Optimized intersection observer
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
              <h1 className="section__title dark-mode-title">
                Our Gallery
              </h1>
              <p className="gallery__header" role="doc-subtitle">
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
                    className="gallery__item"
                    role="gridcell"
                    aria-label={`Gallery item ${index + 1} of ${galleryImages.length}`}
                  >
                    <OptimizedImage
                      src={image.src}
                      alt={image.alt}
                      title={image.title}
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
                className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black gallery__contact-btn"
                aria-label="Contact us about your event"
                type="button"
              >
                <span className="italic gallery__contact">Contact Us Today!</span>
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
          ])}
        </div>
      </section>
    </div>
  );
};

export default React.memo(Gallery);