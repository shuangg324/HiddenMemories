import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import '../App.css';
import { useModal } from '../utils/modalContext';
import Lightbox from '../components/Lightbox';

/* ── Image imports ─────────────────────────────────────── */
function importAll(r) {
  const images = {};
  r.keys().forEach((key) => { images[key.replace('./', '')] = r(key); });
  return images;
}

const rawImages = importAll(
  require.context('../assets', false, /\.(png|jpe?g|svg)$/)
);

const EXCLUDE = new Set(['368kkk.png', 'logo.png', 'logo2.png', 'LogoHM.png']);

const PX = (id, title) => ({
  id: `px-${id}`,
  src: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=800`,
  alt: title,
  title,
});

const EXTRA_IMAGES = [
  PX(10331392, 'Signature pour'),
  PX(34913279, 'Garden in bloom'),
  PX(34358624, 'Café rose'),
  PX(2466321,  'Florals & spirits'),
  PX(10595450, 'Evening service'),
];

const toTitle = (filename) =>
  filename
    .replace(/\.(jpg|jpeg|png|svg)$/i, '')
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())
    .trim();

/* ── GalleryItem ────────────────────────────────────────── */
const GalleryItem = React.memo(({ src, alt, title, index, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);

  return (
    <figure
      className="gallery__item"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View ${title}`}
    >
      <div className="gallery__frame">
        <img
          src={src}
          alt={alt}
          className={`gallery__img${loaded ? ' gallery__img--loaded' : ''}`}
          loading={index < 6 ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
        <div className="gallery__overlay" aria-hidden="true">
          <p className="gallery__caption">{title}</p>
        </div>
      </div>
    </figure>
  );
});

GalleryItem.displayName = 'GalleryItem';

/* ── Gallery ────────────────────────────────────────────── */
const Gallery = () => {
  const { openModal } = useModal();
  const [visibleImages, setVisibleImages] = useState(9);
  const [loading, setLoading]             = useState(false);
  const [lightboxOpen, setLightboxOpen]   = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const loadMoreRef = useRef(null);

  const galleryImages = useMemo(() => {
    const local = Object.entries(rawImages)
      .filter(([filename]) => !EXCLUDE.has(filename))
      .map(([filename, src], i) => ({
        id: i + 1,
        src: src.default || src,
        alt: toTitle(filename),
        title: toTitle(filename),
      }));
    return [...local, ...EXTRA_IMAGES];
  }, []);

  const openLightbox  = useCallback((index) => { setLightboxIndex(index); setLightboxOpen(true); }, []);
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  /* Header scroll reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el    = entry.target;
          const type  = el.dataset.animate;
          const delay = el.dataset.delay ? parseInt(el.dataset.delay, 10) * 80 : 0;
          setTimeout(() => {
            el.classList.add(`animate-${type}`);
            el.style.opacity = '';
          }, delay);
          observer.unobserve(el);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      el.style.opacity = '0';
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* Staggered grid reveal — left→right column stagger */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el  = entry.target;
          const col = parseInt(el.dataset.col || 0);
          setTimeout(() => el.classList.add('is-visible'), col * 60);
          observer.unobserve(el);
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.gallery__item:not(.is-visible)').forEach((el, i) => {
      el.dataset.col = i % 3;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visibleImages]);

  /* Infinite scroll */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleImages < galleryImages.length && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisibleImages((prev) => Math.min(prev + 6, galleryImages.length));
            setLoading(false);
          }, 120);
        }
      },
      { rootMargin: '200px' }
    );

    const ref = loadMoreRef.current;
    if (ref) observer.observe(ref);
    return () => { if (ref) observer.unobserve(ref); };
  }, [visibleImages, loading, galleryImages.length]);

  return (
    <div className="gallery-page">

      {/* ── Header ── */}
      <header className="gallery-header">
        <div className="gallery-header__inner">
          <span className="eyebrow" data-animate="fade-in-up">Portfolio</span>
          <h1 className="gallery-header__title" data-animate="fade-in-up" data-delay="1">
            The Gallery
          </h1>
          <p className="gallery-header__sub" data-animate="fade-in-up" data-delay="2">
            A selection of moments from events we've had the privilege of serving
          </p>
        </div>
      </header>

      {/* ── Grid ── */}
      <section className="gallery-section" aria-label="Photo gallery">
        <div className="container">
          <div className="gallery__grid" role="list" aria-label="Gallery of cocktail and event photos">
            {galleryImages.slice(0, visibleImages).map((image, index) => (
              <GalleryItem
                key={image.id}
                src={image.src}
                alt={image.alt}
                title={image.title}
                index={index}
                onClick={() => openLightbox(index)}
              />
            ))}
          </div>

          <div ref={loadMoreRef} style={{ height: '1px' }} aria-hidden="true" />

          {loading && (
            <div className="gallery-loading" role="status" aria-label="Loading more images">
              <span className="gallery-loading__dot" />
              <span className="gallery-loading__dot" />
              <span className="gallery-loading__dot" />
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="gallery-cta" aria-label="Book your event">
        <div className="container">
          <div className="gallery-cta__inner" data-animate="fade-in-up">
            <p className="gallery-cta__text">Ready to create your own moments?</p>
            <button className="btn-primary" onClick={openModal}>
              Book your event
            </button>
          </div>
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
