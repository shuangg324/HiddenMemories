import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useModal } from '../utils/modalContext';
import Logo from '../assets/LogoHM.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [progress, setProgress]     = useState(0);

  const { isModalOpen, openModal, closeModal } = useModal();
  const location = useLocation();

  /* Scroll detection + progress */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const el  = document.documentElement;
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight) || 0;
      setProgress(pct);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close menu on route change */
  useEffect(() => {
    setIsMenuOpen(false);
    setMenuMounted(false);
  }, [location]);

  /* Body scroll lock + stagger mount for mobile links */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    if (isMenuOpen) {
      /* tiny delay so CSS transition kicks in after display:flex */
      const t = setTimeout(() => setMenuMounted(true), 20);
      return () => clearTimeout(t);
    } else {
      setMenuMounted(false);
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleAboutClick = () => {
    isModalOpen ? closeModal() : openModal();
    setIsMenuOpen(false);
    setMenuMounted(false);
  };

  const links = [
    { label: 'Home',     to: '/' },
    { label: 'About',    action: handleAboutClick },
    { label: 'Gallery',  to: '/gallery' },
    { label: 'Packages', to: '/packages' },
    { label: 'Quote',    to: '/quote' },
    { label: 'Contact',  to: '/contact' },
  ];

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      {/* ── Floating pill wrapper ── */}
      <header className={`nav-wrapper${scrolled ? ' nav-wrapper--scrolled' : ''}`}>
        <nav className="nav-pill" role="navigation" aria-label="Main navigation">

          {/* Logo */}
          <Link to="/" className="nav-logo" onClick={() => window.scrollTo(0, 0)}>
            <img src={Logo} alt="Hidden Memories" className="nav-logo__img" />
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            {links.map((link, i) =>
              link.to ? (
                <li key={i}>
                  <Link
                    to={link.to}
                    className={`nav-link${location.pathname === link.to ? ' nav-link--active' : ''}`}
                    onClick={() => link.to === '/' && window.scrollTo(0, 0)}
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={i}>
                  <button className="nav-link" onClick={link.action}>
                    {link.label}
                  </button>
                </li>
              )
            )}
          </ul>

          {/* Hamburger (mobile) */}
          <button
            className={`nav-hamburger${isMenuOpen ? ' nav-hamburger--open' : ''}`}
            onClick={() => setIsMenuOpen(v => !v)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className="nav-hamburger__bar" aria-hidden="true" />
            <span className="nav-hamburger__bar" aria-hidden="true" />
            <span className="nav-hamburger__bar" aria-hidden="true" />
          </button>

        </nav>
      </header>

      {/* ── Mobile full-screen overlay ── */}
      <div
        className={`nav-mobile${isMenuOpen ? ' nav-mobile--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {links.map((link, i) =>
          link.to ? (
            <Link
              key={i}
              to={link.to}
              className={`nav-mobile__link${menuMounted ? ' nav-mobile__link--visible' : ''}`}
              style={{ animationDelay: `${i * 55 + 30}ms` }}
              onClick={() => { setIsMenuOpen(false); }}
            >
              {link.label}
            </Link>
          ) : (
            <button
              key={i}
              className={`nav-mobile__link${menuMounted ? ' nav-mobile__link--visible' : ''}`}
              style={{ animationDelay: `${i * 55 + 30}ms` }}
              onClick={link.action}
            >
              {link.label}
            </button>
          )
        )}
      </div>
    </>
  );
}

export default Navbar;
