import React, { useCallback, useEffect } from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGlassMartini, 
  faCocktail, 
  faWineGlass, 
  faBeer, 
  faCheck,
  faMagic,
  faStar,
  faGem,
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import moveBackground from '../utils/moveBackground';
import { useModal } from '../utils/modalContext';

const Packages = () => {
  const { openModal } = useModal();

  // Use the exact same animation system as Home page
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
            const delayMs = delay ? parseInt(delay) * 100 : 0; // Use 100ms like Home page
            
            setTimeout(() => {
              element.classList.add(`animate-${animationType}`);
              if (delay) {
                element.classList.add(`animate-delay-${delay}`);
              }
              
              // Make sure element becomes visible
              element.style.opacity = '';
              element.style.visibility = '';
            }, delayMs);
          }
          
          observer.unobserve(element);
        }
      });
    }, observerOptions);

    // Initialize exactly like Home page
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('[data-animate]');
      console.log(`🎬 Found ${animatedElements.length} elements to animate`);
      
      animatedElements.forEach(el => {
        // Set initial state for animation - exactly like Home page
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
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    scrollToTop();
    openModal();
  };

  const handleMouseMove = useCallback((event) => {
    if (typeof moveBackground === "function") {
      moveBackground(event);
    }
  }, []);

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <section id="packages-page">
        <div className="container">
          <div className="row dark-mode-white">
            {/* FIXED: Better sequenced header */}
            <div className="packages-header" data-animate="fade-in-up" data-delay="0">
              <h1 className="section__title dark-mode-title">
                Our Package
              </h1>
              <p className="packages__header">
                Take out the guesswork and customize your event to your liking!
              </p>
            </div>

            {/* FIXED: Sequential How It Works with proper delays */}
            <div className="how-it-works enhanced-section" data-animate="fade-in-up" data-delay="1">
              <div className="section-header">
                <FontAwesomeIcon icon={faMagic} className="section-icon" />
                <p className="italic package__title enhanced-title">How It Works</p>
              </div>
              <div className="steps-container">
                <div className="step-item" data-animate="fade-in-left" data-delay="2">
                  <div className="step-number">1</div>
                  <FontAwesomeIcon icon={faCheck} className="step-check" />
                  <div><b>Choose the Basic Package:</b> Every event starts with our dry hire package.</div>
                </div>
                <div className="step-item" data-animate="fade-in-left" data-delay="3">
                  <div className="step-number">2</div>
                  <FontAwesomeIcon icon={faCheck} className="step-check" />
                  <div><b>Select Add-ons:</b> Pick extras that suit your event needs.</div>
                </div>
                <div className="step-item" data-animate="fade-in-left" data-delay="4">
                  <div className="step-number">3</div>
                  <FontAwesomeIcon icon={faCheck} className="step-check" />
                  <div><b>Get a Quote:</b> Fill out our inquiry form and receive a personalized estimate.</div>
                </div>
                <div className="step-item" data-animate="fade-in-left" data-delay="5">
                  <div className="step-number">4</div>
                  <FontAwesomeIcon icon={faCheck} className="step-check" />
                  <div><b>Enjoy Your Event!</b> We handle the setup so you can focus on making memories.</div>
                </div>
              </div>
            </div>
            
            {/* FIXED: Package cards with better timing and no inline styles */}
            <div className="package__list enhanced-packages">
              <div 
                className="package enhanced-package basic-package" 
                data-animate="scale-in" 
                data-delay="6"
              >
                <div className="package-icon-header">
                  <FontAwesomeIcon icon={faStar} className="package-main-icon" />
                  <span className="package-badge">Essential</span>
                </div>
                <p className="italic package__title enhanced-package-title">Basic Package</p>
                <p className="package__description">
                  Our Basic Package is a dry hire model that provides everything you need for a stylish and professional bar setup.
                  <br></br>
                  Starting at $600 for 3 hours of service.
                </p>
                <ul className="package__items enhanced-items">
                  <li><FontAwesomeIcon icon={faCheck} className="item-check" />Bar setup</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check" />Cups</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check" />Napkins</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check" />Straws</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check" />Basic Mixers</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check" />Basic Garnishes</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check" />Custom Cocktail Menu</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check" />Certified and Insured Bartenders</li>
                </ul>
              </div>
              
              <div 
                className="package enhanced-package premium-package" 
                data-animate="scale-in" 
                data-delay="7"
              >
                <div className="package-icon-header">
                  <FontAwesomeIcon icon={faGem} className="package-main-icon premium-icon" />
                  <span className="package-badge premium-badge">Custom</span>
                </div>
                <p className="italic package__title enhanced-package-title">Customize Your Event with Add-ons</p>
                <p className="package__description">
                  Enhance your event with our selection of add-ons to tailor the experience to your needs.
                  <br></br>
                  Most options are $2-$5 per guest. Contact us for specific pricing based on your selections.
                </p>
                <ul className="package__items enhanced-items premium-items">
                  <li><FontAwesomeIcon icon={faCheck} className="item-check premium-check" /><b>Mixers:</b> A variety of non-alcoholic options such as soda, juice, tonic water, etc.</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check premium-check" /><b>Garnishes:</b> Fresh fruit, herbs, and specialty toppings.</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check premium-check" /><b>Water Station:</b> Water dispensers around the venue.</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check premium-check" /><b>Ice Service:</b> Ice for perfectly cold drinks.</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check premium-check" /><b>Glassware Upgrade:</b> Swap disposable cups for elegant glassware.</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check premium-check" /><b>Extra Bartender(s):</b> Additional staff for larger gatherings.</li>
                  <li><FontAwesomeIcon icon={faCheck} className="item-check premium-check" /><b>And More!</b> Ask us about additional options to enhance your event.</li>
                </ul>
              </div>
            </div>

            {/* FIXED: Special offer with better sequencing */}
            <div className="special-offer" data-animate="bounce-in" data-delay="8">
              <div className="special-offer-content">
                <FontAwesomeIcon icon={faMagic} className="special-icon" />
                <p className="italic package__items special-text">**ASK US ABOUT OUR WEDDING PLANNING SERVICES!</p>
              </div>
            </div>

            {/* Background Shapes */}
            <div>
              {[faGlassMartini, faCocktail, faWineGlass, faBeer].flatMap((icon, index) => [
                <FontAwesomeIcon key={`${index}-1`} icon={icon} className={`shape shape--${index * 2}`} />,
                <FontAwesomeIcon key={`${index}-2`} icon={icon} className={`shape shape--${index * 2 + 1}`} />
              ]).concat([
                <FontAwesomeIcon 
                  key="9" 
                  icon={faGlassMartini} 
                  className="shape shape--9"
                  aria-hidden="true"
                />
              ])}
            </div>

            {/* FIXED: CTA with final timing */}
            <div className="contact__cta" data-animate="fade-in-up" data-delay="9">
              <div className="packages-cta-enhanced">
                <div className="packages-cta__header">
                  <h3 className="packages-cta__title">Ready to Create Your Perfect Event?</h3>
                  <p className="packages-cta__subtitle">Book your 2025 date before they're gone!</p>
                </div>
                
                <div className="packages-cta__stats">
                  <div className="stat-item">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">Years of Experience</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Unique</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Satisfaction</span>
                  </div>
                </div>
                
                <div className="packages-cta__buttons">
                  <button
                    onClick={handleContactClick}
                    className="packages-cta__button packages-cta__button--primary"
                  >
                    <FontAwesomeIcon icon={faMagic} />
                    <span>Get Your Free Quote</span>
                  </button>
                  
                  <a 
                    href="tel:+16263674586" 
                    className="packages-cta__button packages-cta__button--secondary"
                  >
                    <FontAwesomeIcon icon={faPhone} />
                    <span>Call or Text (626) 367-4586</span>
                  </a>
                </div>
                
                <div className="packages-cta__guarantee">
                  ✨ Free consultation • Custom pricing • No hidden fees
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;