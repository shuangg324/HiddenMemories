import React from 'react';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassMartini, faCocktail, faWineGlass, faBeer } from '@fortawesome/free-solid-svg-icons';
import moveBackground from '../utils/moveBackground';
import { useModal } from '../utils/modalContext';

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


  const galleryImages = [
    { id: 1, src: drink_stations, alt: 'Drink stations setup'},
    { id: 2, src: marshmallow, alt: 'Corporate event bar setup'},
    { id: 3, src: tray_service, alt: 'Tray service'},
    { id: 4, src: OF, alt: 'Old fashioned'},
    { id: 5, src: margs, alt: 'Triple Margaritas'},
    { id: 6, src: lychee, alt: 'Lychee cocktail setup'},
    { id: 7, src: glasses, alt: 'Glasse',},
    { id: 8, src: flower_drinks, alt: 'Flower garnishing',},
    { id: 9, src: egg_top, alt: 'Egg foam top',},
    { id: 10, src: lemony, alt: 'Lemony drinks'},
    { id: 11, src: garnish, alt: 'Garnishing drink'},
    { id: 12, src: marshmallow2, alt: 'Marshmallow + lychee setup'},
    { id: 13, src: marg, alt: 'Margarita'},
    { id: 14, src: rimmed_cups, alt: 'Rimmed cocktail cups'}
    // Add more images as needed
  ];

  return (
    <div className="App" onMouseMove={(event) => moveBackground(event)}>
      <section id="gallery-page">
        <div className="container">
          <div className="row dark-mode-white">
            <h1 className="section__title dark-mode-title">
              Our <span className="orange">Gallery</span>
            </h1>
            <p className="gallery__header">
              Explore our past events and signature cocktails
            </p>

            <div className="gallery__grid">
              {galleryImages.map((image) => (
                <div key={image.id} className="gallery__item">
                  <div className="gallery__wrapper">
                    <img src={image.src} className="gallery__img" alt={image.alt} />
                    <div className="gallery__overlay">
                      <h3 className="gallery__title">{image.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="contact__cta">
              <p className="gallery__footer">Want us to create memorable moments at your next event?</p>
              <span 
                onClick={() => toggleModal()}
                className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black"
              >
                <br />
                <p className="orange gallery__contact">Contact Us Today!</p>
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