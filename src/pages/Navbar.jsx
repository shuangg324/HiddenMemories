import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import teddy from '../assets/teddy.PNG';
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark-mode')); // Track dark mode state
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const toggleContrast = () => {
        document.body.classList.toggle('dark-mode');
        setIsDarkMode(!isDarkMode);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen); // Toggle modal state
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isModalOpen && !event.target.closest('.modal')) {
                closeModal();
            }
        };

        // Adding event listener to detect clicks outside modal
        document.addEventListener('click', handleClickOutside);

        return () => {
            // Cleanup the event listener on component unmount
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isModalOpen]);

        

    const scaleFactor = 1 / 20;
    function moveBackground(event) {
        const shapes = document.querySelectorAll(".shape");
        const x = event.clientX * scaleFactor;
        const y = event.clientY * scaleFactor;

        for (let i = 0; i < shapes.length; ++i) {
            const isOdd = i % 2 !== 0;
            const boolInt = isOdd ? -1 : 1;
            // Added rotate after tutorial
            shapes[i].style.transform = `translate(${x * boolInt}px, ${y * boolInt}px) rotate(${x * boolInt * 10}deg)`;
        }
    }

    

    return (

            <div className="container navbar__color" onMouseMove={(event) => moveBackground(event)}>
            
            <nav className="navbar" >
            <FontAwesomeIcon icon={faBars} id="menu__icon" onClick={toggleMenu} />
            <Link to="/">
                <figure>
                    <img id="personal-logo" src={teddy} alt="Logo" onClick={() => window.scrollTo(0, 0)}/>
                </figure>
            </Link>
            <div className="navbar-title" onClick={() => window.scrollTo(0, 0)}>
                    <Link to="/" className="navbar-title-text">
                        Hidden Memories
                    </Link>
                </div>
            <ul className={`nav__link--list ${isMenuOpen ? 'open' : ''}`}>
                <li className="nav__link" onClick={() => {
                    closeMenu();
                    window.scrollTo(0, 0);
                }} >
                    <Link to="/" className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">Home</Link>
                </li>
                <li className="nav__link" onClick={() => { closeMenu(); toggleModal(); }}>
                    <Link to="/" state={{ openModal: true }} className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">About</Link>
                </li>
                {/* <li className="nav__link" onClick={closeMenu}>
                    <a href="#projects" className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">Events</a>
                </li> */}
                <li className="nav__link" onClick={closeMenu}>
                    <Link to="./packages" className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">Package</Link>
                </li>
                <li className="nav__link" onClick={closeMenu}>
                <Link to="/" state={{ openModal: true }} className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">Contact</Link>
                </li>
                <li className="nav__link" onClick={closeMenu}>
                    <button id="dark-mode-toggle" onClick={toggleContrast}>
                        <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} id="dark-mode-icon" />
                    </button>
                </li>
            </ul>
        </nav>
            </div>
       
    );
}

export default Navbar;