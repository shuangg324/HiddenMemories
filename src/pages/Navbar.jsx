import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from '../assets/logo.jpg';
import MobileLogo from '../assets/LogoHM.png';
import DarkModeLogo from '../assets/logo2.png';
import moveBackground from '../utils/moveBackground.js';
import { useModal } from '../utils/modalContext';
import { faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';


function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark-mode'));
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isModalOpen, openModal, closeModal } = useModal();
    const [currentLogo, setCurrentLogo] = useState(isDarkMode ? DarkModeLogo : Logo);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const toggleContrast = () => {
        document.body.classList.toggle('dark-mode');
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        setCurrentLogo(newDarkMode ? DarkModeLogo : Logo);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const isDark = document.body.classList.contains('dark-mode');
        setIsDarkMode(isDark);
        setCurrentLogo(isDark ? DarkModeLogo : Logo);
    }, []);

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

                
                <div className="navbar-logo">
                    <Link to="/">
                        <figure>
                            <img id="personal-logo" src={isMobile ? MobileLogo : currentLogo} alt="Logo" onClick={() => window.scrollTo(0, 0)}/>
                        </figure>
                    </Link>
                </div>
                
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