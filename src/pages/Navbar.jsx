import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import teddy from '../assets/teddy.PNG';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains('dark-mode')); // Track dark mode state

    const toggleContrast = () => {
        document.body.classList.toggle('dark-mode');
        setIsDarkMode(!isDarkMode);
    };

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
        <div className="container" onMouseMove={(event) => moveBackground(event)}>
            <nav className="navbar" >
            <Link to="/">
                <figure>
                    <img id="personal-logo" src={teddy} alt="Logo" />
                </figure>
            </Link>
            <ul className="nav__link--list">
                <li className="nav__link">
                    <Link to="/" className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">Home</Link>
                </li>
                <li className="nav__link">
                    <Link to="/" state={{ openModal: true }} className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">About</Link>
                </li>
                <li className="nav__link">
                    <a href="#projects" className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">Events</a>
                </li>
                <li className="nav__link">
                    <Link to="./packages" className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">Package</Link>
                </li>
                <li className="nav__link">
                <Link to="/" state={{ openModal: true }} className="dark-mode-white nav__link--anchor link__hover-effect link__hover-effect--black">Contact</Link>
                </li>
                <li className="nav__link">
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