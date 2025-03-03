import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import drinks from '../assets/drinks.jpg';
import drinks2 from '../assets/drinks2.jpg';
import drinks3 from '../assets/drinks3.jpg';
// import { projectImages} from '../utils/images';

import teddy from '../assets/teddy.PNG';        
import moveBackground from '../utils/moveBackground.js';

import '../App.css';
import {toggleModal, handleClickOutside, contact} from '../utils/toggleModal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEnvelope, faTimes, faGlassMartini, faCocktail, faWineGlass, faBeer } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    useEffect(() => {
        if (location.state?.openModal) {
            toggleModal(setIsModalOpen);
        }
    }, [location.state]);

    return (
        <div className="App" onMouseMove={(event) => moveBackground(event)}>
            <section id="landing-page">
                <header className="header">
                    <div className="container">
                        <div className="row">
                            <div className="header__content">
                                <div className="header__content--left">
                                    <h1 className="big__title orange">Hidden</h1>
                                    <h1 className="title dark-mode-title">Memories</h1>
                                    <p className="header__para dark-mode-white">
                                        Elevate your event with our expert <b className="orange">Mobile Bartenders</b>. We craft <i>custom cocktails</i> and provide <i>exceptional service</i> to make your celebration unforgettable.
                                        Let us bring your vision to life!
                                        <br />
                                        Here's a bit more <b className="orange click" onClick={() => toggleModal(setIsModalOpen)}>about us</b>.
                                    </p>
                                </div>
                                <div className='header__content--right'>
                                    <figure><img className="header__img" src={teddy} alt="teddy" /></figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <button className="mail__btn click" onClick={() => toggleModal(setIsModalOpen)}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </button>
                <a href="#projects" className="scroll">
                    <div className="scroll__icon click"></div>
                </a>
                <div className={`modal ${isModalOpen ? 'modal--open' : ''}`} onClick={(event) => handleClickOutside(event, () => toggleModal(setIsModalOpen))}>
                    <div className="modal__left modal__half modal__about">
                        <h3 className="modal__title modal__title--about">Here's a bit about us.</h3>
                        <p className="modal__para">
                            We are experienced <b className="dark-mode-white orange">Bartenders</b> with over 5+ years working in high-end restaurants and bars.
                            Whether you're planning an <b className="dark-mode-white orange">Elegant Soirée</b> or a <b className="dark-mode-white orange">Casual Celebration</b>,
                            our mobile bar service is designed to elevate your event with custom-crafted cocktails, exceptional service, and a personalized touch.
                            <br />
                            Let us turn your gathering into an unforgettable experience—<b className="dark-mode-white orange">Book Us</b> today!
                        </p>
                    </div>
                    <div className="modal__right modal__half modal__contact">
                        <i className="fas fa-times modal__exit click" onClick={() => toggleModal(setIsModalOpen)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </i>
                        <h3 className="modal__title modal__title--contact">Let's have a chat!</h3>
                        <h3 className="modal__sub-title modal__sub-title--contact">We'd love to be part of your next event!</h3>
                        <form id="contact__form" onSubmit={(event) => contact(event, () => toggleModal(setIsModalOpen))}>
                            <div className="form__item">
                                <label className="form__item--label" htmlFor="user_name">Name</label>
                                <input className="input" name="user_name" type="text" required />
                            </div>
                            <div className="form__item">
                                <label className="form__item--label" htmlFor="user_email">Email</label>
                                <input className="input" name="user_email" type="email" required />
                            </div>
                            <div className="form__item">
                                <label className="form__item--label" htmlFor="message">Message</label>
                                <textarea className="input" name="message" required></textarea>
                            </div>
                            <button id="contact__submit" className="form__submit">Send it my way</button>
                        </form>
                        <div className="modal__overlay modal__overlay--loading">
                            <FontAwesomeIcon icon={faSpinner} />
                        </div>
                        <div className="modal__overlay modal__overlay--success">
                            Thanks for the message! Looking forward to speaking to you soon.
                        </div>
                    </div>
                </div>
            </section>

            <div>
                <FontAwesomeIcon icon={faGlassMartini} className="shape shape--0" />
                <FontAwesomeIcon icon={faCocktail} className="shape shape--1" />
                <FontAwesomeIcon icon={faWineGlass} className="shape shape--2" />
                <FontAwesomeIcon icon={faCocktail} className="shape shape--3" />
                <FontAwesomeIcon icon={faBeer} className="shape shape--4" />
                <FontAwesomeIcon icon={faCocktail} className="shape shape--5" />
                <FontAwesomeIcon icon={faWineGlass} className="shape shape--6" />
                <FontAwesomeIcon icon={faCocktail} className="shape shape--7" />
                <FontAwesomeIcon icon={faGlassMartini} className="shape shape--8" />
            </div>

            <section id="projects">
                <div className="container">
                    <div className="row">
                        <h1 className="section__title dark-mode-white">
                            Featured <span className="orange">Events</span>
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
