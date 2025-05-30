import React, { useEffect, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassMartini, faCocktail, faWineGlass, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
// Static imports for immediate use
import drinksFallback from '../assets/drink_stations.jpg';
import drinks2Fallback from '../assets/HMTrio.jpg';
import drinks3Fallback from '../assets/margs.jpg';
import Logo from '../assets/LogoHM.png';
import '../App.css';
import moveBackground from '../utils/moveBackground.js';
import { useModal } from '../utils/modalContext';

// Optimized Image Component with lazy loading
const OptimizedProjectImage = React.memo(({ src, alt, className }) => {
  return (
    <img 
      src={src} 
      className={className}
      alt={alt}
      loading="lazy"
      decoding="async"
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
});

OptimizedProjectImage.displayName = 'OptimizedProjectImage';

// Ticker component for better performance
const Ticker = React.memo(() => {
  const tickerItems = useMemo(() => {
    const items = [];
    for (let i = 0; i < 16; i++) {
      items.push(
        <React.Fragment key={i}>
          <div className="ticker-item">NOW BOOKING 2025</div>
          <div className="ticker-separator">✦</div>
        </React.Fragment>
      );
    }
    return items;
  }, []);

  return (
    <div className="ticker-container" role="marquee" aria-label="Now booking for 2025">
      <div className="ticker-wrap">
        {tickerItems}
      </div>
    </div>
  );
});

Ticker.displayName = 'Ticker';

const Home = () => {
    const { toggleModal } = useModal();

    // Memoized mouse move handler for better performance
    const handleMouseMove = useCallback((event) => {
        if (typeof moveBackground === "function") {
            moveBackground(event);
        }
    }, []);

    // Memoized about us click handler
    const handleAboutUsClick = useCallback(() => {
        toggleModal();
    }, [toggleModal]);

    // Setup mouse move listener
    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [handleMouseMove]);

    // Memoized background shapes
    const backgroundShapes = useMemo(() => {
        const allIcons = [faGlassMartini, faCocktail, faWineGlass, faChampagneGlasses];
        return [
            <FontAwesomeIcon key="0" icon={allIcons[0]} className="shape shape--0" aria-hidden="true" />,
            <FontAwesomeIcon key="1" icon={allIcons[0]} className="shape shape--1" aria-hidden="true" />,
            <FontAwesomeIcon key="2" icon={allIcons[1]} className="shape shape--2" aria-hidden="true" />,
            <FontAwesomeIcon key="3" icon={allIcons[1]} className="shape shape--3" aria-hidden="true" />,
            <FontAwesomeIcon key="4" icon={allIcons[3]} className="shape shape--4" aria-hidden="true" />,
            <FontAwesomeIcon key="5" icon={allIcons[2]} className="shape shape--5" aria-hidden="true" />,
            <FontAwesomeIcon key="6" icon={allIcons[3]} className="shape shape--6" aria-hidden="true" />,
            <FontAwesomeIcon key="7" icon={allIcons[2]} className="shape shape--7" aria-hidden="true" />,
            <FontAwesomeIcon key="8" icon={faGlassMartini} className="shape shape--8" aria-hidden="true" />
        ];
    }, []);

    // Memoized project data for better performance
    const projectData = useMemo(() => [
        {
            id: 1,
            image: drinksFallback,
            title: "Wedding Reception",
            subtitle: "Elegant and Memorable",
            description: "We specialize in bringing a unique and personalized touch to events like wedding receptions. Our mobile bar service includes crafting custom cocktails, creating a welcoming bar atmosphere, and ensuring guests enjoy an elevated experience that adds to the celebration's lasting memories.",
            alt: "Professional wedding reception bar setup with elegant drink stations"
        },
        {
            id: 2,
            image: drinks2Fallback,
            title: "Private Party",
            subtitle: "Exclusive and Personalized",
            description: "We bring fun and flair to your private parties with our mobile bar service, tailored to create a memorable experience for you and your guests. Whether it's an intimate gathering or a lively celebration, we offer custom cocktails and impeccable service that adds a touch of excitement to your event. From the first drink to the last toast, we ensure every detail is perfect, leaving your guests talking about your party long after it ends.",
            alt: "Private party bar service featuring signature espresso and lychee martinis"
        },
        {
            id: 3,
            image: drinks3Fallback,
            title: "Corporate Event",
            subtitle: "Professional and Fun",
            description: "We bring professionalism and elegance to corporate events with our mobile bar service. Whether it's a company celebration, client appreciation event, or team gathering, we craft custom cocktails and create an inviting bar experience that enhances networking and leaves a lasting impression.",
            alt: "Corporate event bar service with professional tropical margaritas and signature cocktails"
        }
    ], []);

    return (
        <div className="App" onMouseMove={handleMouseMove}>
            <section id="landing-page">
                <header className="header">
                    <div className="container">
                        <div className="row">
                            <div className="header__content">
                                <div className="header__content--left">
                                    <h1 className="big__title">Mobile Bar Services</h1>
                                    <p className="header__para dark-mode-white">
                                        Elevate your event with our expert Mobile Bartenders. We craft custom cocktails and provide exceptional service to make your celebration unforgettable.
                                        Let us bring your vision to life!
                                        <br />
                                        <br />
                                        Here's a bit more{' '}
                                        <button 
                                            className="italic header__para link__hover-effect link__hover-effect--black click"
                                            onClick={handleAboutUsClick}
                                            style={{ background: 'none', border: 'none', font: 'inherit', color: 'inherit', cursor: 'pointer' }}
                                            aria-label="Learn more about Hidden Memories Bar"
                                        >
                                            <strong>about us</strong>
                                        </button>
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Ticker />
                </header>
                
                <a href="#projects" className="scroll" aria-label="Scroll to featured events section">
                    <div className="scroll__icon click" aria-hidden="true"></div>
                </a>
            </section>

            {/* Background decorative shapes */}
            <div aria-hidden="true">
                {backgroundShapes}
            </div>

            <main>
                <section id="projects">
                    <div className="container">
                        <div className="row">
                            <header>
                                <h2 className="section__title dark-mode-white">
                                    Featured Events
                                </h2>
                            </header>
                            
                            <ul className="project__list">
                                {projectData.map((project, index) => (
                                    <li key={project.id} className="project">
                                        <article className="project__wrapper">
                                            <OptimizedProjectImage
                                                src={project.image}
                                                className="project__img"
                                                alt={project.alt}
                                            />
                                            <div className="project__wrapper--bg" aria-hidden="true"></div>
                                            <div className="project__description">
                                                <h3 className="project__description--title">
                                                    {project.title}
                                                </h3>
                                                <h4 className="project__description--sub-title">
                                                    {project.subtitle}
                                                </h4>
                                                <p className="project__description--para">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </article>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <div className="container footer__color">
                    <div className="row footer__row">
                        <a href="/" className="footer__anchor" aria-label="Return to top of page">
                            <figure className="footer__logo">
                                <img 
                                    src= {Logo}
                                    className="footer__logo--img" 
                                    alt="Hidden Memories Bar logo" 
                                    loading="lazy"
                                />
                            </figure>
                        </a>
                        <div className="footer__copyright dark-mode-white">
                            Copyright &copy; 2025 Hidden Memories Bar. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default React.memo(Home);