import React, { useEffect } from 'react';
import drinks from '../assets/drink_stations.jpg';
import drinks2 from '../assets/lychee.jpg';
import drinks3 from '../assets/margs.jpg';
import moveBackground from '../utils/moveBackground.js';
import {useModal} from '../utils/modalContext';      
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlassMartini, faCocktail, faWineGlass, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';



const Home = () => {
    const { toggleModal } = useModal();

    // Handle background movement
    useEffect(() => {
        if (typeof moveBackground !== "function") {
            console.error("moveBackground is not a function");
            return;
        }

        const handleMouseMove = (event) => moveBackground(event);
        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    

    return (
        <div className="App" onMouseMove={(event) => moveBackground(event)}>
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
                                        Here's a bit more <b className="italic header__para link__hover-effect link__hover-effect--black click" onClick={toggleModal}>about us</b>.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ticker-container">
        <div class="ticker-wrap">
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦ </div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦ </div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦ </div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦ </div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦ </div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦ </div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦ </div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦ </div>
            
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦</div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦</div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦</div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦</div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦</div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦</div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦</div>
            <div class="ticker-item">NOW BOOKING 2025</div>
            <div class="ticker-separator">✦</div>
        </div>
    </div>
                </header>
                <a href="#projects" className="scroll">
                    <div className="scroll__icon click"></div>
                </a>
               
            </section>

            <div>
            {(() => {
  // Generate all icons first
  const allIcons = [faGlassMartini, faCocktail, faWineGlass, faChampagneGlasses];
  
  // Create the shapes array manually to have more control
  const shapes = [
    <FontAwesomeIcon key="0" icon={allIcons[0]} className="shape shape--0" />,
    <FontAwesomeIcon key="1" icon={allIcons[0]} className="shape shape--1" />,
    <FontAwesomeIcon key="2" icon={allIcons[1]} className="shape shape--2" />,
    <FontAwesomeIcon key="3" icon={allIcons[1]} className="shape shape--3" />,
    <FontAwesomeIcon key="4" icon={allIcons[3]} className="shape shape--4" />,
    <FontAwesomeIcon key="5" icon={allIcons[2]} className="shape shape--5" />,
    <FontAwesomeIcon key="6" icon={allIcons[3]} className="shape shape--6" />,
    <FontAwesomeIcon key="7" icon={allIcons[2]} className="shape shape--7" />,
    <FontAwesomeIcon key="8" icon={faGlassMartini} className="shape shape--8" />
  ];
  
  return shapes;
})()}
</div>

            <section id="projects">
                <div className="container">
                    <div className="row">
                        <h1 className="section__title dark-mode-white">
                            Featured Events
                        </h1>
                        <ul className="project__list">
                            <li className="project">
                                <div className="project__wrapper">
                                    <img src={drinks} className="project__img" alt="" />
                                    <div className="project__wrapper--bg"></div>
                                    <div className="project__description">
                                        <h3 className="project__description--title">
                                            Wedding Reception
                                        </h3>
                                        <h4 className="project__description--sub-title">
                                            Elegant and Memorable
                                        </h4>
                                        <p className="project__description--para">
                                            We specialize in bringing a unique and personalized touch to events like wedding receptions.
                                            Our mobile bar service includes crafting custom cocktails, creating a welcoming bar atmosphere,
                                            and ensuring guests enjoy an elevated experience that adds to the celebration's lasting memories.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="project">
                                <div className="project__wrapper">
                                    <img src={drinks2} className="project__img" alt="" />
                                    <div className="project__wrapper--bg"></div>
                                    <div className="project__description">
                                        <h3 className="project__description--title">
                                            Corporate Event
                                        </h3>
                                        <h4 className="project__description--sub-title">
                                            Professional and Fun
                                        </h4>
                                        <p className="project__description--para">
                                            We bring professionalism and elegance to corporate events with our mobile bar service.
                                            Whether it’s a company celebration, client appreciation event, or team gathering,
                                            we craft custom cocktails and create an inviting bar experience that enhances networking and leaves a lasting impression.
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li className="project">
                                <div className="project__wrapper">
                                    
                                    <img src={drinks3} className="project__img" alt="" />
                                    <div className="project__wrapper--bg"></div>
                                    <div className="project__description">
                                        <h3 className="project__description--title">
                                            Private Party
                                        </h3>
                                        <h4 className="project__description--sub-title">
                                            Exclusive and Personalized
                                        </h4>
                                        <p className="project__description--para">
                                            We bring fun and flair to your private parties with our mobile bar service, tailored to create a memorable experience for you and your guests.
                                            Whether it's an intimate gathering or a lively celebration, we offer custom cocktails and
                                            impeccable service that adds a touch of excitement to your event. From the first drink to the last toast,
                                            we ensure every detail is perfect, leaving your guests talking about your party long after it ends.
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <footer>
                <div className="container footer__color">
                    <div className="row footer__row">
                        <a href="/" className="footer__anchor">
                            <figure className="footer__logo">
                                <img src="./assets/logo.svg" className="footer__logo--img" alt="" />
                            </figure>
                            <span className="footer__logo--popper">
                                Top
                                <i className="fas fa-arrow-up"></i>
                            </span>
                        </a>
                        {/* <div className="footer__social--list">
                            <a href="https://github.com/davidbr4gg" className="footer__social--link link__hover-effect link__hover-effect--white">
                                GitHub
                            </a>
                            <a href="https://www.linkedin.com/in/david-bragg-5b23a1176/" target="_blank" className="footer__social--link link__hover-effect link__hover-effect--white">
                                LinkedIn
                            </a>
                            <a href="#" onClick={toggleModal} className="footer__social--link link__hover-effect link__hover-effect--white">
                                Contact
                            </a>
                            <a href="./assets/David Bragg Resume.pdf" target="_blank" className="footer__social--link link__hover-effect link__hover-effect--white">
                                Resume
                            </a>
                        </div> */}
                        <div className="footer__copyright dark-mode-white">Copyright &copy; 2025 Hidden Memories</div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
