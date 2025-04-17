import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import Logo from '../assets/Logo.png';
import moveBackground from '../utils/moveBackground.js';
import { useModal } from '../utils/modalContext';
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark-mode'));
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isModalOpen, openModal, closeModal } = useModal();

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

    const handleAboutContactClick = (e) => {
        if (isModalOpen) {
            closeModal();
        } else {
            openModal();
        }
        closeMenu();
    };

    return (
        <div className="container navbar__color" onMouseMove={(event) => moveBackground(event)}>
            <nav className="navbar">
                <FontAwesomeIcon icon={faBars} id="menu__icon" onClick={toggleMenu} />
                
                {/* Empty space where the logo was */}
                <div></div>
                
                {/* Center the logo by putting it in the navbar-title div */}
                {/* <div className="navbar-title">
                    <Link to="/">
                        <figure>
                            <img id="personal-logo" src={Logo} alt="Logo" onClick={() => window.scrollTo(0, 0)}/>
                        </figure>
                    </Link>
                </div> */}
                
                <ul className={`nav__link--list ${isMenuOpen ? 'open' : ''}`}>
                    <li className="nav__link" onClick={() => {
                        closeMenu();
                        window.scrollTo(0, 0);
                    }}>
                        <Link to="/" className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">Home</Link>
                    </li>
                    <li className="nav__link">
                        <button 
                           onClick={handleAboutContactClick} 
                           className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black nav__button">
                            About
                        </button>
                    </li>
                    <li className="nav__link" onClick={closeMenu}>
                        <Link to="/gallery" className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">Gallery</Link>
                    </li>
                    <li className="nav__link" onClick={closeMenu}>
                        <Link to="./packages" className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">Package</Link>
                    </li>
                    <li className="nav__link">
                        <button 
                           onClick={handleAboutContactClick} 
                           className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black nav__button">
                            Contact
                        </button>
                    </li>
                    {/* <li className="nav__link" onClick={closeMenu}>
                        <button id="dark-mode-toggle" onClick={toggleContrast}>
                            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} id="dark-mode-icon" />
                        </button>
                    </li> */}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;