import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassMartini, faCocktail, faWineGlass, faBeer } from '@fortawesome/free-solid-svg-icons';
import moveBackground from '../utils/moveBackground';
import { useModal } from '../utils/modalContext';

const Packages = () => {
  const { openModal } = useModal();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    scrollToTop();
    // Use openModal directly - no need for setTimeout anymore
    openModal();
};

  return (
    <div className="App" onMouseMove={(event) => moveBackground(event)}>
      <section id="packages-page">
        <div className="container">
          <div className="row dark-mode-white">
            <h1 className="section__title dark-mode-title">
              Our <span className="orange">Package</span>
            </h1>
            <p className="packages__header ">
              Take out the guesswork and customize your event to your liking!
            </p>

            <div className="how-it-works">
              <h2 className="package__title">How It Works</h2>
              <ul className="package__items">
                <li><b>Choose the Basic Package:</b> Every event starts with our dry hire package.</li>
                <li><b>Select Add-ons:</b> Pick extras that suit your event needs.</li>
                <li><b>Get a Quote:</b> Fill out our inquiry form and receive a personalized estimate.</li>
                <li><b>Enjoy Your Event!</b> We handle the setup so you can focus on making memories.</li>
              </ul>
            </div>
            
            <div className="package__list">
              <div className="package">
                <h2 className="package__title">Basic Package</h2>
                <p className="package__description">
                  Our <b>Basic Package</b> is a dry hire model that provides everything you need for a stylish and professional bar setup.
                </p>
                <ul className="package__items">
                  <li>Bar setup</li>
                  <li>Cups</li>
                  <li>Napkins</li>
                  <li>Straws</li>
                </ul>
              </div>
              
              <div className="package">
                <h2 className="package__title">Customize Your Event with Add-ons</h2>
                <p className="package__description">
                  Enhance your event with our selection of add-ons to tailor the experience to your needs.
                </p>
                <ul className="package__items">
                  <li><b>Mixers:</b> A variety of non-alcoholic options such as soda, juice, and tonic water.</li>
                  <li><b>Garnishes:</b> Fresh fruit, herbs, and specialty toppings.</li>
                  <li><b>Water Station:</b> Keep guests hydrated.</li>
                  <li><b>Ice Service:</b> Ice for perfectly cold drinks.</li>
                  <li><b>Glassware Upgrade:</b> Swap disposable cups for elegant glassware.</li>
                  <li><b>Signature Cocktail Menu:</b> Custom cocktail list tailored to your event.</li>
                  <li><b>Extra Bartender(s):</b> Additional staff for larger gatherings.</li>
                </ul>
              </div>
            </div>


            <div>
    {[faGlassMartini, faCocktail, faWineGlass, faBeer].flatMap((icon, index) => [
        <FontAwesomeIcon key={`${index}-1`} icon={icon} className={`shape shape--${index * 2}`} />,
        <FontAwesomeIcon key={`${index}-2`} icon={icon} className={`shape shape--${index * 2 + 1}`} />
    ])}
</div>
                
            

            <div className="contact__cta">
              <p className="packages__footer">Ready to create your perfect bar experience?</p>
              
              <span 
                onClick={handleContactClick}
                className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black"
              >
              <br></br>
                <p className="orange packages__contact">Contact Us Today!</p>
                </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
