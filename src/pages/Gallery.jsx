import React, { useState, useEffect, useMemo, useRef } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassMartini, faCocktail, faWineGlass, faBeer, faSpinner } from '@fortawesome/free-solid-svg-icons';
import moveBackground from '../utils/moveBackground';
import { useModal } from '../utils/modalContext';

// Import images
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
import rimmed_cups from '../assets/rimmed_cups.jpg';

const Gallery = () => {
  const { toggleModal } = useModal();
  const [visibleImages, setVisibleImages] = useState(6); // Start with 6 images
  const [loading, setLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const loadMoreRef = useRef(null);

  const galleryImages = useMemo(() => [
    { id: 1, src: drink_stations, alt: 'Drink stations setup', title: 'Drink Stations' },
    { id: 2, src: marshmallow, alt: 'Corporate event bar setup', title: 'Corporate Bar' },
    { id: 3, src: tray_service, alt: 'Tray service', title: 'Tray Service' },
    { id: 4, src: OF, alt: 'Old fashioned', title: 'Old Fashioned' },
    { id: 5, src: margs, alt: 'Triple Margaritas', title: 'Triple Margaritas' },
    { id: 6, src: lychee, alt: 'Lychee cocktail setup', title: 'Lychee Cocktails' },
    { id: 7, src: glasses, alt: 'Glasses', title: 'Cocktail Glasses' },
    { id: 8, src: flower_drinks, alt: 'Flower garnishing', title: 'Hibiscus Spritz | Floral Infused Vodka Tonic' },
    { id: 9, src: egg_top, alt: 'Egg foam top', title: 'Raspberry Gin Sour' },
    { id: 10, src: lemony, alt: 'Lemony drinks', title: 'Citrus Cocktails' },
    { id: 11, src: garnish, alt: 'Garnishing drink', title: 'Garnish Art' },
    { id: 12, src: marshmallow2, alt: 'Marshmallow + lychee setup', title: 'Marshmallow Specialties' },
    { id: 13, src: marg, alt: 'Margarita', title: 'Signature Margarita' },
    { id: 14, src: rimmed_cups, alt: 'Rimmed cocktail cups', title: 'Rimmed Cocktails' }
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
          setImagesLoaded(prev => ({ ...prev, [image.id]: true }));
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

  // Use Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && visibleImages < galleryImages.length && !loading) {
          setVisibleImages(prev => Math.min(prev + 4, galleryImages.length));
        }
      },
      { threshold: 0.1 }
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

  // Handle image load
  const handleImageLoad = (id) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  return (
    <div className="App" onMouseMove={(event) => moveBackground(event)}>
      <section id="gallery-page">
        <div className="container">
          <div className="row dark-mode-white">
            <h1 className="section__title dark-mode-title">
              Our Gallery
            </h1>
            <p className="gallery__header">
              Explore our past events and signature cocktails
            </p>

            <div className="gallery__grid">
              {galleryImages.slice(0, visibleImages).map((image) => (
                <div key={image.id} className="gallery__item">
                  <div className="gallery__wrapper">
                    {!imagesLoaded[image.id] && (
                      <div className="image-loading-placeholder">
                        <FontAwesomeIcon icon={faSpinner} spin />
                      </div>
                    )}
                    <img 
                      src={image.src} 
                      className={`gallery__img ${imagesLoaded[image.id] ? 'loaded' : 'loading'}`}
                      alt={image.alt} 
                      loading="lazy"
                      onLoad={() => handleImageLoad(image.id)}
                    />
                    <div className="gallery__overlay">
                      <p className="gallery__title">{image.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* This is our observer target */}
            <div ref={loadMoreRef} style={{ height: '20px', width: '100%' }}></div>

            {/*Load more images button */}
            
            {/* {visibleImages < galleryImages.length && (
              <div className="load-more">
                <button 
                  className="load-more__button"
                  onClick={() => setVisibleImages(prev => Math.min(prev + 4, galleryImages.length))}
                >
                  Load More Images
                </button>
              </div>
            )} */}

            <div className="contact__cta">
              <p className="gallery__footer">Want us to create memorable moments at your next event?</p>
              <span 
                onClick={() => toggleModal()}
                className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black"
              >
                <p className="italic gallery__contact">Contact Us Today!</p>
              </span>
            </div>
          </div>
        </div>

        <div>
          {[faGlassMartini, faCocktail, faWineGlass, faBeer].flatMap((icon, index) => [
            <FontAwesomeIcon key={`${index}-1`} icon={icon} className={`shape shape--${index * 2}`} />,
            <FontAwesomeIcon key={`${index}-2`} icon={icon} className={`shape shape--${index * 2 + 1}`} />
          ])}
        </div>
      </section>
    </div>
  );
};

export default Gallery;