import React, { useEffect, useRef} from 'react';
import drinks from '../assets/drinks.jpg';
import drinks2 from '../assets/drinks2.jpg';
import drinks3 from '../assets/drinks3.jpg';
import moveBackground from '../utils/moveBackground.js';
import {useModal} from '../utils/modalContext';
// import { projectImages} from '../utils/images';
// import teddy from '../assets/teddy.PNG';        
import '../App.css';
import { contact } from '../utils/toggleModal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faEnvelope, faTimes, faGlassMartini, faCocktail, faWineGlass, faBeer } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
    const { isModalOpen, setIsModalOpen, toggleModal, closeModal } = useModal();
    const modalRef = useRef(null);

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

    // Handle click outside to close the modal
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                modalRef.current && 
                !modalRef.current.contains(event.target) &&
                !document.querySelector('.mail__btn').contains(event.target) &&  // Check if click is outside modal
                !document.querySelector('.navbar').contains(event.target)  // Check if click is outside navbar
            ) {
                toggleModal();  // Close modal if clicked outside both modal and navbar
            }
        };

        const handleCloseModal = () => {
            toggleModal();
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            
            // Store the current value of modalRef
            const currentModalRef = modalRef.current;
            
            // Add event listener for custom close event
            if (currentModalRef) {
                currentModalRef.addEventListener('closeModal', handleCloseModal);
            }
    
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                
                // Use the stored ref for removal
                if (currentModalRef) {
                    currentModalRef.removeEventListener('closeModal', handleCloseModal);
                }
            };
        }
    }, [isModalOpen, toggleModal]);

    const toggleModalHandler = () => {
        toggleModal();
    };
    

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
                                        Here's a bit more <b className="orange click" onClick={toggleModalHandler}>about us</b>.
                                    </p>
                                </div>
                                <div className='header__content--right'>
                                    {/* <figure><img className="header__img" src={teddy} alt="teddy" /></figure> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <button 
                    className="mail__btn click" 
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent event from bubbling up
                        toggleModal();
                    }}
>
                    <FontAwesomeIcon icon={faEnvelope} />
                </button>
                <a href="#projects" className="scroll">
                    <div className="scroll__icon click"></div>
                </a>
                <div className={`modal ${isModalOpen ? 'modal--open' : ''}`} ref={modalRef} onClick={(e) => e.stopPropagation()}>
    <div className="modal__left modal__half modal__about" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal__title modal__title--about">Here's a bit about us.</h3>
        <p className="modal__para">
            We are experienced <b className="dark-mode-white orange">Bartenders</b> with over 5+ years working in high-end restaurants and bars.
            Whether you're planning an <b className="dark-mode-white orange">Elegant Soirée</b> or a <b className="dark-mode-white orange">Casual Celebration</b>,
            our mobile bar service is designed to elevate your event with custom-crafted cocktails, exceptional service, and a personalized touch.
            <br />
            Let us turn your gathering into an unforgettable experience—<b className="dark-mode-white orange">Book Us</b> today!
        </p>
    </div>
    <div className="modal__right modal__half modal__contact" onClick={(e) => e.stopPropagation()}>
        <i className="fas fa-times modal__exit click" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
        </i>
        <h3 className="modal__title modal__title--contact">Let's have a chat!</h3>
        <h3 className="modal__sub-title modal__sub-title--contact">We'd love to be part of your next event!</h3>
        <form id="contact__form" onSubmit={(event) => contact(event, setIsModalOpen)}>
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
    {[faGlassMartini, faCocktail, faWineGlass, faBeer].flatMap((icon, index) => [
        <FontAwesomeIcon key={`${index}-1`} icon={icon} className={`shape shape--${index * 2}`} />,
        <FontAwesomeIcon key={`${index}-2`} icon={icon} className={`shape shape--${index * 2 + 1}`} />
    ])}
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
